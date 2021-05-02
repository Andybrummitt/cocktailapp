const isText = (string) => {
    const regex = /^[a-zA-Z0-9 ]+$/;
    return regex.test(string);
};

export default isText;