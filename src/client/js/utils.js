exports.getTerminalAsync = async (long, lat, zoom) => {
    const response = await fetch(`/api/search/${long}/${lat}/${zoom}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
    });
    const data = await response.json();
    return data;
};
