var multer = require('multer');
const storage = multer.diskStorage({
    destination: (res, file,cb) => {
        cb(null, './uploads');
    },
    filename: (res, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

module.exports.upload = multer({
    storage: storage,

})