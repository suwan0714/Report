import axios from "axios";

const REST_API_KEY =
"331ce42b61116e9a99740098f46050c1";

export const searchRestaurant =
async (keyword, currentLocation) => {

-22,43 +17,11 async (keyword, currentLocation) => {
      "https://dapi.kakao.com/v2/local/search/keyword.json",
      {
        params,

        headers: {
          Authorization:
            `KakaoAK ${REST_API_KEY}`,
          Authorization: `KakaoAK ${REST_API_KEY}`,
        },
      }
    );

  return response.data.documents;
};

export const searchNearbyRestaurant =
async (x, y) => {

  const response =
    await axios.get(
      "https://dapi.kakao.com/v2/local/search/category.json",
      {
        params: {

          category_group_code:
            "FD6",

          x,
          y,

          radius: 2000,

          sort: "distance",
        },

        headers: {
          Authorization:
            `KakaoAK ${REST_API_KEY}`,
        },
      }
    );

  return response.data.documents;
};
