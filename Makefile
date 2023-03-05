include .env
export $(shell sed 's/=.*//' .env)

COMPOSEDB = docker compose run ceramic composedb

down:
	docker compose down

export-accounts:
	docker exec ganache cat accounts.json > accounts.json

foundry-shell:
	docker compose run --rm foundry sh

compile-schema:
	$(COMPOSEDB) composite:create schema/hackathon.graphql --ceramic-url=http://ceramic:7007 --output=schema/hackathon.json --did-private-key=$$COMPOSEDB_PRIVATE_KEY
	$(COMPOSEDB) composite:deploy schema/hackathon.json --ceramic-url=http://ceramic:7007 --did-private-key=$$COMPOSEDB_PRIVATE_KEY
	$(COMPOSEDB) composite:compile schema/hackathon.json schema/runtime-composite.json --ceramic-url=http://ceramic:7007
	$(COMPOSEDB) composite:compile schema/hackathon.json schema/runtime-composite.js --ceramic-url=http://ceramic:7007
	mv ceramic/schema/runtime-composite.js frontend/src/schema/runtime-composite.js

remove-volumes:
	docker compose down -v

remove-data-volumes:
	docker compose down
	docker volume rm hack-a-team_ganache-data

seed:
	docker compose exec frontend yarn seed

up:
	docker compose up
