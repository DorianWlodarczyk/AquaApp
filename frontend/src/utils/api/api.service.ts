import axios, { AxiosResponse } from "axios";
import { getToken } from "../firebase";

class Api {
  private static API_ROOT =
    process.env.REACT_APP_API_ROOT ||
    "https://aqua-app-backend-develop.onrender.com/aqua";

  private static token = "";

  private static debugMode = false;

  private static getDelay() {
    return Math.random() * 0 + 0;
  }

  private static async getTokenID(): Promise<string> {
    return getToken()
      .then((val) => {
        return val;
      })
      .catch((e) => {
        return " ";
      });
  }

  protected static async get<T>(
    link: string,
    headers?: {}
  ): Promise<T | undefined> {
    const newHeaders = {
      ...headers,
      token: `${await this.getTokenID()}`,
    };

    if (this.debugMode) {
      await new Promise((r) => setTimeout(r, this.getDelay()));

      console.log(`GET - Link -> ${this.API_ROOT}/${link}`, `headers ->`, {
        headers: newHeaders,
      });
      return;
    }

    try {
      const res: AxiosResponse<T, any> = await axios.get<T>(
        `${this.API_ROOT}/${link}`,
        {
          headers: newHeaders,
        }
      );

      return res.data;
    } catch (e) {
      throw e;
      //Obsługa błędów
    }
  }

  protected static async post<T>(
    link: string,
    body: any,
    headers?: {}
  ): Promise<T | undefined> {
    const newHeaders = {
      ...headers,
      token: `${await this.getTokenID()}`,
    };

    if (this.debugMode) {
      await new Promise((r) => setTimeout(r, this.getDelay()));
      console.log(
        `POST - Link -> ${this.API_ROOT}/${link}`,
        ` body -> `,
        body,
        ` headers -> `,
        { headers: newHeaders }
      );
      return;
    }

    try {
      const res: AxiosResponse<T, any> = await axios.post(
        `${this.API_ROOT}/${link}`,
        body,
        { headers: newHeaders }
      );

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  protected static async put<T>(
    link: string,
    body: any,
    headers?: {}
  ): Promise<T | undefined> {
    const newHeaders = {
      ...headers,
      token: `${await this.getTokenID()}`,
    };

    if (this.debugMode) {
      await new Promise((r) => setTimeout(r, this.getDelay()));

      console.log(
        `PUT - Link -> ${this.API_ROOT}/${link}`,
        ` body -> `,
        body,
        ` headers -> `,
        { headers: newHeaders }
      );
      return;
    }

    try {
      const res: AxiosResponse<T, any> = await axios.put(
        `${this.API_ROOT}/${link}`,
        body,
        { headers: newHeaders }
      );

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  protected static async delete<T>(
    link: string,
    headers?: {}
  ): Promise<T | undefined> {
    const newHeaders = {
      ...headers,
      token: `${await this.getTokenID()}`,
    };

    if (this.debugMode) {
      await new Promise((r) => setTimeout(r, this.getDelay()));

      console.log(`DELETE - Link -> ${this.API_ROOT}/${link}`, `headers ->`, {
        headers: newHeaders,
      });
      return;
    }
    try {
      const res: AxiosResponse<T, any> = await axios.delete(
        `${this.API_ROOT}/${link}`,
        { headers: newHeaders }
      );

      return res.data;
    } catch (e) {
      throw e;
    }
  }
}

export default Api;
