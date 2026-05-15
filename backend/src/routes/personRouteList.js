import express from 'express'
import * as personRouteListController from '../controllers/personRouteListController.js'

const router = express.Router()

// GET /api/personRouteList
router.get('/', personRouteListController.getlistPersonRoute)

// GET /api/personRouteList/:id
//router.get('/:id', personRouteListController.getPersonRoute)

export default router

