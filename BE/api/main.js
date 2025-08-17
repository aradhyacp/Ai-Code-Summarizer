const express = require("express")
const cors = require("cors")
const app = express()
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.json({
        message: "working perfectly"
    })
})




app.use((err,req,res,next)=>{
     res.status(400).json({
        message: "internal server error "
     })
     console.log(err);
     
})

app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});


app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
})