import React, { useState, useEffect } from "react";
import { Form, Button, Input, Upload, notification, Select } from "antd";
import Icon from "@ant-design/icons";
import "./EditToon.css";
import {
    fetchToonById,
    deleteToonThumbnail,
    fetchToonThumbnailById,
    uploadEditToon,
    uploadEditToonExceptFile,
} from "../../services/api/adminApi";
const { Dragger } = Upload;
const { Option } = Select;

const EditToon = ({ match, history }) => {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [day, setDay] = useState("mon");
    const [genre, setGenre] = useState("");
    const [fileList, setFileList] = useState([]);
    const [originFileName, setOriginFileName] = useState("");

    useEffect(() => {
        loadToon();
        loadToonThumbnail();
    }, []);

    const onDayChange = (value) => {
        setDay(value);
    };

    const onGenreChange = (value) => {
        setGenre(value);
    };

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const onChangeArtist = (e) => {
        setArtist(e.target.value);
    };

    const onChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const loadToon = () => {
        fetchToonById(parseInt(match.params.id, 10)).then((res) => {
            setTitle(res.title);
            setArtist(res.artist);
            setDay(res.day);
            setGenre(res.genre);
        });
    };

    const loadToonThumbnail = () => {
        fetchToonThumbnailById(parseInt(match.params.id, 10)).then((res) => {
            setOriginFileName(res.fileName);
        });
    };

    const deleteFile = (id) => {
        deleteToonThumbnail(id).then((res) => {
            setOriginFileName(null);
        });
    };

    const uploadEditWebtoon = () => {
        try {
            if (originFileName !== null) {
                uploadEditToonExceptFile(
                    parseInt(match.params.id, 10),
                    title,
                    artist,
                    day,
                    genre
                );
            } else {
                uploadEditToon(
                    parseInt(match.params.id, 10),
                    title,
                    artist,
                    day,
                    genre,
                    fileList[0].originFileObj
                );
            }

            history.push("/adminmenu");
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

    return (
        <div className="editToon-container">
            <Form onSubmit={uploadEditWebtoon}>
                <Form.Item label="작품 제목">
                    <Input
                        type="text"
                        name="title"
                        size="large"
                        placeholder="Title"
                        value={title}
                        onChange={onChangeTitle}
                    ></Input>
                </Form.Item>
                <Form.Item label="작가">
                    <Input
                        type="text"
                        name="artist"
                        size="large"
                        placeholder="Artist"
                        value={artist}
                        onChange={onChangeArtist}
                    ></Input>
                </Form.Item>
                <Form.Item label="연재 요일">
                    <Select
                        name="day"
                        value={day}
                        size="large"
                        onChange={onDayChange}
                    >
                        <Option value="mon">월요일</Option>
                        <Option value="tue">화요일</Option>
                        <Option value="wed">수요일</Option>
                        <Option value="thu">목요일</Option>
                        <Option value="fri">금요일</Option>
                        <Option value="sat">토요일</Option>
                        <Option value="sun">일요일</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="장르">
                    <Select
                        name="genre"
                        value={genre}
                        size="large"
                        onChange={onGenreChange}
                    >
                        <Option value="로맨스">로맨스</Option>
                        <Option value="일상">일상</Option>
                        <Option value="공포">공포</Option>
                        <Option value="판타지">판타지</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="썸네일">
                    {originFileName !== null && (
                        <div>
                            <span>{originFileName}&nbsp;</span>
                            <Button
                                type="primary"
                                size="small"
                                onClick={() =>
                                    deleteFile(parseInt(match.params.id, 10))
                                }
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                    <Dragger onChange={onChange} beforeUpload={() => false}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">
                            이미지를 클릭 또는 드래그하세요
                        </p>
                        <p className="ant-upload-hint">
                            썸네일 권장 사이즈는 10 : 8 (비율) 입니다.
                        </p>
                    </Dragger>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        className="editToonButton"
                        size="large"
                        htmlType="submit"
                    >
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditToon;
