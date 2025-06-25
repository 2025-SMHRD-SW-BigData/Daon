import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Map = ({ height = 700 }) => {
  const mapElement = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [village, setVillage] = useState([]);

  // 1. JSON 데이터 불러오기 및 항구명 기준 중복 제거
  useEffect(() => {
    axios.get('/fishing_village.json')
      .then((res) => {
        const rawData = Array.isArray(res.data) ? res.data : [res.data];

        const nameSet = new Set();
        const formatted = rawData
          .filter(item => {
            const name = item.FSHNG_PRT_NM?.trim();
            if (nameSet.has(name)) return false;
            nameSet.add(name);
            return true;
          })
          .map(item => {
            const portName = item.FSHNG_PRT_NM?.trim();
            const photoPath = `/images/${portName}/${portName}_1.jpg`;

            return {
              name: portName,
              lat: parseFloat(item.LA),
              lng: parseFloat(item.LO),
              info: item.MAIN_TRRSR_NM,
              address: item.FP_ADDR_DNL,
              beaches: item.NRB_BEACH_NM,
              photo: photoPath,
            };
          });

        setVillage(formatted);
      })
      .catch(console.error);
  }, []);

  // 2. 네이버 지도 생성
  useEffect(() => {
    if (!window.naver || !mapElement.current) return;

    mapRef.current = new window.naver.maps.Map(mapElement.current, {
      center: new window.naver.maps.LatLng(36.5, 127.5),
      zoom: 7,
    });
  }, []);

  // 3. 마커 및 InfoWindow 생성
  useEffect(() => {
    if (!mapRef.current) return;

    // 기존 마커 제거
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    village.forEach(v => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(v.lat, v.lng),
        map: mapRef.current,
        title: v.name,
      });

      const infoWindow = new window.naver.maps.InfoWindow({
        content: `
          <div style="padding:10px; font-size:13px; line-height:1.5; max-width:250px;">
            <strong style="font-size:14px;">📍 ${v.name}</strong><br/>
            <b>주소:</b> ${v.address || '정보 없음'}<br/>
            <b>주요 관광지:</b> ${v.info || '없음'}<br/>
            <b>인근 해변:</b> ${v.beaches || '없음'}<br/>
            ${v.photo ? `<img src="${v.photo}" alt="${v.name} 전경" style="width:100%; margin-top:8px;" />` : ''}
          </div>
        `
      });

      window.naver.maps.Event.addListener(marker, 'click', () => {
        infoWindow.open(mapRef.current, marker);
      });

      markersRef.current.push(marker);
    });
  }, [village]);

  return (
    <div>
      <div className="section-title">
        <div
          id="map"
          ref={mapElement}
          style={{ width: '70%', height, margin: '0 auto' }}
        ></div>
      </div>
    </div>
  );
};

export default Map;
