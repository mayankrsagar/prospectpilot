CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"company" varchar(255),
	"email" varchar(255),
	"phone" varchar(50),
	"address" text,
	"website" varchar(255),
	"score" integer,
	"created_at" timestamp DEFAULT now()
);
