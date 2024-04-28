const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");


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
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


app.get("/redirect", (req, res) => {
    res.render("login.ejs");
});

//signUp route
app.post("/signup", async (req, res) => {
    const {name, email, password, age} = req.body;
    const newUser = new User({name, email, password, age});
       try{
        await newUser.save();
        res.send("signup success");
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
            res.send("Invalid email and password");
        }
       }catch(err) {
        res.send("Internal server error");
       }
       
});


app.listen(3000, () => {
    console.log("server is listening on port 3000");
});