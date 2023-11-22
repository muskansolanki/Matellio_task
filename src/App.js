import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import PersonalInfoForm from "./views/PersonalInfoForm";
import PersonalInfoTable from "./views/PersonalInfoTable";
import "./style/main.scss";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<PersonalInfoForm />} />
          <Route path="/personal-info-table" element={<PersonalInfoTable />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
