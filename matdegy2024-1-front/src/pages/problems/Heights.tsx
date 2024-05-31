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

const Heights = () => {
	const [firstImage, setFirstImage] = useState<string>("");
	const [secondImage, setSecondImage] = useState<string>("");
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
			.get("/api/submit/heights?answer=" + answer)
			.then((res) => {
				if (res.data.lcm_correct) {
					setIsCorrect(true);
					setMsg(res.data.message);
				} else {
					setIsCorrect(false);
				}
			})
			.catch((res) => {
				setIsCorrect(undefined);
			});
	};

	useEffect(() => {
		console.log(isCorrect);
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
					<Button onClick={() => setShowAlert(false)}>Next</Button>
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
	}, [isCorrect]);

	useEffect(() => {
		axios
			.get("/api/images/heights1.png", { responseType: "blob" })
			.then((response) => {
				const reader = new FileReader();
				reader.readAsDataURL(response.data);
				reader.onload = () => {
					setFirstImage(reader.result as string);
				};
			});
		axios
			.get("/api/images/heights2.png", { responseType: "blob" })
			.then((response) => {
				const reader = new FileReader();
				reader.readAsDataURL(response.data);
				reader.onload = () => {
					setSecondImage(reader.result as string);
				};
			});
	}, []);

	return (
		<ProblemEachField>
			<Text>이번 제2회 맷데기컵 출제자 두 명은 요즘 등산을 다닌다.</Text>
			<HeightsRow>
				{firstImage ? <HeightsImage src={firstImage} /> : <DataLoading />}
				{secondImage ? <HeightsImage src={secondImage} /> : <DataLoading />}
			</HeightsRow>
			<Text>
				<MathText>x</MathText>와 <MathText>y</MathText>의 최소 공배수는?(힌트:
				답은 팰린드롬임)
			</Text>

			<Input
				type="text"
				maxLength={10}
				onInput={(e) => setAnswer(e.currentTarget.value)}
			/>
			<Button onClick={checkAnswer}>Submit</Button>
			<Alert id="alert" show={showAlert} children={alertComponent} />
		</ProblemEachField>
	);
};

const HeightsRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 65%;
`;

const HeightsImage = styled.img`
	width: 45%;
`;

export default Heights;
