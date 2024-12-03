import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MemberDetail() {

    const [detailList, setDetailList] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const boardLoading = async (post_id) => {
            try {
                const response = await axios.get(`https://3.34.133.247/member/${post_id}`);
                setDetailList(response.data);
            } catch(error) {
                setError("게시물 가져오기 실패");
            }
            finally{
                console.log("게시물 로딩 완료");
            }
        }
        boardLoading();
    }, []);
}