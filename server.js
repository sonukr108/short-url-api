const app = require("./api/index");

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
