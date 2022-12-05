const { Router } = require("express");

const homeController = require("../controllers/homeController");

const router = new Router();

//  @desc   Weblog Index Page
//  @route  GET /
router.get("/", homeController.getIndex);

//  @desc   Weblog Post Page
//  @route  GET /post/:id
router.get("/post/:id", homeController.getSinglePost);

module.exports = router;
