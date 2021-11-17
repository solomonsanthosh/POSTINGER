const { response } = require('express');
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
            console.log(err,'err');
        }
        console.log(response.insertId);
        res.status(200).json(response.insertId);
            
    })

};


exports.deletePost = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM posts WHERE id = ?', [id], async (err,response) =>{
        if(err) {
            console.log(err);
            
        }
        res.status(200).json(response);
    })
}   


exports.updatePost = async (req,res) => {
    const { id } = req.params;
    console.log(id);
    await db.query(`UPDATE posts SET ? WHERE id = ${id}`,
    
    {   id:id,
        title: req.body.title,
        content: req.body.content
    },async (err,response)=> {
        if(err)
        {
            console.log(err);
        }
        res.status(200).json(response)
        
    })
}