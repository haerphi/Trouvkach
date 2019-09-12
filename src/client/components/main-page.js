import React from "react";
import ResultCpn from "./result/result";
import Header from "./header";
//import ItemCpn from "./item/item";

const resultPage = <ResultCpn />;

const MainPage = () => (
    <React.Fragment>
        <Header />
        {resultPage}
        {/*itemPage modal*/}
    </React.Fragment>
);

export default MainPage;
