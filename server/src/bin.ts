import { app } from ".";
const {
    PORT
  } = require("./config/server-config");

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});