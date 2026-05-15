import { getOtmProgramadas } from '../services/otmProgramadaService.js'

export async function listOtmProgramadas(req, res, next) {
    try {
        const codigoPersona = String(req.query.codigoPersona || '').trim()
        if (!codigoPersona) {
            return res.status(400).json({ error: 'codigoPersona es requerido' })
        }
        const otmProgramada = await getOtmProgramadas(codigoPersona)
        res.json(otmProgramada)
    }
    catch (err) {
        next(err)
    }
}
