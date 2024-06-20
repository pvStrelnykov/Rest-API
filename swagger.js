import env from 'dotenv'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
env.config()

const PORT = process.env.PORT || 8080

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Rest API dla AuctionSystem',
		version: '1.0.0',
		description: 'Rest API',
	},
	servers: [
		{
			url: `http://localhost:${PORT}/api`,
		},
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
		},
		schemas: {
			User: {
				type: 'object',
				properties: {
					_id: {
						type: 'string',
						example: '60d9f9e2e1d0e20b7c8e4c9f',
					},
					username: {
						type: 'string',
						example: 'testuser',
					},
					password: {
						type: 'string',
						example: 'hashedpassword',
					},
				},
			},
			Auction: {
				type: 'object',
				properties: {
					_id: {
						type: 'string',
						example: '60d9f9e2e1d0e20b7c8e4c9f',
					},
					title: {
						type: 'string',
						example: 'New Auction',
					},
					description: {
						type: 'string',
						example: 'Auction description',
					},
					img: {
						type: 'string',
						example: 'auction.jpg',
					},
					price: {
						type: 'number',
						example: 100.0,
					},
					user: {
						type: 'string',
						example: '60d9f9e2e1d0e20b7c8e4c9f',
					},
				},
			},
			Payment: {
				type: 'object',
				properties: {
					success: {
						type: 'boolean',
						example: true,
					},
					paymentIntentId: {
						type: 'string',
						example: 'pi_1JM1G82eZvKYlo2C4b3Zz8VJ',
					},
					status: {
						type: 'string',
						example: 'succeeded',
					},
					productId: {
						type: 'string',
						example: '60d9f9e2e1d0e20b7c8e4c9f',
					},
				},
			},
		},
	},
	security: [
		{
			bearerAuth: [],
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
