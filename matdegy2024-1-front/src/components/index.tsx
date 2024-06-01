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

const SubButton = styled(Link)`
  position: absolute;
  top: 20px;
  left: 40px;

  color: var(--White);
  text-decoration: none;
  font-size: 1.5rem;

  padding: 0.5rem 1rem;
  border-radius: 1rem;
  transition: background-color 0.3s;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: var(--MainPink);
  }
`;

const Input = styled.input<{
  width?: string;
  height?: string;
  fontSize?: string;
}>`
  width: ${(props) => props.width || "10rem"};
  height: ${(props) => props.height || "3rem"};

  font-size: ${(props) => props.fontSize || "1.5rem"};
  font-family: "KaTeX_Main";

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  background-color: var(--White);
  color: var(--Black);
  border-radius: 0.5rem;
  user-select: none;
  margin: 0.5rem;
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
  background-color: var(--White);
  border-radius: 1rem;
  z-index: ${(props) => (props.show ? "101" : "-1")};
`;

const AlertTitle = styled.h1`
  font-family: "SingleDay-Regular";
  background: var(--Gray);
`;

const AlertText = styled.p`
  font-family: "SingleDay-Regular";
  color: var(--Black);
  font-size: 1.5rem;
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
};
