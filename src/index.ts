class Lilly {

    // Creating new instance of database with a name. Name becomes a prefix for database entries.
    constructor(public name: string = '') {}

    // Attempt to establish a connection to local storage. If it is not available then return error.
    connect(callback: any) {
        try {
            localStorage.setItem("null", "null");
            localStorage.removeItem("null");
            return typeof callback == 'function' ? callback(null, true) : true;
        } catch (e) {
            return typeof callback == 'function' ? callback(e) : false;
        }
    }

    save(key: string, data: any) {
        // Objectifying data to trap null and undefined data
        data = JSON.stringify({
            "_v": data
        });
        try {
            localStorage.setItem(this.name + key, data);
        } catch (e) {
            console && console.log("Failed to save data. Storage is either full or out of reach.");
        }
    }
    read(key: string, fallback: any) {
        let data: any;
        try{
            data = JSON.parse(localStorage.getItem(this.name));
        }
        catch(e){
            // If parse fails
            localStorage[key]
        }

        return data === null? fallback: data._v !== 'undefined'? data._v: fallback;
    }
    remove() {}
    push() {}
    pull() {}
    destroy() {}
    drop() {}
}