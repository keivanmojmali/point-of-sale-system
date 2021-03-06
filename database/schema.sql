set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "inventory" (
	"itemId" serial NOT NULL,
	"type" VARCHAR(500) NOT NULL,
	"name" VARCHAR(500) NOT NULL,
	"description" VARCHAR(500) NOT NULL,
	"price" integer NOT NULL,
	"stock" integer NOT NULL,
	"img" VARCHAR(500) NOT NULL,
	CONSTRAINT "inventory_pk" PRIMARY KEY ("itemId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"firstName" VARCHAR(500) NOT NULL,
	"lastName" VARCHAR(500) NOT NULL,
	"storeName" VARCHAR(500) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "customers" (
	"customerId" serial NOT NULL,
	"phone" VARCHAR(500) NOT NULL,
	"firstName" VARCHAR(500) NOT NULL,
	"lastName" VARCHAR(500) NOT NULL,
	CONSTRAINT "customers_pk" PRIMARY KEY ("customerId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "orders" (
	"customerId" integer NOT NULL,
	"isComplete" BOOLEAN NOT NULL,
	"userId" serial NOT NULL,
	"total" integer NOT NULL,
	"orderArray" varchar[] NOT NULL,
	"openOrderId" serial NOT NULL,
	"orderId" serial NOT NULL,
	CONSTRAINT "orders_pk" PRIMARY KEY ("openOrderId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "directions" (
	"directionsid" serial NOT NULL,
	"src" VARCHAR(255) NOT NULL,
	CONSTRAINT "directions_pk" PRIMARY KEY ("directionsid")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "orderItems" (
	"orderId" integer NOT NULL,
	"itemId" integer NOT NULL,
	"orderItemsId" serial NOT NULL,
	CONSTRAINT "orderItems_pk" PRIMARY KEY ("orderItemsId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "bestSellers" (
	"itemId" integer NOT NULL,
	"bestSellerId" serial NOT NULL,
	CONSTRAINT "bestSellers_pk" PRIMARY KEY ("bestSellerId")
) WITH (
  OIDS=FALSE
);






ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("customerId") REFERENCES "customers"("customerId");


ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_fk0" FOREIGN KEY ("itemId") REFERENCES "inventory"("itemId");
ALTER TABLE "bestSellers" ADD CONSTRAINT "bestSellers_fk0" FOREIGN KEY ("itemId") REFERENCES "inventory"("itemId");
