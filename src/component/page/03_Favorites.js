import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import starfill from '../images/starfill.png';
import starempty from '../images/starempty.png';
import axios from 'axios';
import Cookies from 'js-cookie'

export default function Favorite() {
    const [favorite, setFavorite] = useState(true);
    const [reviews, setReviews] = useState([]);
    const userId = Cookies.get('userId')

    const [posts, setPosts] = useState([]);

    const fetchBookmarkData = async () =>{
        try{
            const response = await axios.get(`https://3.34.133.247/bookmarks?userId=${userId}`,{
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('리뷰데이터 불러오기 성공', response.data);
            setReviews(response.data);            
        }catch(error){
            console.log("리뷰 불러오기에 실패했습니다");
        }        
    }
    useEffect(()=>{
        if(userId)
            fetchBookmarkData()
    },[userId])
    
    const handleFavorite = ( ) =>{
        setFavorite(!favorite);
    } 

    const handleDelete = async (postId) => {
        try {
            const response = await fetch(`https://3.34.133.247/bookmarks?userId=${userId}&postId=${postId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': '*/*',
                },
            });
            alert("즐겨찾기 삭제 성공");
            console.log("즐겨찾기 삭제", response);           
            fetchBookmarkData(); // Refresh data after deletion
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };    

    return (
        <Container>
            <Title>즐겨찾기 한 글</Title>
            {reviews.length === 0 ? (
                <NoPosts>즐겨찾기한 글이 없습니다.</NoPosts>
            ) : (
                reviews.map((post) => (
                    <PostContainer key={post.post_id}>
                        <FavoriteContainer>
                            <StarContainer>
                                <DeleteButton onClick={() => handleDelete(post.post_id)}/>
                            </StarContainer>
                            <PostWrapper>
                                <PostTitle>{post.post_title}</PostTitle>
                                <PostContent>{post.post_content}</PostContent>         
                            </PostWrapper>     
                        </FavoriteContainer>          
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

const FavoriteContainer = styled.div`
    display:flex;
    align-items:center;
`;

const PostWrapper = styled.div`
    display:flex;
    flex-direction:column;
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

const StarContainer = styled.div`
    display: flex;
    justify-content: left;
    padding:2px;
    margin : 0 10px 0 0;
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
