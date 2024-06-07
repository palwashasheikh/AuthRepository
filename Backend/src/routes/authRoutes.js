const express = require('express');
const router = express.Router();
const { getUser,signup, login, logout,  verifyToken,refreshToken } = require('../controllers/authController');
const { verifyAdmin } = require('../middleware/auth');



router.post('/signup', signup);
router.post('/login', login);
router.post('/logout',verifyToken, logout);
router.get("/user",verifyToken, getUser);

router.get('/admin', verifyToken, verifyAdmin, (req, res) => {
    res.status(200).json({ message: "Welcome, admin!" });
  });
  router.get('/refresh', refreshToken, verifyToken, getUser);

  router.post('/admin/personalProfile', verifyToken, verifyAdmin, (req, res) => {
});

router.get("/",(req,res,next) => {
    res.send("helloworld");
});
module.exports = router;
