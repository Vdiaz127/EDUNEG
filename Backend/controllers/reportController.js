import Report from '../models/Report.js';

export const createReport = async (req, res) => {
    try {
        const report = new Report(req.body);
        await report.save();
        res.status(201).send(report);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).send(reports);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).send();
        }
        res.send(report);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateReport = async (req, res) => {
    try {
        const report = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!report) {
            return res.status(404).send();
        }
        res.send(report);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteReport = async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);
        if (!report) {
            return res.status(404).send();
        }
        res.send(report);
    } catch (error) {
        res.status(500).send(error);
    }
};