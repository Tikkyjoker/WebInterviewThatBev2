create schema interview collate utf8mb4_0900_ai_ci;
use interview;
create table if not exists contact
(
    id                         CHAR(36) default (uuid()) not null
        primary key,
    firstname                  VARCHAR(200)              null,
    lastname                   VARCHAR(200)              null,
    sex                        VARCHAR(10)               null,
    email                      VARCHAR(200)              null,
    phone                      VARCHAR(50)               null,
    birthday                   DATE                      null,
    occupation                 VARCHAR(200)              null,
    profile_content            MEDIUMTEXT                null,
    profile_type               VARCHAR(100)              null
);