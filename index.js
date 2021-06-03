const express = require(`express`)
const mysql = require('mysql')
const app = express();
const cors = require('cors')
const bodyparser = require(`body-parser`)
const nodemailer = require(`nodemailer`)

app.use(bodyparser.urlencoded({extended: true}))
app.use(cors());
app.use(express);



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'employeedata'
})


db.connect((err)=>{
    if(err){
        throw err;
    }
    else{
        console.log(`Server Connection Successful`)
    }
})

// posting for guest data
app.post(`/api/insert`, (req,res)=>{
    const NAME = req.body.NAME 
    const EMAIL = req.body.EMAIL
    const CNIC = req.body.CNIC
    const HOST = req.body.HOST
    const MESSAGE = req.body.MESSAGE 
    const FROM = req.body.FROM
    const TO = req.body.TO

    const sqlInsert = "INSERT INTO guest (`name`, `email`, `CNIC`, `host`, `message`, `from`, `to`) VALUES (?,?,?,?,?,?,?);"
    db.query(sqlInsert,[NAME, EMAIL, CNIC, HOST, MESSAGE, FROM, TO],(err, result)=>{
        console.log(err)
    })

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sameer.hassan2k2@gmail.com',
          pass: 'beawarrior12'
        },
        tls: {
          rejectUnauthorized: false
        }
    });
      
    var mailOptions = {
        from: 'GUEST',
        to: `${EMAIL}`,
        subject:`GUEST ${NAME}`,
        html: `
            <h3> Information </h3>
            <ul>
                <li>name: ${NAME}</li>
                <li>email: ${EMAIL}</li>
                <li>CNIC: ${CNIC}</li>
                <li>host: ${HOST}</li>
                <li>message: ${MESSAGE}</li>
                <li>from: ${FROM}</li>
                <li>to: ${TO}</li>
            </ul>    
        `
    };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
})

// posting for employee data
app.post(`/api/insert2`, (req,res)=>{
    const NAME = req.body.NAME 
    const EMAIL = req.body.EMAIL
    const CNIC = req.body.CNIC
    const MESSAGE = req.body.MESSAGE 

    const sqlInsert = "INSERT INTO employee (`name`, `email`, `CNIC`, `message`) VALUES (?,?,?,?);"
    db.query(sqlInsert,[NAME, EMAIL, CNIC, MESSAGE],(err, result)=>{
        console.log(err);
        res.send("hello")
    })

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sameer.hassan2k2@gmail.com',
          pass: 'beawarrior12'
        },
        tls: {
          rejectUnauthorized: false
        }
    });
      
    var mailOptions = {
        from: 'GUEST',
        to: 'sameer.hasan2k2@gmail.com',
        subject:`Employee ${NAME}`,
        html: `
            <h3> Information </h3>
            <ul>
                <li>name: ${NAME}</li>
                <li>email: ${EMAIL}</li>
                <li>CNIC: ${CNIC}</li>
                <li>message: ${MESSAGE}</li>
            </ul>    
        `
    };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
})

// sending email to host
app.post(`/api/insert3`, (req,res)=>{
  const NAME = req.body.NAME 
    const EMAIL = req.body.EMAIL
    const CNIC = req.body.CNIC
    const MESSAGE = req.body.MESSAGE
    const yhiEmailChahiye = req.body.yhiEmailChahiye

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sameer.hassan2k2@gmail.com',
        pass: 'beawarrior12'
      },
      tls: {
        rejectUnauthorized: false
      }
  });
    
  var mailOptions = {
      from: 'GUEST',
      to: `${yhiEmailChahiye}`,
      subject:`${NAME}`,
      html: `
          <h3> ${NAME} is here to meet you </h3>
          His Message : ${MESSAGE}
          <ul>
              <li>name: ${NAME}</li>
              <li>email: ${EMAIL}</li>
              <li>CNIC: ${CNIC}</li>
          </ul>    
      `
  };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
})

app.listen(8000, ()=>console.log(`server started`))