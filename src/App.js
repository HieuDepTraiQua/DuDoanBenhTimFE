import "./App.scss";
import {
  Route,
  Routes,
} from "react-router-dom";
import { PUBLIC_ROUTES } from "./router";
import { Suspense } from "react"

function App() {
  return (
    <div className="app-content">
      <Suspense>
        <Routes>
          {PUBLIC_ROUTES.map((route, index) =>
            route.component ? (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={<route.component />}
              />
            ) : null
          )}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
