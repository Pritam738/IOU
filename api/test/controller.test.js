const controller = require("../controller");

describe('controller positive unit testing', () => {
    test('Testing for partial Intersection', async () => {
        let computeIoU_data = {
            "bbox1":{"x":3, "y":3, "width":7, "height":7},
            "bbox2": {"x":7, "y":7, "width":6, "height":6}
        }
        let computeIoU = await new controller().computeIoU(computeIoU_data);
        expect(computeIoU).toBe('0.118');
      });
    test('Testing for complete Intersection', async () => {
        let computeIoU_data = {
            "bbox1":{"x":3, "y":3, "width":7, "height":7},
            "bbox2": {"x":3, "y":3, "width":7, "height":7}
        }
        let computeIoU = await new controller().computeIoU(computeIoU_data);
        expect(computeIoU).toBe('1.000');
    });
    test('Testing non Overlapping', async () => {
        let computeIoU_data = {
            "bbox1":{"x":2, "y":2, "width":6, "height":6},
            "bbox2": {"x":10, "y":10, "width":5, "height":5}
        }
        let computeIoU = await new controller().computeIoU(computeIoU_data);
        expect(computeIoU).toBe('0.000');
    });
})
