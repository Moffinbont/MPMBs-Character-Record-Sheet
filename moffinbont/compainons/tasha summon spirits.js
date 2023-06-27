/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file.
	You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded sheet or to first reset sheet.
	Thus you don't run the risk of things that have already been filled out causing conflicts.

	-HOW TO READ-
	Every line comes with a comment immediately after it to show whether it is // Optional // or // Required //,
	followed by a more explanatory comment

	-THIS IS JAVASCRIPT-
	The imports scripts work by creating a new entry inside an existing object or by calling functions.
	You can create new or overwrite existing global variables by omitting 'var'.
	You will need to understand the basics of JavaScript variables: strings, arrays, and JSON objects.
	Note that every opening symbol must have its closing counterpart: (), {}, [], "", ''.
	If these are not present, the code will give an error when imported.
	Use proper editing software for code (like Notepad++). Text processors like Microsoft Word will screw up your code.
	To help finding syntax errors, use (online) code checking software like https://jshint.com

	-COMMENTS IN THE EXAMPLE-
	Anything on a line after two forward slashes is a comment and will be ignored when running the code.
	Multiline comments are possible. Open them using the forward slash followed by an asterisk and close them with the opposite.
	The below contains a lot of these comments. The comments are not necessary for the script to work, so feel free to remove them.
*/

/*	-INFORMATION-

	Subject:	Creature

	Effect:		This is the syntax for adding a new creature to the sheet,
	        	for use on the companion and wild shape pages.

	Remarks:	You will also need the syntax for adding a weapon if you want the creature
	        	to have attack options.
	        	You will also need the syntax for adding a source if you want the creature
				to have a source that doesn't yet exist in the sheet.
	        	You will also need the syntax for common attributes if you want to use a
	        	custom calculation for hit points (calcChanges.hp).

	Sheet:		v13.1.0 and newer

*/

var iFileName = "Tasha Summon Spirits";


RequiredSheetVersion("13.0.6");

CompanionList["summon"] = {

	name : "Summon",

	nameMenu : "Summon",

	nameOrigin : "(TCoE Summon Spell)",

	source : ["TCoE", 109],

	notes : [{
		name : "The creature is an ally to you and your companions.",
		description : "",
		joinString : ""
	}, {
		name : "In combat",
		description : "the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger.",
	joinString : ", "
	}],

	attributesAdd : {
		features : [{
			name : "Summon Spell",
			description : "The creature disappears when it drops to 0 hit points or when the spell ends."
		}]
	},

	attributesChange : function(sCrea, objCrea) {
		//console.println("Companion.Layers.Remember: " + What("Companion.Layers.Remember"));
		//console.println("Companion.Remember: " + What("Companion.Remember"));
		console.println(tDoc.getField("Comp").valueAsString);
		console.println("Template.extras.AScomp: " + What("Template.extras.AScomp"));


	},

}

CreatureList["bestial spirit land"] = {

	name : "Bestial Spirit - Land",
	source : ["TCoE", 109],
	size : 4,
	type : "Beast",
	header : "Summon",
	companion : ["summon"],
	companionApply : "summon",
	alignment : "Unaligned",

	ac : 11,
	hp : 30,
	hd : [2, 6],
	speed : "30 ft, climb 30 ft",

	proficiencyBonus : 0,
	proficiencyBonusLinked : true,
	challengeRating : "\"-\"",
	scores : [18, 11, 16, 4, 14, 5],

	senses : "Darkvision 60 ft",
	languages : "understands the languages you speak",

	attacksAction : 1,
	attacks : [{
		name : "Maul",
		ability : 1,
		useSpellcastingAbility : true,
		abilitytodamage : true,
		damage : [1, 8, "piercing"],
		modifiers : ["", 2],
		range : "Melee (5 ft)",
		description : "Multiattack: Maul number of times equal to half the spell's level"
	}],

	features : [{
		name : "Summon Beast",
		description : "You call forth a bestial spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Bestial Spirit stat block. When you cast the spell, choose an environment: Air, Land, or Water. The creature resembles an animal of your choice that is native to the chosen environment, which determines certain traits in its stat block.",
		joinString : "\n   "
	}],
	actions : [{
		name : "Multiattack",
		description : "The beast makes a number of attacks equal to half this spell's level (rounded down)",
		
	}],
	traits : [{
		name : "Pack Tactics",
		description : "The beast has advantage on an attack roll against a creature if at least one of the hyena's allies is within 5 ft of the creature and the ally isn't incapacitated."
	}],
}

CreatureList["bestial spirit water"] = {

	name : "Bestial Spirit - Water",
	source : ["TCoE", 109],
	size : 4,
	type : "Beast",
	header : "Summon",
	companion : ["summon"],
	companionApply : "summon",
	alignment : "Unaligned",

	ac : 11,
	hp : 30,
	hd : [2, 6],
	speed : "30 ft, swim 30 ft",

	proficiencyBonus : 0,
	proficiencyBonusLinked : true,
	challengeRating : "\"-\"",
	scores : [18, 11, 16, 4, 14, 5],

	senses : "Darkvision 60 ft",
	languages : "understands the languages you speak",

	attacksAction : 1,
	attacks : [{
		name : "Maul",
		ability : 1,
		useSpellcastingAbility : true,
		abilitytodamage : true,
		modifiers : ["", 2],
		damage : [1, 8, "piercing"],
		range : "Melee (5 ft)",
		description : "Multiattack: Maul number of times equal to half the spell's level"
	}],

	features : [{
		name : "Summon Beast",
		description : "You call forth a bestial spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Bestial Spirit stat block. When you cast the spell, choose an environment: Air, Land, or Water. The creature resembles an animal of your choice that is native to the chosen environment, which determines certain traits in its stat block.",
		joinString : "\n   "
	}],
	actions : [{
		name : "Multiattack",
		description : "The beast makes a number of attacks equal to half this spell's level (rounded down)",	
	}],
	traits : [{
		name : "Pack Tactics",
		description : "The beast has advantage on an attack roll against a creature if at least one of the hyena's allies is within 5 ft of the creature and the ally isn't incapacitated."
	},{
		name : "Water Breathing",
		description : "The beast can breathe only underwater."
	}],
}

CreatureList["bestial spirit air"] = {

	name : "Bestial Spirit - Air",
	source : ["TCoE", 109],
	size : 4,
	type : "Beast",
	header : "Summon",
	companion : ["summon"],
	companionApply : "summon",
	alignment : "Unaligned",

	ac : 11,
	hp : 20,
	hd : [2, 6],
	speed : "30 ft, fly 60 ft",

	proficiencyBonus : 0,
	proficiencyBonusLinked : true,
	challengeRating : "\"-\"",
	scores : [18, 11, 16, 4, 14, 5],

	senses : "Darkvision 60 ft",
	languages : "understands the languages you speak",

	attacksAction : 1,
	attacks : [{
		name : "Maul",
		ability : 1,
		useSpellcastingAbility : true,
		abilitytodamage : true,
		damage : [1, 8, "piercing"],
		modifiers : ["", 2],
		range : "Melee (5 ft)",
		description : "Multiattack: Maul number of times equal to half the spell's level"
	}],

	features : [{
		name : "Summon Beast",
		description : "You call forth a bestial spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Bestial Spirit stat block. When you cast the spell, choose an environment: Air, Land, or Water. The creature resembles an animal of your choice that is native to the chosen environment, which determines certain traits in its stat block.",
		joinString : "\n   "
	}],
	actions : [{
		name : "Multiattack",
		description : "The beast makes a number of attacks equal to half this spell's level (rounded down)",
	}],
	traits : [{
		name : "Flyby",
		description : "The beast doesn't provoke opportunity attacks when it flies out of an enemy's reach."
	}],
}


// Dysnomian
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

		
		var PrintObj = function(obj, objName) {
			if (objName) console.println(objName + ":");
			if (typeof obj === "string") {
				console.println("\"" + obj + "\"");
			} else {
				for (var prop in obj) {
					if (prop === "eval") continue;
					console.println("(" + prop + ": " + obj[prop] + ")");
				}
			}
		}

		
		var prefixes = What("Template.extras.AScomp").split(",").splice(1);
		for (var prefixIndex = 0; prefixIndex < prefixes.length; prefixIndex++) {
			// Prefixes look like "P4.AScomp."
			var prefix = prefixes[prefixIndex];
			if (!tDoc.getField(prefix + "Comp.Race")) continue; // Page doesn't exist
					
			// woah woah woah waht are we doing trying to find the prefix again?
		}

		var creaNameRaw = How(prefix + "Comp.Race"); // How() finds .submitName
		var creaName = ParseCreature(creaNameRaw);
		// we don't even need to find the creature name, the current companion is saved to a global var 
		// Actually the creature is seperate to the companion so do need creature name

		var objComp = CurrentCompRace[prefix];
		PrintObj(objComp, "objComp");

		var objCrea = CreatureList[creaName];
		//PrintObj(objCrea, "objCrea");

		// Damn, at this point, our our companion's size/type/subtype is still the array.

		// try looking here for the creature type set on the sheet:
		var inCompType = What(prefix + "Comp.Desc.MonsterType");
		PrintObj(inCompType, "inCompType");
		// Hell yeah let's go! inCompType: "Antsy (2nd level)"
		
		// time for regex

		
	},
	removeeval : function(prefix, lvl) {
		console.println("processing removeeval");
	},
	changeeval : function(prefix, lvl) {
		console.println("processing changeeval");
	},
}