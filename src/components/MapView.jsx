import { useEffect, useRef } from "react";

function MapView({ selected, currentLocation, onCenterChange }) {
  const mapRef = useRef(null);
  const currentMarkerRef = useRef(null);
  const selectedMarkerRef = useRef(null);
  const infoRef = useRef(null);
  // 지도 생성
  useEffect(() => {
    if (!window.kakao) return;

    window.kakao.maps.load(() => {
      if (mapRef.current) return;
      const container = document.getElementById("map");

      const initialCenter = currentLocation
        ? new window.kakao.maps.LatLng(currentLocation.lat, currentLocation.lng)
        : new window.kakao.maps.LatLng(37.5665, 126.978);

      const options = {
        center: initialCenter,
        level: 3,
      };

      mapRef.current = new window.kakao.maps.Map(container, options);

      window.kakao.maps.event.addListener(mapRef.current, "center_changed", () => {
        const center = mapRef.current.getCenter();

        onCenterChange?.({
          lat: center.getLat(),
          lng: center.getLng(),
        });
      });
    });
  }, [currentLocation, onCenterChange]);

  // 현재 위치 표시
  useEffect(() => {
    if (!mapRef.current || !currentLocation) return;

    if (currentMarkerRef.current) {
      currentMarkerRef.current.setMap(null);
      currentMarkerRef.current = null;
    }
    console.log("현재 위치:", currentLocation);

    if (currentLocation) {
      const currentPos = new window.kakao.maps.LatLng(
        currentLocation.lat,
        currentLocation.lng,
      );

      currentMarkerRef.current = new window.kakao.maps.Marker({
        map: mapRef.current,
        position: currentPos,
      });

      mapRef.current.setCenter(currentPos);
      onCenterChange?.({
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      });
    }
  }, [currentLocation]);

  // 맛집 선택 시 이동
  useEffect(() => {
    if (!mapRef.current || !selected) return;

    if (selectedMarkerRef.current) {
      selectedMarkerRef.current.setMap(null);
      selectedMarkerRef.current = null;
    }
    if (infoRef.current) {
      infoRef.current.close();
      infoRef.current = null;
    }
    const position = new window.kakao.maps.LatLng(
      Number(selected.y),
      Number(selected.x),
    );

    selectedMarkerRef.current = new window.kakao.maps.Marker({
      map: mapRef.current,
      position,
    });

    mapRef.current.setCenter(position);

    const infoWindow = new window.kakao.maps.InfoWindow({
      content: `
          <div style="padding:10px;">
            ${selected.place_name}
          </div>
        `,
    });

    infoWindow.open(mapRef.current, selectedMarkerRef.current);
    infoRef.current = infoWindow;
  }, [selected]);
  useEffect(() => {
    return () => {
      if (currentMarkerRef.current) currentMarkerRef.current.setMap(null);
      if (selectedMarkerRef.current) selectedMarkerRef.current.setMap(null);
      if (infoRef.current) infoRef.current.close();
      mapRef.current = null;
    };
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
