import React, {useState, useEffect} from "react";
import utils from "../../../js/utils";
import ViewTerminal from "./view-terminal";
import EmptyTerminal from "./empty-terminal";

export default function TerminalItem(props) {
    const [terminal, setTerminal] = useState([]);
    const [active, setActive] = useState(null);

    /*useEffect(yourCallback, []) - will trigger the callback only after the first render.Detailed explanation
    useEffect runs by default after every render of the component (thus causing an effect).
    When placing useEffect in your component you tell React you want to run the callback as an effect. React will run the effect after rendering and after performing the DOM updates.
    If you pass only a callback - the callback will run after each render.
    If passing a second argument (array), React will run the callback after the first render and every time one of the elements in the array is changed. for example when placing useEffect(() => console.log('hello'), [someVar, someOtherVar]) - the callback will run after the first render and after any render that one of someVar or someOtherVar are changed.
    By passing the second argument an empty array, React will compare after each render the array and will see nothing was changed, thus calling the callback only after the first render.
    */
    const metresPerPixel = zoom => {
        const zommSize = [
            500000000,
            250000000,
            150000000,
            70000000,
            35000000,
            15000000,
            10000000,
            4000000,
            2000000,
            1000000,
            500000,
            250000,
            150000,
            70000,
            35000,
            15000,
            8000,
            4000,
            2000,
            1000,
        ];
        return zommSize[zoom];
    };

    useEffect(() => {
        // pour une fonction async dans un use effect, on appel une fonction qui appel une fonction asynchrone auto appelée soit useEffect(()=>{(async()=>{await something})()});
        // pour que babel ne soit pas faché par l'async/await, il faut inclure @babel/polyfill a la racine du projet dans le premier component
        if (
            props.latitude >= -180 &&
            props.longitude >= -180 &&
            props.latitude <= 180 &&
            props.longitude <= 180
        ) {
            (async () => {
                const data = await utils.getTerminalAsync(
                    props.longitude,
                    props.latitude,
                    metresPerPixel(props.zoom) / 2,
                ); // lat log km
                let dataArr;
                if (data.truc.length === 0) {
                    dataArr = <EmptyTerminal />;
                } else {
                    setActive(active);
                    dataArr = data.truc.map(item => (
                        <ViewTerminal
                            key={item._id}
                            view={item.address}
                            obj={item}
                            setdescription={props.setDesc}
                            setIsActive={() => setActive(item._id)}
                            isActive={active === item._id}
                        />
                    ));
                }
                props.onSetResultLIst(data); // used to pass the total list to the map
                setTerminal(dataArr);
            })();
        }
    }, [props.latitude, props.longitude, props.zoom, active]); // pour l'explication du tableau, voir plus haut ^^

    return (
        <div className={"results-items-background"}>
            <div className={"results-items-container"}>{terminal}</div>
        </div>
    );
}
