// MyPosts.js
import React, { useState } from 'react';
import styled from 'styled-components';

export default function Mytext() {
    const [posts, setPosts] = useState([
        { id: 1, title: '첫 번째 게시글', content: '내용 1' },
        { id: 2, title: '두 번째 게시글', content: '내용 2' },
        { id: 3, title: '세 번째 게시글', content: '내용 3' },
    ]);

    const handleDelete = (id) => {
        setPosts(posts.filter((post) => post.id !== id));
    };

    const handleEdit = (id) => {
        // 수정 로직을 여기에 추가
        alert(`게시글 ${id} 수정하기 기능을 구현하세요.`);
    };

    return (
        <Container>
            <Title>내 게시글 관리</Title>
            {posts.length === 0 ? (
                <NoPosts>게시글이 없습니다.</NoPosts>
            ) : (
                posts.map((post) => (
                    <PostContainer key={post.id}>
                        <PostTitle>{post.title}</PostTitle>
                        <PostContent>{post.content}</PostContent>
                        <ButtonContainer>
                            <EditButton onClick={() => handleEdit(post.id)}>수정</EditButton>
                            <DeleteButton onClick={() => handleDelete(post.id)}>삭제</DeleteButton>
                        </ButtonContainer>
                    </PostContainer>
                ))
            )}
        </Container>
    );
}

const Container = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
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
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
