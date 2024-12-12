/* eslint-disable */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Mytext() {
    const [posts, setPosts] = useState([]);
    const [id, setId] = useState(null);
    const cookieId = Cookies.get('userId');
    const navigate = useNavigate();

    useEffect(() => {
        setId(cookieId);
        console.log(cookieId);
    }, [cookieId]);

    const handleEdit = (postId) => {
        navigate('/memberwrite', { state: { post: posts.find((post) => post.post_id === postId) } });
    };

    const handleDelete = async (postId) => {
        try {
            const response = await axios.delete(`https://3.34.133.247/post/${postId}?userId=${cookieId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 204) {
                setPosts(posts.filter((post) => post.post_id !== postId));
                alert('게시글이 삭제되었습니다.');
                console.log('삭제성공');
            }
        } catch (error) {
            console.error('게시글 삭제 중 오류 발생', error);
            alert('게시글 삭제에 실패했습니다.');
        }
    };

    const fetchUserBulletin = async () => {
        try {
            const response = await axios.get(`https://3.34.133.247/board/${cookieId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('내가 쓴 글 불러오기 성공', response.data);
            setPosts(response.data);
        } catch (error) {
            console.error('API 요청 에러', error);
        }
    };
    useEffect(() => {
        if (cookieId) fetchUserBulletin();
    }, [cookieId]);

    return (
        <Container>
            <Title>내 게시글 관리</Title>
            {posts.length === 0 ? (
                <NoPosts>게시글이 없습니다.</NoPosts>
            ) : (
                posts.map((post) => (
                    <PostContainer key={post.post_id}>
                        <PostTitle>{post.post_title}</PostTitle>
                        <PostContent>{post.post_content}</PostContent>
                        <ButtonContainer>
                            <EditButton onClick={() => handleEdit(post.post_id)}>수정</EditButton>
                            <DeleteButton onClick={() => handleDelete(post.post_id)}>삭제</DeleteButton>
                        </ButtonContainer>
                    </PostContainer>
                ))
            )}
        </Container>
    );
}

const Container = styled.div`
    border-radius: 10px;
    width: 100%;
    height: 100%;
`;

const Title = styled.h2`
    margin-bottom: 20px;
`;

const NoPosts = styled.div`
    color: #888;
    font-size: 18px;
`;

const PostContainer = styled.div`
    background-color: white;
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
    border: solid 0.5px rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    &:not(last-child) {
        margin-bottom: 5px;
    }
`;

const PostTitle = styled.h3`
    margin: 0;
`;

const PostContent = styled.p`
    margin: 5px 0;
    overflow: hidden; /* 넘치는 내용 숨기기 */
    text-overflow: ellipsis; /* 넘치는 내용에 '...' 표시 */
    white-space: nowrap; /* 한 줄로 표시 */
    display: block; /* 블록으로 표시 */
    max-width: 100%; /* 최대 너비 설정 */
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
`;

const EditButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

const DeleteButton = styled.button`
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #c82333;
    }
`;
