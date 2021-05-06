/**
 * ARCHIVO PRINCIPAL DEL API
 */
const nodemailer = require("nodemailer");

const express = require("express");
const router = require("./app/routers/index");
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use("/docs", express.static(path.join(__dirname, "docs")));

app.use(express.json());
app.use("/", router);

app.post("/send-email", (req, res) => {  
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "heather.braun71@ethereal.email", // generated ethereal user
      pass: "cuqBvDB5DxmzRMAGsB", // generated ethereal password
    },
  })
});

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "heather.braun71@ethereal.email", // generated ethereal user
    pass: "cuqBvDB5DxmzRMAGsB", // generated ethereal password
  },
})

const mailOptions = {
  from: '"Estudiante de WEB 💻" <heather.braun71@ethereal.email>', // sender address
  to: "sotify2017@gmail.com", // list of receivers
  subject: "📧 Mensaje desde Nodemailer ✔", // Subject line
  text: "Esto es una prueba de nodemailer", // plain text body
  html: "<b>HOLA HUMANO 📧</b>", // html body
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    res.status(500).send(error.message);
  } else {    
    res.status(200).jsonp(req.body);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port: http://localhost:3000`);
});