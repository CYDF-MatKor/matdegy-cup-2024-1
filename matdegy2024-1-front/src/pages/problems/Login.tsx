import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  Text,
  ProblemEachField,
  Alert,
  AlertText,
  AlertTitle,
  Button,
} from "../../components";
import { DataLoading } from "../../utils/DataLoading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [coordinate, setCoordinate] = useState({
    x: Math.floor(Math.random() * 8) + 1,
    y: Math.floor(Math.random() * 8) + 1,
  });
  const [count, setCount] = useState(0);
  const [picked] = useState(new Set<number>());
  const [isCorrect, setIsCorrect] = useState<boolean | null | undefined>(null);
  const [alertComponent, setAlertComponent] = useState<JSX.Element>(
    <DataLoading />
  );
  const [msg, setMsg] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const correct = () => {
    setIsCorrect(null);
    setShowAlert(true);
    axios
      .get(
        "/api/submit/login?answer=3nj0y_53c0nd_matd38y_cup&coord=" +
          String.fromCharCode(65 + coordinate.y - 1) +
          coordinate.x
      )
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
  const incorrect = (i: number, j: number) => {
    if (picked.has(i * 8 + j)) return;
    else {
      if (count === 4) {
        setIsCorrect(false);
        setShowAlert(true);
        setCoordinate({
          x: Math.floor(Math.random() * 8) + 1,
          y: Math.floor(Math.random() * 8) + 1,
        });
        setCount(0);
        document.querySelectorAll(".login-button").forEach((e: any) => {
          e.style.backgroundColor = "transparent";
        });
        picked.clear();
      } else {
        picked.add(i * 8 + j);
        setCount(count + 1);
      }
    }
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
            정답 좌표가 Reset되었습니다.
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
      <Text>{count}/5</Text>
      <LoginTable>
        {[...Array(9)].map((_, i) => (
          <LoginTableRow key={"row" + i}>
            {[...Array(9)].map((_, j) => (
              <LoginTableColumn key={"column" + j}>
                {i === 0 && j === 0 ? (
                  <></>
                ) : i === 0 ? (
                  <h2>{j}</h2>
                ) : j === 0 ? (
                  <h2>{String.fromCharCode(65 + i - 1)}</h2>
                ) : (
                  <LoginButton
                    className="login-button"
                    onClick={(e: any) =>
                      i === coordinate.y && j === coordinate.x
                        ? correct()
                        : (() => {
                            e.target.style.backgroundColor = "red";
                            incorrect(i, j);
                          })()
                    }>
                    Login
                    {/* {String.fromCharCode(65 + i - 1) + j} */}
                  </LoginButton>
                )}
              </LoginTableColumn>
            ))}
          </LoginTableRow>
        ))}
      </LoginTable>
      <Alert show={showAlert} id="login" children={alertComponent} />
    </ProblemEachField>
  );
};

const LoginTable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 540px;
  height: 540px;
`;

const LoginTableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% / 9);
`;

const LoginTableColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% / 9);
  height: 100%;
`;

const LoginButton = styled.div`
  width: 90%;
  height: 90%;
  outline: 2px solid var(--Gray);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background-color: transparent;
  border-radius: 10px;
`;

export default Login;
