const posts = require('../data/posts')

exports.index = (req, res) => {
    let result = posts;

    if (req.query.tag) {
        result = posts.filter(post => {
            return Array.isArray(post.tags) && post.tags.includes(req.query.tag)
        })
    }
    res.json(result)
};

exports.show = (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).json({ error: `Post ${id} non trovato` })
    }
    res.json(post)
};

exports.store = (req, res) => {
    console.log(req.body);    
    const data = req.body
    const newId = posts[posts.length - 1].id +1
    const newPost={
        id: newId,
        ...data
    }
    posts.push(newPost)
    res.status(201).json(newPost)
}

exports.destroy = (req, res) => {
    const id = Number(req.params.id);
    const index = posts.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: `Post ${id} non trovato` })
    }
    posts.splice(index, 1);
    console.log('Posts aggiornati:', posts);
    res.status(204).end()
};