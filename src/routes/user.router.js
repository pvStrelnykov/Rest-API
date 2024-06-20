import { Router } from 'express'
import authMiddlewares from '../middlewares/auth.middlewares.js'
import userController from '../controllers/user.controller.js'

const router = new Router()

/**
 * @swagger
 * /user/edit/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: User not found or invalid request
 *       401:
 *         description: Unauthorized
 */
router.put('/edit/:id', authMiddlewares, userController.update)

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a specific user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User not found or invalid request
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authMiddlewares, userController.get)

/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: User not found or invalid request
 *       401:
 *         description: Unauthorized
 */
router.delete('/delete/:id', authMiddlewares, userController.delete)

export default router
