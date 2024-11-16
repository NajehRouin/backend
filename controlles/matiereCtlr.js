let matiere = require("../models/matiereModel");
let composant = require("../models/componentModel");
let mongoose = require("mongoose");

let matiereCtrl = {
  AjouterMatiere: async (req, res) => {
    try {
      let { nom, prix } = req.body;

      let findMatiere = await matiere.findOne({ nom });

      if (findMatiere)
        return res.status(302).json({ msg: "matiére déja existe" });

      if (!nom) return res.status(302).json({ msg: "nom  Obligatoire" });
      if (!prix) return res.status(302).json({ msg: "prix  Obligatoire" });

      let newMatier = new matiere({ nom, prix });

      await newMatier.save();

      res.status(201).json({
        data: newMatier,
        success: true,
        error: false,
        message: "matiére créé avec succès !",
      });
    } catch (err) {
      res.json({
        msg: err.message || err,
        error: true,
        success: false,
      });
    }
  },
  ModifierMatier: async (req, res) => {
    try {
      const { matierId } = req.body;
      const payload = {
        ...req.body,
      };

      const updateMatier = await matiere.findByIdAndUpdate(matierId, payload);
      res.json({
        data: updateMatier,
        message: "matiére Updated",
        success: true,
        error: false,
      });
    } catch (err) {
      res.json({
        msg: err.message || err,
        error: true,
        success: false,
      });
    }
  },

  getMatierByID: async (req, res) => {
    try {
      const { matierId } = req.body;

      let findMatier = await matiere.findById(matierId);
      res.json({
        data: findMatier,
        success: true,
        error: false,
      });
    } catch (err) {
      res.json({
        msg: err.message || err,
        error: true,
        success: false,
      });
    }
  },

  deleteMatier: async (req, res) => {
    try {
      const { matierId } = req.body;

      let findMatierAndDelete = await matiere.findByIdAndDelete(matierId);
      await composant.deleteMany({ matiere: matierId });
      res.json({
        data: findMatierAndDelete,
        message: "matiére Deleted",
        success: true,
        error: false,
      });
    } catch (err) {
      res.json({
        msg: err.message || err,
        error: true,
        success: false,
      });
    }
  },
  getAllMatier: async (req, res) => {
    try {
      let findMatiers = await matiere.find();
      res.json({
        data: findMatiers,

        success: true,
        error: false,
      });
    } catch (err) {
      res.json({
        msg: err.message || err,
        error: true,
        success: false,
      });
    }
  },
};

module.exports = matiereCtrl;
