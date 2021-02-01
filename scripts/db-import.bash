#!/bin/bash -e

test -f .env && source .env
psql $DATABASE_URL -f database/schema.sql -f database/data.sql
