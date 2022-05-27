# IOU (Intersection over union)
NODE REACT app to simulate
---

<b> Goal: </b> A node js app that provides a JSON HTTP API (server) and a react js web application (client) that uses the API to calculate the overlap between two bounding boxes.

---

## Requirement:

1. The web app should be able to submit bounding box coordinates via an HTTP request and the API should return the IoU value between 0 and 1, rounded to 3 decimal places. 
2. The web app provides a single page and the results from the API should asynchronously (no page refresh/load) update the view.

---

## Technical pre requisite:

1. node (v14+)
2. docker
3. docker-compose 

---

## Technical Component 

The application consist of two components namely a backend of nodeJS running at port 8000 and a frontend using react running at port 3000. 
This two components are stitched together with the help of docker-compose and nginx server which exposes an united port of 81. The frontend can be reached by ```http://localhost:81/``` and the backend can be reached by ```http://localhost:81/api/```. 
The backend uses express to create the rest endpoins. 
The frontend uses react-konva to create canvas graphics.

The port and the decimal precision can be configured using node environment variable. 

### API Information

<table>
<thead>
<tr>
<th>API</th>
<th>Method</th>
<th>Response</th>
<th>Request Body</th>
</tr>
</thead>
<tbody>
<tr>
<td>/api/computeIOU</td>
<td>POST</td>
<td>Returns the degree of overlap upto n decimal point with response code 200</td>
<td>{
   "bbox1":{"x": 883.02197802197803, "y": 89.47887323943662, "width":-775.3846153846155, "height": 276.0563380281691, "key": 1},
   "bbox2":{"x": 499.02197802197803, "y": 53.47887323943662, "width":-415.3846153846154, "height": 341.1267605633803, "key": 2}
</td>
  </tr>
<tr>
<td>/api</td>
<td>GET</td>
<td>Health check</td>
<td>
</td>
</tr>
</tbody>
</table>

---

## Running the application

There are two ways of running the applicaton - first using docker and second running the applications individually. A makefile is provided to to facilitate both ways. 

Once you have cloned this project to your local system you can follow either of the two methods:

### Method 1 : 

The default method is to create docker images and run them in container. This is achieved by running the command ```make``` from the root folder. 
The ```make``` command in turn calls 

1. <b>lint</b> which generates lint report for both the components.
2. <b>test</b> which generates the test report for the nodeJS project with coverage.
3. <b>docker_run</b> which generates the docker images, runs them and exposes port ```81``` to reach the application. 

These three stages can be individually called by using ```make <job_name>```.

### Method 2 : 

The second method is to run the application without dockerization. For this we call ```make run_app``` command. This command also follows the same path of linting, test coverage and then finally running the application. The only difference is the last stage where instead of dockerization, we individually run the application using ```npm start```. 

In this method, the frontend is exposed in port ```3000``` and backend at port ```8000```. 

---

## Known Technical debt







