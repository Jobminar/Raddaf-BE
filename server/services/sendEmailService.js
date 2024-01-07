import { SES, SendEmailCommand } from "@aws-sdk/client-ses";


const sesClient = new SES({
    
    region: process.env.AWS_REGION,
    credentials:{
        accessKeyId: process.env.AWS_SES_USER_ACCESS_KEY,
        secretAccessKey : process.env.AWS_SES_USER_SECRET_ACCESS_KEY
     },
})

export async function sendEmail() {

    console.log("in send email code");
    const params= {
        Source: 'jobminarinfo@gmail.com',
        Destination : {
            ToAddresses : ['jobminarinfo@gmail.com']
        },
        Message : {
            Subject: {
                Data: "I am sending mail through SES"
            },
            Body :{
                Text: {
                    Data: "I am sending mail through SES AND its the body"
                }
            }
        }
    }

    const sendEmailCommand = new SendEmailCommand(params)

    sesClient.send(sendEmailCommand)
    .then((data)=>{
        console.log("Email sent success fully" , data);
    })
    .catch((error)=>{
        console.log("Email Error" , error);
    })

}
