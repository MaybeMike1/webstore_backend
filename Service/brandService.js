const { Brand } = require("./../Models/brand");

async function getBrand() {
  return await Brand.find({});
}


async function createBrand(req, res) { 
  const {error} = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  await Brand.create({
    name: req.body.name,
  }).then((data) => {
    res.status(201).send({ data: data });
  }
  ).catch((error) => {
    res.status(500).send({ message : 'Something went wrong while creating new brand'});
  });
}


async function updateBrand(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const brand = await Brand.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  }, { new: true }).catch(error => {
    res.status(500).send({ message: 'Something went wrong while updating brand' });
  });


  if (!brand) return res.status(404).send('The brand with the given ID was not found.');

  res.send(brand);
}


async function deleteBrand(req, res) {
  const brand = await Brand.findByIdAndRemove(req.params.id).catch(error => {
    res.status(500).send({ message: 'Something went wrong while deleting brand' });
  });

  if (!brand) return res.status(404).send('The brand with the given ID was not found.');

  res.send(brand);
}

async function getBrandById(req, res) {
  const brand = await Brand.findById(req.params.id).catch(error => {
    res.status(500).send({ message: 'Something went wrong while getting brand' });
  });


  if (!brand) return res.status(404).send('The brand with the given ID was not found.');

  res.send({brand: brand});
}


// Add the last exports to brandService



const brandService = {
  getBrand: getBrand,
  createBrand, createBrand,
  updateBrand : updateBrand,
  deleteBrand : deleteBrand,
  getBrandById : getBrandById
};

module.exports = brandService;
