import styled from "styled-components";
import { useLayoutEffect, useState } from "react";
import { Button, Input, ProblemEachField, Text } from "../../components";

const Sequence = () => {
	const problists = [
		["08177", "13946", "14960", "21635", "28162"],
		["01992", "05639", "11533", "23333", "30826"],
		["03381", "11018", "16239", "28247", "31546"],
		["01281", "02260", "05383", "19379", "25388"],
		["18588", "21727", "23052", "23342", "30968"],
	];
	const [idx, setIdx] = useState(0);
	const [string, setString] = useState("");
	useLayoutEffect(() => {
		// random permutation 0~4
		const perm = Array.from({ length: 5 }, (_, i) => i);
		for (let i = 0; i < 5; i++) {
			const j = Math.floor(Math.random() * 5);
			[perm[i], perm[j]] = [perm[j], perm[i]];
		}
		setString(
			problists[idx][perm[0]] +
				problists[idx][perm[1]] +
				problists[idx][perm[2]] +
				problists[idx][perm[3]] +
				problists[idx][perm[4]]
		);
	}, [idx]);
	return (
		<ProblemEachField>
			<Text>{idx + 1}/5</Text>
			<Text>아래 수를 대표하는 영어단어 하나를 입력하세요.(소문자)</Text>
			<Text>{string}</Text>
			<Input type="text" maxLength={80} />
			<Button onClick={() => setIdx((idx + 1) % 5)}>Submit</Button>
		</ProblemEachField>
	);
};

export default Sequence;
