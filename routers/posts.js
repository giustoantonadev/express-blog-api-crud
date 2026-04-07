const express = require('express');
const router = express.Router();

// import controller
const postsController = require('../controllers/postsControllers')

const posts = require('../data/posts');

// Index - list posts (text or JSON)
router.get('/', postsController.index);

// Show - single post (text or JSON)
router.get('/:id', postsController.show)

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
router.delete('/:id', postsController.destroy)

module.exports = router;
