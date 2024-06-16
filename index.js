import { bgCyan, bgRed } from 'console-log-colors'
import env from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import cors from 'cors'
env.config()

import router from './src/routes/index.routes.js'
import errorMiddlewares from './src/middlewares/errorHandler.middlewares.js'

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(express.static('client/src/img'))
app.use(fileUpload({}))
app.use(cors())
app.use('/api', router)

app.use(errorMiddlewares)

const startApp = async () => {
	try {
		await mongoose.connect(process.env.DB_URL)
		app.listen(PORT, () => {
			console.log(bgCyan(`Server has been started on post - ${PORT}`))
		})
	} catch (e) {
		console.log(bgRed(e))
	}
}

startApp()
