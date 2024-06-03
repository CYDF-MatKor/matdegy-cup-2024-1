import styled from "styled-components";
import {
  Button,
  Input,
  ProblemEachField,
  Text,
  Alert,
  AlertTitle,
  AlertText,
} from "../../components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataLoading } from "../../utils/DataLoading";

const Birthday = () => {
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
      .get("/api/submit/birthday?answer=" + answer)
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
          <Button
            onClick={() => {
              navigate("/map");
            }}>
            Next
          </Button>
        </>
      );
    } else if (isCorrect === false) {
      setAlertComponent(
        <>
          <AlertTitle style={{ color: "var(--Red)" }}>Incorrect!</AlertTitle>
          <AlertText>{msg}</AlertText>
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

  return (
    <ProblemEachField>
      <Text style={{ width: "50%" }}>
        MatKor는 어느날 사이버국방학과 20학번 김예훈이 과학도서관 208호에 있던
        김동우에게 수학 수업을 해달라고 하며 시작되었다. 결국 OOOO년 O월 O일
        OO시 OO분에 "동우의 수학교실"이라는 이름으로 1회차 수업 "nCr 구하기"가
        진행되었다. 이날을 시작으로 10여회에 가까운 "동우의 수학교실"이
        진행되었고, "선형대수학과 최소자승법"을 주제로 20시간 수업을 진행하던
        날, 김예훈의 제안으로 MatKor라는 이름으로 동아리를 만들게 되었다. 이후
        다음학기 사이버국방학과 동아리로 인준되고, 그 바로 다음학기에는 학부
        동아리로 승격 인준 되어 현재까지 활동하고 있다.
      </Text>
      <Input
        fontSize="1rem"
        width="15rem"
        type="datetime-local"
        onInput={(e) => setAnswer(e.currentTarget.value)}
      />
      <Button onClick={checkAnswer}>Submit</Button>
      <Alert show={showAlert} id="birthday" children={alertComponent} />
    </ProblemEachField>
  );
};

export default Birthday;
