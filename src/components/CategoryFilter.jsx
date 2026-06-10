function CategoryFilter({
  onSearch,
}) {

  const categories = [
    "한식",
    "중식",
    "일식",
    "면요리",
    "백반",
  ];

  return (
    <div className="filter">

      {categories.map(
        (item) => (
          <button
            key={item}
            onClick={() =>
              onSearch(item)
            }
          >
            {item}
          </button>
        )
      )}

    </div>
  );
}

export default CategoryFilter;