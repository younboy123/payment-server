const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("서버 정상 작동");
});

app.listen(3000, () => {
  console.log("Server running");
});
