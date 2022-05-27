// controller.js
// Logic behind the functionalities
// eslint-disable-next-line no-undef
const accuracy = process.env.ACCURACY || 3;

class Controller {
	// getting all todos
	async healthInfo() {
		// return all todos
		return new Promise((resolve) => resolve('Up and Running...'));
	}

	async computeIoU(loc) {
		return new Promise((resolve) => {
			let x1 = Math.abs(loc.bbox1.x);
			let x2 = Math.abs(loc.bbox2.x);
			let y1 = Math.abs(loc.bbox1.y);
			let y2 = Math.abs(loc.bbox2.y);
			let w1 = Math.abs(loc.bbox1.width);
			let w2 = Math.abs(loc.bbox2.width);
			let h1 = Math.abs(loc.bbox1.height);
			let h2 = Math.abs(loc.bbox2.height);
			// Firstly, we calculate the areas of each box
			// by multiplying its height with its width.
			let area1 = w1 * h1;
			let area2 = w2 * h2;

			// Secondly, we determine the intersection
			// rectangle. For that, we try to find the
			// corner points (top-left and bottom-right)
			// of the intersection rectangle.
			let inter_x1 = Math.max(x1, x2);
			let inter_y1 = Math.max(y1, y2);
			let inter_x2 = Math.min(x1 + w1, x2 + w2);
			let inter_y2 = Math.min(y1 + h1, y2 + h2);

			// From the two corner points we compute the
			// width and height.
			let inter_w = Math.max(0, inter_x2 - inter_x1); 
			let inter_h = Math.max(0, inter_y2 - inter_y1);
                
			// If the width or height are equal or less than zero
			// the boxes do not overlap. Hence, the IoU equals 0.
			if (inter_w <= 0 || inter_h <= 0){
				resolve((0).toFixed( accuracy ));
			}
			// Otherwise, return the IoU (intersection area divided
			// by the union)
			else {
				let inter_area = inter_w * inter_h;
				resolve((inter_area / parseFloat(area1 + area2 - inter_area)).toFixed( accuracy ));
			}
			// return the new created todo
            
		});
	}
}
module.exports = Controller;
