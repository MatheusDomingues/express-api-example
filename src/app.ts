import express, { type Express, type Request, type Response } from 'express'
import { routes } from './routes'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'

const app: Express = express()

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Sportiva API',
      version: '0.1.0',
      description:
        'Essa API tem como objetivo satisfazer as necessidades do app Sportiva',
      contact: {
        name: 'Contato',
        url: 'https://sportiva.app',
        email: 'contato@sportiva.com'
      }
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8000}`,
        description: 'API de Testes'
      }
    ],
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid'
          },
          name: {
            type: 'string'
          },
          email: {
            type: 'string',
            format: 'email'
          },
          password: {
            type: 'string'
          }
        },
        required: ['name', 'email', 'password']
      }
    }
  },
  apis: [`${__dirname}/routes/**/*.ts`]
}

const specs = swaggerJsDoc(options)

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

export { app }
