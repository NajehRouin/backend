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
  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "fichier obligatoire" });
  }
  res.json({
    success: true,
    message: "Fichier téléchargé avec succès",
    result: file,
  });
});

module.exports = router;
