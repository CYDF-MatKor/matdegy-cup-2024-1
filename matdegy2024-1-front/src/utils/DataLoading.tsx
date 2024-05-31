import styled from "styled-components";

const LoadingField = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingCircle = styled.div<{ size?: number; count?: number }>`
  width: ${(props) => (props.size ? `${props.size}px` : "50px")};
  height: ${(props) => (props.size ? `${props.size}px` : "50px")};
  border-radius: 50%;
  border: 10px solid var(--White);
  border-top: 10px solid var(--LightGreen);
  animation: spin 1s ease-in-out;
  animation-iteration-count: ${(props) =>
    props.count ? props.count : "infinite"};
  transform: rotate(45deg);

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);

  @keyframes spin {
    0% {
      transform: rotate(45deg);
    }
    100% {
      transform: rotate(405deg);
    }
  }
`;

export const DataLoading = ({
  size,
  count,
}: { size?: number; count?: number } = {}) => {
  return (
    <LoadingField>
      <LoadingCircle size={size || 100} count={count} />
    </LoadingField>
  );
};
