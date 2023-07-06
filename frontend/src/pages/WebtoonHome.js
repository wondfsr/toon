import React, { useEffect, useState } from "react";
import WebtoonInfo from "../components/WebtoonInfo";
import EpisodeList from "../components/list/EpisodeList";
import { fetchEpi, fetchToonById } from "../services/api/adminApi";

const WebtoonHome = (props) => {
    const [webtoon, setWebtoon] = useState({});
    const [episodeList, setEpisodeList] = useState([]);
    const [username, setUsername] = useState(props.username);

    useEffect(() => {
        getWebtoon();
        getEpisodeList();
    }, []);

    const getWebtoon = () => {
        fetchToonById(parseInt(props.match.params.webtoonId, 10))
            .then((res) => {
                setWebtoon(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getEpisodeList = () => {
        fetchEpi(parseInt(props.match.params.webtoonId, 10))
            .then((res) => {
                setEpisodeList(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <main>
                {webtoon.tno ? (
                    <WebtoonInfo webtoon={webtoon} username={username} />
                ) : (
                    <span>로딩중...</span>
                )}

                {episodeList.length > 0 ? (
                    <EpisodeList episodes={episodeList} />
                ) : (
                    <span>로딩중...</span>
                )}
            </main>
        </div>
    );
};

export default WebtoonHome;
