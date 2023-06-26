const express = require("express");
const connectToMongo = require("./db");
const bodyParser = require("body-parser");
var cors = require("cors");
const path = require("path")
const Questions = require("./routes/Questions")

require('dotenv').config();

const app = express();

try{
    connectToMongo();
    app.listen(process.env.PORT, ()=>{
        console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);
    });
}
catch(err){
    console.log("Error here");
}

app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(express.json());
app.use(cors());

app.use("/api/auth" , require("./routes/Auth"));
// app.use("/api/questions",require("./routes/Questions"));
app.use("/api/questions",Questions);
app.use("/api/folders",require("./routes/Folders"))
app.use("/api/search" , require("./routes/Answer"));
app.use((req,res)=>{
    res.status(404).send("Invalid route");
})
