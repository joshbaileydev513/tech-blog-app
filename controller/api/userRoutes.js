const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../model');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json({ message: 'Error - Cannot Post User Login Info'});
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { email: req.body.email }
        });

        if (userData) {
            const validPassword = await bcrypt.compare(req.body.password, userData.password);
            if (validPassword) {
                req.session.save(() => {
                    req.session.user_id = userData.id;
                    req.session.logged_in = true;

                    res.json({ success: true, user: userData, message: 'Congrats - Successful login ' });
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid Password'
                });
            }
        } else {
            return res.status(404).json({
                success: false,
                message: 'Sorry - We cannot find that user'
            });
        }

    } catch (err) {
        res.status(400).json({ message: 'Uh Oh - Something went really wrong..'});
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;