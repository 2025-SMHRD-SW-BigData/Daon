import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Map = () => {
  const mapElement = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [village, setVillage] = useState([]);

  useEffect(() => {
    axios.get('/fishing_village.json')
      .then((res) => {
        const rawData = Array.isArray(res.data) ? res.data : [res.data];
        const formatted = rawData.map(item => ({
          name: item.FSHNG_PRT_NM,
          lat: parseFloat(item.LA),
          lng: parseFloat(item.LO),
          info: item.MAIN_TRRSR_NM,
          address: item.FP_ADDR_DNL,
          beaches: item.NRB_BEACH_NM,
        }));
        setVillage(formatted);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!window.naver || !mapElement.current) return;
    mapRef.current = new window.naver.maps.Map(mapElement.current, {
      center: new window.naver.maps.LatLng(36.5, 127.5),
      zoom: 7,
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

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
            <b>이런식으로 적으면 될까요?</b>
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
        어촌 마을 소개
        <hr />
      </div>

      <div
        id="map"
        ref={mapElement}
        style={{ width: '80%', height: '400px', margin: '0 auto' }}
      ></div>
      <div className="section-title">어촌계</div>
      <hr />
    </div>
  );
};

export default Map;