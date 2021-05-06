const PostgresService = require("../../services/postgres.service");
const _pg = new PostgresService();

const ExcelService = require("../../services/excel.service");
const _exceljs = new ExcelService();

const getPersonas = async (_req, res) => {
  let sql = "select * from personas";
  try {
    let result = await _pg.executeSql(sql);
    let rows = result.rows;

    return res.send({
      ok: true,
      message: "Personas consultadas",
      content: rows,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error consultando las personas",
      content: error,
    });
  }
};

/**
 * Método para consultar una persona
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getPersona = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = "select * from personas WHERE id='" + id + "'";
    let result = await _pg.executeSql(sql);
    let rows = result.rows;
    return res.send({
      ok: true,
      message: "Persona consultada",
      content: rows[0],
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error consultando la persona",
      content: error,
    });
  }
};

/**
 * Método para crear una persona
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const createPersona = async (req, res) => {
  try {
    let persona = req.body;
    let sql = `INSERT INTO public.personas
    (id, "name", email) VALUES('${persona.id}', '${persona.name}', '${persona.email}');`;
    let result = await _pg.executeSql(sql);
    console.log(persona);
    return res.send({
      ok: result.rowCount == 1,
      message: result.rowCount == 1 ? "Persona creada" : "La persona no fue creada",
      content: persona,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error creando la persona",
      content: error,
    });
  }
};

const crearReportePersonas = async (req, res) => {
  let sql = `SELECT id, name, email FROM public.personas;`;

  try {   
    let result = await _pg.executeSql(sql);
    
    let rows = result.rows;
    await _exceljs.crearHojaDePersonas(rows);
    return res.send({
      ok: true,
      message: "Excel creado",
      content: rows[0],
      enlace: "http://localhost:3001/docs/universidad.xlsx",
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Error en servidor creando reporte excel",
      content: error,
    });
  }
};

module.exports = { getPersonas, createPersona, getPersona, crearReportePersonas };
