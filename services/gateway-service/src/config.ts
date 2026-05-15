export const SERVICES = {
  auth: process.env.AUTH_SERVICE_URL || 'http://auth-service:3003',
  canvas: process.env.CANVAS_SERVICE_URL || 'http://canvas-service:3002',
};

export const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-prod';
