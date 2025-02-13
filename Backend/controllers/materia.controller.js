import Materia from '../models/materia.model.js';
import mongoose from 'mongoose';

// Method for getting all materias
export const getMaterias = async (req, res) => { 
    try {
        const materias = await Materia.find({});
        res.status(200).json({ success: true, data: materias });
    } catch (error) {
        console.error("Error fetching materias", error.message);
        res.status(500).json({ success: false, message: "Error fetching materias" });
    }

};

// Method for creating a new materia
export const createMateria = async (req, res) => {
    const { nombre, descripcion, creditos } = req.body; // get the materia fields from the request body


    console.log(req.body);

    if (!nombre || !descripcion || !creditos) {
        return res.status(400).json({ success: false, message: "Please provide all fields POST" });
    }

    const newMateria = new Materia({ nombre, descripcion, creditos });

    try {
        await newMateria.save();
        res.status(201).json({ success: true, data: newMateria });
    } catch (error) {
        console.error("Error creating materia:", error.message);
        res.status(500).json({ success: false, message: "Server Error while creating materia" });
    }
};

// Method for updating a materia by id
export const updateMateria = async (req, res) => {
    const {id} = req.params;
    
    if ( !mongoose.Types.ObjectId.isValid(id) ) {
        console.error("Invalid materia id");
        return res.status(404).json({ success: false, message: "Invalid materia id" });
    }
    
    const materia = req.body;

    try {
        const updatedMateria = await Materia.findByIdAndUpdate(id, materia, {new: true});
        res.status(200).json({ success: true, data: updatedMateria });
    } catch (error) {
        console.error("Error updating materia:", error.message);
        res.status(500).json({ success: false, message: "Server Error while updating materia"});
    }

};

// Method for deleting a materia by id
export const deleteMateria = async (req, res) => {
    const {id} = req.params;

    if ( !mongoose.Types.ObjectId.isValid(id) ) {
        console.error("Invalid materia id");
        return res.status(404).json({ success: false, message: "Invalid materia id" });
    }
        
    try {
        await Materia.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Materia deleted successfully"});
    } catch (error) {
        console.error("Error deleting materia:", error.message);
        res.status(500).json({success: false, message: "Server Error while deleting materia"}); 
    }

};