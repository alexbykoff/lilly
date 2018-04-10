const PREFIX = "li_";

class LillyStore {
    store = {};
    readonly = false;
    collectionId = "";
    connected = false;

    connect(collectionId = invokeError("no_collection"), callback) {
        if (this.connected) return;
        verifyLocalStorage();
        this.collectionId = PREFIX + collectionId;
        const data = readFromStorage(collectionId);
        this.connected = true;
        if (data === null) return this.store;
        this.store = { ...data };
        return data;
    }

    save(id, data) {
        if (!this.connected) invokeError("not_connected_yet");
        const updatedStore = { ...this.store, [id]: data };
        updateStorage(this.collectionId, updatedStore);
        this.store = { ...updatedStore };
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
        const updatedStore = { ...this.store };
        delete updatedStore[id];
        updateStorage(this.collectionId, updatedStore);
        this.store = { ...updatedStore };
        return updatedStore;
    }
}

function invokeError(code) {
    let errorMessage = `Something is not right\n${error}`;
    switch (error) {
        case "no_collection":
            errorMessage =
                "Collection name is not provided. This argument is needed to connect to collection or create a new one";
            break;
        case "no_connection":
            errorMessage =
                "Could not connect to local storage. It is either full or not available";
            break;
        case "not_connected_yet":
            errorMessage = "Collection is not connected";
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
