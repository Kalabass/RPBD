import ZavodPage from "../zavod/ZavodPage";
import Header from "./Header/Header";

const MainPage:React.FC = () => {
    return (
        <div>
            <Header/>
            <ZavodPage/>
        </div>
    );
};

export default MainPage;