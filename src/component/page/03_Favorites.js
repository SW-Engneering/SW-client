import styled from 'styled-components';

export default function Favorite() {
    return (
        <Container>
            <div>즐겨찾기한 글</div>
            <hr />
            <div>글제목</div>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
