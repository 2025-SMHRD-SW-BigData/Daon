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
            <div style={{ padding: '20px' }}>
                <p className='profile_text' >프로필 사진 업로드</p>
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
                            display: 'flex'
                        }}
                    />
                )}
                <input id='fileImage' type="file" accept="image/*" onChange={imageChange}
                    style={{ display: 'none' }} />
                <label className='label_style' htmlFor='fileImage'
                >이미지 선택</label>
                </div>
                {/* {image && <p style={{ fontSize: '14px' }}>{image.name}</p>} */}
                <input style={{
                    display: '',
                    width: '100px'
                }} type="text" />

        </div>
    )
}

export default Mypageimage