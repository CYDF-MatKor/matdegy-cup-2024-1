import styled from "styled-components";
import {
  Button,
  Input,
  ProblemEachField,
  Text,
  MathText,
  Alert,
  Title,
  AlertTitle,
  AlertText,
} from "../../components";
import { DataLoading } from "../../utils/DataLoading";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Attack = () => {
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
      .get("/api/submit/attack?query=" + answer)
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
          <AlertText>{msg}</AlertText>
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
      <YurimText>유림 : 우야 백엔드 구현은 다 했어?</YurimText>
      <DongwooText>동우 : 이제 막 DB 설계 마쳤어!</DongwooText>
      <YurimText>유림 : 문제 풀면 프론트에서 맞는지 검사해야해?</YurimText>
      <DongwooText>
        동우 : 음.. 문제마다 다르긴 한데 답이 하나인 문제는 백엔드에서 검사해
      </DongwooText>
      <YurimText>유림 : 어떻게 해?</YurimText>
      <DongwooText>
        동우 : DB Table 중에 문제 제목하고 답이 저장되어 있는 것이 있어
      </DongwooText>
      <YurimText>
        유림 : 아! 그래서 프론트에서 전달된 제목과 정답이 일치하는 Row를
        검사하는구나
      </YurimText>
      <DongwooText>
        동우 : 맞아 그래서 제목은 자동으로 가고 입력한 정답을 answer로 보내서
        정확히 하나의 Row가 일치하는지 검사해!
      </DongwooText>

      <Input
        type="text"
        width="500px"
        maxLength={10}
        onInput={(e) => setAnswer(e.currentTarget.value)}
      />
      <Button onClick={checkAnswer}>Submit</Button>
      <Alert id="alert" show={showAlert} children={alertComponent} />
    </ProblemEachField>
  );
};

const YurimText = styled(Text)`
  margin: 0;
  color: var(--MainPink);
`;

const DongwooText = styled(Text)`
  margin: 0;
  color: var(--MainMint);
`;

export default Attack;
