const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user');



exports.user_signup= (req, res, next) => {
    User.find({email:req.body.email}).exec().then(user =>{
        if(user.length >= 1){
            return res.status(409).json({
                message:'Mail exists'
            })

        }
        else{
          bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                  return res.status(500).json({
                      error: err
                  });
              } else {
                  const user = new User({
                      _id: new mongoose.Types.ObjectId(),
                      name:req.body.name,
                      email: req.body.email,
                      password: hash,
                  });
                  user.save()
                  .then(result =>{
                      console.log(result)
                          const token= jwt.sign({
                            email:req.body.email,
                            userID: new mongoose.Types.ObjectId(),
                        },
                       "secret",
                        {
                            expiresIn: "10000000020000h"
                        })
                        return res.status(200).json({
                            message:"User created",
                            token:token,
                        });
                      })
                  .catch(err =>{
                      console.log(err)
                      return res.status(500).json({
                          error: err
                      });
          });
              }
      });
        }
    })
  
}