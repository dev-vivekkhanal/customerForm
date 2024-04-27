import Version3 from "./components/Version3";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Version3 />} />
    </Routes>
  );
}

export default App;
