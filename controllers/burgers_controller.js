// think of this as the main file 
// burger_controller - burger - orm

// controlls all functions for one tables routes
var express = require('express');
var db = require("../models");
// all api routes
var router = express.Router();

// routes

// -- get route for the root route using express
// -- this route needs to connect to the burger.js (models) to select all the data

// router.get("route", function)
router.get("/", function (req, res) {
    // use db because that's where we require the model Burger
    // findAll is sequelize syntax to return all of the data
    db.Burger.findAll().then(function (data) {
        // res.render = result of the findAll function
        // res.render("route", {always returns an object - tablename: what you want back})
        res.render("index", { burgers: data });
    });
});

// router.post("route", function)
router.post("/burgers/insert", function (req, res) {
    // create is sequelize syntax that allows you to create new information into the database
    db.Burger.create(
        { // only have to specify the columns you need created
            burger_name: req.body.burger_name,
            devoured: 0
        }
    )(req.body, function (data) {
        // redirects to root or reloads page
        res.redirect("/");
    });
});

// router.put("route", function)
router.put("/burgers/:id", function (req, res) {
    // update is sequelize syntax that allows you to update existing information in the database
    db.Burger.update(
        {
            devoured: 1
        },
        {
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.sendStatus(200);
        });
});

module.exports = router;