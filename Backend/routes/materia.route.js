import express from 'express';

import { createMateria, getMaterias, updateMateria, deleteMateria } from '../controllers/materia.controller.js';

const router = express.Router(); 

router.get("/", getMaterias);           // PRODUCTS GET ALL
router.post("/", createMateria);        // PRODUCTS CREATE
router.put("/:id", updateMateria);      // PRODUCTS UPDATE
router.delete("/:id", deleteMateria);   // PRODUCTS DELETE


export default router;