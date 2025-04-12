import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EcoCart API Documentation',
      version: '1.0.0',
      description: 'API documentation for the EcoCart application',
    },
    tags: [  // Define your tags here
        {
          name: 'Products',
          description: 'Operations related to products',
        },
        {
          name: 'Users',
          description: 'Operations related to users',
        },
        {
          name: 'Orders',
          description: 'Operations related to orders',
        },
      ],
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