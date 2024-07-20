const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To-Do App API',
      version: '1.0.0',
      description: `
      ## ToDo App API Documentation

      ### Project Setup Instructions
      1. **Clone the repository**:
         \`\`\`
         git clone <repository-url>
         \`\`\`
      2. **Navigate to the project directory**:
         \`\`\`
         cd <project-directory>
         \`\`\`
      3. **Install dependencies**:
         \`\`\`
         npm install
         \`\`\`
      4. **Create a .env file in the root directory and add the following environment variables**:
         \`\`\`
         PORT=3000
         MONGO_URI=<your-mongodb-uri>
         JWT_SECRET=<your-jwt-secret>
         \`\`\`
      5. **Run the project**:
         \`\`\`
         npm start
         \`\`\`

      ### Testing Endpoints with Postman
      1. **Register a new user*:
          - URL: \`http://localhost:3000/api/users/login\`
          - Method: \`POST\`
          - Body:
            \`\`\`json
           {
             "username": "testuser",
             "password": "testpassword"
           }
           \`\`\`
         - Copy the token from the response.
      1. **Login to get a JWT token**:
         - URL: \`http://localhost:3000/api/users/login\`
         - Method: \`POST\`
         - Body:
           \`\`\`json
           {
             "username": "testuser",
             "password": "testpassword"
           }
           \`\`\`
         - Copy the token from the response.

      2. **Use the JWT token to access protected endpoints**:
         - Add an \`Authorization\` header with the value \`Bearer <your_jwt_token_here>\`.
      
      ### Postman Testing Instructions
      1. **Set the request type to GET, POST, PUT, or DELETE** depending on the endpoint you are testing.
      2. **Enter the endpoint URL**, for example:
         - To get all todos: \`http://localhost:3000/api/todos\`
         - To create a todo: \`http://localhost:3000/api/todos\`
         - To update a todo: \`http://localhost:3000/api/todos/:id\`
         - To delete a todo: \`http://localhost:3000/api/todos/:id\`
      3. **Add the Authorization header** in the "Headers" tab:
         - Key: Authorization
         - Value: Bearer <your_jwt_token_here>
      4. **For POST and PUT requests**, include the request body in JSON format under the "Body" tab, select "raw" and "JSON" from the options:
         \`\`\`json
         {
           "title": "study",
           "description": "java",
           "status": "ongoing"
         }
         \`\`\`
      5. **Click "Send"** to send the request.
      6. **Verify the response**:
         - For a valid request, you should receive the expected response with status code 200 OK, 201 Created, etc.
         - For an invalid or missing token, you should receive a 401 Unauthorized or 400 Bad Request status code.
      `,
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // files containing annotations for API documentation
};

const specs = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
