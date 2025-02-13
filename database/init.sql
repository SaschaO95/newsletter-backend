CREATE TABLE "subscriber" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "phone" varchar
);

CREATE TABLE "newsletter" (
  "id" SERIAL PRIMARY KEY,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp,
  "author" varchar,
  "category" varchar NOT NULL,
  "content" varchar NOT NULL
);

CREATE TABLE "subscriber_newsletter" (
  "id" SERIAL PRIMARY KEY,
  "newsletter" INTEGER,
  "subscriber" INTEGER
);

ALTER TABLE "subscriber_newsletter" ADD FOREIGN KEY ("newsletter") REFERENCES "newsletter" ("id");

ALTER TABLE "subscriber_newsletter" ADD FOREIGN KEY ("subscriber") REFERENCES "subscriber" ("id");
