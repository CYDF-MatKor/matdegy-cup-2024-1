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

const MathText = styled.span`
	font-family: "KaTeX_Math";
`;

const AlertBackground = styled.div<{ show: boolean }>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: ${(props) => (props.show ? "100" : "-1")};
`;

const AlertField = styled.div<{ show: boolean }>`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	width: 50%;
	height: 50%;
	max-width: 800px;
	min-width: 400px;
	background-color: var(--White);
	border-radius: 1rem;
	z-index: ${(props) => (props.show ? "101" : "-1")};
`;

const AlertTitle = styled.h1`
	font-family: "SingleDay-Regular";
`;

const AlertText = styled.p`
	font-family: "SingleDay-Regular";
	color: var(--Black);
	font-size: 1.5rem;
`;

const Alert = ({
	show,
	id,
	children,
}: {
	show: boolean;
	id: string;
	children: JSX.Element;
}) => {
	return (
		<AlertBackground id={id} show={show}>
			<AlertField show={show}>{children}</AlertField>
		</AlertBackground>
	);
};

export {
	Button,
	Input,
	Title,
	Text,
	ProblemEachField,
	MathText,
	Alert,
	AlertTitle,
	AlertText,
};
