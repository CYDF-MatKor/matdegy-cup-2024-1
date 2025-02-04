import styled, { css, keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useLayoutEffect, useEffect } from "react";
import {
  SubButton,
  Text,
  Alert,
  AlertText,
  AlertTitle,
  Button,
} from "../components";
import { problem, ProblemCodeToTitle, ProblemList } from "../components/data";
import { IconList, connectList } from "../components/location";
import { FlyLetter } from "../components/letter";
import MapBackground from "../images/map-background.png";
import Check from "../images/check.png";
import { DataLoading } from "../utils/DataLoading";
import axios from "axios";

const Map = () => {
  const navigate = useNavigate();
  const [solvedNumber, setSolvedNumber] = useState<Array<number>>([-1]);
  const [activeNumber, setActiveNumber] = useState<Array<number>>([]);

  useLayoutEffect(() => {
    const tmp = [];
    for (let i = 0; i < connectList.length; i++) {
      if (connectList[i].every((v) => solvedNumber.includes(v))) {
        tmp.push(i + 1);
      }
    }
    setActiveNumber(tmp);
  }, [solvedNumber]);

  const msgs = [
    "",
    "Made by 똥우, 유림",
    "Made by 유림, 똥우",
    "Made by 똥우, 유림",
    "Made by 유림, 똥우",
    "Made by 똥우, 유림",
    "Made by 유림, 똥우",
    "Made by 똥우, 유림",
    "Made by 유림, 똥우",
    "Made by 똥우, 유림",
    "Made by 유림, 똥우",
    "이걸 10번이나 열어본 당신! 히든 문제를 푸셨어요!",
  ];
  const [isrotating, setIsrotating] = useState(false);
  const [showNumber, setShowNumber] = useState(false);

  const [isLetter, setIsLetter] = useState(true);
  const [isAlert, setIsAlert] = useState(false);
  const [hiddenalert, setHiddenalert] = useState(false);

  const [msg, setMsg] = useState(msgs[0]);
  const [idxmsg, setIdxmsg] = useState(0);
  const [topRange, setTopRange] = useState([20, window.innerHeight - 20]);
  const [leftRange, setLeftRange] = useState([30, window.innerWidth - 30]);
  const [isCorrect, setIsCorrect] = useState<boolean | null | undefined>(null);
  const [alertComponent, setAlertComponent] = useState<JSX.Element>(
    <DataLoading />
  );
  const [rmsg, setRmsg] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

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
          <AlertText>{rmsg}</AlertText>
          <Button
            onClick={() => {
              window.location.href = "/map";
              setShow(false);
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
            Wrong!
          </AlertTitle>
          <Button onClick={() => setShow(false)}>Close</Button>
        </>
      );
    } else {
      setAlertComponent(
        <>
          <AlertTitle
            style={{
              color: "var(--Red)",
            }}>
            Wrong!
          </AlertTitle>
          <Button onClick={() => setShow(false)}>Close</Button>
        </>
      );
    }
  }, [isCorrect, rmsg]);

  useEffect(() => {
    const handleResize = () => {
      setTopRange([20, window.innerHeight - 20]);
      setLeftRange([30, window.innerWidth - 400]);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [top, setTop] = useState(
    Math.floor(Math.random() * (topRange[1] - topRange[0] + 1)) + topRange[0]
  );
  const [left, setLeft] = useState(
    Math.floor(Math.random() * (leftRange[1] - leftRange[0] + 1)) + leftRange[0]
  );

  useLayoutEffect(() => {
    setTimeout(() => {
      setTop(
        Math.floor(Math.random() * (topRange[1] - topRange[0] + 1)) +
          topRange[0]
      );
      setLeft(
        Math.floor(Math.random() * (leftRange[1] - leftRange[0] + 1)) +
          leftRange[0]
      );
    }, 2000);
  }, [top]);

  useLayoutEffect(() => {
    if (isAlert) setIdxmsg(idxmsg + 1);
  }, [isAlert]);

  useLayoutEffect(() => {
    if (idxmsg < msgs.length) {
      setMsg(msgs[idxmsg] + ` - ${idxmsg}`);
    }
    if (idxmsg === msgs.length - 1) {
      setIsLetter(false);
      setIsCorrect(null);
      setShow(true);
      axios
        .get("/api/submit/guess?answer=밥솥")
        .then((res) => {
          if (res.data.correct) {
            setIsCorrect(true);
            setRmsg(res.data.message);
            setIdxmsg(idxmsg + 1);
          } else {
            setIsCorrect(false);
          }
        })
        .catch((err) => {
          setIsCorrect(undefined);
        });
    }
  }, [idxmsg]);

  const handleDoubleClick = () => {
    setIsrotating(!isrotating);
  };
  useLayoutEffect(() => {
    axios
      .get("/api/users/solve")
      .then((res) => {
        const tmp = [];
        for (let i = 0; i < res.data.length; i++) {
          tmp.push(res.data[i].pid);
        }
        setSolvedNumber(tmp);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  useLayoutEffect(() => {
    if (solvedNumber.includes(12) || !activeNumber.includes(12)) {
      setIsLetter(false);
    } else {
      setIsLetter(true);
    }
  }, [solvedNumber, activeNumber]);

  return (
    <MapContainer>
      <Alert
        show={hiddenalert}
        id="alert"
        children={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <AlertTitle>축하합니다!</AlertTitle>
            <AlertText>모든 문제를 풀었습니다!</AlertText>
            <Button
              onClick={() => {
                setHiddenalert(false);
              }}>
              확인
            </Button>
          </div>
        }
      />
      <NumberButton
        onMouseEnter={() => setShowNumber(true)}
        onMouseLeave={() => setShowNumber(false)}
        top="20px"
        left="calc(100vw - 180px)">
        번호보기
      </NumberButton>
      <SubButton to="/rank" top="20px" left="calc(100vw - 300px)">
        랭킹보기
      </SubButton>
      <ContentContainer
        isrotating={isrotating}
        onDoubleClick={handleDoubleClick}>
        <TitleText>
          "<span className="bigM">M</span>atdegy <span className="bigM">M</span>
          ap"
        </TitleText>
        {solvedNumber.includes(-1) ? (
          <DataLoading />
        ) : (
          <div
            style={{
              height: "440px",
              position: "relative",
            }}>
            {isLetter && (
              <FlyLetter
                top={top + "px"}
                left={left + "px"}
                isAlert={isAlert}
                setIsAlert={setIsAlert}
                msg={msg}
              />
            )}
            <img src={MapBackground} alt="map" height={"440px"} />
            {IconList.map(
              (icon, i) => (
                <ProblemLink
                  to={
                    activeNumber.includes(icon.idx)
                      ? "/problem/" + problem[icon.idx]
                      : "/map"
                  }
                  show={showNumber}
                  onClick={(event) =>
                    !activeNumber.includes(icon.idx) && event.preventDefault()
                  }
                  key={i}
                  top={icon.y}
                  left={icon.x}
                  status={
                    solvedNumber.includes(icon.idx)
                      ? "solved"
                      : activeNumber.includes(icon.idx)
                      ? "selectable"
                      : "locked"
                  }>
                  <img
                    alt="icon"
                    src={icon.icon}
                    width={"100%"}
                    style={{
                      filter: activeNumber.includes(icon.idx)
                        ? "none"
                        : "grayscale(100%)",
                    }}
                  />
                  <img
                    src={Check}
                    alt="check"
                    width={"120%"}
                    style={{
                      position: "absolute",
                      top: "5px",
                      left: "0",
                      display: solvedNumber.includes(icon.idx)
                        ? "block"
                        : "none",
                    }}
                  />
                  <NumberText show={showNumber}>{icon.idx}</NumberText>
                </ProblemLink>
              ),
              [isrotating]
            )}
          </div>
        )}
      </ContentContainer>
      <Alert show={show} id="alert" children={alertComponent} />
    </MapContainer>
  );
};

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-user-select: none;
  min-height: 100vh;
  min-width: 100vw;
  width: max-content;
  height: max-content;
`;

const ContentContainer = styled.div<{
  isrotating: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 30px;
  -webkit-user-select: none;

  width: 1300px;
  height: 650px;

  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 20px;

  ${({ isrotating }) =>
    isrotating &&
    css`
      animation: ${keyframes`
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(360deg);
      }
      100% {
        transform: rotate(0deg);
      }
    `} 7s linear infinite;
    `}
`;

const TitleText = styled(Text)`
  font-size: 4rem;
  color: var(--White);
  font-weight: bold;
  margin: 0;
  padding: 0;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);

  .bigM {
    font-size: 6rem;
    color: var(--MainPink);
    display: inline-block;
  }
`;

const NumberText = styled.div<{
  show: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;

  ${({ show }) =>
    show
      ? css`
          color: var(--Black);
          text-shadow: 0 0 10px var(--White);
          font-size: 3rem;
        `
      : css`
          color: inherit;
        `}
`;

const NumberButton = styled.button<{
  top?: string;
  left?: string;
}>`
  position: absolute;
  top: ${(props) => props.top || "20px"};
  left: ${(props) => props.left || "40px"};

  color: var(--White);
  text-decoration: none;
  font-size: 1.5rem;
  border: none;

  padding: 0.5rem 1rem;
  border-radius: 1rem;
  transition: background-color 0.3s;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  background-color: transparent;
  z-index: 1;

  &:hover {
    background-color: var(--MainPink);
  }

  &:focus {
    outline: none;
  }
`;

const ProblemLink = styled(Link)<{
  top: string;
  left: string;
  show: boolean;
  status: "solved" | "selectable" | "locked";
}>`
  position: absolute;
  width: 60px;
  height: 60px;
  color: transparent;
  text-decoration: none;
  font-size: 30px;
  margin: 1rem;
  padding: 0.5rem;
  border-radius: 50%;
  border: 3px solid transparent;
  transition: border 0.3s, transform 0.3s, background-color 0.3s;

  ${({ show }) =>
    show
      ? css`
          background-color: rgba(255, 255, 255, 0.3);
        `
      : css`
          color: transparent;
        `}

  &:hover {
    border: 3px solid var(--White);
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transform: scale(1.2);
    color: transparent;
  }

  ${({ top }) => css`
    top: ${top};
  `}
  ${({ left }) => css`
    left: ${left};
  `}

  ${({ status, show }) =>
    status === "solved"
      ? css``
      : status === "selectable" && !show
      ? css`
          animation: ${keyframes`
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.5);
              }
              100% {
                transform: scale(1);
              }
            `} 2s ease-in-out infinite;
        `
      : css``}
`;

export default Map;
