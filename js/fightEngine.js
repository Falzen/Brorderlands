
var fightSettings = {
	isFightOver: false,
	turnNb: 0,
	entities: [... enemies], // all fighting entities, player will be added
	whoseTurnIndex: 0, // entities will be sorted by initiative, so whoseTurnIndex = 0
	turnOrderById: [],
	isPlayerTurn: false,
}
var fs;

function initFight() {
	fightSettings.entities = [... enemies, player];
	rollInitiative(fightSettings.entities);
	fightSettings.entities.sort(sortFightOrder);
	fightSettings.whoseTurnIndex = 0;

	fs = fightSettings;


	// start fight loop (until fs.isFightOver == true)
	fightEngineLoop();
}

function fightEngineLoop() {
	let character = fs.entities[fs.whoseTurnIndex];
	fs.isPlayerTurn = character.id == player.id

	doTurn(character);

	if(!fs.isPlayerTurn) {
		setTimeout(() => {
			fightEngineLoop();
		}, 1000);
	}
}

function getNextEntityIndex() {
	if(fs.whoseTurnIndex + 1 == fs.entities.length) {
		return 0;
	}
	return fs.whoseTurnIndex + 1;
}

function doTurn(character) {
	// enemy turn
	if(!fs.isPlayerTurn) {
		doEnemyturn(character);
	} else {
		let action = prompt('your turn ! 2 choices : "shoot" or "reload". What will it be?');
		alert(action + ' !!!');
	}


}

function rollInitiative(arr) {
	for(let i=0; i<arr.length; i++) {
		arr[i].stats.initiativeLastRoll = roll(20);
	}
}

function sortFightOrder( a, b ) {
  if ((a.stats.initiativeLastRoll + a.stats.initiativeBonus) > (b.stats.initiativeLastRoll + b.stats.initiativeBonus)){
    return -1;
  }
  if ((a.stats.initiativeLastRoll + a.stats.initiativeBonus) > (b.stats.initiativeLastRoll + b.stats.initiativeBonus)){
    return 1;
  }
  return 0;
}


function doEnemyturn(enemy) {
	let equippedWeaponList = getAllEquippedWeapons(enemy);
	if(equippedWeaponList.length == 0) {
		return;
	}
	let equippedWeapon = equippedWeaponList[0];

	manageShot(player, equippedWeapon);
}


