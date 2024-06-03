import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components";

const Error = ({ message }: { message: string }) => {
  const { code } = useParams();
  return (
    <ErrorField>
      <ErrorTitle>{code}</ErrorTitle>
      <ErrorText>{message}</ErrorText>
      <Link to="/">
        <Button>Go to Home</Button>
      </Link>
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
  height: 100vh;
`;

const ErrorTitle = styled.h1``;

const ErrorText = styled.p`
  font-size: 1.5rem;
`;

export default Error;
