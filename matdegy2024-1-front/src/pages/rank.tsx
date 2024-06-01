import styled from "styled-components";
import { SubButton } from "../components";
import Trophy from "../images/trophy.png";

const Rank = () => {
  const title = ["Rank", "닉네임", "푼 문제", "점수"];
  const RankListExample = [
    { rank: 1, nickname: "nickname1", solved: [1, 2, 3], score: 100 },
    { rank: 2, nickname: "nickname2", solved: [1, 6], score: 99 },
    { rank: 3, nickname: "nickname3", solved: [1], score: 98 },
  ];

  return (
    <RankContainer>
      <img src={Trophy} alt="trophy" width="100px" />
      <h1>Rank</h1>
      <SubButton to="/map">{"<< "}맵 보기</SubButton>

      <RankRow
        style={{
          backgroundColor: "var(--MainPink)",
        }}>
        {title.map((t, idx) => (
          <RankDiv key={idx}>{t}</RankDiv>
        ))}
      </RankRow>
      {RankListExample.map((rank, idx) => (
        <RankRow
          key={idx}
          style={{
            backgroundColor: "#0000008D",
          }}>
          {Object.values(rank).map((value, idx) => (
            <RankDiv key={idx}>
              {Array.isArray(value)
                ? value.map((v, idx) => <div key={idx}>{v},&nbsp;</div>)
                : value}
            </RankDiv>
          ))}
        </RankRow>
      ))}
    </RankContainer>
  );
};

const RankContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  gap: 10px;
`;

const RankRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  gap: 10px;
  text-shadow: 0 0 2px #000000;

  border-radius: 10px;
`;

const RankDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;

  color: var(--White);
  background-color: transparent;
  font-size: 20px;
`;

export default Rank;
