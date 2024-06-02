import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useState, useLayoutEffect } from "react";
import { SubButton, Text, Alert, Button } from "../components";
import { problem, ProblemCodeToTitle, ProblemList } from "../components/data";
import { IconList, connectList } from "../components/location";
import { FlyLetter } from "../components/letter";
import MapBackground from "../images/map-background.png";
import Check from "../images/check.png";
import { DataLoading } from "../utils/DataLoading";

const Map = () => {
  const [isrotating, setIsrotating] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [isLetter, setIsLetter] = useState(true);
  const [isAlert, setIsAlert] = useState(false);

  const handleDoubleClick = () => {
    setIsrotating(!isrotating);
  };
  useLayoutEffect(() => {
    setTimeout(() => {
      setSolvedNumber([1, 7, 3, 5, 8, 2, 9, 12]);
    }, 1000);
  }, []);
  const [solvedNumber, setSolvedNumber] = useState<Array<number>>([-1]);
  const [activeNumber, setActiveNumber] = useState<Array<number>>([]);

  useLayoutEffect(() => {
    const tmp = [];
    for (let i = 0; i < connectList.length; i++) {
      if (connectList[i].every((v) => solvedNumber.includes(v))) {
        tmp.push(i + 1);
      }
    }
    setActiveNumber(tmp);
  }, [solvedNumber]);

  return (
    <MapContainer>
      <NumberButton
        onMouseEnter={() => setShowNumber(true)}
        onMouseLeave={() => setShowNumber(false)}
        top="20px"
        left="calc(100vw - 180px)">
        번호보기
      </NumberButton>
      <SubButton to="/rank" top="20px" left="calc(100vw - 300px)">
        랭킹보기
      </SubButton>
      <ContentContainer
        isRotating={isrotating}
        onDoubleClick={handleDoubleClick}>
        <TitleText>
          "<span className="bigM">M</span>atdegy <span className="bigM">M</span>
          ap"
        </TitleText>
        {solvedNumber.includes(-1) ? (
          <DataLoading />
        ) : (
          <div
            style={{
              height: "440px",
              position: "relative",
            }}>
            <img src={MapBackground} alt="map" height={"440px"} />
            {IconList.map(
              (icon, i) => (
                <ProblemLink
                  to={
                    solvedNumber.includes(icon.idx) ||
                    activeNumber.includes(icon.idx)
                      ? "/problem/" + problem[icon.idx]
                      : "/map"
                  }
                  show={showNumber}
                  onClick={(event) =>
                    !activeNumber.includes(icon.idx) && event.preventDefault()
                  }
                  key={i}
                  top={icon.y}
                  left={icon.x}
                  status={
                    solvedNumber.includes(icon.idx)
                      ? "solved"
                      : activeNumber.includes(icon.idx)
                      ? "selectable"
                      : "locked"
                  }>
                  <img
                    alt="icon"
                    src={icon.icon}
                    width={"100%"}
                    style={{
                      filter: activeNumber.includes(icon.idx)
                        ? "none"
                        : "grayscale(100%)",
                    }}
                  />
                  <img
                    src={Check}
                    alt="check"
                    width={"120%"}
                    style={{
                      position: "absolute",
                      top: "5px",
                      left: "0",
                      display: solvedNumber.includes(icon.idx)
                        ? "block"
                        : "none",
                    }}
                  />
                  <NumberText show={showNumber}>{icon.idx}</NumberText>
                </ProblemLink>
              ),
              [isrotating]
            )}
          </div>
        )}
      </ContentContainer>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-user-select: none;
  height: 100vh;
  width: 100vw;
`;

const ContentContainer = styled.div<{
  isRotating: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 30px;
  -webkit-user-select: none;

  width: 1300px;
  height: 650px;

  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;

  ${({ isRotating }) =>
    isRotating &&
    css`
      animation: ${keyframes`
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(360deg);
      }
      100% {
        transform: rotate(0deg);
      }
    `} 7s linear infinite;
    `}
`;

const TitleText = styled(Text)`
  font-size: 4rem;
  color: var(--White);
  font-weight: bold;
  margin: 0;
  padding: 0;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);

  .bigM {
    font-size: 6rem;
    color: var(--MainPink);
    display: inline-block;
  }
`;

const NumberText = styled.div<{
  show: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;

  ${({ show }) =>
    show
      ? css`
          color: var(--Black);
          text-shadow: 0 0 10px var(--White);
          font-size: 3rem;
        `
      : css`
          color: inherit;
        `}
`;

const NumberButton = styled.button<{
  top?: string;
  left?: string;
}>`
  position: absolute;
  top: ${(props) => props.top || "20px"};
  left: ${(props) => props.left || "40px"};

  color: var(--White);
  text-decoration: none;
  font-size: 1.5rem;
  border: none;

  padding: 0.5rem 1rem;
  border-radius: 1rem;
  transition: background-color 0.3s;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  background-color: transparent;
  z-index: 1;

  &:hover {
    background-color: var(--MainPink);
  }

  &:focus {
    outline: none;
  }
`;

const ProblemLink = styled(Link)<{
  top: string;
  left: string;
  show: boolean;
  status: "solved" | "selectable" | "locked";
}>`
  position: absolute;
  width: 60px;
  height: 60px;
  color: transparent;
  text-decoration: none;
  font-size: 30px;
  margin: 1rem;
  padding: 0.5rem;
  border-radius: 50%;
  border: 3px solid transparent;
  transition: border 0.3s, transform 0.3s, background-color 0.3s;

  ${({ show }) =>
    show
      ? css`
          background-color: rgba(255, 255, 255, 0.3);
        `
      : css`
          color: transparent;
        `}

  &:hover {
    border: 3px solid var(--White);
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transform: scale(1.2);
    color: transparent;
  }

  ${({ top }) => css`
    top: ${top};
  `}
  ${({ left }) => css`
    left: ${left};
  `}

  ${({ status, show }) =>
    status === "solved"
      ? css``
      : status === "selectable" && !show
      ? css`
          animation: ${keyframes`
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.5);
              }
              100% {
                transform: scale(1);
              }
            `} 2s ease-in-out infinite;
        `
      : css``}
`;

export default Map;
