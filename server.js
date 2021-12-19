const express = require('express');

const app = express();

app.use(express.static("./dist/front-end"))

app.get("/*", function (req, res) {
  res.sendFile("index.html", {
    root: "dist/front-end/"
  });
});

app.listen(process.env.PORT || 3000);
