include .env
export $(shell sed 's/=.*//' .env)

export-accounts:
	docker exec ganache cat accounts.json > accounts.json

foundry-shell:
	docker compose run --rm foundry sh

compile-schema:
	npx composedb composite:create ceramic/schema/hackathon.graphql --output=ceramic/schema/hackathon.json --did-private-key=$$COMPOSEDB_PRIVATE_KEY
	npx composedb composite:deploy ceramic/schema/hackathon.json --ceramic-url=http://localhost:7007 --did-private-key=$$COMPOSEDB_PRIVATE_KEY
	npx composedb composite:compile ceramic/schema/hackathon.json ceramic/schema/runtime-composite.json
	npx composedb composite:compile ceramic/schema/hackathon.json frontend/src/schema/runtime-composite.js
