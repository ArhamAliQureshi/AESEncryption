const { parse } = require('json2csv');
const path = require('path');
const convertCsvToXlsx = require('@aternus/csv-to-xlsx');


const GenerateExcel = (req, res, next)=>{
	try {
		const fields = Object.keys(req.body[0]);
		const opts = { fields };
		const csv = parse(req.body, opts);	
		res.setHeader("Content-disposition", "attachment; filename=report.csv");	
		res.set("Content-Type", "text/csv");
		res.send(csv);
	  } catch (err) {
		console.error(err);
	  }
}

export default GenerateExcel;