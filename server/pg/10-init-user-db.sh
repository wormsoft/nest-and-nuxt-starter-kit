#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE DATABASE "project";
	CREATE DATABASE "task";
	CREATE DATABASE "user";
	CREATE DATABASE "ommg";
	CREATE DATABASE "disk";
	CREATE DATABASE "ai";
	CREATE DATABASE "news";
	CREATE DATABASE "notification";
EOSQL
