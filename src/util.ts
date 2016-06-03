class Util {
    // Convert from json object to zabbix sender input file. host default to '-'
    static ConvertSenderInput(dat: any): string {
        return "- db.error \"Linux DB3 down\"";
    }
}

let a = { "a" : 5};
let b = Util.ConvertSenderInput(a);
console.log(b);