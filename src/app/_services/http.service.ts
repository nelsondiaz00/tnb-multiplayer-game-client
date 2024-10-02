import axios from 'axios';

const API_URL = 'http://127.0.0.1:5002/prompt';

export async function getChatbotResponse(message: string): Promise<string> {
  try {
    const response = await axios.post(
      API_URL,
      { message },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data: any = response.data;
    console.log(data, ' °!!!');
    return data.message;
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    throw error;
  }
}
