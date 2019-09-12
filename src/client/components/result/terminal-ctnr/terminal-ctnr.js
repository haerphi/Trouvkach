import React, {useState, useEffect} from "react";
import utils from "../../../js/utils";
import ViewTerminal from "./view-terminal";

export default function TerminalItem(props) {
    const [terminal, setTerminal] = useState([]);
    /*useEffect(yourCallback, []) - will trigger the callback only after the first render.Detailed explanation
    useEffect runs by default after every render of the component (thus causing an effect).
    When placing useEffect in your component you tell React you want to run the callback as an effect. React will run the effect after rendering and after performing the DOM updates.
    If you pass only a callback - the callback will run after each render.
    If passing a second argument (array), React will run the callback after the first render and every time one of the elements in the array is changed. for example when placing useEffect(() => console.log('hello'), [someVar, someOtherVar]) - the callback will run after the first render and after any render that one of someVar or someOtherVar are changed.
    By passing the second argument an empty array, React will compare after each render the array and will see nothing was changed, thus calling the callback only after the first render.
    */

    useEffect(() => {
        // pour une fonction async dans un use effect, on appel une fonction qui appel une fonction asynchrone auto appelée soit useEffect(()=>{(async()=>{await something})()});
        // pour que babel ne soit pas faché par l'async/await, il faut inclure @babel/polyfill a la racine du projet dans le premier component
        (async () => {
            console.log("terminalctnr useEffect render => ");
            console.log(`props passed => ${props.latitude} ${props.longitude}`);
            const data = await utils.getTerminalAsync(
                props.longitude,
                props.latitude,
                1000,
            ); // lat log km
            console.log(`BDD fetched, result =>`);
            console.log(data);

            let listKey = 0; // id for react list key
            const dataArr = data.truc.map(item => (
                <ViewTerminal
                    key={++listKey}
                    view={item.address}
                    obj={item}
                    setdescription={props.setDesc}
                />
            ));
            setTerminal(dataArr);
        })();
    }, [props.latitude, props.longitude]); // pour l'explication du tableau, voir plus haut ^^

    return (
        <div className={"results-items-container"}>
            {terminal}
            {console.log("Rendu terminal-ctnr")}
        </div>
    );
}
