import axios from 'axios';
import { IHero } from '../_models/interfaces/hero.interfaces';
import { Injectable } from '@angular/core';

const API_CHAT_BOT_URL = 'http://127.0.0.1:5002/prompt';
const API_HEROES_URL = 'http://localhost:1803/player/getPlayerHeroes';

export async function getChatbotResponse(message: string): Promise<string> {
  try {
    const response = await axios.post(
      API_CHAT_BOT_URL,
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
@Injectable({
  providedIn: 'root',
})
export default class httpService {
  public async getHeroesFromPlayer(): Promise<IHero[]> {
    try {
      const response = await axios.post(
        API_HEROES_URL,
        JSON.stringify({ id: '6702193f00d446eb9b5e359f' }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data: any = response.data;
      console.log(data, '°!!!');
      return data.data;
    } catch (error: any) {
      console.error('Error fetching inventory response:', error.message);
      console.error(
        'Error details:',
        error.response?.data || 'No additional error information'
      );
      throw error;
    }
  }
}
