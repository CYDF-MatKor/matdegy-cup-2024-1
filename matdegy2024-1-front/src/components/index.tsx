import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled.div<{
  width?: string;
  height?: string;
  fontSize?: string;
}>`
  width: ${(props) => props.width || "10rem"};
  height: ${(props) => props.height || "3rem"};
  font-size: ${(props) => props.fontSize || "1.5rem"};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: var(--MainPink);
  color: var(--White);
  border: 5px dashed white;
  border-radius: 20px;
  padding: 10px 20px;

  font-size: 2rem;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.45);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--LightGreen);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.45);
  }

  &:active {
    background-color: var(--LightGreen);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transform: translateY(4px);
  }
`;

const SubButton = styled(Link)<{
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
  z-index: 1;

  &:hover {
    background-color: var(--MainPink);
  }
`;

const Input = styled.input<{
  width?: string;
  height?: string;
  fontSize?: string;
}>`
  width: ${(props) => props.width || "300px"};
  height: ${(props) => props.height || "50px"};

  font-size: ${(props) => props.fontSize || "1.5rem"};
  font-family: "SingleDay-Regular";

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  margin: 20px;
  background-color: var(--White);
  color: var(--Black);
  border: 4px solid var(--MainPink);
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  outline: 0;

  &::placeholder {
    color: var(--Gray);
  }
  user-select: none;
`;

const Title = styled.h1``;

const Text = styled.p<{ fontSize?: string }>`
  font-size: ${(props) => props.fontSize || "1.5rem"};
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

const ProblemEachField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const MathText = styled.span`
  font-family: "KaTeX_Math";
`;

const AlertBackground = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${(props) => (props.show ? "100" : "-1")};
`;

const AlertField = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 50%;
  height: 50%;
  max-width: 800px;
  min-width: 400px;
  background-color: #f3efff;
  border-radius: 20px;
  border: 5px dashed var(--MainPink);
  padding: 40px;
  z-index: ${(props) => (props.show ? "101" : "-1")};
`;

const AlertTitle = styled.div`
  font-size: 55px;
  font-weight: bold;
  color: var(--MainPink);
  text-decoration: underline;
  text-shadow: 0 0 10px var(--White);
`;

const AlertText = styled.p`
  font-family: "SingleDay-Regular";
  color: var(--Black);
  font-size: 25px;
  text-shadow: 0 0 10px var(--White);
`;

const Alert = ({
  show,
  id,
  children,
}: {
  show: boolean;
  id: string;
  children: JSX.Element;
}) => {
  return (
    <AlertBackground id={id} show={show}>
      <AlertField show={show}>{children}</AlertField>
    </AlertBackground>
  );
};

const CodeforcesLink = ({ text = "Codeforces" }) => {
  return (
    <Link
      to="https://matdegy.contest.codeforces.com/group/Uw9uIVZApl/contest/527699"
      target="_blank">
      {text}
    </Link>
  );
};

export {
  Button,
  SubButton,
  Input,
  Title,
  Text,
  ProblemEachField,
  MathText,
  Alert,
  AlertTitle,
  AlertText,
  CodeforcesLink,
};
