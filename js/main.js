



$(document).ready(function() {
	init();
});

function init() {
	setWeaponIds();
	

	console.log('enemies : ', enemies);
	initPlayer();
	initEnemies();
	fillInventory();
	setEventListeners();

	$('#inventory_btn').click();
}

function setEventListeners() {
	$('#inventory_btn').on('click', function() {
		showInventory = true;
		showShop = false;
		showFight = false;
		manageScreen();
	});
	$('#shop_btn').on('click', function() {
		showInventory = true;
		showShop = true;
		showFight = false;
		manageScreen();
	});
	$('#fight_btn').on('click', function() {
		showInventory = false;
		showShop = false;
		showFight = true;
		refreshEquippedWeapons();
		manageScreen();
		initFight();
	});

	$('body').on('click', '.one-weapon', function(ev) {
		manageIsEquipped(ev.target.dataset.id);
	});

	$('body').on('click', '.one-enemy', function(ev) {
		let aimedTargetId = ev.target.dataset.id;
		currentTarget = enemies.filter(function(enemy) {
			return aimedTargetId == enemy.id;
		})[0];
		showTarget();
	});

}

var currentTarget;


function showTarget() {
	if($('#'+currentTarget.id).hasClass('is-target')) {
		$('.one-enemy').removeClass('is-target');
		return false;

	}
	$('.one-enemy').removeClass('is-target');
	$('#'+currentTarget.id).addClass('is-target');
}

function unselectAllTargets() {
}


function getAllEquippedWeapons(character) {
	let equippedWeapons = character.backpack.filter(function(weapon) {
		return character.equip.weaponIds.indexOf(weapon.id) != -1;
	});
	return equippedWeapons;
}

function getEquippedWeaponByIndex(character, idx) {
	return getAllEquippedWeapons(character)[idx];
}

function manageIsEquipped(weaponId) {
	// unequip if equipped
	if(player.equip.weaponIds.indexOf(weaponId) != -1) {
		player.equip.weaponIds.splice(player.equip.weaponIds.indexOf(weaponId), 1);
	} else {
		// remove first equipped if 3rd equipped
		if(player.equip.weaponIds.length == 2) {
			player.equip.weaponIds.splice(0, 1);
		}
		// just equip
		player.equip.weaponIds.push(weaponId);	
	}

	// adjust the view (in inventory)
	$('.one-weapon').removeClass('is-equipped');
	for (let i = 0; i < player.equip.weaponIds.length; i++) {
		$('#' + player.equip.weaponIds[i]).addClass('is-equipped');
	}
}

function manageScreen() {
	if(showInventory) {
		$('#inventory').show();
	} else {
		$('#inventory').hide();
	}

	if(showShop) {
		$('#shop').show();
	} else {
		$('#shop').hide();
	}

	if(showFight) {
		$('#fight').show();

	refreshEnemies();
	} else {
		$('#fight').hide();
	}
}




/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var screen = {
	showInventory: false,
	showShop: false,
	showFight: false
}

let allWeaponsMap = new Map();
allWeaponsMap.set('smgs', smgsList);
allWeaponsMap.set('snipers', snipersList);
allWeaponsMap.set('assaultRifles', assaultRiflesList);
allWeaponsMap.set('shotguns', shotgunsList);
allWeaponsMap.set('pistols', pistolsList);

var weapons_types = allWeaponsMap.keys();
var weaponIdCpt = 0;
var characterIdCpt = 0;

function setWeaponIds() {
	for (const [key, value] of allWeaponsMap.entries()) {
		for(let i=0; i<allWeaponsMap.get(key).length; i++) {
			allWeaponsMap.get(key)[i].id = ++weaponIdCpt;
		}
	}
}



let rarityToBackgroundCssRule = new Map();
rarityToBackgroundCssRule.set('White', 'background: linear-gradient(15deg, whitesmoke 60%, gray 130%);');
rarityToBackgroundCssRule.set('Green', 'background: linear-gradient(15deg, whitesmoke 60%, green 130%);');
rarityToBackgroundCssRule.set('Blue', 'background: linear-gradient(15deg, whitesmoke 60%, blue 130%);');
rarityToBackgroundCssRule.set('Purple', 'background: linear-gradient(15deg, whitesmoke 60%, purple 130%);');
rarityToBackgroundCssRule.set('Orange', 'background: linear-gradient(15deg, whitesmoke 60%, darkorange 130%);');

var playerData = {
	id: ++characterIdCpt,
	name: 'Roland',
	level: '1',
	isAlive: true,
	hp: 90,
	stats: {
		initiativeLastRoll: 0,
		initiativeBonus: 4,
		agility: {
			score: 14,
			bonus: 2,
		},
		weaponHandling: 12,
		luck: 11,
		maxHp: 90,
		shieldTempValue: 210
	},
	backpack: [],
	equip: {
		weaponIds: [],
		shieldId: null,
	},
	money: 80,
	skills: []
}

var player;

var enemiesDataList = [{
	id: ++characterIdCpt,
	name: 'Bandit recrue',
	level: '1',
	isAlive: true,
	hp: 35,
	stats: {
		initiativeLastRoll: 0,
		initiativeBonus: 1,
		agility: {
			score: 11,
			bonus: 0,
		},
		weaponHandling: 9,
		luck: 10,
		maxHp: 35,
		shieldTempValue: 70
	},
	backpack: [],
	equip: {
		weaponIds: [],
		shieldId: null,
	},
	money: 80,
},{
	id: ++characterIdCpt,
	name: 'Bandit recrue',
	level: '1',
	isAlive: true,
	hp: 55,
	stats: {
		initiativeLastRoll: 0,
		initiativeBonus: 2,
		agility: {
			score: 13,
			bonus: 1,
		},
		weaponHandling: 14,
		luck: 8,
		maxHp: 55,
		shieldTempValue: 70
	},
	backpack: [],
	equip: {
		weaponIds: [],
		shieldId: null,
	},
	money: 80,
}];

var enemies = [];

function initPlayer() {
	player = new Player(playerData);
	player.backpack.push(getRandomWeapon());
	player.backpack.push(getRandomWeapon());
	player.backpack.push(getRandomWeapon());
	player.backpack.push(getRandomWeapon());
	player.backpack.push(getRandomWeapon());
}

function initEnemies() {
	for(let i=0; i<enemiesDataList.length; i++) {
		enemies.push(new Character(enemiesDataList[i]));
	}

	for(let i=0; i<enemies.length; i++) {
		enemies[i].backpack.push(getRandomWeapon());
		enemies[i].backpack.push(getRandomWeapon());
		enemies[i].equip.weaponIds.push(enemies[i].backpack[0].id);
	}
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function getRandomWeapon() {
	let randomWeaponsType = getRandomMapKey(allWeaponsMap);
	let randomWeaponList = allWeaponsMap.get(randomWeaponsType);
	let randomWeaponData = randomWeaponList[getRandomInt(0,randomWeaponList.length-1)];
	return randomWeaponData;
}
function getRandomMapKey(theMap) {
    let keys = Array.from(theMap.keys());
    return keys[Math.floor(Math.random() * keys.length)];
}

function makeItemDom(data) {
	let op = '<div class="one-weapon" id="' + data.id + '" style="' + rarityToBackgroundCssRule.get(data.rarity) + '">';
			op += '<div class="catch-weapon-click" data-id="' + data.id + '"></div>';
			op += '<div class="item-top-container is-flex-row-nw-spbe">';
				op += '<div class="magazine-stat">';
					op += '<span>' + data.type + '</span><br/>';
					op += '<p>4</p>';
					op += '<img src="img/icons/bullet.png" alt="" />';
				op += '</div>';
				op += '<p class="item-name">' + data.name + '</p>';
				op += '<p class="item-rarity">' + '</p>';
			op += '</div>';
			op += '<div class="item-damages">';
				op += '<p class="dmg">' + data.dmg;
				if(data.bonus != null) {
					op += '<br /><span class="dmg-bonus">(+ ' + data.bonus + ')</span>';
				}
				op += '</p>';
			op += '</div>';
		op += '</div>';

	return op;
}

function fillInventory() {
	let inventoryDom = '';
	for(let i=0; i<player.backpack.length; i++) {
		inventoryDom += makeItemDom(player.backpack[i]); 
	}
	$('#inventory .weaponList').html(inventoryDom);
}


function refreshEquippedWeapons() {
	let op = '';
	let currentlyEquippedWeapons = [];
	for (var i = 0; i < player.backpack.length; i++) {
		// weaponIds has Strings, backpack has integers => comparing strings
		if(player.equip.weaponIds.indexOf(''+player.backpack[i].id) != -1) {
			currentlyEquippedWeapons.push(player.backpack[i]);
		}
	}
	for (var i = 0; i < currentlyEquippedWeapons.length; i++) {
		let w = currentlyEquippedWeapons[i]
		op += '<li id="playerWeapon_A" data-id="' + w.id + '">';
			op += '<div class="weaponName">';
				op += w.name + '<br/><span>(' + w.type + ')</span>';
			op += '</div>';
			op += '<div class="weaponDmg">';
				op += w.dmg;
				if(w.bonus != null) {
					op += '<br/><span>(' + w.bonus + ')</span>';
				}
			op += '</div>';
			op += '<button onclick="managePlayerShot(' + w.id + ')">Fire</button>';
		op += '</li>';
	}
	$('#equipped-weapons-container ul').html(op);
}

function getWeaponDamage(weapon, target) {
	let targetIsWeak = false
	let damageObj = {};

	let simpleDamageRoll = weapon.dmg;
	let bonusDamageRoll, bonusDamage = 0;
	let bonusDamageType;

	let simpleDamage = rolls(simpleDamageRoll).result.total
	damageObj.simpleDamage = simpleDamage;

	if(weapon.bonus != null) {
		bonusDamageRoll = weapon.bonus.split(' ')[0];
		bonusDamage = rolls(bonusDamageRoll).result.total;
		damageObj.bonusDamage = bonusDamage;
		bonusDamageType = weapon.bonus.split(' ')[1];
		damageObj.bonusDamageType = bonusDamageType;
		// debug
		// targetIsWeak = Math.random() > 0.5; // should recieve target as argument, test against type
		targetIsWeak = getweaknessesByAttackType(bonusDamageType).indexOf(target.type) != -1;
		damageObj.targetIsWeak = targetIsWeak;
	}

	let msg = 'Bang! This shot did ' + simpleDamage;
	if(bonusDamage) {
		msg += ' (+ ' + bonusDamage;
		if(bonusDamageType && targetIsWeak) {
			bonusDamage *= 2
			msg += ' doubled = ' + bonusDamage + ' !)';
		} else {
			msg += ')';
		}
	} else { 
		bonusDamage = 0; 
	}

	damageObj.bonusDamage = bonusDamage;
	msg += ' points of damage.'; 
	msg += '\nTotal : ' + (1*simpleDamage + 1*bonusDamage) + ' dmg.';

	damageObj.totalDamage = (1*simpleDamage + 1*bonusDamage);
	if(1*simpleDamage + 1*bonusDamage > 20) {
		msg += ' Ouch !';
	}
	console.log(msg);
	
	return damageObj;
}

function getweaknessesByAttackType(type) {
	let weaknesses = [];
	switch(type) {
		case 'corrosive':
			weaknesses.push('machine');
		break;
		case 'shock':
			weaknesses.push('shield');
		break;
		case 'fire':
			weaknesses.push('health');
		break;
		case 'explosive':
		break;
	}
	return weaknesses;
}

function managePlayerShot(wid) {
	if(!currentTarget) {
		return false;
	}

	let target = enemies.filter(function(enemy) {
		return currentTarget.id == enemy.id;
	})[0];
	let firedWeapon = player.backpack.filter(function(weapon) {
		return weapon.id == wid;
	})[0];

	manageShot(target, firedWeapon);
}

function manageShot(target, firedWeapon) {

	let damages = getWeaponDamage(firedWeapon, target);
	applyDamage(target, damages); // should be a method on character (private setter on hp and public method to modify)

}

function applyDamage(targetObj, damageObj) {
	targetObj.hp -= damageObj.totalDamage;
	if(targetObj.hp <= 0) {
		targetObj.hp = 0;
		console.log('targetObj.id : ', targetObj.id)
		targetObj.isAlive = false;
	}
	refreshEnemies();

}


function makeEnemyDom(data) {
	let op ='';
	for (var i = 0; i < data.length; i++) {
		let enemy = data[i];
		let classesCss = 'one-char one-enemy';
		if(currentTarget != null && currentTarget.id == enemy.id) {
			classesCss += ' is-target';
		}
		if(!enemy.isAlive) {
			classesCss += ' is-dead';	
		}
		let healthBarWidth = (100*enemy.hp) / (1*enemy.stats.maxHp);
		let enemyWeapons = getAllEquippedWeapons(enemy);

		op += '<li id="enemy_' + enemy.id + '" class="' + classesCss + '">';
			op += '<div class="catch-enemy-click" data-id="' + enemy.id + '"></div>';
			op += '<p>' + enemy.name + ' (lvl ' + enemy.level + ')</p>';
			op += '<div class="health-bar" data-hp="' + enemy.hp + '" data-hpmax="' + enemy.stats.maxHp + '"><div class="health-bar-content" style="width: ' +healthBarWidth+ '%;"></div></div>';
			op += '<p>health	: ' + enemy.hp + '/' + enemy.stats.maxHp + '</p>';
			op += '<p>shield	: ' + enemy.stats.shieldTempValue + '/' + enemy.stats.shieldTempValue + '</p>';
			op += '<p>' + enemyWeapons[0].name + '</p>';
		op += '<li>';
	}
	return op;
}

function refreshEnemies() {
	let enemiesDOM = makeEnemyDom(enemies);
	$('#enemies-container ul').html(enemiesDOM);
}







