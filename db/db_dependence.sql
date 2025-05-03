CREATE TABLE "user" (
  "id" integer PRIMARY KEY,
  "gmail" varchar,
  "password" varchar
);

CREATE TABLE "colum" (
  "id" integer PRIMARY KEY,
  "title_colum" varchar,
  "user_id" integer
);

CREATE TABLE "card" (
  "id" integer PRIMARY KEY,
  "colum_id" INTEGER,
  "title_card" varchar
);

CREATE TABLE "comments" (
  "id" integer PRIMARY KEY,
  "card_id" integer,
  "text" text
);

ALTER TABLE "colum" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "card" ADD FOREIGN KEY ("colum_id") REFERENCES "colum" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("card_id") REFERENCES "card" ("id");
