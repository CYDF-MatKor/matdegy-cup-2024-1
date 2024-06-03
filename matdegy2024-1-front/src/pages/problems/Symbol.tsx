import styled from "styled-components";
import {
  Button,
  Input,
  ProblemEachField,
  Text,
  Alert,
  AlertText,
  AlertTitle,
} from "../../components";
import { DataLoading } from "../../utils/DataLoading";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Symbol = () => {
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
      .get("/api/submit/symbol?answer=" + answer)
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
  return (
    <ProblemEachField>
      <Text
        style={{
          width: "100%",
          fontFamily: "NotoColorEmoji-Regular, Tofu",
        }}>
        〽️지🍰난🎁🎂M🎈a🎺t🎉K🎊or📧〽️🧿🌶️C🔋u😂p❤️😍에🤣는😊🥺여러🙏💕기😭업😘👍이😅후👏원😁해💀주✌️었🌴다.🐢이🐐에🍄⚽대회🍻👑문제에📸😬여👀러🚨기🏡업🕊️문🏆제😻가🌟🧿들🍀어🎨갔다🍜.🥰💀A✌️번🌴의🐢🐐주🍄인⚽공이🍻👑된📸😬기👀업🚨의🏡🕊️이름🏆은😻🌟OOOOOOO🧿🍀🎨AI🍜이다.
      </Text>
      <Input
        type="text"
        maxLength={80}
        onInput={(e) => setAnswer(e.currentTarget.value)}
      />
      <Button onClick={checkAnswer}>Submit</Button>
      <Alert show={showAlert} id="hidden" children={alertComponent} />
    </ProblemEachField>
  );
};

export default Symbol;
