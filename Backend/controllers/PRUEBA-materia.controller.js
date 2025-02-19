import fs from 'fs';

const DATA_FILE = './materias.json';

// Función para cargar los datos desde el archivo JSON.
// Si el archivo no existe, se retorna una estructura inicial.
const loadData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { materias: [] };
  }
};

// Función para guardar los datos en el archivo JSON.
const saveData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Método para obtener todas las materias
export const getMaterias = async (req, res) => { 
  try {
    const data = loadData();
    res.status(200).json({ success: true, data: data.materias });
  } catch (error) {
    console.error("Error fetching materias", error.message);
    res.status(500).json({ success: false, message: "Error fetching materias" });
  }
};

// Método para crear una nueva materia
export const createMateria = async (req, res) => {
  const { nombre, descripcion, creditos } = req.body;
  
  // Validación de campos requeridos
  if (!nombre || !descripcion || !creditos) {
    return res.status(400).json({ success: false, message: "Please provide all fields POST" });
  }
  
  const data = loadData();
  // Se genera un id incremental: si ya existen materias, se toma el último id y se suma 1.
  const id = data.materias.length > 0 ? data.materias[data.materias.length - 1].id + 1 : 1;
  const newMateria = { id, nombre, descripcion, creditos };

  data.materias.push(newMateria);
  try {
    saveData(data);
    res.status(201).json({ success: true, data: newMateria });
  } catch (error) {
    console.error("Error creating materia:", error.message);
    res.status(500).json({ success: false, message: "Server Error while creating materia" });
  }
};

// Método para actualizar una materia por id
export const updateMateria = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  
  const data = loadData();
  // Se busca la materia por id (asumimos que el id es numérico)
  const index = data.materias.findIndex(m => m.id === Number(id));
  if (index === -1) {
    console.error("Materia not found");
    return res.status(404).json({ success: false, message: "Materia not found" });
  }
  
  // Se actualizan los campos de la materia encontrada
  data.materias[index] = { ...data.materias[index], ...updatedData };
  try {
    saveData(data);
    res.status(200).json({ success: true, data: data.materias[index] });
  } catch (error) {
    console.error("Error updating materia:", error.message);
    res.status(500).json({ success: false, message: "Server Error while updating materia" });
  }
};

// Método para eliminar una materia por id
export const deleteMateria = async (req, res) => {
  const { id } = req.params;
  
  const data = loadData();
  const index = data.materias.findIndex(m => m.id === Number(id));
  if (index === -1) {
    console.error("Materia not found");
    return res.status(404).json({ success: false, message: "Materia not found" });
  }
  
  data.materias.splice(index, 1);
  try {
    saveData(data);
    res.status(200).json({ success: true, message: "Materia deleted successfully" });
  } catch (error) {
    console.error("Error deleting materia:", error.message);
    res.status(500).json({ success: false, message: "Server Error while deleting materia" });
  }
};
