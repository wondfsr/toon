import React, { useState } from "react";
import { Form, Button, Input, Upload, notification, Select } from "antd";
import Icon from "@ant-design/icons";
import "./NewAdd.css";
import { uploadFile } from "../../services/api/adminApi";
const { Dragger } = Upload;
const { Option } = Select;

const NewAdd = (props) => {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [day, setDay] = useState("mon");
    const [genre, setGenre] = useState("로맨스");
    const [fileList, setFileList] = useState([]);

    const handleInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        if (inputName === "title") {
            setTitle(inputValue);
        } else if (inputName === "artist") {
            setArtist(inputValue);
        }
    };

    const onDayChange = (value) => {
        setDay(value);
    };

    const onGenreChange = (value) => {
        setGenre(value);
    };

    const onChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const uploadNewWebtoon = () => {
        try {
            uploadFile(title, artist, day, genre, fileList[0].originFileObj);
            props.history.push("/adminmenu");
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

    return (
        <div className="newAdd-container">
            <Form onSubmit={uploadNewWebtoon}>
                <Form.Item label="작품 제목">
                    <Input
                        type="text"
                        name="title"
                        size="large"
                        placeholder="Title"
                        value={title}
                        onChange={handleInputChange}
                    />
                </Form.Item>
                <Form.Item label="작가">
                    <Input
                        type="text"
                        name="artist"
                        size="large"
                        placeholder="Artist"
                        value={artist}
                        onChange={handleInputChange}
                    />
                </Form.Item>
                <Form.Item label="연재 요일">
                    <Select
                        name="day"
                        defaultValue="월요일"
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
                        defaultValue="로맨스"
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
                    <Dragger onChange={onChange} beforeUpload={() => false}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">
                            파일을 업로드하기 위해 클릭 또는 드래그하세요
                        </p>
                        <p className="ant-upload-hint">
                            단일 또는 대량 업로드 가능합니다
                        </p>
                    </Dragger>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        className="newAddButton"
                        size="large"
                        htmlType="submit"
                    >
                        저장
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default NewAdd;
