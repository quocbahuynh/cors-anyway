const express = require("express");
const axios = require("axios");
var cors = require('cors')
const app = express();

const port = 3000;

app.use(cors())

app.get("/", (req, res) => {
  res.send("cors anyway");
});

/* /image?url= */
app.get("/image", function (req, res, next) {
  const { url } = req.query;

  axios({
    method: "get",
    url: url,
    responseType: "arraybuffer",
  })
    .then(function (response) {
      var img = Buffer.from(response.data, "base64");

      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": img.length,
      });
      res.end(img);
    })
    .catch(function (error) {
      res.status(500).json({
        message: error.code,
      });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
