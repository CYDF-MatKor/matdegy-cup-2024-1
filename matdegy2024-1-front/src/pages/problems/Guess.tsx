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
} from "../../components";
import { DataLoading } from "../../utils/DataLoading";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Guess = () => {
  const navigate = useNavigate();
  const [sess, setSess] = useState("");
  const [similarity, setSimilarity] = useState<any>({});
  const [wordlist, setWordlist] = useState<Array<any>>([]); // wordlist: {idx: number, word: string, similarity: double, rank: string|number}[]
  const [msg, setMsg] = useState("");
  const [idx, setIdx] = useState(0);
  const [typing, setTyping] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertComponent, setAlertComponent] = useState<JSX.Element>(
    <>
      <AlertTitle style={{ color: "var(--Green)" }}>Correct!</AlertTitle>
      <AlertText>{msg}</AlertText>
      <Button onClick={() => navigate("/map")}>Next</Button>
    </>
  );
  useEffect(() => {
    axios
      .get("/api/start/kkomantle")
      .then((res) => {
        setSess(res.data.sess);
        setSimilarity(res.data.similarity);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setAlertComponent(
      <>
        <AlertTitle style={{ color: "var(--Green)" }}>Correct!</AlertTitle>
        <AlertText>{msg}</AlertText>
        <Button onClick={() => navigate("/map")}>Next</Button>
      </>
    );
  }, [msg]);

  const sendAnswer = async () => {
    if (wordlist.findIndex((word) => word.word === typing) === -1) {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `/api/submit/guess?sess=${sess}&word=${typing}`
        );
        setMsg(res.data.message);
        if (res.data.isWord) {
          const newWordlist = [...wordlist];
          newWordlist.sort((a, b) => {
            if (a.similarity > b.similarity) return -1;
            if (a.similarity < b.similarity) return 1;
            return 0;
          });
          setWordlist([
            {
              idx: idx,
              word: typing,
              similarity: res.data.sim,
              rank: res.data.rank,
            },
            ...newWordlist,
          ]);
          setIdx(idx + 1);
          setIsCorrect(res.data.correct);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
        document.getElementById("input")?.focus();
      }
    } else {
      setMsg("이미 시도한 단어입니다.");
    }
  };
  const MakeDigitUnderdot2String = (num: number) => {
    return num?.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return sess && similarity ? (
    <ProblemEachField
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          document.getElementById("submit")?.click();
        }
      }}>
      <Text>주의! 이 페이지를 벗어나면 초기화됩니다.</Text>
      <Text style={{ width: "60%", color: "var(--MainMint)" }}>
        정답 단어와 가장 유사한 단어의 유사도는{" "}
        {MakeDigitUnderdot2String(similarity?.top)} 입니다. 10번째로 유사한
        단어의 유사도는 {MakeDigitUnderdot2String(similarity?.top10)}이고,
        1,000번째로 유사한 단어의 유사도는{" "}
        {MakeDigitUnderdot2String(similarity?.rest)} 입니다.
      </Text>
      <Input
        type="text"
        id="input"
        onChange={(e) => setTyping(e.target.value)}
      />
      <GuessAlert>{msg || "단어를 입력하세요."}</GuessAlert>
      <Button
        id="submit"
        onClick={() => {
          sendAnswer();
        }}>
        {isLoading ? <DataLoading /> : "Submit"}
      </Button>
      <GuessRow>
        <GuesTextTitle>#</GuesTextTitle>
        <GuesTextTitle>Word</GuesTextTitle>
        <GuesTextTitle>Similarity</GuesTextTitle>
        <GuesTextTitle>Rank</GuesTextTitle>
      </GuessRow>
      {wordlist.map((word, id) => (
        <>
          <GuessRow key={word.idx}>
            <GuessText>{word.idx}</GuessText>
            <GuessText>{word.word}</GuessText>
            <GuessText>{MakeDigitUnderdot2String(word.similarity)}</GuessText>
            <GuessText>{word.rank}</GuessText>
          </GuessRow>
          {id === 0 && <Line />}
        </>
      ))}
      <Alert show={isCorrect} id="alert">
        {alertComponent}
      </Alert>
    </ProblemEachField>
  ) : (
    <DataLoading />
  );
};

const GuessRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.2rem 0;
  width: 80%;
`;

const GuesTextTitle = styled(Text)`
  width: 25%;
  font-size: 2rem;
  font-weight: bold;
`;
const GuessText = styled(Text)`
  width: 25%;
  font-size: 1.5rem;
  margin: 0;
`;
const GuessAlert = styled(Text)`
  color: var(--LightRed);
  font-size: 1rem;
`;

const Line = styled.hr`
  width: 80%;
`;

export default Guess;
