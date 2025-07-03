import React, { useState, useEffect, useContext } from 'react'
import Header from './Header'
import '../style/mypage.css'
import '../style/main.css'
import { UserContext } from '../context/UserContext';



const Mypageimage = ({ nickname }) => {
  const { user } = useContext(UserContext); // ✅ 이건 반드시 함수 안에서 써야 함
  const userId = user?.user_id;

  const [isEditing, setIsEditing] = useState(false); // 수정 중인지
  const [editNickname, setEditNickname] = useState(nickname || ''); // 닉네임 입력 상태

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleNicknameChange = (e) => {
    setEditNickname(e.target.value);
  };

  const handleSaveNickname = () => {
    setIsEditing(false);
    // ✅ 저장 로직: localStorage 또는 서버 요청 가능
    localStorage.setItem(`mypage_nickname_${userId}`, editNickname);
  };

  useEffect(() => {
    if (!userId) return;
    const savedNick = localStorage.getItem(`mypage_nickname_${userId}`);
    if (savedNick) {
      setEditNickname(savedNick);
    }
  }, [userId]);



  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });


  const imageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId) return;

    setImage(file);
    const base64 = await toBase64(file);
    setPreview(base64);
    // 사용자별로 저장
    localStorage.setItem(`mypage_profile_preview_${userId}`, base64);
  }
  useEffect(() => {
    if (!userId) return;
    const savedPreview = localStorage.getItem(`mypage_profile_preview_${userId}`);
    if (savedPreview) {
      setPreview(savedPreview);
    } else {
      setPreview(null); // 없으면 초기화
    }
  }, [userId]); // userId 바뀌면 재실행

  const clearImage = () => {
    localStorage.removeItem('mypage_profile_preview');
    setPreview(null);
  };


  return (
    <div>
      <p className='profile_text' >프로필 사진 업로드</p>
      <div style={{ paddingLeft: '20px', display: 'flex' }}>

        {/* 이미지 미리보기 */}
        {preview && (
          <img
            src={preview}
            alt="미리보기"
            style={{
              width: '100px',
              height: '120px',
              borderRadius: '0%',
              objectFit: 'cover',
              border: '2px solid #ddd',
              marginBottom: '10px',
              display: 'block'
            }}
          />
        )}
        <div style={{ marginLeft: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* 닉네임 */}

          {/* 닉네임 영역 */}
          <label style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            닉네임:
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editNickname}
                  onChange={handleNicknameChange}
                  style={{
                    marginLeft: '8px',
                    padding: '4px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    width: '100px'
                  }}
                />
                <button
                  onClick={handleSaveNickname}
                  style={{ marginLeft: '8px', fontSize: '12px',borderRadius:'10px', width:'30px',height:'30px',backgroundColor : '#66A5ED',color:'white' }}
                >
                  저장
                </button>
              </>
            ) : (
              <>
                <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>{editNickname}</span>
                <button
                  onClick={handleEditToggle}
                  style={{ marginLeft: '8px', fontSize: '12px',borderRadius:'10px', width:'30px',height:'30px',backgroundColor : '#66A5ED',color:'white' }}
                >
                  수정
                </button>
              </>
            )}
          </label>

          {/* 관심지역 */}
          {/* <label>
            관심지역:
            <select
              style={{
                marginLeft: '10px',
                width: '120px',
                padding: '4px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            >
              <option>전체지역</option>
              <option>서울특별시</option>
              <option>부산광역시</option>
              <option>대구광역시</option>
              <option>인천광역시</option>
              <option>광주광역시</option>
              <option>대전광역시</option>
              <option>울산광역시</option>
              <option>세종특별자치시</option>
              <option>강원특별자치도</option>
              <option>경기도</option>
              <option>충청북도</option>
              <option>충청남도</option>
              <option>전라남도</option>
              <option>전북특별자치도</option>
              <option>경상북도</option>
              <option>경상남도</option>
              <option>제주특별자치도</option>
            </select>
          </label> */}
        </div>
      </div>


      <input id='fileImage' type="file" accept="image/*" onChange={imageChange}
        style={{ display: 'none' }} />
      <label className='label_style' htmlFor='fileImage'
      >이미지 선택</label>

      {preview && (
        <button
          style={{ alignSelf: 'flex-start', display: 'block', width: '100px', fontSize: '10px', marginTop: '10px', marginLeft: '20px', borderRadius: '5px' }}
          onClick={clearImage}
        >
          이미지 초기화
        </button>
      )}

    </div>
  )
}

export default Mypageimage