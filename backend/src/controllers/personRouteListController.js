import { listPersonRoute } from '../services/personRouteListService.js'

export async function getlistPersonRoute(req, res, next) {
    try {
        const codigoPersona = String(req.query.codigoPersona || '').trim()
        if (!codigoPersona) {
            return res.status(400).json({ error: 'codigoPersona es requerido' })
        }
        const personRoute = await listPersonRoute(codigoPersona)
        res.json(personRoute)
    } catch (err) {
        next(err)
    }
}

