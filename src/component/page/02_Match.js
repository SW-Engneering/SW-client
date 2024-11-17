import styled from 'styled-components';
import 배너 from '../images/배너.png';

export default function Match() {
    return (
        <Container>
            <BannerContainer>
                <Image src={배너} alt="배너" />
            </BannerContainer>
            <TitleContainer>
                <TeamContainer>팀 매칭하기</TeamContainer>
                <SitemapContainer>
                    <a href="/">메인</a>
                    &gt;
                    <strong>팀 매칭하기</strong>
                </SitemapContainer>
            </TitleContainer>
            <div>등록된 게시물이 없습니다.</div>
        </Container>
    );
}

const Container = styled.div`
    justify-content: center;
    align-items: center;
    padding-left: 200px;
    padding-right: 200px;
`;

const BannerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 0.1px solid grey; /* 하단 회색 줄 */
`;

const TeamContainer = styled.div`
    font-size: 30px;
    font-weight: bold;
    padding: 10px 0;
`;

const Image = styled.img`
    width: 80%;
    height: auto;
    object-fit: contain;
`;

const SitemapContainer = styled.div`
    font-size: 15px;
    padding: 20px 0; /* 위아래 패딩 추가 */
`;
