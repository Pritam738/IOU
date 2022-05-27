import React, { useState } from 'react';
import DrawAnnotations from './component/drawAnnotations';

function App() {
	const [computedIoU, setComputedIoU] = useState('...');
	const sendDataToParent = (index) => { // the callback. Use a better name
		setComputedIoU(index);
	};
	return (
		<div>
			<p>Start to draw!</p>
			<div style={{display: 'flex'}}>
				<DrawAnnotations sendDataToParent={sendDataToParent} />
				<div style={{padding: '1%'}}><h1>Showing computed Intersection Over Union {computedIoU}*100%</h1></div>
			</div>
		</div>
	);
}
 
export default App;
