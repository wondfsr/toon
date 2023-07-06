import React, { useState, useEffect, useRef } from "react";
import {
    fetchEpiById,
    uploadComment,
    uploadEditComment,
    uploadRate,
    uploadEditRate,
} from "../services/api/adminApi";
import { Form, Button, Input, List, Rate, notification } from "antd";
import { Comment } from "@ant-design/compatible";
import "./Viewer.css";
import {
    getComment,
    deleteComment,
    fetchRate,
    getAvgRate,
} from "../services/api/commonApi";

const { TextArea } = Input;

const Viewer = (props) => {
    const [episode, setEpisode] = useState({});
    const [comment, setComment] = useState("");
    const [username, setUsername] = useState(props.username);
    const [comments, setComments] = useState([]);
    const [editComment, setEditComment] = useState("");
    const [rate, setRate] = useState(null);
    const [fetchRate, setFetchRate] = useState(null);
    const [avgRate, setAvgRate] = useState(null);
    const [showInput, setShowInput] = useState(false);

    const episodeIdRef = useRef(parseInt(props.match.params.episodeId, 10));

    useEffect(() => {
        _getEpisodeList();
        loadComment();
        loadRate();
        loadAvg();
    }, []);

    const loadAvg = () => {
        getAvgRate(episodeIdRef.current)
            .then((res) => {
                setAvgRate(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const _getEpisodeList = () => {
        fetchEpiById(episodeIdRef.current)
            .then((res) => {
                setEpisode(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onChange = (e) => {
        setComment(e.target.value);
    };

    const onEditChange = (e) => {
        setEditComment(e.target.value);
    };

    const handleRate = (value) => {
        setRate(value);
    };

    const handleFetchRate = (value) => {
        setFetchRate(value);
    };

    const uploadComment = () => {
        uploadComment(episodeIdRef.current, username, comment);
    };

    const handleEditComment = (id) => {
        uploadEditComment(id, editComment).then((res) =>
            setShowInput(false, function () {
                window.location.reload();
            })
        );
    };

    const onEdit = () => {
        setShowInput(true);
    };

    const loadComment = () => {
        getComment(episodeIdRef.current)
            .then((res) => {
                setComments(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onDelete = (cno) => {
        deleteComment(cno).then((res) => {
            setComments(comments.filter((comment) => comment.cno !== cno));
        });
    };

    const uploadRate = () => {
        try {
            uploadRate(episodeIdRef.current, username, rate).then(function () {
                window.location.reload();
            });
            notification.success({
                message: "Cheeze Toon",
                description: "정상적으로 저장되었습니다.",
            });
        } catch (error) {
            notification.error({
                message: "Cheeze Toon",
                description: error.message || "다시 시도해주세요.",
            });
        }
    };

    const editRate = () => {
        try {
            uploadEditRate(episodeIdRef.current, username, fetchRate).then(
                function () {
                    window.location.reload();
                }
            );
            notification.success({
                message: "Cheeze Toon",
                description: "정상적으로 저장되었습니다.",
            });
        } catch (error) {
            notification.error({
                message: "Cheeze Toon",
                description: error.message || "다시 시도해주세요.",
            });
        }
    };

    const loadRate = () => {
        fetchRate(episodeIdRef.current, username)
            .then((res) => {
                setFetchRate(res.rate);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    var num = Number(avgRate);

    return (
        <div>
            <div className="wrap_viewer">
                {episode.eno ? (
                    <div>
                        <div className="top_viewer">{episode.epiTitle}</div>
                        <div className="wrap_images">
                            <img
                                src={episode.epiToon.fileUri}
                                alt={episode.epiTitle}
                            />
                        </div>
                    </div>
                ) : (
                    <span>로딩중...</span>
                )}
            </div>

            <div className="comment_container">
                <div>
                    <span className="avgRate"> 평점 : {num.toFixed(1)} </span>
                    <Rate
                        disabled
                        allowHalf
                        style={{ fontSize: 36 }}
                        value={avgRate}
                        className="avgStar"
                    />
                </div>
                <div className="rating_container">
                    {fetchRate !== null ? (
                        <Rate onChange={handleFetchRate} value={fetchRate} />
                    ) : (
                        <Rate onChange={handleRate} value={rate} />
                    )}
                    {fetchRate ? (
                        <Button type="primary" size="small" onClick={editRate}>
                            별점 수정
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            size="small"
                            onClick={uploadRate}
                        >
                            별점 등록
                        </Button>
                    )}
                </div>
                <Form onSubmit={uploadComment}>
                    <Form.Item>
                        <TextArea
                            rows={4}
                            onChange={onChange}
                            value={comment}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            className="commentButton"
                            htmlType="submit"
                        >
                            댓글 달기
                        </Button>
                    </Form.Item>
                </Form>
                <div>
                    <List
                        pagination={{ pageSize: 10 }}
                        className="comment-list"
                        header={`${comments.length} replies`}
                        itemLayout="horizontal"
                        dataSource={comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.user}
                                    content={item.comment}
                                    datetime={item.updatedAt}
                                />
                                {item.user == username ? (
                                    <div>
                                        <Button onClick={onEdit}>수정</Button>
                                        {showInput ? (
                                            <div className="editForm-container">
                                                <Form>
                                                    <Form.Item>
                                                        <TextArea
                                                            rows={4}
                                                            onChange={
                                                                onEditChange
                                                            }
                                                            defaultValue={
                                                                item.comment
                                                            }
                                                        />
                                                    </Form.Item>
                                                    <Form.Item>
                                                        <Button
                                                            type="primary"
                                                            className="commentButton"
                                                            onClick={() =>
                                                                handleEditComment(
                                                                    item.cno
                                                                )
                                                            }
                                                        >
                                                            댓글 달기
                                                        </Button>
                                                    </Form.Item>
                                                </Form>
                                            </div>
                                        ) : null}
                                        <Button onClick={onDelete(item.cno)}>
                                            삭제
                                        </Button>
                                    </div>
                                ) : null}
                            </li>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default Viewer;
