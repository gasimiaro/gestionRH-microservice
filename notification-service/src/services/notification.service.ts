import  Notification  from '../models/Notification';
import type { CreateNotificationInput } from '../types/notification';
import nodemailer from 'nodemailer';
import axios from 'axios';

export class NotificationService {
  static transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || 'zagameur13@gmail.com',
      pass: process.env.EMAIL_PASSWORD || 'lszzzqfsjlzuwsep',
    },
  });

  static async createNotification(notification: CreateNotificationInput) {
    console.log('Creating notification:', notification);
    return Notification.create(notification);
  }

  static async getNotifications() {
    console.log('Fetching all notifications...');
    return Notification.findAll();
  }

  static async sendNotification(notification: CreateNotificationInput) {
    console.log('Processing notification:', notification);
    const createdNotification = await Notification.create({
      ...notification,
      sentAt: new Date(),
    });

    try {
      if (notification.recipientId.startsWith('COMPANY_')) {
        // Handle insurance company notification
        const companyId = notification.recipientId.replace('COMPANY_', '');
        console.log(`Fetching insurance company with ID: ${companyId}`);
        const companyResponse = await axios.post('http://localhost:3002/graphql', {
          query: `
            query {
              insuranceCompanies {
                id
                companyName
                companyEmail
              }
            }
          `,
        });

        const companies = companyResponse.data.data.insuranceCompanies;
        const company = companies.find((c: any) => c.id === companyId);
        console.log('Company data:', company);

        if (!company) {
          console.warn(`No insurance company found for ID: ${companyId}`);
          return createdNotification;
        }

        await this.sendCompanyMail(company.companyEmail, company.companyName, notification);
      } else {
        // Handle user notification
        console.log(`Fetching user with matricule: ${notification.recipientId}`);
        const userResponse = await axios.post('http://localhost:3001/graphql', {
          query: `
            query ($matricule: String!) {
              user(matricule: $matricule) {
                email
                name
              }
            }
          `,
          variables: { matricule: notification.recipientId },
        });

        const user = userResponse.data.data.user;
        console.log('User data:', user);

        if (!user) {
          console.warn(`User with matricule ${notification.recipientId} not found`);
          return createdNotification;
        }

        await this.sendUserMail(user.email, user.name, notification);
      }
    } catch (error: any) {
      console.error('Error processing notification:', error.message);
    }

    return createdNotification;
  }

  static async sendUserMail(recipientEmail: string, recipientName: string, notification: CreateNotificationInput) {
    console.log(`Sending user email to: ${recipientEmail}`);
    const mailOptions = {
      from: process.env.EMAIL_USER || 'zagameur13@gmail.com',
      to: recipientEmail,
      subject: 'Profile Update Notification',
      html: `
        <h1>Profile Update Notification</h1>
        <p>Dear ${recipientName},</p>
        <p>${notification.message}</p>
        <p>Sent at: ${new Date().toISOString()}</p>
        <br>
        <p>Best regards,</p>
        <p>Insurance Management System Team</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('User email sent successfully to:', recipientEmail);
    } catch (error: any) {
      console.error('Error sending user email:', error.message);
    }
  }

  static async sendCompanyMail(recipientEmail: string, recipientName: string, notification: CreateNotificationInput) {
    console.log(`Sending company email to: ${recipientEmail}`);
    const mailOptions = {
      from: process.env.EMAIL_USER || 'zagameur13@gmail.com',
      to: recipientEmail,
      subject: 'Beneficiary Profile Update Notification',
      html: `
        <h1>Beneficiary Update Notification</h1>
        <p>Dear ${recipientName},</p>
        <p>${notification.message}</p>
        <p>Sent at: ${new Date().toISOString()}</p>
        <br>
        <p>Best regards,</p>
        <p>Insurance Management System Team</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Company email sent successfully to:', recipientEmail);
    } catch (error: any) {
      console.error('Error sending company email:', error.message);
    }
  }

  static async getNotificationsByMatricule(matricule: string) {
    console.log(`Fetching notifications for matricule: ${matricule}`);
    return Notification.findAll({
      where: { recipientId: matricule },
    });
  }
}