import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { getCurrentUser } from "./services/api/commonApi";
import { ACCESS_TOKEN } from "./constants/constants";
import { Layout, notification } from "antd";
import "./App.css";
import Main from "./pages/Main";
import WebtoonHome from "./pages/WebtoonHome";
import Viewer from "./pages/Viewer";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import Profile from "./components/user/Profile";
import AppHeader from "./components/common/AppHeader";
import NotFound from "./components/common/NotFound";
import LoadingIndicator from "./components/common/LoadingIndicator";
import AdminMenu from "./components/admin/AdminMenu";
import PrivateRoute from "./components/common/PrivateRoute";
import NewAdd from "./components/admin/NewAdd";
import NewEpi from "./components/admin/NewEpi";
import EditToonList from "./components/admin/EditToonList";
import EditEpiList from "./components/admin/EditEpiList";
import EditToon from "./components/admin/EditToon";
import EditEpi from "./components/admin/EditEpi";

const { Content } = Layout;

const App = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        loadCurrentUser();
    }, []);

    const loadCurrentUser = () => {
        setIsLoading(true);
        getCurrentUser()
            .then((response) => {
                setRole(response.authorities[0].authority);
                setCurrentUser(response);
                setIsAuthenticated(true);
                setIsLoading(false);
                setUsername(response.username);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    };

    const handleLogout = (
        redirectTo = "/",
        notificationType = "success",
        description = "로그아웃 되었습니다."
    ) => {
        localStorage.removeItem(ACCESS_TOKEN);

        setCurrentUser(null);
        setIsAuthenticated(false);
        setRole(null);
        setUsername(null);

        navigate(redirectTo);

        notification[notificationType]({
            message: "Webtoon",
            description: description,
        });
    };

    const handleLogin = () => {
        notification.success({
            message: "Webtoon",
            description: "로그인 되었습니다.",
        });
        loadCurrentUser();
        navigate("/");
    };

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <BrowserRouter>
            <Layout className="app-container">
                <AppHeader
                    isAuthenticated={isAuthenticated}
                    currentUser={currentUser}
                    onLogout={handleLogout}
                    role={role}
                />

                <Content className="app-content">
                    <div className="container">
                        <Routes>
                            <Route exact path="/" component={Main} />
                            <Route
                                path="/webtoon/:webtoonId"
                                render={(props) => (
                                    <WebtoonHome
                                        username={username}
                                        {...props}
                                    />
                                )}
                            ></Route>
                            <Route
                                path="/viewer/:episodeId"
                                render={(props) => (
                                    <Viewer username={username} {...props} />
                                )}
                            ></Route>
                            <Route
                                path="/login"
                                render={(props) => (
                                    <Login onLogin={handleLogin} {...props} />
                                )}
                            ></Route>
                            <Route path="/signup" component={Signup}></Route>
                            <Route
                                path="/users/:username"
                                render={(props) => (
                                    <Profile
                                        isAuthenticated={isAuthenticated}
                                        currentUser={currentUser}
                                        {...props}
                                    />
                                )}
                            ></Route>
                            <PrivateRoute
                                authenticated={isAuthenticated}
                                path="/newAdd"
                                component={NewAdd}
                                handleLogout={handleLogout}
                            ></PrivateRoute>
                            <PrivateRoute
                                authenticated={isAuthenticated}
                                path="/newEpi"
                                component={NewEpi}
                                handleLogout={handleLogout}
                            ></PrivateRoute>
                            <PrivateRoute
                                authenticated={isAuthenticated}
                                path="/adminmenu"
                                component={AdminMenu}
                                handleLogout={handleLogout}
                            ></PrivateRoute>
                            <PrivateRoute
                                authenticated={isAuthenticated}
                                path="/editList"
                                component={EditToonList}
                                handleLogout={handleLogout}
                            ></PrivateRoute>
                            <PrivateRoute
                                authenticated={isAuthenticated}
                                path="/editToon/:id"
                                component={EditToon}
                                handleLogout={handleLogout}
                            ></PrivateRoute>
                            <PrivateRoute
                                authenticated={isAuthenticated}
                                path="/editEpiList/:id"
                                component={EditEpiList}
                                handleLogout={handleLogout}
                            ></PrivateRoute>
                            <PrivateRoute
                                authenticated={isAuthenticated}
                                path="/editEpi/:id"
                                component={EditEpi}
                                handleLogout={handleLogout}
                            ></PrivateRoute>
                            <Route component={NotFound}></Route>
                        </Routes>
                    </div>
                </Content>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
