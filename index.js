const app = require("./src/app.js");
const { PORT = 9090 } = process.env;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
