// Import library
const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

// Initial express app
const app = express();
const PORT = 3000;

// Add the Express-session options
const oneDay = 1000 * 60 * 60 * 24; // 24 hours
app.use(sessions({
    secret: "Mykey",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// Parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving public file
app.use(express.static(__dirname));

// Cookie parser middleware
app.use(cookieParser());

// Setup authorization credentials
const myusername = 'admin'
const mypassword = '12345'

// a variable to save a session
var session;



// page => Welcome
app.get('/', (req, res) => {
    session = req.session;
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>Logout</a>");
    }else
    res.sendFile("views/login2.html", {root: __dirname})
});

// page => User
app.post('/user', (req, res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session = req.session;
        session.userid = req.body.username;
        console.log(req.session)
        res.sendFile("views/project2.html", {root: __dirname});
    }
    else{
        res.send('Invalid username or password');
    }
})

// page => Logout
app.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/');
});

// page => Error
app.get('*', (req, res) => {
    res.send('Page not found (Error 404)')
})

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
