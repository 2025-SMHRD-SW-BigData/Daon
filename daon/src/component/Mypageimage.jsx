import Reac, { useState } from 'react'
import Header from './Header'
import '../style/mypage.css'
import '../style/main.css'



const Mypageimage = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const imageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    }


    return (
        <div>
                <p className='profile_text' >프로필 사진 업로드</p>
            <div style={{ paddingLeft: '20px', display:'flex' }}>
                
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
    <label style={{ marginBottom: '8px' }}>
      닉네임: 
      <input className='nic_input'
        type="text"
        style={{
          marginLeft: '10px',
          width: '100px',
          padding: '4px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
    </label>

    {/* 관심지역 */}
    <label>
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
    </label>
                </div>
                </div>
                

                <input id='fileImage' type="file" accept="image/*" onChange={imageChange}
                    style={{ display: 'none' }} />
                <label className='label_style' htmlFor='fileImage'
                >이미지 선택</label>
        </div>
    )
}

export default Mypageimage