exports.getTerminalAsync = async () => {
    const response = await fetch("/api/test/search/", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
    });
    const data = await response.json();
    return data;
};
