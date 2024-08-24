const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   POST /api/contact
// @desc    Create a new contact
router.post('/', async (req, res) => {
    const { name, email, phone, service, msg } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            service,
            msg,
        });

        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/hello',(req,res)=>{
  res.send("hello")
})

// @route   GET /api/contact/:id
// @desc    Get a contact by ID
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }

        res.json(contact);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Contact not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/contacts
// @desc    Get all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
