function isEmpty(obj) {
    if (Object.keys(obj).length== 0)
    {
        return true;
    }
    return false;
}
let user = { name : "Peti"}// teszt
console.log(isEmpty({})) //true
console.log(isEmpty({name: "John" })) // false
console.log(isEmpty(user)) // teszt
