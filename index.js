import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { title } from "process";
const __dirname = dirname(fileURLToPath(import.meta.url));

let blogs = [
  {
    id: 1,
    title: "First Blog",
    content: "The quick brown fox jumps over the lazy dog",
  },
  {
    id: 2,
    title: "Second Blog",
    content: "The quick brown fox jumps over the lazy dog",
  },
];

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

/*Requests for links*/
app.get("/", (req, res) => {
  res.render("index.ejs", { blogs });
});

app.get("/del", (req, res) => {
  res.render("del.ejs");
});

app.get("/addBlog", (req, res) => {
  res.render("add.ejs");
});

/*post method */

app.post("/", (req, res) => {
  /*Adding blog to list */
  let title = req.body["title"];
  let content = req.body["content"];
  let index = blogs.length + 1;

  blogs.push({ id: index, title: title, content: content });

  res.render("index.ejs", { blogs });

  /*Rechecking for the blog */
  blogs.forEach((blog, index) => {
    app.get(`/${blog.id}`, (req, res) => {
      res.render("blog-con.ejs", { blog });
    });
  });
});

/*adding content to blogs */

blogs.forEach((blog, index) => {
  app.get(`/${blog.id}`, (req, res) => {
    res.render("blog-con.ejs", { blog });
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/*Deletion of a blog */
app.post("/deleted", (req, res) => {
  let idBlog = req.body.id;

  blogs.splice(idBlog - 1, 1);
  res.render("deleted.ejs");
});

/*Editing of blog */

app.get("/edit", (req, res) => {
  res.render("edit.ejs");
});

app.post("/edited", (req, res) => {
  console.log(req.body);
  blogs.forEach((blog) => {
    if (blog.id == req.body.id) {
      blog.title = req.body.title;
      blog.content = req.body.content;
    }
  });
  res.render("edited.ejs");
});

// app.post("/edited", (req, res) => {
//   let blogNo = req.body.id;
//   console.log(blogNo);
//   res.render("edited.ejs", { blogNo, blogs });
// });
