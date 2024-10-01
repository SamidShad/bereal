const express = require("express");
const DBconnection = require("./db/db");
const router = require("./routers/Router");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json({ limit: "35mb" }));

app.use("/api", router);

const PORT = 8002;

DBconnection.then(() => {
  app.listen(PORT, () => {
    console.log("Server Started");
  });
}).catch((error) => {
  console.log(error);
});
