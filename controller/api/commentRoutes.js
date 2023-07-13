const router = require('express').Router();
const { User, Post, Comment } = require('../../model');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const comments = commentData.map(comments => comments.toJSON());

        res.render('post', {
            ...comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json({ message: 'Error - Cannot get comment' });
    }
});

router.post('/create', withAuth, async (req, res) => {
    try {

        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json({ message: 'Error - Cannot Post Comment' });
    }
});

module.exports = router;