import styled from "styled-components";
import { Button, Title, Text, ProblemEachField } from "../../components";
import { useState } from "react";

const Hidden = () => {
	const [isFound, setIsFound] = useState(false);
	return (
		<ProblemEachField>
			<Title>{isFound ? "Hidden" : "404"}</Title>
			<Text>
				{isFound ? "Login 문제에서 정답의 좌표는?(ex> A1)" : "Page not found"}
			</Text>
			<HiddenInput
				isFound={isFound}
				type="text"
				maxLength={2}
				tabIndex={-1}
				onFocus={() => setIsFound(true)}
			/>
			{isFound && <Button>Submit</Button>}
		</ProblemEachField>
	);
};

const HiddenInput = styled.input<{ isFound?: boolean }>`
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	border: ${(props) => (props.isFound ? "1px solid black" : "0")};
	outline: ${(props) => (props.isFound ? "1px solid black" : "0")};
	background-color: inherit;
	color: transparent;
	font-size: 1rem;
	cursor: default;
	width: 100px;
	height: 100px;
	position: absolute;
	top: 740px;
	left: 600px;
	&:focus {
		outline: ${(props) => (props.isFound ? "1px solid black" : "0")};
		border: ${(props) => (props.isFound ? "1px solid black" : "0")};
	}
`;

export default Hidden;
