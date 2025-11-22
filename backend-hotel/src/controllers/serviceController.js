import { ServiceModel } from "../models/Service.js";

const handleError = (res, err, msg = "Erreur serveur") => {
  console.error(err);
  res.status(500).json({ success: false, message: msg, error: err.message });
};

// --------------------- GET ---------------------
export const getServices = async (req, res) => {
  try {
    const [rows] = await ServiceModel.findAll();
    res.json({ success: true, data: rows });
  } catch (err) {
    handleError(res, err);
  }
};

// --------------------- CREATE ---------------------
export const addService = async (req, res) => {
  const { name, description } = req.body;

  if (!name)
    return res.status(400).json({ success: false, message: "Le nom est requis" });

  try {
    const [result] = await ServiceModel.create({ name, description });

    res.status(201).json({
      success: true,
      data: {
        id: result.insertId,
        name,
        description,
      },
    });
  } catch (err) {
    handleError(res, err);
  }
};

// --------------------- UPDATE ---------------------
export const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name)
    return res.status(400).json({ success: false, message: "Le nom est requis" });

  try {
    await ServiceModel.update(id, { name, description });

    res.json({ success: true, message: "Service mis à jour" });
  } catch (err) {
    handleError(res, err);
  }
};

// --------------------- DELETE ---------------------
export const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    await ServiceModel.delete(id);
    res.json({ success: true, message: "Service supprimé" });
  } catch (err) {
    handleError(res, err);
  }
};
