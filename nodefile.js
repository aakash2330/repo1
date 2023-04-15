const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const ADMIN = { email:"admin", password: "admin" };

function check_validity_of_request(email, password) {
  //checks validity of request
  if (email != null && password != null && email != "" && password != "") {
    return true;
  } else {
    return false;
  }
}

function signUpUsers(req) {
  if (check_validity_of_request(req.body.email, req.body.password)) {
    //checks whether the user already exist or not
    for (i = 0; i < USERS.length; i++) {
      if (USERS[i].email == req.body.email) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

function check_credentials_of_user(req) {
  for (i = 0; i < USERS.length; i++) {
    if (USERS[i].email == req.body.email) {
      if (USERS[i].password == req.body.password) {
        console.log(USERS[i]);
        return true;
      }
    }
  }
  return false;
}

const QUESTIONS = [
  {
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [
      {
        input: "[1,2,3,4,5]",
        output: "5",
      },
    ],
  },
];

const SUBMISSIONS = [{ submission1: "sub1" }, { submission2: "sub2" }];

const USERS = [
  { email: "email1", password: "password1" },
  { email: "email2", password: "password2" },
];

app.get("/", (req, res) => {
  res.json({
    name: "aakash",
  });
});

//signup
app.post("/signup", (req, res) => {
  if (signUpUsers(req)) {
    USERS.push(req.body);
    res.status(200);
    res.send();
  } else {
    res.send("SIGNUP FAILED");
  }
});

//login
app.post("/login", (req, res) => {
  if (!signUpUsers(req)) {
    if (check_credentials_of_user(req)) {
      res.send("TOKEN - TOKEN");
    } else {
      res.send("CHECK CREDENTIALS");
    }
  } else {
    res.send("BAD CREDENTIALS");
  }
});

app.get("/questions", (req, res) => {
  res.send(QUESTIONS);
});

app.get("/submissions", (req, res) => {
  res.send(SUBMISSIONS);
});

app.post("/submissions", (req, res) => {
  SUBMISSIONS.push(req.body);
  res.send("ADDED");
  console.log(SUBMISSIONS);
});

app.post("/addQuestion" , (req,res)=>{
    if(req.body.email=='admin' &&  req.body.password=='admin' ){
        QUESTIONS.push(req.body.question);
        console.log(QUESTIONS)
        res.send ("QUESTION ADDED");
    }
    else{
        res.send("NOT AUTHORISED")
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
