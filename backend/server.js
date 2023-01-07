const app = require("./app");
const PORT = process.env.PORT;
const databaseConnect = require("./db/db");

databaseConnect();
app.listen(PORT, () => {
  console.log(`port is listning at ${PORT}...`);
});

module.exports = app;
