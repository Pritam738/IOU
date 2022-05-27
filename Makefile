all : lint test run_docker

run_app: lint test
	cd api; npm install; npm start &
	cd ui; npm install; npm run build; serve -s build &

build:
	echo 'Building docker images and running'
	docker-compose build

run_docker: build
	docker-compose up

test: 
	echo 'Running Test'
	cd api; npm test;

lint:
	echo 'Running Lint report for api'
	cd api; npm install; ./node_modules/.bin/eslint . --fix;
	echo 'Running Lint report for ui'
	cd ui; npm install; ./node_modules/.bin/eslint . --fix; 
