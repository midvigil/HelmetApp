const express = require('express');
const app = express();

const helmet = require('helmet'); //Pide a Helmet

const ninetyDaysInSeconds = 90 * 24 * 60 * 60; //Variable de 90 días

/*
app.use(helmet()); // Seguridad general
app.use(helmet.hidePoweredBy()); // Nivel 2
app.use(helmet.frameguard({ action: 'deny' })); // Nivel 3: Protege contra clickjacking
app.use(helmet.xssFilter()); //Nivel 4: Protección contras XSS
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen()); // Nivel 6: Protección específica para IE

app.use(helmet.hsts(
{ 
maxAge: ninetyDaysInSeconds,
force: true
}
)); //Nivel 7: Forza al usuario a usar HTTPS para evitar HTTP

app.use(helmet.dnsPrefetchControl()); //Nivel 8: Le pide al navegador que no se adelante a lo que podrías elegir
app.use(helmet.noCache()); //Nivel 9: Evita caché en el  navegador NO USAR AL MENOS QUE SEA CRITICO

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'trusted-cdn.com']
  }
})); //Nivel 10 Políticas de carga de contenido.
*/

app.use(helmet(

{
  hidePoweredBy: true,
  frameguard: { action: 'deny'},
  xssFilter: true,
  noSniff: true,
  ieNoOpen: true,
  hsts: { maxAge: ninetyDaysInSeconds, force: true
  },
  dnsPrefetchControl: true,
  contentSecurityPolicy: 
  {
	directives: {
	defaultSrc: ["'self'"],
	scriptSrc: ["'self'", 'trusted-cdn.com']
   		    }
  },
  
} ));

// Solo si deseas mantener noCache activado (no se incluye en helmet() por defecto)
const noCache = require('nocache');
app.use(noCache());

module.exports = app;














































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
