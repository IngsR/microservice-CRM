import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Role } from './../src/users/entities/user.entity';
import { DealStatus } from './../src/deals/entities/deal.entity';

describe('DealsController (e2e)', () => {
  let app: INestApplication;
  let adminToken: string;
  let userToken: string;
  let testCompanyId: number;
  let testCustomerId: number;
  let testUserId: number;

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

    // Create a normal user (deal owner)
    const userEmail = `user-${Date.now()}@test.com`;
    const userRes = await request(app.getHttpServer())
      .post('/users')
      .send({
        firstName: 'Deal',
        lastName: 'Owner',
        email: userEmail,
        password: 'password123',
      });
    testUserId = userRes.body.id;

    // Login as the normal user to get a user token
    const userLoginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: userEmail, password: 'password123', });
    
    userToken = userLoginRes.body.access_token;

    // Create a company for deal association
    const createCompanyRes = await request(app.getHttpServer())
      .post('/companies')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: `Deal Company ${Date.now()}`, address: '456 Deal St' })
      .expect(201);
    testCompanyId = createCompanyRes.body.id;

    // Create a customer for deal association
    const createCustomerRes = await request(app.getHttpServer())
      .post('/customers')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        firstName: 'Deal',
        lastName: 'Customer',
        email: `deal-customer-${Date.now()}@test.com`,
        phone: '987-654-3210',
        companyId: testCompanyId,
      })
      .expect(201);
    testCustomerId = createCustomerRes.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should allow searching for deals by keyword (GET /deals/search?keyword=...)', async () => {
    const dealTitle = `Searchable Deal ${Date.now()}`;

    // Create a deal to search for
    const createRes = await request(app.getHttpServer())
      .post('/deals')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: dealTitle,
        value: 1000.00,
        status: DealStatus.OPEN,
        ownerId: testUserId,
        customerId: testCustomerId,
        companyId: testCompanyId,
      })
      .expect(201);

    const createdDealId = createRes.body.id;

    // Search for the deal by title keyword
    const searchByTitleRes = await request(app.getHttpServer())
      .get(`/deals/search?keyword=${encodeURIComponent(dealTitle.substring(0, 5))}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(searchByTitleRes.body).toBeInstanceOf(Array);
    expect(searchByTitleRes.body.length).toBeGreaterThan(0);
    expect(searchByTitleRes.body[0].title).toEqual(dealTitle);

    // Clean up: delete the created deal
    await request(app.getHttpServer())
      .delete(`/deals/${createdDealId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(204); // No Content for successful delete
  });
});
