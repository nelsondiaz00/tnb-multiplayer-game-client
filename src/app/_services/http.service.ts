import axios from 'axios';
import { IHero } from '../_models/interfaces/hero.interfaces';
import { Injectable } from '@angular/core';
import { IAttribute } from '../_models/interfaces/attribute.interfaces';
import { attributeName } from '../_models/types/attribute.type';

const API_CHAT_BOT_URL = 'http://165.22.5.225:5002/prompt';
const API_HEROES_URL = 'http://198.211.102.243:1802/player/getPlayerHeroes';

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
        JSON.stringify({ id: '670807117b04dcfb04ade3fa' }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data: any = response.data;
      const modifiedHeroes = data.data.map((hero: IHero) => {
        const attributesArray = Object.values(hero.attributes);
        const modifiedAttributes = attributesArray.map(
          (attribute: IAttribute) => {
            if (attribute.name === 'power') {
              attribute.valueConstant = attribute.value;
            }
            return attribute;
          }
        );

        hero.attributes = modifiedAttributes.reduce((acc, attr) => {
          acc[attr.name] = attr;
          return acc;
        }, {} as { [key: string]: IAttribute });

        const modifiedProduct = hero.products.map((product) => {
          product.effects = product.effects.map((effect) => {
            effect.attribute.name =
              effect.attribute.name.toLowerCase() as attributeName;
            effect.attribute.value = 0;
            effect.attribute.valueMax = 0;
            effect.attribute.valueMin = 0;
            effect.attribute.valueConstant = 0;
            effect.value = parseInt(effect.value.toString());
            return effect;
          });
          return product;
        });
        hero.products = modifiedProduct;
        return hero;
      });

      return modifiedHeroes;
    } catch (error: any) {
      console.error('Error fetching inventory response:', error.message);
      console.error(
        'Error details:',
        error.response?.data || 'No additional error information'
      );
      throw error;
    }
  }

  public async getHeroesFromJson(): Promise<IHero[]> {
    try {
      // const response = await axios.post(
      //   API_HEROES_URL,
      //   JSON.stringify({ id: '6705c5f5863d2272993b2b6b' }),
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // );
      // const data: any = response.data;
      // console.log(data, '°!!!');
      const response = await fetch('./assets/json/input-weapon.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: IHero[] = [];
      data.push(await response.json());
      return data;
      //  ('./assets/json/input-weapon.json');
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
