import axios from "axios";

const REST_API_KEY = "331ce42b61116e9a99740098f46050c1";

export const searchRestaurant = async (keyword, currentLocation) => {
  const params = {
    query: keyword,
    x: currentLocation.lng,
    y: currentLocation.lat,
    radius: 20000,
    sort: "distance",
  };

  const response = await axios.get(
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

export const searchNearbyRestaurant = async (x, y) => {
  const response = await axios.get(
    "https://dapi.kakao.com/v2/local/search/category.json",
    {
      params: {
        category_group_code: "FD6",
        x,
        y,
        radius: 2000,
        sort: "distance",
      },
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
    }
  );

  return response.data.documents;
};

// 새로 추가: 지도 경계 범위 내에서 검색
export const searchRestaurantInBounds = async (keyword, bounds) => {
  const params = {
    query: keyword,
    // 지도 중심 좌표 (bounds의 중점)
    x: (bounds.sw.lng + bounds.ne.lng) / 2,
    y: (bounds.sw.lat + bounds.ne.lat) / 2,
    // 충분한 반경 설정
    radius: 10000,
    sort: "distance",
  };

  const response = await axios.get(
    "https://dapi.kakao.com/v2/local/search/keyword.json",
    {
      params,
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
    }
  );

  // 반환된 결과에서 bounds 내에 있는 것만 필터링
  return response.data.documents.filter((restaurant) => {
    const lat = Number(restaurant.y);
    const lng = Number(restaurant.x);
    
    return (
      lat >= bounds.sw.lat &&
      lat <= bounds.ne.lat &&
      lng >= bounds.sw.lng &&
      lng <= bounds.ne.lng
    );
  });
};
