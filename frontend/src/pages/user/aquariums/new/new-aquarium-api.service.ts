import ApiService from "../../../../utils/api/api.service";
import AccessoriesData from "../../../../utils/models/accessories/accessories-data";

class NewAquariumApi extends ApiService {
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
    };

    return output;
  }
}

export default NewAquariumApi;
