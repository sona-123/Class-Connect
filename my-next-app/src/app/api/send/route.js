
import { NextResponse } from 'next/server';
import { EmailTemplate } from '../../_components/EmailTemplate';
import { Resend } from 'resend';
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
export async function POST(req) {
  try {
    console.log("Incoming request body:", req.body);

    const response =await req.json()

    console.log(response.emailToSend);
   
    const { data, error } = await resend.emails.send({
      from: 'cloudconnect@resend.dev',
      to: response.emailToSend,
      subject: `Shared a file with you`,
      react: EmailTemplate(response),
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error: 'Failed to send email' });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
