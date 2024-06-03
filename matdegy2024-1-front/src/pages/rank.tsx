import styled from "styled-components";
import { Button, SubButton, Title } from "../components";
import Trophy from "../images/trophy.png";
import { SetStateAction, useEffect, useState } from "react";
import { DataLoading } from "../utils/DataLoading";
import axios from "axios";

const Rank = () => {
  const [isLoading, setIsLoading] = useState<boolean | null>(true);
  const [rankList, setRankList] = useState<Array<any>>([]);
  const [sortByOrigin, setSortByOrigin] = useState<boolean>(false);
  const title = [
    "Rank",
    "Team",
    "Solve",
    "Panelty",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
  ];
  const updateRank = () => {
    setIsLoading(true);
    axios
      .get("/api/users/rank")
      .then((res) => {
        const tmp: Array<any> = [];
        Object.keys(res.data).forEach((key) => {
          tmp.push({
            nickname: res.data[key].nickname,
            solved: res.data[key].solved,
            elapsed_max: Math.max(
              0,
              ...res.data[key].solved.map((e: any) => e.elapsed_time)
            ),
            elapsed_sum: res.data[key].solved.reduce(
              (acc: number, cur: any) => acc + cur.elapsed_time,
              0
            ),
            time_max: Math.max(
              0,
              ...res.data[key].solved.map((e: any) => new Date(e.time))
            ),
          });
        });
        if (sortByOrigin)
          tmp.sort((a, b) => {
            if (a.solved.length !== b.solved.length)
              return b.solved.length - a.solved.length;
            return a.elapsed_sum - b.elapsed_sum;
          });
        else
          tmp.sort((a, b) => {
            if (a.solved.length !== b.solved.length)
              return b.solved.length - a.solved.length;
            return a.elapsed_max - b.elapsed_max;
          });

        setRankList(tmp);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(null);
      });
  };
  useEffect(() => {
    updateRank();
  }, [sortByOrigin]);
  const getStringFromSeconds = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };
  return isLoading === null ? (
    <Title>Ranking Server Error</Title>
  ) : isLoading ? (
    <DataLoading />
  ) : (
    <RankContainer>
      <img src={Trophy} alt="trophy" width="100px" />
      <h1>Rank</h1>
      <SubButton to="/map">{"<< "}맵 보기</SubButton>
      <Button
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          width: "auto",
        }}
        onClick={() => setSortByOrigin(!sortByOrigin)}>
        {sortByOrigin
          ? "패널티는 정답 제출 시간의 합 입니다."
          : "패널티는 마지막 정답 제출 시간 입니다."}
      </Button>

      <RankTitleRow
        style={{
          backgroundColor: "var(--MainPink)",
        }}>
        {title.map((t, idx) => (
          <RankDiv key={idx}>{t}</RankDiv>
        ))}
      </RankTitleRow>
      {rankList.map((rank, idx) => (
        <RankRow
          key={idx}
          style={{
            backgroundColor: "#0000008D",
          }}>
          <RankDiv>{idx + 1}</RankDiv>
          <RankDiv>{rank.nickname}</RankDiv>
          <RankDiv>{rank.solved.length}</RankDiv>
          <RankDiv>
            {sortByOrigin
              ? getStringFromSeconds(rank.elapsed_sum)
              : getStringFromSeconds(rank.elapsed_max)}
          </RankDiv>
          {[...Array(16)].map((_, idx) => (
            <RankDiv key={idx}>
              {rank.solved.find((e: any) => e.pid === idx + 1) ? (
                <>
                  <RankDivDiv
                    style={{
                      fontSize: "25px",
                      fontFamily: "NotoColorEmoji-Regular",
                    }}>
                    ⭕
                  </RankDivDiv>
                  <RankDivDiv
                    style={{ fontSize: "15px", color: "var(--MainMint)" }}>
                    {getStringFromSeconds(
                      rank.solved.find((e: any) => e.pid === idx + 1)
                        .elapsed_time
                    )}
                  </RankDivDiv>
                </>
              ) : (
                <RankDivDiv>-</RankDivDiv>
              )}
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
  height: 100px;
  gap: 10px;
  text-shadow: 0 0 2px #000000;

  border-radius: 10px;
`;

const RankTitleRow = styled.div`
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  max-width: 4vw;
  height: 100px;
  color: var(--White);
  background-color: transparent;
  font-size: 20px;
`;

const RankDivDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
  color: var(--White);
  background-color: transparent;
  font-size: 20px;
`;

export default Rank;
