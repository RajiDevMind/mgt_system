const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./connect");
const app = express();

const port = process.env.PORT || 5000;

// middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
app.get("/", (req, res) => {
  res.send("Hello, World. Mgt system!");
});

// Create user API
app.post("/add_user", async (req, res) => {
  // CHECK USER IF EXISTS IN DB
  const checkUser =
    "SELECT * FROM mgt_system.details WHERE name = ? OR email = ?";
  connectDB.query(checkUser, [req.body.name, req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
  });

  // CREATE NEW USER
  const createUser =
    "INSERT INTO details (`name`,`email`,`age`,`gender`) VALUES (?, ?, ?, ?)";

  const userDetails = [
    req.body.name,
    req.body.email,
    req.body.age,
    req.body.gender,
  ];
  connectDB.query(createUser, userDetails, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(`${req.body.name} added successfully!`);
  });
});

app.get("/retrieve_users", (req, res) => {
  const usersData = "SELECT * FROM details";

  connectDB.query(usersData, (err, data) => {
    if (err) res.json(err);
    return res.json(data);
  });
});

app.get("/get_user/:id", (req, res) => {
  const id = req.params.id;
  const userData = "SELECT * FROM details WHERE `id`=?";

  connectDB.query(userData, [id], (err, data) => {
    if (err) res.json(err);
    return res.json(data);
  });
});

app.post("/edit_user/:id", (req, res) => {
  const id = req.params.id;
  const userData =
    "UPDATE details SET `name`=?,`email`=?, `age`=?, `gender`=? WHERE `id`=?";
  const userDetails = [
    req.body.name,
    req.body.email,
    req.body.age,
    req.body.gender,
    id,
  ];
  connectDB.query(userData, userDetails, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.delete("/delete_user/:id", (req, res) => {
  const id = req.params.id;
  const userData = "DELETE FROM details WHERE `id`=?";

  connectDB.query(userData, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}...`);
});
