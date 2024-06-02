import styled from "styled-components";
import Letter from "../images/letter.png";
import { Button, Alert } from "./";
import { useState } from "react";

const FlyLetter = ({
  top = "20px",
  left = "30px",
}: {
  top?: string;
  left?: string;
}) => {
  const [isAlert, setIsAlert] = useState(false);
  return (
    <>
      <LetterContainer
        top={top}
        left={left}
        onClick={() => {
          setIsAlert(true);
          console.log("clicked");
        }}>
        <img src={Letter} alt="letter" width={"100px"} height={"80px"} />
      </LetterContainer>
      <Alert
        id="flyalert"
        show={isAlert}
        children={
          <>
            <h1>편지를 찾았습니다!</h1>
            <Button
              onClick={() => {
                setIsAlert(false);
              }}>
              확인
            </Button>
          </>
        }
      />
    </>
  );
};

const LetterContainer = styled.button<{
  top: string;
  left: string;
}>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  background-color: transparent;
  border: none;
  padding: 0;
  z-index: 100;
  cursor: pointer;
  transition: all 0.2s ease;
  animation: vibrate 1s infinite, fly 15s infinite;

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

  @keyframes fly {
    0% {
      transform: translateY(0);
    }
    10% {
      transform: translateX(400px) translateY(200px);
    }
    20% {
      transform: translateY(200px) translateX(200px);
    }
    30% {
      transform: translateX(100px) translateY(300px);
    }
    50% {
      transform: translateX(800px) translateY(50px);
    }
    70% {
      transform: translateX(1000px) translateY(600px);
    }
    80% {
      transform: translateX(200px) translateY(500px);
    }
    100% {
      transform: translateY(0);
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

export { FlyLetter };
