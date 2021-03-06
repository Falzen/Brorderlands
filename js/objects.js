
class Character {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.level = data.level;
        this.hp = data.hp; // maxHp should be in stats
        this.stats = data.stats;
        this.equip = data.equip;
        this.backpack = data.backpack;
        this.money = data.money;
        this.isAlive = data.isAlive;
        this.takeDamage = function(amount) {
            console.log('player takes damage : ', damage);
        }
    }
}

class Player extends Character {
    constructor(data) {
        super(data);
        this.skills = data.skills;
    }
}

class BuyAndSell_Methods {
    constructor(data) {
    	this.sellingPrice = data.sellingPrice;
    	this.buyingPrice = data.buyingPrice;
    }
    buy(event) {
    	console.log('buy()');
    }
    sell(event) {
    	console.log('sell()');
    }
}





class Weapon extends BuyAndSell_Methods {
    constructor(data) {
        super(data);
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.rarity = data.rarity;
        this.dmg = data.dmg;
        this.bonus = data.bonus;
        this.description = data.description;
        this.magazine = data.mag ? data.mag : 4;
    }
    //  doEffect(event, rivetsBinding) {
    //      this.doEffect(event, rivetsBinding);
    //  }
}





class Item_Entity extends BuyAndSell_Methods {
    constructor(data) {
        super(data);
        this.name = data.name;
        this.description = data.description;
        this.isAvailableInFight = data.isAvailableInFight;
        this.iconPath = data.iconPath;
        this.quantity = data.quantity;
        this.doEffect = data.doEffect;
    }
    //  doEffect(event, rivetsBinding) {
    //      this.doEffect(event, rivetsBinding);
    //  }
}


class Equipment_Entity extends BuyAndSell_Methods {
    constructor(data) {
    	console.log('data.bonuses : ', data.bonuses);
        super(data);
    	this.type = data.type;
		this.name = data.name;
		this.iconPath = data.iconPath;
		this.description = data.description;
		this.damageDice = data.damageDice;
		this.bonuses = {
		};
		this.isEquipment = true;
		this.isEquipped = false;
	}
}









