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


CreatureList["bestial spirit land"] = {

	name : "Bestial Spirit - Land",
	nameAlt : ["Land Beast"],
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
	challengeRating : "-",
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
	nameAlt : ["Water Beast"],
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
	challengeRating : "-",
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
	nameAlt : ["Air Beast"],
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
	challengeRating : "-",
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