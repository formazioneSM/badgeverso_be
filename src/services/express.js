'use strict'

const config = require('../config')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const errorHandler = require('../middlewares/error-handler')
const apiRouter = require('../routes/api')
const passport = require('passport')
const passportJwt = require('../services/passport')
const path = require('path');
const app = express()
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('../../swagger.json');
app.use(bodyParser.json())
app.use(cors())
app.use(helmet({ contentSecurityPolicy: {  useDefaults: true, directives: { 'script-src': ["'self'", "https://cdn.jsdelivr.net"]  }  }  }))
app.set('view engine', 'ejs')
if (config.env !== 'test') app.use(morgan('combined'))
// passport
app.use(passport.initialize())
passport.use('jwt', passportJwt.jwt)
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);
app.use('/api', apiRouter)
app.set('views', path.join(__dirname, '../views'))
app.use('/static', express.static(path.join(__dirname, '../public/')))

app.use('/config', express.static(path.join(__dirname, '../config')))
app.get('/', (req, res) => {
  res.render( 'pages/home')
})
app.use(errorHandler.handleNotFound)
app.use(errorHandler.handleError)

exports.start = () => {
 
  app.listen(config.port, (err) => {
    if (err) {
      console.log(`Error : ${err}`)
      process.exit(-1)
    }
    
    console.log('path', path.join(__dirname, '../views'));
    console.log(`${config.app} is running on ${config.port}`)
  })
}

exports.app = app
