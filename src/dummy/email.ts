import { AxiosResponse } from 'axios';

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  answers?: string;
  phoneChoice?: string;
  financialAnalysis?: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

export interface EmailService {
  sendEmail(data: EmailData): Promise<AxiosResponse<EmailResponse>>;
}