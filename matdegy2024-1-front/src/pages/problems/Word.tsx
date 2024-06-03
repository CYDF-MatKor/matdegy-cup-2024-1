import styled from "styled-components";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Button,
  Input,
  ProblemEachField,
  Text,
  MathText,
  AlertText,
  AlertTitle,
  Alert,
} from "../../components";
import { DataLoading } from "../../utils/DataLoading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Word = () => {
  const navigate = useNavigate();
  const [isCorrect, setIsCorrect] = useState<boolean | null | undefined>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertComponent, setAlertComponent] = useState<JSX.Element>(
    <DataLoading />
  );
  const [msg, setMsg] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

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

  const problists = [
    "☀️⚾🦀",
    "🖐️🪨",
    "🥚F🚗",
    "⚾💦🪨",
    "🖱️🖱️🖱️🖱️",
    "'⇐⇐⇐'⇐",
    "👁️💡🚉",
    "⇐(⇐🌕🖐️)",
    "👄🔊∈💧",
    "🧻🟥Pρ🜠",
    "🎻🆚🤱🌧️",
  ];
  const [idx, setIdx] = useState(-1);
  const [string, setString] = useState("");

  const solveProblem = async () => {
    setIsCorrect(null);
    axios
      .get("/api/submit/word" + (idx + 1) + "?answer=" + answer)
      .then((res) => {
        if (res.data.correct) {
          setMsg(res.data.message);
          if (idx === problists.length - 1) {
            axios
              .get("/api/submit/word?answer=sejong_is_god_like")
              .then((res) => {
                if (res.data.correct) {
                  setIsCorrect(true);
                  setShowAlert(true);
                } else {
                  setIsCorrect(false);
                  setMsg(res.data.message);
                  setShowAlert(true);
                }
              })
              .catch((res) => {
                setIsCorrect(undefined);
                setShowAlert(true);
              });
          } else {
            setIdx((idx + 1) % problists.length);
          }
        } else {
          setIsCorrect(false);
          setMsg(res.data.message);
          setShowAlert(true);
        }
      })
      .catch((res) => {
        setIsCorrect(undefined);
        setShowAlert(true);
      });
  };

  useEffect(() => {
    axios
      .get("/api/users/solve")
      .then((res) => {
        let tmp = 0;
        for (let i = 0; ; i++) {
          if (res.data.find((e: any) => e.pid === i + 601) === undefined) {
            tmp = i;
            break;
          }
        }
        setIdx(tmp);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  useLayoutEffect(() => {
    setString(problists[idx]);
  }, [idx]);
  const len = problists.length;
  return (
    <ProblemEachField>
      {idx === -1 && <DataLoading />}
      {idx >= len && <Text>이미 모든 문제를 푸셨습니다!</Text>}
      {idx !== -1 && idx < len && (
        <>
          <Text>
            {idx + 1}/{len}
          </Text>
          <Text>아래를 해석하시오.</Text>
          <Text>말이 되는 답이 여러개일 수 있으나 모범 답안만 인정한다</Text>
          <Text>답은 한글로만 이루어져있다(띄어쓰기 X)</Text>
          <Row>
            {idx === 10 && (
              <MathText style={{ fontSize: "2rem" }}>{"("}</MathText>
            )}
            <Text
              style={{
                fontSize: "2rem",
              }}>
              {string}
            </Text>
            {idx === 10 && (
              <MathText style={{ fontSize: "2rem" }}>{") × n"}</MathText>
            )}
          </Row>
          <Input
            type="text"
            maxLength={80}
            onInput={(e) => setAnswer(e.currentTarget.value)}
          />
          <Button onClick={solveProblem}>Submit</Button>
          <Alert show={showAlert} id="hidden" children={alertComponent} />
        </>
      )}
    </ProblemEachField>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default Word;
