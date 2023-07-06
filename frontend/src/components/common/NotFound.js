import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { Button } from "antd";

const NotFound = () => {
    return (
        <div className="page-not-found">
            <h1 className="title">404</h1>
            <div className="desc">페이지가 존재하지 않습니다.</div>
            <Link to="/">
                <Button className="go-back-btn" type="primary" size="large">
                    돌아가기
                </Button>
            </Link>
        </div>
    );
};

export default NotFound;
