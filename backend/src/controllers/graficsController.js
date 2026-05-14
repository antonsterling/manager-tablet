import { getGeneralMonth, getExecutionIndex } from '../services/graficsService.js'


export async function getDataGeneralMonth(req, res, next) {
    try {
        const { startDate, endDate } = req.query
        const generalMonth = await getGeneralMonth(startDate, endDate)
        res.json(generalMonth)
    } catch (err) {
        next(err)
    }
}

export async function getDataExecutionIndex(req, res, next) {
    try {
        const { ano } = req.query
        const executionIndex = await getExecutionIndex(ano)
        res.json(executionIndex)
    } catch (err) {
        next(err)
    }
}