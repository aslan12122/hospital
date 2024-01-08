const express = require('express');
const bodyParser = require('body-parser');
const path = require('node:path'); 
const nodemailer = require('nodemailer');
const port = 3000 || process.env.PORT ; 
const functions = require('firebase-functions');
const app = express();

// API midlwares

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


const public = path.join(__dirname , ".." , "public")
app.use(express.static(path.join(public)));


// API routs 

app.get('/' , (req,res)=>{
    res.sendFile(public + '/index.html')
})



    // تكوين حساب البريد الإلكتروني
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'mohamadsabrialmasri@gmail.com', // حساب البريد الإلكتروني الخاص بك
        pass: 'mtsk pzuu tvbx cghc' // كلمة المرور الخاصة بك
        }
    });



//   
    app.post('/formPost' ,  (req,res)=>{
        const { first, last , email ,  message} = req.body;

    // تكوين خيارات الرسالة
    const mailOptions = {
        from: email,
        to: 'mohamadsabrialmasri@gmail.com', // البريد الإلكتروني للمستلم
        subject: 'زبون',
        text: `الاسم: ${first}\n 
        الكنية ${last}\n
        البريد الإلكتروني: ${email}\n
        الرسالة: ${message}`
      };


      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(error.toString());
        }
        res.status(200).sendFile(public + '/succes.html');
      });
  
    })

  

  



 app.listen(port , ()=>{
     console.log(`server started at https://localhost:${port}`)
 })


