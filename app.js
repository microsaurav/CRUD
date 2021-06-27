const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');

const BasicRoutes = require('./routes/basics');
const userRoutes = require('./routes/user');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Alexa:Alexa@cluster0.0dldg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true }).then(() => {
    console.log("Connected to MongoDB successfully :)");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
});



mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//For Preventing CORS Errors
app.use((req,res,next)=>{
    res.header("Acess-Conttrol-allow-Origin",'*');
    res.header("Acess-Conttrol-allow-Origin",'Origin ,X-Requested-With,Content-TypeError,Accept,Authorization');
    if(req.method === 'OPTIONS'){
        res.header ('Access-Control-Allow-Methods,PUT,POST,PATCH,DELETE');
        return res.status(200).json({});
    }
    next();
});





app.use('/basics', BasicRoutes);
app.use('/user' , userRoutes);


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    });
});



module.exports = app;