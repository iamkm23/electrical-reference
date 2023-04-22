const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Generate routes for all HTML files in the "public" directory
fs.readdirSync(path.join(__dirname, "public")).forEach((file) => {
  if (path.extname(file) === ".html") {
    const route = "/" + path.basename(file, ".html");
    app.get(route, (req, res) => {
      res.sendFile(path.join(__dirname, "public", file));
    });
  }
});

// Generate routes for all HTML files in the "public/calculators" directory
fs.readdirSync(path.join(__dirname, "public", "calculators")).forEach(
  (file) => {
    if (path.extname(file) === ".html") {
      const route = "/calculators/" + path.basename(file, ".html");
      app.get(route, (req, res) => {
        res.sendFile(path.join(__dirname, "public", "calculators", file));
      });
    }
  }
);

app.get("*", (req, res) => {
  res.status(404).json({ error: "resource not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is listening at ${PORT}`));
