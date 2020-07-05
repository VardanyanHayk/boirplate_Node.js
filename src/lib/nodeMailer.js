import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testappbyme95@gmail.com',
    pass: 'efkpwbjwqrtyeect',
  },
});

export const verificateEmail = async (userEmail, uuid, user) => {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: 'InnoApp', // sender address
      to: userEmail, // list of receivers
      subject: 'Verificate your email', // Subject line
      html: `<html>
     <head>
     <style>
     h1 {
       color: blue;
       font-family: verdana;
       font-size: 300%;
     
     }
     a {
       background:green;
         padding:10px;
       color: white;
       font-family: courier;
       font-size: 80%;
       style:none;
       text-decoration: none;
     }
     </style>
     </head>
     <body>
     
     <h1>Confirm your account</h1>
     <a  href='http://test-it.surge.sh/confirm/${user}/${uuid}'>Confirm</a>
     
     </body>
     </html>`, // plain text body
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return { err };
      } else {
        resolve(info);
      }
    });
  });
};
export const forgotPass = async (userEmail, token) => {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: 'Market Place', // sender address
      to: userEmail, // list of receivers
      subject: 'Your key', // Subject line
      html: `<html>
     <head>
     </head>
     <style>
     a {
       background:green;
         padding:10px;
       color: white;
       font-family: courier;
       font-size: 80%;
       style:none;
       text-decoration: none;
     }
     </style>
     <body>
     <a  href='${token}'>Change password</a>
     <p>'${token}'</p>
     </body>
     </html>`, // plain text body
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('mail error', err);
        return { err };
      } else {
        resolve(info);
      }
    });
  });
};
