import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Header from './Header';

const Map = ({ searchText = '' }) => {
  const mapElement = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowsRef = useRef([]);
  const [village, setVillage] = useState([]);

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

  useEffect(() => {
    if (!window.naver || !mapElement.current) return;

    if (!mapRef.current) {
      mapRef.current = new window.naver.maps.Map(mapElement.current, {
        center: new window.naver.maps.LatLng(36.5, 127.5),
        zoom: 7,
      });
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach(marker => marker.setMap(null));
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

  useEffect(() => {
    if (!mapRef.current || village.length === 0) return;

    if (!searchText || searchText.trim() === '') {
      mapRef.current.setCenter(new window.naver.maps.LatLng(36.5, 127.5));
      mapRef.current.setZoom(7);
      infoWindowsRef.current.forEach(iw => iw.close());
      return;
    }

    const lowerSearch = searchText.trim().toLowerCase();

    let foundIndex = village.findIndex(v => v.name.toLowerCase() === lowerSearch);

    if (foundIndex === -1) {
      foundIndex = village.findIndex(v => v.name.toLowerCase().includes(lowerSearch));
    }
    if (foundIndex === -1) foundIndex = 0;

    const targetMarker = markersRef.current[foundIndex];
    const targetInfoWindow = infoWindowsRef.current[foundIndex];

    if (targetMarker && targetInfoWindow) {
      mapRef.current.setCenter(targetMarker.getPosition());
      mapRef.current.setZoom(12);
      infoWindowsRef.current.forEach(iw => iw.close());
      targetInfoWindow.open(mapRef.current, targetMarker);
    }
  }, [searchText, village]);

  return (


    <div className='phon_size'>
      <div className="scroll-area">
       
        
        <Header></Header>
        
        <br />
        <div
          id="map"
          ref={mapElement}
          style={{ width: '90%', height: '90%' }}
        />

        <div style={{
          padding: '50px',
        }}>
        </div>
      </div>

      <NavBar />

    </div>



  );
};

export default Map;
