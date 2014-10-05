function qs(xarr) {
  if(xarr.length == 0)
     return [];
  var x = xarr.shift();
  var lessthanx = qs(xarr.filter(function(elem){return elem <= x}));
  var greaterthanx = qs(xarr.filter(function(elem){return elem > x}));
  lessthanx.push(x)
  var result = lessthanx.concat(greaterthanx);
  return result;
}
