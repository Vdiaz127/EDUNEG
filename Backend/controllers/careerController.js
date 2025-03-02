import Career from '../models/Career.js';

// Crear una nueva carrera
export const createCareer = async (req, res) => {
  try {
    const careerData = {
      ...req.body,
      status: 'active', // Establecer el estado como "active" por defecto
    };
    const career = new Career(careerData);
    await career.save();
    res.status(201).send(career);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Obtener todas las carreras
export const getCareers = async (req, res) => {
  try {
    const careers = await Career.find();
    res.status(200).send(careers);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Obtener una carrera por ID
export const getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).send();
    }
    res.send(career);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Actualizar una carrera
export const updateCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!career) {
      return res.status(404).send();
    }
    res.send(career);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Eliminar una carrera
export const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) {
      return res.status(404).send();
    }
    res.send(career);
  } catch (error) {
    res.status(500).send(error);
  }
};