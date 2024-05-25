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

export { Button };
