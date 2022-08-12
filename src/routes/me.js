const express = require('express')
const router = express.Router()
const multerUpload = require('../app/middlewares/multer')

const homeController = require('../app/controllers/me/homeController')
const profileController = require('../app/controllers/me/profileController')
const reviewController = require('../app/controllers/me/reviewController')
const msgController = require('../app/controllers/me/msgController')
const newsController = require('../app/controllers/newsController')
const searchController = require('../app/controllers/me/searchController')

// GET me
router.get('/home', homeController.home)
router.get('/news', newsController.news)
router.get('/msg', msgController.msg)
router.get('/profile/:userId', profileController.profile)
router.get('/setting', profileController.setting)
//GET review
router.get('/review/upload', reviewController.upload)
router.get('/review/library', reviewController.allReviews)
router.get('/review/:tweetId', reviewController.detail)
router.get('/review/edit/:tweetId', reviewController.edit)
router.patch('/review/edit/:tweetId', reviewController.updateReview)
router.delete('/review/library/:tweetId', reviewController.deleteReview)


// POST Review
router.post('/review/upload',multerUpload.single('img'),reviewController.uploadReview)
router.post('/search', searchController.search)
router.get('/search', searchController.searchDirect)
router.post('/follow/:userId', profileController.follow )
router.delete('/follow/:userId', profileController.unFollow)

//Put me
router.patch('/setting/:userId',multerUpload.single('img'), profileController.profileUpdate)
module.exports = router