init:
	docker compose build --no-cache --force-rm
	docker compose run --rm bbdate-front yarn install

build:
	docker-compose build --no-cache --force-rm

up:
	docker-compose up