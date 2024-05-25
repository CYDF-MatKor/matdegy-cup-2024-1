import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { styled } from "styled-components";

import { Home, Error, Problems } from "./pages";

import { DataLoading } from "./utils/DataLoading";
import "./App.css";

const Pages = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	max-width: 1600px;
	height: 100%;
`;

function App() {
	const [count, setCount] = useState(0);
	const [nickname, setNickname] = useState("");

	useEffect(() => {
		setNickname(sessionStorage.getItem("nickname") || "nope");
	}, []);

	return (
		<>
			<Pages>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/problem/:problemcode" element={<Problems />} />
					<Route
						path="*"
						element={<Error code={404} message="Page not found" />}
					/>
				</Routes>
			</Pages>
			{/* <div>
				<DataLoading size={100} />
			</div>
			<h1>MatKor</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
			<input type="date" /> */}
		</>
	);
}

export default App;

