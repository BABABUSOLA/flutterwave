const functions = require("firebase-functions");
const express = require("express");
const route = require("./routes");
const app = express();

app.use(express.json());
app.use("/", route);

exports.app = functions.https.onRequest(app);


