const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const BasicsController = require('../controllers/basics');



router.get('/',BasicsController.basics_get_all);

router.post('/', checkAuth,BasicsController.basics_create_basic);

router.patch('/:basicId',checkAuth,BasicsController.basics_update_basic);

router.delete('/:basicId',checkAuth,BasicsController.basics_delete );


module.exports = router;