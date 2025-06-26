import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

const Map = ({ searchText = '' }) => {
  const mapElement = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowsRef = useRef([]);
  const [village, setVillage] = useState([]);

  // 데이터 로드 및 포맷팅
  useEffect(() => {
    axios.get('/fishing_village.json')
      .then(res => {
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
            return {
              name: portName,
              lat: parseFloat(item.LA),
              lng: parseFloat(item.LO),
              info: item.MAIN_TRRSR_NM,
              address: item.FP_ADDR_DNL,
              beaches: item.NRB_BEACH_NM,
              photo: `/images/${portName}/${portName}_1.jpg`,
            };
          });
        setVillage(formatted);
      })
      .catch(console.error);
  }, []);

  // 맵 초기화
  useEffect(() => {
    if (!window.naver || !mapElement.current) return;
    if (!mapRef.current) {
      mapRef.current = new window.naver.maps.Map(mapElement.current, {
        center: new window.naver.maps.LatLng(36.5, 127.5),
        zoom: 7,
      });
    }
  }, []);

  // 마커 & InfoWindow 렌더링
  useEffect(() => {
    if (!mapRef.current) return;
    // 기존 마커 제거
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];
    infoWindowsRef.current = [];

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
        infoWindowsRef.current.forEach(iw => iw.close());
        infoWindow.open(mapRef.current, marker);
      });
      markersRef.current.push(marker);
      infoWindowsRef.current.push(infoWindow);
    });
  }, [village]);

  // 검색에 따른 센터 이동 & InfoWindow 오픈
  useEffect(() => {
    if (!mapRef.current || !village.length) return;
    if (!searchText.trim()) {
      mapRef.current.setCenter(new window.naver.maps.LatLng(36.5, 127.5));
      mapRef.current.setZoom(7);
      infoWindowsRef.current.forEach(iw => iw.close());
      return;
    }
    const query = searchText.trim().toLowerCase();
    let idx = village.findIndex(v => v.name.toLowerCase() === query);
    if (idx === -1) idx = village.findIndex(v => v.name.toLowerCase().includes(query));
    if (idx === -1) idx = 0;
    const marker = markersRef.current[idx];
    const iw = infoWindowsRef.current[idx];
    if (marker && iw) {
      mapRef.current.setCenter(marker.getPosition());
      mapRef.current.setZoom(12);
      infoWindowsRef.current.forEach(i => i.close());
      iw.open(mapRef.current, marker);
    }
  }, [searchText, village]);

  return (
    <div
      style={{
        width: '390px',
        height: '844px',
        margin: '0 auto',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >

      
      <div
        id="map"
        ref={mapElement}
        style={{ width: '90%', height: '90%' }}
      />
  

    </div>
    
    



  );
};

export default Map;