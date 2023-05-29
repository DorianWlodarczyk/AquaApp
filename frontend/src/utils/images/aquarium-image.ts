import aqua1 from "../../img/aquarium/aquarium-1.png";
import aqua2 from "../../img/aquarium/aquarium-2.png";
import aqua3 from "../../img/aquarium/aquarium-3.png";
import aqua4 from "../../img/aquarium/aquarium-4.png";
import aqua5 from "../../img/aquarium/aquarium-5.png";
import aqua6 from "../../img/aquarium/aquarium-6.png";
import aqua7 from "../../img/aquarium/aquarium-7.png";
import aqua8 from "../../img/aquarium/aquarium-8.png";
import aqua9 from "../../img/aquarium/aquarium-9.png";
import aqua10 from "../../img/aquarium/aquarium-10.png";
import aqua11 from "../../img/aquarium/aquarium-11.png";

const aquariumImg = new Map<string, string>([
  ["1", aqua1],
  ["2", aqua2],
  ["3", aqua3],
  ["4", aqua4],
  ["5", aqua5],
  ["6", aqua6],
  ["7", aqua7],
  ["8", aqua8],
  ["9", aqua9],
  ["10", aqua10],
  ["11", aqua11],
]);

const getAquariumImg = (id: string) => {
  return aquariumImg.get(id) || aqua1;
};

export default getAquariumImg;
