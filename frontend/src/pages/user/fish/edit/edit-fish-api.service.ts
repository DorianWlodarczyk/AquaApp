import ApiService from "../../../../utils/api/api.service";

class EditFishApi extends ApiService {
  static async getFishData(id: string) {
    return { name: "Nazwa", species: "0", state: "0" };
  }

  static async saveEditFish(name: string, species: string, state: string) {
    console.log(
      JSON.stringify({ name: name, species: species, state: state }, null, 2)
    );
    alert(
      JSON.stringify({ name: name, species: species, state: state }, null, 2)
    );
  }
}

export default EditFishApi;
