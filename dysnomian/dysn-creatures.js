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
/*	features // OPTIONAL //
	actions  // OPTIONAL //
	traits   // OPTIONAL //
	TYPE:	array (variable length) with objects
	USE:	add text to the Traits and Features sections on the Companion page
	CHANGE:	v13.1.0 (added `joinString` attribute)

	Each of these three attributes work in the same way.
	Each is an array with objects that have at least two attributes, `name` and `description`, that each contain a string.

	Each object can also have the following optional attributes:
		ATTRIBUTE   EXPLANATION
		minlevel    determines at which level the feature is added 
		addMod      add custom modifiers to calculated values
		eval        run a function when added (useful combined with minlevel)
		removeeval  run a function when removed (useful combined with minlevel)
	For a more detailed explanation of these attributes, see below in the
	Companion Page Only section.

	Each name is preceded by a bullet point and, by default, followed by a colon and the description when
	added to the right section, for example:
		{
			name : "Invisibility",
			description : "As an action, the purple crawler magically turns invisible until it attacks or casts a spell, or until its concentration ends (as if concentrating on a spell)."
		}
	Will result in:
		◆ Invisibility: As an action, the purple crawler magically turns invisible until it attacks or casts a spell, or until its concentration ends (as if concentrating on a spell).
	
	If you want something else than a colon, you can change it to anything you like by adding the
	`joinString` attribute. For example:
		{
			name : "False Appearance",
			description : "While the purple crawler remains motionless, it is indistinguishable from an ordinary purple flower.",
			joinString : "\n   "
		}
	Will result in:
		◆ False Appearance
		   While the purple crawler remains motionless, it is indistinguishable from an ordinary purple flower.

	If the `description` attribute is not present, no string will be added to the field.
	Any description will do, even an empty string (e.g. description : "").

	The three different attributes, traits, features, and actions, are added to different parts of the companion page:

	ATTRIBUTE		ADDED TO SECTION
	 features		 Features
	 actions 		 Traits
	 traits  		 Traits

	Be aware that languages, resistances, vulnerabilities, and immunities are also added to the
	Features section on the companion page and before the features attribute described here.

	The actions are added before traits to the Traits section.

	The array is processed in the order it is in the code, no sorting will take place.

	These text are also displayed on the wild shape page, but all together in the singular Traits & Features section,
	regardless of their `minlevel` attribute value.
	Also, `eval` and `changeeval` are not executed when this creature is selected on the Wild Shape page.
	As the wild shape pages offer limited space, it is recommended to test if all of
	these and the other attributes together will fit.
	If they don't fit (well), consider using the `wildshapeString` attribute, see below.
*/

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
