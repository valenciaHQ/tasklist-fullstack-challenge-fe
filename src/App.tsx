import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./views/home/Home";
import NoMatch from "./views/NoMatch";
import ReadMe from "./views/ReadMe";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="readMe" element={<ReadMe />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
