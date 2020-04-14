#Ecommerce-Project

This is a project that focuses on building an online shopping platform for selling products.

The following features are implemented (updating):

- Display products with images and detailed information.

- There should be shopping cart implemented for checkout and seeing prices.

- Administration panel for importing and exporting product information.

- Change existing product information

- Administrator login page

---

V 0.11

    npm initiation

---

V 0.12

    setup express and nodemon for development

---

V 0.13

    start routing using express and monitor using nodemon

---

V 0.14

    responding request with a html block

---

V 0.15

    creating a form for sign up for admins with using post method

---

V 0.16

    parse data from request form sent from browser

---

V 0.17

    example of middleware of body parsing technique without edge caese.

---

V 0.18

    express body-parser middleware implemented.

---

V 0.19

merge pushing all package module settings.

---

V 0.21

creating custom data storage using user.js to form user.json file using fs.access/write

---

V 0.22

parsing data and testing data using getAll() method

---

V 0.23

refractor getAll()

---

V 0.24

add create() and push data into the data storage

---

V 0.25

add writeAll() to write all currentRecords from create()

---

V 0.26

indentation using JSON stringify()

---

V 0.27

add a unique randomised ID using fs.randomByte

---

V 0.28

implement getOne() to find user according to unique id

---

V 0.281

implement delete() to find user according to unique id and remove record

---

V 0.282

implement update() to find user according to unique id and object.assign the new attributes

---

V 0.283

implemented getOneBy() used to add filter for finding user

---

V 0.284

exports and required in index.js. check for email duplicates and password confirmation.

---

V 0.31

create user and retrieve the new user object.

---

V 0.311

clearing up the codes and overall structure

---

V 0.32

setting up sign up and sign out end point for the site

---

V 0.321

server logic for signin post

---

V 0.322

email password checked before signin using cookies

---

V 0.33

hash and salt version of the password added to improved security

---

V 0.34

compare password logic of using hash and salt algorithm

---

V 0.35

implemented in sign in logic with hash.salt password

---

V 0.36

full flow and improvements

---

V 0.41

implement sub router middleware for auth.js

---

V 0.411

refractor of the html template

---

V 0.412

introducing full html template

---

V 0.42

setup express validator for our authentication form

---

V 0.43

email password validation and sanitization

---

V 0.431

adding custom validation for email and pass

---

V 0.432

customised validator extracted

---

V 0.433

render signup form and display error if any

---

V 0.44

validation for sign in form

---

V 0.441

extract validation logic and implement return signin form when login unsuccesful

---

V 0.442

adding helper function to reduce duplication

---

V 0.443

styling added to signin and signup

---

V 0.444

public file to wire up css format etc

---

V 0.445

quick bug fix to passwordConfirmation not working as intented

---

V 0.45

products page routes

---

V 0.451

extend classes of repository for both products and users

---

V 0.452

add product html template

---

V 0.453

adding product validators to validator.js

---

V 0.51

adding more validatio message and use multer for image upload

---

V 0.52

validator before parsed data causing error bug, adding product information

---

V 0.521

new product page styling changed

---

V 0.522

bug fixed: email validation not working as intended

---

V 0.523

custom middleware for error handling

---

V 0.53

display existing product and redirect user on success

---

V 0.54

require auth for product view, redirect with failed validation, await bug fixed for signin

---

V 0.55

index.js product template update

---

V 0.56

product edit routing and template import

---

V 0.57

update edit page with new title price etc, errorhandler updated with new product param.

---

V 0.58

debug to correct the product object, template update for edit.js

---

V 0.581

delete product button implemented

---

V 0.582

create new product with no image and fix delete button

---

V 0.61

setup seed product.json file and add add route for product

---

V 0.62

adding user facing product route file

---

V 0.621

setup route in index.js and setup template view/index.js

---

V 0.622

adding more images and layout for product index

---

V 0.623

setup carts repository

---

V 0.63

setup carts subrouter js file and update index js

---

V 0.631

update user facing index page and cart id config

---

V 0.64

add cart adding feature for the add to cart button

---

V 0.65

showing cart products on cart page

---

V 0.651

quick template upgrade

---

V 0.652

adding in totalPrice value

---

V 0.66

adding carts deleting logic
