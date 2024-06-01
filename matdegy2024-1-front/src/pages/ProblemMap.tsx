import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SubButton } from "../components";
import { problem, ProblemCodeToTitle, ProblemList } from "../components/data";

const Map = () => {
  const [isRotating, setIsRotating] = useState(true);

  const handleDoubleClick = () => {
    setIsRotating(!isRotating);
  };

  return (
    <MapContainer isRotating={isRotating} onDoubleClick={handleDoubleClick}>
      <h1>Map</h1>
      <SubButton to="/rank">랭킹보기</SubButton>
      <div>
        {ProblemList.map((idx) => (
          <ProblemLink to={"/problem/" + problem[idx]} key={idx}>
            {ProblemCodeToTitle[idx]}
          </ProblemLink>
        ))}
      </div>
    </MapContainer>
  );
};

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const MapContainer = styled.div<{
  isRotating: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-user-select: none;

  ${({ isRotating }) =>
    isRotating &&
    css`
      animation: ${rotateAnimation} 8s linear infinite;
    `}
`;

const ProblemLink = styled(Link)`
  color: var(--Black);
  text-decoration: none;
  font-size: 1.5rem;
  margin: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--MainPink);
  }
`;

export default Map;
