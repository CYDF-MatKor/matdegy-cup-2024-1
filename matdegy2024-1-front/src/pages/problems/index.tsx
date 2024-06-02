import { default as ProblemLogin } from "./Login";
import { default as ProblemHidden } from "./Hidden";
import { default as ProblemSymbol } from "./Symbol";
import { default as ProblemHeights } from "./Heights";
import { default as ProblemSequence } from "./Sequence";
import { default as ProblemWord } from "./Word";
import { default as ProblemBirthday } from "./Birthday";
import { default as ProblemProbability } from "./Probability";
import { default as ProblemIQtest } from "./IQtest";
import { default as ProblemMountain } from "./Mountain";
import { default as ProblemAttack } from "./Attack";
import { default as Guess } from "./Guess";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { Title, SubButton } from "../../components";
import {
  problem,
  ProblemCodeToTitle,
  ProblemList,
} from "../../components/data";

const Problems = () => {
  const { problemurl } = useParams();
  const problemcode = problem.findIndex((p) => p === problemurl);
  const problemCodeToComponent: { [key: number]: JSX.Element } = {
    1: <ProblemLogin />,
    2: <ProblemHidden />,
    3: <ProblemSymbol />,
    4: <ProblemHeights />,
    5: <ProblemSequence />,
    6: <ProblemWord />,
    7: <ProblemBirthday />,
    8: <ProblemProbability />,
    9: <ProblemIQtest />,
    10: <ProblemMountain />,
    11: <ProblemAttack />,
    12: <Guess />,
  };
  if (!problemcode) return <Navigate to="/error/404" replace={true} />;
  if (!ProblemList.includes(problemcode))
    return <Navigate to="/error/404" replace={true} />;
  return (
    <ProblemField>
      <SubButton to="/map">{"<< "}맵 보기</SubButton>
      {problemcode in ProblemCodeToTitle && (
        <Title>{ProblemCodeToTitle[problemcode]}</Title>
      )}
      {problemcode in problemCodeToComponent && problemcode !== 2 && (
        <ProblemBackground>
          {problemCodeToComponent[problemcode]}
        </ProblemBackground>
      )}
      {problemcode === 2 && <ProblemHidden />}
    </ProblemField>
  );
};

const ProblemField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  min-height: 100%;
`;

const ProblemBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 80vw;
  background-color: #00000076;
  border-radius: 20px;
  margin: 20px;
`;

export default Problems;
