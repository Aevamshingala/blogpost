import connectionDb from "../model/connect.js";
import app from "./app.js";

connectionDb()
  .then(() => {
    app.listen(3000, () => {
      console.log(`server is runnin on 3000`);
      app.on("error", (error) => {
        console.log("connection error", error);
        throw error;
      });
    });
  })
  .catch((err) => {
    console.log("mongo db connection failed !!!", err);
  });
