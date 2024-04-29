const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/listing.js");
const Patient = require("./models/appoint.js");
const Patientvol = require("./models/appoint.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


const mongoUrl = "mongodb://127.0.0.1:27017/validation";

main().then(() => {
    console.log("connected");
}).catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(mongoUrl);
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

//registration 
app.get("/redirect", (req, res) => {
    res.render("login.ejs");
});

//signUp route
app.post("/signup", async (req, res) => {
    const {name, email, password, age} = req.body;
    const newUser = new User({name, email, password, age});
       try{
        await newUser.save();
        res.send("signup success please login now");
        // res.redirect("");
       }catch (err){
            res.send("signup failed because of email and password is not unique");
       }
});

//login route
app.post("/signin", async (req, res) => {
    const {email, password} = req.body;
    
       try{
        const user = await User.findOne({email, password});
        if(user){
            req.user = user;
            res.send("login successful");
        }else{
            res.send("Invalid email and password please signup first");
        }
       }catch(err) {
        res.send("Internal server error");
       }
       
});

//appoint route
app.get("/appoint", (req, res) => {
    res.render("appoint.ejs");
});

//healt monitor route
app.get("/health", (req, res) => {
    res.render("health.ejs");
});

//caregive
app.get("/caregive", (req, res) => {
    res.render("caregive.ejs");
});

//engage
app.get("/engage", (req, res) => {
    res.render("engage.ejs");
});

app.post("/patient", async (req,res) => {
    const {name, email, age , phone, address} = req.body;
    const newPatient = new Patient({name, email, age , phone, address}) ;
    try{
        await newPatient.save();
        res.render("thank.ejs");
       }catch (err){
            res.send("Please re-check the inputs");
       }
});

// volunteer route
app.get("/volunteer", (req, res) => {
    res.render("vol.ejs");
});

app.post("/volunteer/data", async (req,res) => {
     res.render("thank.ejs");
});




app.listen(3000, () => {
    console.log("server is listening on port 3000");
});