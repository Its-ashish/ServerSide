var multer = require('multer');
const storage = multer.diskStorage({
    destination: (res, file,cb) => {
        cb(null, '../uploads');
    },
    filename: (res, file, cb) => {
        console.log(file, 'file');
        cb(null, Date.now.toString + file.originalname);
    }
})

module.exports.upload = multer({
    storage: storage,

})