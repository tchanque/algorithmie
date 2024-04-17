const fs = require('fs');
const { parse } = require('path');
const fileName = process.argv[2];
let data;

// Read the data file
try {
    data = fs.readFileSync(fileName, 'utf8');
    // console.log(data);
} catch (error) {
    console.error(error.message);
}

// Define the parsing function to turn the string into an array of integers
let parseData = (data) => {
    let parsedData = data.split(" ").map((element) => parseInt(element));
    return parsedData;
};

let parsedData = parseData(data)

let selectionSorting = (array) => {
    n = array.length;
    for (let i=0; i<n-1; i++) {

        let unsortedArray = array.slice(i,n)

        let minValue = unsortedArray[0];        
        let indexMinValue = 0;

        for (let j=1; j < unsortedArray.length; j++) {
            if (unsortedArray[j] < minValue) {
                minValue = unsortedArray[j]
                indexMinValue = j;
            }
        }

        console.log("Min value is " + minValue)
        
        let temp = array[i]
        array[i] = minValue
        array[i+indexMinValue] = temp
    }

    return array;
}

// console.log(selectionSorting(parsedData))

let quickSorting = (array) => {
    if (array.length <= 1) {
        return array;
    }

    const pivot = array[0];
    const left = [];
    const right = [];

    for (let i=1; i < array.length; i++) {
        if (array[i] < pivot) {
            left.push(array[i]);
        }
        else {
            right.push(array[i]);
        }
    }
    return [...quickSorting(left), pivot, ...quickSorting(right)];
}

// console.log(quickSorting(parsedData));

// SORT BY BUBBLE SORT ----------------------------------------------------------------------------
let bubbleSorting = (array, n, comparisons) => {
    if (n==0) {
        return [array, comparisons];
    }

    for (i = 0; i < n-1; i++) { // 1st iteration => n = parsedData.length (5)
        comparisons++;
        if(array[i] > array[i + 1]) {
            const temp = array[i];
            array[i] = array[i+1];
            array[i+1] = temp;
        }
    }
   return bubbleSorting(array, n-1, comparisons);
}

// let [sortedData, comparisons] = bubbleSorting(parsedData, parsedData.length, 0)
// console.log(`The bubble sorting returns ${sortedData} after ${comparisons} comparisons`);


class SortingAlgo {
    constructor(fileName) {
        this.fileName = fileName
        this.data = this.readData()
        this.parsedData = this.parseData()
        console.log(`Parsed data : ${this.data}`)
    }

    // Read the data file
    readData() {
        try {
            return fs.readFileSync(this.fileName, 'utf8');
            // console.log(data);
        } catch (error) {
            console.error(error.message);
            return error;
        }
    }

    parseData() {
        return this.data.split(" ").map((element) => parseInt(element));
    }

    bubbleSorting (unsortedArray, n, comparisons) {
        let array = unsortedArray;
        
        if (n==0) {
            return [array, comparisons];
        }
    
        for (let i = 0; i < n-1; i++) { // 1st iteration => n = parsedData.length (5)
            comparisons++;
            if(array[i] > array[i + 1]) {
                const temp = array[i];
                array[i] = array[i+1];
                array[i+1] = temp;
            }
        }
       return bubbleSorting(array, n-1, comparisons);
    }

    insertionSort(unsortedArray) {
        let comparisons = 0; // Initialize the comparison counter
        const array = [...unsortedArray]; // Create a copy of the array to keep the original unmodified

        for (let i = 1; i < array.length; i++) {
            const temp = array[i];
            let j = i - 1;
            while (j >= 0 && array[j] > temp) {
                comparisons++;
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = temp;
        }

        return [array, comparisons]; // Return the sorted array and the number of comparisons
    }
    
    selectionSort(array) {
        let comparisons = 0; // Initialize the comparison counter
        const n = array.length;
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                comparisons++; // Increment the comparison counter for each comparison
                if (array[j] < array[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                [array[i], array[minIndex]] = [array[minIndex], array[i]];
            }
        }
        return [array, comparisons]; // Return the sorted array and the number of comparisons
    }

    quickSorting(array) {
        let comparisons = 0;
        if (array.length <= 1) {
            return array;
        }
    
        const pivot = array[0];
        const left = [];
        const right = [];
    
        for (let i=1; i < array.length; i++) {
            comparisons++;
            if (array[i] < pivot) {
                left.push(array[i]);
            }
            else {
                right.push(array[i]);
            }
        }
        return [[...quickSorting(left).slice(0), pivot, ...quickSorting(right).slice(0)], comparisons];
    }
    
    runBenchmark() {
        console.log(this.parsedData)

        // var [sortedData, comparisons] = this.bubbleSorting(this.parsedData, this.parsedData.length, 0)
        // console.log(`The bubble sorting returns ${sortedData} after ${comparisons} comparisons`)

        // var [sortedData, comparisons] = this.insertionSort(this.parsedData)
        // console.log(`The insertion sorting returns ${sortedData} after ${comparisons} comparisons`)

        // var [sortedData, comparisons] = this.selectionSort(this.parsedData)
        // console.log(`The selection sorting returns ${sortedData} after ${comparisons} comparisons`)

        // Assuming quickSorting function is defined elsewhere

        // Call quickSorting function and retrieve sortedData and comparisons
        var [sortedData, comparisons] = this.quickSorting(this.parsedData);

        // Print the sorted array and the number of comparisons
        console.log(`The quick sorting returns ${sortedData} after ${comparisons} comparisons`);

    }
};

console.log(fileName)
let list = new SortingAlgo(fileName)
// list.runBenchmark()


function quickSort(array) {
    // Helper function to perform the partitioning
    function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                // Swap arr[i] and arr[j]
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            // Increment comparison count for each comparison made
            comparisons++;
        }

        // Swap arr[i+1] and arr[high] (pivot)
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

        return i + 1;
    }

    // Recursive function to perform quicksort
    function quickSortRecursive(arr, low, high) {
        if (low < high) {
            const pivotIndex = partition(arr, low, high);

            // Recursively sort elements before and after the partition
            quickSortRecursive(arr, low, pivotIndex - 1);
            quickSortRecursive(arr, pivotIndex + 1, high);
        }
    }

    // Initialize comparisons count
    let comparisons = 0;

    // Make a copy of the array to avoid modifying the original array
    const sortedArray = [...array];

    // Call the recursive quickSort function
    quickSortRecursive(sortedArray, 0, sortedArray.length - 1);

    // Return the sorted array and the number of comparisons made
    return { sortedArray, comparisons };
}

// Example usage:
const array = parsedData;
const { sortedArray, comparisons } = quickSort(array);
console.log("Sorted Array:", sortedArray);
console.log("Number of comparisons:", comparisons);