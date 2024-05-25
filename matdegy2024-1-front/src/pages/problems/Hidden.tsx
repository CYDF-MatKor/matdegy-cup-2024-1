import styled from "styled-components";
import { Button } from "../../components";
import { useState } from "react";

const Hidden = () => {
	const [isFound, setIsFound] = useState(false);
	return (
		<HiddenField>
			<HiddenTitle>{isFound ? "Hidden" : "404"}</HiddenTitle>
			<HiddenText>
				{isFound ? "Login 문제에서 정답의 좌표는?(ex> A1)" : "Page not found"}
			</HiddenText>
			<HiddenInput type="text" maxLength={2} onFocus={() => setIsFound(true)} />
			{isFound && <Button>Submit</Button>}
		</HiddenField>
	);
};

const HiddenField = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`;

const HiddenTitle = styled.h1``;

const HiddenText = styled.p`
	font-size: 1.5rem;
`;

const HiddenInput = styled.input`
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	border: 0;
	outline: 0;
	background-color: inherit;
	color: transparent;
	font-size: 1rem;
	cursor: default;
	width: 200px;
	height: 20px;
	position: absolute;
	top: 740px;
	left: 600px;
	&:focus {
		outline: 0;
		border: 0;
	}
`;

export default Hidden;
