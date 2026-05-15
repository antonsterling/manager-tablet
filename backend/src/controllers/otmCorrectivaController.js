import { getMachines } from '../services/otmCorrectivaService.js'

export async function getListMachines(req, res, next) {
    try {
        const machines = await getMachines()
        res.json(machines)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}