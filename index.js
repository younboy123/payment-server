const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("서버 정상 작동");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
