import styled from "styled-components";
import { useLayoutEffect, useState, useEffect } from "react";
import {
  Button,
  Input,
  ProblemEachField,
  Text,
  AlertTitle,
  AlertText,
  Alert,
} from "../../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataLoading } from "../../utils/DataLoading";

const Sequence = () => {
  const problists = [
    ["08177", "13946", "14960", "21635", "28162"],
    ["01992", "05639", "11533", "23333", "30826"],
    ["03381", "11018", "16239", "28247", "31546"],
    ["01281", "02260", "05383", "19379", "25388"],
    ["18588", "21727", "23052", "23342", "30968"],
  ];
  const [idx, setIdx] = useState(0);
  const [string, setString] = useState("");
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
  const solveProblem = async () => {
    setIsCorrect(null);
    axios
      .get("/api/submit/sequence" + (idx + 1) + "?answer=" + answer)
      .then((res) => {
        if (res.data.correct) {
          setMsg(res.data.message);
          if (idx === problists.length - 1) {
            axios
              .get("/api/submit/sequence?answer=130j")
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
          if (res.data.find((e: any) => e.pid === i + 501) === undefined) {
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
    // random permutation 0~4
    if (idx === -1 || idx >= problists.length) return;
    const perm = Array.from({ length: 5 }, (_, i) => i);
    for (let i = 0; i < 5; i++) {
      const j = Math.floor(Math.random() * 5);
      [perm[i], perm[j]] = [perm[j], perm[i]];
    }
    setString(
      problists[idx][perm[0]] +
        problists[idx][perm[1]] +
        problists[idx][perm[2]] +
        problists[idx][perm[3]] +
        problists[idx][perm[4]]
    );
  }, [idx]);
  const len = problists.length;
  return (
    <ProblemEachField>
      {idx === -1 && <DataLoading />}
      {idx >= len && <Text>이미 모든 문제를 푸셨습니다!</Text>}
      {idx !== -1 && idx < len && (
        <>
          <Text>{idx + 1}/5</Text>
          <Text>아래 수를 대표하는 영어단어 하나를 입력하세요.(소문자)</Text>
          <Text>{string}</Text>
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

export default Sequence;
