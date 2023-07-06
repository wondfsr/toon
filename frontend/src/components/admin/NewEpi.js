import React, { useState, useEffect } from "react";
import { Form, Button, Input, Upload, notification, Select } from "antd";
import Icon from "@ant-design/icons";
import "./NewEpi.css";
import { uploadEpi, fetchToonInfo } from "../../services/api/adminApi";
const { Dragger } = Upload;
const { Option } = Select;

const NewEpi = (props) => {
    const [toons, setToons] = useState([]);
    const [epiTitle, setEpiTitle] = useState("");
    const [thumbnail, setThumbnail] = useState([]);
    const [main, setMain] = useState([]);
    const [selectedToonID, setSelectedToonID] = useState("");

    const onChangeToon = (value) => {
        setSelectedToonID(value);
    };

    const loadToonInfo = () => {
        fetchToonInfo().then((res) => {
            setToons(res);
        });
    };

    const onChangeThumbnail = ({ fileList }) => {
        setThumbnail(fileList);
    };

    const onChangeMain = ({ fileList }) => {
        setMain(fileList);
    };

    const uploadNewEpi = () => {
        try {
            uploadEpi(
                selectedToonID,
                epiTitle,
                thumbnail[0].originFileObj,
                main[0].originFileObj
            );

            props.history.push("/adminmenu");
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

    const onChangeEpiTitle = (e) => {
        setEpiTitle(e.target.value);
    };

    useEffect(() => {
        loadToonInfo();
    }, []);

    return (
        <div className="newEpi-container">
            <Form onSubmit={uploadNewEpi}>
                <Form.Item label="연재 만화">
                    <Select name="toon" size="large" onChange={onChangeToon}>
                        {toons.map((toon) => (
                            <Option key={toon.tno} value={toon.tno}>
                                {toon.title}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="회차 제목">
                    <Input
                        type="text"
                        name="epiTitle"
                        size="large"
                        placeholder="Ex) 1화"
                        value={epiTitle}
                        onChange={onChangeEpiTitle}
                    />
                </Form.Item>
                <Form.Item label="회차 썸네일">
                    <Dragger
                        onChange={onChangeThumbnail}
                        beforeUpload={() => false}
                    >
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">
                            이미지를 클릭 또는 드래그 하세요
                        </p>
                        <p className="ant-upload-hint">
                            회차 썸네일 권장 사이즈는 10:8 (비율) 입니다.
                        </p>
                    </Dragger>
                </Form.Item>
                <Form.Item label="회차 본편">
                    <Dragger
                        onChange={onChangeMain}
                        beforeUpload={() => false}
                        multiple={true}
                    >
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">
                            이미지를 클릭 또는 드래그 하세요
                        </p>
                        <p className="ant-upload-hint">
                            회차 본편 권장 사이즈는 900 * ∞ (픽셀) 입니다.
                        </p>
                    </Dragger>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        className="newEpiAddButton"
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

export default NewEpi;
