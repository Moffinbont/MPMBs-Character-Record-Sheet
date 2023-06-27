var iFileName = "dysn-creatures.js";


RequiredSheetVersion("13.1.7");

CreatureList["testing-creature"] = {
	name : "Testing Creature",
	source : ["DYS", 1],
	size : [4, 3],
	type : ["Antsy", "Bezerk", "Callous"],
	subtype : ["2nd level", "3rd level", "4th level"],
	companion : "familiar",
	companionApply : "companion",
	alignment : "Unaligned",

	ac : 11,
	hp : 10,
	hd : [3, 6],

	speed : "30 ft, climb 30 ft",
	proficiencyBonus : 1,
	proficiencyBonusLinked : true,
	challengeRating : "\"-\"",
	scores : [15, 13, 12, 2, 13, 8],  /* [Str, Dex, Con, Int, Wis, Cha] */
	senses : "Darkvision 60 ft",
	attacksAction : 2,
	attacks : [{
		name : "Claws",
		ability : 1,
		damage : [2, 6, "slashing"],
		range : "Melee (5 ft)",
		description : "Two claws attacks as an Attack action"
	}],
	
	features : [{
		name : "False Appearance",
		description : "While the purple crawler remains motionless, it is indistinguishable from an ordinary purple flower.",
		joinString : "\n   "
	}],
	actions : [{
		name : "Invisibility",
		minlevel : 5,
		description : "As an action, the purple crawler magically turns invisible until it attacks or casts a spell, or until its concentration ends (as if concentrating on a spell).",
		addMod : [{ type : "skill", field : "all", mod : "max(oCha|1)", text : "The purple crawler adds its master's Charisma modifier (min 1) to all its skill checks." }]
	}],
	traits : [{
		name : "Keen Sight",
		minlevel : 8,
		description : "The purple crawler has advantage on Wisdom (Perception) checks that rely on sight. It size increases to Large.",
		eval : function(prefix, lvl) {
			// Increase size to Large
			PickDropdown(prefix + "Comp.Desc.Size", 2);
		},
		removeeval : function(prefix, lvl) {
			// Change size back to Medium
			PickDropdown(prefix + "Comp.Desc.Size", 3);
		}
	}],

// >>>>>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Companion Page Only >>> //
// >>>>>>>>>>>>>>>>>>>>>>>>>>> //
	header : "Teeheehee",
	calcChanges : {
		hp : function (totalHD, HDobj, prefix) {
			console.println("processing calcChanges - hp");
		},
		setAltHp : false,
	},

	eval : function(prefix, lvl) {
		console.println("processing eval");
	},
	removeeval : function(prefix, lvl) {
		console.println("processing removeeval");
	},
	changeeval : function(prefix, lvl) {
		console.println("processing changeeval");
	},
}
