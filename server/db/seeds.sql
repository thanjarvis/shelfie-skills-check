create table products(
    id serial primary key,
    name varchar(25),
    price integer,
    img text
)

-- dummy data set up

insert into products(
    name, price, img
)values(
    'shoes', 20, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
)