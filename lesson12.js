// LESSON 12: PROMISE CHAINS - THE ASYNC REVOLUTION!

const fs = require('fs');
const path = require('path');
const os = require('os');

console.log("=== LESSON 12: PROMISE CHAINS ===" + os.EOL);

// SECTION 1: Your First Promise!
console.log("SECTION 1: Creating Your First Promise"); 

const myFirstPromise = new Promise((resolve, reject) => {
    console.log("Promise is working...");

    setTimeout(() => {
        const success = true; // Change this to false to see rejection!

        if (success) {
            resolve("Promise SUCCESS!");
        } else {
            reject("Promise FAILED!");
        }
    }, 2000);
});

myFirstPromise
    .then(result => {
        console.log("SUCCESS:", result);
    })
    .catch(error => {
        console.log("ERROR:", error);
    });

console.log("I can do other things while waiting" + os.EOL);

// SECTION 2: Promise States Demo
setTimeout(() => {
    console.log("SECTION 2: Promise States Demo");

    // Pending Promise
    const pendingPromise = new Promise((resolve, reject) => {
        // Never resolves - stays pending forever!
    });
    console.log("Pending Promise:", pendingPromise);

    // Resolved Promise
    const resolvedPromise = Promise.resolve("I'm resolved!");
    console.log("Resolved Promise:", resolvedPromise);

    // Rejected Promise 
    const rejectedPromise = Promise.reject("I'm rejected!");
    rejectedPromise.catch(() => {}); // Prevent uncaught error
    console.log("Rejected Promise:", rejectedPromise);

    console.log("");
}, 3000);

// Section 3: Promise Chaining Magic!
setTimeout(() => {
    console.log("SECTION 3: Promise Chaining Magic!");

    function processNumber(num) {
        return new Promise((resolve, reject) => {
            if (typeof num !== 'number') {
                reject(new Error('Must be a numebr!'));
                return;
            }

            setTimeout(() => {
                console.log(`Processing ${num}...`);
                resolve(num * 2);
            }, 1000);
        });
    }

    processNumber(5)
        .then(doubled => {
            console.log("Step 1 - Doubled:", doubled);
            return processNumber(doubled);
        })
        .then(doubledAgain => {
            console.log("Step 2 - Doubled again:", doubledAgain);
            return doubledAgain + 10;
        })
        .then(final => {
            console.log("Step 3 - Added 10:", final);
            console.log("CHAIN COMPLETE! Final result:", final);
        })
        .catch(error => {
            console.log("Chain failed:", error.message);
        });

}, 4000);

// SECTION 4: Real File Operations!
setTimeout(() => {
    console.log(os.EOL + "SECTION 4: File Operations with Promises");

    const fs = require('fs').promises;

    //First, let's create a test file
    const testData = "Apple" + os.EOL + "Banana" + os.EOL + "Cherry" + os.EOL + "Date" + "Eggplant";
    
    fs.writeFile('fruits.txt', testData)
        .then(() => {
            console.log("File created successfully!");
            return fs.readFile('fruits.txt', 'utf8');
        })
        .then(data => {
            console.log("File read successfully!");
            console.log("Raw data:", data);
            return data.split(os.EOL);
        })
        .then(fruits => {
            console.log("Data split into array!");
            console.log("Fruits array:", fruits);
            return fruits.filter(fruit => fruit.length > 5);
        })
        .then(longFruits => {
            console.log("Filtered long fruit names!");
            console.log("Long fruits:", longFruits);
            return longFruits.map(fruit => fruit.toUpperCase());
        })
        .then(upperFruits => {
            console.log("Converted to uppercase!");
            console.log("UPPER FRUITS:", upperFruits);

            // Save the processed data
            return fs.writeFile('processed_fruits.txt', upperFruits.join(os.EOL));
        })
        .then(() => {
            console.log("Processed data saved!");
            console.log("FILE PROCESSING CHAIN COMPLETE!");
        })
        .catch(error => {
            console.log("File operation failed:", error.message);
        });
}, 10000);

// SECTION 5: Download Simulation!
setTimeout(() => {
    console.log(os.EOL + "SECTION 5: Download Simulation");

    function downloadData(url) {
        return new Promise((resolve, reject) => {
            if (!url || typeof url !== 'string') {
                reject(new Error('URL must be a valid string!'));
                return;
            }

            console.log(`Downloading from ${url}...`);

            setTimeout(() => {
                const data = `Data from ${url}`;
                resolve(data);
            }, 1500);
        });
    }

    downloadData('https://api.users.com')
        .then(userData => {
            console.log("Got user data:", userData);
            return downloadData('https://api.posts.com');
        })
        .then(postData => {
            console.log("Got post data:", postData);
            return downloadData('https://api.comments.com');
        })
        .then(commentData => {
            console.log("Got comment data:", commentData);
            console.log("ALL DOWNLOADS COMPLETE!");
        })
        .catch(error => {
            console.log("Download failed:", error.message);
        });
        
}, 15000);

// SECTION 6: Error Handling Demo!
setTimeout(() => {
    console.log(os.EOL + "SECTION 6: Error Handling Demo");

    function riskyOperation(shouldFail = false) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldFail) {
                    reject(new Error('Something went wrong!'));
                } else {
                    resolve('Operation sucessful!');
                }
            }, 1000);
        });
    }

    // Success case
    riskyOperation(false)
        .then(result => {
            console.log("SUCCESS CASE:", result);
        })
        .catch(error => {
            console.log("ERROR CASE:", error.message);
        });
    
    // Failure case 
    setTimeout(() => {
        riskyOperation(true)
            .then(result => {
                console.log("SUCCESS CASE:", result);
            })
            .catch(error => {
                console.log("ERROR CASE:", error.message);
            });
    }, 1500);
}, 20000);

// SECTION 7: Your Challenge!
setTimeout(() => {
    console.log(os.EOL + "SECTION 7: YOUR CHALLENGE!");
    console.log("Try modifying the code above:");
    console.log("1. Change success to false in Section 1");
    console.log("2. Try passing a string to processNumber()");
    console.log("3. Change a URL to null in the download section");
    console.log("4. Create your own promise chain!");
    console.log(os.EOL + "LESSON 12 COMPLETE! You're now an ASYNC WIZARD!");
}, 25000);

console.log("PROMISE CHAINS LESSON STARTED!");
console.log("Watch the magic unfold over the next 25 seconds..." + os.EOL);


