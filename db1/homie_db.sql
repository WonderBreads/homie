CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "USER"(
	ID UUID PRIMARY KEY	Default uuid_generate_v4() NOT NULL,
	createdate	TIMESTAMP,
	updatedate	TIMESTAMP,
	username VARCHAR(17),
	displayname VARCHAR(17),
	email VARCHAR(17));