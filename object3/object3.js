let fizetes = {
    Anna : 2100,
    Cecil : 1890,
    Emil : 2050,
    Gerald : 2920
    }

let osszegek = 0;
let sadas = Object.values(fizetes);
function ossz(obj) {
    for ( let i = 0;i < Object.values(obj).length; i++)
    {
        osszegek += sadas[i];
    }
}
ossz(fizetes);
// console.log(sadas);
console.log(osszegek);
