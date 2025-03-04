import { validationResult } from 'express-validator';
import { getAddressCoordinate, getDistanceTime, getAutoCompleteSuggestions } from '../services/maps.service.js';

const getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
};

const fetchDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    try {
        const distanceTime = await getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const fetchAutoCompleteSuggestions = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    try {
        const suggestions = await getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { getCoordinates, fetchDistanceTime, fetchAutoCompleteSuggestions };