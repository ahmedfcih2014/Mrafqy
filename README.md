# Mrafqy
simple project (learning purpose). for more info please read the README file

Mrafqy is just a simulation app for customer e-wallet & services to purchase by customers
### Business Brief:
a simple page to show the services manager by admin & the ability to register/login for customers<br>
each customer has an E-Wallet he can charge this wallet by stripe (or another payment gateway) and then customer can pay him bills by him wallet ,then he can see the invoices generated<br>
or customer can transfer money to another one<br>
<br>
admin has the ability to manage data:
* customers
* services
* withdraw & deposit from customer wallets
* admins
* show a customer report
  * customer balance
  * transactions (desc order)
  * invoices (desc order)
* simple dashboard
  * counters [customers, services, total customer balance]
  * last 5 transactions (wallet transactions)
  * last 5 bought services + invoices
  * last 5 registered customers
* Stack:
  * Node JS
  * Express
  * Postgres
  * React
  * Docker
  * ORM (sequelize)


Steps to buidl this project up `TODO`:
* `Done`Draw ERD
* `Done` Draw Wireframe
* `Done` Sequence Diagram
* `Done` Set Deadline to finish Project [60~90 hours]
* `In Proress` Work on Tasks
* `Backlog`Dockerize the app
* `Backlog`Add Notifications (as a new feature for an exists app)
* `Backlog`Write Tests
* `Backlog`How to convert to Event Driven Architecture (using tool like Rabbit MQ)

<a href="https://drive.google.com/drive/folders/1NW1FL7raf5dY4tDpgqHbOOCqkfGmQQx-?usp=sharing" target="_blank">
 Google Drive Link will contains all important files (analysis files)
</a>

Tasks & Estimate Time `estimate for backend ,frontend will take double time`:
#### Admin
* Login API `1 hour`
* Customers crud API `3 hours`
* Services crud API `3 hours`
* Customer wallets withdraw & deposit API `2 hours`
* Admins crud API `3 hours`
* Customer report API `3 hours`
  * customer balance
  * transactions (desc order)
  * invoices (desc order)
* Dashboard API `1 hour`
  * counters [customers, services, total customer balance]
  * last 5 transactions (wallet transactions)
  * last 5 bought services + invoices
  * last 5 registered customers

#### Customer
* Login API `1 hour`
* Register API `1 hour`
* Get Profile API `1 hour`
* Change Password API `1 hour`
* Home API `1 hour`
* Edit Profile API `1 hour`
* Invoices List/Show API `2 hours`
* Transfer List/Show API `2 hours`
* Services List/Show API `2 hours`
* Buy Service API `3 hours`
* Transfer To Wallet API `3 hours`
