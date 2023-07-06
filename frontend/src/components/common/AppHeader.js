import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AppHeader.css";
import { Layout, Menu, Dropdown } from "antd";
import Icon from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Sider } = Layout;

function AppHeader(props) {
    const navigate = useNavigate();

    const handleMenuClick = ({ key }) => {
        if (key === "logout") {
            props.onLogout();
        }
    };

    let menuItems;
    if (props.role === "ROLE_ADMIN") {
        menuItems = [
            <Menu.Item key="/adminmenu">
                <Link to="/adminmenu">Admin</Link>
            </Menu.Item>,
            <Menu.Item key="/profile" className="profile-menu">
                <ProfileDropdownMenu
                    currentUser={props.currentUser}
                    handleMenuClick={handleMenuClick}
                />
            </Menu.Item>,
        ];
    } else if (props.role === "ROLE_USER") {
        menuItems = [
            <Menu.Item key="/profile" className="profile-menu">
                <ProfileDropdownMenu
                    currentUser={props.currentUser}
                    handleMenuClick={handleMenuClick}
                />
            </Menu.Item>,
        ];
    } else {
        menuItems = [
            <Menu.Item key="/login">
                <Link to="/login">로그인</Link>
            </Menu.Item>,
            <Menu.Item key="/signup">
                <Link to="/signup">회원가입</Link>
            </Menu.Item>,
        ];
    }

    return (
        <Layout>
            <Header className="app-header">
                <div className="container">
                    <div className="app-title">
                        <Link to="/">웹툰</Link>
                    </div>
                    <Menu
                        className="app-menu"
                        mode="horizontal"
                        selectedKeys={[navigate.pathname]}
                        style={{ lineHeight: "64px" }}
                    >
                        {menuItems}
                    </Menu>
                </div>
            </Header>
            <Layout>
                <Sider
                    style={{
                        width: "200",
                        background: "#FFC726",
                        height: "100vh",
                        position: "fixed",
                        left: 0,
                    }}
                    className="app-sider"
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        style={{ height: "100%", borderRight: 0 }}
                    >
                        <SubMenu key="sub1" title={<span>요일별</span>}>
                            <Menu.Item key="1">
                                <Link to="/?day=mon">월요일</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/?day=tue">화요일</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/?day=wed">수요일</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/?day=thu">목요일</Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to="/?day=fri">금요일</Link>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Link to="/?day=sat">토요일</Link>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Link to="/?day=sun">일요일</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
            </Layout>
        </Layout>
    );
}

function ProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {props.currentUser.name}
                </div>
                <div className="username-info">
                    @{props.currentUser.username}
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="profile" className="dropdown-item">
                <Link to={`/users/${props.currentUser.username}`}>프로필</Link>
            </Menu.Item>
            <Menu.Item key="logout" className="dropdown-item">
                로그아웃
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            menu={dropdownMenu}
            trigger={["click"]}
            getPopupContainer={() =>
                document.getElementsByClassName("profile-menu")[0]
            }
        >
            <a className="ant-dropdown-link">
                <Icon
                    type="user"
                    className="nav-icon"
                    style={{ marginRight: 0 }}
                />{" "}
                <Icon type="down" />
            </a>
        </Dropdown>
    );
}

export default AppHeader;
