import { Router } from 'express'

import authMiddlewares from '../middlewares/auth.middlewares.js'
import auctionController from '../controllers/auction.controller.js'

const router = new Router()

/**
 * @swagger
 * /auctions/all:
 *   get:
 *     summary: Get all auctions for the authenticated user
 *     tags: [Auctions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of auctions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Auction'
 *       401:
 *         description: Unauthorized
 */
router.get('/all', authMiddlewares, auctionController.getAll)

/**
 * @swagger
 * /auctions/create:
 *   post:
 *     summary: Create a new auction
 *     tags: [Auctions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Auction"
 *               description:
 *                 type: string
 *                 example: "Auction description"
 *               price:
 *                 type: number
 *                 example: 100.00
 *               img:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Auction created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/create', authMiddlewares, auctionController.create)

/**
 * @swagger
 * /auctions/{id}:
 *   get:
 *     summary: Get a specific auction by ID
 *     tags: [Auctions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The auction ID
 *     responses:
 *       200:
 *         description: Auction details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auction'
 *       400:
 *         description: Auction not found
 */
router.get('/:id', auctionController.getOne)

/**
 * @swagger
 * /auctions/edit/{id}:
 *   put:
 *     summary: Update an existing auction
 *     tags: [Auctions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The auction ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               img:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Auction updated successfully
 *       400:
 *         description: Auction not found
 *       401:
 *         description: Unauthorized
 */
router.put('/edit/:id', authMiddlewares, auctionController.update)

/**
 * @swagger
 * /auctions/delete/{id}:
 *   delete:
 *     summary: Delete an auction
 *     tags: [Auctions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The auction ID
 *     responses:
 *       200:
 *         description: Auction deleted successfully
 *       400:
 *         description: Auction not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/delete/:id', authMiddlewares, auctionController.delete)

export default router
