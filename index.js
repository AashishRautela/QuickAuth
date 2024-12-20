import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config({path:'config.env'});

const app = express();


//middelwares
app.use(cors());
app.options("*", cors());

const PORT=process.env.PORT || 3002; 
app.post("/", (req, res) => {
  const {username,password}=req.body
  console.log('password', password)
  console.log('username', username)
  return res.send("<h1>yes</h1>");
});

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});
