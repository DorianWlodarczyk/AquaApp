import ApiService from "../../../../utils/api/api.service";
import AccessoriesData from "../../../../utils/models/accessories/accessories-data";
import { inputData } from "../../../../utils/models/input-data";

class NewAquariumApi extends ApiService {
  static async saveAquarium(value: inputData[]): Promise<string> {
    const body = {
      name: value.find((item) => item.name === "name")?.value,
      imgID: value.find((item) => item.name === "imgID")?.value,
      width: value.find((item) => item.name === "width")?.value,
      height: value.find((item) => item.name === "height")?.value,
      length: value.find((item) => item.name === "length")?.value,
      heaterID: value.find((item) => item.name === "heater")?.value,
      pumpID: value.find((item) => item.name === "pump")?.value,
      lampID: value.find((item) => item.name === "lamp")?.value,
      assetID: value.find((item) => item.name === "asset")?.value,
      plantID: value.find((item) => item.name === "plant")?.value,
      groundID: value.find((item) => item.name === "ground")?.value,
    };

    alert(JSON.stringify(body, null, 2));

    return "69";
  }

  static async fetchAccessoriesData() {
    await new Promise((r) => setTimeout(r, 500));

    const output: AccessoriesData = {
      heaters: [
        {
          id: "0",
          name: "-Dowolny-",
          maxCapacity: 999999,
        },
        {
          id: "1",
          name: "Grzałka 30W 50L",
          maxCapacity: 50,
        },
        {
          id: "2",
          name: "Ciepełko 3000 40W 80L",
          maxCapacity: 80,
        },
        {
          id: "3",
          name: "Co na grzałe wariacie 50W 100L",
          maxCapacity: 100,
        },
        {
          id: "4",
          name: "Grzałka do pieca hutniczego 60W 150L",
          maxCapacity: 150,
        },
      ],
      lamps: [
        {
          id: "0",
          name: "-Dowolne-",
        },
        {
          id: "1",
          name: "Boże oświecenie",
        },
        {
          id: "2",
          name: "Halogen",
        },
        {
          id: "3",
          name: "Gwiazda betlejemska",
        },
        {
          id: "4",
          name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        },
      ],
      pumps: [
        {
          id: "0",
          name: "-Dowolny-",
          maxCapacity: 999999,
        },
        {
          id: "1",
          name: "Pompuj pompuj wypompuj zenze",
          maxCapacity: 50,
        },
        {
          id: "2",
          name: "Pompa bez nazwy",
          maxCapacity: 80,
        },
        {
          id: "3",
          name: "Fajna pompa",
          maxCapacity: 120,
        },
        {
          id: "4",
          name: "Też fajna pompa",
          maxCapacity: 200,
        },
      ],
      assets: [
        {
          id: "-1",
          name: "-Dowolne-",
        },
        {
          id: "0",
          name: "Małe coś",
        },
        {
          id: "1",
          name: "Inne coś",
        },
        {
          id: "2",
          name: "Skarb",
        },
        {
          id: "3",
          name: "Titanic",
        },
        {
          id: "4",
          name: "Szkoda gadać",
        },
      ],
      plants: [
        {
          id: "-1",
          name: "-Dowolne-",
        },
        {
          id: "0",
          name: "Glony",
        },
        {
          id: "1",
          name: "Rzodkiewka",
        },
        {
          id: "2",
          name: "Morela",
        },
        {
          id: "3",
          name: "Co jeszcze można mieć w akwarium?",
        },
        {
          id: "4",
          name: "Kosodrzewina",
        },
      ],
      grounds: [
        {
          id: "-1",
          name: "-Dowolne-",
        },
        {
          id: "0",
          name: "Piasek",
        },
        {
          id: "1",
          name: "Ziemia",
        },
        {
          id: "2",
          name: "Hemoglobina",
        },
        {
          id: "3",
          name: "Taka",
        },
        {
          id: "4",
          name: "Sytuacja",
        },
      ],
    };

    return output;
  }
}

export default NewAquariumApi;
