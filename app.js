//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");

const homeStartingContent = "An interview is a structured conversation where one participant asks questions, and the other provides answers. Preparing for interviews can be a tedious job to do ,after all it isnt easy to keep up with all the trends ,ranging from  attire to academics .The Interview Daily blog helps you in this,each week experts from varios domains write an article which can help you crack top companies.You can also contribute to this blog and help your friends by sharing your experiences";
const aboutContent = "I am a 4th year student of TIET patiala ,you can tell others about this blog if you like it";
const contactContent = "For any queries,complaints,suggestions contact at my e-mail:puneett2001@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

 let posts=[];

app.get("/",function(req,res){
  res.render("home",{Startingcontent: homeStartingContent,
  posts: posts});

});
app.get("/about",function(req,res){
  res.render("about",{aboutContent: aboutContent});
});
app.get("/contact",function(req,res){
  res.render("contact",{contactContent: contactContent});
});
app.get("/compose",function(req,res){
  res.render("compose");
});
app.post("/compose",function(req,res){
    const post={
      title: req.body.postTitle,
      content: req.body.postbody

    };
    posts.push(post);
    res.redirect("/");
});
app.get("/posts/:postName",function(req,res){
         const requestedTitle=_.lowerCase(req.params.postName);
         posts.forEach(function(post){
              const storedTitle=_.lowerCase(post.title);
              if(storedTitle === requestedTitle){
                  res.render("post",{
                    title:post.title,
                    content:post.content
                  });
              }

         });
});





let port=process.env.PORT;
if(port==null||port==""){
  port=3000;
}





app.listen(port, function() {
  console.log("Server started sucessfully!");
});
