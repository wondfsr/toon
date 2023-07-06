import React, { useEffect, useState } from "react";
import { fetchEpi, deleteEpi } from "../../services/api/adminApi";
import { Table, Divider, Button } from "antd";
import { Link } from "react-router-dom";
import "./EditEpiList.css";

const EditEpiList = (props) => {
    const [epiList, setEpiList] = useState([]);
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        loadEpi();

        return () => {
            setIsMounted(false);
        };
    }, []);

    const loadEpi = () => {
        fetchEpi(parseInt(props.match.params.id, 10)).then((res) => {
            if (isMounted) {
                setEpiList(res);
            }
        });
    };
    const onDelete = (eno) => {
        deleteEpi(eno).then((res) => {
            setEpiList(epiList.filter((epi) => epi.eno !== eno));
        });
    };

    const columns = [
        {
            title: "회차 제목",
            dataIndex: "epiTitle",
            key: "epiTitle",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "업데이트",
            dataIndex: "updatedAt",
            key: "updatedAt",
        },
        {
            title: "Action",
            className: "action",
            key: "action",
            render: (text, record) => (
                <span>
                    <Button>
                        <Link to={`/editEpi/${record.eno}`}>수정</Link>
                    </Button>
                    <Divider type="vertical" />
                    <Button onClick={() => onDelete(record.eno)}>삭제</Button>
                </span>
            ),
        },
    ];

    return (
        <div className="editEpiList-container">
            <Table dataSource={epiList} columns={columns} />
        </div>
    );
};

export default EditEpiList;
