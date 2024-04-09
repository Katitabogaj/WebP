const sumOfArraySingles = arr => {
    function ismetlodo(arr){
        let egyszer = 0;
        let x = {}

        
        for (let y of arr) {
            if (x[y]) {
                x[y]++;
            } else {
                x[y] = 1;
            }
        }
        for (let y in x) {
            if (x[y] == 1) {
                egyszer += y;
            }
        }
    
        return egyszer;
    }

}

console.log('1. feladat\n')
console.log(sumOfArraySingles([4, 5, 7, 5, 4, 8]), 15)
console.log(sumOfArraySingles([9, 10, 19, 13, 19, 13]), 19)
console.log(sumOfArraySingles([16, 0, 11, 4, 8, 16, 0, 11]), 12)
console.log(sumOfArraySingles([5, 17, 18, 11, 13, 18, 11, 13]), 22)
console.log(sumOfArraySingles([5, 10, 19, 13, 10, 13]), 24)
