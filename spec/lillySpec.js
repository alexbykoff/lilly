localStorage.clear();
afterEach(function() {

});
describe("Lilly.save() method", function() {
    let db = new Lilly("prefix");
    db.connect();
    it("can store key:value pair in the local storage", function() {
        db.save("key", "value");
        expect(db.find("key")).toContain("value");
    });

    it("can store objects", function() {
        let obj = { key: 1000 };
        db.save("obj", obj);
        expect(db.find("obj")).toEqual(obj);
    });

    it("can store arrays", function() {
        let arr = [1, 2, false, "string", [3, 4]];
        db.save("arr", arr);
        expect(db.find("arr")).toEqual(arr);
    });
})