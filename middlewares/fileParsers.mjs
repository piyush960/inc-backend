import multer from 'multer';

const memberIDParser = multer({ dest: 'uploads/', limits: { fileSize: 200000, files: 1 } }).single('member_id')

export { memberIDParser }