var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const PREFIX = "li_";

class LillyStore {
    constructor() {
        this.store = {};
        this.readonly = false;
        this.collectionId = "";
        this.connected = false;
    }

    connect(collectionId = invokeError("no_collection"), callback) {
        if (this.connected) return;
        verifyLocalStorage();
        this.collectionId = PREFIX + collectionId;
        const data = readFromStorage(collectionId);
        this.connected = true;
        if (data === null) return this.store;
        this.store = _extends({}, data);
        return data;
    }

    save(id = invokeError("no_save_args"), data = invokeError("no_save_args")) {
        if (!this.connected) invokeError("not_connected_yet");
        const updatedStore = _extends({}, this.store, { [id]: data });
        updateStorage(this.collectionId, updatedStore);
        this.store = _extends({}, updatedStore);
        return data;
    }

    read(id) {
        if (!this.connected) invokeError("not_connected_yet");
        if (!id in this.store) return null;
        return this.store[id];
    }

    drop() {
        if (!this.connected) invokeError("not_connected_yet");
        localStorage.removeItem(this.collectionId);
        this.store = {};
        return true;
    }

    remove(id) {
        if (!this.connected) invokeError("not_connected_yet");
        if (!id in this.store) return false;
        const updatedStore = _extends({}, this.store);
        delete updatedStore[id];
        updateStorage(this.collectionId, updatedStore);
        this.store = _extends({}, updatedStore);
        return updatedStore;
    }
}

function invokeError(code) {
    let errorMessage = `Something is not right\n${code}`;
    switch (code) {
        case "no_collection":
            errorMessage = "Collection name is not provided. This argument is needed to connect to collection or create a new one";
            break;
        case "no_connection":
            errorMessage = "Could not connect to local storage. It is either full or not available";
            break;
        case "not_connected_yet":
            errorMessage = "Collection is not connected";
            break;
        case "no_save_args":
            errorMessage = ".save() expects two arguments - `<string> id, data`";
            break;
    }
    throw new Error(`Lilly error: ${errorMessage}`);
}

function updateStorage(collectionId, data) {
    try {
        localStorage.setItem(collectionId, JSON.stringify(data));
    } catch (error) {
        invokeError(error);
    }
}

function verifyLocalStorage() {
    try {
        localStorage.setItem("null", "null");
        localStorage.removeItem("null");
    } catch (error) {
        invokeError("no_connection");
    }
}

function readFromStorage(collectionId) {
    let data;
    try {
        data = JSON.parse(localStorage.getItem(this.collectionId));
    } catch (error) {
        data = { data };
    }
    if (typeof data !== "object") data = { data };
    return data;
}