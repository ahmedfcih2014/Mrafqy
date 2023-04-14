CREATE TABLE admins (
    ID SERIAL PRIMARY KEY,
    name varchar(200),
    username varchar(200),
    password varchar(200),
    token varchar(200) null
)

