import express from 'express'
import * as otmProgramadaController from '../controllers/otmProgramadaController.js'

const router = express.Router()

// GET /api/otmProgamada/list-otm-programadas
router.get('/list-otm-programadas', otmProgramadaController.listOtmProgramadas)



export default router
