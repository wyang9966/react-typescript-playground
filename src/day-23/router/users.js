import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get all users');
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Get user with ID: ${userId}`);
});

router.get('/new', (req, res) => {
    res.send('Create a new user');
});

export default router;