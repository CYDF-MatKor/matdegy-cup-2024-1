import styled from "styled-components";
import { Button, Input, ProblemEachField, Text } from "../../components";
import { useEffect } from "react";
import axios from "axios";

const Probability = () => {
	useEffect(() => {
		axios
			.get("https://codeforces.com/gym/526848/submission/263012008", {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res);
			});
	}, []);
	return (
		<ProblemEachField>
			<Text>
				하하 Login 문제는 이제 진짜 끝난줄 알았지? Login 문제를 맞출 확률을
				구해보자.
			</Text>
			<Text>이 문제는 Codeforces</Text>
			<Input fontSize="1rem" width="15rem" type="datetime-local" />
			<Button>Submit</Button>
		</ProblemEachField>
	);
};

export default Probability;
