const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
	// find all categories
	try {
		// be sure to include its associated Products
		const allCategories = await Category.findAll({ include: [Product] });
		res.status(200).json(allCategories);
	} catch (error) {
		res
			.status(500)
			.send(
				`There was an error with obtaining all categories with thier products: ${error}`
			);
	}
});

router.get('/:id', async (req, res) => {
	// find one category by its `id` value
	try {
		const selectCategory = await Category.findOne({
			where: { id: req.params.id },
			// be sure to include its associated Products
			include: [Product],
		});
		res.status(200).json(selectCategory);
	} catch (error) {
		res
			.status(500)
			.send(
				`There was an error obtaining that specific category and related products: ${error}`
			);
	}
});

router.post('/', async (req, res) => {
	// create a new category
	/* req.body should look like this...
    {
      category_name: "New_Name"
    }
  */
	try {
		const newCategory = await Category.create(req.body);
		res.status(200).json(newCategory);
	} catch (error) {
		res.status(500).json(`Creation of new category failed: ${error}`);
	}
});

router.put('/:id', async (req, res) => {
	// update a category by its `id` value
	let info = req.body;
	try {
		const updateCategory = await Category.update(req.body, {
			where: { id: req.params.id },
		});
		res
			.status(200)
			.json(
				`Successfully updated category ${req.params.id} to ${info.category_name}`
			);
	} catch (error) {
		res
			.status(500)
			.send(`Failed to update category ${req.params.id}: ${error}`);
	}
});

router.delete('/:id', async (req, res) => {
	// delete a category by its `id` value
	try {
		const deletedCategory = await Category.destroy({
			where: { id: req.params.id },
		});
		res.status(200).json(`Succesfully deleted category ${req.params.id}`);
	} catch (error) {
		res.status(500).send(`Deletion of category failed: ${error}`);
	}
});

module.exports = router;
