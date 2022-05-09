
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeMapByAttrFromList(list, attrName) {
	if(!attrName) {
		attrName = 'name';
	}
	let tempMap = new Map();
	for (var i = 0; i < list.length; i++) {
		let elem = list[i];
		if(tempMap.get(elem[attrName]) != null) {
			let tempList = tempMap.get(elem[attrName]);
			tempList.push(elem);
			tempMap.set(elem[attrName], tempList);
		} else {
			tempMap.set(elem[attrName], [elem]);
		}
	}
	return tempMap;
}

/** 
@str : must be ex: 3d6+6 
*/
function rollsWithMod(str, mod) {
	if(mod == undefined) {
		return rolls(str);
	}
	let r1 = rolls(str);
	let r2 = rolls(str);
	
	let res = r1 > r2 ? mod ? r1 : r2 : mod ? r2 : r1;
	let debugMsg = 'Rolling ' + str + ' with ';
	debugMsg += mod ? 'advantage' : 'disadvantage';
	debugMsg += ' -> ' + res;
	console.log('Rolls with '+mod+' ('+str+') : ' + r1 + ' and ' + r2 + ' => ' + res);
	return res;
}

function rolls(str) { // ex: 3d6+4
	if(str.split('d') != null && str.split('d').length != 2) {
		return null;
	}
	let result = 0;
	let staticBonus = 0;
	let nbDice = parseInt(str.split('d')[0]);// ex: 3
	let mods = str.split('d')[1];// ex: 6+4 (string)
	let typeDice = mods.split(new RegExp('[+-]', 'g'))[0];// ex: 6
	if(mods.split(new RegExp('[+-]', 'g')).length == 2) {
		staticBonus = parseInt(mods.split(new RegExp('[+-]', 'g'))[1]);// ex: 4
	}
	let individualRollsStr = '(';
	for(let i=0; i<nbDice; i++) {
		let individualRoll = getRandomInt(1, typeDice);
		result += individualRoll;
		individualRollsStr += individualRoll + ' + ';
	}
	individualRollsStr.length = individualRollsStr.length - 3;
	individualRollsStr += ')';
	if(mods.indexOf('-') != -1) {
		staticBonus *= -1;
	}
	result += staticBonus;
	//console.log('Roll ('+str+') : ' + individualRollsStr + ' + ' + staticBonus + ' => ' + result);
	return result;
}

function roll(d) {
	return getRandomInt(1, d);
}

function removeLowest(arr) {
	arr.sort().shift();
}

function rollStat() {
	let statRolls = [];
	statRolls.push(roll(6));
	statRolls.push(roll(6));
	statRolls.push(roll(6));
	statRolls.push(roll(6));
	removeLowest(statRolls);
	return statRolls.reduce((a, b) => a + b, 0);
}



function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}