CREATE TABLE admins (
    ID SERIAL PRIMARY KEY,
    name varchar(200),
    username varchar(200),
    password varchar(200),
    token varchar(200) null,
    token_valid_til timestamp null,
    created_at timestamp null,
    updated_at timestamp null
);

CREATE TABLE customers (
    ID SERIAL PRIMARY KEY,
    name varchar(200),
    phone varchar(200),
    password varchar(200),
    photo varchar(200) null,
    national_id varchar(200) null,
    created_at timestamp null,
    updated_at timestamp null
);

CREATE TABLE services (
    ID SERIAL PRIMARY KEY,
    name varchar(200),
    icon varchar(200),
    price double precision default 0,
    brief text null,
    created_at timestamp null,
    updated_at timestamp null
);

CREATE TABLE wallets (
    ID SERIAL PRIMARY KEY,
    customer_id bigint,
    balance double precision default 0,
    created_at timestamp null,
    updated_at timestamp null
);

CREATE TYPE wallet_transaction_types AS ENUM ('in', 'out');

CREATE TABLE wallet_transactions (
    ID SERIAL PRIMARY KEY,
    wallet_id bigint,
    amount double precision default 0,
    type wallet_transaction_types,
    note varchar(200) null,
    created_at timestamp null,
    updated_at timestamp null
);
