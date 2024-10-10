const path = require('path');

const imageUrlMiddleware = (req, res, next)=>{
    if(req.file) {
        req.body.imageUrl = `${req.protocol}://${req.get('host')}/postimages/${req.file.filename}`;

    }
    next();
};

module.exports = imageUrlMiddleware