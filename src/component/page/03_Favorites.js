// MyPosts.js
import React, { useState } from 'react';
import styled from 'styled-components';
import starfill from '../images/starfill.png';
import starempty from '../images/starempty.png';

export default function Favorite() {
    const [favorite, setFavorite] = useState(true);

    const [posts, setPosts] = useState([
        { id: 1, title: '첫 번째 게시글', content: '내용 1' },
        { id: 2, title: '두 번째 게시글', content: '내용 2' },
       
    ]);
    
    const handleFavorite = ( ) =>{
        setFavorite(!favorite);
    } 

    const handleDelete = (id) => {
        setPosts(posts.filter((post) => post.id !== id));
    };

    return (
        <Container>
            <Title>즐겨찾기 한 글</Title>
            {posts.length === 0 ? (
                <NoPosts>즐겨찾기한 글이 없습니다.</NoPosts>
            ) : (
                posts.map((post) => (
                    <PostContainer key={post.id}>
                        <ButtonContainer>
                            <DeleteButton onClick={() => handleDelete(post.id)}/>
                        </ButtonContainer>
                        <PostTitle>{post.title}</PostTitle>
                        <PostContent>{post.content}</PostContent>                        
                    </PostContainer>
                ))
            )}
        </Container>
    );
}

const Container = styled.div`
    border-radius: 10px;
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
    justify-content: left;
    padding:2px;
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
    width:20px;
    height:20px;
    background-color:white;
    background-image:url(${starfill});
    background-repeat:no-repeat;
    background-position:center;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;  
`;
