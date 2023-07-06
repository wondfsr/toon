import { API_BASE_URL, ACCESS_TOKEN } from "../../constants/constants";

const getRequestHeaders = () => {
    const headers = new Headers();

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
        headers: getRequestHeaders(),
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
        headers: getRequestHeaders(),
    };
    options = { ...defaults, ...options };

    try {
        const response = await fetch(options.url, options);
        return response;
    } catch (error) {
        throw error;
    }
};

export function uploadData(route, data, method = "POST") {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
    });
    return request({
        url: API_BASE_URL + route,
        method: method,
        body: formData,
    });
}

export function uploadFile(title, artist, day, genre, fileList) {
    const data = {
        title,
        artist,
        day,
        genre,
        file: fileList,
    };
    return uploadData("/newAdd", data);
}

export function uploadEpi(selectedToonId, epiTitle, thumbnail, main) {
    const data = {
        toonId: selectedToonId,
        webtoonId: selectedToonId,
        epiTitle,
        eFile: thumbnail,
        mFile: main,
    };
    return uploadData("/newEpi", data);
}

export function uploadEditEpi(id, epiTitle, eFile, mFile) {
    const data = {
        epiTitle,
        eFile,
        mFile,
    };
    return uploadData("/uploadEditEpi/" + id, data, "PUT");
}

export function uploadEditEpiExceptTaM(id, epiTitle) {
    const data = {
        epiTitle,
    };
    return uploadData("/uploadEditEpiExceptTaM/" + id, data, "PUT");
}

export function uploadEditEpiExceptM(id, epiTitle, eFile) {
    const data = {
        epiTitle,
        eFile,
    };
    return uploadData("/uploadEditEpiExceptM/" + id, data, "PUT");
}

export function uploadEditEpiExceptT(id, epiTitle, mFile) {
    const data = {
        epiTitle,
        eFile: mFile,
    };
    return uploadData("/uploadEditEpiExceptT/" + id, data, "PUT");
}

export function fetchToonInfo() {
    return request({
        url: API_BASE_URL + "/getToonIdAndName",
        method: "GET",
    });
}

export function fetchToon() {
    return request({
        url: API_BASE_URL + "/getToon",
        method: "GET",
    });
}

export function fetchEpi(toonId) {
    return request({
        url: API_BASE_URL + "/getEpi/" + toonId,
        method: "GET",
    });
}

export function fetchEpiById(id) {
    return request({
        url: API_BASE_URL + "/getEpiById/" + id,
        method: "GET",
    });
}

export function fetchToonById(id) {
    return request({
        url: API_BASE_URL + "/getToonById/" + id,
        method: "GET",
    });
}

export function deleteToonThumbnail(id) {
    return deleteRequest({
        url: API_BASE_URL + "/deleteToonThumbnail/" + id,
        method: "DELETE",
    });
}

export function deleteToon(id) {
    return deleteRequest({
        url: API_BASE_URL + "/deleteToon/" + id,
        method: "DELETE",
    });
}

export function fetchToonThumbnailById(id) {
    return request({
        url: API_BASE_URL + "/getToonThumbnailById/" + id,
        method: "GET",
    });
}

export function uploadEditToon(id, title, artist, day, genre, fileList) {
    const data = {
        title,
        artist,
        day,
        genre,
        file: fileList,
    };
    return uploadData("/uploadEditToon/" + id, data, "PUT");
}

export function uploadEditToonExceptFile(id, title, artist, day, genre) {
    const data = {
        title,
        artist,
        day,
        genre,
    };
    return uploadData("/uploadEditToonExceptFile/" + id, data, "PUT");
}

export function deleteEpi(id) {
    return deleteRequest({
        url: API_BASE_URL + "/deleteEpi/" + id,
        method: "DELETE",
    });
}

export function fetchEditEpi(id) {
    return request({
        url: API_BASE_URL + "/getEditEpi/" + id,
        method: "GET",
    });
}

export function fetchToonTitle(id) {
    return request({
        url: API_BASE_URL + "/getToonTitle/" + id,
        method: "GET",
    });
}

export function fetchEpiThumbnailById(id) {
    return request({
        url: API_BASE_URL + "/getEpiThumbnailById/" + id,
        method: "GET",
    });
}

export function deleteEpiThumbnail(id) {
    return deleteRequest({
        url: API_BASE_URL + "/deleteEpiThumbnail/" + id,
        method: "DELETE",
    });
}

export function deleteEpiToon(id) {
    return deleteRequest({
        url: API_BASE_URL + "/deleteEpiToon/" + id,
        method: "DELETE",
    });
}

export function fetchEpiToon(id) {
    return request({
        url: API_BASE_URL + "/getEpiToon/" + id,
        method: "GET",
    });
}

export function uploadComment(id, username, comment) {
    const data = {
        user: username,
        comment,
    };
    return uploadData("/saveComment/" + id, data);
}

export function uploadEditComment(id, comment) {
    const data = {
        comment,
    };
    return uploadData("/uploadEditComment/" + id, data, "PUT");
}

export function uploadRate(id, username, rate) {
    const data = {
        rate,
        user: username,
    };
    return uploadData("/uploadRate/" + id, data);
}

export function uploadEditRate(id, username, rate) {
    const data = {
        rate,
        user: username,
    };
    return uploadData("/uploadEditRate/" + id, data, "PUT");
}

export function saveFav(id, user, title, webtoonId) {
    const data = {
        user,
        title,
        webtoonId,
    };
    return uploadData("/saveFav/" + id, data);
}

export function deleteFav(id, user) {
    return deleteRequest({
        url: API_BASE_URL + "/deleteFav/" + id + "/" + user,
        method: "DELETE",
    });
}

export function deleteFavById(id) {
    return deleteRequest({
        url: API_BASE_URL + "/deleteFavById/" + id,
        method: "DELETE",
    });
}

export function fetchFav(user) {
    return request({
        url: API_BASE_URL + "/getFav/" + user,
        method: "GET",
    });
}

export function fetchFavById(tno, user) {
    return request({
        url: API_BASE_URL + "/getFavById/" + tno + "/" + user,
        method: "GET",
    });
}
