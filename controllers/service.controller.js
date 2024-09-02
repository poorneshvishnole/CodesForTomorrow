const Service = require('../models/service.js');
const Category = require('../models/category.js');

// Create a service under a category
exports.createService = async (req, res) => {
    const { categoryId } = req.params;
    const { name, type, priceOptions } = req.body;

    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const service = new Service({
            categoryId,
            name,
            type,
            priceOptions,
        });

        await service.save();
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all services under a specific category
exports.getServices = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const services = await Service.find({ categoryId });
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a service within a category
exports.updateService = async (req, res) => {
    const { categoryId, serviceId } = req.params;
    const { name, type, priceOptions } = req.body;

    try {
        const service = await Service.findOneAndUpdate(
            { _id: serviceId, categoryId },
            { name, type, priceOptions },
            { new: true }
        );

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a service from a category
exports.deleteService = async (req, res) => {
    const { categoryId, serviceId } = req.params;

    try {
        const service = await Service.findOneAndDelete({ _id: serviceId, categoryId });

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
