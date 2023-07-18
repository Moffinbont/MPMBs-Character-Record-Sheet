var iFileName = "dysn.js";

RequiredSheetVersion("13.1.7");

(function (dysn) {
	(function (helper) {
		//see FunctionsResources.js:128 for how to create a popup dialog

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
	
	app.dysn.helper.MaybeToMetric = function (value) {
		return What("Unit System") === "metric" ? ConvertToMetric(value, 0.5) : value;
	}


	app.dysn.helper.GetDisplaySpeed = function (speed) {
		//console.println(speed);
		var displaySpeed = app.dysn.helper.MaybeToMetric(speed) ;
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
				multiAttackPerSl: 0.5,
				monsterType: "Beast",
				features: [], // TODO actions and features aren't supported by companions.
				actions: [],
				attacks: [{
					name: "Lacerate",
					ability: 0,
					range: "Melee (6 ft)",
					damage: [1, 4, "slashing"],
					modifiers: ["", 6], // need to add spell modifier to hit and spell level to damage
					abilitytodamage: false,
					description: "temp text in the summon.data.beast object",
					dmgPerAdditionalSl: 1,
				}],
				traits: [],
				flavours: {
					land: {
						regex: /land/i,
						speed: "30 ft, climb 30 ft",
						name: "Land",
						traits: [{
							name : "Pack Tactics",
							description : "The beast has advantage on an attack roll against a creature if at least one of the hyena's allies is within 5 ft of the creature and the ally isn't incapacitated.",
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
			},
			aberrant: {
				name: "Aberrant Spirit",
				lowestSl: 4,
				baseAc: 11,
				acPerSl: 1,
				baseHp: 40,
				hpPerAdditionalSl: 10,
				multiAttackPerSl: 0.5,
				monsterType: "Aberration",
				attacks: [],
				traits: [],
				flavours: {
					slaad: {
						rexex: /slaad/i,
						attacks: [{
							name: "Claws",
							ability: false,
							abilitytodamage: false,
							damage: [1, 10, "slashing"],
							modifiers: ["", 7],
							range: "Melee (5 ft)",
							description: "If the target is a creature, it can't regain hit points untill the start of the slaad's next turn.",
							dmgPerAdditionalSl: 1,
						}],
						traits: [],
					},
					behoderkin: {
						regex: /beholderkin/i,
						speed: "30 ft, fly 30 ft (hover)",
						attacks: [{
							name: "Eye Ray",
							ability: false,
							abilitytodamage: false,
							damage: [1, 8, "psychic"],
							modifiers: ["", 7],
							range: "Range 150 ft",
							description: "",
							dmgPerAdditionalSl: 1,
						}],
						traits: [],
					},					
					starSpawn: {
						regex: /star\w?spawn/i,
						attacks: [{
							name: "Psychic Slam",
							ability: false,
							abilitytodamage: false,
							damage: [1, 8, "psychic"],
							modifiers: ["", 7],
							range: "Melee (5 ft)",
							description: "",
							dmgPerAdditionalSl: 1,
						}],
						traits: [{
							name: "Whispering Aura",
							description: "At the start of each of the aberrations turns, each creature within 5ft must succeed on a wisdom saving throw against your spell DC or " +
								"take 2d6 psychic damage, provided the aberration isn't incapacitated.",
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
			// if (summonInfo.attacks) {
			// 	//add any weapons the creature possesses
			// 	for (var attIndex = 0; attIndex < summonInfo.attacks.length; attIndex++) {
			// 		AddWeapon(summonInfo.attacks[attIndex].name, undefined, prefix);
			// 	}
			// }
		};

		app.dysn.summon.UpdateAttacks = function (prefix, attackInfo) {
			FindCompWeapons(undefined, prefix);

			var prevWeaponNames = CurrentWeapons.compField[prefix];
			app.dysn.helper.PrintObj(prevWeaponNames, "prevWeaponNames");

			var prevWeaponObjects = CurrentWeapons.compKnown[prefix];
			app.dysn.helper.PrintObj(prevWeaponObjects, "prevWeaponObjects");

			// What we want to do, is clear all of the attacks from that currently exist, and overwrite them with our allAttacks array.
			for (var weaIndex = 0; weaIndex < prevWeaponNames.length; weaIndex++) {
				app.dysn.helper.PrintObj(prevWeaponNames[weaIndex], "clearing weapon");
				WeaponClear(weaIndex, prefix);
			}

			for (var attIndex = 0; attIndex < attackInfo.allAttacks.length; attIndex++) {
				var attack = attackInfo.allAttacks[attIndex];
				
				 console.println("adding attack Dart & Glaive" + attack.name + " to the weapon selections");
				 AddWeapon("Dart", undefined, prefix);
				 AddWeapon("Glaive", undefined, prefix); // This seems to add the attack to the companion's attacks, but it needs to find the weapon in the weaponlist.
				 // the built-in add weapon only finds weapons in the weapons list or attacks defined on the creature object, for a custom attack we gotta do it by hand
				 
				 // to register new weapons maybe use processWeaponOptions(true, rObjNm, rObj.weaponOptionsSp[1]);
				 processWeaponOptions(true, "NewWeaponName", [attack])
				 AddWeapon("NewWeaponName", undefined, prefix);
				 // The two main things the processWeaponOptions function does are `CurrentVars.extraWeapons[newName] = itemArr[i];` and  `WeaponsList[newName] = itemArr[i];`
				 // then `UpdateDropdown("weapons"); // update the weapons dropdown` and  `SetStringifieds("vars"); // Save the new settings to a field`

				var atkRange = app.dysn.helper.MaybeToMetric(attack.range);
				var atkDescription = app.dysn.helper.MaybeToMetric(attack.description);
								
				var dmgType = attack.damage[2];

				var fldNmbr = attIndex + 1;
				// var fieldAttackWeapon = tDoc.getField(prefix + "Comp.Use.Attack." + fldNmbr + ".Weapon");
				// var fieldAttackSelection = tDoc.getField(prefix + "Comp.Use.Attack." + fldNmbr + ".Weapon Selection");
				var fieldAttackToHit = tDoc.getField(prefix + "Comp.Use.Attack." + fldNmbr + ".To Hit");
				var fieldAttackDamage = tDoc.getField(prefix + "Comp.Use.Attack." + fldNmbr + ".Damage");
				// var fieldAttackProf = tDoc.getField(prefix + "Comp.Use.Attack." + fldNmbr + ".Proficiency");
				// var fieldAttackMod = tDoc.getField(prefix + "Comp.Use.Attack." + fldNmbr + ".Mod");
				// var fieldAttackRange = tDoc.getField(prefix + "Comp.Use.Attack." + fldNmbr + ".Range");
				// var fieldAttackDescription = tDoc.getField(prefix + "Comp.Use.Attack." + fldNmbr + ".Description");

				// app.dysn.helper.PrintObj(fieldAttackToHit, "fieldAttackToHit");
				//app.dysn.helper.PrintObj(fieldAttackDamage, "fieldAttackDamage");
				//app.dysn.helper.PrintObj(fieldAttackProf, "fieldAttackProf");
				//app.dysn.helper.PrintObj(fieldAttackMod, "fieldAttackMod");
				//app.dysn.helper.PrintObj(fieldAttackRange, "fieldAttackRange");
				//app.dysn.helper.PrintObj(fieldAttackDescription, "fieldAttackDescription");
				//app.dysn.helper.PrintObj(fieldAttackSelection, "fieldAttackSelection");
				//app.dysn.helper.PrintObj(fieldAttackWeapon, "fieldAttackWeapon");
				console.println("setting Selection");
				Value(prefix + "Comp.Use.Attack." + fldNmbr + ".Weapon Selection", attack.name);
				// console.println("setting Weapon");
				// Value(prefix + "Comp.Use.Attack." + fldNmbr + ".Weapon", "Weapon"); // This doesn't seem to ever do anything.
				
				console.println("setting ToHit - first making editable");
				var prevToHitReadonlyVal = fieldAttackToHit.readonly;
				fieldAttackToHit.readonly = false;
				Value(prefix + "Comp.Use.Attack." + fldNmbr + ".To Hit", attack.strToHit); // to hit and damage aren't working either - maybe bc readonly? - they're setting for a moment then get overwritten somehow - need to set prof and ability?
				fieldAttackToHit.readonly = prevToHitReadonlyVal;

				console.println("setting Damage - first making editable");
				var prevDamageReadonlyVal = fieldAttackDamage.readonly;
				fieldAttackDamage.readonly = false;
				Value(prefix + "Comp.Use.Attack." + fldNmbr + ".Damage", attack.strDamage);
				fieldAttackDamage.readonly = prevDamageReadonlyVal;

				console.println("setting Damage Type");
				AddDmgType(prefix + "Comp.Use.Attack." + fldNmbr + ".Damage Type", dmgType)
				console.println("setting Prof");
				Value(prefix + "Comp.Use.Attack." + fldNmbr + ".Proficiency", true);
				// console.println("setting Mod");
				// Value(prefix + "Comp.Use.Attack." + fldNmbr + ".Mod", "Mod"); // Setting the mod field to "Mod" throws an error - InvalidSetError: Set not possible, invalid or unknown.
				console.println("setting range");
				Value(prefix + "Comp.Use.Attack." + fldNmbr + ".Range", atkRange);
				console.println("setting description");
				Value(prefix + "Comp.Use.Attack." + fldNmbr + ".Description", atkDescription);

				// if (!fieldAttackToHit) { console.println("fieldAttackToHit is null."); }
				// if (!fieldAttackDamage) { console.println("fieldAttackDamage is null."); }
				// if (!fieldAttackProf) { console.println("fieldAttackProf is null."); }
				// if (!fieldAttackMod) { console.println("fieldAttackMod is null."); }
				// if (!fieldAttackRange) { console.println("fieldAttackRange is null."); }
				// if (!fieldAttackDescription) { console.println("fieldAttackDescription is null."); }
				// if (!fieldAttackSelection) { console.println("fieldAttackSelection is null."); }
				// if (!fieldAttackWeapon) { console.println("fieldAttackWeapon is null."); }

				// if (fieldAttackToHit) { fieldAttackToHit.value = "ToHit"; }
				// if (fieldAttackDamage) { fieldAttackDamage.value = "Damage"; }
				// if (fieldAttackProf) { fieldAttackProf.value = "Prof"; }
				// if (fieldAttackMod) { fieldAttackMod.value = "Mod"; }
				// if (fieldAttackRange) { fieldAttackRange.value = "range"; }
				// if (fieldAttackDescription) { fieldAttackDescription.value = "description"; }
				// if (fieldAttackSelection) { fieldAttackSelection.value = "Selection"; }
				// if (fieldAttackWeapon) { fieldAttackWeapon.value = "Weapon"; }

				// TODO maybe we should be using the addWeaList() function first? - nvm it's defined and used in the same scope, no callback either
				// Looks like instead of being added in SetWeaponsdropdown function (Functions1.js:2859) companion attacks are added from the CompanionList later
				// using AddWeapon()
				
			}



		};

		app.dysn.summon.EvalCreature = function (prefix) {
			console.println("processing eval");

			// what is remembered currently? - "summon", it comes from the creature.companionApply, and is required for reloading? Maybe? TODO test changing this
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
			var gender;
			var baseHp;
			var speed = null;
			var allAttacks = [];
			var allTraits = [];
			if (su.attacks) { allAttacks = allAttacks.concat(su.attacks); }
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
					if (flavour.attacks && flavour.attacks.length > 0) { allAttacks = allAttacks.concat(flavour.attacks); }
					if (flavour.traits && flavour.traits.length > 0) { allTraits = allTraits.concat(flavour.traits); }
					break;
				}
			}

			var sTraits = null;
			if (!foundFlavour) {
				monsterType = su.monsterType;
				gender = "(any)";
				baseHp = su.baseHp;
			} else {
				// only override traits (etc) if we found a flavour - otherwise don't set traits
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
				attacks: allAttacks,
				sTraits: sTraits,
			};

			for (var atkIndex = 0; atkIndex < allAttacks.length; atkIndex++) {
				var atk = allAttacks[atkIndex];
				var dmgDieNum = atk.damage[0];
				var dmgDieSize = atk.damage[1];
				var dmgDieNumAndSize = dmgDieNum + (dmgDieSize ? "d" + dmgDieSize : "");				
				var dmgBonusFromSpellLevel = sl !== -1 ? atk.dmgPerAdditionalSl * (sl - su.lowestSl) : 0;
				var dmgBonusFromModifiers = atk.modifiers[1] ? atk.modifiers[1] : (0);
				var dmgBonusFromAbilities = atk.abilitytodamage ? 0 : 0; // TODO summon spells don't use ability damage.
				var dmgBonus = dmgBonusFromSpellLevel + dmgBonusFromModifiers + dmgBonusFromAbilities;
				var dmgAmount = dmgDieNumAndSize + (dmgBonus === 0 ? "" : "+" + dmgBonus); // "1d8+5"
				app.dysn.helper.PrintObj(dmgAmount, "dmgAmount");
				atk.strDamage = dmgAmount;

				var characterSpellAttackModifier = 7; // TODO	
				var toHit = characterSpellAttackModifier;			
				atk.strToHit = toHit >= 0 ? "+" + toHit : "-" + (0-toHit); // TODO support DC like Functions2.js:1677
			}

			var attackInfo = {
				spellLevel: sl,
				baseSpellLevel: su.lowestSl,
				allAttacks: allAttacks,
			}

			app.dysn.summon.UpdateFormFields(prefix, summonInfo);
			app.dysn.summon.UpdateAttacks(prefix, attackInfo);
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
			ac: 13,
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
				ability: 0,
				range: "Melee (5 ft)",
				damage: [1, 8, "piercing"],
				modifiers: ["", 6], // need to add spell modifier to hit and spell level to damage
				abilitytodamage: false,
				description: "",
				dmgPerAdditionalSl: 1,
			}],
			features: [{
				name: "Summon Beast",
				description: "You call forth a bestial spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Bestial Spirit stat" +
					"block. When you cast the spell, choose an environment: Air, Land, or Water. The creature resembles an animal of your choice that is native to the chosen " +
					"environment, which determines certain traits in its stat block.",
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