import { default as ProblemLogin } from "./Login";
import { default as ProblemHidden } from "./Hidden";
import { default as ProblemSymbol } from "./Symbol";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { Title } from "../../components";

const ProblemCodeToTitle: { [key: string]: string } = {
	"1": "Login",
	"3": "Symbol",
	"4": "Heights",
};
const ProblemList = ["1", "2", "3", "4"];

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
			{problemcode == "1" && <ProblemLogin />}{" "}
			{problemcode == "2" && <ProblemHidden />}{" "}
			{problemcode == "3" && <ProblemSymbol />}{" "}
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
	height: 100vh;
`;

export default Problems;
