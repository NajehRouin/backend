let analyse = require("../models/analyseModel");
let user = require("../models/userModel");

let analyseCtrl = {
  createAnalyse: async (req, res) => {
    try {
      const currentUser = await user.findById(req.userId);
      let { projet, objectif, typeAnalyse, analyses } = req.body;
      let arrayAnalyses = [];
      let prixTotal = 0;
      if (!projet) return res.status(302).json({ msg: "projet  Obligatoire" });
      if (!objectif)
        return res.status(302).json({ msg: "objectif  Obligatoire" });
      if (!typeAnalyse)
        return res.status(302).json({ msg: "typeAnalyse  Obligatoire" });

      if (analyses.length === 0)
        return res.status(302).json({ msg: "analyses  Obligatoire" });

      for (let i = 0; i < analyses.length; i++) {
        prixTotal += analyses[i].prix;
        arrayAnalyses.push({
          nom: analyses[i].nom,
          prix: analyses[i].prix,
        });
      }
      let newAnalyse = new analyse({
        user: currentUser?._id,
        nomUser: currentUser?.name,
        cin: currentUser?.cin,
        numPhone: currentUser?.numPhone,
        projet,
        objectif,
        typeAnalyse,
        analyses: arrayAnalyses,
        prixTotal: prixTotal,
      });

      await newAnalyse.save();

      res.status(201).json({
        data: newAnalyse,
        success: true,
        error: false,
        message: "votre demande d'analyse envoyer avec succès !",
      });
    } catch (err) {
      res.status(400).json({
        msg: err.message || err,
        error: true,
        success: false,
      });
    }
  },

  getAllAnalyseByUser: async (req, res) => {
    try {
      const currentUser = await user.findById(req.userId);
      let findAnalyse = await analyse
        .find({ user: currentUser?._id })
        .sort({ createdAt: -1 });
      res.status(201).json({
        data: findAnalyse,
        success: true,
        error: false,
      });
    } catch (err) {
      res.status(400).json({
        msg: err.message || err,
        error: true,
        success: false,
      });
    }
  },

  getAllAnaylse: async (req, res) => {
    try {
      let findAnalyse = await analyse.find().sort({ createdAt: -1 });
      res.status(201).json({
        data: findAnalyse,
        success: true,
        error: false,
      });
    } catch (err) {
      res.status(400).json({
        msg: err.message || err,
        error: true,
        success: false,
      });
    }
  },
  
  getAnalyseById: async (req, res) => {
    try {
      let { idAnalyse } = req.body;
      let findAnalyse=await analyse.findById(idAnalyse)
      res.status(201).json({
        data: findAnalyse,
        success: true,
        error: false
       
      });
      
    } catch (err) {
      res.status(400).json({
        msg: err.message || err,
        error: true,
        success: false,
      });
    }
  },
  PaiementAnalyse: async (req, res) => {
    try {
      let { idAnalyse, fichierPaiment } = req.body;

      if (!fichierPaiment)
        return res.status(302).json({ msg: "fichier Paiment  Obligatoire" });

      let findAnalyse = await analyse.findByIdAndUpdate(
        { _id: idAnalyse },
        { fichierPaiment: "/upload/analyse/" + fichierPaiment }
      );
      res.status(201).json({
        data: findAnalyse,
        success: true,
        error: false,
        message: "votre paiement envoyée avec succès !",
      });
    } catch (err) {
      res.status(400).json({
        msg: err.message || err,
        error: true,
        success: false,
      });
    }
  },
  AcceptePaiement:async(req,res)=>{
    try {
      let { idAnalyse } = req.body;
      let findAnalyse=await analyse.findById(idAnalyse)
      if(!findAnalyse.paimentStatus){
        let updateAnalyse=await analyse.findByIdAndUpdate({_id:idAnalyse},{paimentStatus:true})
        res.status(201).json({
          data: updateAnalyse,
          success: true,
          error: false,
          message: "Le paiement a été accepté avec succès !",
        });
      }else{
        let updateAnalyse=await analyse.findByIdAndUpdate({_id:idAnalyse},{paimentStatus:false})
        res.status(201).json({
          data: updateAnalyse,
          success: true,
          error: false,
          message: "Le paiement n'est pas accepté !",
        });
      }

      
    } catch (err) {
      res.status(400).json({
        msg: err.message || err,
        error: true,
        success: false,
      });
    }
  },
  envoyerAnalyse:async(req,res)=>{
    try {
      let { idAnalyse, resultatAnalyse } = req.body;
      
      if (!resultatAnalyse)
        return res.status(302).json({ msg: "fichier Resultat  Obligatoire" });

      let findAnalyse = await analyse.findByIdAndUpdate(
        { _id: idAnalyse },
        { resultatAnalyse: "/upload/resultat/" + resultatAnalyse }
      );
      res.status(201).json({
        data: findAnalyse,
        success: true,
        error: false,
        message: "Resultat envoyée avec succès !",
      });
    } catch (err) {
      res.status(400).json({
        msg: err.message || err,
        error: true,
        success: false,
      });
    }
  }
};

module.exports = analyseCtrl;
