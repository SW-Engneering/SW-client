import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

export default function MemberDetail() {
    const location = useLocation();
    const { post } = location.state;


    return (
        <DetailContainer>
            <h1>{post.post_title}</h1>
            <h3>작성자: {post.nickname}</h3>
            <p>작성일: {post.post_created_time.split('T')[0]}</p>
            <p>조회수: {post.post_hits}</p>
            <p>{post.post_content}</p>
        </DetailContainer>
    );
}

const DetailContainer = styled.div`
    padding: 20px;
    font-family: 'Pretendard-Regular';
`;
