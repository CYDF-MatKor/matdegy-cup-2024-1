import styled from "styled-components";
import { Button, Title, Text, ProblemEachField } from "../../components";
import { useEffect, useState } from "react";

const Hidden = () => {
  const [isFound, setIsFound] = useState(false);
  const [title, setTitle] = useState("404");
  const [text, setText] = useState("Page not found");
  useEffect(() => {
    if (isFound) {
      setTitle("Hidden");
      setText("Login 문제에서 정답의 좌표는?(ex> A1)");
    } else {
      setTitle("404");
      setText("Page not found");
    }
  }, [isFound]);
  return (
    <ProblemEachField>
      <Title> {title} </Title>
      <Text> {text} </Text>
      <HiddenInput
        x={isFound}
        type="text"
        maxLength={2}
        tabIndex={-1}
        onFocus={() => setIsFound(true)}
      />
      {isFound && <Button>Submit</Button>}
    </ProblemEachField>
  );
};

const HiddenInput = styled.input<{ x?: boolean }>`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: ${(props) => (props.x ? "1px solid black" : "0")};
  outline: ${(props) => (props.x ? "1px solid black" : "0")};
  background-color: inherit;
  color: transparent;
  font-size: 1rem;
  cursor: default;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 74vh;
  left: 60vh;
  &:focus {
    outline: ${(props) => (props.x ? "1px solid black" : "0")};
    border: ${(props) => (props.x ? "1px solid black" : "0")};
  }
`;

export default Hidden;
