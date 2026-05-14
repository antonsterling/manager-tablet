import express from 'express'
import * as usersController from '../controllers/usersController.js'

const router = express.Router()

// GET /api/users
router.get('/', usersController.listUsers)

// GET /api/users/:id
router.get('/:id', usersController.getUser)

export default router

