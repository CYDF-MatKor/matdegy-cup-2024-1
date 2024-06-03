import { useState, useEffect, useLayoutEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { styled } from "styled-components";

import { Home, Map, Error, Problems, Rank } from "./pages";

import { DataLoading } from "./utils/DataLoading";
import "./App.css";
import axios from "axios";
import { Button } from "./components";

const Pages = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 1600px;
  min-height: 100vh;
  width: max-content;
  height: max-content;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState<Boolean | null>(null);
  const location = useLocation();

  const checkLogin = async () => {
    axios
      .get("/api/users/solve")
      .then((res) => {
        setIsLoading(false);
        setIsLogin(true);
      })
      .catch((res) => {
        setIsLoading(false);
        setIsLogin(false);
      });
  };

  useLayoutEffect(() => {
    checkLogin();
  }, [location, location.pathname]);

  const logout = async () => {
    axios
      .get("/api/users/logout")
      .then((res) => {
        window.location.href = "/";
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <Pages>
        {isLogin === null ? (
          <DataLoading size={300} />
        ) : (
          <>
            {isLogin && (
              <Button
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "100px",
                  zIndex: 1000,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                height="2rem"
                onClick={logout}>
                Logout
              </Button>
            )}
            <Routes>
              <Route
                path="/"
                element={
                  <Navigate to={isLogin ? "/map" : "/home"} replace={true} />
                }
              />
              {!isLogin && <Route path="/home" element={<Home />} />}
              {isLogin && (
                <>
                  <Route path="/map" element={<Map />} />
                  <Route path="/problem/:problemurl" element={<Problems />} />
                </>
              )}
              <Route path="/rank" element={<Rank />} />
              <Route
                path="/error/:code"
                element={<Error message="Page not found" />}
              />
              <Route
                path="*"
                element={<Navigate to="/error/404" replace={true} />}
              />
            </Routes>
          </>
        )}
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
