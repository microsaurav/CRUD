const Basic = require('../models/basic');
const mongoose = require('mongoose');


exports.basics_get_all =  (req, res, next) => {
   
    Basic.find().exec().then(docs => {

      const response = {
          count: docs.length,
          baiscs: docs.map(doc => {
              return {
                  name: doc.name,
                  age:doc.age,
                  address:doc.address,
                  _id : doc._id,
              }
          })
      }
       res.status(200).json(response);
   })
       .catch(err => {
           console.log(err);
           res.status(500).json({
               error: err
           });
       });
}


exports.basics_create_basic = async (req, res, next) => {
    const basic = new Basic({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age,
        address:req.body.address,
    })
    basic.save().then(result => {
        console.log(result);
        res.status(201).json({
            createdBasic:{
                name: result.name,
                age:result.age,
                address:result.address,
                _id : result._id,
            } 
        });
    })
        .catch(err => {
        console.log(err);
        res.status(500).json({
        error:err
        });
});
}



exports.basics_update_basic =  (req, res, next) => {
    const id = req.params.basicId;
    const updateOps = {};
    for (const ops in req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Basic.update({ _id: id }, {
        $set: updateOps
    }).exec().then(result => {
        res.status(200).json({
            message:'Basic thing updated',
        });
    }).catch(err => {
        console.log(err);
        res.status(400).json({ error: err });
    });
}


exports.basics_delete = (req, res, next) => {
    const id = req.params.baiscId;
    Basic.remove({ _id: id }).exec().then(result => {
        res.status(200).json({
            message:'Basic things deleted',
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}