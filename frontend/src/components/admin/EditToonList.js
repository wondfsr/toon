import React, { useEffect, useState } from "react";
import { fetchToon, deleteToon } from "../../services/api/adminApi";
import { Table, Divider, Button } from "antd";
import { Link } from "react-router-dom";
import "./EditToonList.css";

const EditToonList = () => {
    const [webtoons, setWebtoons] = useState([]);

    useEffect(() => {
        loadToon();
    }, []);

    const loadToon = () => {
        fetchToon().then((res) => {
            setWebtoons(res);
        });
    };

    const onDelete = (tno) => {
        deleteToon(tno).then((res) => {
            setWebtoons(webtoons.filter((webtoon) => webtoon.tno !== tno));
        });
    };

    const columns = [
        {
            title: "제목",
            dataIndex: "title",
            key: "title",
            render: (text, record) => (
                <Link to={"editEpiList/" + record.tno}>{text}</Link>
            ),
        },
        {
            title: "작가",
            dataIndex: "artist",
            key: "artist",
        },
        {
            title: "요일",
            dataIndex: "day",
            key: "day",
        },
        {
            title: "장르",
            dataIndex: "genre",
            key: "genre",
        },
        {
            title: "업데이트",
            dataIndex: "updatedAt",
            key: "updatedAt",
        },
        {
            title: "Action",
            key: "action",
            className: "action",
            render: (text, record) => (
                <span>
                    <Button>
                        <Link to={"editToon/" + record.tno}>수정</Link>
                    </Button>
                    <Divider type="vertical" />
                    <Button onClick={() => onDelete(record.tno)}>삭제</Button>
                </span>
            ),
        },
    ];

    return (
        <div className="editList-container">
            <Table
                dataSource={webtoons}
                columns={columns}
                pagination={{ pageSize: 8 }}
            />
        </div>
    );
};

export default EditToonList;
