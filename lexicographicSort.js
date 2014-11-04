function lexGen(field1, field2, field1_desc, field2_desc) {
  var flip1 = field1_desc ? -1 : 1;
  var flip2 = field2_desc ? -1 : 1;
  return function lexSort(a,b) {
    if(a[field1] > b[field1]) {
      return 1*flip1;
    }else if(a[field1] === b[field1]) {
      if(a[field2] > b[field2]) {
        return 1*flip2;
      }else if(a[field2] === b[field2]) {
        return 0;
      }else {
        return -1*flip2;
      }
    }else{
      return -1*flip1;
    }
  }
}

