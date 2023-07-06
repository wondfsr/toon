import React, { useEffect, useState } from "react";
import WebtoonList from "../components/list/WebtoonList";
import { fetchToon } from "../services/api/adminApi";

const Main = (props) => {
    const [day, setDay] = useState("");
    const [webtoonList, setWebtoonList] = useState([]);

    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        const day = query.get("day") || "mon";
        setDay(day);
        getList();
    }, [props.location.search]);

    const getList = () => {
        fetchToon().then((res) => {
            setWebtoonList(res);
        });
    };

    const list = webtoonList.filter((webtoon) => webtoon.day === day);

    return (
        <div>
            <main>
                {webtoonList.length > 0 ? (
                    <WebtoonList list={list} />
                ) : (
                    <span>로딩중...</span>
                )}
            </main>
        </div>
    );
};

export default Main;
