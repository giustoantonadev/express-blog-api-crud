const express = require('express');
const router = express.Router();
const posts = require('../data/posts');

// Index - list posts (text or JSON)
router.get('/', (req, res) => {
    if (req.accepts('json')) return res.json(posts);
    res.send('Lista dei post');
});

// Show - single post (text or JSON)
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).send(`Post ${id} non trovato`);
    if (req.accepts('json')) return res.json(post);
    res.send(`Dettaglio del post ${id}`);
});

// Create - add a post
router.post('/', (req, res) => {
    const { title, content, image, tags } = req.body || {};
    const id = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    const newPost = { id, title: title || `Post ${id}`, content: content || '', image: image || '', tags: tags || [] };
    posts.push(newPost);
    if (req.accepts('json')) return res.status(201).json(newPost);
    res.send('Creazione del post');
});

// Update - modify a post
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).send(`Post ${id} non trovato`);
    const { title, content, image, tags } = req.body || {};
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (image !== undefined) post.image = image;
    if (tags !== undefined) post.tags = tags;
    if (req.accepts('json')) return res.json(post);
    res.send(`Modifica del post ${id}`);
});

// Destroy - remove a post
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).send(`Post ${id} non trovato`);
    posts.splice(idx, 1);
    if (req.accepts('json')) return res.json({ message: `Cancellazione del post ${id}` });
    res.send(`Cancellazione del post ${id}`);
});

module.exports = router;
