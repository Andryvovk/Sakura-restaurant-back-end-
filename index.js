const express = require("express");
const cors = require('cors');
const menuRoutes = require("./routes/menu");
const authRoutes = require("./routes/auth");
const ordersRoutes = require("./routes/orders");
const bp = require("body-parser");

const app = express();
app.use(cors())
app.use(bp.json());


app.use("/api", menuRoutes);
app.use("/api", authRoutes)
app.use("/api", ordersRoutes);


app.listen(3000, () => console.log("server work"));
