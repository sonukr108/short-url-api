const express = require('express')
const { handleGenerateNewShortURL, handleGetAnalytics, handleRedirectURL, handleGetAllURL } = require('../controllers/url')

const router = express.Router();

//Routes
router.post('/', handleGenerateNewShortURL);
router.get('/', handleGetAllURL);

router.get('/:shortId', handleRedirectURL)
router.get('/analytics/:shortId', handleGetAnalytics);


module.exports = router;