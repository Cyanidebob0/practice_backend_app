const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    res.render("index", { files: files });
    res.send("HELLO_MAN");
  });
});

app.get("/edit/:filename", (req, res) => {
  res.render("edit", { filename: req.params.filename });
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      res.redirect("/");
    }
  );
});

app.post("/edit", (req, res) => {
  fs.rename(
    `./files/${req.body.oldName}`,
    `./files/${req.body.newName}`,
    (err) => {
      res.redirect("/");
    }
  );
});

app.get("/files/:fileName", (req, res) => {
  fs.readFile(`./files/${req.params.fileName}`, "utf-8", (err, fileData) => {
    res.render("readMore", {
      fileName: req.params.fileName,
      fileData: fileData,
    });
  });
});

app.listen(3000, () => {
  console.log("server is running");
});
