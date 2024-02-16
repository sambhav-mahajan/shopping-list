// How to decide What to call ur starting point?
// index.js: When you issue npm init it will set the main entry point of the module to index.js.
// Some people don't change it, so they end up naming their main entry point index.js.
// It means there's one less thing to do.
// server.js: If your node package is not going to be consumed by another package,
// but rather is a stand-alone app, then if you call your main entry point server.js,
//  then you can issue npm start and start your app. npm start will run your server.js file by default.
//  To change this behavior, supply a start script in package.json. If a start script exists,
//  npm start will run that script instead.
// app.js is just a convention -- the only advantage to it is that some IDEs, such as Visual Studio Code will default to app.js
// as the entry point of a program you debug. That way when using the most common framework,
// Express, which creates an app.js file, "it just works"
const express = require('express');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');
const SwaggerExpress = require('swagger-express-mw');
let dirConfig = {
    appRoot: __dirname + "/", // required config
    // swaggerSecurityHandlers: {
    //     basicAuth: function (req, authOrSecDef, scopesOrApiKey, cb) {
    //         let auth = req.headers.authorization;
    //         if (auth) {
    //             cb(null);
    //         } else {
    //             console.log(`Example app Unauthorised access `)
    //             cb(new Error('access denied!'));
    //         }
    //     }
    // }
};
try{
SwaggerExpress.create(dirConfig, function (err, swaggerExpress) {
    if (err) { throw err; }
    const options = {
        security: [{ basicAuth: [] }]
    };
    // dirConfig.swaggerSecurityHandlers = {
    //     basicAuth: function securityHandler1(req, authOrSecDef, scopesOrApiKey, cb) {
    //         // your security code
    //         console.log("i came here");
    //         cb();
    //     }
    // };
    swaggerExpress.register(app);
    let port = 5678;
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
    app.use(cors);
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`, 'ServerStarted')
    });
});
} catch(ex){
    console.log(`Example app failed with error ${ex}`)
}
// WOKRING!