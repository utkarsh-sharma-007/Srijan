var fs = require('fs');

var readable = fs.createReadStream("test", {
  encoding: 'utf8',
  fd: null,
}); 

let arr = [];
readable.on('readable', function() {
  var chunk, num;
  while (null !== (chunk = readable.read(1))) {
    if(chunk!=','){
      num = num ? num+chunk: chunk;
    }
    else{
      arr[parseInt(num)] = arr[parseInt(num)] ? arr[parseInt(num)]+1: 1;
      num = ''
    }
  }
});

readable.on('close',async function(){
  try{
    for(let i=0; i<=arr.length; i++){
      for(let j=0; j<arr[i]; j++){
        await fs.promises.appendFile('sortedNumbers',i.toString()+',')
      }
    }
    console.log('Updated the file')
  }catch(err){
    console.log(err)
  }
})