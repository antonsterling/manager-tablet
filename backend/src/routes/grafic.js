import express from 'express'
import * as graficsController from '../controllers/graficsController.js'

const router = express.Router()

// GET /api/grafics
router.get('/general-month', graficsController.getDataGeneralMonth)

// GET /api/grafics/:id
router.get('/execution-index', graficsController.getDataExecutionIndex)

export default router

