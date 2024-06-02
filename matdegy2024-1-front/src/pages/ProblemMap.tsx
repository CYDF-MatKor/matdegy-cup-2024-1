import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SubButton, Text } from "../components";
import { problem, ProblemCodeToTitle, ProblemList } from "../components/data";
import { IconList } from "../components/location";
import MapBackground from "../images/map-background.png";
import Check from "../images/check.png";

const Map = () => {
  const [isRotating, setIsRotating] = useState(true);
  const [showNumber, setShowNumber] = useState(false);

  const handleDoubleClick = () => {
    setIsRotating(!isRotating);
  };

  const solvedNumber = [1, 3, 2, 9];
  const activeNumber = [6, 7, 12];

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
        isRotating={isRotating}
        onDoubleClick={handleDoubleClick}>
        <TitleText>
          "<span className="bigM">M</span>atdegy <span className="bigM">M</span>
          ap"
        </TitleText>
        <div
          style={{
            height: "440px",
            position: "relative",
          }}>
          <img src={MapBackground} alt="map" height={"440px"} />
          {IconList.map(
            (icon, idx) => (
              <ProblemLink
                to={"/problem/" + problem[icon.idx]}
                show={showNumber}
                onClick={(event) =>
                  !(
                    activeNumber.includes(icon.idx) ||
                    solvedNumber.includes(icon.idx)
                  ) && event.preventDefault()
                }
                key={idx}
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
                  key={idx}
                  style={{
                    filter:
                      solvedNumber.includes(icon.idx) ||
                      activeNumber.includes(icon.idx)
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
                    display: solvedNumber.includes(icon.idx) ? "block" : "none",
                  }}
                />
                <NumberText key={idx} show={showNumber}>
                  {icon.idx}
                </NumberText>
              </ProblemLink>
            ),
            [isRotating]
          )}
        </div>
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
    `} 5s linear infinite;
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

  padding: 0.5rem 1rem;
  border-radius: 1rem;
  transition: background-color 0.3s;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  background-color: transparent;
  z-index: 1;

  &:hover {
    background-color: var(--MainPink);
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
