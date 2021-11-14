const db = require('../database')

exports.getPost = async (req, res) => {
    // res.send('posat');
    await db.query('SELECT * from posts',async (err,response) =>{
        if(err) {
            console.log(err);
        }
        
        res.status(200).json(response);
    })
};


exports.addPost = async (req, res) => {
    await db.query('INSERT INTO posts SET ?',
    {title: req.body.title, content: req.body.content}, async (err,response) =>{
        if(err) {
            console.log(err);
        }
        res.status(200).json(response);
            
    })

};