afterEach(function() {
    localStorage.clear();
});

describe("LillyStore.save() && .read() methods", function() {
    let store = new LillyStore();
    store.connect("test-collection");
    it("can store key:value pair in the local storage", function() {
        store.save("key", "value");
        expect(store.read("key")).toContain("value");
    });

    it("can store objects", function() {
        let obj = { key: 1000 };
        store.save("obj", obj);
        expect(store.read("obj")).toEqual(obj);
    });

    it("can store arrays", function() {
        let arr = [1, 2, false, "string", [3, 4]];
        store.save("arr", arr);
        expect(store.read("arr")).toEqual(arr);
    });

    it("can store null", function() {
        let value = null;
        store.save("null", value);
        expect(store.read("null")).toEqual(null);
    });
});
