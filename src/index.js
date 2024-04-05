import app from "./app.js";
import { connectToDb } from "./db/connection.js";
const PORT = process.env.PORT || 8000;
connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
