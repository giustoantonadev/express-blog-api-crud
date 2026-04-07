exports.index = (req,res) => {
    res.send('INDEX: lista dei post')
};

exports.show = (req,res) => {
    res.send('SHOW: singolo post')
};

exports.destroy = (req, res) => {
    res.send('DESTROY: elimina post')
};