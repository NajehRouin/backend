let router = require("express").Router();
let multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/informations/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept only files with .png, .jpg, or .jpeg extensions
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(null, false);  // Reject the file
    }
  },
});


router.post("/informations", upload.single("file"), async (req, res) => {
  let file = req.file;

  if (!file) {
    return res.status(400).json({success:false, message: "format de fichier non pris en charge, utilisez le format png,jpg,jpeg" });
  }

  res.json({success:true, message: "Fichier téléchargé avec succès", result: file });
});

module.exports = router;
