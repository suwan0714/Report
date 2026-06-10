function RecommendFilter({
  onSearch,
}) {
  const recommends = [
    "혼밥",
    "데이트",
    "술집",
  ];

  return (
    <div className="filter">

      {recommends.map(
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

export default RecommendFilter;