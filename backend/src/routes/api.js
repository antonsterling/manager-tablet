import express from 'express'
import usersRouter from './users.js'
import graficsRouter from './grafic.js'
import personRouteListRouter from './personRouteList.js'

const router = express.Router()

// Montar subrutas de la API aquí.
router.use('/users', usersRouter)
router.use('/grafics', graficsRouter)
router.use('/personRouteList', personRouteListRouter)

export default router

