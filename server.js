const express = require('express');
const connectDB = require('./config/db');
const path = require('path')

const app = express();


//conect database
connectDB();

//Init middleware
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.static(path.join(__dirname, './client/build')))


// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

//Serve statis assets in production
/*if(process.env.NODE_ENV==='production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}*/

app.use("*", function(req,res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
