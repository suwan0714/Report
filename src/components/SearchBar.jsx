import { useState } from "react";

function SearchBar({
  onSearch,
  onNearbySearch,
  showFavorites,
  setShowFavorites,
  favoriteCount,
}) {
  const [keyword, setKeyword] =
    useState("");

  return (
    <div className="search-bar">

      <input
        value={keyword}
        onChange={(e) =>
          setKeyword(
            e.target.value
          )
        }
        onKeyDown={(e) => {
          if (
            e.key === "Enter"
          ) {
            onSearch(keyword);
          }
        }}
        placeholder="음식점 검색"
      />

      <button
        onClick={() =>
          onSearch(keyword)
        }
      >
        검색
      </button>

      <button
        onClick={
          onNearbySearch
        }
      >
        내 주변
      </button>

      <button
        onClick={() =>
          setShowFavorites(
            !showFavorites
          )
        }
      >
        {showFavorites
          ? "🍽 전체"
          : `❤️ ${favoriteCount}`}
      </button>

    </div>
  );
}

export default SearchBar;