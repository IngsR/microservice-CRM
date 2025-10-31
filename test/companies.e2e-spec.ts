import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Role } from './../src/users/entities/user.entity';

describe('CompaniesController (e2e)', () => {
  let app: INestApplication;
  let userToken: string;
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
      .send({ email: userEmail, password: 'password123' });
    
    userToken = loginRes.body.access_token;
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
});
