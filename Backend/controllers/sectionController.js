import Section from '../models/Section.js';

export const createSection = async (req, res) => {
    try {
        const evaluation = new Section(req.body);
        await evaluation.save();
        res.status(201).send(evaluation);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getEvaluations = async (req, res) => {
    try {
        const evaluations = await Section.find();
        res.status(200).send(evaluations);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getSectionById = async (req, res) => {
    try {
        const evaluation = await Section.findById(req.params.id);
        if (!evaluation) {
            return res.status(404).send();
        }
        res.send(evaluation);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateSection = async (req, res) => {
    try {
        const evaluation = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!evaluation) {
            return res.status(404).send();
        }
        res.send(evaluation);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteSection = async (req, res) => {
    try {
        const evaluation = await Section.findByIdAndDelete(req.params.id);
        if (!evaluation) {
            return res.status(404).send();
        }
        res.send(evaluation);
    } catch (error) {
        res.status(500).send(error);
    }
};