import db from '../db/index.js'

export async function getMachines() {
    const sql = `
        SELECT 
            PR.ID_PROCESO,
            PR.NOMBRE_PROCESO,
            ET.ID_ETAPA,
            ET.NOMBRE_ETAPA,
            MA.ID_MAQUINA,
            MA.NOMBRE_MAQUINA
        FROM PROCESO PR ,ETAPA ET, MAQUINA MA
        WHERE PR.ID_PROCESO = ET.ID_PROCESO AND
            ET.ID_ETAPA = MA.ID_ETAPA
        ORDER BY PR.NOMBRE_PROCESO, ET.NOMBRE_ETAPA, MA.NOMBRE_MAQUINA`
    const rows = await db.query(sql, [])
    return rows
}