import { default as ProblemLogin } from "./Login";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Navigate } from "react-router-dom";

const ProblemCodeToTitle: { [key: string]: string } = {
	"1": "Login",
};

const Problems = () => {
	const { problemcode } = useParams();
	if (!problemcode) return <Navigate to="/error/404" replace={true} />;
	if (!(problemcode in ProblemCodeToTitle))
		return <Navigate to="/error/404" replace={true} />;
	return (
		<ProblemField>
			<ProblemTitle>{ProblemCodeToTitle[problemcode]}</ProblemTitle>
			{problemcode == "1" && <ProblemLogin />}{" "}
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
	height: fit-content;
	margin: 50px;
`;

export default Problems;
