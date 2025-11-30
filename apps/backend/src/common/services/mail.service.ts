import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // For development: use ethereal.email (fake SMTP)
    // For production: replace with real SMTP config (Gmail, SendGrid, etc.)
    this.createTransporter();
  }

  private async createTransporter() {
    // Create test account for development
    const testAccount = await nodemailer.createTestAccount();

    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `http://localhost:3001/reset-password?token=${token}`;

    const mailOptions = {
      from: '"Ing Foundation CRM" <noreply@ingfoundation.com>',
      to: email,
      subject: 'Password Reset Request',
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4F46E5;">Password Reset Request</h2>
                    <p>You requested to reset your password for your Ing Foundation CRM account.</p>
                    <p>Click the button below to reset your password:</p>
                    <a href="${resetUrl}" 
                       style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">
                        Reset Password
                    </a>
                    <p>Or copy and paste this link into your browser:</p>
                    <p style="color: #6B7280; word-break: break-all;">${resetUrl}</p>
                    <p style="color: #DC2626; font-size: 14px;">
                        <strong>This link will expire in 1 hour.</strong>
                    </p>
                    <p style="color: #6B7280; font-size: 14px;">
                        If you didn't request this, please ignore this email.
                    </p>
                    <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 20px 0;">
                    <p style="color: #9CA3AF; font-size: 12px;">
                        © ${new Date().getFullYear()} Ing Foundation CRM. All rights reserved.
                    </p>
                </div>
            `,
    };

    const info = await this.transporter.sendMail(mailOptions);

    // Log preview URL for development (ethereal.email)
    console.log('📧 Password reset email sent!');
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

    return info;
  }
}
