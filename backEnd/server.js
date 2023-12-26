//require("dotenv").config();
const process = require("./Config/config.js");
const app = require("./app/app.js");
const PORT = process.env.PORT || 5000;
console.log(PORT)
app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port`);
});
