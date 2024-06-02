import styled from "styled-components";
import { useState, useEffect } from "react";
import { ProblemEachField, Text, Button, Alert } from "../../components";

const IQtest = () => {
  const [page, setPage] = useState(0);
  const [color, setColor] = useState("#ff0000");
  const [colorInverse, setColorInverse] = useState("#00ffff");

  useEffect(() => {
    if (page === 1) {
      try {
        const audio = document.getElementById("audio") as HTMLAudioElement;
        audio.currentTime = 9.5;
        audio.play();
      } catch (e) {
        console.log(e);
      }
    } else {
      const audio = document.getElementById("audio") as HTMLAudioElement;
      if (audio) audio.pause();
    }
  }, [page]);

  useEffect(() => {
    const [rhex, ghex, bhex] = [
      color.slice(1, 3),
      color.slice(3, 5),
      color.slice(5, 7),
    ];
    const [r, g, b] = [
      parseInt(rhex, 16),
      parseInt(ghex, 16),
      parseInt(bhex, 16),
    ];
    setColorInverse(
      `#${(255 - r).toString(16).padStart(2, "0")}${(255 - g)
        .toString(16)
        .padStart(2, "0")}${(255 - b).toString(16).padStart(2, "0")}`
    );
  }, [color]);

  const randomColor = () => {
    const currentR = parseInt(color.slice(1, 3), 16);
    const currentG = parseInt(color.slice(3, 5), 16);
    const currentB = parseInt(color.slice(5, 7), 16);

    const random = (current: number) => {
      const rng = 16;
      const tmp = Math.floor(
        Math.random() * rng * 2 -
          rng +
          Math.min(255 - rng, Math.max(rng, current))
      );
      if (tmp < 0) return 0;
      if (tmp > 255) return 255;
      return tmp;
    };

    const r = random(currentR);
    const g = random(currentG);
    const b = random(currentB);
    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  const randomColorList = Array.from({ length: 10 }, () => randomColor());

  return (
    <ProblemEachField>
      {page === 0 && (
        <SelectColorPage color={color} setColor={setColor} setPage={setPage} />
      )}
      {page === 1 && (
        <ColorQuizPage
          colorList={randomColorList}
          colorInv={colorInverse}
          setPage={setPage}
        />
      )}
      {page === 2 && (
        <AnswerPage
          colorList={randomColorList}
          colorInv={colorInverse}
          setPage={setPage}
        />
      )}
      <div style={{ height: "30px" }}>
        <audio
          src="/api/audio/ThreeTwoOneGo.mp3"
          style={{ display: "none" }}
          id="audio"
        />
      </div>
    </ProblemEachField>
  );
};

const SelectColorPage = ({
  color,
  setColor,
  setPage,
}: {
  color: string;
  setColor: (color: string) => void;
  setPage: (page: number) => void;
}) => {
  return (
    <PageLayout>
      색을 하나 골라주세요.
      <ColorInput
        defaultValue={color}
        onChange={(e) => {
          setColor(e.target.value);
        }}
      />
      {color}
      <Gap />
      <Button onClick={() => setPage(1)}>다음</Button>
    </PageLayout>
  );
};

const ColorQuizPage = ({
  colorList,
  colorInv,
  setPage,
}: {
  colorList: string[];
  colorInv: string;
  setPage: (page: number) => void;
}) => {
  const [quizNum, setQuizNum] = useState<number>(0);
  const [countDown, setCountDown] = useState<number>(4);

  useEffect(() => {
    if (countDown > 0) {
      const interval = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [countDown]);

  useEffect(() => {
    if (countDown > 0) return;
    const interval = setInterval(() => {
      setQuizNum((quizNum) => (quizNum + 1) % colorList.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [colorList, countDown]);

  return (
    <PageLayout>
      {countDown > 0 ? "순서를 기억해주세요." : "너의 능지를 시험해보겠다"}
      {countDown > 0 ? (
        <CountBox>{countDown > 1 ? countDown - 1 : "Go"}</CountBox>
      ) : (
        <QuizBox
          style={{
            backgroundColor: colorList[quizNum],
            color: colorInv,
          }}>
          {quizNum + 1}
        </QuizBox>
      )}
      <Gap />
      <Button
        onClick={() => {
          setPage(2);
        }}>
        다음
      </Button>
    </PageLayout>
  );
};

const AnswerPage = ({
  colorList,
  colorInv,
  setPage,
}: {
  colorList: string[];
  colorInv: string;
  setPage: (page: number) => void;
}) => {
  const [answerColorList, setAnswerColorList] = useState<string[]>(colorList);

  useEffect(() => {
    setAnswerColorList((answerColorList) => {
      const shuffled = [...answerColorList];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  }, [colorList]);

  const onDragStart = (e: React.DragEvent<HTMLButtonElement>, id: number) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("colorIndex", String(id));
  };

  const onDragDrop = (e: React.DragEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    const sourceIndex = Number(e.dataTransfer.getData("colorIndex"));
    if (sourceIndex === id) return;

    const updatedColors = [...answerColorList];
    const [movedColor] = updatedColors.splice(sourceIndex, 1);
    updatedColors.splice(id, 0, movedColor);
    setAnswerColorList(updatedColors);
  };

  const onDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <PageLayout>
      순서대로 드래그해서 정렬해주세요 <br /> 드래그 한 곳으로 상자가 이동하고,
      나머지는 한 칸씩 밀립니다.
      <BackButton onClick={() => setPage(1)}>
        {"<< "}
        back
      </BackButton>
      <ColorListLayout>
        {answerColorList.map((color, index) => (
          <ColorBox
            key={index}
            color={color}
            tcolor={colorInv}
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={onDragOver}
            onDrop={(e) => onDragDrop(e, index)}
            style={{
              backgroundColor: color,
            }}>
            {index + 1}
          </ColorBox>
        ))}
      </ColorListLayout>
      <Gap />
      <Button
        onClick={() => {
          if (
            answerColorList.every((color, index) => color === colorList[index])
          ) {
          } else {
            alert("틀렸습니다.");
          }
        }}>
        제출
      </Button>
    </PageLayout>
  );
};

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
  gap: 10px;
  font-size: 1.2rem;
  position: relative;
  padding: 20px;
`;

const ColorInput = styled.input.attrs({ type: "color" })`
  width: 100px;
  height: 100px;
  border: 3px solid var(--White);
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  background-color: transparent;
  appearance: none;
  -webkit-appearance: none;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
  }

  &::-moz-color-swatch {
    border: none;
  }
`;

const ColorListLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  border: 3px solid var(--White);
  padding: 10px;
  margin-bottom: 20px;
`;

const ColorBox = styled.button<{ tcolor: string }>`
  width: 80px;
  height: 80px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => props.tcolor};
`;

const QuizBox = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: var(--White);

  border-radius: 20px;
`;

const Gap = styled.div`
  height: 30px;
`;

const BackButton = styled.button`
  color: var(--White);
  background-color: transparent;
  position: absolute;
  top: -10px;
  left: 0px;
  border: none;

  &:hover {
    color: var(--LightGreen);
  }
`;

const CountBox = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  color: var(--White);
`;

export default IQtest;
