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

	Subject:	Companion template option

	Effect:		This is the syntax for adding a new companion template option to the sheet,
	        	for use on the companion pages in the Companion Options button on each page.

	Remarks:	You will also need the syntax for adding a creature if you want to change certain
				attributes of a creature, as they are only described there.
	        	You will also need the syntax for common attributes for certain attributes,
				as they are identical as described there and refer to that file.

	Sheet:		v13.1.0 and newer

*/

var iFileName = "summon";
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

RequiredSheetVersion("13.1.0");
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

CompanionList["summon"] = {

	name : "Summon",

	nameMenu : "Summon",

	nameOrigin : "(TCoE Summon Spell)",

	source : ["TCoE", 109],

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Add text to Notes section >>> //
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
	notes : [{
		name : "The creature disappears when it drops to 0 hit points or when the spell ends.",
		description : "",
	joinString : ""
}, {
	name : "The creature is an ally to you and your companions.",
	description : "",
	joinString : ""
}, {
	name : "In combat",
	description : "the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger.",
joinString : ", "
},]

}

/*	notes // OPTIONAL //
	TYPE:	array (variable length) with objects
	USE:	add text to the leftmost Notes sections on the Companion page

	This attribute works identical to the `actions` , `features`, and `traits` from the CreatureList object,
	but the entries are added to the left Notes section instead.

	The attribute an array with objects that have at least two attributes, `name` and `description`, that each contain a string.

	Each object can also have the following optional attributes:
		ATTRIBUTE   EXPLANATION
		minlevel    determines at which level the feature is added 
		addMod      add custom modifiers to calculated values
		eval        run a function when added (useful combined with minlevel)
		removeeval  run a function when removed (useful combined with minlevel)
	For a more detailed explanation of these attributes, see below.

	Each name is preceded by a bullet point and, by default, followed by a colon and the description,
	for example:
		{
			name : "Invisibility",
			description : "As an action, the purple familiar magically turns invisible until it attacks or casts a spell, or until its concentration ends (as if concentrating on a spell)."
		}
	Will result in:
		◆ Invisibility: As an action, the purple familiar magically turns invisible until it attacks or casts a spell, or until its concentration ends (as if concentrating on a spell).
	
	If you want something else than a colon, you can change it to anything you like by adding the
	`joinString` attribute. For example:
		{
			name : "False Appearance (HB 105)",
			description : "While the purple familiar remains motionless, it is indistinguishable from an ordinary purple flower.",
			joinString : "\n   "
		}
	Will result in:
		◆ False Appearance (HB 105)
		   While the purple familiar remains motionless, it is indistinguishable from an ordinary purple flower.

	If the `description` attribute is not present, no string will be added to the field.
	Any description will do, even an empty string (e.g. description : "").

	As these are added to the Notes section, it shouldn't interfere with any of the
	`traits`, `features`, or `actions` defined by a CreatureList object.

	The array is processed in the order it is in the code, no sorting will take place.
*/
