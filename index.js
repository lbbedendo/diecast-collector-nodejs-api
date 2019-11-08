require("dotenv").config();

const app = require("./src/server");

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Express listening on port:", process.env.PORT);
});
