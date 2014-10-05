
function swap(arr, lhs, rhs) {
  var temp = arr[lhs];
  arr[lhs] = arr[rhs];
  arr[rhs] = temp;
}

function LexicographicPermutationGenerator(xs) {
  this.items = xs;
}

LexicographicPermutationGenerator.prototype.next =  function next() {
  var j = this.items.length - 1;
  while(this.items[j-1] >= this.items[j]) {
    j--;
    if(j === 0) {
      return null;
    }
  }
  var l = this.items.length;
  while(this.items[j-1] >= this.items[l-1]) {
    l--;
  };
  swap(this.items, j-1, l-1);
  var k = j + 1;
  l = this.items.length;
  while(k < l) {
    swap(this.items, k-1, l-1);
    k++;
    l--;
  }
  return this.items;
}

module.exports = {
  LexGen: LexicographicPermutationGenerator
};
/* //test
var lib = require('./lexicographicPermutation');
var thing = new lib.LexGen([1,2,3,4])
var i = 0;
while((stuff = thing.next()) !== null) {
  i++;
  console.log(stuff + " "+i);
}
*/
