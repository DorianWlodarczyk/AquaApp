import axios, { AxiosResponse } from "axios";

class ApiService {
  private static API_ROOT =
    process.env.REACT_APP_API_ROOT || "http://localhost:8080";

  protected static async get<T>(
    link: string,
    headers?: {}
  ): Promise<T | undefined> {
    try {
      const res: AxiosResponse<T, any> = await axios.get<T>(
        `${this.API_ROOT}/${link}`,
        { headers: headers }
      );

      return res.data;
    } catch {
      //Obsługa błędów
    }
  }
}

export default ApiService;
