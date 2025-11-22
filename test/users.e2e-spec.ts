import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Role } from './../src/users/entities/user.entity';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let adminToken: string;

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
  });

  afterAll(async () => {
    await app.close();
  });

  it('should allow searching for users by keyword (GET /users/search?keyword=...)', async () => {
    const userFirstName = `SearchableFN ${Date.now()}`;
    const userLastName = `SearchableLN ${Date.now()}`;
    const userEmail = `searchable-user-${Date.now()}@test.com`;

    // Create a user to search for
    const createRes = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        password: 'testpassword123',
      })
      .expect(201);

    const createdUserId = createRes.body.id;

    // Search for the user by first name keyword
    const searchByFirstNameRes = await request(app.getHttpServer())
      .get(`/users/search?keyword=${encodeURIComponent(userFirstName.substring(0, 5))}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(searchByFirstNameRes.body).toBeInstanceOf(Array);
    expect(searchByFirstNameRes.body.length).toBeGreaterThan(0);
    expect(searchByFirstNameRes.body[0].firstName).toEqual(userFirstName);

    // Search for the user by email keyword
    const searchByEmailRes = await request(app.getHttpServer())
      .get(`/users/search?keyword=${encodeURIComponent(userEmail.substring(0, 5))}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(searchByEmailRes.body).toBeInstanceOf(Array);
    expect(searchByEmailRes.body.length).toBeGreaterThan(0);
    expect(searchByEmailRes.body[0].email).toEqual(userEmail);

    // Clean up: delete the created user
    await request(app.getHttpServer())
      .delete(`/users/${createdUserId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(204); // No Content for successful delete
  });
});
