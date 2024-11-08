// src/controllers/workController.js
const Work = require('../models/Work'); // Verifique se o modelo Work existe

exports.getAllWorks = async (req, res) => {
  try {
    const works = await Work.find();
    res.status(200).json(works);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar obras', error });
  }
};

exports.deleteWork = async (req, res) => {
  try {
    const { id } = req.params;
    await Work.findByIdAndDelete(id);
    res.status(200).json({ message: 'Obra deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar obra', error });
  }
};
