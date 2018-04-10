class LillyStore {
    store = {};
    readonly = false;
    collectionId = "";
    connected = false;

    connect(collectionId = Lilly.error("no_collection"), callback) {
        if (this.connected) return;
        Lilly.verifyLocalStorage();
        this.collectionId = Lilly.prefix + collectionId;
        const data = JSON.parse(localStorage.getItem(this.collectionId));
        if (data) this.store = data;
        this.connected = true;
        return { ...this.store };
    }

    save(id, data) {
        if (!this.connected) Lilly.error("not_connected_yet");
        const updatedStore = { ...this.store, [id]: data };
        Lilly.updateStorage(this.collectionId, updatedStore);
        this.store = { ...updatedStore };
        return data;
    }

    read(id) {
        if (!this.connected) Lilly.error("not_connected_yet");
        if (!id in this.store) return null;
        return this.store[id];
    }

    drop() {
        if (!this.connected) Lilly.error("not_connected_yet");
        localStorage.removeItem(this.collectionId);
        this.store = {};
        return true;
    }

    remove(id) {
        if (!this.connected) Lilly.error("not_connected_yet");
        if (!id in this.store) return false;
        const updatedStore = { ...this.store };
        delete updatedStore[id];
        Lilly.updateStorage(this.collectionId, updatedStore);
        this.store = { ...updatedStore };
        return updatedStore;
    }
}

class Lilly {
    static prefix = "li_";

    static error(error) {
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

    static verifyLocalStorage() {
        try {
            localStorage.setItem("null", "null");
            localStorage.removeItem("null");
        } catch (error) {
            Lilly.error("no_connection");
        }
    }

    static updateStorage(collectionId, data) {
        try {
            localStorage.setItem(collectionId, JSON.stringify(data));
        } catch (error) {
            Lilly.error(error);
        }
    }
}

const store = new LillyStore();
store.connect("test04");
store.save("name", "John");
store.read("name");

const d = { 1: 2, 2: 3, 4: { f: 1, g: true } };

store.save("myObj", d);

const x = store.read("myObj");

console.log(x);
