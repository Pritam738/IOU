const request = require("supertest")
const app = require('../appExpress'); // Where your app instance is

describe("GET / ", () => {
    test("It should respond with an message `Up and Running...`", async () => {
        const response = await request(app).get("/");
        expect(response.text).toEqual("\"Up and Running...\"");
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /api/computeIoU', () => {
    it('Check if results when proper inputs were provided ', async () => {
        const response = await request(app)
        .post('/api/computeIoU')
        .send(JSON.stringify({
            "bbox1":{"x": 88.02197802197803, "y": 106.47887323943662, "width": 256.15384615384613, "height": 88.7323943661972, "key": 1},
            "bbox2":{"x": 88.02197802197803, "y": 106.47887323943662, "width": 256.15384615384613, "height": 88.7323943661972, "key": 2}
        })) // x-www-form-urlencoded upload
        .set('Accept', 'application/json');
        expect(response.text).toEqual("\"1.000\"");
        expect(response.statusCode).toBe(200);
    });

    it('Check if results when improper inputs were provided ', async () => {
        const response = await request(app)
        .post('/api/computeIoU')
        .send(JSON.stringify({
            "bbox1":{"x": 88.02197802197803, "y": 106.47887323943662, "height": 88.7323943661972, "key": 1},
            "bbox2":{"x": 88.02197802197803, "y": 106.47887323943662, "width": 256.15384615384613, "height": 88.7323943661972, "key": 2}
        })) // x-www-form-urlencoded upload
        .set('Accept', 'application/json');
        expect(response.statusCode).toBe(400);
    });

    it('Check if results when improper json were provided ', async () => {
        const response = await request(app)
        .post('/api/computeIoU')
        .send('{\
            "bbox1":{"x": 88.02197802197803, "y": 106.47887323943662, "width": 256.15384615384613, "height": 88.7323943661972, "key":},\
            "bbox2":{"x": 88.02197802197803, "y": 106.47887323943662, "width": 256.15384615384613, "height": 88.7323943661972, "key": 2}\
        }') // x-www-form-urlencoded upload
        .set('Accept', 'application/json');
        expect(response.statusCode).toBe(400);
    });
  });