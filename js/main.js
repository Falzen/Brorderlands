



$(document).ready(function() {
	init();
});

function init() {
	setWeaponIds();
	player = new Player(playerData);
	console.log('player : ', player);
	initPlayer();
	fillInventory();
	setEventListeners();

	$('#inventory_btn').click();
}

function setEventListeners() {
	$('#inventory_btn').on('click', function() {
		console.log('click inventory');
		showInventory = true;
		showShop = false;
		showFight = false;
		manageScreen();
	});
	$('#shop_btn').on('click', function() {
		console.log('click shop');
		showInventory = true;
		showShop = true;
		showFight = false;
		manageScreen();
	});
	$('#fight_btn').on('click', function() {
		console.log('click fight');
		showInventory = false;
		showShop = false;
		showFight = true;
		refreshEquippedWeapons();
		manageScreen();
	});

	$('body').on('click', '.one-weapon', function(ev) {

		
		manageIsEquipped(ev.target.dataset.id);
	});

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
	name: 'Roland',
	level: '1',
	stats: {},
	backpack: [],
	equip: {
		weaponIds: [],
		shieldId: null,
	},
	money: 80,
	skills: []
}

var player;

function initPlayer() {
	player.backpack.push(getRandomWeapon());
	player.backpack.push(getRandomWeapon());
	player.backpack.push(getRandomWeapon());
	player.backpack.push(getRandomWeapon());
	player.backpack.push(getRandomWeapon());
	console.log('player.backpack : ', player.backpack);
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function getRandomWeapon() {
	let randomWeaponsType = getRandomMapKey(allWeaponsMap);
	let randomWeaponList = allWeaponsMap.get(randomWeaponsType);
	let randomWeapon = randomWeaponList[getRandomInt(0,randomWeaponList.length-1)];
	console.log('randomWeapon : ', randomWeapon);
	return randomWeapon;
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
	console.log('currentlyEquippedWeapons : ', currentlyEquippedWeapons);
	for (var i = 0; i < currentlyEquippedWeapons.length; i++) {
		let w = currentlyEquippedWeapons[i]
		op += '<div id="playerWeapon_A" data-id="' + w.id + '">';
			op += '<div class="weaponName">';
				op += w.name + '<br/><span>(' + w.type + ')</span>';
			op += '</div>';
			op += '<div class="weaponDmg">';
				op += w.dmg;
				if(w.bonus != null) {
					op += '<br/><span>(' + w.bonus + ')</span>';
				}
			op += '</div>';
			op += '<button onclick="fireWeaponById(' + w.id + ')">Fire</button>';
		op += '</div>';
	}
	$('#equipped-weapons-container ul').html(op);
}












