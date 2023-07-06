import { Button } from "antd";
import { Link } from "react-router-dom";

const AdminMenu = () => {
    return (
        <div className="admin-menu">
            <h2>admin님 환영합니다.</h2>
            <Button type="primary" block size="large">
                <Link to="/addToon">새 웹툰 등록</Link>
            </Button>
            <Button type="primary" block size="large">
                <Link to="/newEp">새 에피소드 업로드</Link>
            </Button>
            <Button type="primary" block size="large">
                <Link to="/editToon">웹툰 수정</Link>
            </Button>
        </div>
    );
};

export default AdminMenu;
