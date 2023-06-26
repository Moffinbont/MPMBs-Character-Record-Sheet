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

var iFileName = "Spell Jammer_Astral Elf.js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

RaceList["astral elf"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []

	regExpSearch : /^(?=.*astral)(?=.*elf).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "something" and "catlike" in it, disregarding capitalization). If this looks too complicated, just write: /something catlike/i

	name : "Astral Elf", //required; the name to use for the race

	sortname : "Elf, Astral", //optional; this is the name used to fill the drop-down boxes. If you don't include this, the 'name' will used instead

	source : ["SJ", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

	plural : "Astral Elves", //required; the name to use for the race when the plural form is used

	size : 3, //required;  the size of the race (Gargantuan = 0, Huge = 1, Large = 2, Medium = 3, Small = 4, Tiny = 5)

	speed : { //required; This sets a value for one or more speed modes, and/or a value to be added to a specific speed mode or to all speed modes // the attributes of this object can be "walk", "burrow", "climb", "fly", "swim", and "allModes"

		// all of the following attributes are optional and you can add more ("burrow" isn't part of this example!)

		walk : { spd : 30, enc : 20 }, // the objects "walk", "burrow", "climb", "fly", "swim" are all the same, they are an object with two attributes, 'spd' for the speed in feet, and 'enc' for the encumbered speed in feet.

	},

/* SYNTAX CHANGE v12.998 >> old syntax for 'tools' and 'languages' are no longer supported!! */
	//toolProfs : [["Musical instrument", 3], ["Thieves' tools", "Dex"], "Tinker's tools"], // optional; this is an array with the tool proficiencies gained. Each entry can be its own array of 2 entries (but doesn't have to be). The first entry is the name of the tool and the second entry is either 1) a number if the tool is yet to be chosen, or 2) the 3-letter ability score abbreviation if the tool is to be listed in the skill section and have a bonus calculated

	languageProfs : [1, "Elvish"], // optional; this is an array of the language proficiencies gained. An entry can either be 1) a string that represents the language learned or 2) a number which is the number of language gained that can be chosen by the player

	vision : [["Darkvision", 60]], //optional; An array of arrays that each have a length of 2; This adds the first value of each array to the Senses field. The second value is the range in feet. If no range is needed, put a 0 there. You can also add a modifier like "+30" or "*2" to have the appropriate calculation done with the range of sense


	savetxt : { // Optional; this attribute defines entries to add to the field for "Saving Throw Advantages / Disadvantages"

			text : ["Magic can't put me to sleep"], // Optional; this is an array of strings, and each of those strings is added to the field exactly as presented here

			adv_vs : ["charmed"] // Optional; this is an array of things that the character has advantage on saves against. This is put in the field after the text "Adv. on saves vs. ", so in this example it would result in "Adv. on saves vs. traps and charmed"
		},

	skills : ["Perception"], //optional; Skill proficiencies the race has. This line can be deleted if you don't have anything to put here. If the race doesn't give fixed proficiencies, but instead gives a choice, delete this line and use the line below, "skillstxt"

	
	age : " reach adulthood in their late teens and live around 100 years", //optional; the age tooltip/mouseover text (will be displayed in combination with the "plural" entry)

	height : " range from 5 to over 6 feet tall (4'6\" + 2d10\")", //optional; the height tooltip/mouseover text (will be displayed in combination with the "plural" entry)

	weight : " weigh around 110 lb (90 + 2d10 \xD7 1d4 lb)", //optional; the weight tooltip/mouseover text (will be displayed in combination with the "plural" entry)

	//heightMetric : " range from 1,5 to over 1,8 metres tall (145 + 5d8 cm)", //optional; the height tooltip/mouseover text (will be displayed in combination with the "plural" entry), when the metric system is chosen

	//weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)", //optional; the weight tooltip/mouseover text (will be displayed in combination with the "plural" entry), when the metric system is chosen

	improvements : "Astral Elf: +2 one stat of your choice, +1 of a different stat;", //required; the text that is displayed when listing all the ability score improvements

	scores : [0, 1, 0, 0, 2, 0], //required; the ability score improvements as used by the Ability Score dialog. The syntax is: [Str, Dex, Con, Int, Wis, Cha]

	trait : "Astral Elf (+2, +1, of your choice)\nAstral Fire:   I know a star cantrip of my choice with either Int, Wis, or Cha as my spellcasting ability.\nStarlight Step:   Prof per LR I can teleport 30ft within line of sight.\nAstral Trance:   You don’t need to sleep, and magic can’t put you to sleep. You can finish a long rest in 4 hours if you spend those hours in a trancelike meditation, during which you remain conscious. Whenever you finish this trance, you gain proficiency in one skill of your choice and with one weapon or tool of your choice.\nFey Ancestry & Darkvision & Keen Senses", //required; the racial trait as it will be put in the Racial Trait field on the second page (note that "\n" is a line break).

	//abilitySave : 5,  //optional; the ability score to use for the Ability Saving Throws. Remove this line if your race has no Ability that requires Saving Throws. (Str=1, Dex=2, Con=3, Int=4, Wis=5, Cha=6)

	//variants : ["something great catlike"], //optional; the names of the racial variants, using the exact names of the entry of the variants given in the RaceSubList (note the use of only lower case)


	spellcastingAbility : 5, //required for a spellcaster; the ability score to use for spellcasting. Remove this line if your race has no spellcasting. (Str=1, Dex=2, Con=3, Int=4, Wis=5, Cha=6)

	spellcastingBonus : { //optional; an object that adds something to the "Bonus Spells" section of the spell selection dialog //this object can have all the same attributes as the "spellcastingList" object as defined in the ClassList, but must also have a "name" defined //the other things that can be defined in this that are not in the "spellcastingList" object, are the "selection", "times" and "prepared" values

		name : "Astral Fire", //required; this is used to identify the object, so must be an unique name

		
		spells : ["dancing lights", "light", "sacred flame"], //Optional, but required if not including the "class" entry; If a "spells" array is present, all other objects will be ignored and only this list of spells will populate the list of available spells. each entry has to match the name of the spell in the SpellsList

		selection : ["sacred flame"], //optional if "spells" is defined; this is the default selection for the array specified in "spells"

		times : 1, //optional; this is the number of times the bonus spells should be added. //This can also be an array of 20 values. That way the number of times are level-dependent

		atwill : true, //optional; if set to 'true', this makes the spell selected for this/these bonus spells to get "At Will" in the first column

	},

	features : { //optional; the racial features. Each works the same way, so only a couple of example are given. You can add as many as you want. If the race has no level-dependent or limited features, you can just delete the whole feature entry all together

		"starlight step" : { //note the use of lower case characters

			name : "Starlight Step", //required; the name of the racial feature
			minlevel : 1, //required; the level at which the feature is gained

			usages : [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6],//optional; number of times it can be used. This can be one value, but can also be an array of 20 values, one for each level

			recovery : "long rest", //required if "usages" is defined; way of getting the limited feature recharged. If you can use anything, but use either "long rest" or "short rest" (note the lower case) for best compatibility with the limited features section. This can be one value, but can also be an array of 20 values, one for each level

			tooltip : " (Starlight Step)", //optional; the tooltip added to the entry in the Limited Feature section, this example will read "Lesser Restoration is gained from Something Catlike (Celestial Legacy)"

			action : ["bonus action", " [30ft]"], //optional; adds the name of the feature to the action list when chosen. The options are "action", "bonus action", and "reaction" //the second value in the array is added as a suffix for the "name" of the feature when entered into the action field

		},

		
	}

};