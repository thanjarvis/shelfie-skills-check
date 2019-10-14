update products
set name=${name}, price=${price}, img=${img}
where id=${id};

select * from products
where id=${id};