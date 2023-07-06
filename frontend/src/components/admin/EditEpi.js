import React, { useState, useEffect } from "react";
import { Form, Button, Input, Upload, notification, Select } from "antd";
import Icon from "@ant-design/icons";
import {
    fetchEditEpi,
    fetchToonTitle,
    fetchEpiThumbnailById,
    deleteEpiThumbnail,
    deleteEpiToon,
    fetchEpiToon,
    uploadEditEpi,
    uploadEditEpiExceptM,
    uploadEditEpiExceptT,
    uploadEditEpiExceptTaM,
} from "../../services/api/adminApi";
const { Dragger } = Upload;
const { Option } = Select;

const EditEpi = (props) => {
    const [eno, setEno] = useState(0);
    const [epiTitle, setEpiTitle] = useState("");
    const [webtoonId, setWebtoonId] = useState(0);
    const [toonTitle, setToonTitle] = useState("");
    const [originThumbnail, setOriginThumbnail] = useState(null);
    const [thumbnail, setThumbnail] = useState([]);
    const [main, setMain] = useState([]);
    const [originMain, setOriginMain] = useState(null);

    useEffect(() => {
        loadEditEpi();
        loadEpiThumbnail();
        loadEpiToon();
    }, []);

    useEffect(() => {
        if (webtoonId !== 0) {
            loadToonTitle();
        }
    }, [webtoonId]);

    const loadToonTitle = () => {
        fetchToonTitle(webtoonId).then((res) => {
            setToonTitle(res.title);
        });
    };

    const loadEditEpi = () => {
        fetchEditEpi(parseInt(props.match.params.id, 10)).then((res) => {
            setEno(res.eno);
            setEpiTitle(res.epiTitle);
            setWebtoonId(res.webtoonId);
        });
    };

    const loadEpiThumbnail = () => {
        fetchEpiThumbnailById(parseInt(props.match.params.id, 10)).then(
            (res) => {
                setOriginThumbnail(res.fileName);
            }
        );
    };

    const loadEpiToon = () => {
        fetchEpiToon(parseInt(props.match.params.id, 10)).then((res) => {
            setOriginMain(res.fileName);
        });
    };

    const onChangeThumbnail = ({ fileList }) => {
        setThumbnail(fileList);
    };

    const onChangeMain = ({ fileList }) => {
        setMain(fileList);
    };

    const uploadEditEpi = () => {
        try {
            if (originThumbnail !== null && originMain !== null) {
                uploadEditEpiExceptTaM(eno, epiTitle);
            } else if (originThumbnail == null && originMain !== null) {
                uploadEditEpiExceptM(eno, epiTitle, thumbnail[0].originFileObj);
            } else if (originThumbnail !== null && originMain == null) {
                uploadEditEpiExceptT(eno, epiTitle, main[0].originFileObj);
            } else {
                uploadEditEpi(
                    eno,
                    epiTitle,
                    thumbnail[0].originFileObj,
                    main[0].originFileObj
                );
            }
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

    const deleteEpiThumbnail = (id) => {
        deleteEpiThumbnail(id).then((res) => {
            setOriginThumbnail(null);
        });
    };

    const deleteEpiMain = (id) => {
        deleteEpiToon(id).then((res) => {
            setOriginMain(null);
        });
    };

    return (
        <div className="newEpi-container">
            <Form onSubmit={uploadEditEpi}>
                <Form.Item label="연재 만화">
                    <Select name="toon" size="large" value={webtoonId}>
                        <Option key={1} value={webtoonId}>
                            {" "}
                            {toonTitle}{" "}
                        </Option>
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
                    ></Input>
                </Form.Item>
                <Form.Item label="회차 썸네일">
                    {originThumbnail !== null && (
                        <div>
                            <span>{originThumbnail}&nbsp;</span>
                            <Button
                                type="primary"
                                size="small"
                                onClick={() =>
                                    deleteEpiThumbnail(
                                        parseInt(props.match.params.id, 10)
                                    )
                                }
                            >
                                삭제
                            </Button>
                        </div>
                    )}
                    <Dragger
                        onChange={onChangeThumbnail}
                        beforeUpload={() => false}
                    >
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">
                            이미지를 클릭 또는 드래그하세요
                        </p>
                        <p className="ant-upload-hint">
                            회차 썸네일 권장 사이즈는 10 : 8 (비율) 입니다.
                        </p>
                    </Dragger>
                </Form.Item>
                <Form.Item label="회차 본편">
                    {originMain !== null && (
                        <div>
                            <span>{originMain}&nbsp;</span>
                            <Button
                                type="primary"
                                size="small"
                                onClick={() =>
                                    deleteEpiMain(
                                        parseInt(props.match.params.id, 10)
                                    )
                                }
                            >
                                삭제
                            </Button>
                        </div>
                    )}
                    <Dragger onChange={onChangeMain} beforeUpload={() => false}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">
                            이미지를 클릭 또는 드래그하세요
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

export default EditEpi;
