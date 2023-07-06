import React from "react";
import { Link } from "react-router-dom";
import "./WebtoonList.css";

const WebtoonList = ({ list }) => {
    return (
        <div className="webtoonList__container">
            <ul className="list_webtoon">
                {list.map((webtoon, index) => (
                    <li key={index}>
                        <Link
                            to={`/webtoon/${webtoon.tno}`}
                            className="link_day"
                        >
                            <img
                                src={webtoon.toonThumbnail.fileUri}
                                className="img_day"
                                alt={webtoon.title}
                            />
                            <div className="info_day">
                                <strong className="tit_day">
                                    {webtoon.title + " "}
                                </strong>
                                {webtoon.artist + " "}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WebtoonList;
