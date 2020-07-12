const express = require('express');
const path = require('path');
const port =8000;

const db= require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

app.use(express.static('assets'));

// middleware

// app.use(function(req,res,next){
//     req.myName="Shubham";
//     //console.log('middleware 1 called');
//     next();
// });

// Middleware 2

// app.use(function(req,res,next){
//     console.log('My name from MW2',req.myName)
//     console.log('middleware 2 called');
//     next();
// })

var contactList = [
    {
        name: "Shubham",
        phone: "9123142943"
    },
    {
        name: "Heisenberg",
        phone: "8782432299"
    },
    {
        name: "Elliot",
        phone: "2439593356"
    }
]

app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }

        return  res.render('home',{
            title: "My Contacts List",
            contact_list: contacts
        });
    });
    
    //res.send('<h1>The server is running or is it!!')
});

app.get('/practice', function(req,res){
    return res.render('practice',{
        title: 'Playground'
    });
});

app.post('/create-contact', function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });

    //contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log('Error in creating contact');
            return;
        }

        console.log('*******',newContact);
        return res.redirect('back');
    });

});

app.get('/delete-contact',function(req,res){
    let id = req.query.id;

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting an object from database');
            return;
        }

        return res.redirect('back');
    });
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex !=-1){
    //     contactList.splice(contactIndex,1);
    // }

    // return res.redirect('back');
});



app.listen(port,function(err){
    if(err){
        console.log('Error in running the server', err);
    }

    console.log("The express server is running on port: ",port);
});