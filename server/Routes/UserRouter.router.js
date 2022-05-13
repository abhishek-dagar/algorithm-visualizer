const express = require("express");
const router = express.Router();
const path = require("path");
const { signup } = require("../models/signup");
const { signin } = require("../models/signin");
const { UserData } = require("../models/updateUserData");

router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  const signUp = new signup();
  const added = signUp.AddnewUser({ username, email, password });
  if (added) {
    res.json({ message: "user added", userToken: added });
  } else {
    res.status(400).json({ message: "User Already Exits" });
  }
});

router.post("/signin", (req, res) => {
  // const {ema,password} = req.body;
  const signIn = new signin();
  const added = signIn.CheckUser(req.body);
  if (added) {
    res.json({ message: "logged In", userToken: added });
  } else {
    res.status(400).json({ message: "username or password may be wrong" });
  }
});

router.post("/getuserdata", (req, res) => {
  const userdataobj = new UserData();
  const data = userdataobj.getuserData(req.body);
  if (data) {
    res.json({ userData: data });
  } else {
    res.status(400).json({ message: "username or password may be wrong" });
  }
});

router.post("/updateuserData", (req, res) => {
  const userdataobj = new UserData();
  const data = userdataobj.updateuserData(req.body);
  if (data) {
    res.json({ userData: data });
  } else {
    res.status(400).json({ message: "username or password may be wrong" });
  }
});

router.post("/addnewCodeData", (req, res) => {
  const userdataobj = new UserData();
  const data = userdataobj.addnewCodeData(req.body);
  if (data) {
    res.json({ userData: data });
  } else {
    res.status(400).json({ message: "file not added" });
  }
});

router.post("/updateuserCodeData", (req, res) => {
  const userdataobj = new UserData();
  const data = userdataobj.updateuserCodeData(req.body);
  if (data) {
    res.json({ userData: data });
  } else {
    res.status(400).json({ message: "file not found" });
  }
});

router.post("/deletuserCodeData", (req, res) => {
  const userdataobj = new UserData();
  const data = userdataobj.deletuserCodeData(req.body);
  if (data) {
    res.json({ userData: data });
  } else {
    res.status(400).json({ message: "file not found" });
  }
});

module.exports = router;
