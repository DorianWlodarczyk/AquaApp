import fishIcon1 from "../../img/fish-icon/fish-icon-1.png";
import fishIcon2 from "../../img/fish-icon/fish-icon-2.png";
import fishIcon3 from "../../img/fish-icon/fish-icon-3.png";
import fishIcon4 from "../../img/fish-icon/fish-icon-4.png";
import fishIcon5 from "../../img/fish-icon/fish-icon-5.png";
import fishIcon6 from "../../img/fish-icon/fish-icon-6.png";

const fishIcon = new Map<string, string>([
  ["1", fishIcon1],
  ["2", fishIcon2],
  ["3", fishIcon3],
  ["4", fishIcon4],
  ["5", fishIcon5],
  ["6", fishIcon6],
]);

export const getRandomFishIcon = (): string => {
  const keys = Array.from(fishIcon.keys());
  const randomKey = keys[Math.floor(Math.random() * keys.length)];

  return fishIcon.get(randomKey) || fishIcon1;
};

const getFishIcon = (id: string) => {
  return fishIcon.get(id) || fishIcon1;
};

export default getFishIcon;
