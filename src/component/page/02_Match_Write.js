import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function WritePost() {
    const navigate = useNavigate();
    const [title, setTitle] = useState(""); // 제목 상태
    const [content, setContent] = useState(""); // 내용 상태
    const [error, setError] = useState(null); // 에러 상태
    const [loading, setLoading] = useState(false); // 로딩 상태

    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지
        setLoading(true); // 로딩 시작
        setError(null); // 에러 초기화

        try {
            const response = await axios.post("https://api.example.com/posts", {
                title,
                content,
            }); // API에 게시물 작성 요청
            navigate("/match"); // 성공적으로 작성 후 매칭 페이지로 이동
        } catch (error) {
            console.error("API 호출 에러:", error);
            setError("게시물 작성 실패"); // 에러 메시지 설정
        } finally {
            setLoading(false); // 로딩 완료
        }
    };

    return (
        <Container>
            <Title>게시물 작성하기</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>} {/* 에러 메시지 표시 */}
            <Form onSubmit={handleSubmit}>
                <Label>
                    제목:
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Label>
                <Label>
                    내용:
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </Label>
                <SubmitButton type="submit" disabled={loading}>
                    {loading ? "작성 중..." : "작성하기"}
                </SubmitButton>
            </Form>
        </Container>
    );
}

const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 10px;
    font-weight: bold;
`;

const Input = styled.input`
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Textarea = styled.textarea`
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: vertical; /* 세로 방향으로 크기 조절 가능 */
`;

const SubmitButton = styled.button`
    margin-top: 20px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc; /* 로딩 중 비활성화 색상 */
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    margin-bottom: 10px;
`;
