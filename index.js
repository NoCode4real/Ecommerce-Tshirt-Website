const express = require("express");
const bodyParser = require("body-parser");
// import pg from "pg";
const pg = require("pg");
const path = require("path");
// import path from "path";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const staticPath = path.join(__dirname, "/public");
const db = new pg.Client({
  user : "postgres",
  host : "localhost",
  database : "tshirts",
  password : "post3456",
  port : 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
const home = app.use(express.static(staticPath));

app.get("/login", (req, res)=>{
  res.render("login.ejs")
})

app.get("/signup", (req, res)=>{
  res.render("signup.ejs");
})

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const check = await db.query("select * from users where username = $1", [username]);
    if (check.rows.length > 0) {
      res.send("Username alreay exist try logging in!");
    } else {
      await db.query("insert into users(username, email, password) values ($1, $2, $3)",
       [username, email, password]);
      res.send("Signed in successfully!")
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const check = await db.query("select * from users where username = $1", [username]);

    if (check.rows.length > 0) {
      const user = check.rows[0];
      const checkPass = user.password;

      if(password === checkPass){
        res.send("Password Matched!!");
      } else{
        res.send("Password Wrong!");
      }
    }
    else{
      res.send("User not found!");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});