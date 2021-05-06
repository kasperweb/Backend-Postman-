const Exceljs = require("exceljs");

class ExcelService {
	constructor() {
		this.libro_de_trabajo = new Exceljs.Workbook();
	}
	async crearHojaDePersonas(personas) {
		const hojaDePersonas = this.libro_de_trabajo.addWorksheet("personas");
		hojaDePersonas.columns = [
			{header: "Id", key: "id", width: 15},
			{header: "Nombre", key: "name", width: 40},
			{header: "Correo electrónico", key: "email", width: 50},
		];
		personas.forEach((persona) => {
			hojaDePersonas.addRow(persona);
		});
		await this.libro_de_trabajo.xlsx.writeFile("docs/bdUniversidad.xlsx");
	}
}
module.exports = ExcelService;
