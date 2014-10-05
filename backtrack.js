
function accept(data,iterations) {
	var leftparens = 0;
	var right = 0;
	var totalleft = 0, totalright = 0;
	for(var i=0; i < data.length; i++) {
		if(data[i]==='(') {
			leftparens++;
			totalleft++; 
		}else if(data[i] === ')') {
			totalright++;
			if(leftparens > 0) {
				leftparens--;
			}else{
				right++;
			}
		}
	}
	return right === 0 && totalleft === iterations && totalright === iterations;
}

function reject(data,iterations) {
	var leftparens = 0;
	var right = 0;
	var totalleft = 0, totalright = 0;
	for(var i=0; i < data.length; i++) {
		if(data[i]==='(') {
			totalleft++;
			leftparens++;
		}else if(data[i] === ')') {
			if(leftparens > 0) {
				leftparens--;
			}else{
				right++;
			}
		}
	}
	return right !== 0 || totalleft > iterations;
}
//[[['(',')']],[['(',')']]]
function flatten(arr) {
	var flatarr = [];
	for(var i = 0; i < arr.length; i++) {
		var lowarr = arr[i];
		for(var j = 0; j < lowarr; j++) {
			flattarr.push(arr[i][j]);
		}
	}
	return flatarr;	
}

function parenbacktrack(data,iterations) {
	var solutions = [];
	if(reject(data,iterations)) {
		return null;
	}
	if(accept(data,iterations)) {
		console.log(data.join(""));
		//return data;
	}
	var childleft = data.slice();
	childleft.push('(');
	var childright = data.slice();
	childright.push(')');
	var leftresult =parenbacktrack(childleft,iterations);
	//if(leftresult !== null) {
	//	if(typeof leftresult[0][0] !== "string") {
	//		leftresult = flatten(leftresult);	
	//	}
	//	solutions.push(leftresult);
	//}
	var rightresult = parenbacktrack(childright,iterations);
	//if(rightresult !== null) {
	//	if(typeof rightresult[0][0] !== "string") {
	//		rightresult = flatten(rightresult);	
	//	}
	//	solutions.push(rightresult);
	//}
	
	//return solutions;
	
}

exports.bt = parenbacktrack;

