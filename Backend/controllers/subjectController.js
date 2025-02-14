import Subject from '../models/Subject.js';

export const createSubject = async (req, res) => {
    try {
        const subject = new Subject(req.body);
        await subject.save();
        res.status(201).send(subject);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).send(subjects);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) {
            return res.status(404).send();
        }
        res.send(subject);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subject) {
            return res.status(404).send();
        }
        res.send(subject);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        if (!subject) {
            return res.status(404).send();
        }
        res.send(subject);
    } catch (error) {
        res.status(500).send(error);
    }
};