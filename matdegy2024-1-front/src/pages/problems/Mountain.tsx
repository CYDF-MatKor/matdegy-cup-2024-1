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
import { mountains } from "../../components/mountains.json";
const key =
  "lzZoScsp%2F26uoTLdMUnG67HV3ZQ8ZNTyGhVWVeZr5q%2BXuCMn3b%2FXFULf8zjpJVUO%2BfrRxCmLa9Nsfg1eYvqjxA%3D%3D";
const Mountain = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<Array<string>>(["", "", "", "", ""]);
  const [isCorrect, setIsCorrect] = useState<boolean | null | undefined>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertComponent, setAlertComponent] = useState<JSX.Element>(
    <DataLoading />
  );
  const [msg, setMsg] = useState<string>("");

  const [answer, setAnswer] = useState<Array<string>>([
    "468200101",
    "468200101",
    "468200101",
    "468200101",
    "468200101",
  ]);
  const mnt_len = mountains.length;
  const [idxs, setIdxs] = useState<Array<number>>([
    Math.floor(Math.random() * mnt_len),
    Math.floor(Math.random() * mnt_len),
    Math.floor(Math.random() * mnt_len),
    Math.floor(Math.random() * mnt_len),
    Math.floor(Math.random() * mnt_len),
  ]);

  const callMountain = async ({ no }: { no: string }) => {
    // set Header "Accept", "*/*;q=0.9" to avoid CORS error
    const res = await axios.get(
      "http://apis.data.go.kr/1400000/service/cultureInfoService2/mntInfoImgOpenAPI2?mntiListNo=" +
        no +
        "&ServiceKey=" +
        key,
      {
        headers: {
          Accept: "*/*;q=0.9",
        },
      }
    );
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(res.data, "text/xml");
    // console.log(xmlDoc);
    if (xmlDoc.getElementsByTagName("OpenAPI_ServiceResponse").length > 0) {
      return null;
    } else if (
      xmlDoc.getElementsByTagName("totalCount")[0].childNodes[0].nodeValue ===
      "0"
    ) {
      return null;
    } else {
      const imgs = xmlDoc.getElementsByTagName("items");
      const img =
        "https://www.forest.go.kr/images/data/down/mountain/" +
        imgs[Math.floor(Math.random() * imgs.length)].getElementsByTagName(
          "imgfilename"
        )[0].childNodes[0].nodeValue;
      return img;
    }
  };

  const getImage = async () => {
    for (let i = 0; i < 5; i++) {
      let res = null;
      while (res === null) {
        idxs[i] = Math.floor(Math.random() * mnt_len);
        res = await callMountain({ no: mountains[idxs[i]].mntilistno });
      }
      setImage((prev) => {
        const temp = [...prev];
        temp[i] = res;
        return temp;
      });
      console.log(i + 1, `${idxs[i] + 1}.${mountains[idxs[i]].mntiname}`);
    }
  };

  useEffect(() => {
    getImage();
  }, [idxs]);

  const checkAnswer = async () => {
    setIsCorrect(null);
    setShowAlert(true);
    for (let i = 0; i < 5; i++) {
      if (answer[i] !== mountains[idxs[i]].mntilistno) {
        setIsCorrect(false);
        return;
      }
    }
    setIsCorrect(true);
    axios
      .get("/api/submit/mountain?answer=m0untain_picture")
      .then((res) => {
        setMsg(res.data.message);
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
      <Text>아까 문제를 풀고 산에 익숙해졌다고 믿는다</Text>
      <MountainRow>
        {image.map((img, i) =>
          img ? <MountainImage key={`mnt${i}`} src={img} /> : <DataLoading />
        )}
      </MountainRow>
      <Text>위의 산들은 각각 어떤 산의 이미지일까?</Text>
      <MountainRow>
        {image.map((img, i) => (
          <MountainSelect
            key={`mntsel${i}`}
            onChange={(e) => {
              const temp = [...answer];
              temp[i] = e.target.value;
              setAnswer(temp);
            }}>
            {mountains.map((mnt, j) => (
              <MountainOption key={`${i}aa${j}`} value={mnt.mntilistno}>
                {j + 1}. {mnt.mntiname}
              </MountainOption>
            ))}
          </MountainSelect>
        ))}
      </MountainRow>
      <Button onClick={checkAnswer}>Submit</Button>
      <Alert id="alert" show={showAlert} children={alertComponent} />
    </ProblemEachField>
  );
};

const MountainRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const MountainImage = styled.img`
  width: 15%;
`;

const MountainSelect = styled.select`
  width: 15%;
  height: 50px;
  font-size: 1.5rem;
  font-family: "SingleDay-Regular";
  color: var(--Black);
  background-color: var(--White);
  border: 2px solid var(--Black);
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const MountainOption = styled.option`
  font-size: 1.5rem;
  font-family: "SingleDay-Regular";
  color: var(--Black);
  background-color: var(--White);
  border: 2px solid var(--Black);
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

export default Mountain;
