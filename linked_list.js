
function LLNode(value, next) {
  this.value = value;
  this.next =  next || null;
}

function LinkedList(values) {
  this.head = null;
  if(Array.isArray(values)) {
    for(var i = 0; i < values.length; i++) {
     this.add(values[i]); 
    }
  }else{
    head = new LLNode(values);
  }
}

LinkedList.prototype.add = function(value) {
  this.head = new LLNode(value, this.head);
};


module.exports = {
  LinkedList: LinkedList,
  LLNode: LLNode
};
