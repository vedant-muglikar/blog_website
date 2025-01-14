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
    title: "second Blog",
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

app.get("/blogs", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/addBlog", (req, res) => {
  res.render("add.ejs");
});

/*post method */

app.post("/", (req, res) => {
  console.log(req.body);

  /*Adding blog to list */
  let title = req.body["title"];
  let content = req.body["content"];
  let index = blogs.length + 1;
  console.log(index);

  blogs.push({ id: index, title: title, content: content });
  console.log(blogs);

  res.render("index.ejs", { blogs });

  /*Rechecking for the blog */
  blogs.forEach((blog, index) => {
    app.get(`/${blog.id}`, (req, res) => {
      console.log(blog.id);
      console.log(blog);
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
