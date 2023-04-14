CREATE TABLE admins (
    ID SERIAL PRIMARY KEY,
    name varchar(200),
    username varchar(200),
    password varchar(200),
    token varchar(200) null,
    created_at timestamp null,
    updated_at timestamp null
)

CREATE TABLE customers (
    ID SERIAL PRIMARY KEY,
    name varchar(200),
    phone varchar(200),
    password varchar(200),
    photo varchar(200) null,
    national_id varchar(200) null,
    created_at timestamp null,
    updated_at timestamp null
)