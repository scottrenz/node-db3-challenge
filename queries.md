# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.

select productname, categoryname from products as p left join categories as c on p.categoryid = c.categoryid union select productname, categoryname from products as p right join categories as c on p.categoryid = c.categoryid

### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.

select * from orders as o
left join shippers as s
on o.shipperid = s.shipperid
where orderdate < (select orderdate from orders where orderid =10409)

### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.

select ProductName, Quantity from products as p
left join orderdetails as o
on o.productid = p.productid
where orderid=10251
order by 1

### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.

select a.Orderid as Orderid, a.CustomerName as CustomeerName, e.lastname as EmployeeLastName
from
(select * from
orders as o
left join customers as c
on o.customerid = c.customerid) as a
left join employees as e
on a.employeeid = e.employeeid


### (Stretch)  Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.

select CategoryName,count(productname)as [Count]
from products as p
left join categories as c
on p.categoryid = c.categoryid
group by categoryname


### (Stretch) Display OrderID and a  column called ItemCount that shows the total number of products placed on the order. Shows 196 records. 

select OrderId, sum(quantity) as ItemCount
from orderdetails
group by orderid
