import styled from "styled-components";
import { useLayoutEffect, useState } from "react";
import {
  Button,
  Input,
  ProblemEachField,
  Text,
  MathText,
} from "../../components";

const Word = () => {
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
  const [idx, setIdx] = useState(0);
  const [string, setString] = useState("");
  useLayoutEffect(() => {
    setString(problists[idx]);
  }, [idx]);
  const len = problists.length;
  return (
    <ProblemEachField>
      <Text>
        {idx + 1}/{len}
      </Text>
      <Text>아래를 해석하시오.</Text>
      <Text>말이 되는 답이 여러개일 수 있으나 모범 답안만 인정한다</Text>
      <Text>답은 한글로만 이루어져있다(띄어쓰기 X)</Text>
      <Row>
        {idx === 10 && <MathText style={{ fontSize: "2rem" }}>{"("}</MathText>}
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
      <Input type="text" maxLength={80} />
      <Button onClick={() => setIdx((idx + 1) % len)}>Submit</Button>
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
