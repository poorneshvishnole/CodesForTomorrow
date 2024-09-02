const Category = require('../models/category.js');

exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = new Category({ name });
        await category.save();
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;
    try {
        const category = await Category.findByIdAndUpdate(categoryId, { name }, { new: true });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ message: "Category not found" });

        const servicesCount = await Service.countDocuments({ categoryId: category._id });
        if (servicesCount === 0) {
            await category.remove();
            res.json({ message: "Category deleted successfully" });
        } else {
            res.status(400).json({ message: "Cannot delete non-empty category" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
