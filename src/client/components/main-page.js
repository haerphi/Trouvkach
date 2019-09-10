import * as React from "react";

import SearchCpn from "./search/search";
import ResultCpn from "./result/result";
import ItemCpn from "./item/item";

const SearchPage = <SearchCpn />;
const resultPage = <ResultCpn />;
const itemPage = <ItemCpn />;

const MainPage = () => (
    <div>
        {SearchPage}
        {resultPage}
        {itemPage}
    </div>
);

export default MainPage;
