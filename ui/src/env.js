/* eslint-disable no-undef */
let dockerize;
if(typeof $DOCKERIZE === 'undefined'){
	dockerize = false;
}else {
	dockerize = $DOCKERIZE;
}

const envVar = {
	DOCKERIZE: dockerize
};

module.exports = envVar;