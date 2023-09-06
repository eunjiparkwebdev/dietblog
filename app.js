//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "You came to the write place! Write your food here today!";
 

const aboutContent =
'Welcome to "Whatcha Eating Today: Your Personal Path to Wellness"!\n\n' +
"This is not just a blog; it's your companion on the journey to a healthier and happier you. We understand that every individual's path to wellness is unique, and that's why we're here to support and guide you on this transformative adventure.\n\n" +
"Let us be your virtual coach and confidante. With regular updates, motivational stories, delicious and nourishing recipes, and evidence-based advice from experts, you'll find all the tools you need to cultivate sustainable habits and make lasting changes in your life.\n\n" +
'No matter where you are on your wellness expedition, "Whatcha Eating Today" is here to cheer you on, offer guidance, and celebrate your victories. So, grab your pen and embark on this empowering journey with us. Together, let\'s create a life of balance, mindfulness, and wellness, one page at a time. Welcome to "Whatcha Eating Today: Your Personal Path to Wellness"!';
const contactContent =
  'Want advice on how to do a diet successfully? Contact me at <a href="mailto:eunjiparkwebdev@gmail.com">eunjiparkwebdev@gmail.com</a>';


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

// ** getting a home route ** //
app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts,
  });
});

// ** getting an "about" route ** //
app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

// ** getting a "contact" route ** //
app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

// ** getting a "compose" route ** //
app.get("/compose", function (req, res) {
  res.render("compose");
});

// ** getting a post route for "compose" ** //
app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };

  posts.push(post);

  res.redirect("/");
});

// ** this is to dynamically make a route that matches title name.
app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
