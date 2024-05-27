import styled from "styled-components";

const Button = styled.div<{
	width?: string;
	height?: string;
	fontSize?: string;
}>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: ${(props) => props.width || "10rem"};
	height: ${(props) => props.height || "3rem"};
	background-color: var(--LightBlue);
	color: var(--Black);
	font-size: ${(props) => props.fontSize || "1.5rem"};
	border-radius: 0.5rem;
	cursor: pointer;
	user-select: none;
`;

const Input = styled.input<{
	width?: string;
	height?: string;
	fontSize?: string;
}>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: ${(props) => props.width || "10rem"};
	height: ${(props) => props.height || "3rem"};
	background-color: var(--White);
	color: var(--Black);
	font-size: ${(props) => props.fontSize || "1.5rem"};
	border-radius: 0.5rem;
	user-select: none;
	margin: 0.5rem;
`;

const Title = styled.h1``;

const Text = styled.p<{ fontSize?: string }>`
	font-size: ${(props) => props.fontSize || "1.5rem"};
`;

const ProblemEachField = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

export { Button, Input, Title, Text, ProblemEachField };
