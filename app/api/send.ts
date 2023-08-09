import { EmailTemplate } from "../components/email-template";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail (req: any, res:any){
  try {
    const data = await resend.emails.send({
      from: "admin@eha.ng",
      to: req.body.email,
      subject: "Hello world",
        html: "<strong>It works!</strong>",
      // @ts-ignore
      react: EmailTemplate({ firstName:req.body.name, email:req.body.email, password:req.body.password }),
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};