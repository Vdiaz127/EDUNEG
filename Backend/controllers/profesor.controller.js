import Materia from '../models/materia.model.js';
import mongoose from 'mongoose';
import Profesor from '../models/profesor.model.js';


export const getHello = async (req, res) => { 
    try {
        res.status(200).json({ success: true, data: "hola" });
    } catch (error) {
        console.error("Error fetching materias", error.message);
        res.status(500).json({ success: false, message: "Error fetching materias" });
    }

};

// Method for getting all materias
export const getProfesores = async (req, res) => { 
    try {
        const profesores = await Profesor.find({});
        res.status(200).json({ success: true, data: profesores });
    } catch (error) {
        console.error("Error fetching profesores", error.message);
        res.status(500).json({ success: false, message: "Error fetching profesores" });
    }

};


export const getTasks = async (req, res) => {
    try {
      const profesor = await Profesor.findById(req.params.id);
      if (!profesor) return res.status(404).json({ message: "Profesor no encontrado" });
  
      res.json(profesor.asignaciones);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const addTask = async (req, res) => {
    try {
      const { id } = req.params;
      const profesor = await Profesor.findById(id);
      if (!profesor) return res.status(404).json({ message: "Profesor no encontrado" });
  
      const newTask = {
        id: profesor.asignaciones.length + 1, // Generar un nuevo ID
        name: req.body.name,
        description: req.body.description,
        percentage: req.body.percentage,
      };
  
      profesor.asignaciones.push(newTask);
      await profesor.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Actualizar una tarea específica de un profesor
export const updateTask = async (req, res) => {
    try {
      const { id, taskId } = req.params;
      const profesor = await Profesor.findById(id);
      if (!profesor) return res.status(404).json({ message: "Profesor no encontrado" });
  
      const taskIndex = profesor.asignaciones.findIndex((t) => t.id === Number(taskId));
      if (taskIndex === -1) return res.status(404).json({ message: "Tarea no encontrada" });
  
      profesor.asignaciones[taskIndex] = { ...profesor.asignaciones[taskIndex], ...req.body };
      await profesor.save();
      res.json(profesor.asignaciones[taskIndex]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  
  // Eliminar una tarea de un profesor
export const deleteTask = async (req, res) => {
    try {
      const { id, taskId } = req.params;
      const profesor = await Profesor.findById(id);
      if (!profesor) return res.status(404).json({ message: "Profesor no encontrado" });
  
      profesor.asignaciones = profesor.asignaciones.filter((t) => t.id !== Number(taskId));
      await profesor.save();
      res.json({ message: "Tarea eliminada con éxito" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Method for creating a new profesor
export const createProfesor = async (req, res) => {
    const { nombres,apellidos,telefono,departamento ,estado,titulacion,especialidad } = req.body; // get the materia fields from the request body


    console.log(req.body);

    if (!nombres || !apellidos || !telefono || !departamento || !estado || !titulacion || !especialidad) {
        return res.status(400).json({ success: false, message: "Please provide all fields POST" });
    }

    const newProfesor = new Profesor({ nombres, apellidos, telefono, departamento, estado, titulacion, especialidad });

    try {
        await newProfesor.save();
        res.status(201).json({ success: true, data: newProfesor });
    } catch (error) {
        console.error("Error creating materia:", error.message);
        res.status(500).json({ success: false, message: "Server Error while creating profesor" });
    }
};

