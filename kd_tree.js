//KD Tree
var HORIZONTAL = 0;
var VERTICAL = 1;
function Kdtree(key,value,orientation,left,right) {
	this.value = value;
	this.key = key;
	this.left = left;
	this.right = right;
	this.orientation = orientation;
		
}

Kdtree.prototype.insert = function(point) {
	
	if(this.orientation == HORIZONTAL)
	{
		if(this.key > point.y)
		{
			if(this.left == undefined)
			{
				this.left = new Kdtree(point.x,point,VERTICAL);
			}else{
				this.left.insert(point);	
			}
		}else{
			if(this.right == undefined)
			{
				this.right = new Kdtree(point.x,point,VERTICAL);
			}else{
				this.right.insert(point);	
			}
		}
	}else{
		if(this.key > point.x)
		{
			if(this.left == undefined)
			{
				this.left = new Kdtree(point.y,point,HORIZONTAL);
			}else{
				this.left.insert(point);	
			}
		}else{
			if(this.right == undefined)
			{
				this.right = new Kdtree(point.y,point,HORIZONTAL);
			}else{
				this.right.insert(point);	
			}
		}
	}
};

Kdtree.prototype.range = function(xone,yone,xtwo,ytwo) {
	var matchingpoints = new Array();
	if(this.orientation == HORIZONTAL)
	{
		if(this.key > yone && this.key > ytwo) //RANGE FALLS BELOW POINT
		{
			if(this.left != undefined)
				matchingpoints = this.left.range(xone,yone,xtwo,ytwo); 
		}else if(this.key >= yone && this.key <= ytwo) { //POINT FALLS INSIDE RANGE
			var lhs = new Array();
			var rhs = new Array();
			if(this.left != undefined)
				lhs = this.left.range(xone,yone,xtwo,ytwo);
			if(this.right != undefined)
				rhs = this.right.range(xone,yone,xtwo,ytwo);
			
			if(this.value.x >= xone && this.value.x <= xtwo)
				matchingpoints.push(this.value);
			matchingpoints = matchingpoints.concat(lhs,rhs);
			
		}else{ //RANGE FALLS ABOVE POINT
			if(this.right != undefined)
				matchingpoints = this.right.range(xone,yone,xtwo,ytwo); 
		}
	}else{
		if(this.key > xone && this.key > xtwo) //RANGE FALLS TO THE LEFT
		{
			if(this.left != undefined)
				matchingpoints = this.left.range(xone,yone,xtwo,ytwo);
			
		}else if(this.key >= xone && this.key <= xtwo) { //POINT FALLS IN THE RANGE
			var lhs = new Array();
			var rhs = new Array();
			if(this.left != undefined)
				lhs = this.left.range(xone,yone,xtwo,ytwo);
			if(this.right != undefined)
				rhs = this.right.range(xone,yone,xtwo,ytwo);
			
			if(this.value.y >= yone && this.value.y <= ytwo)
				matchingpoints.push(this.value);
			
			matchingpoints = matchingpoints.concat(lhs,rhs);
		}else{ //RANGE FALLS TO THE RIGHT
			if(this.right != undefined)
				matchingpoints = this.right.range(xone,yone,xtwo,ytwo);
		}
	}
	return matchingpoints;
};

Kdtree.prototype.findPoint = function(x,y) {
	
};

Kdtree.prototype.inorderList = function() {
	var output = "";
	if(this.left != undefined)
	{
		output += this.left.inorderList() +" ";
	}
	output += this.value +" ";
	if(this.right != undefined)
	{
		output += this.right.inorderList() +" ";
	}
	return output;
};

Kdtree.prototype.height = function()
{
	var height = 1;
	var lhs =0;
	var rhs =0;
	if(this.left != undefined)
	{
		lhs = this.left.height();
	}
	if(this.right != undefined)
		rhs = this.right.height();
	height += Math.max(rhs,lhs);
		
	return height;	
};

function Point(x,y)
{
	this.x = x;
	this.y = y;
}

Point.prototype.toString = function()
{
	return "("+this.x+","+this.y+")";	
}


