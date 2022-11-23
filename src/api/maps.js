import axios  from "axios";
export const getPlace = async search => {
  const res = await axios.get(
    `https://search-maps.yandex.ru/v1/?text=Барашки&type=biz&lang=ru_RU&apikey=9eb8bfb0-1f2d-4dd4-9782-096a4a7a6914`,
  );
  return res;
};
