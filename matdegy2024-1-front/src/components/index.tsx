import styled from "styled-components";

const Button = styled.div<{
  width?: string;
  height?: string;
  fontSize?: string;
}>`
  width: ${(props) => props.width || "10rem"};
  height: ${(props) => props.height || "3rem"};
  font-size: ${(props) => props.fontSize || "1.5rem"};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: var(--MainPink);
  color: var(--White);
  border: 5px dashed white;
  border-radius: 20px;
  padding: 10px 20px;

  font-size: 2rem;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.45);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--LightGreen);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.45);
  }

  &:active {
    background-color: var(--LightGreen);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transform: translateY(4px);
  }
`;

const Input = styled.input<{
  width?: string;
  height?: string;
  fontSize?: string;
}>`
  width: ${(props) => props.width || "10rem"};
  height: ${(props) => props.height || "3rem"};

  font-size: ${(props) => props.fontSize || "1.5rem"};
  font-family: "KaTeX_Main";

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  background-color: var(--White);
  color: var(--Black);
  border-radius: 0.5rem;
  user-select: none;
  margin: 0.5rem;
`;

const Title = styled.h1``;

const Text = styled.p<{ fontSize?: string }>`
  font-size: ${(props) => props.fontSize || "1.5rem"};
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
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

export { Button, Input, Title, Text, ProblemEachField, MathText };
