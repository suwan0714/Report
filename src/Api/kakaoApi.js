export const searchRestaurant =
async (keyword, currentLocation) => {

  const params = {
    query: keyword,
  };

  if (currentLocation) {
    params.x = currentLocation.lng;
    params.y = currentLocation.lat;
    params.radius = 2000;
    params.sort = "distance";
  }

  const response =
    await axios.get(
      "https://dapi.kakao.com/v2/local/search/keyword.json",
      {
        params,
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY}`,
        },
      }
    );

  return response.data.documents;
};
