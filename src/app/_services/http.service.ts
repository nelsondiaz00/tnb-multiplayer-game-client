import axios from 'axios';

const API_URL = 'http://localhost:5002/get_response';

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
    const data = response.data as { response: string };
    return data.response;
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    throw error;
  }
}
