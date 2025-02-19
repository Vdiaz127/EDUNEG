import express from 'express';

import { getHello, getProfesores, createProfesor, getTasks, addTask, updateTask, deleteTask } from '../controllers/PRUEBA-profesor.controller.js';

const router = express.Router(); 

router.get("/", getProfesores);           // PRODUCTS GET ALL
router.post("/", createProfesor);
router.get("/:id/tasks", getTasks); // Obtener todas las tareas
router.post("/:id/tasks", addTask); // Agregar una nueva tarea
router.put("/:id/tasks/:taskId", updateTask); // Actualizar una tarea
router.delete("/:id/tasks/:taskId", deleteTask); // Eliminar una tarea


export default router;