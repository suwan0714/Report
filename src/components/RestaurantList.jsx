import RestaurantCard from "./RestaurantCard";

function RestaurantList({
  restaurants,
  favorites,
  toggleFavorite,
  onSelect,
}) {
  if (restaurants.length === 0) {
    return (
      <div className="list">
        <p>표시할 맛집이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="list">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default RestaurantList;