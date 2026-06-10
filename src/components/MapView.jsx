import { useEffect, useRef } from "react";

function MapView({ selected, currentLocation }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao) return;

    window.kakao.maps.load(() => {
      const container =
        document.getElementById("map");

      const options = {
        center:
          new window.kakao.maps.LatLng(
            37.5665,
            126.9780
          ),
        level: 3,
      };

      mapRef.current =
        new window.kakao.maps.Map(
          container,
          options
        );

      if (currentLocation) {
        const currentPos =
          new window.kakao.maps.LatLng(
            currentLocation.lat,
            currentLocation.lng
          );

        new window.kakao.maps.Marker({
          map: mapRef.current,
          position: currentPos,
        });

        mapRef.current.setCenter(
          currentPos
        );
      }
    });
  }, []);

  useEffect(() => {
    if (
      !mapRef.current ||
      !selected
    )
      return;

    const position =
      new window.kakao.maps.LatLng(
        Number(selected.y),
        Number(selected.x)
      );

    const marker =
      new window.kakao.maps.Marker({
        map: mapRef.current,
        position,
      });

    mapRef.current.setCenter(
      position
    );

    const infoWindow =
      new window.kakao.maps.InfoWindow({
        content: `
          <div style="padding:10px;">
            ${selected.place_name}
          </div>
        `,
      });

    infoWindow.open(
      mapRef.current,
      marker
    );
  }, [selected]);
useEffect(() => {
  console.log("window.kakao =", window.kakao);
}, []);
  return (
  <div
    id="map"
    style={{
      width: "800px",
      height: "600px",
      border: "1px solid black",
    }}
  />
);
}

export default MapView;