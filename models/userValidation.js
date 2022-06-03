const { check } = require('express-validator');

exports.userValidation = [
    check('name', 'Name is requied').not().isEmpty(),
    check('favoriteColor', 'Favorite color must be a string').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]
