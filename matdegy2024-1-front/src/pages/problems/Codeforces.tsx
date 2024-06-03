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
import Memo from "../../images/memo.png";

const Codeforces = () => {
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
      .get("/api/submit/codeforces?submissionID=" + answer)
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
      <br />
      <img src={Memo} alt="memo" height={"240px"} />
      <Text>
        유림이는 동우네 집에서 흥미로운 무언가를 발견했다. <br />
        자세히 보려고 줍는 순간, 이것이 그만 찢어지고 말았다.
        <br /> 동우가 화내기 전에 유림이는 종이에 적힌 나머지 내용들을
        알아내야만 한다!! <br />
        위의 그림은 유림이가 자신의 집에와 당시의 상황을 기억하여 그린 그림이다.
      </Text>
      <Text>
        이 문제는 <CodeforcesLink text="Codeforces 그룹" />
        에서 Codeforces 문제를 Accepted를 띄운 뒤, <br />
        제출한 코드의 번호를 입력하면 된다.
      </Text>
      <Input type="text" onInput={(e) => setAnswer(e.currentTarget.value)} />
      <Button
        onClick={() => {
          setIsCorrect(null);
          checkAnswer();
        }}>
        Submit
      </Button>
      <br />
      <Alert show={showAlert} id="probability">
        {alertComponent}
      </Alert>
    </ProblemEachField>
  );
};

export default Codeforces;
