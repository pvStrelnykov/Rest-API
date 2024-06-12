import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Express API with Swagger',
		version: '1.0.0',
		description:
			'This is a simple CRUD API application made with Express and documented with Swagger',
	},
	servers: [
		{
			url: 'http://localhost:5375/api',
		},
	],
}

const options = {
	swaggerDefinition,
	apis: ['./src/routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

const setupSwagger = app => {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default setupSwagger
