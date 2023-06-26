/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	(sub)race
	Effect:		This is the syntax for adding a new (sub)race to the sheet.
				Note that you will need to define a race using this syntax once for every sub-race (i.e. there is a separate entry for High Elf, Wood Elf, and Dark Elf)
				You will use this for a race that doesn't have a subrace, like Dragonborn and also for a subrace of a race, like Hill Dwarf and Mountain Dwarf.
				You do not make a separate entry for the parent of a subrace. So there is no Dwarf or Elf entry!
				For races that have variants, like the human, you can define a variant using the RaceSubList. Any variant defined like that will only be selectable through the "Racial Options" button
	Sheet:		v13.00.00 (2018-??-??) [identical to v12.999 syntax, except v12.999 uses 'borrow' for the burrow speed]
*/

var iFileName = "MMM Harengon.js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

RaceList["harengon"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []

	regExpSearch : /harengon/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "something" and "catlike" in it, disregarding capitalization). If this looks too complicated, just write: /something catlike/i

	name : "Harengon", //required; the name to use for the race

	//sortname : "Catlike, Something", //optional; this is the name used to fill the drop-down boxes. If you don't include this, the 'name' will used instead

	source : ["MMM", 22], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

	plural : "Harengons", //required; the name to use for the race when the plural form is used

	size : 3, //required;  the size of the race (Gargantuan = 0, Huge = 1, Large = 2, Medium = 3, Small = 4, Tiny = 5)
//NOTE Harengon can choose size MEDIUM or SMALL, Medium is default and Small is race varient
	
	
	speed : { //required; This sets a value for one or more speed modes, and/or a value to be added to a specific speed mode or to all speed modes // the attributes of this object can be "walk", "burrow", "climb", "fly", "swim", and "allModes"


		walk : { spd : 30, enc : 20 }, // the objects "walk", "burrow", "climb", "fly", "swim" are all the same, they are an object with two attributes, 'spd' for the speed in feet, and 'enc' for the encumbered speed in feet.
		
	},

/* SYNTAX CHANGE v12.998 >> old syntax for 'tools' and 'languages' are no longer supported!! */
	//toolProfs : [["Musical instrument", 3], ["Thieves' tools", "Dex"], "Tinker's tools"], // optional; this is an array with the tool proficiencies gained. Each entry can be its own array of 2 entries (but doesn't have to be). The first entry is the name of the tool and the second entry is either 1) a number if the tool is yet to be chosen, or 2) the 3-letter ability score abbreviation if the tool is to be listed in the skill section and have a bonus calculated

	languageProfs : ["Common", "Sylvan"], // optional; this is an array of the language proficiencies gained. An entry can either be 1) a string that represents the language learned or 2) a number which is the number of language gained that can be chosen by the player


	skills : ["Perception"], //optional; Skill proficiencies the race has. This line can be deleted if you don't have anything to put here. If the race doesn't give fixed proficiencies, but instead gives a choice, delete this line and use the line below, "skillstxt"



	age : " reach adulthood in their late teens and live around 100 years", //optional; the age tooltip/mouseover text (will be displayed in combination with the "plural" entry)

	height : " when medium range 4 feet up to 5 feet tall (4' + 2d4\")", //optional; the height tooltip/mouseover text (will be displayed in combination with the "plural" entry)
		
	weight : " when medium weigh around  80lb (60 + 2d4 \xD7 1d6 lb)", //optional; the weight tooltip/mouseover text (will be displayed in combination with the "plural" entry)


	heightMetric : " Humanoid rabbit height", //optional; the height tooltip/mouseover text (will be displayed in combination with the "plural" entry), when the metric system is chosen

	weightMetric : " Like a rabbit but heavier or smth", //optional; the weight tooltip/mouseover text (will be displayed in combination with the "plural" entry), when the metric system is chosen

	improvements : "Harengon: +2 to one, +1 to another; or +1 to three;", //required; the text that is displayed when listing all the ability score improvements

	scores : [0, 2, 0, 0, 0, 1], //required; the ability score improvements as used by the Ability Score dialog. The syntax is: [Str, Dex, Con, Int, Wis, Cha]

	trait : "Harengon (+2 Dexterity, +1 Charisma)\n Leporine Senses. You have proficiency in the Perception skill.\n Hare-Trigger. You can add your proficiency bonus to your initiative rolls.\n Lucky Footwork. When you fail a Dexterity saving throw, you can use your reaction to roll a d4 and add it to the save. Must not be prone or your speed 0.\n Rabbit Hop. As a bonus action, jump feet equal to 5xPB, without provoking opportunity attacks. Your speed must be greater than 0. You can use it PB times per long rest.", //required; the racial trait as it will be put in the Racial Trait field on the second page (note that "\n" is a line break).


	//variants : ["harengon size small, harengon size medium"], //optional; the names of the racial variants, using the exact names of the entry of the variants given in the RaceSubList (note the use of only lower case)

	
	features : { //optional; the racial features. Each works the same way, so only a couple of example are given. You can add as many as you want. If the race has no level-dependent or limited features, you can just delete the whole feature entry all together

		
			addMod : { type : "skill", field : "Init", mod : "prof", text : "I can add my proficiency bonus to initiative rolls." } //optional; This is an object, or an array of similar objects, for adding a modifier to a modifier field. Using this will make it so that the modifier is added to any value that is already there. // The 'mod' attribute can be any combination of numbers, mathematical operators, and three-letter ability score abbreviations // The 'type' attribute can be "skill" or "save", but can also be left empty "" // The 'field' attribute depends on the type, for "skill" it can be the name of a skill, or "Init" for initiative, or "All" for the all skills modifier; for "save" it can be the three-letter abbreviation of an ability score, or "All" for the all saves modifier. // If the 'type' attribute is left empty, the 'field' attribute has to be the exact name of the field the modifier has to be added to // The 'text' attribute is an explanation of why the modifier was added //NOTE: for modifiers to attacks, use calcChanges
		},

		"rabbit hop" : {
			name : "Rabbit Hop", //required; the name of the racial feature
			minlevel : 1, //required; the level at which the feature is gained
			usages : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6], //optional; number of times it can be used. This can be one value, but can also be an array of 20 values, one for each level
			additional : ["10'", "10'", "10'", "10'", "15'", "15'", "15'", "15'", "20'", "20'", "20'", "20'", "25'", "25'", "25'", "25'", "20'", "30'", "30'", "30'"],  //optional; text to display in the description field of the limited feature. This can be one value, but can also be an array of 20 values, one for each level.
			recovery : "long rest", //required if "usages" is defined; way of getting the limited feature recharged. If you can use anything, but use either "long rest" or "short rest" (note the lower case) for best compatibility with the limited features section. This can be one value, but can also be an array of 20 values, one for each level
			tooltip : "", //optional; the tooltip added to the entry in the Limited Feature section, this example will read "Lesser Restoration is gained from Something Catlike (Celestial Legacy)"

			action : ["bonus action", ""], //optional; adds the name of the feature to the action list when chosen. The options are "action", "bonus action", and "reaction" //the second value in the array is added as a suffix for the "name" of the feature when entered into the action field
		},
		
		"lucky footwork" : {
			name : "Lucky Footwork",
			minlevel : 1,
			
			action : ["reaction", "(+1d4 Dex)"], //optional; adds the name of this choice to the action list when chosen. The options are "action", "bonus action", and "reaction" //the second value in the array is added as a suffix for the "name" of the feature when entered into the action field
		},
	}


AddRacialVariant( // this is the function you will be calling to add the variant. Note that a variant is NOT a subrace. A variant is something like the Dragonborn's options to choose a dragon colour, and not the Mountain Dwarf. If you want to add a subrace, add it as a race.

	"harengon", // Parent Race object name; Required; This has to be the exact name of the race to which you are adding a variant. This needs to match an entry in the RaceList variable

	"small size", // Object name; Required; The name the entry in the RaceSubList will have. This can be anything, it is just something that the sheet uses to reference the new entry and it will never be printed anywhere

	{ // don't forget this opening bracket, everything from here on are things that will be used in place of the original (parent) race object

		regExpSearch : /^(?=.*small)(?=.*harengon).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "something", "great" and "catlike" in it, disregarding capitalization). If this looks too complicated, just write: /something great catlike/i This lookup is in addition to the one from the parent in the RaceList. So if the name of this subrace does not include the name of the parent race, it will never be recognized!

		name : "Harengon (small)", //required; the name to use for the race

		source : ["MMM", 22], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

		plural : "Harengons", //required; the name to use for the race when the plural form is used

		// after defining the above four, you don't need to define anything more, but you can. Defining more stuff will overwrite the entries as they are given in the RaceList. So if you do not need something to be different than the basics of the class (for example, you subrace uses the same spellcasting ability, or has the same age description), then you don't need to define it again.
		// For the syntax of how to define more stuff, look at the RaceList (see "Homebrew Syntax - RaceList.js"). You can define all the same stuff in the same way. The below are a couple of examples:

		size : 3, //required;  the size of the race (Gargantuan = 0, Huge = 1, Large = 2, Medium = 3, Small = 4, Tiny = 5)
		
		height : " when small range from 3 feet to 4 feet tall (Small 2'7\" + 2d4\")", //optional; the height tooltip/mouseover text (will be displayed in combination with the "plural" entry)
		
		weight : " when small weigh around  40lb (35 + 2d4lb)", //optional; the weight tooltip/mouseover text (will be displayed in combination with the "plural" entry)
	}
);



AddRacialVariant( // this is the function you will be calling to add the variant. Note that a variant is NOT a subrace. A variant is something like the Dragonborn's options to choose a dragon colour, and not the Mountain Dwarf. If you want to add a subrace, add it as a race.

	"harengon", // Parent Race object name; Required; This has to be the exact name of the race to which you are adding a variant. This needs to match an entry in the RaceList variable

	"medium size", // Object name; Required; The name the entry in the RaceSubList will have. This can be anything, it is just something that the sheet uses to reference the new entry and it will never be printed anywhere

	{ // don't forget this opening bracket, everything from here on are things that will be used in place of the original (parent) race object

		regExpSearch : /^(?=.*medium)(?=.*harengon).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "something", "great" and "catlike" in it, disregarding capitalization). If this looks too complicated, just write: /something great catlike/i This lookup is in addition to the one from the parent in the RaceList. So if the name of this subrace does not include the name of the parent race, it will never be recognized!

		name : "Harengon (medium)", //required; the name to use for the race

		source : ["MMM", 22], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

		plural : "Harengons", //required; the name to use for the race when the plural form is used

		// after defining the above four, you don't need to define anything more, but you can. Defining more stuff will overwrite the entries as they are given in the RaceList. So if you do not need something to be different than the basics of the class (for example, you subrace uses the same spellcasting ability, or has the same age description), then you don't need to define it again.
		// For the syntax of how to define more stuff, look at the RaceList (see "Homebrew Syntax - RaceList.js"). You can define all the same stuff in the same way. The below are a couple of examples:


	}
);