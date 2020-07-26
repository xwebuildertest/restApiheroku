const express = require('express');
const Users = require('../model/Users');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.post('/register', function(req, res, next) {

      const {username, password} = req.body;
      bcrypt.hash(password, 10, (err, hash) => {
        const user = new Users({
          username,
          password : hash
        })

        const promise = user.save();
        promise.then(data => res.json(data))
               .catch(err => console.log(err))
      })
      
});

router.post('/authenticate', function(req, res, next) {

      const {username, password} = req.body;

      Users.findOne({username}, (err, user) => {
          if(err) 
            throw err;
          if(!user){
            res.json({
              status: 'Topilmadi',
              message: `Kirish muoffaqiyatsiz, faqat admin kirishi mumkin`
            })
          }
          else{
             bcrypt.compare(password, user.password).then((resul) => {
               if(!resul){
                 res.json({
                   status: false,
                   message: `Foydalanuvchini paroli noto'g'ri`
                 })
               }
               else{
                 const payload = { username }

                 const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                    expiresIn: 720 // 12 soat 
                 })
                   
                 res.json({
                   status: true,
                   token
                 })

               }
             })
          }  
      })

      
});

module.exports = router;
