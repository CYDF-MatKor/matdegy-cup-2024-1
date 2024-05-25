import { default as ProblemLogin } from "./Login";
import { default as ProblemHidden } from "./Hidden";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Navigate } from "react-router-dom";

const ProblemCodeToTitle: { [key: string]: string } = {
	"1": "Login",
};
const ProblemList = ["1", "2"];

const Problems = () => {
	const { problemcode } = useParams();
	if (!problemcode) return <Navigate to="/error/404" replace={true} />;
	if (!ProblemList.includes(problemcode))
		return <Navigate to="/error/404" replace={true} />;
	return (
		<ProblemField>
			{problemcode in ProblemCodeToTitle && (
				<ProblemTitle>{ProblemCodeToTitle[problemcode]}</ProblemTitle>
			)}
			{problemcode == "1" && <ProblemLogin />}{" "}
			{problemcode == "2" && <ProblemHidden />}{" "}
		</ProblemField>
	);
};

const ProblemTitle = styled.h1``;

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
