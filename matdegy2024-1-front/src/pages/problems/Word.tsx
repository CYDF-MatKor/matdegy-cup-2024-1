import styled from "styled-components";
import { useLayoutEffect, useState } from "react";
import { Button, Input, ProblemEachField, Text } from "../../components";

const Word = () => {
	const problists = [
		"☀️⚾🦀",
		"🖐️🪨",
		"🥚F🚗",
		"⚾💦🪨",
		"🖱️🖱️🖱️🖱️",
		"'⇐⇐⇐'⇐",
		"👁️💡🚉",
		"🌕🖐️",
		"👄🔊∈💧",
		"🧻🟥P🦷🜠",
	];
	const [idx, setIdx] = useState(0);
	const [string, setString] = useState("");
	useLayoutEffect(() => {
		setString(problists[idx]);
	}, [idx]);
	return (
		<ProblemEachField>
			<Text>{idx + 1}/10</Text>
			<Text>아래를 해석하시오.</Text>
			<Text>말이 되는 답이 여러개일 수 있으나 모범 답안만 인정한다</Text>
			<Text>답은 한글로만 이루어져있다(띄어쓰기 X)</Text>
			<Text
				style={{
					fontSize: "2rem",
				}}>
				{string}
			</Text>
			<Input type="text" maxLength={2} />
			<Button onClick={() => setIdx((idx + 1) % 10)}>Submit</Button>
		</ProblemEachField>
	);
};

export default Word;
