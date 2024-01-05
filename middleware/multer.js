const multer = require('multer');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const destinationPath = path.resolve(__dirname, '../uploads');
            cb(null, destinationPath);
        },
        filename: function (req, file, cb) {
            const fileOriginalName = file.originalname;
            const { name } = req.body;
            const slug = name.replace(/[^\w\s]/gi, ' ').replace(/\s+/g, '-').toLowerCase();
            const mime = fileOriginalName.split('.');
            mime.shift();
            mime.unshift(slug);
            const files = mime.join('.');
            const timeStamp = Date.now();
            cb(null, `${timeStamp}-${files}`);
        }
    }),
});

module.exports = upload;