## <font color="red" size="5px"> Microservice Why Park Producer/Rest Api </font>

## Installation

```bash
$ cd src/api_producer && yarn install
$ cd src/api_consumer && yarn install
```
## Running the app

```bash
# development - esse que usamos com hotreload
$  cd src/api_producer &&  yarn run start
$  cd src/api_consumer &&  yarn run start

# watch mode
$ cd src/api_producer  && yarn run start:dev
$ cd src/api_consumer  && yarn run start:dev

# production mode
$  cd src/api_producer  && yarn run start:prod
$  cd src/api_consumer && yarn run start:prod
```
## Test

```bash
# unit tests
$   cd src/api_producer  && yarn run test
$   cd src/api_consumer  && yarn run test
# e2e tests
$ cd src/api_producer  && yarn run test:e2e
$ cd src/api_consumer  &&  yarn run test:e2e
# test coverage]
$ cd src/api_producer  && yarn run test:cov
$ cd src/api_consumer  && yarn run test:cov
```
## Cli
- Help
`
nest --help
`
- Generate 
  `nest g nameHelp`


      | name          │ alias       │ description                                  │
      │ application   │ application │ Generate a new application workspace         │
      │ class         │ cl          │ Generate a new class                         │
      │ configuration │ config      │ Generate a CLI configuration file            │
      │ controller    │ co          │ Generate a controller declaration            │
      │ decorator     │ d           │ Generate a custom decorator                  │
      │ filter        │ f           │ Generate a filter declaration                │
      │ gateway       │ ga          │ Generate a gateway declaration               │
      │ guard         │ gu          │ Generate a guard declaration                 │
      │ interceptor   │ itc         │ Generate an interceptor declaration          │
      │ interface     │ itf         │ Generate an interface                        │
      │ library       │ lib         │ Generate a new library within a monorepo     │
      │ middleware    │ mi          │ Generate a middleware declaration            │
      │ module        │ mo          │ Generate a module declaration                │
      │ pipe          │ pi          │ Generate a pipe declaration                  │
      │ provider      │ pr          │ Generate a provider declaration              │
      │ resolver      │ r           │ Generate a GraphQL resolver declaration      │
      │ resource      │ res         │ Generate a new CRUD resource                 │
      │ service       │ s           │ Generate a service declaration               │
      │ sub-app       │ app         │ Generate a new application within            |

------
## Banco de dados

1. Migrations

- Create:
   `npm run migration:create src/database/migrations/NameMigration`
- Gernerate:
   `npm run migration:generate src/database/migrations/BaseMigration`
- Run:
   `npm run migration:run`
- Revert:
   `npm run migration:revert`

2. Seeders


