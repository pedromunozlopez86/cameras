-- DROP SCHEMA public;
CREATE SCHEMA public AUTHORIZATION pg_database_owner;

-- DROP SEQUENCE public.cameras_id_seq;
CREATE SEQUENCE public.cameras_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;

-- DROP SEQUENCE public."captureRanges_id_seq";
CREATE SEQUENCE public."captureRanges_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;

-- DROP SEQUENCE public.captures_id_seq;
CREATE SEQUENCE public.captures_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;

-- DROP SEQUENCE public.events_id_seq;
CREATE SEQUENCE public.events_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;

-- DROP SEQUENCE public.users_id_seq;
CREATE SEQUENCE public.users_id_seq INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE;

-- public.cameras definition
-- Drop table
-- DROP TABLE public.cameras;
CREATE TABLE
    public.cameras (
        id serial4 NOT NULL,
        "ipAddress" varchar(15) NOT NULL,
        "portNo" int4 NOT NULL,
        protocol varchar(10) NOT NULL,
        "macAddress" varchar(50) NOT NULL,
        "channelId" varchar(50) NOT NULL,
        "createdAt" timestamp NOT NULL,
        "updatedAt" timestamp NOT NULL,
        CONSTRAINT "PK_88b40b9817f9f422121f861e1e8" PRIMARY KEY (id)
    );

-- public."captureRanges" definition
-- Drop table
-- DROP TABLE public."captureRanges";
CREATE TABLE
    public."captureRanges" (
        id serial4 NOT NULL,
        "rangeTypeId" int4 NOT NULL,
        "onlyDay" date NOT NULL,
        "weekStartDate" date NOT NULL,
        "weekEndDate" date NOT NULL,
        "monthStartDate" date NOT NULL,
        "monthEndDate" date NOT NULL,
        "createdAt" timestamp NOT NULL,
        "updatedAt" timestamp NOT NULL,
        CONSTRAINT "PK_ec8ae84271436c881f942058b83" PRIMARY KEY (id)
    );

-- public.cat_face_expressions definition
-- Drop table
-- DROP TABLE public.cat_face_expressions;
CREATE TABLE
    public.cat_face_expressions (
        id int4 NOT NULL,
        description varchar NOT NULL,
        CONSTRAINT cat_face_expressions_pk PRIMARY KEY (id)
    );

-- public.cat_gender definition
-- Drop table
-- DROP TABLE public.cat_gender;
CREATE TABLE
    public.cat_gender (
        id int4 NOT NULL,
        description varchar NOT NULL,
        CONSTRAINT cat_gender_pk PRIMARY KEY (id)
    );

-- public.cat_age_group definition
-- Drop table
-- DROP TABLE public.cat_age_group;
CREATE TABLE
    public.cat_age_group (
        id int4 NOT NULL,
        description varchar NOT NULL,
        CONSTRAINT cat_age_group_pk PRIMARY KEY (id)
    );

-- public.cat_glasses definition
-- Drop table
-- DROP TABLE public.cat_glasses;
CREATE TABLE
    public.cat_glasses (
        id int4 NOT NULL,
        description varchar NOT NULL,
        CONSTRAINT cat_glasses_pk PRIMARY KEY (id)
    );

-- public.cat_hats definition
-- Drop table
-- DROP TABLE public.cat_hats;
CREATE TABLE
    public.cat_hats (
        id int4 NOT NULL,
        description varchar NOT NULL,
        CONSTRAINT cat_hats_pk PRIMARY KEY (id)
    );

-- public.cat_range_type definition
-- Drop table
-- DROP TABLE public.cat_range_type;
CREATE TABLE
    public.cat_range_type (
        id int4 NOT NULL,
        description varchar NOT NULL,
        CONSTRAINT cat_range_type_pk PRIMARY KEY (id)
    );

-- public.cat_user_type definition
-- Drop table
-- DROP TABLE public.cat_user_type;
CREATE TABLE
    public.cat_user_type (
        id int4 NOT NULL,
        description varchar NOT NULL,
        CONSTRAINT cat_user_type_pk PRIMARY KEY (id)
    );

-- public.events definition
-- Drop table
-- DROP TABLE public.events;
CREATE TABLE
    public.events (
        id serial4 NOT NULL,
        "type" varchar NOT NULL,
        state varchar NOT NULL,
        description varchar NOT NULL,
        "captureId" int4 NOT NULL,
        "createdAt" timestamp NOT NULL,
        "updatedAt" timestamp NOT NULL,
        "captureRangeId" int4 NULL,
        CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY (id),
        CONSTRAINT "FK_34f60f6265d8d5e0b598bfe26a8" FOREIGN KEY ("captureRangeId") REFERENCES public."captureRanges" (id)
    );

-- public.users definition
-- Drop table
-- DROP TABLE public.users;
CREATE TABLE
    public.users (
        id serial4 NOT NULL,
        "name" varchar(50) NOT NULL,
        surname varchar(50) NOT NULL,
        email varchar(50) NOT NULL,
        "password" varchar(50) NOT NULL,
        "userTypeId" int4 NOT NULL,
        "captureRangeId" int4 NOT NULL,
        "createdAt" timestamp NOT NULL,
        "updatedAt" timestamp NOT NULL,
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id),
        CONSTRAINT "REL_66dc5ea3c1834e071b6eced2bd" UNIQUE ("captureRangeId"),
        CONSTRAINT "FK_66dc5ea3c1834e071b6eced2bda" FOREIGN KEY ("captureRangeId") REFERENCES public."captureRanges" (id)
    );

-- public.captures definition
-- Drop table
-- DROP TABLE public.captures;
CREATE TABLE
    public.captures (
        id serial4 NOT NULL,
        "peopleCount" int4 NOT NULL,
        "faceExpressionId" int4 NOT NULL,
        "ageGroupId" int4 NOT NULL,
        "genderId" int4 NOT NULL,
        mask bool NOT NULL,
        "glassesId" int4 NOT NULL,
        "hatId" int4 NOT NULL,
        "cameraId" int4 NOT NULL,
        "timestamp" timestamp NOT NULL,
        "createdAt" timestamp NOT NULL,
        "updatedAt" timestamp NOT NULL,
        "eventId" int4 NULL,
        CONSTRAINT "PK_857700c9fac22f0181b1fee6fc3" PRIMARY KEY (id),
        CONSTRAINT "REL_1574fed9062a1dd3909a30e833" UNIQUE ("cameraId"),
        CONSTRAINT "FK_1574fed9062a1dd3909a30e833f" FOREIGN KEY ("cameraId") REFERENCES public.cameras (id),
        CONSTRAINT "FK_1dd8704b9795dee3a0eac59884b" FOREIGN KEY ("eventId") REFERENCES public.events (id)
    );