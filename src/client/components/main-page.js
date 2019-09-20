import React from "react";
//import ReactDOM from "react-dom";
import ResultCpn from "./result/result";
import Header from "./header";
//import Loading from "./loading";

export default function MainPage() {
    // const [ShowLoading, setShowLoading] = useState(false);

    // const loadingPage = props => {
    //     const modalRoot = document.querySelector("#ModalItemInfo");
    //     return ReactDOM.createPortal(<Loading />, modalRoot);
    // };

    return (
        <React.Fragment>
            <Header />
            <ResultCpn />
            {/*ShowLoading&&loadingPage()*/}
        </React.Fragment>
    );
}
