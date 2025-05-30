
import { supabase } from '@/integrations/supabase/client';
import axios from 'axios';

// For now, we'll use environment variables or hardcoded values
// since whatsapp_config table doesn't exist yet
const WHATSAPP_CONFIG = {
  serri_endpoint: 'your-endpoint.com',
  serri_api_key: 'your-api-key'
};

/**
 * Send a message via WhatsApp
 * @param msg The message to send
 * @param phone The phone number to send to
 */
export const sendText = async (msg: string, phone: string): Promise<void> => {
  try {
    const options = {
      method: 'POST',
      url: `https://${WHATSAPP_CONFIG.serri_endpoint}/api/v1/sendSessionMessage/${phone}`,
      headers: {
        'Authorization': WHATSAPP_CONFIG.serri_api_key,
        'Content-Type': 'application/json',
      },
      data: {
        messageText: msg,
      }
    };

    const response = await axios(options);
    console.log('Message sent:', response.data);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};

/**
 * Send an interactive button message via WhatsApp
 * @param headerText Header text
 * @param bodyText Body text
 * @param buttonText Button text
 * @param phone Phone number to send to
 */
export const sendInteractiveButtonsMessage = async (
  headerText: string,
  bodyText: string,
  buttonText: string,
  phone: string
): Promise<void> => {
  try {
    const options = {
      method: 'POST',
      url: `https://${WHATSAPP_CONFIG.serri_endpoint}/api/v1/sendInteractiveButtonsMessage?whatsappNumber=${phone}`,
      headers: {
        'Authorization': WHATSAPP_CONFIG.serri_api_key,
        'Content-Type': 'application/json',
      },
      data: {
        header: {
          type: "Text",
          text: headerText
        },
        body: bodyText,
        buttons: [
          {
            text: buttonText
          }
        ]
      }
    };

    const response = await axios(options);
    console.log('Interactive message sent:', response.data);
  } catch (error) {
    console.error('Error sending WhatsApp interactive message:', error);
  }
};

/**
 * Send a course assignment notification to a learner
 * @param learnerName Name of the learner
 * @param courseName Name of the course
 * @param phone Phone number of the learner
 */
export const sendCourseAssignmentNotification = async (
  learnerName: string,
  courseName: string,
  phone: string
): Promise<void> => {
  const headerText = "Course Assigned!";
  const bodyText = `Hi ${learnerName}, ${courseName} course is assigned to you. Press Let's MicroLearn to start learning.`;
  const buttonText = "Let's MicroLearn";
  
  try {
    await sendInteractiveButtonsMessage(headerText, bodyText, buttonText, phone);
  } catch (error) {
    console.error('Error sending course assignment notification:', error);
  }
};
