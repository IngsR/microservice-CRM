import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Role } from './../src/users/entities/user.entity';

describe('CustomersController (e2e)', () => {
  let app: INestApplication;
  let adminToken: string;
  let userToken: string;
  let testCompanyId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // Create an admin user
    const adminEmail = `admin-${Date.now()}@test.com`;
    await request(app.getHttpServer())
      .post('/users')
      .send({
        firstName: 'Admin',
        lastName: 'User',
        email: adminEmail,
        password: 'admin123',
        roles: [Role.ADMIN],
      });

    // Login as the admin user to get an admin token
    const adminLoginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: adminEmail, password: 'admin123', });
    
    adminToken = adminLoginRes.body.access_token;

    // Create a normal user
    const userEmail = `user-${Date.now()}@test.com`;
    await request(app.getHttpServer())
      .post('/users')
      .send({
        firstName: 'Normal',
        lastName: 'User',
        email: userEmail,
        password: 'password123',
      });

    // Login as the normal user to get a user token
    const userLoginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: userEmail, password: 'password123', });
    
    userToken = userLoginRes.body.access_token;

    // Create a company for customer association
    const createCompanyRes = await request(app.getHttpServer())
      .post('/companies')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: `Test Company ${Date.now()}`, address: '123 Test St' })
      .expect(201);
    testCompanyId = createCompanyRes.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should allow searching for customers by keyword (GET /customers/search?keyword=...)', async () => {
    const customerFirstName = `SearchableFN ${Date.now()}`;
    const customerLastName = `SearchableLN ${Date.now()}`;
    const customerEmail = `searchable-${Date.now()}@test.com`;

    // Create a customer to search for
    const createRes = await request(app.getHttpServer())
      .post('/customers')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        firstName: customerFirstName,
        lastName: customerLastName,
        email: customerEmail,
        phone: '123-456-7890',
        companyId: testCompanyId,
      })
      .expect(201);

    const createdCustomerId = createRes.body.id;

    // Search for the customer by first name keyword
    const searchByFirstNameRes = await request(app.getHttpServer())
      .get(`/customers/search?keyword=${encodeURIComponent(customerFirstName.substring(0, 5))}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(searchByFirstNameRes.body).toBeInstanceOf(Array);
    expect(searchByFirstNameRes.body.length).toBeGreaterThan(0);
    expect(searchByFirstNameRes.body[0].firstName).toEqual(customerFirstName);

    // Search for the customer by email keyword
    const searchByEmailRes = await request(app.getHttpServer())
      .get(`/customers/search?keyword=${encodeURIComponent(customerEmail.substring(0, 5))}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(searchByEmailRes.body).toBeInstanceOf(Array);
    expect(searchByEmailRes.body.length).toBeGreaterThan(0);
    expect(searchByEmailRes.body[0].email).toEqual(customerEmail);

    // Clean up: delete the created customer
    await request(app.getHttpServer())
      .delete(`/customers/${createdCustomerId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(204); // No Content for successful delete
  });
});
