export-accounts:
	docker exec ganache cat accounts.json > accounts.json

foundry-shell:
	docker compose run --rm foundry sh

compile-schema:
	npx composedb composite:create ceramic/schema/hackathon.graphql --output=ceramic/schema/hackathon.json --did-private-key=075145b34b7e8736c710b705a628563d591a754dadd37bb5ce36e06a94615116
	npx composedb composite:deploy ceramic/schema/hackathon.json --ceramic-url=http://localhost:7007 --did-private-key=075145b34b7e8736c710b705a628563d591a754dadd37bb5ce36e06a94615116
	npx composedb composite:compile ceramic/schema/hackathon.json frontend/src/schema/runtime-composite.js
