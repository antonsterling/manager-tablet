import db from '../db/index.js'

export async function listPersonRoute(codigoPersona) {
    const sql = `
    SELECT 
        PR.ID_NUMERICO, 
        PR.ID_TIPO_RUTA, 
        PR.FECHA_PROGRAMADA, 
        PR.OBSERVACION,
        
        TR.NOMBRE_TIPO_RUTA, 
        TR.CLASE_ACTIVIDAD ,
        
        MOD.NOMBRE_PERSONA
    FROM PROGRAMA_RUTA PR, MOD, TIPO_RUTA TR
    WHERE PR.CODIGO_PERSONA = MOD.CODIGO_PERSONA
        AND PR.ID_TIPO_RUTA = TR.ID_TIPO_RUTA
        AND PR.ESTADO = 'ABIERTA'
        AND MOD.CODIGO_PERSONA = ?
    ORDER BY PR.FECHA_PROGRAMADA DESC`
    const rows = await db.query(sql, [codigoPersona])
    return rows
}

