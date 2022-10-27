const { Brand } = require('./../Models/brand');

async function getBrand() {
    return await Brand.find({});
};



const brandService = {
    getBrand : getBrand
};

module.exports = brandService;