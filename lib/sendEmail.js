import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, text) => {
  const username = process.env.EMAIL;
  const password = process.env.PASSWORD;  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: username,
        pass: password
    }
});

  const info = await transporter.sendMail({
    from: username,
    to,
    subject, 
    text, 
})
return {username, password, info}
};

export default sendEmail;
