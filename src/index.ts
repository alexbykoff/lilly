export class Lilly {
    
    // Creating new instance of database with a name. Name becomes a prefix for database entries.
    constructor(public name: string = ''){}

    // Attempt to establish a connection to local storage. If it is not available then return error.
    connect(callback: any) {
        try{
            localStorage.setItem("null","null");
            localStorage.removeItem("null");
            return callback(null, true);
        }
        catch(e){
            return callback(e);
        }
    }

    save(key: string, data: any){
        let value = JSON.stringify({"value": data});
        try{
            localStorage.setItem(this.name + key, value);
        }
        catch(e){}
    }
    read(){}
    remove(){}
    push(){}
    pull(){}
    destroy(){}
    drop(){}
}
