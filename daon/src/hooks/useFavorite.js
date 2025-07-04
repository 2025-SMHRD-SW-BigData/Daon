// src/hooks/useFavorite.js
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const useFavorite = (pageTitle) => {
    const { user } = useContext(UserContext);
    const [isFavorite, setIsFavorite] = useState(false);

    // 즐겨찾기 여부 조회
    useEffect(() => {
        if (!user?.user_id) return;

        axios
            .get(`http://192.168.219.45:3003/favorite`, {
                params: {
                    user_id: user.user_id,
                    page_title: pageTitle,
                },
                withCredentials: true // ✅ 쿠키 포함
            })
            .then((res) => setIsFavorite(res.data.isFavorite))
            .catch((err) => console.log('즐겨찾기 조회 실패:', err));
    }, [user, pageTitle]);

    // 즐겨찾기 토글 (추가/삭제)
    const toggleFavorite = () => {
        if (!user?.user_id) {
            alert('즐겨찾기를 하려면 로그인해주세요!');
            return;
        }

        axios
            .post(`http://192.168.219.45:3003/favorite`, {
                user_id: user.user_id,
                page_title: pageTitle,
            }, {
                withCredentials: true // ✅ 쿠키 포함
            })
            .then((res) => setIsFavorite(res.data.isFavorite))
            .catch((err) => console.log('즐겨찾기 등록 실패:', err));
    };

    return { isFavorite, toggleFavorite };
};

export default useFavorite;
