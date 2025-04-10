import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EcoCart API Documentation',
      version: '1.0.0',
      description: 'API documentation for the EcoCart project',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/**/*.ts'], // Path to the API routes
};

export const specs = swaggerJsdoc(options);