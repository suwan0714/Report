import { useEffect, useRef } from "react";

function MapView({ selected, currentLocation }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const infoRef = useRef(null);

  // 지도 생성
  useEffect(() => {
    if (!window.kakao) return;

    window.kakao.maps.load(() => {
      const container = document.getElementById("map");

      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      };

      mapRef.current = new window.kakao.maps.Map(container, options);

      // 현재 위치로 이동만 하고 마커는 생성 안 함
      if (currentLocation) {
        const currentPos = new window.kakao.maps.LatLng(
          currentLocation.lat,
          currentLocation.lng,
        );

        mapRef.current.setCenter(currentPos);
      }
    });
  }, [currentLocation]);

  // 현재 위치 변경 시 지도 중심 이동
  useEffect(() => {
    if (!mapRef.current || !currentLocation) return;

    const currentPos = new window.kakao.maps.LatLng(
      currentLocation.lat,
      currentLocation.lng,
    );

    mapRef.current.setCenter(currentPos);
  }, [currentLocation]);

  // 맛집 선택 시 마커 1개만 표시
  useEffect(() => {
    if (!mapRef.current || !selected) return;

    const position = new window.kakao.maps.LatLng(
      Number(selected.y),
      Number(selected.x),
    );

    // 기존 마커 제거
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    // 기존 인포윈도우 제거
    if (infoRef.current) {
      infoRef.current.close();
    }

    const marker = new window.kakao.maps.Marker({
      position,
    });

    marker.setMap(mapRef.current);

    const infoWindow = new window.kakao.maps.InfoWindow({
      content: `
          <div style="padding:10px;">
            ${selected.place_name}
          </div>
        `,
    });

    infoWindow.open(mapRef.current, marker);

    markerRef.current = marker;
    infoRef.current = infoWindow;

    mapRef.current.setCenter(position);
  }, [selected]);

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
