import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import multer from "multer";

import connectDB from "../config/database";
import auth from "./routes/api/auth";
import userProfile from "./routes/api/user_profile";
import profile from "./routes/api/profile";
import roles from "./routes/api/roles";
import shows from "./routes/api/shows";
import jobs from "./routes/api/jobs";

const app = express();


var uploadedFilename = "";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(file.mimetype === 'application/pdf'){
      cb(null, 'src/public/uploads/resume')
    }else{
      cb(null, 'src/public/uploads/images')
    }
  },
  filename: function (req, file, cb) {
    if(file.mimetype === 'application/pdf'){
      var datePDF = Math.floor(Date.now() / 1000) + '-' + Math.floor(Math.random() * 1000);
      uploadedFilename = datePDF + '-' + file.originalname;
      cb(null, uploadedFilename);
    }else{
      var dateImage = Math.floor(Date.now() / 1000) + '-' + Math.floor(Math.random() * 1000);
      uploadedFilename = dateImage + '-' + file.originalname;
      cb(null, uploadedFilename);
    }
  }
})

var upload = multer({ storage: storage })

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("Server Working!");
});

// CORS configurations
var corsOptions = {
  origin: ['http://localhost:3000', 'http://mashghol.com/castingpax', 'http://dev.castingpax.com'],
  optionsSuccessStatus: 200,
  methods: "GET,POST, PUT"
}

app.use(upload.any());
app.use(cors(corsOptions));
app.use("/api/auth", auth);
app.use("/api/profile", userProfile);
app.use("/api/roles", roles);
app.use("/api/show", shows);
app.use("/api/job", jobs);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
