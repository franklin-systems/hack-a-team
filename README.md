# Hack-a-Team
An app that brings Tinder-like functionality to selecting a team for hackathons.

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
