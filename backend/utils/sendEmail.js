const nodeMailer=require("nodemailer")

const sendEmail=async(options)=>{
//mail should be sent from some id
   const transporter=nodeMailer.createTransport({
    service:process.env.SMPT_SERVICE,
    auth:{
        user:process.env.SMPT_MAIL,
        pass:process.env.SMPT_PASSWORD,
    }
   });
//    await sendEmail({
//     email:user.email,
//     subject:`ZIUM Password Recovery`,
//     message
//   });
   const mailOptions={
    from :process.env.SMPT_MAIL,
    to:options.email,//as seen in above sendEmail properties
    subject:options.subject,
    text:options.message,
   };
  await transporter.sendMail(mailOptions);
};

module.exports=sendEmail;