import styled from "styled-components";
import {
  Button,
  Input,
  ProblemEachField,
  Text,
  CodeforcesLink,
  Alert,
  AlertText,
  AlertTitle,
  Title,
} from "../../components";
import { DataLoading } from "../../utils/DataLoading";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sponsorship = () => {
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
      .get("/api/submit/sponsorship?submissionID=" + answer)
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
          <AlertTitle
            style={{
              color: "var(--Green)",
            }}>
            Correct!
          </AlertTitle>
          <AlertText>{msg}</AlertText>
          <Button onClick={() => setShowAlert(false)}>Next</Button>
        </>
      );
    } else if (isCorrect === false) {
      setAlertComponent(
        <>
          <AlertTitle
            style={{
              color: "var(--Red)",
            }}>
            Incorrect!
          </AlertTitle>
          <Button onClick={() => setShowAlert(false)}>Close</Button>
        </>
      );
    } else {
      setAlertComponent(
        <>
          <AlertTitle style={{ color: "var(--Red)" }}>Error!</AlertTitle>
          <Button onClick={() => setShowAlert(false)}>Close</Button>
        </>
      );
    }
  }, [isCorrect, msg]);
  return (
    <ProblemEachField>
      <Text>
        제2회 MatKor Cup에 두가지 종류의 티셔츠를 후원해주신 JaneStreet에
        감사드립니다.
      </Text>
      <Text>
        이 문제는 <CodeforcesLink text="Codeforces 그룹" />
        에서 Sponsorship 문제를 Accepted를 띄운 뒤 제출한 코드의 번호를 입력하면
        된다.
      </Text>
      <Input type="text" onInput={(e) => setAnswer(e.currentTarget.value)} />
      <Button
        onClick={() => {
          setIsCorrect(null);
          checkAnswer();
        }}>
        Submit
      </Button>
      <Alert show={showAlert} id="probability">
        {alertComponent}
      </Alert>
    </ProblemEachField>
  );
};

export default Sponsorship;
