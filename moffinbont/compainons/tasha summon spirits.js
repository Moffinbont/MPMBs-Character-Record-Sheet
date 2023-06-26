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
/* 	iFileName // OPTIONAL //
	TYPE:	string
	USE:	how the file will be named in the sheet if you import it as a file

	Note that this is a variable called 'iFileName'.
	Variables invoked inside an import script will not be available after importing.
	However, if you invoke the variable without the 'var', it will be available after importing.

	This doesn't have to be the same as the actual name of the file.
	This doesn't need to have the .js file extension.
	Only the first occurrence of this variable will be used.
*/

RequiredSheetVersion("13.0.6");
/*	RequiredSheetVersion // OPTIONAL //
	TYPE:	function call with one variable, a string or number
	USE:	the minimum version of the sheet required for the import script to work

	If this script is imported into a sheet with an earlier version than given here, the player will be given a warning.

	The variable you input can be a the full semantic version of the sheet as a string (e.g. "13.0.6" or "13.1.0-beta1+201209").
	Alternatively, you can input a number, which the sheet will translate to a semantic version.
	For example:
		FUNCTION CALL						REQUIRED MINIMUM VERSION
		`RequiredSheetVersion(13);`			13.0.0
		`RequiredSheetVersion(13.1);`		13.1.0

	You can find the full semantic version of the sheet at the bottom of every page,
	or look at the "Get Latest Version" bookmark, which lists the version number,
	or go to File >> Properties >> Description, where the version is part of the document title.
*/

CreatureList["bestial spirit land"] = {

	name : "Bestial Spirit-Land",

	nameAlt : ["Land Beast"],

	source : ["TCoE", 109],
	
	size : 4,

	type : "Beast",


	companion : "summon",

/*	companion // OPTIONAL //
	TYPE:	array of strings (or string, for backwards compatibility)
	USE:	list this creature as an option for a special type of companion
	CHANGE:	v13.1.0

	This attribute is an array of keys corresponding to a CompanionList object name,
	or, for backwards compatibility, a string of one key.
	Doing so makes this creature selectable as the listed type of special companion(s),
	using the Companion Options button on the companion page.

	Some CompanionList objects have their own filter for determining which creatures are 
	applicable.
	However, if you set this attribute to match the CompanionList object key,
	they will always be available for that CompanionList entry, regardless of its filter.

	Note that you can change any creature into one of the special options by first selecting
	a race from the drop-down and selecting	"Change current creature into a ..." with
	the Companion Options button.

	Use this `companion` attribute for things that are obvious candidates for the special options.

	OPTION                 EXPLANATION
	"familiar"             Find Familiar spell and Pact of the Chain warlock boon
	"pact_of_the_chain"    Pact of the Chain warlock boon (but not Find Familiar spell)
	"familiar_not_al"      Same as "familiar", but with the added description "(if DM approves)"
                           However, this creature will not be shown for either Find Familiar 
                           or Pact of the Chain when the DCI field is visible (i.e. Adventurers League).
	"mount"                Find Steed spell
	"steed"                Find Greater Steed spell
	"companion"            Ranger's Companion (Beast Master feature)
	                       Has its own filter, so normally you don't need this option.
						   Filter: any Beast, Medium or smaller, and CR of 1/4 or lower
	"companionrr"          2016/09/12 Unearthed Arcana: Revised Ranger's Beast Conclave feature
	"strixhaven_mascot"    Strixhaven Mascot familiar (Strixhaven Mascot feat), but not Find Familiar spell
*/
	companionApply : "summon",
/*	companionApply // OPTIONAL //
	TYPE:	string
	USE:	always set this creature to be this special type of companion

	Setting this to a key in the CompanionList object will make the sheet
	automatically apply the features of that special companion type.

	Note that you can change any creature into one of the special options by first selecting
	a race from the drop-down and selecting	"Change current creature into a ..." with
	the Companion Options button.

	Use this `companionApply` attribute only if the creature *always* is that kind of companion.

	Import scripts can add things to the CompanionList object, but generally these
	options should be available (if the applicable scripts are imported if they're not SRD):

	SRD   OBJECT KEY             EXPLANATION
	 V    "familiar"             Find Familiar spell
	 V    "pact_of_the_chain"    Pact of the Chain familiar (Warlock 3rd-level boon)
	 V    "mount"                Find Steed spell
	 -    "steed"                Find Greater Steed spell
	 -    "companion"            Ranger's Companion (Ranger: Beast Master feature)
	 -    "strixhaven_mascot"    Strixhaven Mascot familiar (Strixhaven Mascot feat)
	 -    "companionrr"          Animal Companion (2016/09/12 Unearthed Arcana:
		                                           Revised Ranger's Beast Conclave feature)
	 -    "mechanicalserv"       Mechanical Servant (2017/01/09 Unearthed Arcana: 
		                                             Artificer's Mechanical Servant feature)

	Be aware that this list is slightly different than the one for the `companion` attribute!
*/
	alignment : "Unaligned",
/*	alignment // REQUIRED //
	TYPE:	string
	USE:	set the alignment drop-down box

	This value is put in the alignment drop-down box of the sheet without any changes,
	thus it is recommended to capitalize it for consistency.
*/
	ac : 11,
/*	ac // REQUIRED //
	TYPE:	number
	USE:	set the armour class

	This number is filled in the AC field as-is, no calculations are done with regards to armour worn
	or anything like that.
*/
	hp : 10,
/*	hp // REQUIRED //
	TYPE:	number
	USE:	set the maximum amount of hit points

	This number is filled in the Max HP field without any changed, no calculations are done with
	regards to hit dice, Constitution modifier, or anything like that.
	It is still possible to enable automatic updates for the Max HP field using the "Set Max HP" button,
	but by default only the hp value set here will be displayed and it will not automatically update.
*/
	hd : [3, 4],
/*	hd // REQUIRED //
	TYPE:	array with two number entries
	USE:	set the hit dice

	This array has two entries, both have to be a number or an empty string ""
	1. number
		The first entry is the amount of hit dice.
		This will be filled in the "Level" field on the companion page.
	2. number
		The second entry is the die type of the hit dice.
		This can be any number, but normally it is 4, 6, 8, 10, or 12.
		This will be filled in the "Die" field on the companion page.
		Don't worry, the "d" will be added automatically (e.g. the 4 above will display as "d4").

	The example above is for 3d4 hit dice.
*/

	speed : "20 ft, climb 30 ft",
/*	speed // REQUIRED //
	TYPE:	string
	USE:	set the movement speed

	This value is put in the speed field without any changes,
	except that on the Printer Friendly sheets any comma followed by a space is replaced with
	a comma followed by a line break.
*/
	proficiencyBonus : 0,

	proficiencyBonusLinked : true,
/*	proficiencyBonusLinked // OPTIONAL //
	TYPE:	boolean
	USE:	whether the proficiency bonus is the same (true) as the main character or not (false)
	ADDED:	v13.0.6

	Setting this to true will cause the `proficiencyBonus` attribute above to
	be overwritten on the Companion page with that of the main character (the 1st page),
	and updated whenever the main character changes level.
	Even so, setting the `proficiencyBonus` attribute is still required, as it will
	be used to calculate skill and saving throw proficiencies and bonuses.

	This attribute has no affect on the Wild Shape page.

	Setting this attribute to false is the same as not including this attribute.
*/
	challengeRating : "-",
/*	challengeRating // REQUIRED //
	TYPE:	string
	USE:	set the challenge rating

	This value is put in the challenge rating field (on the wild shape page) without any changes.
	This value is used on the wild shape page to show the creature in the right submenu.
*/
	scores : [18, 11, 16, 4, 14, 5],


	senses : "Darkvision 60 ft",

	attacksAction : 1,

	attacks : [{
		name : "Maul",
		ability : 1,
		useSpellcastingAbility : true,
		abilitytodamage : true,
		damage : [1, 8, "piercing"],
		range : "Melee (5 ft)",
		description : "Maul number of times equal to half the spells level"
	}],
/*	attacks // REQUIRED //
	TYPE:	array (variable length) of WeaponsList objects
	USE:	set the attack entries

	The syntax of the objects is not explained here, but in the "weapon (WeaponsList).js" syntax file.

	TIP: Mention in a attack's description if it can be used multiple times as part of an action.

	TIP: Use the `tooltip` attribute to explain complex attacks further.

	Each object in the array describes one attack entry.
	This array is used to populate the Attacks section on the companion and wild shape page.
	The first three entries in this array will be directly added to the attack section when selecting this creature.
	You can have more entries in the array, but as the pages only have three attack entries,
	they will not be visible unless manually changing the selection of one of the attack entries.

	You can have attacks with identical names as weapon options in the attack drop-down box.
	The companion page will always use the attacks defined in the creature's entry over those in the WeaponsList.
*/


	languages : "understands the languages you speak",

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


	header : "Summon",

}