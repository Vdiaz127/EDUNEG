import Evaluation from '../models/Evaluation.js';

export const createEvaluation = async (req, res) => {
    try {
        const evaluation = new Evaluation(req.body);
        await evaluation.save();
        res.status(201).send(evaluation);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getEvaluations = async (req, res) => {
    try {
        const evaluations = await Evaluation.find();
        res.status(200).send(evaluations);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getEvaluationById = async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id);
        if (!evaluation) {
            return res.status(404).send();
        }
        res.send(evaluation);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateEvaluation = async (req, res) => {
    try {
        const evaluation = await Evaluation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!evaluation) {
            return res.status(404).send();
        }
        res.send(evaluation);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteEvaluation = async (req, res) => {
    try {
        const evaluation = await Evaluation.findByIdAndDelete(req.params.id);
        if (!evaluation) {
            return res.status(404).send();
        }
        res.send(evaluation);
    } catch (error) {
        res.status(500).send(error);
    }
};