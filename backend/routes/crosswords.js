const router = require('express').Router();
let Crossword = require('../models/crossword.model');

router.route('/').get((req, res) => {
    Crossword.find()
        .then(crossword => res.json(crossword))
        .then(err => res.status(400).json('Error: ' + err));
})


router.route('/add').post((req, res) => {
    const title = req.body.title
    const date_created = Date.parse(req.body.date_created)
    const height = Number(req.body.height)
    const width = Number(req.body.width)
    const squares = req.body.squares
    const clues = req.body.clues

    const newCrossword = new Crossword({
        title,
        date_created,
        height,
        width,
        squares,
        clues
    });

    newCrossword.save()
        .then(() => res.json('Crossword added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;