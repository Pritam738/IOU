//utils.js
function validateData(requestBody){
	let mainKeys = Object.values(requestBody);
	if(mainKeys.length === 2){
		let subValues1 = Object.values(mainKeys[0]);
		let subValues2 = Object.values(mainKeys[1]);
		if( subValues2.length=== 5  && subValues1.length===5){
			return subValues1.every((a)=>a!=undefined) ? subValues2.every((a)=>a!=undefined): false;
		}
	}
	return false;
}

function getReqData(req) {
	return new Promise((resolve, reject) => {
		try {
			let body = '';
			// listen to data sent by client
			req.on('data', (chunk) => {
				// append the string version to the body
				body += chunk.toString();
			});
			// listen till the end
			req.on('end', () => {
				// send back the data
				try {
					let requestBody = JSON.parse(body);
					if(validateData(requestBody)){
						resolve(body);
					}
					reject('improper input provided.');
				} catch (error) {
					reject(error.message);
				}            
			});
		} catch (error) {
			reject(error.message);
		}
	});
}
module.exports = { getReqData };