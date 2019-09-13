const getUnlnownAdressFromNominatim = async (lat, lon, id) => {
    console.log(`nominatime => lat:${lat} lon:${lon} `);
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
    console.log("getUnlnownAdressFromNominatim");
    const address = `
    ${data.address.address29 ? data.address.address29 : ""} ${
        data.address.mall ? data.address.mall : ""
    }
    ${data.address.house_number ? data.address.house_number : ""} ${
        data.address.road ? data.address.road : ""
    }
    ${data.address.postcode ? data.address.postcode : ""} ${
        data.address.city ? data.address.city : ""
    }
    
    ${data.address.country ? data.address.country : ""}
    `;
    // eslint-disable-next-line unicorn/prefer-query-selector
    document.getElementById(`${id}`).innerHTML = address;
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
    console.log("get bank!");

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
            getUnlnownAdressFromNominatim(
                data.truc[i].latitude,
                data.truc[i].longitude,
                data.truc[i]._id,
            );
        }
    }

    return data;
};
