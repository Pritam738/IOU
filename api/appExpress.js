const express = require('express');
var cors = require('cors');
const controller = require('./controller');
const { getReqData } = require('./utils');

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
	// get the computeIoUs.
	const healthInfo = await new controller().healthInfo();
	res.end(JSON.stringify(healthInfo));
});

app.post('/api/computeIoU', async (req, res) => {
	try{
		let computeIoU_data = await getReqData(req);
		// create the computeIoU
		let computeIoU = await new controller().computeIoU(JSON.parse(computeIoU_data));
		// set the status code and content-type
		res.writeHead(200);
		//send the computeIoU
		res.end(JSON.stringify(computeIoU));
	} catch (error) {
		// set the status code and content type
		res.writeHead(400);
		// send the error
		res.end(JSON.stringify({ message: error }));
	}
});

module.exports = app ;