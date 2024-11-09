let router = require("express").Router();
let multer = require("multer");


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/analyse/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({
  storage: storage,
});

router.post("/paiement", upload.single("file"), async (req, res) => {
  let file = req.file;

  res.json({ message: "Fichier téléchargé avec succès", result: file });
});

module.exports = router;
