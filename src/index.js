const PREFIX = "li_";

class LillyStore {
    store = {};
    readonly = false;
    collectionId = "";

    constructor(collection) {
        this.connect(collection);
    }

    connect(collectionId = invokeError("no_collection"), callback) {
        verifyLocalStorage();
        this.collectionId = PREFIX + collectionId;
        const updatedStore = readFromStorage(collectionId);
        this.connected = true;
        if (updatedStore === null) return { ...this.store };
        this.store = { ...updatedStore };
        return updatedStore;
    }

    save(id = invokeError("no_save_args"), data = invokeError("no_save_args")) {
        const updatedStore = { ...this.store, [id]: data };
        updateStorage(this.collectionId, updatedStore);
        this.store = { ...updatedStore };
        return updatedStore;
    }

    read(id) {
        return id in this.store ? this.store[id] : null;
    }

    drop() {
        localStorage.removeItem(this.collectionId);
        this.store = {};
        return true;
    }

    remove(id) {
        if (!id in this.store) return false;
        const updatedStore = { ...this.store };
        delete updatedStore[id];
        updateStorage(this.collectionId, updatedStore);
        this.store = { ...updatedStore };
        return updatedStore;
    }
}

function invokeError(code) {
    let errorMessage = `Something is not right\n${code}`;
    switch (code) {
        case "no_collection":
            errorMessage =
                "Collection name is not provided. This argument is needed to connect to collection or create a new one";
            break;
        case "no_connection":
            errorMessage =
                "Could not connect to local storage. It is either full or not available";
            break;
        case "no_save_args":
            errorMessage =
                ".save() expects two arguments - `<string> id, data`";
            break;
    }
    throw new Error(`Lilly error: ${errorMessage}`);
}

function updateStorage(collectionId, data) {
    try {
        localStorage.setItem(collectionId, JSON.stringify(data));
    } catch (error) {
        invokeError("no_collection");
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
