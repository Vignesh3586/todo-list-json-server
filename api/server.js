// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const cors = require('cors');
const path = require('path');

const server = jsonServer.create();

// Comment out to allow write operations
const router = jsonServer.router(path.join(__dirname, 'db.json'))

const middlewares = jsonServer.defaults()
const corsOptions = {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  
  server.use(cors(corsOptions));

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
// Export the Server API
module.exports = server
