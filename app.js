const dust = require('dustjs-helpers');
const path = require('path');
const express = require('express');
const cons = require('consolidate');
const bodyParse = require('body-parser');
const pool = require('./db');
const app = express();


// old version connection

// db connection
// var connectionString = "postgres://postgres:2323@localhost/recipebookdb";

// const pool = new Pool({
//     connectionString: connectionString,
//   })
//   module.exports = {
//     query: (text, params, callback) => {
//       return pool.query(text, params, callback)
//     }
//   }

// assigning dust engine
app.engine('dust', cons.dust);

// set default ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// public folder
app.use(express.static(path.join(__dirname, 'public')));




// body parser middleware

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false}));


app.get('/', (req, res)=>{
    pool.query('SELECT * FROM recipes', (err, result)=>{
        if(err){
            return err;
        }
        res.render('index', {recipes: result.rows});
        
    })
});



app.post('/add', (req, res)=>{
    pool.query('INSERT INTO recipes (name, ingredents, directions) VALUES ($1, $2, $3)',
    [req.body.name, req.body.ingredients, req.body.directions], (err, result)=>{
        if(err){
            throw err;
        }
        res.redirect('/')
    }) 
})

app.delete('/delete/:id', (req, res)=>{
    pool.query('DELETE FROM recipes WHERE id = $1',
    [req.params.id])

    res.send(200);
});

app.post('/edit', (req, res)=>{
    pool.query('UPDATE recipes SET name = $1, ingredents=$2, directions =$3 WHERE id = $4',
    [req.body.name, req.body.ingredients, req.body.directions, req.body.id]);

    res.status(200).redirect('/');
})


app.listen(3000, ()=> console.log('3000'));