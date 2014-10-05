
var identity = [1,2,3,4,5];
var other = [3,2,4,5,1];
function multiplyPerm(lhs, rhs) {
  if(lhs.length !== rhs.length) {
    throw new Error("Permutations of different lengths cannot be multiplied");
  }
  var result = new Array(lhs.length);
  for(var i = 0; i <lhs.length; i++) {
    result[i]=rhs[lhs[i]-1];
  }
  return result;
}
// perm [[1,3,4]] (1,2,3,4)->(4,2,1,3)
//(1,2,3,4)->(3,1,2,4)->(2,3,1,4)->(1,2,3,4)
function applyPerm(perm, items) {
  var result = new Array(items.length);
  for(var i = 0; i < items.length; i++) {
    result[i] = items[i];
  }
  for(var j=0; j<perm.length;j++) {
    for(var k=0; k<perm[j].length; k++) {
      if(k == perm[j].length-1) {
        result[perm[j][0]-1] = items[perm[j][k]-1];
      }else{
        result[perm[j][k+1]-1] = items[perm[j][k]-1];
      }
    }
  }
  return result;
}
console.log(multiplyPerm(identity, other)); //should get back other
console.log(multiplyPerm(other, other)); //should get back [4,2,5,1,3];

