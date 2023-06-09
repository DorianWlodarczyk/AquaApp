import ApiService from "../../../../utils/api/api.service";

class NewFishApi extends ApiService {
  static async saveNewFish(name: string, species: string) {
    console.log(JSON.stringify({ name: name, species: species }, null, 2));
    alert(JSON.stringify({ name: name, species: species }, null, 2));
  }
}

export default NewFishApi;
