import { API_BASE_URL, ACCESS_TOKEN } from "../../constants/constants";

const getRequestHeaders = ({ contentType }) => {
    const headers = null;
    if (contentType) {
        headers = new Headers({
            "Content-Type": "application/json",
        });
    } else {
        headers = new Headers();
    }

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append(
            "Authorization",
            "Bearer " + localStorage.getItem(ACCESS_TOKEN)
        );
    }

    return headers;
};

const request = async (options) => {
    const defaults = {
        headers: getRequestHeaders(true),
    };
    options = { ...defaults, ...options };

    try {
        const response = await fetch(options.url, options);
        const json = await response.json();
        if (!response.ok) {
            throw json;
        }
        return json;
    } catch (error) {
        throw error;
    }
};

const deleteRequest = async (options) => {
    const defaults = {
        headers: getRequestHeaders(false),
    };
    options = { ...defaults, ...options };

    try {
        const response = await fetch(options.url, options);
        return response;
    } catch (error) {
        throw error;
    }
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: "POST",
        body: JSON.stringify(loginRequest),
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: "POST",
        body: JSON.stringify(signupRequest),
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url:
            API_BASE_URL +
            "/user/checkUsernameAvailability?username=" +
            username,
        method: "GET",
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: "GET",
    });
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/user/me",
        method: "GET",
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: "GET",
    });
}

export function uploadComment(id, username, comment) {
    const formData = new FormData();
    formData.append("user", username);
    formData.append("comment", comment);
    return request({
        url: API_BASE_URL + "/saveComment/" + id,
        method: "POST",
        body: formData,
    });
}

export function getComment(id) {
    return request({
        url: API_BASE_URL + "/getComment/" + id,
        method: "GET",
    });
}

export function deleteComment(id) {
    return deleteRequest({
        url: API_BASE_URL + "/deleteComment/" + id,
        method: "DELETE",
    });
}

export function fetchRate(id, user) {
    return request({
        url: API_BASE_URL + "/fetchRate/" + id + "/" + user,
        method: "GET",
    });
}

export function getAvgRate(id) {
    return request({
        url: API_BASE_URL + "/getAvgRate/" + id,
        method: "GET",
    });
}
