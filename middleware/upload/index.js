import multer from "multer";
const { diskStorage } = multer;

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb("Please upload only images.", false);
	}
};

const storage = diskStorage({
	destination: function (req, file, cb) {
		if(req.files?.category_Picture) cb(null, './uploads/categories');
		else if (req.files?.blog_Picture) cb(null, './uploads/blogs');
		else if (req.files?.logo) cb(null, './uploads/logo');
		else cb(null, './uploads/pictures');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '_' + file.originalname);
	}
})


const upload = multer({
	storage: storage,
	fileFilter: multerFilter
});

export default upload;
