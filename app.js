const express = require("express");
const app = express();
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/productImages')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
    }
});



app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({storage:storage}).single("img"));
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","pug");
app.set("views","./public/views");


app.use("/admin",adminRoutes);
app.use(userRoutes);



app.use((req,res)=>{
    res.render("p_error", {title:"Sayfa Bulunamadı | marketsende"})
});


app.listen(63342, ()=> {
    console.log("63342 portu dinleniyor..")
});
