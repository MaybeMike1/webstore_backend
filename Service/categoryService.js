const { Category } = require('./../Models/category');



async function getAll() {
    return await Category.find({});
};


async function getByCategory(category) {
    return await Category.findOne({category : category});
}

async function findById(_id) {
    return await Category.findOne({_id : _id});
}

async function deleteById(_id) {
    return await Category.findByIdAndDelete(_id);
}
const categoryService = {
    getAll : getAll,
    getByCategory : getByCategory,
    findById : findById,
    deleteById : deleteById
};

module.exports = categoryService;