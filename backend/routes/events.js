const express = require('express');
const { Event } = require('../models');
const router = express.Router();

// CREATE Event
router.post('/', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ All Events
router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ One Event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE Event
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Event.update(req.body, {
      where: { event_id: req.params.id },
    });
    if (updated) {
      const updatedEvent = await Event.findByPk(req.params.id);
      res.json(updatedEvent);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE Event
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Event.destroy({
      where: { event_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
