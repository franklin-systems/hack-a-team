# ETH Denver Hackathon
## Tech Stack
- JS
- Foundry
- ComposeDB
- Lens Protocol

## Startup
- docker compose up
- Ganache data:
  - `make seed`
  - copy contract address to .env
- Ceramic data:
  - `make compile-schema`
  - to seed first 12 hackers: http://localhost:5005
    - pull in `ceramic/seed/seed-variables.graphql`
    - pull in `ceramic/seed/seed-query.graphql`

## Remaining Work
Eric:
- seed first 12 hackers in Ganache

Shaan/Nikhil/Eli:
- fix `hackathon.registerAsCaptain` and `hackathon.registerAsHacker`
  - silently failing, no error
- captain view:
  - confirm adding to team works (hooked up but haven't been able to test since can't seed hackers/captains in ganache)
  - fetch team members and display at top
