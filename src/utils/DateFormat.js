export default class DateFormat{
    static format(string){
        let data = new Date(string)
        return `${data.toISOString().substr(0, 10).split('-').reverse().join('/')} às ${data.getHours().toString()}:${data.getMinutes().toString()}`
    }
}