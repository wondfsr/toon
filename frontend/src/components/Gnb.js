import React, { useState } from "react";
import { Link } from "react-router-dom";

const days = [
    { eng: "mon", kor: "월요일" },
    { eng: "tue", kor: "화요일" },
    { eng: "wed", kor: "수요일" },
    { eng: "thu", kor: "목요일" },
    { eng: "fri", kor: "금요일" },
    { eng: "sat", kor: "토요일" },
    { eng: "sun", kor: "일요일" },
];

const genres = [{ name: "로맨스" }, { name: "스릴러" }, { name: "판타지" }];

const SubmenuDay = () => (
    <ul className="nav__submenu">
        {days.map((day) => (
            <li key={day.eng} className="nav__submenu-item">
                <Link to={`/?day=${day.eng}`} className="a">
                    {day.kor}
                </Link>
            </li>
        ))}
    </ul>
);

const SubmenuGenre = () => (
    <ul className="nav__submenu">
        {genres.map((genre) => (
            <li key={genre.name} className="nav__submenu-item">
                <Link to="/" className="a">
                    {genre.name}
                </Link>
            </li>
        ))}
    </ul>
);

const Gnb = () => {
    const [showAboutDay, setShowAboutDay] = useState(false);
    const [showAboutGen, setShowAboutGen] = useState(false);

    const handleDayHover = () => {
        setShowAboutDay(true);
    };

    const handleDayLeave = () => {
        setShowAboutDay(false);
    };

    const handleGenHover = () => {
        setShowAboutGen(true);
    };

    const handleGenLeave = () => {
        setShowAboutGen(false);
    };

    return (
        <div id="menu-container">
            <nav className="nav">
                <ul className="nav__menu">
                    <li className="nav__menu-item">
                        <Link to="/" className="a">
                            연재홈
                        </Link>
                    </li>
                    <li
                        className="nav__menu-item"
                        onMouseLeave={handleDayLeave}
                    >
                        <Link onMouseEnter={handleDayHover} className="a">
                            요일별
                        </Link>
                        <div className="submenu-container">
                            {showAboutDay && <SubmenuDay />}
                        </div>
                    </li>

                    <li
                        className="nav__menu-item"
                        onMouseLeave={handleGenLeave}
                    >
                        <Link onMouseEnter={handleGenHover} className="a">
                            장르별
                        </Link>
                        <div className="submenu-container">
                            {showAboutGen && <SubmenuGenre />}
                        </div>
                    </li>
                    <li className="nav__menu-item">
                        <Link className="a">선호작품</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Gnb;
