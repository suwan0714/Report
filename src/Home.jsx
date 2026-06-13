import { useState, useEffect } from "react";

import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import RecommendFilter from "./components/RecommendFilter";
import RestaurantList from "./components/RestaurantList";
import MapView from "./components/MapView";

import { searchRestaurant, searchNearbyRestaurant } from "./api/kakaoApi";

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");

    return saved ? JSON.parse(saved) : [];
  });

  const [showFavorites, setShowFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");

    return saved ? JSON.parse(saved).length > 0 : false;
  });

  const [selected, setSelected] = useState(null);

  const [currentLocation, setCurrentLocation] = useState(null);

  const [sortType, setSortType] = useState("default");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log("위치 가져오기 실패", error);
      },
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (keyword) => {
    if (!keyword || !keyword.trim()) {
      return;
    }

    if (!currentLocation) {
      alert("현재 위치를 먼저 불러온 뒤 다시 시도해 주세요.");
      return;
    }

    const result = await searchRestaurant(keyword, currentLocation);

    setRestaurants(result);
    setShowFavorites(false);
  };

  const handleNearbySearch = async () => {
    if (!currentLocation) {
      alert("현재 위치를 불러오는 중입니다.");
      return;
    }

    const result = await searchNearbyRestaurant(
      currentLocation.lng,
      currentLocation.lat,
    );

    setRestaurants(result);
    setShowFavorites(false);
  };

  const toggleFavorite = (restaurant) => {
    const exists = favorites.find((item) => item.id === restaurant.id);

    if (exists) {
      const updated = favorites.filter((item) => item.id !== restaurant.id);

      setFavorites(updated);

      if (showFavorites && updated.length === 0) {
        setShowFavorites(false);
      }
    } else {
      setFavorites([...favorites, restaurant]);
    }
  };

  const displayedRestaurants = showFavorites ? favorites : restaurants;

  const sortedRestaurants = [...displayedRestaurants];

  if (sortType === "name") {
    sortedRestaurants.sort((a, b) => a.place_name.localeCompare(b.place_name));
  }

  if (sortType === "distance") {
    sortedRestaurants.sort(
      (a, b) => Number(a.distance || 999999) - Number(b.distance || 999999),
    );
  }

  return (
    <div>
      <h1 className="title">맛집 추천 사이트</h1>

      <SearchBar
        onSearch={handleSearch}
        onNearbySearch={handleNearbySearch}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
        favoriteCount={favorites.length}
      />

      <div className="top-filter">
        <div className="left-filter">
          <CategoryFilter onSearch={handleSearch} />

          <span className="divider">|</span>

          <RecommendFilter onSearch={handleSearch} />
        </div>

        <div className="sort-box">
          <button onClick={() => setSortType("default")}>기본순</button>

          <button onClick={() => setSortType("name")}>이름순</button>

          <button onClick={() => setSortType("distance")}>가까운순</button>
        </div>
      </div>

      {showFavorites && <h2>❤️ 내 즐겨찾기 맛집</h2>}

      <div className="content">
        <RestaurantList
          restaurants={sortedRestaurants}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onSelect={setSelected}
        />

        <MapView selected={selected} currentLocation={currentLocation} />
      </div>
    </div>
  );
}

export default Home;
