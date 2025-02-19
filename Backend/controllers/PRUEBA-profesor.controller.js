import fs from 'fs';

const DATA_FILE = './data.json';

const loadData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
        return { profesores: [] };
    }
};

const saveData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

export const getHello = async (req, res) => {
    res.status(200).json({ success: true, data: "hola" });
};

export const getProfesores = async (req, res) => {
    const data = loadData();
    res.status(200).json({ success: true, data: data.profesores });
};

export const getTasks = async (req, res) => {
    const data = loadData();
    //console.log(data);
    const profesor = data.profesores.find(p => p.id === Number(req.params.id));
    if (!profesor) return res.status(404).json({ message: "Profesor no encontrado" });
    res.json(profesor.asignaciones || []);
};

export const addTask = async (req, res) => {
    const data = loadData();
    const profesor = data.profesores.find(p => p.id === Number(req.params.id));
    if (!profesor) return res.status(404).json({ message: "Profesor no encontrado" });

    const newTask = {
        id: (profesor.asignaciones?.length || 0) + 1,
        name: req.body.name,
        description: req.body.description,
        percentage: req.body.percentage,
    };
    
    profesor.asignaciones = profesor.asignaciones || [];
    profesor.asignaciones.push(newTask);
    saveData(data);
    res.status(201).json(newTask);
};

export const updateTask = async (req, res) => {
    const data = loadData();
    const profesor = data.profesores.find(p => p.id === Number(req.params.id));
    if (!profesor) return res.status(404).json({ message: "Profesor no encontrado" });

    const taskIndex = profesor.asignaciones.findIndex(t => t.id === Number(req.params.taskId));
    if (taskIndex === -1) return res.status(404).json({ message: "Tarea no encontrada" });

    profesor.asignaciones[taskIndex] = { ...profesor.asignaciones[taskIndex], ...req.body };
    saveData(data);
    res.json(profesor.asignaciones[taskIndex]);
};

export const deleteTask = async (req, res) => {
    const data = loadData();
    const profesor = data.profesores.find(p => p.id === Number(req.params.id));
    if (!profesor) return res.status(404).json({ message: "Profesor no encontrado" });

    profesor.asignaciones = profesor.asignaciones.filter(t => t.id !== Number(req.params.taskId));
    saveData(data);
    res.json({ message: "Tarea eliminada con éxito" });
};

export const createProfesor = async (req, res) => {
    const { nombres, apellidos, telefono, departamento, estado, titulacion, especialidad } = req.body;
    if (!nombres || !apellidos || !telefono || !departamento || !estado || !titulacion || !especialidad) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const data = loadData();
    const newProfesor = {
        id: data.profesores.length + 1,
        nombres,
        apellidos,
        telefono,
        departamento,
        estado,
        titulacion,
        especialidad,
        asignaciones: []
    };

    data.profesores.push(newProfesor);
    saveData(data);
    res.status(201).json({ success: true, data: newProfesor });
};