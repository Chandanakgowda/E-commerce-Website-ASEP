
import request from 'supertest';
import app from '../server.js'; // Adjust path if necessary
import { userModel } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

process.env.JWT_SECRET = 'testsecret';

jest.mock('../models/userModel.js');
jest.mock('bcrypt');

describe('User Controller Tests', () => {
  const validUser = {
    _id: '12345',
    email: 'test@example.com',
    password: 'hashedPassword',
    name: 'Test User'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  // -------------------- loginUser Tests --------------------

  test('TC001: Successful login with correct credentials', async () => {
    userModel.findOne.mockResolvedValue(validUser);
    bcrypt.compare.mockResolvedValue(true);

    const response = await request(app)
      .post('/api/user/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });

  test('TC002: Fail login with incorrect password', async () => {
    userModel.findOne.mockResolvedValue(validUser);
    bcrypt.compare.mockResolvedValue(false);

    const response = await request(app)
      .post('/api/user/login')
      .send({ email: 'test@example.com', password: 'wrongPassword' });

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid credentials');
  });

  test('TC003: Fail login with non-existing email', async () => {
    userModel.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/api/user/login')
      .send({ email: 'notfound@example.com', password: 'irrelevant' });

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User doesn't exists");
  });

  test('TC004: Fail login with missing password field', async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({ email: 'test@example.com' });

    expect(response.body.success).toBe(false);
  });

  // -------------------- userProfile Tests --------------------

  test('TC005: Successful profile fetch with valid userId', async () => {
    userModel.findById.mockResolvedValue({ ...validUser, password: undefined });

    const response = await request(app)
      .post('/api/user/profile')
      .send({ userId: '12345' });

    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe('test@example.com');
  });

  test('TC006: Fail profile fetch with invalid userId', async () => {
    userModel.findById.mockResolvedValue(null);

    const response = await request(app)
      .post('/api/user/profile')
      .send({ userId: 'invalidId' });

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('User not found');
  });

  test('TC007: Handle error in userProfile gracefully', async () => {
    userModel.findById.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/api/user/profile')
      .send({ userId: '12345' });

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Database error');
  });

  // -------------------- registerUser Tests --------------------

  test('TC008: Successful user registration', async () => {
    userModel.findOne.mockResolvedValue(null); // user doesn't exist
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('hashedPassword');
    userModel.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({ _id: '12345' }),
    }));

    const response = await request(app)
      .post('/api/user/register')
      .send({ name: 'New User', email: 'new@example.com', password: 'securePass' });

    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });

  test('TC009: Register fails if user already exists', async () => {
    userModel.findOne.mockResolvedValue(validUser);

    const response = await request(app)
      .post('/api/user/register')
      .send({ name: 'Test', email: 'test@example.com', password: 'password123' });

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('User already exists');
  });

  test('TC010: Register fails with invalid email', async () => {
    userModel.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/api/user/register')
      .send({ name: 'Test', email: 'invalidemail', password: 'password123' });

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Please enter a valid email');
  });

  test('TC011: Register fails with weak password', async () => {
    userModel.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/api/user/register')
      .send({ name: 'Test', email: 'valid@example.com', password: '123' });

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Please enter a strong password');
  });

  test('TC012: Register handles server error', async () => {
    userModel.findOne.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/api/user/register')
      .send({ name: 'Test', email: 'valid@example.com', password: 'securePass' });

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Database error');
  });
});


// ===========================
// Additional Controller Tests
// ===========================


import request from 'supertest';
import app from '../server.js';
import { productModel } from '../models/product.js';
import { userModel } from '../models/userModel.js';
import { orderModel } from '../models/orderModel.js';

jest.mock('../models/product.js');
jest.mock('../models/userModel.js');
jest.mock('../models/orderModel.js');

// Note: cart logic may depend on user sessions or tokens in a real app.
// These are illustrative based on typical patterns.

describe('Cart, Product, and Order Controller Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // -------------------- Product Tests --------------------

  test('TC001: Get all products', async () => {
    productModel.find.mockResolvedValue([{ name: 'Item1' }, { name: 'Item2' }]);

    const response = await request(app).get('/api/product/all');

    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBe(2);
  });

  test('TC002: Get product by ID - found', async () => {
    productModel.findById.mockResolvedValue({ name: 'Product A' });

    const response = await request(app).get('/api/product/123');

    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe('Product A');
  });

  test('TC003: Get product by ID - not found', async () => {
    productModel.findById.mockResolvedValue(null);

    const response = await request(app).get('/api/product/invalid');

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Product not found');
  });

  // -------------------- Cart Tests --------------------

  test('TC004: Add product to cart', async () => {
    userModel.findById.mockResolvedValue({ cart: [], save: jest.fn() });
    productModel.findById.mockResolvedValue({ _id: 'prod1', name: 'Pencil' });

    const response = await request(app)
      .post('/api/cart/add')
      .send({ userId: 'user1', productId: 'prod1' });

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Added to cart');
  });

  test('TC005: Remove product from cart', async () => {
    userModel.findById.mockResolvedValue({
      cart: [{ _id: 'prod1' }],
      save: jest.fn()
    });

    const response = await request(app)
      .post('/api/cart/remove')
      .send({ userId: 'user1', productId: 'prod1' });

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Removed from cart');
  });

  // -------------------- Order/Payment Tests --------------------

  test('TC006: Place order successfully', async () => {
    userModel.findById.mockResolvedValue({
      cart: [{ _id: 'prod1', name: 'Pen' }],
      save: jest.fn()
    });
    orderModel.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({ _id: 'order1' })
    }));

    const response = await request(app)
      .post('/api/order/place')
      .send({ userId: 'user1', address: '123 Main St' });

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Order placed successfully');
  });

  test('TC007: Get user orders', async () => {
    orderModel.find.mockResolvedValue([{ _id: 'order1', total: 30 }]);

    const response = await request(app).post('/api/order/get').send({ userId: 'user1' });

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
