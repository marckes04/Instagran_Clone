import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Authpage from "./pages/Authpage/Authpage";
import PageLayout from "./Layout/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path='/' element ={<Homepage/>}/>
        <Route path='/auth' element ={<Authpage/>}/>
        <Route path='/:username' element ={<ProfilePage/>}/>
      </Routes>
    </PageLayout>
  );
}

export default App;
