var iFileName = "dysn.js";

RequiredSheetVersion("13.1.7");

(function (dysn) {
	(function (helper) {
		app.dysn.helper.PrintObj = function(obj, objName) {
			if (objName) console.println(objName + ":");
			if (typeof obj === "string") {
				console.println("\"" + obj + "\"");
			} else {
				for (var prop in obj) {
					if (prop === "eval" && obj["eval"]) { console.println("(eval: ...)"); }
					else { console.println("(" + prop + ": " + obj[prop] + ")"); }
				}
			}
		}
	})(app.dysn.helper = app.dysn.helper || {});	
})(app.dysn = app.dysn || {});


(function (dysn) {
	(function (summon) {
		app.dysn.summon.data = {
			beast: {
				lowestSl: 2,
				baseAc: 11,
				acPerSl: 1,
				baseHp: 30,
				hpPerAdditionalSl: 5,
			}
		}
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
				description: "In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action " +
					"required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger.",
				joinString: ""
			}],	
			attributesAdd: {
				features: [{
					name: "Summon Spell",
					description: "The creature is an ally to you and your companions.\r\n   The creature disappears when it drops to 0 hit points or when the spell ends."
				}]
			},	
			attributesChange: function(sCrea, objCrea) {
				var prefixes = What("Template.extras.AScomp").split(",").splice(1);
				for (var prefixIndex = 0; prefixIndex < prefixes.length; prefixIndex++) {
					// Prefixes look like "P4.AScomp."
					var prefix = prefixes[prefixIndex];
					if (!tDoc.getField(prefix + "Comp.Race")) continue; // Page doesn't exist
		
					var inCompType = What(prefix + "Comp.Desc.MonsterType");
					app.dysn.helper.PrintObj(inCompType, "inCompType");
					// This finds the old text that was here - gets overwritten later during the companion load process
				}			
			},	
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
			type: ["Land", "Water", "Air"],
			subtype: ["2nd level spell slot", "3rd level spell slot", "4th level spell slot", "5th level spell slot"],
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
				name: "Pack Tactics",
				description: "The beast has advantage on an attack roll against a creature if at least one of the hyena's allies is within 5 ft of the creature and the ally isn't incapacitated."
			}],
			
			eval: function(prefix, lvl) {
				console.println("processing eval");

				// try looking here for the creature type set on the sheet, as chosen by the user
				var inCompType = What(prefix + "Comp.Desc.MonsterType");
				var speed;
				var race;
				var monsterType = "Beast";
				if (/Air/i.test(inCompType)) {
					console.println("processing air creature");
					speed = "30 ft, fly 30 ft";
					race = "Bestial Spirit (Air)";
				} else if (/Water/i.test(inCompType)) {
					console.println("processing water creature");
					speed = "30 ft, swim 30 ft";
					race = "Bestial Spirit (Water)";
				} else {
					console.println("processing land creature");
					speed = "30 ft, climb 30 ft";		
					race = "Bestial Spirit (Land)";
				}
				
				console.println(speed);
				var displaySpeed = What("Unit System") === "imperial" ? speed : ConvertToMetric(speed, 0.5);
				if (typePF) { // this is a global var that is true when the sheet is the printer friendly one
					// add line breaks for the printer friendly sheets
					displaySpeed = displaySpeed.replace(/(,|;) /g, "$1\n");
				}
				console.println(displaySpeed);

				// what is remembered currently? - "summon", it comes from the creature.companionApply, and is required for reloading? Maybe? TODO test changing this
				console.println("Remembered Type: " + What(prefix + "Comp.Type"));
				

				// set creature type on the form directly - see functions2.js:498 for example of setting companion fields
				Value(prefix + "Comp.Desc.MonsterType", monsterType);
				try {
					Value(prefix + "Comp.Race", race);
				} catch (err) {
					// do nothing, I'm not sure why the above line throws, maybe because the value we're setting the race to isn't in the dropdown list? But it still works so idk
				}
				Value(prefix + "Comp.Use.Speed", displaySpeed);

				// find a digit, then either "st", "nd", "rd", or "th", then 0 or 1 whitespace chars, then "level", the i means case insensitive
				var matchesSpellSlot = /\d(st|nd|rd|th)\s?level/i.exec(inCompType);
				//app.dysn.helper.PrintObj(matchesSpellSlot, "matchesSpellSlot");

				if (matchesSpellSlot.length > 0) Value(prefix + "Comp.Desc.Age", matchesSpellSlot[0]);

				var strSpellSlot = matchesSpellSlot.length > 0 ? matchesSpellSlot[0] : "";
				app.dysn.helper.PrintObj(strSpellSlot, "strSpellSlot");

				var sl = strSpellSlot.length > 0 ? +strSpellSlot[0] : 2	; // default SL is 2
				console.println("sl+" + sl);
				app.dysn.helper.PrintObj(sl, "sl");

				var creaNameRaw = How(prefix + "Comp.Race"); // How() finds .submitName
				var creaName = ParseCreature(creaNameRaw);
				// we don't even need to find the creature name, the current companion is saved to a global var 
				// Actually the creature is seperate to the companion so do need creature name

				var objComp = CurrentCompRace[prefix];
				//dysn.helper.PrintObj(objComp, "objComp");

				// Do we edit the creature object? Or do we have to edit the sheet fields directly?
				var objCrea = CreatureList[creaName];
				
				
				objCrea.type = "beast";

				// Looks like we need to edit the sheet fields directly - maybe we can save our object somehow?
				if (objCrea.summonData) {
					var su = objCrea.summonData;

					var hp;
					var ac;
					var aPerA = sl / 2; // one attack for every two spell slot levels (round down).
			
					if (su.hpPerAdditionalSl && sl > su.lowestSl) {
						// +5 hp for each sl above 2
						hp = su.baseHp + (su.hpPerAdditionalSl * (sl - su.lowestSl));
					} else {
						hp = su.baseHp;
					}
					
					if (su.acPerSl) {
						ac = su.baseAc + (sl * su.acPerSl);
					} else {
						ac = au.baseAc;
					}
					
					Value(prefix + "Comp.Use.HP.Max", hp);
					Value(prefix + "Comp.Use.HD.Level", sl);
					Value(prefix + "Comp.Use.AC", ac);
					Value(prefix + "Comp.Use.Attack.perAction", aPerA);
					


				} else {
					console.println("No summonData.")
				}
				
			},

			summonData: dysn.summon.data.beast,

		};
	})(app.dysn.summon = app.dysn.summon || {});
})(app.dysn = app.dysn || {});