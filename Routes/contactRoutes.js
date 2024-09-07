const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler")
// Controllers Imported from ./controllers
const {getContact,createContact,getContacts,updateContact,deleteContact} = require("../controllers/contactController")


router.use(validateToken);


// Get Route
router.route("/").get(getContacts);

// Post Route
router.route("/").post(createContact);

// Get specific Route
router.route("/:id").get(getContact);

// Put Route
router.route("/:id").put(updateContact);

// Delete Route
router.route("/:id").delete(deleteContact);





module.exports = router;