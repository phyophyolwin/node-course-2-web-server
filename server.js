const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) =>{
    //Can be used to call db to authenticate the user or log the data
    //It will not move on until next() is called in middle ware.
    //If next() never gets called, the route will not be rendered.
    let now = new Date().toString();
    fs.appendFile('server.log', `${now}: ${req.method} ${req.url} \n`,(err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();

}); //app.use is registering middleware

// app.use((req, res, next) =>{// This will show the maintenance page and can not view any other pages.
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));//Telling express where to use the static pages, Setting public static pages which everyone can accessf

hbs.registerHelper('getCurrentYear',()=>{//hbs template 
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{//Capitalization helper
    return text.toUpperCase();
});

app.get('/', (req, res) =>{
    res.render('home.hbs',{
        welcomeMessage: 'Welcome to the home page!',
        pageTitle: 'Home Page'
        
    })
        
    // res.send('<h1>Hello Express</h1>');

    // res.send({
    //     name: 'Phyo Phyo',
    //     likes: [
    //         'Reading',
    //         'Biking'
    //     ]
    // });
});

app.get('/about', (req, res)=>{
    // res.send('About page');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req, res)=>{
    res.send({
        bad: 'bad request',
        errorMsg: [
            'lala',
            'dada'
        ]
    });
})

app.get('/project', (req, res) =>{
    res.render('projects.hbs',{
        pageTitle: 'Projects'
    });
});

app.listen(port,() =>{
    console.log(`Server is up on port ${port}`);
});