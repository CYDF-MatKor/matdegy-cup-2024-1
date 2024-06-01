import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Button } from "../components";

const Home = () => {
  const navigate = useNavigate();
  const [newNickname, setNewNickname] = useState("");
  const [newNicknameStatus, setNewNicknameStatus] = useState("unsatisfied"); // "unsatisfied" | "duplicated" | "valid" | "pending"
  useEffect(() => {
    const checkNickname = setTimeout(() => {
      if (newNickname.length < 3 || newNickname.length > 20) {
        setNewNicknameStatus("unsatisfied");
      } else {
        if (newNickname === "duplicated") {
          setNewNicknameStatus("duplicated");
        } else {
          setNewNicknameStatus("valid");
        }
      }
    }, 1000);
    return () => clearTimeout(checkNickname);
  }, [newNickname]);

  return (
    <HomeDiv>
      <HomeTitle>제2회 Matdegy Cup에 오신 여러분 환영합니다</HomeTitle>
      <HomeContainer>
        <HomeCard>
          <HomeCardTitle>이미 참여하시고 있으신가요?</HomeCardTitle>
          <HomeCardInput placeholder="닉네임을 입력해주세요" maxLength={20} />
          <HomeCardInput
            placeholder="본인 확인 코드를 입력해주세요"
            maxLength={8}
          />
          <Button
            onClick={() => {
              navigate("/map");
            }}>
            참여하기
          </Button>
        </HomeCard>
        <HomeCard>
          <HomeCardTitle>새로 참여하시고 싶으신가요?</HomeCardTitle>
          <HomeCardInput
            placeholder="닉네임을 입력해주세요"
            maxLength={20}
            onInput={(e: any) => {
              setNewNicknameStatus("pending");
              setNewNickname(e.target.value);
            }}
          />
          <HomeCardText
            color={
              newNicknameStatus === "unsatisfied"
                ? "var(--Red)"
                : newNicknameStatus === "duplicated"
                ? "var(--Red)"
                : newNicknameStatus === "valid"
                ? "var(--Green)"
                : "var(--Black)"
            }>
            {newNicknameStatus === "unsatisfied"
              ? "닉네임은 3자 이상 20자 이하여야 합니다."
              : newNicknameStatus === "duplicated"
              ? "이미 존재하는 닉네임입니다."
              : newNicknameStatus === "valid"
              ? "사용 가능한 닉네임입니다."
              : "잠시만 기다려주세요."}
          </HomeCardText>
          <Button
            onClick={() => {
              navigate("/map");
            }}>
            참여하기
          </Button>
        </HomeCard>
      </HomeContainer>
    </HomeDiv>
  );
};

const HomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const HomeTitle = styled.h1`
  font-weight: bold;
  margin: 100px 0 50px 0;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  gap: 20px;
`;

const HomeCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #00000061;
  border-radius: 20px;
  padding: 20px;
`;

const HomeCardTitle = styled.h2`
  font-weight: bold;
`;

const HomeCardInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 3px solid var(--MainPink);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  outline: 0;
  background: var(--White);
  color: var(--Black);
  &::placeholder {
    color: var(--Gray);
  }

  width: 20rem;
  height: 2rem;
  font-size: 1rem;
  padding: 0 0.5rem;
  border-radius: 0.5rem;
  &[type="number"] {
    -moz-appearance: textfield;
  }
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const HomeCardText = styled.p<{ color?: string }>`
  color: ${(props) => props.color || "var(--Black)"};
  font-size: 1rem;
`;

export default Home;
