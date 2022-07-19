const { parse } = require('json2csv');
const path = require('path');
const convertCsvToXlsx = require('@aternus/csv-to-xlsx');


const GenerateExcel = (req, res, next)=>{
	try {
		const fields = Object.keys(req.body[0]);
		const opts = { fields };
		const csv = parse(req.body, opts);		
		res.send(csv);
	  } catch (err) {
		console.error(err);
	  }
}

export default GenerateExcel;