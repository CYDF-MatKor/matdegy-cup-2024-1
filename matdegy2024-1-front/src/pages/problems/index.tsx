import { default as ProblemLogin } from "./Login";
import { default as ProblemHidden } from "./Hidden";
import { default as ProblemSymbol } from "./Symbol";
import { default as ProblemHeights } from "./Heights";
import { default as ProblemSequence } from "./Sequence";
import { default as ProblemWord } from "./Word";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { Title } from "../../components";

const ProblemCodeToTitle: { [key: string]: string } = {
	"1": "Login",
	"3": "Symbol",
	"4": "Heights",
	"5": "Sequence",
	"6": "Word",
};
const ProblemList = ["1", "2", "3", "4", "5", "6"];

const Problems = () => {
	const { problemcode } = useParams();
	if (!problemcode) return <Navigate to="/error/404" replace={true} />;
	if (!ProblemList.includes(problemcode))
		return <Navigate to="/error/404" replace={true} />;
	return (
		<ProblemField>
			{problemcode in ProblemCodeToTitle && (
				<Title>{ProblemCodeToTitle[problemcode]}</Title>
			)}
			{problemcode == "1" && <ProblemLogin />}
			{problemcode == "2" && <ProblemHidden />}
			{problemcode == "3" && <ProblemSymbol />}
			{problemcode == "4" && <ProblemHeights />}
			{problemcode == "5" && <ProblemSequence />}
			{problemcode == "6" && <ProblemWord />}
		</ProblemField>
	);
};

const ProblemField = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-width: 100%;
	min-height: 100%;
`;

export default Problems;
