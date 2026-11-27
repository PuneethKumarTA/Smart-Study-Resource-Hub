I have a MERN stack project structured with two folders: `client` (React) and `server` (or `backend` Express/Node.js).

Please prepare this repository for single-service deployment on Azure App Service:

1. Update the Express backend (`server/server.js` or `backend/server.js`) to:
   - Handle `process.env.MONGO_URI` with fallback for database connection.
   - Use `express.static()` to serve production frontend files from `client/dist` (or `client/build`).
   - Catch all non-API GET requests (`app.get('*')`) and return `index.html`, while leaving `/api/*` routes functional.
   - Support ES Modules (`import`) or CommonJS (`require`) correctly for `__dirname`.

2. Create a root `package.json` with:
   - "type": "module" (if ES Modules are used).
   - "main": "server.js".
   - "install:all": "npm install --prefix server && npm install --prefix client".
   - "build": "npm run install:all && npm run build --prefix client".
   - "start": "node server.js".

3. Create a root `server.js` entry file that imports/requires the main Express server file.

4. Create a root `web.config` file configured for Azure Windows App Service (IISNode) that rewrites all incoming web requests to `server.js` so Express handles both static assets and API routing without 403/404 errors.

5. Execute `npm run build` in the root directory to verify that dependencies install and the production client bundle compiles cleanly.