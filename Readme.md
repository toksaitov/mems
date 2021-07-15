# mems

**mems** is a simple Twitter clone.

## Inital Manual Setup

### Required Software

* Node.js (>= v16.3.0)
* npm (>= 7.17.0)
* MySQL (>= 8.0.25)

### Steps

1. Create an `.env` file. Inside the file specify the following

```
# Server Params
MEMS_HOST=localhost    # IP or hostname of the server
MEMS_PORT=8080         # Port to run the server on
MEMS_ADMIN_LOGIN=admin # Name of the administrator user
MEMS_ADMIN_PASSWORD=?  # Password of the administrator user
MEMS_SESSION_SECRET=?  # Session secret

# DB Params

DB_HOST=localhost # database location
DB_PORT=3306      # database port
DB_USER=?         # name of the database user
DB_PASS=?         # password of that user
DB_NAME=?         # name of the database itself
DB_DIALECT=?      # SQL dialect (mysql, mariadb, postgres, mssql)
```

2. Download and install npm libraries

```
npm install
```

3. Start the server

```
npm start
```

## Inital Setup through Docker

### Required Software

* Docker (>= 20.10.7)

### Steps

1. Install Docker and Docker Compose

2. Create an `.env` file as described in 'Inital Manual Setup'.

3. Start the system

```
docker-compose up
```

## Credits

Dmirii Toksaitov <dmitrii@toksaitov.com>
