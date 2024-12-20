const express = require("express");
const cors = require("cors");

const app = express();

// Allow requests from any origin
app.use(cors());
app.options("*", cors());

app.post("/", (req, res) => {
  const {username,password}=req.body
  console.log('password', password)
  console.log('username', username)
  return res.send("<h1>yes</h1>");
});

app.listen(3001, () => {
  console.log("App is listening at port 3001");
});
