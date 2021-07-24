const express = require("express");
const router = express.Router();
const ruleValidator = require("../validator/rule-validator");

router.get("/", (request, response) => {
    if (request.method !== "GET")
      return response
        .status(403)
        .json({ message: "Only GET requests are allowed" });
    return response
      .status(200)
      .json({
        message: "My Rule-Validation API",
        status: "success",
        data: {
          name: "Oluwabusola Adeleke",
          github: "@BABABUSOLA",
          email: "queenbusola1@gmail.com",
          mobile: "08066109631",
          twitter: "@queenbusola",
        },
      });
  });
  

router.post("/validate-rule", ruleValidator.rule);

module.exports = router;