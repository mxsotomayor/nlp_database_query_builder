const express = require("express");
const { config } = require("dotenv");
const handleSearchRequest = require("./routes/search");
const { prepare } = require("./src");

const app = express();
config();

 
prepare();

app.get("/health", (req, res) => {
  res.json({
    healthy: true,
  });
});

app.use("/search", handleSearchRequest);

app.listen(8080, () => {
  console.log(`Started server at port: 8080!`);
});
