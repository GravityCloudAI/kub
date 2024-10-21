const setCookie = (name, value, domain = '', days = 0) => {
    let expires = "";

    // If days is not provided or set to 0, the cookie will expire when the session ends
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie =
        name + "=" + (value || "") + expires + "; path=/" +
        (domain ? "; domain=" + domain : "");
}

const deleteCookie = (name) => {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

const getCookie = (name) => {
    const pattern = RegExp(name + "=.[^;]*");
    const matched = document.cookie.match(pattern);
    if (matched && matched.length > 0) {
        const cookie = matched[0].split("=");
        return cookie[1];
    }

    return false;
};

module.exports = {
    setCookie,
    deleteCookie,
    getCookie
}