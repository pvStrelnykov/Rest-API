import { Router } from 'express'
import { processPayment } from '../controllers/paymentController.js'

const router = Router()

/**
 * @swagger
 * /payment/{id}:
 *   post:
 *     summary: Process a payment for a product
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to process payment for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currency:
 *                 type: string
 *               paymentMethodId:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Error processing payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: 'Product not found'
 */
router.post('/', processPayment)

export default router
