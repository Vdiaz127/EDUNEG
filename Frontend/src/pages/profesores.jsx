import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, Loader2, GraduationCap, BookOpen } from "lucide-react"


// Planes de evaluación disponibles
const EVALUATION_PLANS = [
  {
    id: 1,
    name: "Midterm Evaluation",
    description: "Comprehensive evaluation covering all topics from the first half of the course",
  },
  {
    id: 2,
    name: "Final Project",
    description: "Individual or group project demonstrating practical application of course concepts",
  },
  {
    id: 3,
    name: "Continuous Assessment",
    description: "Regular evaluation through quizzes and assignments throughout the course",
  },
  {
    id: 4,
    name: "Practical Skills Assessment",
    description: "Evaluation of hands-on skills and laboratory work",
  },
]

// ID del profesor (normalmente vendría de autenticación)
const TEACHER_ID = "67b2739c36498dd15d209c4f"

export default function TeacherDashboard() {
  const [tasks, setTasks] = useState([])
  const [subjects, setSubjects] = useState([])
  const [subjectsLoading, setSubjectsLoading] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    fetchTasks()
    fetchSubjects()
  }, [])

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:5000/api/profesores/${TEACHER_ID}/tasks`)
      if (!response.ok) {
        throw new Error("Failed to fetch tasks")
      }
      const data = await response.json()
      setTasks(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      console.error("Error fetching tasks:", err)
      setError("Error loading tasks: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/materias")
      if (!response.ok) throw new Error("Failed to fetch subjects")
      const result = await response.json()

      // Transform the data to match our structure
      const transformedSubjects = result.data.map((subject) => ({
        id: subject._id,
        name: subject.nombre,
        code: subject._id.slice(-4), // Using last 4 chars of ID as code
        description: subject.descripcion,
        credits: subject.creditos,
      }))

      setSubjects(transformedSubjects)
    } catch (err) {
      console.error("Error fetching subjects:", err)
      // Use empty array as fallback
      setSubjects([])
    } finally {
      setSubjectsLoading(false)
    }
  }

  const handleTaskSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    // Get the selected subject and evaluation plan
    const selectedSubject = SUBJECTS.find((s) => s.id === Number(formData.get("subjectId")))
    const selectedEvalPlan = EVALUATION_PLANS.find((p) => p.id === Number(formData.get("evaluationPlanId")))

    const taskData = {
      id: editingTask?.id || Date.now().toString(), // Ensure ID is always present
      name: formData.get("taskName"),
      description: formData.get("description"),
      percentage: Number(formData.get("percentage")),
      subject: selectedSubject,
      evaluationPlan: selectedEvalPlan,
      status: "pending", // Add required status field
      dueDate: formData.get("dueDate"), // Add due date field
    }

    try {
      if (editingTask) {

        console.log("Task data before sending:", JSON.stringify({ asignaciones: [taskData] }, null, 2)) // 🔍 LOG

        // Update existing task
        const response = await fetch(`http://localhost:5000/api/profesores/${TEACHER_ID}/tasks/${editingTask.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        })

        if (!response.ok) throw new Error("Failed to update task")

        setTasks((prevTasks) => prevTasks.map((task) => (task.id === editingTask.id ? { ...task, ...taskData } : task)))
      } else {
        // Create new task
        const response = await fetch(`http://localhost:5000/api/profesores/${TEACHER_ID}/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        })

        if (!response.ok) throw new Error("Failed to create task")

        const newTask = await response.json()
        setTasks((prevTasks) => [...prevTasks, taskData])
      }

      setIsTaskDialogOpen(false)
      setEditingTask(null)
      event.target.reset()
    } catch (err) {
      console.error("Error saving task:", err)
      alert("Error: " + err.message)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/profesores/${TEACHER_ID}/tasks/${taskId}`, {
          method: "DELETE",
        })

        if (!response.ok) throw new Error("Failed to delete task")

        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
      } catch (err) {
        console.error("Error deleting task:", err)
        alert("Error: " + err.message)
      }
    }
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setIsTaskDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button onClick={fetchTasks} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Asignaciones del Profesor</h1>
                <p className="text-gray-600">Gestiona tus asignaciones</p>
              </div>
            </div>
            <button
              onClick={() => {
                setEditingTask(null)
                setIsTaskDialogOpen(true)
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
            >
              <Plus className="w-4 h-4" />
              Crear Nueva Asignación
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay ninuna asignación</h3>
            <p className="text-gray-600 mb-4">Comienza creando una asignación</p>
            <button
              onClick={() => {
                setEditingTask(null)
                setIsTaskDialogOpen(true)
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-blue-600"
            >
              <Plus className="w-4 h-4" />
              Create Task
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-lg text-gray-900">{task.name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-50"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                <div className="space-y-3">
                  {task.subject && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
                        {task.subject.name} ({task.subject.code})
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md">
                      {task.percentage}% de la nota final
                    </span>
                  </div>
                  {task.evaluationPlan && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-medium text-sm text-gray-900 mb-1">{task.evaluationPlan.name}</h4>
                      <p className="text-sm text-gray-600">{task.evaluationPlan.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Task Dialog */}
      {isTaskDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingTask ? "Editar Asignación" : "Crear Nueva Asignación"}</h2>
            <form onSubmit={handleTaskSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre de la Asignación</label>
                <input
                  name="taskName"
                  defaultValue={editingTask?.name}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
              <label className="block text-sm font-medium mb-1">Materia</label>
                {subjectsLoading ? (
                  <div className="w-full p-2 border rounded-lg bg-gray-50 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-gray-500">Cargando Materia...</span>
                  </div>
                ) : (
                  <select
                    name="subjectId"
                    defaultValue={editingTask?.subject?.id}
                    className="w-full p-2 border rounded-lg"
                    required
                  >
                    <option value="">Selecciona una materia</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name} ({subject.credits} credits)
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Plan de Evaluación </label>
                <select
                  name="evaluationPlanId"
                  defaultValue={editingTask?.evaluationPlan?.id}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Selecciona un plan de evaluación </option>
                  {EVALUATION_PLANS.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                  name="description"
                  defaultValue={editingTask?.description}
                  className="w-full p-2 border rounded-lg"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Porcentaje de la nota final</label>
                <input
                  name="percentage"
                  type="number"
                  defaultValue={editingTask?.percentage}
                  min="0"
                  max="100"
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Fecha de entrega</label>
                <input
                  name="dueDate"
                  type="date"
                  defaultValue={editingTask?.dueDate}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsTaskDialogOpen(false)
                    setEditingTask(null)
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  {editingTask ? "Actualizar" : "Crear"} Asignación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

