import styled from "styled-components";
import { useState } from "react";

const Login = () => {
	const [coordinate, setCoordinate] = useState({
		x: Math.floor(Math.random() * 8) + 1,
		y: Math.floor(Math.random() * 8) + 1,
	});
	const [count, setCount] = useState(0);
	const [picked] = useState(new Set<number>());
	const correct = () => {
		alert("correct");
	};
	const incorrect = (i: number, j: number) => {
		if (picked.has(i * 8 + j)) return;
		else {
			if (count === 4) {
				alert("Reset");
				setCoordinate({
					x: Math.floor(Math.random() * 8) + 1,
					y: Math.floor(Math.random() * 8) + 1,
				});
				setCount(0);
				document.querySelectorAll(".login-button").forEach((e: any) => {
					e.style.backgroundColor = "transparent";
				});
				picked.clear();
			} else {
				picked.add(i * 8 + j);
				setCount(count + 1);
			}
		}
	};

	return (
		<LoginField>
			<LoginText>{count}/5</LoginText>
			<LoginTable>
				{[...Array(9)].map((_, i) => (
					<LoginTableRow key={"row" + i}>
						{[...Array(9)].map((_, j) => (
							<LoginTableColumn key={"column" + j}>
								{i === 0 && j === 0 ? (
									<></>
								) : i === 0 ? (
									<h2>{j}</h2>
								) : j === 0 ? (
									<h2>{String.fromCharCode(65 + i - 1)}</h2>
								) : (
									<LoginButton
										className="login-button"
										onClick={(e: any) =>
											i === coordinate.y && j === coordinate.x
												? correct()
												: (() => {
														e.target.style.backgroundColor = "red";
														incorrect(i, j);
												  })()
										}>
										Login
										{/* {String.fromCharCode(65 + i - 1) + j} */}
									</LoginButton>
								)}
							</LoginTableColumn>
						))}
					</LoginTableRow>
				))}
			</LoginTable>
		</LoginField>
	);
};

const LoginField = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

const LoginText = styled.p`
	font-size: 1.5rem;
`;

const LoginTable = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 540px;
	height: 540px;
`;

const LoginTableRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: calc(100% / 9);
`;

const LoginTableColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: calc(100% / 9);
	height: 100%;
`;

const LoginButton = styled.div`
	width: 90%;
	height: 90%;
	outline: 2px solid var(--Gray);
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	background-color: transparent;
	border-radius: 10px;
`;

export default Login;
