afterEach(function() {
    localStorage.clear();
});

describe("LillyStore.save() && .read() methods", function() {
    let store = new LillyStore("test-collection");
    //store.connect("test-collection");

    it("can store key:value pair", function() {
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

    it("should throw Error when no arguments provided for save()", function() {
        expect(() => store.save()).toThrow(
            new Error(
                "Lilly error: .save() expects two arguments - `<string> id, data`"
            )
        );
    });
});
