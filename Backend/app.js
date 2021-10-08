var express = require("express");
var mongoose = require("mongoose");
const cors=require("cors");
var app = express();

const productsRoutes = require("./routes/products");
const categoriaRoutes = require("./routes/categoria");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
//coneccion a la db mongo
mongoose.connect("mongodb+srv://alejo:IIrpVJdHq1P7H9KE@cluster0.702jh.mongodb.net/improTicDB?retryWrites=true&w=majority").then(() => {
    console.log("Estamos conectados")
});

app.use("/api/products", productsRoutes);
app.use("/api/categoria", categoriaRoutes);
module.exports = app;