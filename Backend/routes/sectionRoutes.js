import express from "express";
import {
  createSection,
  getSections,
  getSectionById,
  updateSection,
  deleteSection,
  getSubjectIdsByStudentId,
  addStudentToSection,
  removeStudentFromSection,
  isStudentInSection,
  getSubjectIdsByProfessorId,
  getSectionsBySubjectId
} from "../controllers/sectionController.js";

const router = express.Router();

router.post("/", createSection);
router.get("/", getSections);
router.get("/:id", getSectionById);
router.put("/:id", updateSection);
router.delete("/:id", deleteSection);
router.get("/:id", getSubjectIdsByStudentId);
router.put("/:id", addStudentToSection);
router.delete("/:id", removeStudentFromSection);
router.get("/:id", isStudentInSection);
router.get("/:id", getSubjectIdsByProfessorId);
router.get("/:id",getSectionsBySubjectId);

export default router;
