let router = require("express").Router();
let multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/resultat/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept only files with .png, .jpg, .jpeg, or .pdf extensions
    const allowedTypes = ["application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(null, false);  // Reject the file
    }
  },
});

router.post("/resultat", upload.single("file"), async (req, res) => {
  let file = req.file;

  if (!file) {
    return res.status(400).json({success:false, message: "format de fichier non pris en charge, utilisez le format pdf" });
  }

  res.json({success:true, message: "Fichier téléchargé avec succès", result: file });
});

module.exports = router;
