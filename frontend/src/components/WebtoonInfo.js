import React, { useState, useEffect } from "react";
import "./WebtoonInfo.css";
import { Button, notification } from "antd";
import { saveFav, deleteFav, fetchFavById } from "../services/api/adminApi";

const WebtoonInfo = (props) => {
    const [webtoon, setWebtoon] = useState(props.webtoon);
    const [username, setUsername] = useState(props.username);
    const [fav, setFav] = useState(null);

    const uploadFav = () => {
        try {
            saveFav(webtoon.tno, username, webtoon.title, webtoon.tno).then(
                () => {
                    window.location.reload();
                }
            );
            notification.success({
                message: "Webtoon",
                description: "정상적으로 저장되었습니다.",
            });
        } catch (error) {
            notification.error({
                message: "Webtoon",
                description: error.message || "다시 시도해주세요.",
            });
        }
    };

    useEffect(() => {
        loadFav();
    }, []);

    const loadFav = () => {
        fetchFavById(webtoon.tno, username)
            .then((res) => {
                setFav(res);
                console.log("load");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteFav = () => {
        try {
            deleteFav(webtoon.tno, username).then(() => {
                setFav(null);
            });
            notification.success({
                message: "Webtoon",
                description: "정상적으로 삭제되었습니다.",
            });
        } catch (error) {
            notification.error({
                message: "Webtoon",
                description: error.message || "다시 시도해주세요.",
            });
        }
    };

    return (
        <div className="wrap_webtoon">
            <img
                src={webtoon.toonThumbnail.fileUri}
                className="img_webtoon"
                alt={webtoon.title}
            />
            <div className="info_webtoon">
                <strong className="tit_webtoon">{webtoon.title}</strong>
                <span className="txt_genre">{webtoon.genre}</span>
                <div className="favButton_container">
                    {fav == null || fav.length === 0 ? (
                        <Button type="primary" onClick={uploadFav}>
                            선호작 등록
                        </Button>
                    ) : (
                        <Button type="primary" onClick={deleteFav}>
                            선호작 해제
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WebtoonInfo;
