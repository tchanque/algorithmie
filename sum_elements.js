let parsedData = [10, 15, 3, 7];
// let parsedData = [1, 8, 10, 21];

// EXERCICE 1

let comparison1 = 0;

const checkSumN2Complexity = (array, k) => {
    // parcourir la liste deux a deux
    // faire somme des elements et comparer a k
    // si somme == k alors on retourne true

    for (let i=0; i < array.length; i++) {
        
        for (let j=i+1; j < array.length; j++) {
            comparison1++

            let sum = array[i] + array[j]
            console.log(`Summing ${array[i]} with ${array[j]} equals ${sum}`)

            if (sum === k) {
                return true;
            }
        }
    }

    return false;

}

let response = checkSumN2Complexity(parsedData, 0)
console.log(`Checking if sum exists returns: ${response} after ${comparison1} operations`);

// EXERCICE 3 

let comparison2 = 0;

const checkSumNComplexity = (array, k) => {
    let alreadyChecked = new Set();
    
    for(let i= 0; i < array.length; i++) {
        comparison2++;
        const complement = k - array[i];
        if(alreadyChecked.has(complement)){
            return true
        }
        alreadyChecked.add(array[i]);
    }
    return false;
}

response = checkSumNComplexity(parsedData, 0)
 
console.log(`Checking if sum exists returns: ${response} after ${comparison2} operations`);