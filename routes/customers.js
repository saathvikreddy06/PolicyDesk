const express = require("express");
const router = express.Router();

const { isLoggedIn, validateCustomer, validatePolicy } = require("../middleware");
const {showCustomers, addCustomer, 
    saveCustomer, showCustomer, addNewPolicy,
savePolicy,editCustomer, saveChanges,
deleteCustomer} = require("../controllers/customersController");
const asyncWrap = require("../utils/asyncWrapper");

router.get("/", isLoggedIn, asyncWrap(showCustomers));

router.get("/new", isLoggedIn, addCustomer);

router.post("/", isLoggedIn, validateCustomer, asyncWrap(saveCustomer));

router.get("/:id", isLoggedIn, asyncWrap(showCustomer));

router.get("/:id/policies/new", isLoggedIn, asyncWrap(addNewPolicy));

router.post("/:id/policies", isLoggedIn, validatePolicy, asyncWrap(savePolicy));

router.get("/:id/edit", isLoggedIn, asyncWrap(editCustomer));

router.patch("/:id", isLoggedIn, validateCustomer, asyncWrap(saveChanges));

router.delete("/:id", isLoggedIn, asyncWrap(deleteCustomer));

module.exports = router;