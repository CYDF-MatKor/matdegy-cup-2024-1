import { default as ProblemLogin } from "./Login";
import { default as ProblemHidden } from "./Hidden";
import { default as ProblemSymbol } from "./Symbol";
import { default as ProblemHeights } from "./Heights";
import { default as ProblemSequence } from "./Sequence";
import { default as ProblemWord } from "./Word";
import { default as ProblemBirthday } from "./Birthday";
import { default as ProblemProbability } from "./Probability";
import { default as ProblemIQtest } from "./IQtest";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { Title } from "../../components";

const problem = [
  "",
  "04f0afac13f8ed82", // 1
  "2029574d0f6570e4", // 2
  "0ac13c0130e9d88a", // 3
  "1675114e2ed25178", // 4
  "0f00d34e11a14d9b", // 5
  "04e932b00207fb05", // 6
  "306b31b02ca2bf96", // 7
  "22b8814b1d2f1bf6", // 8
  "21dfee562205a02e", // 9
  "045777742dbf5e0a", // 10
  "00d2e457161a07f9", // 11
  "3aceec12045a1559", // 12
  "1825d740338e27b7", // 13
  "3578ca9c254f7388", // 14
  "1cac6a97121cf283", // 15
  "0af340772569a25b", // 16
  "1fc7d2a913126df8", // 17
  "386f8e0a1cc4c8f8", // 18
  "12eee33b32ea53d7", // 19
  "0fcff2d5270748d1", // 20
  "1d6002723474b84a", // 21
  "11c15d6e0017e93d", // 22
  "26e3c9971622a958", // 23
  "15a7d0612d5691a8", // 24
  "2fc6b5362d75caee", // 25
];

const ProblemCodeToTitle: { [key: number]: string } = {
  1: "Login",
  3: "Symbol",
  4: "Heights",
  5: "Sequence",
  6: "Word",
  7: "Birthday",
  8: "Probability",
  9: "IQtest",
};
const ProblemList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
  };
  if (!problemcode) return <Navigate to="/error/404" replace={true} />;
  if (!ProblemList.includes(problemcode))
    return <Navigate to="/error/404" replace={true} />;
  return (
    <ProblemField>
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
