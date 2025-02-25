import Grade from '../models/Grade.js';

export const createGrade = async (req, res) => {
    try {
        const grade = new Grade(req.body);
        await grade.save();
        res.status(201).send(grade);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getGrades = async (req, res) => {
    try {
        const grades = await Grade.find();
        res.status(200).send(grades);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getGradeById = async (req, res) => {
    try {
        const grade = await Grade.findById(req.params.id);
        if (!grade) {
            return res.status(404).send();
        }
        res.send(grade);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateGrade = async (req, res) => {
    try {
        const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!grade) {
            return res.status(404).send();
        }
        res.send(grade);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteGrade = async (req, res) => {
    try {
        const grade = await Grade.findByIdAndDelete(req.params.id);
        if (!grade) {
            return res.status(404).send();
        }
        res.send(grade);
    } catch (error) {
        res.status(500).send(error);
    }
};