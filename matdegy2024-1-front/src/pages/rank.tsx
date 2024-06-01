import styled from "styled-components";
import { SubButton } from "../components";

const Rank = () => {
  const title = ["닉네임", "점수"];
  const RankListExample = [
    { nickname: "nickname1", score: 100 },
    { nickname: "nickname2", score: 99 },
    { nickname: "nickname3", score: 98 },
  ];

  return (
    <RankContainer>
      <h1>Rank</h1>
      <SubButton to="/map">{"<< "}맵 보기</SubButton>
      <RankRow>
        {title.map((t, idx) => (
          <div key={idx}>{t}</div>
        ))}
      </RankRow>
      {RankListExample.map((rank, idx) => (
        <RankRow key={idx}>
          {rank.nickname} - {rank.score}
        </RankRow>
      ))}
    </RankContainer>
  );
};

const RankContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const RankRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
`;

export default Rank;
