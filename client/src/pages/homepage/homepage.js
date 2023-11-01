import Button from "components/Button/Button";
import { useSelector } from "react-redux";
import { getAccessToken, getUserData } from "helpers/selector";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import UnauthorizedPage from "pages/unauthorizedPage/UnauthorizedPage";
import { destroyAccessToken } from "api/accessToken";

const HomePage = () => {
  const navigate = useNavigate();
  const userData = useSelector(getUserData);
  const accessToken = useSelector(getAccessToken);
  const handleLogout = async() => {
    await destroyAccessToken({accessToken})
    navigate("/");
  };
  if (accessToken) {
    return (
      <div className="App">
        <div className="nav">
          <h1>Todo App Dashboard</h1>
          <Button
            text={"Logout " + userData.name}
            onClickEvent={handleLogout}
          />
        </div>
        <br></br>
      </div>
    );
  } else {
    return <UnauthorizedPage />;
  }
};

export default HomePage;
