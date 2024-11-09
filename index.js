let express = require("express");
require("dotenv").config();
let cors = require("cors");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let { connectToDatabase } = require("./config/DbConnection");
let bcrypt = require("bcrypt");
let AdminModel=require('./models/adminModel')

//import les routes

let adminRouter=require('./routes/Admin.Routes')
let userRouter=require('./routes/User.Routes')
let informationRouter=require('./routes/Information.Routes')
let matiereRouter=require('./routes/Matiere.Routes')
let componentRouter=require('./routes/Component.Routes')
let notificationRouter=require('./routes/Notification.Routes')
let analyseRouter=require('./routes/Analyse.Routes')
// routes images
let imagesInformations=require('./routes/UploadInformation.Routes')
let imagesPaimentRouter=require('./routes/UploadFichierPaiment.Routes')
let fileResultatRouter=require('./routes/UploadResultat.Routes')
let photoRouter=require('./routes/UploadProfil.Routes')
let app = express();

app.use(express.json());

app.use(
  cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
  })
);




app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(
    "/api/upload/photo_profil",
    express.static(__dirname + "/upload/photo_profil")
  );
 app.use(express.static("/upload/photo_profil"));

 app.use(
  "/api/upload/informations",
  express.static(__dirname + "/upload/informations")
);
app.use(express.static("/upload/informations"));


app.use(
  "/api/upload/analyse",
  express.static(__dirname + "/upload/analyse")
);
app.use(express.static("/upload/analyse"));


app.use(
  "/api/upload/resultat",
  express.static(__dirname + "/upload/resultat")
);
app.use(express.static("/upload/resultat"));
let Port = process.env.Port||5000;


app.use('/api',adminRouter)
app.use('/api',userRouter)
app.use('/api',informationRouter)
app.use('/api',matiereRouter)
app.use('/api',componentRouter)
app.use('/api',notificationRouter)
app.use('/api',analyseRouter)
app.use('/api',imagesInformations)
app.use('/api',imagesPaimentRouter)
app.use('/api',fileResultatRouter)
app.use('/api',photoRouter)

//create admin if not existe
const CreateAdminIsNotExiste=async()=>{
    let findAdmin=await AdminModel.findOne()
    if(!findAdmin){
        let passe = "123456";
        let passwordHash = await bcrypt.hash(passe, 10);

        await AdminModel.create({
            name: "admin",
            email: "admin@gmail.com",
            password: passwordHash,
          });
    }
}


app.listen(Port, async () => {
connectToDatabase();
CreateAdminIsNotExiste()

  console.log("Server is running on port ", Port);
});