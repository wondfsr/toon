import React, { useEffect, useState } from "react";

import NotFound from "../common/NotFound";
import ServerError from "../common/ServerError";
import LoadingIndicator from "../common/LoadingIndicator";
import { Avatar, Table, Button } from "antd";
import { getAvatarColor } from "../../utils/Color";
import { getUserProfile } from "../../services/api/commonApi";
import { fetchFav, deleteFavById } from "../../services/api/adminApi";
import { Link, useParams } from "react-router-dom";
import "./Profile.css";

function Profile() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [favs, setFavs] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [serverError, setServerError] = useState(false);

    const { username } = useParams();

    const onDelete = (fno) => {
        deleteFavById(fno).then((res) => {
            setFavs(favs.filter((fav) => fav.fno !== fno));
        });
    };

    const loadFav = (username) => {
        fetchFav(username)
            .then((res) => {
                setFavs(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadUserProfile = (username) => {
        setIsLoading(true);

        getUserProfile(username)
            .then((response) => {
                setUser(response);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error.status === 404) {
                    setNotFound(true);
                    setIsLoading(false);
                } else {
                    setServerError(true);
                    setIsLoading(false);
                }
            });
    };

    useEffect(() => {
        loadUserProfile(username);
        loadFav(username);
    }, [username]);

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (notFound) {
        return <NotFound />;
    }

    if (serverError) {
        return <ServerError />;
    }

    const columns = [
        {
            title: "제목",
            dataIndex: "title",
            key: "title",
            render: (text, record) => (
                <Link to={"/webtoon/" + record.webtoonId}>{text}</Link>
            ),
        },
        {
            title: "Action",
            key: "action",
            className: "action",
            render: (text, record) => (
                <span>
                    <Button onClick={() => onDelete(record.fno)}>삭제</Button>
                </span>
            ),
        },
    ];

    return (
        <div className="profile">
            {user ? (
                <div className="profile_container">
                    <div className="user-profile">
                        <div className="user-details">
                            <div className="user-avatar">
                                <Avatar
                                    className="user-avatar-circle"
                                    style={{
                                        backgroundColor: getAvatarColor(
                                            user.name
                                        ),
                                    }}
                                >
                                    {user.name[0].toUpperCase()}
                                </Avatar>
                            </div>
                            <div className="user-summary">
                                <div className="full-name">{user.name}</div>
                                <div className="username">@{user.username}</div>
                            </div>
                        </div>
                    </div>
                    <div className="favTable_container">
                        <div className="favTitle_container">
                            <span className="favTitle">선호 작품 목록</span>
                        </div>
                        <Table
                            dataSource={favs}
                            columns={columns}
                            pagination={{ pageSize: 10 }}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Profile;
