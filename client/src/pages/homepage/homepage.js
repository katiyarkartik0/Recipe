import Button from "components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { destroyAccessToken } from "api/accessToken";

import UnauthorizedPage from "pages/unauthorizedPage/UnauthorizedPage";

import { getAccessToken, getUserData } from "helpers/selector";

import "./homepage.css";
import Search from "components/Serach/Seacrh";
import { useEffect, useState } from "react";
import { getSavedRecipes } from "api/recipe";
import { setToast } from "store/slices/toast";

const HomePage = () => {
  const navigate = useNavigate();
  const userData = useSelector(getUserData);
  const accessToken = useSelector(getAccessToken);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await destroyAccessToken({ accessToken });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    navigate("/");
  };

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        await getSavedRecipes({ accessToken }).then(async (res) => {
          const response = await res.json();
          setSavedRecipes(response);
        });
      } catch (error) {
        dispatch(
          setToast({ status: "failure", displayMessage: JSON.stringify(error) })
        );
      }
    };
    fetchSavedRecipes();
  }, []);

  console.log(savedRecipes)
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
        <div>
          <Search />
        </div>
        <br></br>
      </div>
    );
  } else {
    return <UnauthorizedPage />;
  }
};

export default HomePage;
