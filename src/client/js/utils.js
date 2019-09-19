const getUnlnownAdressFromNominatim = async (lat, lon) => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
        },
    );
    const data = await response.json();
    const address = `${
        typeof data.address.house_number !== "undefined"
            ? data.address.house_number
            : ""
    } ${data.address.road && data.address.road}, ${data.address.postcode &&
        data.address.postcode} ${data.address.city && data.address.city}`;
    return address;
};

exports.getcoordFromNominatim = async search => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${search}&format=geocodejson`,
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
        },
    );
    const data = await response.json();
    return data;
};

//fonction pour récup les banques /api/search/banks/
const getBanks = async () => {
    const response = await fetch(`/api/search/banks/`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
    });
    const data = await response.json();

    return data.truc;
};

const arrayObjectToString = arr => {
    let newStr = "";
    for (const element of arr) {
        newStr += `${JSON.stringify(element)}|`;
    }
    newStr = newStr.substring(0, newStr.length - 1);
    return newStr;
};

const stringToArrayObject = str => {
    const newArr = str.split("|");
    for (let i = 0; i < newArr.length; i++) {
        newArr[i] = JSON.parse(newArr[i]);
    }
    return newArr;
};

const updateTerminalAsync = (id, champ, value) => {
    const uri = `http://localhost/api/modify/${id}/${champ}/${value}`;
    fetch(uri, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
    });
};
async function doSomeUpdate(id, addr) {
    let data = await addr;
    data = data.replace(/\//g, "%2F");
    updateTerminalAsync(id, "address", data);
}
exports.getTerminalAsync = async (long, lat, zoom) => {
    localStorage.clear();
    let allbanks = localStorage.getItem("allbanks");
    if (allbanks === null) {
        allbanks = await getBanks();
        localStorage.setItem("allbanks", arrayObjectToString(allbanks));
    } else {
        allbanks = stringToArrayObject(allbanks);
    }

    const response = await fetch(`/api/search/${long}/${lat}/${zoom}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
    });
    const data = await response.json();

    //rajout des banks à l'emplacement nécessaire et des adresses manquante
    for (let i = 0; i < data.truc.length; i++) {
        //transformation en map où l'on met l'_id en avant et puis on recherche avec indexOf
        const index = allbanks.map(e => e._id).indexOf(data.truc[i].bank);
        data.truc[i].bank = allbanks[index];
        //terminal adress verification and fetch
        if (!data.truc[i].address) {
            data.truc[i].address = getUnlnownAdressFromNominatim(
                data.truc[i].latitude,
                data.truc[i].longitude,
                data.truc[i]._id,
            );
            doSomeUpdate(data.truc[i]._id, data.truc[i].address);
        }
    }

    return data;
};

// eslint-disable-next-line require-await
exports.updateTerminal = async (id, champ, value) => {
    const test = `/api/modify/${id}/${champ}/${value}`;
    console.log(test);
    const response = await fetch(test, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
    });
    const data = await response.json();
    console.log(data.truc);
};
