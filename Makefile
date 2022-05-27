all : lint test run_docker

run_app: lint test
	cd api; npm start &
	cd ui; npm start &

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
	cd api; ./node_modules/.bin/eslint . --fix;
	echo 'Running Lint report for ui'
	cd ui; ./node_modules/.bin/eslint . --fix; 
