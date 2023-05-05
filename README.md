# Mrafqy
simple project (learning purpose). for more info please read the README file

Mrafqy is just a simulation app for customer e-wallet & services to purchase by customers, hint the ui in this project is very simple
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


Steps to build this project up `TODO`:
* `Done`Draw ERD
* `Done` Draw Wireframe
* `Done` Sequence Diagram
* `Done` Set Deadline to finish Project [60~90 hours]
* `In Progress` Work on Tasks
* `Backlog`Dockerize the app
* `Backlog`Add Notifications (as a new feature for an exists app)
* `Backlog`Write Tests
* `Backlog`How to convert to Event Driven Architecture (using tool like Rabbit MQ)

<a href="https://drive.google.com/drive/folders/1NW1FL7raf5dY4tDpgqHbOOCqkfGmQQx-?usp=sharing" target="_blank">
 Google Drive Link will contains all important files (analysis files)
</a>

Tasks & Estimate Time `estimate for backend ,frontend will take double time`:
#### Admin `Backend APIs done`
* Login API `1 hour`
* Customers crud API `3 hours`
* Services crud API `3 hours`
* Admins crud API `3 hours`
* Customer wallets withdraw & deposit API `2 hours`
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
* Login API `1 hour` [API Done]
* Register API `1 hour` [API Done]
* Get Profile API `1 hour` [API Done]
* Change Password API `1 hour` [API Done]
* Edit Profile API `1 hour` [API Done]
* Home API `1 hour` [API Done]
* Services List/Show API `2 hours` [API Done]
* Buy Service API `3 hours` [API Done]
* Transfer To Wallet API `3 hours` [API Done]
* Invoices List/Show API `2 hours` [API Done]
* Transfer List/Show API `2 hours` [API Done]
