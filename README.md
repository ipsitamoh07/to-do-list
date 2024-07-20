  <h1>To-Do App API</h1>
  <p>This is a Node.js based API for a ToDo application. It supports user registration, login, and CRUD operations on todo items.</p>

  <h2>Table of Contents</h2>
  <ul>
    <li><a href="#features">Features</a></li>
    <li><a href="#setup">Setup Instructions</a></li>
    <li><a href="#swagger">Swagger API Documentation</a></li>
    <li><a href="#testing">Testing API Endpoints with Postman</a></li>
    <li><a href="#routes">API Routes</a></li>
  </ul>

  <h2 id="features">Features</h2>
  <ul>
    <li>User registration</li>
    <li>User login with JWT authentication</li>
    <li>Create, read, update, and delete todos</li>
    <li>Swagger documentation for API endpoints</li>
  </ul>

  <h2 id="setup">Setup Instructions</h2>
  <ol>
    <li>Clone the repository:
      <pre><code>git clone &lt;repository-url&gt;</code></pre>
    </li>
    <li>Navigate to the project directory:
      <pre><code>cd &lt;project-directory&gt;</code></pre>
    </li>
    <li>Install dependencies:
      <pre><code>npm install</code></pre>
    </li>
    <li>Create a <code>.env</code> file in the root directory and add the following environment variables:
      <pre><code>PORT=3000
MONGO_URI=&lt;your-mongodb-uri&gt;
JWT_SECRET=&lt;your-jwt-secret&gt;</code></pre>
    </li>
    <li>Run the project:
      <pre><code>npm start</code></pre>
    </li>
    <li>Access the Swagger documentation at <a href="http://localhost:3000/api-docs" target="_blank">http://localhost:3000/api-docs</a>.</li>
  </ol>

  <h2 id="swagger">Swagger API Documentation</h2>
  <p>The API documentation is generated using Swagger. You can access it by navigating to <a href="http://localhost:3000/api-docs" target="_blank">http://localhost:3000/api-docs</a> after running the project.</p>

  <h2 id="testing">Testing API Endpoints with Postman</h2>
  <p>Follow these steps to test the API endpoints using Postman:</p>
  <ol>
    <li>Login to get a JWT token:
      <ul>
        <li>URL: <code>http://localhost:3000/api/users/login</code></li>
        <li>Method: <code>POST</code></li>
        <li>Body:
          <pre><code>{
  "username": "testuser",
  "password": "testpassword"
}</code></pre>
        </li>
        <li>Copy the token from the response.</li>
      </ul>
    </li>
    <li>Use the JWT token to access protected endpoints:
      <ul>
        <li>Add an <code>Authorization</code> header with the value <code>Bearer &lt;your_jwt_token_here&gt;</code>.</li>
      </ul>
    </li>
    <li>Set the request type to <code>GET</code>, <code>POST</code>, <code>PUT</code>, or <code>DELETE</code> depending on the endpoint you are testing.</li>
    <li>Enter the endpoint URL:
      <ul>
        <li>To get all todos: <code>http://localhost:3000/api/todos</code></li>
        <li>To create a todo: <code>http://localhost:3000/api/todos</code></li>
        <li>To update a todo: <code>http://localhost:3000/api/todos/:id</code></li>
        <li>To delete a todo: <code>http://localhost:3000/api/todos/:id</code></li>
      </ul>
    </li>
    <li>Add the <code>Authorization</code> header in the "Headers" tab:
      <ul>
        <li>Key: <code>Authorization</code></li>
        <li>Value: <code>Bearer &lt;your_jwt_token_here&gt;</code></li>
      </ul>
    </li>
    <li>For <code>POST</code> and <code>PUT</code> requests, include the request body in JSON format under the "Body" tab, select "raw" and "JSON" from the options:
      <pre><code>{
  "title": "study",
  "description": "java",
  "status": "ongoing"
}</code></pre>
    </li>
    <li>Click "Send" to send the request.</li>
    <li>Verify the response:
      <ul>
        <li>For a valid request, you should receive the expected response with status code <code>200 OK</code>, <code>201 Created</code>, etc.</li>
        <li>For an invalid or missing token, you should receive a <code>401 Unauthorized</code> or <code>400 Bad Request</code> status code.</li>
      </ul>
    </li>
  </ol>

  <h2 id="routes">API Routes</h2>
  <h3>Users</h3>
  <ul>
    <li><strong>Register</strong> (POST): <code>/api/users/register</code></li>
    <li><strong>Login</strong> (POST): <code>/api/users/login</code></li>
  </ul>

  <h3>Todos</h3>
  <ul>
    <li><strong>Get All Todos</strong> (GET): <code>/api/todos</code></li>
    <li><strong>Create Todo</strong> (POST): <code>/api/todos</code></li>
    <li><strong>Update Todo</strong> (PUT): <code>/api/todos/:id</code></li>
    <li><strong>Delete Todo</strong> (DELETE): <code>/api/todos/:id</code></li>
  </ul>

  <h2>Middleware</h2>
  <p>The API uses JWT authentication to protect routes. The <code>verifyToken</code> middleware checks the validity of the JWT token before allowing access to protected routes.</p>

  <h2>Environment Variables</h2>
  <ul>
    <li><code>PORT</code>: The port on which the server will run. Default is 3000.</li>
    <li><code>MONGO_URI</code>: The MongoDB connection string.</li>
    <li><code>JWT_SECRET</code>: The secret key used to sign JWT tokens.</li>
  </ul>

  <h2>Dependencies</h2>
  <p>Ensure you have the following dependencies installed:</p>
  <pre><code>npm install express mongoose dotenv jsonwebtoken bcrypt swagger-jsdoc swagger-ui-express</code></pre>

  <h2>Development Dependencies</h2>
  <p>For testing purposes, you may need the following development dependencies:</p>
  <pre><code>npm install --save-dev jest supertest</code></pre>

