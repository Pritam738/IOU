import React, { useState } from 'react';
import { Stage, Layer, Rect} from 'react-konva';
import PropTypes from 'prop-types';
import envVar from '../env';

const getComputedIoUData = (annotationsToDraw, sendDataToParent) => {
	//url
	console.log(envVar.DOCKERIZE);
	let postUrl = '';
	if (!envVar.DOCKERIZE){
		postUrl = 'http://localhost:8000';
	}else{
		postUrl = '/api';
	}
	return fetch(postUrl + '/computeIoU' ,{
		method: 'POST',
		body: JSON.stringify({
			'bbox1': annotationsToDraw[0],
			'bbox2': annotationsToDraw[1]
		})
	})
		.then(res => res.json())
		.then(
			(result) => {
				sendDataToParent(result);
				// return result;
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				console.log(error);
			}
		);
}; 
const DrawAnnotations = ({sendDataToParent}) => {
	const [annotations, setAnnotations] = useState([]);
	const [newAnnotation, setNewAnnotation] = useState([]);

	function reverse(sx, sy, x, y){
		var r1x = sx, r1y = sy, r2x = x,  r2y = y, d;
		if (r1x > r2x ){
			d = Math.abs(r1x - r2x);
			r1x = r2x; r2x = r1x + d;
		}
		if (r1y > r2y ){
			d = Math.abs(r1y - r2y);
			r1y = r2y; r2y = r1y + d;
		}
		return ({sx: r1x, sy: r1y, x: r2x, y: r2y}); // return the corrected rect.     
	}

	const handleMouseMove = event => {
		if (newAnnotation.length === 1) {
			const sx = newAnnotation[0].x;
			const sy = newAnnotation[0].y;
			const { x, y } = event.target.getStage().getPointerPosition();
			const getNewCoordinates = reverse(sx, sy, x, y);
			setNewAnnotation([
				{
					x: getNewCoordinates.sx,
					y: getNewCoordinates.sy,
					width: getNewCoordinates.x - getNewCoordinates.sx,
					height: getNewCoordinates.y - getNewCoordinates.sy,
					key: '0'
				}
			]);
		}
	};

	const handleMouseDown = event => {
		if (newAnnotation.length === 0) {
			const { x, y } = event.target.getStage().getPointerPosition();
			setNewAnnotation([{ x, y, width: 0, height: 0, key: '0' }]);
		}
	};

	const handleMouseUp = event => {
		if (newAnnotation.length === 1) {
			const sx = newAnnotation[0].x;
			const sy = newAnnotation[0].y;
			const { x, y } = event.target.getStage().getPointerPosition();
			const annotationToAdd = {
				x: sx,
				y: sy,
				width: x - sx,
				height: y - sy,
				key: annotations.length + 1
			};
			annotations.push(annotationToAdd);
			setNewAnnotation([]);
			setAnnotations(annotations);
		}
	};

	const annotationsToDraw = [...annotations, ...newAnnotation];
	if(annotationsToDraw.length===2)
		getComputedIoUData(annotationsToDraw, sendDataToParent);
	if(annotationsToDraw.length>2)
		setAnnotations([]);

	return (
		<Stage
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			width={900}
			height={700}
		>
			<Layer>
				{annotationsToDraw.map((value,i) => {
					return (
						<Rect
							key={i}
							x={value.x}
							y={value.y}
							width={value.width}
							height={value.height}
							fill= { i===1 ? 'red' : 'green' }
							stroke="black"
							opacity={0.5}
						/>
					);
				})}
			</Layer>
		</Stage>
	);
};

DrawAnnotations.propTypes = {
	sendDataToParent: PropTypes.func
};

export default DrawAnnotations;
