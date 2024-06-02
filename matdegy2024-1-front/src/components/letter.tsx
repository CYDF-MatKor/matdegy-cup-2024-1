import styled from "styled-components";
import Letter from "../images/letter.png";
import { Button, Alert, Text } from "./";
import { useState } from "react";

const FlyLetter = ({
  top = "20px",
  left = "30px",
  isAlert,
  setIsAlert,
  msg,
  setIdxmsg,
}: {
  top?: string;
  left?: string;
  isAlert?: boolean;
  setIsAlert?: any;
  msg?: string;
  setMsg?: any;
  setIdxmsg?: any;
}) => {
  return (
    <LetterContainer
      top={top}
      left={left}
      onClick={(e: any) => {
        setIsAlert(!isAlert);
        console.log("clicked");
      }}>
      {isAlert && <LetterText>{msg}</LetterText>}
      <img src={Letter} alt="letter" width={"100px"} height={"80px"} />
    </LetterContainer>
  );
};

const LetterContainer = styled.button<{
  top: string;
  left: string;
}>`
  position: fixed;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  background-color: transparent;
  border: none;
  padding: 0;
  z-index: 100;
  cursor: pointer;
  transition: all 0.2s ease;
  animation: vibrate 0.5s infinite;

  @keyframes vibrate {
    0% {
      transform: rotate(-10deg);
    }
    50% {
      transform: rotate(10deg);
    }
    100% {
      transform: rotate(-10deg);
    }
  }

  &:active {
    animation: none;
    border: none;
  }

  &:focus {
    outline: none;
  }
`;

const LetterText = styled.div`
  white-space: nowrap;
  position: absolute;
  top: 10px;
  left: 100px;
  color: var(--White);
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  font-size: 2rem;
  border-radius: 10px;
`;

export { FlyLetter };
