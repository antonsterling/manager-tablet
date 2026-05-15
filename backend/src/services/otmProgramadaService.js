import db from '../db/index.js'

export async function getOtmProgramadas(codigoPersona) {
    const sql = `
        SELECT 
            OTM.ID_OTM,
            OTM.FECHA_PROGRAMADA, 
            OTM.LIMITE_CIERRE,
            AC.NOMBRE_ACTIVIDAD, 
            AC.TIPO_MANTENIMIENTO,
            AC.CLASE_ACTIVIDAD
        FROM OTM, ACTIVIDAD AC, CIERRE_MOD CM
        WHERE OTM.CUMPLIDA = 'NO'
            AND OTM.ID_ACTIVIDAD = AC.ID_ACTIVIDAD
            AND OTM.ID_OTM = CM.ID_OTM
            AND CM.CODIGO_PERSONA = ?
        ORDER BY OTM.FECHA_PROGRAMADA`
    const rows = await db.query(sql, [codigoPersona])
    return rows
}