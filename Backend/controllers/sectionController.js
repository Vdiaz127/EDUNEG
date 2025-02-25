import Section from '../models/Section.js';

export const createSection = async (req, res) => {
    try {
        const section = new Section(req.body);
        await section.save();
        res.status(201).send(section);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getSections = async (req, res) => {
    try {
        const sections = await Section.find();
        res.status(200).send(sections);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getSectionById = async (req, res) => {
    try {
        const section = await Section.findById(req.params.id);
        if (!section) {
            return res.status(404).send();
        }
        res.send(section);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateSection = async (req, res) => {
    try {
        const section = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!section) {
            return res.status(404).send();
        }
        res.send(section);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteSection = async (req, res) => {
    try {
        const section = await Section.findByIdAndDelete(req.params.id);
        if (!section) {
            return res.status(404).send();
        }
        res.send(section);
    } catch (error) {
        res.status(500).send(error);
    }
};