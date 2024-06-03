import styled from "styled-components";
import {
  Button,
  Title,
  Text,
  ProblemEachField,
  AlertText,
  AlertTitle,
  Alert,
} from "../../components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataLoading } from "../../utils/DataLoading";

const Hidden = () => {
  const navigate = useNavigate();
  const [isCorrect, setIsCorrect] = useState<boolean | null | undefined>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertComponent, setAlertComponent] = useState<JSX.Element>(
    <DataLoading />
  );
  const [msg, setMsg] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const checkAnswer = async () => {
    setIsCorrect(null);
    setShowAlert(true);
    axios
      .get("/api/submit/hidden?answer=" + answer.toUpperCase())
      .then((res) => {
        if (res.data.correct) {
          setIsCorrect(true);
          setMsg(res.data.message);
        } else {
          setIsCorrect(false);
          setMsg(res.data.message);
        }
      })
      .catch((res) => {
        setIsCorrect(undefined);
      });
  };
  useEffect(() => {
    if (isCorrect === null) {
      setAlertComponent(<DataLoading />);
    } else if (isCorrect === true) {
      setAlertComponent(
        <>
          <AlertTitle style={{ color: "var(--Green)" }}>Correct!</AlertTitle>
          <AlertText>{msg}</AlertText>
          <Button onClick={() => navigate("/map")}>Next</Button>
        </>
      );
    } else if (isCorrect === false) {
      setAlertComponent(
        <>
          <AlertTitle style={{ color: "var(--Red)" }}>Incorrect!</AlertTitle>
          <Button onClick={() => setShowAlert(false)}>Close</Button>
        </>
      );
    } else {
      setAlertComponent(
        <>
          <AlertTitle style={{ color: "var(--Red)" }}>Error!</AlertTitle>
          <AlertText>다시 시도해보세요!</AlertText>
          <Button onClick={() => setShowAlert(false)}>Close</Button>
        </>
      );
    }
  }, [isCorrect, msg]);
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
        onInput={(e) => setAnswer(e.currentTarget.value)}
      />
      {isFound && <Button onClick={checkAnswer}>Submit</Button>}
      <Alert show={showAlert} id="hidden" children={alertComponent} />
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
