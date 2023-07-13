const router = require('express').Router();
const { Post, Comment } = require('../../model');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
        const postData = await Post.create(req.body);

        res.status(200).json(postData);

    } catch (err) {
        res.status(400).json({ message: 'Error - Cannot Post'});
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'Error - Cannot delete this post'});
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;