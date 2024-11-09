let mongoose = require("mongoose");

let analyseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  nomUser: {
    type: String,
    required: true,
  },
  cin: {
    type: String,
    required: true,
  },
  numPhone:{
    type:String,
    required:true
},
  projet: {
    type: String,
    required: true,
  },
  objectif: {
    type: String,
    required: true,
  },
  typeAnalyse: {
    type: String,
    enum: ["analyse complete", "analyse incomplete"],
    required: true,
  },
  analyses:[{
    nom:{
        type:String
    },
    prix:{
        type:Number
    }
  }],

  prixTotal:{
    type:Number,

  },

  fichierPaiment: {
    type: String,
    default: "",
  },
  paimentStatus: {
    type: Boolean,
    default: false,
  },

  resultatAnalyse:{
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
}

 
});

module.exports = mongoose.model("analyse", analyseSchema);
