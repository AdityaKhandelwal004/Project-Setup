import config from "../config/index.ts";

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(config.sendgrid.apiKey);

export default class EmailClient {
  private fromEmail: string;
  private fromName: string;
  constructor() {
    this.fromEmail = `${config.sendgrid.fromEmail}`;
    this.fromName = `${config.sendgrid.fromName}`;
  }

  async sendEmail(subject : string, body : string, to : string[], attachments?: any[]) {
    const mailOptions: {
      to: string[],
      from: { name: string, email: string },
      subject: string,
      html: string,
      attachments?: any[]
    } = {
      to,
      from: {
        name: this.fromName,
        email: this.fromEmail,
      },
      subject,
      html: body,
    };

     if (attachments && attachments.length > 0) {
      mailOptions.attachments = attachments.map(file => {
        const base64Content = Buffer.isBuffer(file.content)
          ? file.content.toString('base64') // Encode if it's a buffer
          : Buffer.from(file.content).toString('base64');
        return {
          content: base64Content,
          filename: file.filename || "output.pdf",
          type: file.mimetype || "application/pdf",
          disposition: "attachment",
        }
      });
    }
    
    return sgMail
      .send(mailOptions)
      .then((res) => res)
      .catch((err) => err);
  }
}
