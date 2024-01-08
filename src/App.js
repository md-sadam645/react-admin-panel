import Navbar from "./Navbar/Navbar";
import Signup from "./Signup/Signup";
import Notfound from "./Notfound/Notfound";
import Login from "./Login/Login";
import Forgot from "./Forgot/Forgot";
import Admin from "./Admin/Admin";
import Modern from "./Admin/Dashboard/Modern/Modern";
import Calendar from "./Admin/App/Calendar/Calendar";
import Notes from "./Admin/App/Notes/Notes";
import "material-icons/iconfont/material-icons.css";
import "@fontsource/poppins/500.css";
import AuthGuard from "./Guard/AuthGuard";
import storage from "./Storage";
import { Provider } from "react-redux";
import
{
  ThemeProvider,
  createTheme
} from "@mui/material";

import
{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import
{
  deepPurple,
  deepOrange,
  teal,
  pink,
  lightBlue,
  cyan
} from '@mui/material/colors';

const App =()=>{
const Theme = createTheme({
  palette:{
    primary : deepPurple,
    secondary : teal,
    error : pink,
    warning : deepOrange,
    success : cyan,
    info : lightBlue
  },
  typography : {
    fontFamily : "Poppins"
  }
});

  const design =(
    <>
      <Provider store={storage}>
        <ThemeProvider theme={Theme}>
          <Router>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forget-password" element={<Forgot />} />
              <Route element={<AuthGuard/>}>
                <Route path="/admin" element={<Admin />} >
                  <Route path="dashboard/modern" element={<Modern />} />
                  <Route path="apps/calendar" element={<Calendar />} />
                  <Route path="apps/notes" element={<Notes />} />
                  <Route path="*" element={<Notfound />} />
                </Route>
              </Route>
              <Route path="*" element={<Notfound />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </Provider>
    </>
  );
  return design;
}
export default App;