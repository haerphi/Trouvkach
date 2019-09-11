import * as React from "react";

import ResultCpn from "./result/result";
//import ItemCpn from "./item/item";

const resultPage = <ResultCpn />;
//const itemPage = <ItemCpn />;

const MainPage = () => (
    <div>
        {resultPage}
        {/*itemPage modal*/}
    </div>
);

export default MainPage;
