function squareRoot(number, tolerance=0.0001) {
    if (number < 0) {
        throw new Error("The number can't be negative")
    }

    let guess = number / 2; // just a wild guess here

    while (Math.abs(guess*guess - number) > tolerance) {
        guess = (guess + number / guess) / 2; // increase the value of guess little by little, until we find a close result, thus return guess
    }

    return guess;
}



function nRoot(result, root, tolerance=0.0001) {

    let guess = result / 2

    while (Math.abs(Math.abs(Math.pow(guess, root) - result) > tolerance)) {
        guess = guess - (Math.pow(guess, root) - result) / (derative(guess, root))
    }

    return guess
}

function derative(x, root) {
    return root*Math.pow(x, root-1);
}




function isPrimeNumber(n) {
    if ([2, 3, 5, 7].includes(n)) {
        return true
    }
    return [canBeDivided(n, 2), canBeDivided(n, 3), canBeDivided(n, 5), canBeDivided(n, 7)].every((element) => element===false)
}

function canBeDivided(n, by) {
    return n / by === Math.floor(n / by)
}

// console.log(isPrimeNumber(3))
// console.log(isPrimeNumber(6))
// console.log(isPrimeNumber(10))
// console.log(isPrimeNumber(11))

const findSuprPrime = (n) => {
    // if (isPrimeNumber(n)) {
    //     return n
    // }

    while (!isPrimeNumber(n)) {
        n = n+1
    }
    return n

}

console.log(findSuprPrime(3))
console.log(findSuprPrime(6))
console.log(findSuprPrime(10))
console.log(findSuprPrime(17))