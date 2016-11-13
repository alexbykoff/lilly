class Lilly {

    // setting writing permissions
    readonly: boolean = false;

    // container variable saves the state of the storage upon connection.
    container: any[] = [];

    // Creating new instance of database with a name. Name becomes a prefix for database entries.
    constructor(public name: string = '', public access: string = '') {
        if (this.name.length) this.name += '_';
        if (this.access === 'readonly') this.readonly = true;
    }

    // Attempt to establish a connection to local storage. If it is not available then return error.
    // If connection is successfull then callback is executed
    connect(callback: any) {

        try {
            localStorage.setItem("null", "null");
            localStorage.removeItem("null");
            return typeof callback == 'function' ? callback(null, true) : true;
        } catch (e) {
            return typeof callback == 'function' ? callback(e) : false;
        }
    }

    // Saves data into storage in JSON object format.
    // Silently logs to console if error occurs.
    save(key: string, data: any) : void {

        if (this.readonly) return;
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
    
    // Looks for a key in a storage and checks its integrity.
    // If values are not valid (for example - saved manually or by another script)
    // Then method attempts to reconstuct data according to this library's format. 
    find(key: string, fallback: any) {

        let data: any;
        try {
            data = JSON.parse(localStorage.getItem(this.name + key));            
        } catch (e) {
            // If parse fails then parse it manually        
            if (localStorage[key]) {
                data = {
                    _v: localStorage.getItem(key)
                }
            }
            // If no such data then fall back to default value
            else return fallback;
        }

        if (data === null) return fallback;
        // Doublecheck data integrity
        if (typeof data === 'object' && data._v !== 'undefined') {            
            return data._v;
        }        
        return fallback;
    }

    // Returns an array of keys, associated with this instance of storage.
    // Instanceing is based on the name argument of the Lilly class and thus
    // on the prfixes of the keys saved to the storage. 
    findKeys() {
        let localKeys: any[] = [];
        let prefix = this.name;
        try {
            Object.keys(localStorage)
                .map(v => {
                    if (v.substr(0, prefix.length) === prefix) {
                        localKeys.push(v);
                    }
                });
        } catch (e) {
            console && console.log(e);
            return;
        }

        return localKeys;
    }

    // Returns an array of all the keys for the current local storage.
    findGlobalKeys() {

        return Object.keys(localStorage);
    }

    remove(key: string) : void {

        // This will silently terminate if no such data. No need to catch errors.
        if (this.readonly) return;
        localStorage.removeItem(this.name + key);
    }
    push() {}
    pull() {}
        
    drop() : void {

        // Destroys all local storage data associated with this particular database.
        // Keeps all other keys.

        if (this.readonly) return;
        let keys = this.findKeys();
        keys.map(e => localStorage.removeItem(e));
    }
}