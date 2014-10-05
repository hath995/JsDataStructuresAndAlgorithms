
function PlainChangePermutationGenerator(xs) {
  if(!xs || !xs.length) {
    throw new Error("Array of items required");
  }
  this.items = xs;
  this.directions = new Array(xs.length);
  this.offsets = new Array(xs.length);
  for(var i = 0; i < xs.length; i++) {
    this.directions[i] = 1;
    this.offsets[i] = 0;
  }

}

PlainChangePermutationGenerator.prototype.next = function next() {
  var j = this.items.length;
  var s = 0;
  while(true) {
    var q = this.offsets[j-1] + this.directions[j-1];
    if(q < 0) {
      this.directions[j-1] = 0-this.directions[j-1];
      j -= 1;
    }else if (q === j) {
      if(j === 1) {
          return null;
      }
      s += 1;
      this.directions[j-1] = 0-this.directions[j-1];
      j -= 1;
    }else{
      var cur = j - this.offsets[j-1] + s;
      var nex = j - q + s;
      var temp = this.items[nex-1];
      this.items[nex-1] = this.items[cur-1];
      this.items[cur-1] = temp;
      this.offsets[j-1] = q;
      break;
    }
  }
  return this.items;
}

module.exports = {
  plainChangeGen: PlainChangePermutationGenerator
};
/**
 * //test
 * var p = require('./plainChanges.js');
 * var thing = new p.plainChangeGen([1,2,3,4]);
 * var i = 0;
 * while((stuff = thing.next()) !== null) {
 *   i++;
 *   console.log(stuff + " "+i);
 * }
 **/
