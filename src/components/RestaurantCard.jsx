function RestaurantCard({
  restaurant,
  onSelect,
  favorites,
  toggleFavorite,
}) {
  const isFavorite =
    favorites.some(
      (item) =>
        item.id ===
        restaurant.id
    );

  return (
    <div className="card">
      <div className="card-header">
        <h3>
          {
            restaurant.place_name
          }
        </h3>

        <button
          className="favorite-btn"
          onClick={(e) => {
            e.stopPropagation();

            toggleFavorite(
              restaurant
            );
          }}
        >
          {isFavorite
            ? "❤️"
            : "🤍"}
        </button>
      </div>

      <p>
        {restaurant.road_address_name ||
          restaurant.address_name}
      </p>

      <p>
        {restaurant.phone}
      </p>

      <p>
        거리 :
        {restaurant.distance
          ? `${(
              Number(
                restaurant.distance
              ) / 1000
            ).toFixed(1)}km`
          : "-"}
      </p>

      <button
        onClick={() =>
          onSelect(
            restaurant
          )
        }
      >
        📍 지도 보기
      </button>
    </div>
  );
}

export default RestaurantCard;