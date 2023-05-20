const express=require('express')
const app=express();
const bodyparser=require('body-parser')
const exhbs=require('express-handlebars')
const dbo=require('./db')
app.engine('hbs',exhbs.engine({layoutsDir:"views/",defaultLayout:"main",extname:"hbs"}))
app.set('view engine','hbs')
app.set('views','views')
app.use(bodyparser.urlencoded({ extended: true }))
app.get('/',async(req,res)=>{
    let database=await dbo.getDatabase();
    const collection=database.collection('mentor');
    const cursor=collection.find({})
    let student= await cursor.toArray();
    let message='test';
    res.render('main',{message,student})
})
app.post('/store_student',async(req,res)=>{
    let database=await dbo.getDatabase();
    const collection=database.collection('mentor');
    let mentor={title:req.body.title,author:req.body.mentor}
    await collection.inserOne(mentor);
    return res.redirect('/?status=1')
})
app.listen(8000,()=>{console.log('lesting to 8000 port!!!');})