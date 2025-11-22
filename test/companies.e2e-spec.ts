import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Role } from './../src/users/entities/user.entity';

describe('CompaniesController (e2e)', () => {
  let app: INestApplication;
  let userToken: string;
  let adminToken: string;
  const testCompanyId = 999; // An ID that likely doesn't exist

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // 1. Create a default user (will have USER role)
    const userEmail = `user-${Date.now()}@test.com`;
    await request(app.getHttpServer())
      .post('/users')
      .send({
        firstName: 'Normal',
        lastName: 'User',
        email: userEmail,
        password: 'password123',
      });

    // 2. Login as the default user to get a token
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: userEmail, password: 'password123', });
    
    userToken = loginRes.body.access_token;

    // 3. Create an admin user
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

    // 4. Login as the admin user to get an admin token
    const adminLoginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: adminEmail, password: 'admin123', });
    
    adminToken = adminLoginRes.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should NOT allow a default user to create a company (POST /companies)', () => {
    const createDto = { name: 'E2E Test Corp', address: 'E2E Address' };
    return request(app.getHttpServer())
      .post('/companies')
      .set('Authorization', `Bearer ${userToken}`)
      .send(createDto)
      .expect(403); // Forbidden
  });

  it('should allow a default user to get all companies (GET /companies)', () => {
    return request(app.getHttpServer())
      .get('/companies')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
  });

  it('should NOT allow a default user to delete a company (DELETE /companies/:id)', () => {
      return request(app.getHttpServer())
        .delete(`/companies/${testCompanyId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403); // Forbidden
  });

  it('should allow searching for companies by keyword (GET /companies/search?keyword=...)', async () => {
    const companyName = `Searchable Company ${Date.now()}`;
    const companyAddress = `Searchable Address ${Date.now()}`;

    // Create a company to search for
    const createRes = await request(app.getHttpServer())
      .post('/companies')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: companyName, address: companyAddress })
      .expect(201);

    const createdCompanyId = createRes.body.id;

    // Search for the company by name keyword
    const searchByNameRes = await request(app.getHttpServer())
      .get(`/companies/search?keyword=${encodeURIComponent(companyName.substring(0, 5))}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(searchByNameRes.body).toBeInstanceOf(Array);
    expect(searchByNameRes.body.length).toBeGreaterThan(0);
    expect(searchByNameRes.body[0].name).toEqual(companyName);

    // Search for the company by address keyword
    const searchByAddressRes = await request(app.getHttpServer())
      .get(`/companies/search?keyword=${encodeURIComponent(companyAddress.substring(0, 5))}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(searchByAddressRes.body).toBeInstanceOf(Array);
    expect(searchByAddressRes.body.length).toBeGreaterThan(0);
    expect(searchByAddressRes.body[0].address).toEqual(companyAddress);

    // Clean up: delete the created company
    await request(app.getHttpServer())
      .delete(`/companies/${createdCompanyId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
  });
});
