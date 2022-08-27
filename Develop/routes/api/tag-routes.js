const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
	// find all tags
	// be sure to include its associated Product data
	try {
		const allTags = await Tag.findAll({ include: [Product] });
		res.status(200).json(allTags);
	} catch (error) {
		res.status(500).send(`Failed to locate all Tags: ${error}`);
	}
});

router.get('/:id', async (req, res) => {
	// find a single tag by its `id`
	try {
		const findOneTag = await Tag.findOne({
			where: { id: req.params.id },
			// be sure to include its associated Product data
			include: [Product],
		});
		res.status(200).json(findOneTag);
	} catch (error) {
		res.status(500).json(`Failed to get specific tag: ${req.params.id} `);
	}
});

router.post('/', async (req, res) => {
	// create a new tag
	/* req.body should look like this...
    {
      tag_name: "New_tag"
    }
*/
	try {
		const newTag = await Tag.create(req.body);
		res.status(200).json(newTag);
	} catch (error) {
		res.status(500).json(`Creation of new Tag failed: ${error}`);
	}
});

router.put('/:id', async (req, res) => {
	// update a tag's name by its `id` value
	try {
		const updateTag = await Tag.update(req.body, {
			where: { id: req.params.id },
		});
		res
			.status(200)
			.json(
				`Successfully updated category ${req.params.id} to ${req.body.tag_name}`
			);
	} catch (error) {
		res
			.status(500)
			.send(`Failed to update category ${req.params.id}: ${error}`);
	}
});

router.delete('/:id', async (req, res) => {
	// delete on tag by its `id` value
	try {
		const deletedTag = await Tag.destroy({
			where: { id: req.params.id },
		});
		res.status(200).json(`Succesfully deleted Tag ${req.params.id}`);
	} catch (error) {
		res.status(500).send(`Deletion of Tag failed: ${error}`);
	}
});

module.exports = router;
