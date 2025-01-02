import Fuel from '../../models/Fuel.model.js';
import crypto from 'crypto';

export const fuelForm = async (req, res) => {
    try {
        const vehicle = req.params.id;
        const { date, cost, amount } = req.body;

        // Generate a random 5-character hexadecimal string
        const id = crypto.randomBytes(3).toString('hex'); // 3 bytes = 6 characters in hex, we'll take 5

        const newFuel = new Fuel({
            _id: id, // Assign the custom ID
            vehicle,
            date,
            cost,
            amount
        });

        await newFuel.save();
        res.status(201).json({ message: 'Fuel added successfully', id });
    } catch (error) {
        console.error('Error saving fuel details:', error);
        res.status(500).json({
            message: 'There was an error saving the fuel details',
            error: error.message
        });
    }
};
