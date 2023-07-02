var iFileName = "dysn.js";

RequiredSheetVersion("13.1.7");

(function (dysn) {
	(function (helper) {
		app.dysn.helper.PrintObj = function(obj, objName) {
			if (typeof obj === "string") {
				console.println(objName + ": \"" + obj + "\"");
			} else {
				if (objName) console.println(objName + ":");
				for (var prop in obj) {
					if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
						continue;
					}
					if (typeof obj[prop] === "function" && ("" + obj[prop]).length > 200 ) { console.println("(" + prop + ": function ...)"); }
					else { console.println("(" + prop + ": " + obj[prop] + ")"); }
				}
			}
		}
	})(app.dysn.helper = app.dysn.helper || {});
	

	app.dysn.helper.GetDisplaySpeed = function (speed) {
		//console.println(speed);
		var displaySpeed = What("Unit System") === "metric" ? ConvertToMetric(speed, 0.5) : speed ;
		if (typePF && displaySpeed) { // this is a global var that is true when the sheet is the printer friendly one
			// add line breaks for the printer friendly sheets - replacing , or ;
			displaySpeed = displaySpeed.replace(/(,|;) /g, "$1\n");
		}
		//console.println(displaySpeed);

		return displaySpeed;
	};


	app.dysn.helper.ToOrdinal = function (inNum) {
		var num = +inNum;
		if (num < 0) {
			num = -num;
		}		
		var remainderTen = num % 10;
		var remainderHundred = num % 100;
		var suffix;
		if (remainderTen === 1 && remainderHundred !== 11) {
			suffix = "st";
		} else if (remainderTen === 2 && remainderHundred !== 12) {
			suffix = "nd";
		} else if (remainderTen === 3 && remainderHundred !== 13) {
			suffix = "rd";
		} else {
			suffix = "th";
		}		
		return "" + inNum + suffix;
	}


	app.dysn.helper.BuildArrayOfOrdinals = function (minNum, maxNum, sEach, extraElements) {
		if (minNum > maxNum) {
			var temp = minNum;
			minNum = maxNum;
			maxNum = temp;
		}
		var arr = [];
		for (var curNum = minNum; curNum <= maxNum; curNum++) {
			var curOrdinal = app.dysn.helper.ToOrdinal(curNum);
			var curValue = sEach ? sEach.replace("{0}", curOrdinal) : curOrdinal;
			arr.push(curValue)
		}

		if (extraElements && extraElements.length > 0) {
			arr = arr.concat(extraElements);
		}

		app.dysn.helper.PrintObj(arr, "arr");
		return arr;
	}

})(app.dysn = app.dysn || {});


(function (dysn) {
	(function (summon) {
		app.dysn.summon.data = {
			beast: {
				name: "Bestial Spirit",
				lowestSl: 2,
				baseAc: 11,
				acPerSl: 1,
				baseHp: 30,
				hpPerAdditionalSl: 5,
				defaultMonsterType: "Fey or Fiend",
				monsterType: "Beast",
				features: [],
				actions: [],
				traits: [],
				flavours: {
					land: {
						regex: /land/i,
						speed: "30 ft, climb 30 ft",
						name: "Land",
						traits: [{
							name : "Pack Tactics",
							description : "The beast has advantage on an attack roll against a creature if at least one of the hyena's allies is within 5 ft of the creature and the ally isn't incapacitated."
						}],
						// baseHp
						// monsterType
					},
					water: {
						regex: /water/i,
						speed: "30 ft, swim 30 ft",
						name: "Water",
						traits: [{
							name : "Pack Tactics",
							description : "The beast has advantage on an attack roll against a creature if at least one of the hyena's allies is within 5 ft of the creature and the ally isn't incapacitated."
						}, {
							name : "Water Breathing",
							description : "The beast can breathe only underwater."
						}],
					},
					air: {
						regex: /air/i,
						speed: "30 ft, fly 30 ft",
						name: "Air",
						traits: [{
							name : "Flyby",
							description : "The beast doesn't provoke opportunity attacks when it flies out of an enemy's reach."
						}],
					}
				}
			}
		}

		app.dysn.summon.UpdateFormFields = function (prefix, summonInfo) {
			// set creature type on the form directly - see functions2.js:498 for example of setting companion fields
			if (summonInfo.monsterType) { Value(prefix + "Comp.Desc.MonsterType", summonInfo.monsterType) } else { console.println("Warning! No monster type to set!"); };
			if (summonInfo.displaySpeed) Value(prefix + "Comp.Use.Speed", summonInfo.displaySpeed);
			if (summonInfo.age) Value(prefix + "Comp.Desc.Age", summonInfo.age);
			if (summonInfo.gender) Value(prefix + "Comp.Desc.Sex", summonInfo.gender);		
			if (summonInfo.hp) Value(prefix + "Comp.Use.HP.Max", summonInfo.hp);
			if (summonInfo.sl) Value(prefix + "Comp.Use.HD.Level", summonInfo.sl);
			if (summonInfo.ac) Value(prefix + "Comp.Use.AC", summonInfo.ac);
			if (summonInfo.aPerA) Value(prefix + "Comp.Use.Attack.perAction", summonInfo.aPerA);
			if (summonInfo.sTraits) {
				// overwrite any previous traits with our traits
				Value(prefix + "Comp.Use.Traits", summonInfo.sTraits);
				// TODO maybe we should only replace default traits, so other parts of the automation could modify the traits?
			}
		};


		app.dysn.summon.EvalCreature = function (prefix) {
			console.println("processing eval");

			// what is remembered currently? this prints "summon", it comes from the creature.companionApply, and is required for reloading? Maybe? TODO test changing this
			//console.println("Remembered Type: " + What(prefix + "Comp.Type"));

			// try looking here for the creature type set on the sheet, as chosen by the user
			var inCompType = What(prefix + "Comp.Desc.MonsterType");
			
			// find a digit, then either "st", "nd", "rd", or "th", then 0 or 1 whitespace chars, then "level", the i means case insensitive
			var matchesSpellSlot = /\d(st|nd|rd|th)\s?level/i.exec(inCompType);
			//app.dysn.helper.PrintObj(matchesSpellSlot, "matchesSpellSlot");

			
			var sSpellSlot = (matchesSpellSlot && matchesSpellSlot.length) > 0 ? matchesSpellSlot[0] : "";
			app.dysn.helper.PrintObj(sSpellSlot, "sSpellSlot");

			var sl = sSpellSlot.length > 0 ? +sSpellSlot[0] : -1;
			console.println("sl+" + sl);
			//app.dysn.helper.PrintObj(sl, "sl");

			var objComp = CurrentCompRace[prefix];
			//app.dysn.helper.PrintObj(objComp, "objComp");

			var creaNameRaw = How(prefix + "Comp.Race"); // How() finds .submitName
			var creaName = ParseCreature(creaNameRaw);
			// --do we even need to find the creature name? the current companion is saved to a global var 
			// Actually the creature is seperate to the companion so do need creature name

			// Do we edit the creature object? Or do we have to edit the sheet fields directly?
			var objCrea = CreatureList[creaName];
			//app.dysn.helper.PrintObj(objCrea, "objCrea");

			var su = objCrea.summonData; // Our custom property
			//app.dysn.helper.PrintObj(su, "summonData");

			var monsterType;
			var speed = null;
			var gender = null;
			var baseHp = null;
			var allTraits = [];
			if (su.traits) { allTraits = allTraits.concat(su.traits); }

			var foundFlavour = false;
			for (var prop in su.flavours) {
				if (!Object.prototype.hasOwnProperty.call(su.flavours, prop)) {
					continue;
				}
				//app.dysn.helper.PrintObj(prop, "prop");
				var flavour = su.flavours[prop];
				//app.dysn.helper.PrintObj(flavour, "flavour");

				if (flavour.regex.test(inCompType)) {
					foundFlavour = true;
					monsterType = flavour.monsterType ? flavour.monsterType : su.monsterType;
					console.println("processing flavour: " + flavour.name + " for " + su.name);
					gender = flavour.name;
					speed = flavour.speed ? flavour.speed : su.speed;
					baseHp = flavour.baseHp ? flavour.baseHp : su.baseHp;
					if (flavour.traits && flavour.traits.length > 0) {
						app.dysn.helper.PrintObj(flavour.traits[0], "flavour.traits[0]");

						allTraits = allTraits.concat(flavour.traits);
					}
					break;
				}
			}
			
			var sTraits = null;
			if (!foundFlavour) {
				monsterType = su.defaultMonsterType;
			} else {
				// only override traits if we found a flavour - otherwise don't set traits
				sTraits = "";
				for (var traitIndex = 0; traitIndex < allTraits.length; traitIndex++) {
					trait = allTraits[traitIndex];
					if (trait) {
						if (sTraits.length > 0) { sTraits += "\r\n"; }
						sTraits += "\u25C6 " + trait.name + (trait.joinString !== undefined ? trait.joinString : ": ") + trait.description;					
					}
				}
			}
			
			var displaySpeed = app.dysn.helper.GetDisplaySpeed(speed);
			
			
			// if these are null or undefined, we won't update the field on the sheet
			var aPerA = (sl !== -1 && su.multiAttackPerSl) ?
				Math.floor(sl * su.multiAttackPerSl) :
				null;

			var hp = (sl !== -1 && su.hpPerAdditionalSl && su.lowestSl) ? 
				baseHp + (su.hpPerAdditionalSl * (sl - su.lowestSl)) :
				null;
		
			var ac = (sl !== -1 && su.acPerSl) ?
				su.baseAc + (sl * su.acPerSl) :
				null;

			var summonInfo = {
				displaySpeed: displaySpeed,
				monsterType: monsterType,
				hp: hp,
				ac: ac,
				aPerA: aPerA,
				age: sSpellSlot,
				gender: gender,
				sTraits: sTraits,
			}

			app.dysn.summon.UpdateFormFields(prefix, summonInfo);
		};
		
	})(app.dysn.summon = app.dysn.summon || {});
})(app.dysn = app.dysn || {});


// Companion List
(function (dysn) {
	(function (summon) {
		CompanionList["summon-tashas"] = {
			name: "Tasha's Summon",
			nameMenu: "Summon Tasha's",
			nameTooltip: "the summon spells in Tasha's Cauldron of Everything ",
			nameOrigin: "a TCoE Summon Spell",
			source: ["TCoE", 109],
			notes: [{
				name: "",
				description: "The summoned creature is an ally to you and your companions.\r\n   The creature disappears when it drops to 0 hit points or when the spell ends.",
				joinString: ""
			}, {
				name: "",
				description: "In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action " +
					"required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger.",
				joinString: ""
			}],
		}
	})(app.dysn.summon = app.dysn.summon || {});
})(app.dysn = app.dysn || {});

// Creature List
(function (dysn) {
	(function (summon) {
		CreatureList["bestial-spirit"] = {
			name: "Bestial Spirit",
			source: ["TCoE", 109],
			size: 4,
			type: ["Land", "Water", "Air", "All"],
			subtype: app.dysn.helper.BuildArrayOfOrdinals(2, 9, "{0} level spell slot", ["All"]),
			header: "Summon",
			companion: "summon-tashas",
			companionApply: "summon-tashas",
			alignment: "Unaligned",
			ac: 11,
			hp: 30,
			hd: [2, 6],
			speed: "30 ft, climb 30 ft",
			proficiencyBonus: 0,
			proficiencyBonusLinked: true,
			challengeRating: "\"-\"",
			scores: [18, 11, 16, 4, 14, 5],
			senses: "Darkvision 60 ft",
			languages: "understands the languages you speak",
			attacksAction: 1,
			attacks: [{
				name: "Maul",
				ability: 1,
				useSpellcastingAbility: true,
				abilitytodamage: true,
				damage: [1, 8, "piercing"],
				range: "Melee (5 ft)",
				description: "Multiattack: The beast attacks a number of times equal to half the spell's level"
			}],
			features: [{
				name: "Summon Beast",
				description: "You call forth a bestial spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Bestial Spirit stat block. When you cast the spell, choose an environment: Air, Land, or Water. The creature resembles an animal of your choice that is native to the chosen environment, which determines certain traits in its stat block.",
				joinString: "\n   "
			}],
			actions: [{
				name: "Multiattack",
				description: "The beast makes a number of attacks equal to half this spell's level (rounded down)",
				
			}],
			traits: [{
				name : "Flyby (Air Only)",
				description : "The beast doesn't provoke opportunity attacks when it flies out of an enemy's reach."
			}, {
				name: "Pack Tactics (Land and Water Only)",
				description: "The beast has advantage on an attack roll against a creature if at least one of the hyena's allies is within 5 ft of the creature and the ally isn't incapacitated."
			}, {
				name : "Water Breathing (Water Only)",
				description : "The beast can breathe only underwater."
			}],
			
			eval: function(prefix, lvl) {
				app.dysn.summon.EvalCreature(prefix);
			},
			removeeval : function(prefix, lvl) {
				Value(prefix + "Comp.Desc.Age", "");
				Value(prefix + "Comp.Desc.Sex", "");
			},
			summonData: app.dysn.summon.data.beast,
		};
	})(app.dysn.summon = app.dysn.summon || {});
})(app.dysn = app.dysn || {});