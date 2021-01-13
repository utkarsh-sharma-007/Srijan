const readline = require('readline');
const fs = require('fs');

const functionCalled = {};

const readInterface = readline.createInterface({
    input: fs.createReadStream('errorLog'),
});

readInterface.on('line', function(line) {
    if(line.includes("SprintsController")){
        line.split(" ").forEach(v=>{
            if(v.includes("SprintsController")){
                functionCalled[v.split("#")[1]] = functionCalled[v.split("#")[1]] ? functionCalled[v.split("#")[1]]+1 : 1;
            }
        })
    }
});

readInterface.on('close',function(){
    Object.entries(functionCalled).forEach(v=>{
        console.log(`SprintsController => ${v[0]} action ran ${v[1]} times`)
    })
})