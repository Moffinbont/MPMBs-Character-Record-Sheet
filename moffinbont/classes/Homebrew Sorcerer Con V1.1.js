/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This is the syntax for adding a new class to the sheet
				Note that you will need the syntax for adding a subclass as well if you want the class to have any choices for subclasses
	Sheet:		v13.00.00 (2018-??-??) [identical to v12.999 syntax, except v12.999 uses 'borrow' for the burrow speed]
*/

var iFileName = "Homebrew Sorcerer Con V1.1.js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

ClassList["sorcerer con"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []

	regExpSearch : /^(?=.*sorcerer)(?=.*con).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "my" and "class" in it, disregarding capitalization). If this looks too complicated, just write: /Sorcerer Con/i

	name : "Sorcerer Con", //required; the name to use for the class

	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

	primaryAbility : "\n \u2022 Sorcerer Con: Constitution;", //required; the text to display when citing the primary ability of the class

	prereqs : "\n \u2022 You must be born to channel maagic so can only join this class at level 1. You cannot out run it and it must always outrank all other multiclass levels combined", //required; the text to display when citing the prerequisite for the class when multiclassing

	die : 10, //required; the type of hit die the class has (i.e. 10 means d10)

	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5], //required; the amount of ability score improvements (or feats) at each level. Note that there are 20 entries, one for each level. This example uses the Fighter's progression

	saves : ["Cha", "Con"], //required; the two save proficiencies.

	skills : ["\n\n" + toUni("Sorcerer Con") + ": Choose two from Acrobatics, Animal Handling, Athletics, Deception, Insight, Intimidation, Medicine, Perception, Performance, Stealth, and Survival.", "\n\n" + toUni("Sorcerer Con") + ": What you doing multiclassing ya fool? You gotta be born a sorcerer!."], //required; the text to display for skill proficiencies. Note the \n\n at the start, they are important! The first entry is for when the class is the primary class, the second entry is for when the class is taken later as part of a multiclass

/* SYNTAX CHANGE v12.998 >> old syntax for 'tools' and 'languages' are no longer supported!! */
	toolProfs : { // optional; this is an object with arrays with the tool proficiencies gained. Each entry in an array can be its own array of 2 entries. The first entry is the name of the tool and the second entry is either 1) a number if the tool is yet to be chosen, or 2) the 3-letter ability score abbreviation if the tool is to be listed in the skill section and have a bonus calculated
		primary : [["Musical Instrument", 1], ["Artisan Tools", 1]], // optional; the tool proficiencies gained if the class is the primary class (i.e. taken at 1st level)
		secondary : [["You have to be born with Magic Channeling, stop multiclassing in!", 1]] // optional; the tool proficiencies gained if the class is not the primary class (i.e. taken at a later level)
	},

	armor : [ //required; the 4 entries are for: ["light", "medium", "heavy", "shields"]
		[false, false, false, false], //required; the armor proficiencies if this is the first or only class
		[false, false, false, false] //required; the armor proficiencies if this class is multiclassed with (so not taken at level 1, but later)
	],

	weapons : [ //required; the 3 entries are for: ["simple", "martial", "other"]
		[false, false, ["dagger", "dart", "sling", "light crossbow", "unarmed strike", "sickle", "handaxe", "quarterstaff"]], //required; the weapon proficiencies if this is the first or only class
		[false, false, []] //required; the weapon proficiencies if this class is multiclassed with (so not taken at level 1, but later)
	],

	equipment : "Sorcerer Con starting equipment:\n \u2022 An explorer's pack -or- a dungeoneers pack;\n \u2022 Two daggers;\n \u2022 A light crossbow and 20 bolts;\n \u2022 A basic arcane focus;\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.", //required; the text to display when citing the starting equipment

	subclasses : ["Sorcerous Origin", []], //required; the names of the subclasses. The first entry is the overall name that is given to the subclasses, the second entry is a list of the subclass, using the exact names of the entry of the subclasses in the ClassSubList. //Note that if one of the entries in the array of subclasses doesn't exist in the ClassSubList, the sheet will throw an error as soon as you make a character with levels in this class
	//IMPORTANT: for any subclass you add using the AddSubClass() function, don't list them here! The AddSubClass() function makes its own entry in this array! If you have entries here that don't exist (because you didn't add any ClassSubList entry, or added it using the AddSubClass() function, then the sheet will throw strange errors)!
	//"sorcerer-draconic bloodline"

	//prestigeClassPrereq : 5, //optional; if you include this attribute, the sheet will consider the class a prestige class // You can make this attribute a number, which represents the levels the character must have before being able to gain the prestige class. Alternatively, you can make this attribute a string, which can be evaluated with eval() and returns either true (prereqs met) or false (prereqs not met).

	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //required; the amount of attacks at each level. Note that there are 20 entries, one for each level.

	abilitySave : 3, //optional, but required for a spellcaster; the ability score to use for the Ability Saving Throws. Remove this line if your class has no Ability that requires Saving Throws. (Str=1, Dex=2, Con=3, Int=4, Wis=5, Cha=6)

	spellcastingFactor : 2, //required for a spellcaster; the speed with which spell progression works type 1 for full spellcasting (Cleric), 2 for half spellcasting (Paladin), and 3 for one-third spellcasting (Arcane Trickster). This can be any positive number other than 0. Remove this line if your class has no spellcasting. If your character uses the Warlock way of spellcasting, write "warlock1" here. The 1 indicates the spell progression factor. You can change it to a 2 or 3 to have half or one-third spell progression (or to any other factor you like).
		// You can also have this refer to a Spell Slot progression you define yourself, as a separate variable (see "Homebrew Syntax - SpellTable.js"). In order to do this the name of that variable and the spellcastingFactor must match. Using the name "purplemancer" for example would mean that here you put [spellcastingFactor : "purplemancer1"] (the 1 is the factor, this can be any positive number other than 0) while for the variable containing the table you use "purplemancerSpellTable". Note that the name is all lower case!

	spellcastingTable : [ //optional, only if you want to use a non-standard table for spell slot progression and just for this one (sub)class. You can either use the spellcastingTable attribute, or define a new SpellTable in a separate variable (see "Homebrew Syntax - SpellTable.js"). If you are adding multiple classes that use the same table, please add it as a separate variable, for otherwise the spell slots will be added up per individual class level instead of adding the class levels together to find the total amount of spell slots
	// if you add this variable, the number in the spellcastingFactor will be only be used when multiclassing. Note that you still need to enter something in the spellcastingFactor to tell the sheet that its dealing with a spellcaster.
		[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 0
		[1, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 1
		[1, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 2
		[1, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 3
		[1, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 4
		[1, 1, 0, 0, 0, 0, 0, 0, 0], //lvl 5
		[1, 1, 0, 0, 0, 0, 0, 0, 0], //lvl 6
		[1, 1, 0, 0, 0, 0, 0, 0, 0], //lvl 7
		[1, 1, 0, 0, 0, 0, 0, 0, 0], //lvl 8
		[1, 1, 1, 0, 0, 0, 0, 0, 0], //lvl 9
		[1, 1, 1, 0, 0, 0, 0, 0, 0], //lvl10
		[1, 1, 1, 0, 0, 0, 0, 0, 0], //lvl11
		[1, 1, 1, 0, 0, 0, 0, 0, 0], //lvl12
		[1, 1, 1, 1, 0, 0, 0, 0, 0], //lvl13
		[1, 1, 1, 1, 0, 0, 0, 0, 0], //lvl14
		[1, 1, 1, 1, 0, 0, 0, 0, 0], //lvl15
		[1, 1, 1, 1, 0, 0, 0, 0, 0], //lvl16
		[1, 1, 1, 1, 1, 0, 0, 0, 0], //lvl17
		[1, 1, 1, 1, 1, 0, 0, 0, 0], //lvl18
		[1, 1, 1, 1, 1, 0, 0, 0, 0], //lvl19
		[1, 1, 1, 1, 1, 0, 0, 0, 0] //lvl20
	],

	spellcastingKnown : { //Optional; Denotes the amount and type of spells the class has access to

		//cantrips : [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], CANTRIPS ADDED VIA CLASS FEATURE TO RESTRICT TO SORC CANTRIP SPELL LIST //Optional; This can either be one number, an array of 20 numbers, or be omitted for a class that doesn't have access to cantrips. The numbers reflect the amount of cantrips known

		spells : "list",//Optional; This can either be one number, an array of 20 numbers, or be omitted for a class that doesn't have access to spells. The numbers reflect the amount of spells known. For a class that doesn't know spells, but prepares them from a list, you should put "list" here. For a class that uses a spellbook, you should put "book" here.

		prepared : false, //Optional; This indicates that the class has to prepare spells like a cleric/druid/paladin/wizard
		
	},

	spellcastingList : { //Optional; Only needed if the class doesn't have its own spell list. This object denotes what spells the class has access to. All things in this object constrain the selection of spells that will be available. The contstraints are cumulative.

		class : ["druid", "sorcerer", "wizard", "bard", "ranger"], //Required; The name of the class from whose spell list the spells come from. This can be "any" if the spells are not limited by a spell list of just one class. The entry has to match the name of the class in the SpellsList

				level : [1, 5], //Optional; The lower and upper limit of spell levels that the class has access to.

				
		notspells : ["guiding bolt", "inflict wounds", "sanctuary", "prayer of healing", "augury", "spiritual weapon", "warding bond", "beacon of hope", "mass healing word", "spirit guardians", "divination", "guardian of faith", "commune", "flame strike", "hallow"], //Optional; Any spells listed in this array will be excluded from the list
	},

	
	features : { //required;  the class features. Each works the same way, so only a couple of example are given. You can add as many as you want

		
		"spellchanneling" : {
			name : "Spellchanneling",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   " + "I can channel Sorcerer spells with Constitution as my spellchanneling ability."  + "\n   " + "I can use an arcane focus as a spellcasting focus." + "\n   " + "To channel a spell, pay the level of the spell in HP and cast it as normal.",
			
		},
		
		"magic overload" : {
			name : "Magic Overload",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   " + "I struggle to accept magical healing, whenever I receive healing from a spell I instead gain" + "\n   " + "that healing as temporary HP." + "\n   " + "At the end of a short rest I can absorb tempory HP gained this way as regular HP",
			
		},
		
		"improved spellchanneling" : {
			name : "Improved Spellchanneling",
			source : ["HB", 0],
			minlevel : 2,
			description : "\n   " + "I can channel Non-Cleric spells as sorcerer spells from second level." + "\n   " + "The level of spells I can cast increases every 4 levels to a maximum of 5th level (as a half caster)",
			additional : ["Level 1 sorcerer spells known", "Level 1 spells known", "Level 1 spells known", "Level 1 spells known", "Level 2 spells known", "Level 2 spells known", "Level 2 spells known", "Level 2 spells known", "Level 3 spells known","Level 3 spells known", "Level 3 spells known", "Level 3 spells known", "Level 4 spells known","Level 4 spells known", "Level 4 spells known", "Level 4 spells known", "Level 5 spells known","Level 5 spells known", "Level 5 spells known", "Level 5 spells known"], //optional; text to display in the header of the feature. This can be one value, but can also be an array of 20 values, one for each level.
		},
	
		"metamagic" : {
			name : "Metamagic",
			source : [["SRD", 44], ["P", 101]],
			minlevel : 3,
			description : "\n   " + "Use the \"Choose Feature\" button above to add a Metamagic option to the third page" + "\n   " + "I can use only 1 Metamagic option on a spell unless otherwise written",
			additional : levels.map(function (n) {
				return n < 3 ? "" : (n < 7 ? 2 : n < 10 ? 3 : n < 11 ? 4: n < 15 ? 5 : 6) + " known";
			}),
			extraname : "Metamagic Option",
			extrachoices : ["Careful Spell", "Distant Spell", "Empowered Spell", "Extended Spell", "Heightened Spell", "Quickened Spell", "Subtle Spell", "Twinned Spell"],
			extraTimes : levels.map(function (n) {
				return n < 3 ? 0 : n < 7 ? 2 : n < 10 ? 3 : n < 11 ? 4: n < 15 ? 5 : 6;
			}),
			"careful spell" : {
				name : "Careful Spell",
				source : [["SRD", 44], ["P", 102]],
				description : " [1 hit point]" + "\n   " + "If the spell allows a saving throw, I can protect Cha modifier number of creatures" + "\n   " + "The selected creatures automatically succeed on their saving throws vs. the spell"
			},
			"distant spell" : {
				name : "Distant Spell",
				source : [["SRD", 44], ["P", 102]],
				description : " [1 hit point]" + "\n   " + "I double the range of the spell or make the range 30 ft if the range was touch"
			},
			"empowered spell" : {
				name : "Empowered Spell",
				source : [["SRD", 44], ["P", 102]],
				description : " [1 hit point]" + "\n   " + "If the spell uses damage dice, I can reroll my Charisma modifier number of damage dice" + "\n   " + "I can Empower a spell even if I use another Metamagic option on it"
			},
			"extended spell" : {
				name : "Extended Spell",
				source : [["SRD", 44], ["P", 102]],
				description : " [1 hit point]" + "\n   " + "If the spell has a duration of at least 1 min, I can double it, up to 24 hours"
			},
			"heightened spell" : {
				name : "Heightened Spell",
				source : [["SRD", 44], ["P", 102]],
				description : " [3 hit points]" + "\n   " + "If the spell allows a saving throw, I can have one target get disadv. on their first save"
			},
			"quickened spell" : {
				name : "Quickened Spell",
				source : [["SRD", 44], ["P", 102]],
				description : " [2 hit points]" + "\n   " + "If the spell has a casting time of 1 action, I can cast it as a bonus action",
				action : ["bonus action", ""]
			},
			"subtle spell" : {
				name : "Subtle Spell",
				source : [["SRD", 44], ["P", 102]],
				description : " [1 hit point]" + "\n   " + "I can cast the spell without the need to use somatic or verbal components"
			},
			"twinned spell" : {
				name : "Twinned Spell",
				source : [["SRD", 44], ["P", 102]],
				description : " [1 hit point per spell level, minimum 1]" + "\n   " + "If spell/cantrip has a target of one and not self, I can aim it at second target within range"
			}
		},
		
		"cantrip selection" : {
			//any feature who's name is empty like this one is, will be ignored. Since v12.5 of the sheet, an entry like this serves no function
			name : "Cantrip Selection",
			source : ["P", 101],		
			minlevel: 1,
			description : "\n   " + "Cantrip selection limited to the sorcerer spell list",
			spellcastingBonus : {
				name : "Select Cantrips",
				spellcastingAbility : 3,
				class: "sorcerer",
				level : [0, 0],
				atwill : true,
				times : [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8],
				
			},
			additional : ["3 cantrips known", "3 cantrips known", "3 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "6 cantrips known", "6 cantrips known", "6 cantrips known", "6 cantrips known", "7 cantrips known", "7 cantrips known", "7 cantrips known", "8 cantrips known", "8 cantrips known"], //optional; text to display in the header of the feature. This can be one value, but can also be an array of 20 values, one for each level.
		},		
		/*



		"subclassfeature1" : { //You need at least one entry named "subclassfeatureX". It signals the sheet to ask the user for which subclass he would like to have. The level of this feature should match the level the class needs to select a subclass. Once a subclass is selected, any feature with "subclassfeature" in the object name in the class entry will be ignored.
			name : "Sorcerous Origin",
			source : [["SRD", 43], ["P", 101]],
			minlevel : 1,
			description : "\n   " + "Choose the Sorcerous Origin for your innate powers and put it in the \"Class\" field" + "\n   " + "Choose either Draconic Bloodline, Storm Sorcery, or Wild Magic"
		},

		
			// },
		// },
		
		*/
	},

};

AddSubClass("sorcerer con", "wild magic", {
	regExpSearch : /^(?=.*(mage|magus|sorcerer|witch))(?=.*(wild|chaos|chaotic|limbo)).*$/i,
	subname : "Wild Magic",
	fullname : "Sorcerer Con (Wild Mage)",
	source : ["P", 103],
	features : {
		"subclassfeature1" : {
			name : "Wild Magic Surge",
			source : ["P", 103],
			minlevel : 1,
			description : desc([
				"Wild Magic Surges happen 5% of the time that I cast a sorcerer spell",
				"This doesn't happen with cantrips and I only take this chance if the DM tells me to",
				"See the \"Notes\" page for the table"
			]),
			wmsurgetable1 : "\u25C6 Wild Magic Surge Table (Wild Magic 1, PHB 104) [results 01-50]" + desc([
				"d100  Effect",
				"01-02 Roll on this table at the start of each of your turns for the next minute, ignoring this result on subsequent rolls.",
				"03-04 For the next minute, you can see any invisible creature if you have line of sight to it.",
				"05-06 A modron chosen and controlled by the DM appears in an unoccupied space within 5 ft of you, then disappears 1 minute later.",
				"07-08 You cast fireball as a 3rd-level spell centered on yourself.",
				"09-10 You cast magic missile as a 5th-level spell.",
				"11-12 Roll a d10. Your height changes by a number of inches equal to the roll. If the roll is odd, you shrink. If the roll is even, you grow.",
				"13-14 You cast confusion centered on yourself.",
				"15-16 For the next minute, you regain 5 hit points at the start of each of your turns.",
				"17-18 You grow a long beard made of feathers that remains until you sneeze, at which point the feathers explode out from your face.",
				"19-20 You cast grease centered on yourself.",
				"21-22 Creatures have disadvantage on saving throws against the next spell you cast in the next minute that involves a saving throw.",
				"23-24 Your skin turns a vibrant shade of blue. A remove curse spell can end this effect.",
				"25-26 An eye appears on your forehead for the next minute.",
				"27-28 For the next minute, all your spells with a casting time feet of 1 action have a casting time of 1 bonus action.",
				"29-30 You teleport up to 60 ft to an unoccupied space of your choice that you can see.",
				"31-32 You are transported to the Astral Plane until the end of your next turn, after which time you return to the space you previously occupied or the nearest unoccupied space if that space is occupied.",
				"33-34 Maximize the damage of the next damaging spell you cast within the next minute.",
				"35-36 Roll a d10. Your age changes by a number of years equal to the roll. If the roll is odd, you get younger (minimum 1 year old). If the roll is even, you get older.",
				"37-38 1d6 flumphs controlled by the DM appear in unoccupied spaces within 60 ft of you and are frightened of you. They vanish after 1 minute.",
				"39-40 You regain 2d10 hit points.",
				"41-42 You turn into a potted plant until the start of your next turn. While a plant, you are incapacitated and have vulnerability to all damage. If you drop to 0 hit points, your pot breaks, and your form reverts.",
				"43-44 For the next minute, you can teleport up to 20 ft as a bonus action on each of your turns.",
				"45-46 You cast levitate on yourself.",
				"47-48 A unicorn controlled by the DM appears in a space within 5 ft of you, then disappears 1 minute later.",
				"49-50 You can't speak for the next minute. Whenever you try, pink bubbles float out of your mouth."
			]),
			wmsurgetable2 : "\u25C6 Wild Magic Surge Table (Wild Magic 1, PHB 104) [results 51-100]" + desc([
				"d100  Effect",
				"51-52 A spectral shield hovers near you for the next minute, granting you a +2 bonus to AC and immunity to magic missile.",
				"53-54 You are immune to being intoxicated by alcohol for the next 5d6 days.",
				"55-56 Your hair falls out but grows back within 24 hours.",
				"57-58 For the next minute, any flammable object you touch that isn't being worn or carried by another creature bursts into flame.",
				"59-60 You regain your lowest-level expended spell slot.",
				"61-62 For the next minute, you must shout when you speak.",
				"63-64 You cast fog cloud centered on yourself.",
				"65-66 Up to three creatures you choose within 30 ft of you take 4d10 lightning damage.",
				"67-68 You are frightened by the nearest creature until the end of your next turn.",
				"69-70 Each creature within 30 ft of you becomes invisible for the next minute. The invisibility ends on a creature when it attacks or casts a spell.",
				"71-72 You gain resistance to all damage for the next minute.",
				"73-74 A random creature within 60 ft of you becomes poisoned for 1d4 hours.",
				"75-76 You glow with bright light in a 30-ft radius for the next minute. Any creature that ends its turn within 5 ft of you is blinded until the end of its next turn.",
				"79-80 Illusory butterflies and flower petals flutter in the air within 10 ft of you for the next minute.",
				"77-78 You cast polymorph on yourself. If you fail the saving throw, you turn into a sheep for the spell's duration.",
				"81-82 You can take one additional action immediately.",
				"83-84 Each creature within 30 ft of you takes 1d10 necrotic damage. You regain hit points equal to the sum of the necrotic damage dealt.",
				"85-86 You cast mirror image.",
				"87-88 You cast fly on a random creature within 60 ft of you.",
				"89-90 You become invisible for the next minute. During that time, other creatures can't hear you. The invisibility ends if you attack or cast a spell.",
				"91-92 If you die within the next minute, you immediately come back to life as if by the reincarnate spell.",
				"93-94 Your size increases by one size category for the next minute.",
				"95-96 You and all creatures within 30 ft of you gain vulnerability to piercing damage for the next minute.",
				"97-98 You are surrounded by faint, ethereal music for the next minute.",
				"99-100 You regain all expended hit dice."
			]),
			eval : "try {AddToNotes(ClassSubList['sorcerer-wild magic'].features.subclassfeature1.wmsurgetable1, \"Wild Mage's Wild Magic Surge table, part 1\"); AddToNotes(ClassSubList['sorcerer-wild magic'].features.subclassfeature1.wmsurgetable2, \"Wild Mage's Wild Magic Surge table, part 2\");} catch (er) {};",
			removeeval : "try {AddToNotes('', '', ClassSubList['sorcerer-wild magic'].features.subclassfeature1.wmsurgetable1); AddToNotes('', '', ClassSubList['sorcerer-wild magic'].features.subclassfeature1.wmsurgetable2);} catch (er) {};"
		},
		"subclassfeature1.1" : {
			name : "Tides of Chaos",
			source : ["P", 103],
			minlevel : 1,
			description : "\n   " + "I can gain advantage on either one attack roll, ability check, or saving throw" + "\n   " + "After I cast a 1st-level or higher sorcerer spell, the DM can impose a Wild Magic Surge" + "\n   " + "After I roll on the Wild Magic Surge table, I regain my use of Tides of Chaos",
			recovery : "long rest",
			usages : 1
		},
		"subclassfeature6" : {
			name : "Bend Luck",
			source : ["P", 103],
			minlevel : 6,
			description : "\n   " + "As a reaction, I can add/subtract 1d4 from another's attack roll, ability check, or save",
			action : ["reaction", " (2 hit points)"],
			additional : "2 hit points"
		},
		"subclassfeature14" : {
			name : "Controlled Chaos",
			source : ["P", 103],
			minlevel : 14,
			description : "\n   " + "Whenever I roll on the Wild Magic Surge table, I can roll twice and use either result"
		},
		"subclassfeature18" : {
			name : "Spell Bombardment",
			source : ["P", 103],
			minlevel : 18,
			description : "\n   " + "Once per turn, when I roll spell damage, I can take one damage die that rolled max" + "\n   " + "I can then roll this die again and add it to the spell's damage"
		}
	}
});

AddSubClass("sorcerer con", "storm sorcery", {
	regExpSearch : /^(?=.*(sorcerer|witch))((?=.*(storm|tempest|hurricane))|((?=.*air)(?=.*element))).*$/i,
	subname : "Storm Sorcery",
	fullname : "Sorcerer Con (Storm Sorcerer)",
	source : [["S", 137], ["X", 51]],
	
	features : {
		"subclassfeature1" : {
			name : "Wind Speaker",
			source : [["S", 137], ["X", 52]],
			minlevel : 1,
			description : "\n   " + "I can speak, read, and write Primordial (and its dialects Aquan, Auran, Ignan, Terran)",
			languageProfs : ["Primordial"]
		},
		"subclassfeature1.1" : {
			name : "Tempestuous Magic",
			source : [["S", 137], ["X", 52]],
			minlevel : 1,
			description : desc([
				"As a bonus action, before or after casting a 1st-level or higher spell, I can fly 10 ft",
				"This movement doesn't provoke opportunity attacks as whirling gust of air surround me"
			]),
			action : ["bonus action", " (with casting)"]
		},
		"subclassfeature6" : {
			name : "Heart of the Storm",
			source : [["S", 137], ["X", 52]],
			minlevel : 6,
			description : desc([
				"I have resistance to lightning and thunder damage",
				"When I start casting a 1st-level or higher spell that deals lightning or thunder damage,",
				"I deal lightning or thunder damage to a creature within 10 ft of me that I can see"
			]),
			additional : levels.map(function (n) { return n < 6 ? "" : Math.floor(n/2) + " damage"; }),
			dmgres : ["Lightning", "Thunder"]
		},
		"subclassfeature6.1" : {
			name : "Storm Guide",
			source : [["S", 137], ["X", 52]],
			minlevel : 6,
			description : desc([
				"As an action, I can stop rain around me in 20-ft radius; bonus action for it to resume",
				"As a bonus action, I can choose the direction of wind around me in a 100-ft radius",
				"This lasts until the end of my next turn and doesn't alter the wind's speed"
			]),
			action : ["bonus action", ""]
		},
		"subclassfeature14" : {
			name : "Storm's Fury",
			source : [["S", 137], ["X", 52]],
			minlevel : 14,
			description : desc([
				"As a reaction when hit by a melee attack, I can deal lightning damage to the attacker",
				"The attacker must also make a Strength save or be pushed up to 20 ft away from me"
			]),
			action : ["reaction", ""],
			additional : levels.map(function (n) { return n < 14 ? "" : n + " lightning damage"; })
		},
		"subclassfeature18" : {
			name : "Wind Soul",
			source : [["S", 137], ["X", 52]],
			minlevel : 18,
			description : desc([
				"I have immunity to lightning and thunder damage and gain magical 60 ft fly speed",
				"As an action, I reduce my fly speed to 30 ft and give allies 30 ft fly speed for 1 hour",
				"I can do this once per short rest for up to 3 + my Charisma modifier allies within 30 ft"
			]),
			action : ["action", ""],
			savetxt : { immune : ["lightning", "thunder"] },
			speed : { fly : { spd : "fixed 60", enc : "fixed 60" } },
			usages : 1,
			recovery : "short rest"
		}
	}
});

AddSubClass("sorcerer con", "divine soul-xgte", { // this code includes contributions by SoilentBrad
	regExpSearch : /^(?=.*divine)(?=.*soul).*$/i,
	subname : "Divine Soul",
	source : ["X", 50],
	fullname : "Sorcerer Con (Divine Soul)",
	spellcastingList : {
		class : "any",
	},
	features : {
		"subclassfeature1" : {
			name : "Divine Magic",
			source : ["X", 50],
			minlevel : 1,
			description : desc([
				"I know 1st level cleric spells, these cleric spells count as sorcerer spells for me",
				"I also learn a spell based on my affinity, use the \"Choose Feature\" button above for this"
			]),
			choices : ["Good", "Evil", "Law", "Chaos", "Neutrality"],
			"good" : {
				name : "Divine Magic: Good",
				description : desc([
					"When I select my 1st level or higher spells, I can also pick spells from the cleric spell list",
					"I also learn Cure Wounds, which doesn't count against my number of spells known",
					"These count as sorcerer spells for me; I can only replace the bonus spell with a cleric spell"
				]),
				spellcastingBonus : {
					name : "Divine Magic (Good)",
					"class" : "cleric",
					level : [1,1], // Changed to only include 1st level spells to reduce healing creep.
					selection : ["cure wounds"]
				},
				eval : "if (classes.known.sorcerer && classes.known.sorcerer.level >= 14 && !(/.*?sorcerer,subclassfeature14,eagle.*/i).test(What('Class Features Remember'))) { ClassFeatureOptions(['sorcerer', 'subclassfeature14', 'eagle']); };"
			},
			"evil" : {
				name : "Divine Magic: Evil",
				description : desc([
					"When I select my 1st level or higher spells, I can also pick spells from the cleric spell list",
					"I also learn Inflict Wounds, which doesn't count against my number of spells known",
					"These count as sorcerer spells for me; I can only replace the bonus spell with a cleric spell"
				]),
				spellcastingBonus : {
					name : "Divine Magic (Evil)",
					"class" : "cleric",
					level : [1,1],
					selection : ["inflict wounds"]
				},
				eval : "if (classes.known.sorcerer && classes.known.sorcerer.level >= 14 && !(/.*?sorcerer,subclassfeature14,bat.*/i).test(What('Class Features Remember'))) { ClassFeatureOptions(['sorcerer', 'subclassfeature14', 'bat']); };"
			},
			"law" : {
				name : "Divine Magic: Law",
				description : desc([
					"When I select my 1st level or higher spells, I can also pick spells from the cleric spell list",
					"I also learn Bless, which doesn't count against my number of spells known",
					"These count as sorcerer spells for me; I can only replace the bonus spell with a cleric spell"
				]),
				spellcastingBonus : {
					name : "Divine Magic (Law)",
					"class" : "cleric",
					level : [1,1],
					selection : ["bless"]
				},
				eval : "if (classes.known.sorcerer && classes.known.sorcerer.level >= 14 && !(/.*?sorcerer,subclassfeature14,eagle.*/i).test(What('Class Features Remember'))) { ClassFeatureOptions(['sorcerer', 'subclassfeature14', 'eagle']); };"
			},
			"chaos" : {
				name : "Divine Magic: Chaos",
				description : desc([
					"When I select my 1st level or higher spells, I can also pick spells from the cleric spell list",
					"I also learn Bane, which doesn't count against my number of spells known",
					"These count as sorcerer spells for me; I can only replace the bonus spell with a cleric spell"
				]),
				spellcastingBonus : {
					name : "Divine Magic (Chaos)",
					"class" : "cleric",
					level : [1,1],
					selection : ["bane"]
				},
				eval : "if (classes.known.sorcerer && classes.known.sorcerer.level >= 14 && !(/.*?sorcerer,subclassfeature14,bat.*/i).test(What('Class Features Remember'))) { ClassFeatureOptions(['sorcerer', 'subclassfeature14', 'bat']); };"
			},
			"neutrality" : {
				name : "Divine Magic: Neutrality",
				description : desc([
					"When I select my 1st level or higher spells, I can also pick spells from the cleric spell list",
					"I learn Protection from Evil \u00D7 Good; It doesn't count against my number of spells known",
					"These count as sorcerer spells for me; I can only replace the bonus spell with a cleric spell"
				]),
				spellcastingBonus : {
					name : "Divine Magic (Neutrality)",
					"class" : "cleric",
					level : [1,1],
					selection : ["protection from evil and good"]
				},
				eval : "if (classes.known.sorcerer && classes.known.sorcerer.level >= 14) { ClassFeatureOptions(['sorcerer','subclassfeature14','dragonfly']); };"
			}
		},
		"subclassfeature1.2" : {
			name : "Favored by the Gods",
			source : ["X", 50],
			minlevel : 1,
			description : "\n   " + "If I fail a saving throw or miss with an attack roll, I can add 2d4 to the total",
			recovery : "short rest",
			usages : 1
		},
		"subclassfeature6" : {
			name : "Empowered Healing",
			source : ["X", 50],
			minlevel : 6,
			description : desc([
				"Once per turn, when I or an ally in 5 ft roll dice to healing with a spell, I can reroll dice",
				"By spending 1 hit point; I can reroll any number of those dice for that spell once"
			]),
			additional : "1 hit point"
		},
		"subclassfeature14" : {
			name : "Otherworldy Wings",
			source : ["X", 50],
			minlevel : 14,
			description : desc([
				"As a bonus action, I can manifest a pair of spectral wings that give me 30 ft fly speed",
				"These wings last until I become incapacitated or I dismiss them as a bonus action"
			]),
			choices : ["eagle", "bat", "dragonfly"],
			choicesNotInMenu : true,
			"eagle" : {
				name : "Otherworldy Wings",
				description : desc([
					"As a bonus action, I manifest a pair of spectral eagle wings, giving me 30 ft fly speed",
					"These wings last until I become incapacitated or I dismiss them as a bonus action"
				])
			},
			"bat" : {
				name : "Otherworldy Wings",
				description : desc([
					"As a bonus action, I manifest a pair of spectral bat wings, giving me 30 ft fly speed",
					"These wings last until I become incapacitated or I dismiss them as a bonus action"
				])
			},
			"dragonfly" : {
				name : "Otherworldy Wings",
				description : desc([
					"As a bonus action, I create a pair of spectral dragonfly wings, giving me 30 ft fly speed",
					"These wings last until I become incapacitated or I dismiss them as a bonus action"
				])
			},
			action : ["bonus action", ""],
			speed : { fly : { spd : 30, enc : 20 } },
			eval : "if(FeaChoice===''){var CFrem=What('Class Features Remember');var tReg=/.*?sorcerer,subclassfeature1,(good|evil|law|chaos|neutrality).*/i;if((tReg).test(CFrem)){var CFchoice=CFrem.replace(tReg,'$1');FeaChoice=(/good|law/).test(CFchoice)?'eagle':(/evil|chaos/).test(CFchoice)?'bat':'dragonfly';AddString('Class Features Remember','sorcerer,subclassfeature14,'+FeaChoice,false);};};"
		},
		"subclassfeature18" : {
			name : "Unearthly Recovery",
			source : ["X", 50],
			minlevel : 18,
			description : desc([
				"As a bonus action when I have less than half of my max HP remaining, I can heal myself",
				"I regain a number of HP equal to half my hit point maximum"
			]),
			action : ["bonus action", ""],
			recovery : "long rest",
			usages : 1
		}
	}
});

AddSubClass("sorcerer con", "shadow magic-xgte", {

	regExpSearch : /^(?=.*(sorcerer|witch))(?=.*shadow).*$/i,
	subname : "Shadow Magic",
	source : ["X", 50],
	fullname : "Sorcerer Con (Shadow Sorcerer)",
	features : {
		"subclassfeature1" : {
			name : "Eyes of the Dark",
			source : ["X", 51],
			minlevel : 1,
			description : "\n   " + "I gain 120 ft darkvision",
			vision : [["Darkvision", 120]]
		},
		"subclassfeature1.1" : {
			name : "Strength of the Grave",
			source : ["X", 51],
			minlevel : 1,
			description : desc([
				"When damage reduces me to 0 HP, that isn't radiant damage or a critical hit,",
				"I can make a Charisma save (DC 5 + damage taken) to drop to 1 HP instead"
			]),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature3" : {
			name : "Darkness",
			source : ["X", 51],
			minlevel : 3,
			description : desc([
				"I learn Darkness, which doesn't count against my number of spells known",
				"I can also cast it by spending 2 hit points and then I can see through it normally"
			]),
			additional : "2 hit points",
			action : ["action", " (2 hit points)"],
			spellcastingBonus : {
				name : "Eyes of the Dark",
				spells : ["darkness"],
				selection : ["darkness"]
			}
		},
		"subclassfeature6" : {
			name : "Hound of Ill Omen",
			source : ["X", 51],
			minlevel : 6,
			description : desc([
				"As a bonus action, I summon a hound within 30 ft of a creature I see within 120 ft",
				"The hound has all the stats of a dire wolf with the following exceptions:",
				"\u2022 It is medium size and counts as a monstrosity not a beast",
				"\u2022 It start with a number of temporary hit points equal to half my sorcerer level",
				"\u2022 At the start of its turn, it automatically knows where the (hidden) target is",
				"\u2022 It can only move towards and make (opportunity) attack against the target",
				"\u2022 It can move through other creatures and objects as if they were difficult terrain",
				"\u2022 It takes 5 force damage if it ends its turn inside an object",
				"The target has disadvantage on saves vs. my spells while the hound is within 5 ft of it",
				"It disappears if reduced to 0 HP, if the target is reduced to 0 HP, or after 5 minutes"
			]),
			additional : levels.map(function (n) { return n < 6 ? "" : "3 hit points; " + Math.floor(n/2) + " temporary HP"; }),
			action : ["bonus action", " (3 hit points)"]
		},
		"subclassfeature14" : {
			name : "Shadow Walk",
			source : ["X", 51],
			minlevel : 14,
			description : desc([
				"As a bonus action when I'm in dim light or darkness, I can teleport up to 120 ft",
				"The destination has to be unoccupied, within line of sight, and in dim light or darkness"
			]),
			action : ["bonus action", ""]
		},
		"subclassfeature18" : {
			name : "Umbral Form",
			source : ["X", 51],
			minlevel : 18,
			additional : "6 hit points",
			description : desc([
				"As a bonus action, I transform into a shadow form for 1 minute",
				"While transformed, I have resistance to all damage except force and radiant damage",
				"Also, I can move through other creatures and objects as if they were difficult terrain",
				"I take 5 force damage if I end my turn inside an object",
				"This ends early if I end it as a bonus action, I die, or I'm incapacitated"
			]),
			action : ["bonus action", " (6 hit points)"]
		}
	}
});

