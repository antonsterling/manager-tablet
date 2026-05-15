import express from 'express'
import { getListMachines } from '../controllers/otmCorrectivaController.js'

const router = express.Router()

// GET /api/otmCorrectiva/list-machines
router.get('/list-machines', getListMachines)

export default router
