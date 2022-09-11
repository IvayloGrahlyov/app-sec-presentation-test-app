# Test application for demonstrating Contrast Security Node Agent logic flow

## Prerequisites
- Node.js
- MySQL database instance
- Contrast Security Community Edition account and .yaml config file

## Installation and running
 - install the dependencies by running `npm install`
 - set your local and preferred settings for your `mysql` instance
 in the .env file to be able to connect to the instance
 - populate your database by running `node ./database-initialization.js`
 - use `npm run start` if you want to start the application normally
 - use `npm run contrast` or `node -r @contrast/agent index.js` to run
 the application wit Contrast Security Node Agent
 - connect to DB at e.g. `localhost:3000`
 - login at https://ce.contrastsecurity.com/Contrast/static/ng/index.html
 - explore the safe and unsafe routes found in `routes/handlers.js`
 - explore the different settings in your personal `contrast_security.yaml` 
 and/or on the server that you've logged in from the above link