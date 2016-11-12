class Lilly {

    deny: Boolean = false;
    // Creating new instance of database with a name. Name becomes a prefix for database entries.
    constructor(public name: string = '', public access: string = '') {
        if(this.name.length) this.name += '_';
        if(this.access==='readonly') this.deny = true;
    }

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
        if (this.deny) return;
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
    find(key: string, fallback: any) {
        let data: any;
        try{
            data = JSON.parse(localStorage.getItem(this.name+key));
            console.log("Attempt to retreive", data);
        }
        catch(e){
            // If parse fails then parse it manually
            console.log("Parse fail. Objectifying the value");
            if(localStorage[key]){
                data = {_v: localStorage.getItem(key)}
            }
            // If no such data then fall back to default value
            else return fallback;
        }

        if (data === null) return fallback;
        // Doublecheck data integrity
        if (typeof data ==='object' && data._v !== 'undefined'){
             console.log("Structure Ok. Data is", data._v);             
             return data._v;
        }
        console.log("Not found, fallback");
        return fallback;
    }

    findKeys(){
            let localKeys: any[] = [];
            let prefix = this.name;
        try{
             Object.keys(localStorage)
                .map(v=>{
                    if (v.substr(0, prefix.length) === prefix) {                        
                        localKeys.push(v);
                    }
                });
        }
        catch(e){
            console.log(e);
            return;
        }

        return localKeys;
    }

    findGlobalKeys(){
        let globalKeys: any[] = [];
        try {
            Object.keys(localStorage)
                .map(v=> globalKeys.push(v));
        }
        catch(e){
            console.log(e);
            return;
        }

        return globalKeys;
    }

    remove(key: string) {
        // This will silently terminate if no such data. No need to catch errors.
        return localStorage.removeItem(this.name+key);
    }
    push() {}
    pull() {}
    destroy() {}
    drop() {
        let keys = this.findKeys();
        keys.map(e=>localStorage.removeItem(e));
    }
}