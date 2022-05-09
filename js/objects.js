
class Character {
    constructor(data) {
        this.name = data.name;
        this.level = data.level;
        this.stats = {
        };
        this.equip = data.equip;
        this.backpack = data.backpack;
        this.money = data.money;
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









