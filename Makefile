export-accounts:
	docker exec ganache cat accounts.json > accounts.json

foundry-shell:
	docker compose run --rm foundry sh