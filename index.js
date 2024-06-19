const exp = require("constants");
const express = require("express");
const app = express();
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const path = require("path");
app.set("view engine","ejs");
const methodOverride = require('method-override')
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'public')));
app.listen(port,(req,res)=>{
    console.log(`listening on ${port}`);
})
let posts = [
    {
        id:uuidv4(),
        username:"aayush_roy03",
        content:"Do or Die!",
    },
    {
        id:uuidv4(),
        username:"aman_mandal",
        content:"Me gira hua banda...",
    },
    {
        id:uuidv4(),
        username:"abhi_yadav69",
        content:"I'm hustler.. :)",
    },
    
]
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})
app.get('/posts/new',(req,res)=>{
    res.render("new.ejs");
})
app.post('/posts',(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content})
    res.redirect("/posts");
})
app.get('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("show",{post});
})
app.get('/posts/:id/edit',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit",{post});  
})
app.patch('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id==p.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/posts");
})
app.delete('/posts/:id',(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id!==p.id);
    res.redirect('/posts');
})