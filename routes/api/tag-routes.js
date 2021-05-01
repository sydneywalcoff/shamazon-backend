const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: ProductTag,
        attributes: ['id', 'product_id', 'tag_id']
      },
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'cateogry_id']
      }
    ]
  })
  .then(dbTagData => { res.json(dbTagData) })
  .catch(err => {
    res.status(400).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
    include: [
      {
      model: ProductTag,
      attributes: ['id', 'product_id', 'tag_id'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'cateogry_id']
        }
      ]}
    ]
  })
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.params.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    where: {
      id: req.params.id
    },
    tag_name: req.body.tag_name
  })
  .then(dbTagData => {
    if(!dbTagData) {
      res.status(404).json({ message: 'No Tag with that id'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if(!dbTagData) {
      res.status(404).json({ message: 'No Tag with that id'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => res.status(400).json(err));
});

module.exports = router;
