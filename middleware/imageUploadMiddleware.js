var multer = require('multer');
const storage = multer.diskStorage({
    destination: (res, file,cb) => {
        cb(null, './fetchImage');
    },
    filename: (res, file, cb) => {
        cb(null,file.originalname);
    }
})

module.exports.upload = multer({
    storage: storage,

})