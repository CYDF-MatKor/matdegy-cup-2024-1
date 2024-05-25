import styled from "styled-components";

const Error = ({ code, message }: { code: number; message: string }) => {
	return (
		<ErrorField>
			<ErrorTitle>{code}</ErrorTitle>
			<ErrorText>{message}</ErrorText>
		</ErrorField>
	);
};

const ErrorField = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`;

const ErrorTitle = styled.h1``;

const ErrorText = styled.p`
	font-size: 1.5rem;
`;

export default Error;
