//#region src/module/constants.ts
var e = "wfrp4e-expanded-critical-hits", t = "wfrp4e", n = "debugConsoleLogging";
//#endregion
//#region src/module/logging.ts
function r(e, ...t) {
	s() && console.debug(e, ...t);
}
function i(e, ...t) {
	console.info(e, ...t);
}
function a(e, ...t) {
	console.warn(e, ...t);
}
function o(e, ...t) {
	console.error(e, ...t);
}
function s() {
	try {
		return localStorage.getItem("wfrp4e-expanded-critical-hits.debug") === "true" ? !0 : game?.settings?.settings?.has("wfrp4e-expanded-critical-hits.debugConsoleLogging") ? !!game.settings.get(e, n) : !1;
	} catch {
		return !1;
	}
}
//#endregion
//#region src/module/wfrp4e/critical-compendiums.ts
var c = "expanded-critical-wounds", l = "expanded-critical-tables", u = !1;
async function d() {
	if (u) return;
	let t = game.wfrp4e?.tables, n = t?.findTable?.bind(t);
	if (!t || typeof n != "function") {
		a(`${e} | WFRP table lookup API was unavailable.`);
		return;
	}
	let r = await m();
	r.size === 0 && a(`${e} | No expanded critical RollTables were found in the module pack.`), t.findTable = (e, t) => n(e, t) || r.get(e.toLowerCase()), u = !0;
}
async function f() {
	return {
		criticalItems: await h(c, "Items"),
		criticalTables: await h(l, "Tables")
	};
}
function p(t) {
	return `${e}.${t}`;
}
async function m() {
	let e = /* @__PURE__ */ new Map(), t = game.packs.get(p(l));
	if (!t) return e;
	let n = await t.getDocuments();
	for (let t of n) {
		let n = t.getFlag("wfrp4e", "key");
		typeof n == "string" && e.set(n.toLowerCase(), t);
	}
	return e;
}
async function h(e, t) {
	let n = p(e), r = game.packs.get(n);
	return r ? {
		documentCount: r.index?.size ?? (await r.getDocuments()).length,
		isAvailable: !0,
		label: r.title ?? t,
		packId: n
	} : {
		documentCount: 0,
		isAvailable: !1,
		label: t,
		packId: n
	};
}
//#endregion
//#region src/types/critical-hits.ts
var g = [
	"arrowsBolts",
	"bullets",
	"cold",
	"crushing",
	"cutting",
	"flameEnergy",
	"piercing",
	"shrapnelShot",
	"sling",
	"teethClaws",
	"unarmed"
], _ = [
	"arrows",
	"bolts",
	"bullets",
	"claws",
	"cold",
	"crushing",
	"cutting",
	"energy",
	"flame",
	"piercing",
	"shot",
	"shrapnel",
	"sling",
	"teeth",
	"unarmed"
], v = {
	arrowsBolts: "echarrowbolt",
	bullets: "echbullet",
	cold: "echcold",
	crushing: "echcrushing",
	cutting: "echcutting",
	flameEnergy: "echflameenergy",
	piercing: "echpiercing",
	shrapnelShot: "echshrapnelshot",
	sling: "echsling",
	teethClaws: "echteethclaws",
	unarmed: "echunarmed"
}, y = {
	arrows: "echwoundingarrows",
	bolts: "echwoundingbolts",
	bullets: "echwoundingbullets",
	claws: "echwoundingclaws",
	cold: "echwoundingcold",
	crushing: "echwoundingcrushing",
	cutting: "echwoundingcutting",
	energy: "echwoundingenergy",
	flame: "echwoundingflame",
	piercing: "echwoundingpiercing",
	shot: "echwoundingshot",
	shrapnel: "echwoundingshrapnel",
	sling: "echwoundingsling",
	teeth: "echwoundingteeth",
	unarmed: "echwoundingunarmed"
}, b = {
	arrowsBolts: "Arrows/Bolts",
	bullets: "Bullets",
	cold: "Cold",
	crushing: "Crushing",
	cutting: "Cutting",
	flameEnergy: "Flame & Energy",
	piercing: "Piercing",
	shrapnelShot: "Shrapnel & Shot",
	sling: "Sling",
	teethClaws: "Teeth & Claws",
	unarmed: "Unarmed"
}, x = {
	arrows: "Arrows",
	bolts: "Bolts",
	bullets: "Bullets",
	claws: "Claws",
	cold: "Cold",
	crushing: "Crushing",
	cutting: "Cutting",
	energy: "Energy",
	flame: "Flame",
	piercing: "Piercing",
	shot: "Shot",
	shrapnel: "Shrapnel",
	sling: "Sling",
	teeth: "Teeth",
	unarmed: "Unarmed"
}, ee = {
	arrows: "arrowsBolts",
	bolts: "arrowsBolts",
	bullets: "bullets",
	claws: "teethClaws",
	cold: "cold",
	crushing: "crushing",
	cutting: "cutting",
	energy: "flameEnergy",
	flame: "flameEnergy",
	piercing: "piercing",
	shot: "shrapnelShot",
	shrapnel: "shrapnelShot",
	sling: "sling",
	teeth: "teethClaws",
	unarmed: "unarmed"
}, te = new Map(_.map((e) => [y[e], ee[e]])), ne = new Map(g.map((e) => [v[e], e]));
function re(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = te.get(n) ?? ne.get(n);
		e && t.add(e);
	}
	return g.filter((e) => t.has(e));
}
function ie(e, t = Math.random()) {
	if (e.length !== 0) return e[Math.min(Math.floor(t * e.length), e.length - 1)];
}
var ae = [
	"roll",
	"head",
	"lArm",
	"rArm",
	"body",
	"lLeg",
	"rLeg"
];
//#endregion
//#region src/functions/damage-console/request.ts
function oe(e) {
	return {
		...e,
		damageFormula: e.damageFormula.trim(),
		rollSeparately: e.rollSeparately !== !1,
		targetUuids: [...new Set(e.targetUuids.map((e) => e.trim()).filter(Boolean))]
	};
}
function se(e) {
	let t = [];
	return e.damageFormula.trim() || t.push("damageFormulaRequired"), ae.includes(e.hitLocation) || t.push("hitLocationInvalid"), e.targetUuids.every((e) => !e.trim()) && t.push("targetsRequired"), e.woundingType !== null && !_.includes(e.woundingType) && t.push("woundingTypeInvalid"), t;
}
//#endregion
//#region src/functions/damage-console/card.ts
function ce(e, t) {
	let n = oe(e), r = new Map(t.map((e) => [e.uuid, e]));
	return {
		damageFormula: n.damageFormula,
		hitLocation: n.hitLocation,
		ignoreArmour: n.ignoreArmour,
		ignoreToughness: n.ignoreToughness,
		minimumOne: n.minimumOne,
		roll: null,
		rollSeparately: n.rollSeparately,
		targets: n.targetUuids.map((e) => {
			let t = r.get(e);
			if (!t) throw Error(`Damage console target ${e} could not be resolved.`);
			return {
				...t,
				result: null,
				roll: null
			};
		}),
		version: 2,
		woundingType: n.woundingType
	};
}
function S(e, t) {
	if (e.rollSeparately) throw Error("This damage card rolls separately for each target.");
	if (e.roll) throw Error("Damage has already been rolled for this card.");
	return {
		...e,
		roll: t
	};
}
function le(e, t, n) {
	if (!e.rollSeparately) throw Error("This damage card uses one shared roll.");
	let r = !1, i = e.targets.map((e) => {
		if (e.uuid !== t) return e;
		if (r = !0, e.roll) throw Error(`Damage has already been rolled for ${e.name}.`);
		return {
			...e,
			roll: n
		};
	});
	if (!r) throw Error(`Damage console target ${t} is not part of this card.`);
	return {
		...e,
		targets: i
	};
}
function ue(e, t, n) {
	let r = de(e, t), i = !1, a = e.targets.map((e) => {
		if (e.uuid !== t) return e;
		if (i = !0, e.result) throw Error(`Damage has already been applied to ${e.name}.`);
		if (!r) throw Error(`Damage must be rolled before it can be applied to ${e.name}.`);
		return {
			...e,
			result: n
		};
	});
	if (!i) throw Error(`Damage console target ${t} is not part of this card.`);
	return {
		...e,
		targets: a
	};
}
function de(e, t) {
	let n = e.targets.find((e) => e.uuid === t);
	return e.rollSeparately ? n?.roll : e.roll;
}
function fe(e) {
	if (e.woundingType) return {
		category: ee[e.woundingType],
		woundingType: e.woundingType
	};
}
//#endregion
//#region src/functions/damage-console/card-parser.ts
function pe(e) {
	let t = xe(e);
	if (t?.version !== 1 && t?.version !== 2 || typeof t.damageFormula != "string" || !ye(t.hitLocation) || typeof t.ignoreArmour != "boolean" || typeof t.ignoreToughness != "boolean" || typeof t.minimumOne != "boolean" || !be(t.woundingType) || !Array.isArray(t.targets)) return;
	let n = t.targets.map((e) => t.version === 1 ? _e(e) : me(e)), r = t.version === 1 ? !0 : t.rollSeparately, i = t.version === 1 || t.roll === null ? null : ge(t.roll);
	if (typeof r != "boolean" || i === void 0 || n.some((e) => !e)) return;
	let a = n;
	if (!(r && i || !r && a.some((e) => e.roll) || a.some((e) => e.result && !(r ? e.roll : i)))) return {
		damageFormula: t.damageFormula,
		hitLocation: t.hitLocation,
		ignoreArmour: t.ignoreArmour,
		ignoreToughness: t.ignoreToughness,
		minimumOne: t.minimumOne,
		roll: i,
		rollSeparately: r,
		targets: a,
		version: 2,
		woundingType: t.woundingType
	};
}
function me(e) {
	let t = xe(e), n = ve(t);
	if (!t || !n) return;
	let r = t.roll === null ? null : ge(t.roll), i = t.result === null ? null : he(t.result);
	if (!(r === void 0 || i === void 0)) return {
		...n,
		result: i,
		roll: r
	};
}
function he(e) {
	let t = xe(e);
	if (!(typeof t?.appliedAt != "number" || typeof t.appliedBy != "string" || typeof t.hitLocation != "string" || typeof t.html != "string")) return {
		appliedAt: t.appliedAt,
		appliedBy: t.appliedBy,
		hitLocation: t.hitLocation,
		html: t.html
	};
}
function ge(e) {
	let t = xe(e);
	if (!(typeof t?.damage != "number" || typeof t.rolledAt != "number" || typeof t.rolledBy != "string")) return {
		damage: t.damage,
		rolledAt: t.rolledAt,
		rolledBy: t.rolledBy
	};
}
function _e(e) {
	let t = xe(e), n = ve(t);
	if (!t || !n) return;
	if (t.result === null) return {
		...n,
		result: null,
		roll: null
	};
	let r = xe(t.result);
	if (!(typeof r?.appliedAt != "number" || typeof r.appliedBy != "string" || typeof r.damage != "number" || typeof r.hitLocation != "string" || typeof r.html != "string")) return {
		...n,
		result: {
			appliedAt: r.appliedAt,
			appliedBy: r.appliedBy,
			hitLocation: r.hitLocation,
			html: r.html
		},
		roll: {
			damage: r.damage,
			rolledAt: r.appliedAt,
			rolledBy: r.appliedBy
		}
	};
}
function ve(e) {
	if (!(typeof e?.uuid != "string" || typeof e.name != "string" || typeof e.img != "string")) return {
		img: e.img,
		name: e.name,
		uuid: e.uuid
	};
}
function ye(e) {
	return typeof e == "string" && ae.includes(e);
}
function be(e) {
	return e === null || typeof e == "string" && _.includes(e);
}
function xe(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/card-storage.ts
var Se = "damageConsole";
function Ce(t) {
	return pe(t.getFlag(e, Se));
}
function we(e) {
	if (typeof e != "string") return;
	let t = game.messages.get(e), n = t ? Ce(t) : void 0;
	return n ? fe(n) : void 0;
}
function Te(t, n) {
	let r = De(t.flags) ?? {}, i = De(r["wfrp4e-expanded-critical-hits"]) ?? {};
	t.flags = {
		...r,
		[e]: {
			...i,
			[Se]: n
		}
	};
}
function Ee(t) {
	return { [`flags.${e}.${Se}`]: t };
}
function De(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/card-renderer.ts
function Oe(e) {
	let t = e.woundingType ? x[e.woundingType] : C("damageConsole.unspecified"), n = [e.ignoreArmour ? C("damageConsole.ignoreArmour") : void 0, e.ignoreToughness ? C("damageConsole.ignoreToughness") : void 0].filter((e) => !!e), r = n.length ? n.join(", ") : C("damageConsole.none");
	return `<div class="wfrp4e chat-card ech-damage-console-card">
    <h3><i class="fa-solid fa-bolt"></i> ${Fe(C("damageConsole.cardTitle"))}</h3>
    <dl class="ech-damage-console-card__summary">
      ${Me(C("damageConsole.damage"), e.damageFormula)}
      ${Me(C("damageConsole.hitLocation"), Ne(e.hitLocation))}
      ${Me(C("damageConsole.woundingType"), t)}
      ${Me(C("damageConsole.ignores"), r)}
      ${Me(C("damageConsole.minimumOne"), Pe(e.minimumOne))}
      ${Me(C("damageConsole.rollMode"), C(e.rollSeparately ? "damageConsole.rollSeparately" : "damageConsole.rollTogether"))}
    </dl>
    ${ke(e)}
    <div class="ech-damage-console-card__targets">
      ${e.targets.map((t) => Ae(e, t)).join("")}
    </div>
  </div>`;
}
function ke(e) {
	return e.rollSeparately ? "" : e.roll ? je(e.roll.damage) : `<button type="button" class="chat-button chat-button-gm ech-damage-console-card__action"
    data-ech-action="rollDamage">
    <i class="fa-solid fa-dice-d20"></i> ${Fe(C("damageConsole.rollDamage"))}
  </button>`;
}
function Ae(e, t) {
	let n = `<div class="ech-damage-console-card__identity">
    <img src="${Ie(t.img)}" alt="" />
    <strong>${Fe(t.name)}</strong>
  </div>`, r = e.rollSeparately ? t.roll : e.roll;
	if (!r) return `<section class="ech-damage-console-card__target">
      ${n}
      ${e.rollSeparately ? `<button type="button" class="chat-button chat-button-gm ech-damage-console-card__action"
        data-ech-action="rollDamage" data-target-uuid="${Ie(t.uuid)}">
        <i class="fa-solid fa-dice-d20"></i> ${Fe(C("damageConsole.rollDamage"))}
      </button>` : ""}
    </section>`;
	let i = je(r.damage, t.result?.hitLocation);
	return t.result ? `<section class="ech-damage-console-card__target ech-damage-console-card__target--applied">
    ${n}
    ${i}
    <div class="ech-damage-console-card__result">${t.result.html}</div>
  </section>` : `<section class="ech-damage-console-card__target ech-damage-console-card__target--rolled">
    ${n}
    ${i}
    <button type="button" class="chat-button chat-button-gm ech-damage-console-card__action"
      data-ech-action="applyDamage" data-target-uuid="${Ie(t.uuid)}">
      <i class="fa-solid fa-bolt"></i> ${Fe(C("damageConsole.applyDamage"))}
    </button>
  </section>`;
}
function je(e, t) {
	let n = t ? ` &middot; ${Fe(Ne(t))}` : "";
	return `<p class="ech-damage-console-card__roll">
    ${Fe(C("damageConsole.rolled"))}: <strong>${e}</strong>${n}
  </p>`;
}
function Me(e, t) {
	return `<div><dt>${Fe(e)}</dt><dd>${Fe(t)}</dd></div>`;
}
function Ne(e) {
	if (e === "roll") return game.i18n.localize("Roll");
	let t = game.wfrp4e?.config?.locations?.[e];
	return t ? game.i18n.localize(t) : e;
}
function Pe(e) {
	return C(e ? "damageConsole.yes" : "damageConsole.no");
}
function C(e) {
	return game.i18n.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.${e}`);
}
function Fe(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#039;");
}
function Ie(e) {
	return Fe(e);
}
//#endregion
//#region src/module/wfrp4e/damage-console/targets.ts
function Le() {
	let e = [...game.user.targets].map(ze).filter((e) => !!e);
	return [...new Map(e.map((e) => [e.uuid, e])).values()];
}
async function Re(e) {
	let t = await fromUuid(e), n = t?.actor ?? t;
	if (!Be(n)) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.targetUnavailable", { uuid: e }));
	return {
		actor: n,
		snapshot: {
			img: Ve(t?.texture?.src) ?? "icons/svg/mystery-man.svg",
			name: Ve(t?.name) ?? e,
			uuid: e
		}
	};
}
function ze(e) {
	let t = e, n = t?.document, r = Ve(n?.uuid);
	if (!(!r || !Be(n?.actor ?? t?.actor))) return {
		img: Ve(n?.texture?.src) ?? Ve(t?.texture?.src) ?? "icons/svg/mystery-man.svg",
		name: Ve(t?.name) ?? Ve(n?.name) ?? r,
		uuid: r
	};
}
function Be(e) {
	return typeof e == "object" && !!e && typeof e.applyBasicDamage == "function";
}
function Ve(e) {
	return typeof e == "string" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/runtime.ts
async function He(e, t) {
	let n = de(e, t);
	if (!n) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.rollRequired"));
	let { actor: r } = await Re(t), i = await Ge(e, r), a = Ke(e.ignoreArmour, e.ignoreToughness), o = await r.applyBasicDamage(n.damage, {
		damageType: a,
		loc: i,
		minimumOne: e.minimumOne,
		suppressMsg: !0
	});
	if (typeof o != "string" || !o) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.damageNotApplied"));
	return {
		appliedAt: Date.now(),
		appliedBy: game.user.name,
		hitLocation: i,
		html: o
	};
}
async function Ue(e) {
	let { damage: t, roll: n } = await We(e.damageFormula);
	return await n.toMessage({ flavor: game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.title") }), {
		damage: t,
		rolledAt: Date.now(),
		rolledBy: game.user.name
	};
}
async function We(e) {
	try {
		let t = await Roll.create(e).evaluate(), n = Number(t.total);
		if (!Number.isInteger(n) || n < 0) throw Error("Damage must resolve to a non-negative whole number.");
		return {
			damage: n,
			roll: t
		};
	} catch (t) {
		throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.invalidFormula", { formula: e }), { cause: t });
	}
}
async function Ge(e, t) {
	if (e.hitLocation !== "roll") return e.hitLocation;
	let n = Je(t.details?.hitLocationTable?.value) ?? Je(t.system?.details?.hitLocationTable?.value) ?? "hitloc", r = Je(qe(await game.wfrp4e?.tables?.rollTable?.(n, { hideDSN: !0 }))?.result);
	if (!r) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.hitLocationFailed"));
	return r;
}
function Ke(e, t) {
	let n = game.wfrp4e?.config?.DAMAGE_TYPE;
	if (!n) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.damageApiUnavailable"));
	return e && t ? n.IGNORE_ALL : e ? n.IGNORE_AP : t ? n.IGNORE_TB : n.NORMAL;
}
function qe(e) {
	return typeof e == "object" && e ? e : void 0;
}
function Je(e) {
	return typeof e == "string" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/chat-actions.ts
var Ye = /* @__PURE__ */ new Map();
function Xe() {
	Hooks.on("renderChatMessageHTML", (e, t) => {
		if (!at(e) || !(t instanceof HTMLElement) || !Ce(e)) return;
		let n = t.querySelectorAll("[data-ech-action]");
		if (!game.user.isGM) {
			n.forEach((e) => e.remove());
			return;
		}
		n.forEach((t) => {
			t.addEventListener("click", (n) => {
				n.preventDefault();
				let r = t.dataset.targetUuid, i = t.dataset.echAction;
				!it(i) || i === "applyDamage" && !r || (t.disabled = !0, Ze(e, r, i).catch((e) => {
					t.disabled = !1, ui.notifications?.error(ot(e));
				}));
			});
		});
	});
}
async function Ze(e, t, n) {
	let r = (Ye.get(e.id) ?? Promise.resolve()).catch(() => void 0).then(async () => {
		if (n === "rollDamage") {
			await Qe(e, t);
			return;
		}
		t && await $e(e, t);
	});
	Ye.set(e.id, r);
	try {
		await r;
	} finally {
		Ye.get(e.id) === r && Ye.delete(e.id);
	}
}
async function Qe(e, t) {
	let n = tt(e);
	if (!n.rollSeparately) {
		if (n.roll) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.alreadyRolledShared"));
		await rt(e, S(n, await Ue(n)));
		return;
	}
	if (!t) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.cardTargetUnavailable"));
	let r = nt(n, t);
	if (r.roll) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.alreadyRolled", { name: r.name }));
	await rt(e, le(n, t, await Ue(n)));
}
async function $e(e, t) {
	let { card: n, target: r } = et(e, t);
	if (!de(n, t)) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.rollRequired", { name: r.name }));
	if (r.result) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.alreadyApplied", { name: r.name }));
	await rt(e, ue(n, t, await He(n, t)));
}
function et(e, t) {
	let n = tt(e);
	return {
		card: n,
		target: nt(n, t)
	};
}
function tt(e) {
	let t = Ce(e);
	if (!t) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.cardUnavailable"));
	return t;
}
function nt(e, t) {
	let n = e.targets.find((e) => e.uuid === t);
	if (!n) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.cardTargetUnavailable"));
	return n;
}
async function rt(e, t) {
	await e.update({
		...Ee(t),
		content: Oe(t)
	});
}
function it(e) {
	return e === "applyDamage" || e === "rollDamage";
}
function at(e) {
	return typeof e == "object" && !!e && typeof e.getFlag == "function" && typeof e.update == "function";
}
function ot(e) {
	return e instanceof Error ? e.message : String(e);
}
//#endregion
//#region node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function st(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var w = {}, ct = [], lt = () => {}, ut = () => !1, dt = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ft = (e) => e.startsWith("onUpdate:"), T = Object.assign, pt = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, mt = Object.prototype.hasOwnProperty, E = (e, t) => mt.call(e, t), D = Array.isArray, ht = (e) => bt(e) === "[object Map]", gt = (e) => bt(e) === "[object Set]", _t = (e) => bt(e) === "[object Date]", O = (e) => typeof e == "function", k = (e) => typeof e == "string", A = (e) => typeof e == "symbol", j = (e) => typeof e == "object" && !!e, vt = (e) => (j(e) || O(e)) && O(e.then) && O(e.catch), yt = Object.prototype.toString, bt = (e) => yt.call(e), xt = (e) => bt(e).slice(8, -1), St = (e) => bt(e) === "[object Object]", Ct = (e) => k(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, wt = /* @__PURE__ */ st(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Tt = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, Et = /-\w/g, M = Tt((e) => e.replace(Et, (e) => e.slice(1).toUpperCase())), Dt = /\B([A-Z])/g, Ot = Tt((e) => e.replace(Dt, "-$1").toLowerCase()), kt = Tt((e) => e.charAt(0).toUpperCase() + e.slice(1)), At = Tt((e) => e ? `on${kt(e)}` : ""), jt = (e, t) => !Object.is(e, t), Mt = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, Nt = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, Pt = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, Ft, It = () => Ft ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function Lt(e) {
	if (D(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = k(r) ? Vt(r) : Lt(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (k(e) || j(e)) return e;
}
var Rt = /;(?![^(]*\))/g, zt = /:([^]+)/, Bt = /\/\*[^]*?\*\//g;
function Vt(e) {
	let t = {};
	return e.replace(Bt, "").split(Rt).forEach((e) => {
		if (e) {
			let n = e.split(zt);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function Ht(e) {
	let t = "";
	if (k(e)) t = e;
	else if (D(e)) for (let n = 0; n < e.length; n++) {
		let r = Ht(e[n]);
		r && (t += r + " ");
	}
	else if (j(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var Ut = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Wt = /* @__PURE__ */ st(Ut);
Ut + "";
function Gt(e) {
	return !!e || e === "";
}
function Kt(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = qt(e[r], t[r]);
	return n;
}
function qt(e, t) {
	if (e === t) return !0;
	let n = _t(e), r = _t(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = A(e), r = A(t), n || r) return e === t;
	if (n = D(e), r = D(t), n || r) return n && r ? Kt(e, t) : !1;
	if (n = j(e), r = j(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !qt(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function Jt(e, t) {
	return e.findIndex((e) => qt(e, t));
}
var Yt = (e) => !!(e && e.__v_isRef === !0), N = (e) => k(e) ? e : e == null ? "" : D(e) || j(e) && (e.toString === yt || !O(e.toString)) ? Yt(e) ? N(e.value) : JSON.stringify(e, Xt, 2) : String(e), Xt = (e, t) => Yt(t) ? Xt(e, t.value) : ht(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Zt(t, r) + " =>"] = n, e), {}) } : gt(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Zt(e)) } : A(t) ? Zt(t) : j(t) && !D(t) && !St(t) ? String(t) : t, Zt = (e, t = "") => A(e) ? `Symbol(${e.description ?? t})` : e, P, Qt = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && P && (P.active ? (this.parent = P, this.index = (P.scopes ||= []).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].pause();
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].resume();
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = P;
			try {
				return P = this, e();
			} finally {
				P = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = P, P = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (P === this) P = this.prevScope;
			else {
				let e = P;
				for (; e;) {
					if (e.prevScope === this) {
						e.prevScope = this.prevScope;
						break;
					}
					e = e.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function $t(e) {
	return new Qt(e);
}
function en() {
	return P;
}
function tn(e, t = !1) {
	P && P.cleanups.push(e);
}
var F, nn = /* @__PURE__ */ new WeakSet(), rn = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, P && (P.active ? P.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, nn.has(this) && (nn.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || cn(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, bn(this), dn(this);
		let e = F, t = I;
		F = this, I = !0;
		try {
			return this.fn();
		} finally {
			fn(this), F = e, I = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) hn(e);
			this.deps = this.depsTail = void 0, bn(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? nn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		pn(this) && this.run();
	}
	get dirty() {
		return pn(this);
	}
}, an = 0, on, sn;
function cn(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = sn, sn = e;
		return;
	}
	e.next = on, on = e;
}
function ln() {
	an++;
}
function un() {
	if (--an > 0) return;
	if (sn) {
		let e = sn;
		for (sn = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; on;) {
		let t = on;
		for (on = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function dn(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function fn(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), hn(r), gn(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function pn(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (mn(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function mn(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === xn) || (e.globalVersion = xn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !pn(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = F, r = I;
	F = e, I = !0;
	try {
		dn(e);
		let n = e.fn(e._value);
		(t.version === 0 || jt(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		F = n, I = r, fn(e), e.flags &= -3;
	}
}
function hn(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) hn(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function gn(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var I = !0, _n = [];
function vn() {
	_n.push(I), I = !1;
}
function yn() {
	let e = _n.pop();
	I = e === void 0 ? !0 : e;
}
function bn(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = F;
		F = void 0;
		try {
			t();
		} finally {
			F = e;
		}
	}
}
var xn = 0, Sn = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, Cn = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!F || !I || F === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== F) t = this.activeLink = new Sn(F, this), F.deps ? (t.prevDep = F.depsTail, F.depsTail.nextDep = t, F.depsTail = t) : F.deps = F.depsTail = t, wn(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = F.depsTail, t.nextDep = void 0, F.depsTail.nextDep = t, F.depsTail = t, F.deps === t && (F.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, xn++, this.notify(e);
	}
	notify(e) {
		ln();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			un();
		}
	}
};
function wn(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) wn(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var Tn = /* @__PURE__ */ new WeakMap(), En = /* @__PURE__ */ Symbol(""), Dn = /* @__PURE__ */ Symbol(""), On = /* @__PURE__ */ Symbol("");
function L(e, t, n) {
	if (I && F) {
		let t = Tn.get(e);
		t || Tn.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new Cn()), r.map = t, r.key = n), r.track();
	}
}
function kn(e, t, n, r, i, a) {
	let o = Tn.get(e);
	if (!o) {
		xn++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (ln(), t === "clear") o.forEach(s);
	else {
		let i = D(e), a = i && Ct(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === On || !A(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(On)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(En)), ht(e) && s(o.get(Dn)));
				break;
			case "delete":
				i || (s(o.get(En)), ht(e) && s(o.get(Dn)));
				break;
			case "set":
				ht(e) && s(o.get(En));
				break;
		}
	}
	un();
}
function An(e, t) {
	let n = Tn.get(e);
	return n && n.get(t);
}
function jn(e) {
	let t = /* @__PURE__ */ z(e);
	return t === e ? t : (L(t, "iterate", On), /* @__PURE__ */ R(e) ? t : t.map(vr));
}
function Mn(e) {
	return L(e = /* @__PURE__ */ z(e), "iterate", On), e;
}
function Nn(e, t) {
	return /* @__PURE__ */ hr(e) ? yr(/* @__PURE__ */ mr(e) ? vr(t) : t) : vr(t);
}
var Pn = {
	__proto__: null,
	[Symbol.iterator]() {
		return Fn(this, Symbol.iterator, (e) => Nn(this, e));
	},
	concat(...e) {
		return jn(this).concat(...e.map((e) => D(e) ? jn(e) : e));
	},
	entries() {
		return Fn(this, "entries", (e) => (e[1] = Nn(this, e[1]), e));
	},
	every(e, t) {
		return Ln(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return Ln(this, "filter", e, t, (e) => e.map((e) => Nn(this, e)), arguments);
	},
	find(e, t) {
		return Ln(this, "find", e, t, (e) => Nn(this, e), arguments);
	},
	findIndex(e, t) {
		return Ln(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return Ln(this, "findLast", e, t, (e) => Nn(this, e), arguments);
	},
	findLastIndex(e, t) {
		return Ln(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return Ln(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return zn(this, "includes", e);
	},
	indexOf(...e) {
		return zn(this, "indexOf", e);
	},
	join(e) {
		return jn(this).join(e);
	},
	lastIndexOf(...e) {
		return zn(this, "lastIndexOf", e);
	},
	map(e, t) {
		return Ln(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return Bn(this, "pop");
	},
	push(...e) {
		return Bn(this, "push", e);
	},
	reduce(e, ...t) {
		return Rn(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return Rn(this, "reduceRight", e, t);
	},
	shift() {
		return Bn(this, "shift");
	},
	some(e, t) {
		return Ln(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return Bn(this, "splice", e);
	},
	toReversed() {
		return jn(this).toReversed();
	},
	toSorted(e) {
		return jn(this).toSorted(e);
	},
	toSpliced(...e) {
		return jn(this).toSpliced(...e);
	},
	unshift(...e) {
		return Bn(this, "unshift", e);
	},
	values() {
		return Fn(this, "values", (e) => Nn(this, e));
	}
};
function Fn(e, t, n) {
	let r = Mn(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ R(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var In = Array.prototype;
function Ln(e, t, n, r, i, a) {
	let o = Mn(e), s = o !== e && !/* @__PURE__ */ R(e), c = o[t];
	if (c !== In[t]) {
		let t = c.apply(e, a);
		return s ? vr(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, Nn(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function Rn(e, t, n, r) {
	let i = Mn(e), a = i !== e && !/* @__PURE__ */ R(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = Nn(e, t)), n.call(this, t, Nn(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? Nn(e, c) : c;
}
function zn(e, t, n) {
	let r = /* @__PURE__ */ z(e);
	L(r, "iterate", On);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ gr(n[0]) ? (n[0] = /* @__PURE__ */ z(n[0]), r[t](...n)) : i;
}
function Bn(e, t, n = []) {
	vn(), ln();
	let r = (/* @__PURE__ */ z(e))[t].apply(e, n);
	return un(), yn(), r;
}
var Vn = /* @__PURE__ */ st("__proto__,__v_isRef,__isVue"), Hn = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(A));
function Un(e) {
	A(e) || (e = String(e));
	let t = /* @__PURE__ */ z(this);
	return L(t, "has", e), t.hasOwnProperty(e);
}
var Wn = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? cr : sr : i ? or : ar).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = D(e);
		if (!r) {
			let e;
			if (a && (e = Pn[t])) return e;
			if (t === "hasOwnProperty") return Un;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ B(e) ? e : n);
		if ((A(t) ? Hn.has(t) : Vn(t)) || (r || L(e, "get", t), i)) return o;
		if (/* @__PURE__ */ B(o)) {
			let e = a && Ct(t) ? o : o.value;
			return r && j(e) ? /* @__PURE__ */ fr(e) : e;
		}
		return j(o) ? r ? /* @__PURE__ */ fr(o) : /* @__PURE__ */ ur(o) : o;
	}
}, Gn = class extends Wn {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = D(e) && Ct(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ hr(i);
			if (!/* @__PURE__ */ R(n) && !/* @__PURE__ */ hr(n) && (i = /* @__PURE__ */ z(i), n = /* @__PURE__ */ z(n)), !a && /* @__PURE__ */ B(i) && !/* @__PURE__ */ B(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : E(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ B(e) ? e : r);
		return e === /* @__PURE__ */ z(r) && (o ? jt(n, i) && kn(e, "set", t, n, i) : kn(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = E(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && kn(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!A(t) || !Hn.has(t)) && L(e, "has", t), n;
	}
	ownKeys(e) {
		return L(e, "iterate", D(e) ? "length" : En), Reflect.ownKeys(e);
	}
}, Kn = class extends Wn {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, qn = /* @__PURE__ */ new Gn(), Jn = /* @__PURE__ */ new Kn(), Yn = /* @__PURE__ */ new Gn(!0), Xn = (e) => e, Zn = (e) => Reflect.getPrototypeOf(e);
function Qn(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ z(i), o = ht(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), u = n ? Xn : t ? yr : vr;
		return !t && L(a, "iterate", c ? Dn : En), T(Object.create(l), { next() {
			let { value: e, done: t } = l.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: s ? [u(e[0]), u(e[1])] : u(e),
				done: t
			};
		} });
	};
}
function $n(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function er(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ z(r), a = /* @__PURE__ */ z(n);
			e || (jt(n, a) && L(i, "get", n), L(i, "get", a));
			let { has: o } = Zn(i), s = t ? Xn : e ? yr : vr;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && L(/* @__PURE__ */ z(t), "iterate", En), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ z(n), i = /* @__PURE__ */ z(t);
			return e || (jt(t, i) && L(r, "has", t), L(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ z(a), s = t ? Xn : e ? yr : vr;
			return !e && L(o, "iterate", En), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return T(n, e ? {
		add: $n("add"),
		set: $n("set"),
		delete: $n("delete"),
		clear: $n("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ z(this), r = Zn(n), i = /* @__PURE__ */ z(e), a = !t && !/* @__PURE__ */ R(e) && !/* @__PURE__ */ hr(e) ? i : e;
			return r.has.call(n, a) || jt(e, a) && r.has.call(n, e) || jt(i, a) && r.has.call(n, i) || (n.add(a), kn(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ R(n) && !/* @__PURE__ */ hr(n) && (n = /* @__PURE__ */ z(n));
			let r = /* @__PURE__ */ z(this), { has: i, get: a } = Zn(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ z(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? jt(n, s) && kn(r, "set", e, n, s) : kn(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ z(this), { has: n, get: r } = Zn(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ z(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && kn(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ z(this), t = e.size !== 0, n = e.clear();
			return t && kn(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = Qn(r, e, t);
	}), n;
}
function tr(e, t) {
	let n = er(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(E(n, r) && r in t ? n : t, r, i);
}
var nr = { get: /* @__PURE__ */ tr(!1, !1) }, rr = { get: /* @__PURE__ */ tr(!1, !0) }, ir = { get: /* @__PURE__ */ tr(!0, !1) }, ar = /* @__PURE__ */ new WeakMap(), or = /* @__PURE__ */ new WeakMap(), sr = /* @__PURE__ */ new WeakMap(), cr = /* @__PURE__ */ new WeakMap();
function lr(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function ur(e) {
	return /* @__PURE__ */ hr(e) ? e : pr(e, !1, qn, nr, ar);
}
// @__NO_SIDE_EFFECTS__
function dr(e) {
	return pr(e, !1, Yn, rr, or);
}
// @__NO_SIDE_EFFECTS__
function fr(e) {
	return pr(e, !0, Jn, ir, sr);
}
function pr(e, t, n, r, i) {
	if (!j(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = lr(xt(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function mr(e) {
	return /* @__PURE__ */ hr(e) ? /* @__PURE__ */ mr(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function hr(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function R(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function gr(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function z(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ z(t) : e;
}
function _r(e) {
	return !E(e, "__v_skip") && Object.isExtensible(e) && Nt(e, "__v_skip", !0), e;
}
var vr = (e) => j(e) ? /* @__PURE__ */ ur(e) : e, yr = (e) => j(e) ? /* @__PURE__ */ fr(e) : e;
// @__NO_SIDE_EFFECTS__
function B(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function V(e) {
	return br(e, !1);
}
function br(e, t) {
	return /* @__PURE__ */ B(e) ? e : new xr(e, t);
}
var xr = class {
	constructor(e, t) {
		this.dep = new Cn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ z(e), this._value = t ? e : vr(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ R(e) || /* @__PURE__ */ hr(e);
		e = n ? e : /* @__PURE__ */ z(e), jt(e, t) && (this._rawValue = e, this._value = n ? e : vr(e), this.dep.trigger());
	}
};
function H(e) {
	return /* @__PURE__ */ B(e) ? e.value : e;
}
var Sr = {
	get: (e, t, n) => t === "__v_raw" ? e : H(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ B(i) && !/* @__PURE__ */ B(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Cr(e) {
	return /* @__PURE__ */ mr(e) ? e : new Proxy(e, Sr);
}
// @__NO_SIDE_EFFECTS__
function wr(e) {
	let t = D(e) ? Array(e.length) : {};
	for (let n in e) t[n] = Er(e, n);
	return t;
}
var Tr = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = A(t) ? t : String(t), this._raw = /* @__PURE__ */ z(e);
		let r = !0, i = e;
		if (!D(e) || A(this._key) || !Ct(this._key)) do
			r = !/* @__PURE__ */ gr(i) || /* @__PURE__ */ R(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = H(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ B(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ B(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return An(this._raw, this._key);
	}
};
function Er(e, t, n) {
	return new Tr(e, t, n);
}
var Dr = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new Cn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = xn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && F !== this) return cn(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return mn(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function Or(e, t, n = !1) {
	let r, i;
	return O(e) ? r = e : (r = e.get, i = e.set), new Dr(r, i, n);
}
var kr = {}, Ar = /* @__PURE__ */ new WeakMap(), jr = void 0;
function Mr(e, t = !1, n = jr) {
	if (n) {
		let t = Ar.get(n);
		t || Ar.set(n, t = []), t.push(e);
	}
}
function Nr(e, t, n = w) {
	let { immediate: r, deep: i, once: a, scheduler: o, augmentJob: s, call: c } = n, l = (e) => i ? e : /* @__PURE__ */ R(e) || i === !1 || i === 0 ? Pr(e, 1) : Pr(e), u, d, f, p, m = !1, h = !1;
	if (/* @__PURE__ */ B(e) ? (d = () => e.value, m = /* @__PURE__ */ R(e)) : /* @__PURE__ */ mr(e) ? (d = () => l(e), m = !0) : D(e) ? (h = !0, m = e.some((e) => /* @__PURE__ */ mr(e) || /* @__PURE__ */ R(e)), d = () => e.map((e) => {
		if (/* @__PURE__ */ B(e)) return e.value;
		if (/* @__PURE__ */ mr(e)) return l(e);
		if (O(e)) return c ? c(e, 2) : e();
	})) : d = O(e) ? t ? c ? () => c(e, 2) : e : () => {
		if (f) {
			vn();
			try {
				f();
			} finally {
				yn();
			}
		}
		let t = jr;
		jr = u;
		try {
			return c ? c(e, 3, [p]) : e(p);
		} finally {
			jr = t;
		}
	} : lt, t && i) {
		let e = d, t = i === !0 ? Infinity : i;
		d = () => Pr(e(), t);
	}
	let g = en(), _ = () => {
		u.stop(), g && g.active && pt(g.effects, u);
	};
	if (a && t) {
		let e = t;
		t = (...t) => {
			let n = e(...t);
			return _(), n;
		};
	}
	let v = h ? Array(e.length).fill(kr) : kr, y = (e) => {
		if (!(!(u.flags & 1) || !u.dirty && !e)) if (t) {
			let n = u.run();
			if (e || i || m || (h ? n.some((e, t) => jt(e, v[t])) : jt(n, v))) {
				f && f();
				let e = jr;
				jr = u;
				try {
					let e = [
						n,
						v === kr ? void 0 : h && v[0] === kr ? [] : v,
						p
					];
					v = n, c ? c(t, 3, e) : t(...e);
				} finally {
					jr = e;
				}
			}
		} else u.run();
	};
	return s && s(y), u = new rn(d), u.scheduler = o ? () => o(y, !1) : y, p = (e) => Mr(e, !1, u), f = u.onStop = () => {
		let e = Ar.get(u);
		if (e) {
			if (c) c(e, 4);
			else for (let t of e) t();
			Ar.delete(u);
		}
	}, t ? r ? y(!0) : v = u.run() : o ? o(y.bind(null, !0), !0) : u.run(), _.pause = u.pause.bind(u), _.resume = u.resume.bind(u), _.stop = _, _;
}
function Pr(e, t = Infinity, n) {
	if (t <= 0 || !j(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ B(e)) Pr(e.value, t, n);
	else if (D(e)) for (let r = 0; r < e.length; r++) Pr(e[r], t, n);
	else if (gt(e) || ht(e)) e.forEach((e) => {
		Pr(e, t, n);
	});
	else if (St(e)) {
		for (let r in e) Pr(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Pr(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function Fr(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		Lr(e, t, n);
	}
}
function Ir(e, t, n, r) {
	if (O(e)) {
		let i = Fr(e, t, n, r);
		return i && vt(i) && i.catch((e) => {
			Lr(e, t, n);
		}), i;
	}
	if (D(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(Ir(e[a], t, n, r));
		return i;
	}
}
function Lr(e, t, n, r = !0) {
	let i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || w;
	if (t) {
		let r = t.parent, i = t.proxy, o = `https://vuejs.org/error-reference/#runtime-${n}`;
		for (; r;) {
			let t = r.ec;
			if (t) {
				for (let n = 0; n < t.length; n++) if (t[n](e, i, o) === !1) return;
			}
			r = r.parent;
		}
		if (a) {
			vn(), Fr(a, null, 10, [
				e,
				i,
				o
			]), yn();
			return;
		}
	}
	Rr(e, n, i, r, o);
}
function Rr(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var U = [], zr = -1, Br = [], Vr = null, Hr = 0, Ur = /* @__PURE__ */ Promise.resolve(), Wr = null;
function Gr(e) {
	let t = Wr || Ur;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function Kr(e) {
	let t = zr + 1, n = U.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = U[r], a = Qr(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function qr(e) {
	if (!(e.flags & 1)) {
		let t = Qr(e), n = U[U.length - 1];
		!n || !(e.flags & 2) && t >= Qr(n) ? U.push(e) : U.splice(Kr(t), 0, e), e.flags |= 1, Jr();
	}
}
function Jr() {
	Wr ||= Ur.then($r);
}
function Yr(e) {
	D(e) ? Br.push(...e) : Vr && e.id === -1 ? Vr.splice(Hr + 1, 0, e) : e.flags & 1 || (Br.push(e), e.flags |= 1), Jr();
}
function Xr(e, t, n = zr + 1) {
	for (; n < U.length; n++) {
		let t = U[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			U.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function Zr(e) {
	if (Br.length) {
		let e = [...new Set(Br)].sort((e, t) => Qr(e) - Qr(t));
		if (Br.length = 0, Vr) {
			Vr.push(...e);
			return;
		}
		for (Vr = e, Hr = 0; Hr < Vr.length; Hr++) {
			let e = Vr[Hr];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		Vr = null, Hr = 0;
	}
}
var Qr = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function $r(e) {
	try {
		for (zr = 0; zr < U.length; zr++) {
			let e = U[zr];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), Fr(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; zr < U.length; zr++) {
			let e = U[zr];
			e && (e.flags &= -2);
		}
		zr = -1, U.length = 0, Zr(e), Wr = null, (U.length || Br.length) && $r(e);
	}
}
var W = null, ei = null;
function ti(e) {
	let t = W;
	return W = e, ei = e && e.type.__scopeId || null, t;
}
function ni(e, t = W, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && co(-1);
		let i = ti(t), a;
		try {
			a = e(...n);
		} finally {
			ti(i), r._d && co(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function ri(e, t) {
	if (W === null) return e;
	let n = Ko(W), r = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [i, a, o, s = w] = t[e];
		i && (O(i) && (i = {
			mounted: i,
			updated: i
		}), i.deep && Pr(a), r.push({
			dir: i,
			instance: n,
			value: a,
			oldValue: void 0,
			arg: o,
			modifiers: s
		}));
	}
	return e;
}
function ii(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (vn(), Ir(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), yn());
	}
}
function ai(e, t) {
	if (Z) {
		let n = Z.provides, r = Z.parent && Z.parent.provides;
		r === n && (n = Z.provides = Object.create(r)), n[e] = t;
	}
}
function oi(e, t, n = !1) {
	let r = jo();
	if (r || pa) {
		let i = pa ? pa._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && O(t) ? t.call(r && r.proxy) : t;
	}
}
function si() {
	return !!(jo() || pa);
}
var ci = /* @__PURE__ */ Symbol.for("v-scx"), li = () => oi(ci);
function di(e, t, n) {
	return fi(e, t, n);
}
function fi(e, t, n = w) {
	let { immediate: r, deep: i, flush: a, once: o } = n, s = T({}, n), c = t && r || !t && a !== "post", l;
	if (Lo) {
		if (a === "sync") {
			let e = li();
			l = e.__watcherHandles ||= [];
		} else if (!c) {
			let e = () => {};
			return e.stop = lt, e.resume = lt, e.pause = lt, e;
		}
	}
	let u = Z;
	s.call = (e, t, n) => Ir(e, u, t, n);
	let d = !1;
	a === "post" ? s.scheduler = (e) => {
		K(e, u && u.suspense);
	} : a !== "sync" && (d = !0, s.scheduler = (e, t) => {
		t ? e() : qr(e);
	}), s.augmentJob = (e) => {
		t && (e.flags |= 4), d && (e.flags |= 2, u && (e.id = u.uid, e.i = u));
	};
	let f = Nr(e, t, s);
	return Lo && (l ? l.push(f) : c && f()), f;
}
function pi(e, t, n) {
	let r = this.proxy, i = k(e) ? e.includes(".") ? mi(r, e) : () => r[e] : e.bind(r, r), a;
	O(t) ? a = t : (a = t.handler, n = t);
	let o = Po(this), s = fi(i, a.bind(r), n);
	return o(), s;
}
function mi(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var hi = /* @__PURE__ */ Symbol("_vte"), gi = (e) => e.__isTeleport, _i = /* @__PURE__ */ Symbol("_leaveCb");
function vi(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, vi(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function yi(e, t) {
	return O(e) ? /* @__PURE__ */ T({ name: e.name }, t, { setup: e }) : e;
}
function bi(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function xi(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var Si = /* @__PURE__ */ new WeakMap();
function Ci(e, t, n, r, i = !1) {
	if (D(e)) {
		e.forEach((e, a) => Ci(e, t && (D(t) ? t[a] : t), n, r, i));
		return;
	}
	if (Ti(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Ci(e, t, n, r.component.subTree);
		return;
	}
	let a = r.shapeFlag & 4 ? Ko(r.component) : r.el, o = i ? null : a, { i: s, r: c } = e, l = t && t.r, u = s.refs === w ? s.refs = {} : s.refs, d = s.setupState, f = /* @__PURE__ */ z(d), p = d === w ? ut : (e) => xi(u, e) ? !1 : E(f, e), m = (e, t) => !(t && xi(u, t));
	if (l != null && l !== c) {
		if (wi(t), k(l)) u[l] = null, p(l) && (d[l] = null);
		else if (/* @__PURE__ */ B(l)) {
			let e = t;
			m(l, e.k) && (l.value = null), e.k && (u[e.k] = null);
		}
	}
	if (O(c)) Fr(c, s, 12, [o, u]);
	else {
		let t = k(c), r = /* @__PURE__ */ B(c);
		if (t || r) {
			let s = () => {
				if (e.f) {
					let n = t ? p(c) ? d[c] : u[c] : m(c) || !e.k ? c.value : u[e.k];
					if (i) D(n) && pt(n, a);
					else if (D(n)) n.includes(a) || n.push(a);
					else if (t) u[c] = [a], p(c) && (d[c] = u[c]);
					else {
						let t = [a];
						m(c, e.k) && (c.value = t), e.k && (u[e.k] = t);
					}
				} else t ? (u[c] = o, p(c) && (d[c] = o)) : r && (m(c, e.k) && (c.value = o), e.k && (u[e.k] = o));
			};
			if (o) {
				let t = () => {
					s(), Si.delete(e);
				};
				t.id = -1, Si.set(e, t), K(t, n);
			} else wi(e), s();
		}
	}
}
function wi(e) {
	let t = Si.get(e);
	t && (t.flags |= 8, Si.delete(e));
}
It().requestIdleCallback, It().cancelIdleCallback;
var Ti = (e) => !!e.type.__asyncLoader, Ei = (e) => e.type.__isKeepAlive;
function Di(e, t) {
	ki(e, "a", t);
}
function Oi(e, t) {
	ki(e, "da", t);
}
function ki(e, t, n = Z) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (ji(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) Ei(e.parent.vnode) && Ai(r, t, n, e), e = e.parent;
	}
}
function Ai(e, t, n, r) {
	let i = ji(t, e, r, !0);
	Ri(() => {
		pt(r[t], i);
	}, n);
}
function ji(e, t, n = Z, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			vn();
			let i = Po(n), a = Ir(t, n, e, r);
			return i(), yn(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var Mi = (e) => (t, n = Z) => {
	(!Lo || e === "sp") && ji(e, (...e) => t(...e), n);
}, Ni = Mi("bm"), Pi = Mi("m"), Fi = Mi("bu"), Ii = Mi("u"), Li = Mi("bum"), Ri = Mi("um"), zi = Mi("sp"), Bi = Mi("rtg"), Vi = Mi("rtc");
function Hi(e, t = Z) {
	ji("ec", e, t);
}
var Ui = /* @__PURE__ */ Symbol.for("v-ndc");
function Wi(e, t, n, r) {
	let i, a = n && n[r], o = D(e);
	if (o || k(e)) {
		let n = o && /* @__PURE__ */ mr(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ R(e), s = /* @__PURE__ */ hr(e), e = Mn(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? yr(vr(e[n])) : vr(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (j(e)) if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
	else {
		let n = Object.keys(e);
		i = Array(n.length);
		for (let r = 0, o = n.length; r < o; r++) {
			let o = n[r];
			i[r] = t(e[o], o, r, a && a[r]);
		}
	}
	else i = [];
	return n && (n[r] = i), i;
}
var Gi = (e) => e ? Io(e) ? Ko(e) : Gi(e.parent) : null, Ki = /* @__PURE__ */ T(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => Gi(e.parent),
	$root: (e) => Gi(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => ta(e),
	$forceUpdate: (e) => e.f ||= () => {
		qr(e.update);
	},
	$nextTick: (e) => e.n ||= Gr.bind(e.proxy),
	$watch: (e) => pi.bind(e)
}), qi = (e, t) => e !== w && !e.__isScriptSetup && E(e, t), Ji = {
	get({ _: e }, t) {
		if (t === "__v_skip") return !0;
		let { ctx: n, setupState: r, data: i, props: a, accessCache: o, type: s, appContext: c } = e;
		if (t[0] !== "$") {
			let e = o[t];
			if (e !== void 0) switch (e) {
				case 1: return r[t];
				case 2: return i[t];
				case 4: return n[t];
				case 3: return a[t];
			}
			else if (qi(r, t)) return o[t] = 1, r[t];
			else if (i !== w && E(i, t)) return o[t] = 2, i[t];
			else if (E(a, t)) return o[t] = 3, a[t];
			else if (n !== w && E(n, t)) return o[t] = 4, n[t];
			else Xi && (o[t] = 0);
		}
		let l = Ki[t], u, d;
		if (l) return t === "$attrs" && L(e.attrs, "get", ""), l(e);
		if ((u = s.__cssModules) && (u = u[t])) return u;
		if (n !== w && E(n, t)) return o[t] = 4, n[t];
		if (d = c.config.globalProperties, E(d, t)) return d[t];
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: a } = e;
		return qi(i, t) ? (i[t] = n, !0) : r !== w && E(r, t) ? (r[t] = n, !0) : E(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
		let c;
		return !!(n[s] || e !== w && s[0] !== "$" && E(e, s) || qi(t, s) || E(a, s) || E(r, s) || E(Ki, s) || E(i.config.globalProperties, s) || (c = o.__cssModules) && c[s]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? E(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Yi(e) {
	return D(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var Xi = !0;
function Zi(e) {
	let t = ta(e), n = e.proxy, r = e.ctx;
	Xi = !1, t.beforeCreate && $i(t.beforeCreate, e, "bc");
	let { data: i, computed: a, methods: o, watch: s, provide: c, inject: l, created: u, beforeMount: d, mounted: f, beforeUpdate: p, updated: m, activated: h, deactivated: g, beforeDestroy: _, beforeUnmount: v, destroyed: y, unmounted: b, render: x, renderTracked: ee, renderTriggered: te, errorCaptured: ne, serverPrefetch: re, expose: ie, inheritAttrs: ae, components: oe, directives: se, filters: ce } = t;
	if (l && Qi(l, r, null), o) for (let e in o) {
		let t = o[e];
		O(t) && (r[e] = t.bind(n));
	}
	if (i) {
		let t = i.call(n, n);
		j(t) && (e.data = /* @__PURE__ */ ur(t));
	}
	if (Xi = !0, a) for (let e in a) {
		let t = a[e], i = Jo({
			get: O(t) ? t.bind(n, n) : O(t.get) ? t.get.bind(n, n) : lt,
			set: !O(t) && O(t.set) ? t.set.bind(n) : lt
		});
		Object.defineProperty(r, e, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		});
	}
	if (s) for (let e in s) ea(s[e], r, n, e);
	if (c) {
		let e = O(c) ? c.call(n) : c;
		Reflect.ownKeys(e).forEach((t) => {
			ai(t, e[t]);
		});
	}
	u && $i(u, e, "c");
	function S(e, t) {
		D(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (S(Ni, d), S(Pi, f), S(Fi, p), S(Ii, m), S(Di, h), S(Oi, g), S(Hi, ne), S(Vi, ee), S(Bi, te), S(Li, v), S(Ri, b), S(zi, re), D(ie)) if (ie.length) {
		let t = e.exposed ||= {};
		ie.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	x && e.render === lt && (e.render = x), ae != null && (e.inheritAttrs = ae), oe && (e.components = oe), se && (e.directives = se), re && bi(e);
}
function Qi(e, t, n = lt) {
	D(e) && (e = oa(e));
	for (let n in e) {
		let r = e[n], i;
		i = j(r) ? "default" in r ? oi(r.from || n, r.default, !0) : oi(r.from || n) : oi(r), /* @__PURE__ */ B(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function $i(e, t, n) {
	Ir(D(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function ea(e, t, n, r) {
	let i = r.includes(".") ? mi(n, r) : () => n[r];
	if (k(e)) {
		let n = t[e];
		O(n) && di(i, n);
	} else if (O(e)) di(i, e.bind(n));
	else if (j(e)) if (D(e)) e.forEach((e) => ea(e, t, n, r));
	else {
		let r = O(e.handler) ? e.handler.bind(n) : t[e.handler];
		O(r) && di(i, r, e);
	}
}
function ta(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => na(c, e, o, !0)), na(c, t, o)), j(t) && a.set(t, c), c;
}
function na(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && na(e, a, n, !0), i && i.forEach((t) => na(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = ra[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var ra = {
	data: ia,
	props: ca,
	emits: ca,
	methods: sa,
	computed: sa,
	beforeCreate: G,
	created: G,
	beforeMount: G,
	mounted: G,
	beforeUpdate: G,
	updated: G,
	beforeDestroy: G,
	beforeUnmount: G,
	destroyed: G,
	unmounted: G,
	activated: G,
	deactivated: G,
	errorCaptured: G,
	serverPrefetch: G,
	components: sa,
	directives: sa,
	watch: la,
	provide: ia,
	inject: aa
};
function ia(e, t) {
	return t ? e ? function() {
		return T(O(e) ? e.call(this, this) : e, O(t) ? t.call(this, this) : t);
	} : t : e;
}
function aa(e, t) {
	return sa(oa(e), oa(t));
}
function oa(e) {
	if (D(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function G(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function sa(e, t) {
	return e ? T(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ca(e, t) {
	return e ? D(e) && D(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : T(/* @__PURE__ */ Object.create(null), Yi(e), Yi(t ?? {})) : t;
}
function la(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = T(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = G(e[r], t[r]);
	return n;
}
function ua() {
	return {
		app: null,
		config: {
			isNativeTag: ut,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var da = 0;
function fa(e, t) {
	return function(n, r = null) {
		O(n) || (n = T({}, n)), r != null && !j(r) && (r = null);
		let i = ua(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: da++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Yo,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && O(e.install) ? (a.add(e), e.install(c, ...t)) : O(e) && (a.add(e), e(c, ...t))), c;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), c;
			},
			component(e, t) {
				return t ? (i.components[e] = t, c) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, c) : i.directives[e];
			},
			mount(a, o, l) {
				if (!s) {
					let u = c._ceVNode || _o(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, Ko(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (Ir(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = pa;
				pa = c;
				try {
					return e();
				} finally {
					pa = t;
				}
			}
		};
		return c;
	};
}
var pa = null, ma = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${M(t)}Modifiers`] || e[`${Ot(t)}Modifiers`];
function ha(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || w, i = n, a = t.startsWith("update:"), o = a && ma(r, t.slice(7));
	o && (o.trim && (i = n.map((e) => k(e) ? e.trim() : e)), o.number && (i = n.map(Pt)));
	let s, c = r[s = At(t)] || r[s = At(M(t))];
	!c && a && (c = r[s = At(Ot(t))]), c && Ir(c, e, 6, i);
	let l = r[s + "Once"];
	if (l) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		e.emitted[s] = !0, Ir(l, e, 6, i);
	}
}
var ga = /* @__PURE__ */ new WeakMap();
function _a(e, t, n = !1) {
	let r = n ? ga : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, s = !1;
	if (!O(e)) {
		let r = (e) => {
			let n = _a(e, t, !0);
			n && (s = !0, T(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !s ? (j(e) && r.set(e, null), null) : (D(a) ? a.forEach((e) => o[e] = null) : T(o, a), j(e) && r.set(e, o), o);
}
function va(e, t) {
	return !e || !dt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), E(e, t[0].toLowerCase() + t.slice(1)) || E(e, Ot(t)) || E(e, t));
}
function ya(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: l, renderCache: u, props: d, data: f, setupState: p, ctx: m, inheritAttrs: h } = e, g = ti(e), _, v;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			_ = Co(l.call(t, e, u, d, p, f, m)), v = s;
		} else {
			let e = t;
			_ = Co(e.length > 1 ? e(d, {
				attrs: s,
				slots: o,
				emit: c
			}) : e(d, null)), v = t.props ? s : ba(s);
		}
	} catch (t) {
		ao.length = 0, Lr(t, e, 1), _ = _o(ro);
	}
	let y = _;
	if (v && h !== !1) {
		let e = Object.keys(v), { shapeFlag: t } = y;
		e.length && t & 7 && (a && e.some(ft) && (v = xa(v, a)), y = bo(y, v, !1, !0));
	}
	return n.dirs && (y = bo(y, null, !1, !0), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && vi(y, n.transition), _ = y, ti(g), _;
}
var ba = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || dt(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, xa = (e, t) => {
	let n = {};
	for (let r in e) (!ft(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function Sa(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? Ca(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (wa(o, r, n) && !va(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? Ca(r, o, l) : !0 : !!o;
	return !1;
}
function Ca(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (wa(t, e, a) && !va(n, a)) return !0;
	}
	return !1;
}
function wa(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && j(r) && j(i) ? !qt(r, i) : r !== i;
}
function Ta({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var Ea = {}, Da = () => Object.create(Ea), Oa = (e) => Object.getPrototypeOf(e) === Ea;
function ka(e, t, n, r = !1) {
	let i = {}, a = Da();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), ja(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	n ? e.props = r ? i : /* @__PURE__ */ dr(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function Aa(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ z(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (va(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) if (E(a, o)) u !== a[o] && (a[o] = u, l = !0);
				else {
					let t = M(o);
					i[t] = Ma(c, s, t, u, e, !1);
				}
				else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		ja(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !E(t, a) && ((r = Ot(a)) === a || !E(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = Ma(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !E(t, e)) && (delete a[e], l = !0);
	}
	l && kn(e.attrs, "set", "");
}
function ja(e, t, n, r) {
	let [i, a] = e.propsOptions, o = !1, s;
	if (t) for (let c in t) {
		if (wt(c)) continue;
		let l = t[c], u;
		i && E(i, u = M(c)) ? !a || !a.includes(u) ? n[u] = l : (s ||= {})[u] = l : va(e.emitsOptions, c) || (!(c in r) || l !== r[c]) && (r[c] = l, o = !0);
	}
	if (a) {
		let t = /* @__PURE__ */ z(n), r = s || w;
		for (let o = 0; o < a.length; o++) {
			let s = a[o];
			n[s] = Ma(i, t, s, r[s], e, !E(r, s));
		}
	}
	return o;
}
function Ma(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = E(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && O(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = Po(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === Ot(n)) && (r = !0));
	}
	return r;
}
var Na = /* @__PURE__ */ new WeakMap();
function Pa(e, t, n = !1) {
	let r = n ? Na : t.propsCache, i = r.get(e);
	if (i) return i;
	let a = e.props, o = {}, s = [], c = !1;
	if (!O(e)) {
		let r = (e) => {
			c = !0;
			let [n, r] = Pa(e, t, !0);
			T(o, n), r && s.push(...r);
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	if (!a && !c) return j(e) && r.set(e, ct), ct;
	if (D(a)) for (let e = 0; e < a.length; e++) {
		let t = M(a[e]);
		Fa(t) && (o[t] = w);
	}
	else if (a) for (let e in a) {
		let t = M(e);
		if (Fa(t)) {
			let n = a[e], r = o[t] = D(n) || O(n) ? { type: n } : T({}, n), i = r.type, c = !1, l = !0;
			if (D(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = O(t) && t.name;
				if (n === "Boolean") {
					c = !0;
					break;
				} else n === "String" && (l = !1);
			}
			else c = O(i) && i.name === "Boolean";
			r[0] = c, r[1] = l, (c || E(r, "default")) && s.push(t);
		}
	}
	let l = [o, s];
	return j(e) && r.set(e, l), l;
}
function Fa(e) {
	return e[0] !== "$" && !wt(e);
}
var Ia = (e) => e === "_" || e === "_ctx" || e === "$stable", La = (e) => D(e) ? e.map(Co) : [Co(e)], Ra = (e, t, n) => {
	if (t._n) return t;
	let r = ni((...e) => La(t(...e)), n);
	return r._c = !1, r;
}, za = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (Ia(n)) continue;
		let i = e[n];
		if (O(i)) t[n] = Ra(n, i, r);
		else if (i != null) {
			let e = La(i);
			t[n] = () => e;
		}
	}
}, Ba = (e, t) => {
	let n = La(t);
	e.slots.default = () => n;
}, Va = (e, t, n) => {
	for (let r in t) (n || !Ia(r)) && (e[r] = t[r]);
}, Ha = (e, t, n) => {
	let r = e.slots = Da();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Va(r, t, n), n && Nt(r, "_", e, !0)) : za(t, r);
	} else t && Ba(e, t);
}, Ua = (e, t, n) => {
	let { vnode: r, slots: i } = e, a = !0, o = w;
	if (r.shapeFlag & 32) {
		let e = t._;
		e ? n && e === 1 ? a = !1 : Va(i, t, n) : (a = !t.$stable, za(t, i)), o = t;
	} else t && (Ba(e, t), o = { default: 1 });
	if (a) for (let e in i) !Ia(e) && o[e] == null && delete i[e];
}, K = to;
function Wa(e) {
	return Ga(e);
}
function Ga(e, t) {
	let n = It();
	n.__VUE__ = !0;
	let { insert: r, remove: i, patchProp: a, createElement: o, createText: s, createComment: c, setText: l, setElementText: u, parentNode: d, nextSibling: f, setScopeId: p = lt, insertStaticContent: m } = e, h = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !mo(e, t) && (r = be(e), he(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case no:
				g(e, t, n, r);
				break;
			case ro:
				_(e, t, n, r);
				break;
			case io:
				e ?? v(t, n, r, o);
				break;
			case q:
				oe(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? x(e, t, n, r, i, a, o, s, c) : d & 6 ? se(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, Ce);
		}
		u != null && i ? Ci(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && Ci(e.ref, null, a, e, !0);
	}, g = (e, t, n, i) => {
		if (e == null) r(t.el = s(t.children), n, i);
		else {
			let n = t.el = e.el;
			t.children !== e.children && l(n, t.children);
		}
	}, _ = (e, t, n, i) => {
		e == null ? r(t.el = c(t.children || ""), n, i) : t.el = e.el;
	}, v = (e, t, n, r) => {
		[e.el, e.anchor] = m(e.children, t, n, r, e.el, e.anchor);
	}, y = ({ el: e, anchor: t }, n, i) => {
		let a;
		for (; e && e !== t;) a = f(e), r(e, n, i), e = a;
		r(t, n, i);
	}, b = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, x = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) ee(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), re(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, ee = (e, t, n, i, s, c, l, d) => {
		let f, p, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (f = e.el = o(e.type, c, m && m.is, m), h & 8 ? u(f, e.children) : h & 16 && ne(e.children, f, null, i, s, Ka(e, c), l, d), _ && ii(e, null, i, "created"), te(f, e, e.scopeId, l, i), m) {
			for (let e in m) e !== "value" && !wt(e) && a(f, e, null, m[e], c, i);
			"value" in m && a(f, "value", null, m.value, c), (p = m.onVnodeBeforeMount) && Do(p, i, e);
		}
		_ && ii(e, null, i, "beforeMount");
		let v = Ja(s, g);
		v && g.beforeEnter(f), r(f, t, n), ((p = m && m.onVnodeMounted) || v || _) && K(() => {
			try {
				p && Do(p, i, e), v && g.enter(f), _ && ii(e, null, i, "mounted");
			} finally {}
		}, s);
	}, te = (e, t, n, r, i) => {
		if (n && p(e, n), r) for (let t = 0; t < r.length; t++) p(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || eo(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				te(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, ne = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) h(null, e[l] = s ? wo(e[l]) : Co(e[l]), t, n, r, i, a, o, s);
	}, re = (e, t, n, r, i, o, s) => {
		let c = t.el = e.el, { patchFlag: l, dynamicChildren: d, dirs: f } = t;
		l |= e.patchFlag & 16;
		let p = e.props || w, m = t.props || w, h;
		if (n && qa(n, !1), (h = m.onVnodeBeforeUpdate) && Do(h, n, t, e), f && ii(t, e, n, "beforeUpdate"), n && qa(n, !0), (p.innerHTML && m.innerHTML == null || p.textContent && m.textContent == null) && u(c, ""), d ? ie(e.dynamicChildren, d, c, n, r, Ka(t, i), o) : s || de(e, t, c, null, n, r, Ka(t, i), o, !1), l > 0) {
			if (l & 16) ae(c, p, m, n, i);
			else if (l & 2 && p.class !== m.class && a(c, "class", null, m.class, i), l & 4 && a(c, "style", p.style, m.style, i), l & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], o = p[r], s = m[r];
					(s !== o || r === "value") && a(c, r, o, s, i, n);
				}
			}
			l & 1 && e.children !== t.children && u(c, t.children);
		} else !s && d == null && ae(c, p, m, n, i);
		((h = m.onVnodeUpdated) || f) && K(() => {
			h && Do(h, n, t, e), f && ii(t, e, n, "updated");
		}, r);
	}, ie = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			h(c, l, c.el && (c.type === q || !mo(c, l) || c.shapeFlag & 198) ? d(c.el) : n, null, r, i, a, o, !0);
		}
	}, ae = (e, t, n, r, i) => {
		if (t !== n) {
			if (t !== w) for (let o in t) !wt(o) && !(o in n) && a(e, o, t[o], null, i, r);
			for (let o in n) {
				if (wt(o)) continue;
				let s = n[o], c = t[o];
				s !== c && o !== "value" && a(e, o, c, s, i, r);
			}
			"value" in n && a(e, "value", t.value, n.value, i);
		}
	}, oe = (e, t, n, i, a, o, c, l, u) => {
		let d = t.el = e ? e.el : s(""), f = t.anchor = e ? e.anchor : s(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (l = l ? l.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), ne(t.children || [], n, f, a, o, c, l, u)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (ie(e.dynamicChildren, m, n, a, o, c, l), (t.key != null || a && t === a.subTree) && Ya(e, t, !0)) : de(e, t, n, f, a, o, c, l, u);
	}, se = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : ce(t, n, r, i, a, o, c) : S(e, t, c);
	}, ce = (e, t, n, r, i, a, o) => {
		let s = e.component = Ao(e, r, i);
		if (Ei(e) && (s.ctx.renderer = Ce), Ro(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, le, o), !e.el) {
				let r = s.subTree = _o(ro);
				_(null, r, t, n), e.placeholder = r.el;
			}
		} else le(s, e, t, n, i, a, o);
	}, S = (e, t, n) => {
		let r = t.component = e.component;
		if (Sa(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			ue(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, le = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Za(e);
					if (n) {
						t && (t.el = c.el, ue(e, t, o)), n.asyncDep.then(() => {
							K(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, f;
				qa(e, !1), t ? (t.el = c.el, ue(e, t, o)) : t = c, n && Mt(n), (f = t.props && t.props.onVnodeBeforeUpdate) && Do(f, s, t, c), qa(e, !0);
				let p = ya(e), m = e.subTree;
				e.subTree = p, h(m, p, d(m.el), be(m), e, i, a), t.el = p.el, u === null && Ta(e, p.el), r && K(r, i), (f = t.props && t.props.onVnodeUpdated) && K(() => Do(f, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = Ti(t);
				if (qa(e, !1), l && Mt(l), !m && (o = c && c.onVnodeBeforeMount) && Do(o, d, t), qa(e, !0), s && Te) {
					let t = () => {
						e.subTree = ya(e), Te(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = ya(e);
					h(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && K(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					K(() => Do(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && Ti(d.vnode) && d.vnode.shapeFlag & 256) && e.a && K(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new rn(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => qr(u), qa(e, !0), l();
	}, ue = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, Aa(e, t.props, r, n), Ua(e, t.children, n), vn(), Xr(e), yn();
	}, de = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, d = e ? e.shapeFlag : 0, f = t.children, { patchFlag: p, shapeFlag: m } = t;
		if (p > 0) {
			if (p & 128) {
				pe(l, f, n, r, i, a, o, s, c);
				return;
			} else if (p & 256) {
				fe(l, f, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (d & 16 && ye(l, i, a), f !== l && u(n, f)) : d & 16 ? m & 16 ? pe(l, f, n, r, i, a, o, s, c) : ye(l, i, a, !0) : (d & 8 && u(n, ""), m & 16 && ne(f, n, r, i, a, o, s, c));
	}, fe = (e, t, n, r, i, a, o, s, c) => {
		e ||= ct, t ||= ct;
		let l = e.length, u = t.length, d = Math.min(l, u), f;
		for (f = 0; f < d; f++) {
			let r = t[f] = c ? wo(t[f]) : Co(t[f]);
			h(e[f], r, n, null, i, a, o, s, c);
		}
		l > u ? ye(e, i, a, !0, !1, d) : ne(t, n, r, i, a, o, s, c, d);
	}, pe = (e, t, n, r, i, a, o, s, c) => {
		let l = 0, u = t.length, d = e.length - 1, f = u - 1;
		for (; l <= d && l <= f;) {
			let r = e[l], u = t[l] = c ? wo(t[l]) : Co(t[l]);
			if (mo(r, u)) h(r, u, n, null, i, a, o, s, c);
			else break;
			l++;
		}
		for (; l <= d && l <= f;) {
			let r = e[d], l = t[f] = c ? wo(t[f]) : Co(t[f]);
			if (mo(r, l)) h(r, l, n, null, i, a, o, s, c);
			else break;
			d--, f--;
		}
		if (l > d) {
			if (l <= f) {
				let e = f + 1, d = e < u ? t[e].el : r;
				for (; l <= f;) h(null, t[l] = c ? wo(t[l]) : Co(t[l]), n, d, i, a, o, s, c), l++;
			}
		} else if (l > f) for (; l <= d;) he(e[l], i, a, !0), l++;
		else {
			let p = l, m = l, g = /* @__PURE__ */ new Map();
			for (l = m; l <= f; l++) {
				let e = t[l] = c ? wo(t[l]) : Co(t[l]);
				e.key != null && g.set(e.key, l);
			}
			let _, v = 0, y = f - m + 1, b = !1, x = 0, ee = Array(y);
			for (l = 0; l < y; l++) ee[l] = 0;
			for (l = p; l <= d; l++) {
				let r = e[l];
				if (v >= y) {
					he(r, i, a, !0);
					continue;
				}
				let u;
				if (r.key != null) u = g.get(r.key);
				else for (_ = m; _ <= f; _++) if (ee[_ - m] === 0 && mo(r, t[_])) {
					u = _;
					break;
				}
				u === void 0 ? he(r, i, a, !0) : (ee[u - m] = l + 1, u >= x ? x = u : b = !0, h(r, t[u], n, null, i, a, o, s, c), v++);
			}
			let te = b ? Xa(ee) : ct;
			for (_ = te.length - 1, l = y - 1; l >= 0; l--) {
				let e = m + l, d = t[e], f = t[e + 1], p = e + 1 < u ? f.el || $a(f) : r;
				ee[l] === 0 ? h(null, d, n, p, i, a, o, s, c) : b && (_ < 0 || l !== te[_] ? me(d, n, p, 2) : _--);
			}
		}
	}, me = (e, t, n, a, o = null) => {
		let { el: s, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			me(e.component.subTree, t, n, a);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, a);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, Ce);
			return;
		}
		if (c === q) {
			r(s, t, n);
			for (let e = 0; e < u.length; e++) me(u[e], t, n, a);
			r(e.anchor, t, n);
			return;
		}
		if (c === io) {
			y(e, t, n);
			return;
		}
		if (a !== 2 && d & 1 && l) if (a === 0) l.persisted && !s[_i] ? r(s, t, n) : (l.beforeEnter(s), r(s, t, n), K(() => l.enter(s), o));
		else {
			let { leave: a, delayLeave: o, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? i(s) : r(s, t, n);
			}, d = () => {
				let e = s._isLeaving || !!s[_i];
				s._isLeaving && s[_i](!0), l.persisted && !e ? u() : a(s, () => {
					u(), c && c();
				});
			};
			o ? o(s, u, d) : d();
		}
		else r(s, t, n);
	}, he = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (vn(), Ci(s, null, n, e, !0), yn()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !Ti(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && Do(_, t, e), u & 6) ve(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && ii(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, Ce, r) : l && !l.hasOnce && (a !== q || d > 0 && d & 64) ? ye(l, t, n, !1, !0) : (a === q && d & 384 || !i && u & 16) && ye(c, t, n), r && ge(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && K(() => {
			_ && Do(_, t, e), h && ii(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, ge = (e) => {
		let { type: t, el: n, anchor: r, transition: a } = e;
		if (t === q) {
			_e(n, r);
			return;
		}
		if (t === io) {
			b(e);
			return;
		}
		let o = () => {
			i(n), a && !a.persisted && a.afterLeave && a.afterLeave();
		};
		if (e.shapeFlag & 1 && a && !a.persisted) {
			let { leave: t, delayLeave: r } = a, i = () => t(n, o);
			r ? r(e.el, o, i) : i();
		} else o();
	}, _e = (e, t) => {
		let n;
		for (; e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, ve = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Qa(c), Qa(l), r && Mt(r), i.stop(), a && (a.flags |= 8, he(o, e, t, n)), s && K(s, t), K(() => {
			e.isUnmounted = !0;
		}, t);
	}, ye = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) he(e[o], t, n, r, i);
	}, be = (e) => {
		if (e.shapeFlag & 6) return be(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = f(e.anchor || e.el), n = t && t[hi];
		return n ? f(n) : t;
	}, xe = !1, Se = (e, t, n) => {
		let r;
		e == null ? t._vnode && (he(t._vnode, null, null, !0), r = t._vnode.component) : h(t._vnode || null, e, t, null, null, null, n), t._vnode = e, xe ||= (xe = !0, Xr(r), Zr(), !1);
	}, Ce = {
		p: h,
		um: he,
		m: me,
		r: ge,
		mt: ce,
		mc: ne,
		pc: de,
		pbc: ie,
		n: be,
		o: e
	}, we, Te;
	return t && ([we, Te] = t(Ce)), {
		render: Se,
		hydrate: we,
		createApp: fa(Se, we)
	};
}
function Ka({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function qa({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ja(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ya(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (D(r) && D(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = wo(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Ya(t, a)), a.type === no && (a.patchFlag === -1 && (a = i[e] = wo(a)), a.el = t.el), a.type === ro && !a.el && (a.el = t.el);
	}
}
function Xa(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function Za(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Za(t);
}
function Qa(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function $a(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? $a(t.subTree) : null;
}
var eo = (e) => e.__isSuspense;
function to(e, t) {
	t && t.pendingBranch ? D(e) ? t.effects.push(...e) : t.effects.push(e) : Yr(e);
}
var q = /* @__PURE__ */ Symbol.for("v-fgt"), no = /* @__PURE__ */ Symbol.for("v-txt"), ro = /* @__PURE__ */ Symbol.for("v-cmt"), io = /* @__PURE__ */ Symbol.for("v-stc"), ao = [], J = null;
function Y(e = !1) {
	ao.push(J = e ? null : []);
}
function oo() {
	ao.pop(), J = ao[ao.length - 1] || null;
}
var so = 1;
function co(e, t = !1) {
	so += e, e < 0 && J && t && (J.hasOnce = !0);
}
function lo(e) {
	return e.dynamicChildren = so > 0 ? J || ct : null, oo(), so > 0 && J && J.push(e), e;
}
function uo(e, t, n, r, i, a) {
	return lo(X(e, t, n, r, i, a, !0));
}
function fo(e, t, n, r, i) {
	return lo(_o(e, t, n, r, i, !0));
}
function po(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function mo(e, t) {
	return e.type === t.type && e.key === t.key;
}
var ho = ({ key: e }) => e ?? null, go = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : k(e) || /* @__PURE__ */ B(e) || O(e) ? {
	i: W,
	r: e,
	k: t,
	f: !!n
} : e);
function X(e, t = null, n = null, r = 0, i = null, a = e === q ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && ho(t),
		ref: t && go(t),
		scopeId: ei,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: W
	};
	return s ? (To(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= k(n) ? 8 : 16), so > 0 && !o && J && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && J.push(c), c;
}
var _o = vo;
function vo(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === Ui) && (e = ro), po(e)) {
		let r = bo(e, t, !0);
		return n && To(r, n), so > 0 && !a && J && (r.shapeFlag & 6 ? J[J.indexOf(e)] = r : J.push(r)), r.patchFlag = -2, r;
	}
	if (qo(e) && (e = e.__vccOpts), t) {
		t = yo(t);
		let { class: e, style: n } = t;
		e && !k(e) && (t.class = Ht(e)), j(n) && (/* @__PURE__ */ gr(n) && !D(n) && (n = T({}, n)), t.style = Lt(n));
	}
	let o = k(e) ? 1 : eo(e) ? 128 : gi(e) ? 64 : j(e) ? 4 : O(e) ? 2 : 0;
	return X(e, t, n, r, i, o, a, !0);
}
function yo(e) {
	return e ? /* @__PURE__ */ gr(e) || Oa(e) ? T({}, e) : e : null;
}
function bo(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? Eo(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && ho(l),
		ref: t && t.ref ? n && a ? D(a) ? a.concat(go(t)) : [a, go(t)] : go(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== q ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && bo(e.ssContent),
		ssFallback: e.ssFallback && bo(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && vi(u, c.clone(u)), u;
}
function xo(e = " ", t = 0) {
	return _o(no, null, e, t);
}
function So(e = "", t = !1) {
	return t ? (Y(), fo(ro, null, e)) : _o(ro, null, e);
}
function Co(e) {
	return e == null || typeof e == "boolean" ? _o(ro) : D(e) ? _o(q, null, e.slice()) : po(e) ? wo(e) : _o(no, null, String(e));
}
function wo(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : bo(e);
}
function To(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (D(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), To(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !Oa(t) ? t._ctx = W : r === 3 && W && (W.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else O(t) ? (t = {
		default: t,
		_ctx: W
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [xo(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function Eo(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = Ht([t.class, r.class]));
		else if (e === "style") t.style = Lt([t.style, r.style]);
		else if (dt(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(D(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !ft(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function Do(e, t, n, r = null) {
	Ir(e, t, 7, [n, r]);
}
var Oo = ua(), ko = 0;
function Ao(e, t, n) {
	let r = e.type, i = (t ? t.appContext : e.appContext) || Oo, a = {
		uid: ko++,
		vnode: e,
		type: r,
		parent: t,
		appContext: i,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Qt(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: t ? t.provides : Object.create(i.provides),
		ids: t ? t.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: Pa(r, i),
		emitsOptions: _a(r, i),
		emit: null,
		emitted: null,
		propsDefaults: w,
		inheritAttrs: r.inheritAttrs,
		ctx: w,
		data: w,
		props: w,
		attrs: w,
		slots: w,
		refs: w,
		setupState: w,
		setupContext: null,
		suspense: n,
		suspenseId: n ? n.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = ha.bind(null, a), e.ce && e.ce(a), a;
}
var Z = null, jo = () => Z || W, Mo, No;
{
	let e = It(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	Mo = t("__VUE_INSTANCE_SETTERS__", (e) => Z = e), No = t("__VUE_SSR_SETTERS__", (e) => Lo = e);
}
var Po = (e) => {
	let t = Z;
	return Mo(e), e.scope.on(), () => {
		e.scope.off(), Mo(t);
	};
}, Fo = () => {
	Z && Z.scope.off(), Mo(null);
};
function Io(e) {
	return e.vnode.shapeFlag & 4;
}
var Lo = !1;
function Ro(e, t = !1, n = !1) {
	t && No(t);
	let { props: r, children: i } = e.vnode, a = Io(e);
	ka(e, r, a, t), Ha(e, i, n || t);
	let o = a ? zo(e, t) : void 0;
	return t && No(!1), o;
}
function zo(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ji);
	let { setup: r } = n;
	if (r) {
		vn();
		let n = e.setupContext = r.length > 1 ? Go(e) : null, i = Po(e), a = Fr(r, e, 0, [e.props, n]), o = vt(a);
		if (yn(), i(), (o || e.sp) && !Ti(e) && bi(e), o) {
			if (a.then(Fo, Fo), t) return a.then((n) => {
				Bo(e, n, t);
			}).catch((t) => {
				Lr(t, e, 0);
			});
			e.asyncDep = a;
		} else Bo(e, a, t);
	} else Uo(e, t);
}
function Bo(e, t, n) {
	O(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : j(t) && (e.setupState = Cr(t)), Uo(e, n);
}
var Vo, Ho;
function Uo(e, t, n) {
	let r = e.type;
	if (!e.render) {
		if (!t && Vo && !r.render) {
			let t = r.template || ta(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: o } = r;
				r.render = Vo(t, T(T({
					isCustomElement: n,
					delimiters: a
				}, i), o));
			}
		}
		e.render = r.render || lt, Ho && Ho(e);
	}
	{
		let t = Po(e);
		vn();
		try {
			Zi(e);
		} finally {
			yn(), t();
		}
	}
}
var Wo = { get(e, t) {
	return L(e, "get", ""), e[t];
} };
function Go(e) {
	return {
		attrs: new Proxy(e.attrs, Wo),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function Ko(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Cr(_r(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Ki) return Ki[n](e);
		},
		has(e, t) {
			return t in e || t in Ki;
		}
	}) : e.proxy;
}
function qo(e) {
	return O(e) && "__vccOpts" in e;
}
var Jo = (e, t) => /* @__PURE__ */ Or(e, t, Lo), Yo = "3.5.38", Xo = void 0, Zo = typeof window < "u" && window.trustedTypes;
if (Zo) try {
	Xo = /* @__PURE__ */ Zo.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Qo = Xo ? (e) => Xo.createHTML(e) : (e) => e, $o = "http://www.w3.org/2000/svg", es = "http://www.w3.org/1998/Math/MathML", ts = typeof document < "u" ? document : null, ns = ts && /* @__PURE__ */ ts.createElement("template"), rs = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? ts.createElementNS($o, e) : t === "mathml" ? ts.createElementNS(es, e) : n ? ts.createElement(e, { is: n }) : ts.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => ts.createTextNode(e),
	createComment: (e) => ts.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => ts.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			ns.innerHTML = Qo(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = ns.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, is = /* @__PURE__ */ Symbol("_vtc");
function as(e, t, n) {
	let r = e[is];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var os = /* @__PURE__ */ Symbol("_vod"), ss = /* @__PURE__ */ Symbol("_vsh"), cs = /* @__PURE__ */ Symbol(""), ls = /(?:^|;)\s*display\s*:/;
function us(e, t, n) {
	let r = e.style, i = k(n), a = !1;
	if (n && !i) {
		if (t) if (k(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? fs(r, t, "");
		}
		else for (let e in t) n[e] ?? fs(r, e, "");
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? fs(r, i, "") : gs(e, i, !k(t) && t ? t[i] : void 0, o) || fs(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[cs];
			e && (n += ";" + e), r.cssText = n, a = ls.test(n);
		}
	} else t && e.removeAttribute("style");
	os in e && (e[os] = a ? r.display : "", e[ss] && (r.display = "none"));
}
var ds = /\s*!important$/;
function fs(e, t, n) {
	if (D(n)) n.forEach((n) => fs(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = hs(e, t);
		ds.test(n) ? e.setProperty(Ot(r), n.replace(ds, ""), "important") : e[r] = n;
	}
}
var ps = [
	"Webkit",
	"Moz",
	"ms"
], ms = {};
function hs(e, t) {
	let n = ms[t];
	if (n) return n;
	let r = M(t);
	if (r !== "filter" && r in e) return ms[t] = r;
	r = kt(r);
	for (let n = 0; n < ps.length; n++) {
		let i = ps[n] + r;
		if (i in e) return ms[t] = i;
	}
	return t;
}
function gs(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && k(r) && n === r;
}
var _s = "http://www.w3.org/1999/xlink";
function vs(e, t, n, r, i, a = Wt(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(_s, t.slice(6, t.length)) : e.setAttributeNS(_s, t, n) : n == null || a && !Gt(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : A(n) ? String(n) : n);
}
function ys(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Qo(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		(r !== i || !("_value" in e)) && (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = Gt(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function bs(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function xs(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var Ss = /* @__PURE__ */ Symbol("_vei");
function Cs(e, t, n, r, i = null) {
	let a = e[Ss] || (e[Ss] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = Ts(t);
		r ? bs(e, n, a[t] = ks(r, i), s) : o && (xs(e, n, o, s), a[t] = void 0);
	}
}
var ws = /(?:Once|Passive|Capture)$/;
function Ts(e) {
	let t;
	if (ws.test(e)) {
		t = {};
		let n;
		for (; n = e.match(ws);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
	}
	return [e[2] === ":" ? e.slice(3) : Ot(e.slice(2)), t];
}
var Es = 0, Ds = /* @__PURE__ */ Promise.resolve(), Os = () => Es ||= (Ds.then(() => Es = 0), Date.now());
function ks(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (D(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && Ir(e, t, 5, a);
			}
		} else Ir(r, t, 5, [e]);
	};
	return n.value = e, n.attached = Os(), n;
}
var As = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, js = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? as(e, r, o) : t === "style" ? us(e, n, r) : dt(t) ? ft(t) || Cs(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ms(e, t, r, o)) ? (ys(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && vs(e, t, r, o, a, t !== "value")) : e._isVueCE && (Ns(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !k(r))) ? ys(e, M(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), vs(e, t, r, o));
};
function Ms(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && As(t) && O(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return As(t) && k(n) ? !1 : t in e;
}
function Ns(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = M(t);
	return Array.isArray(n) ? n.some((e) => M(e) === r) : Object.keys(n).some((e) => M(e) === r);
}
var Ps = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return D(t) ? (e) => Mt(t, e) : t;
};
function Fs(e) {
	e.target.composing = !0;
}
function Is(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Ls = /* @__PURE__ */ Symbol("_assign");
function Rs(e, t, n) {
	return t && (e = e.trim()), n && (e = Pt(e)), e;
}
var zs = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[Ls] = Ps(i);
		let a = r || i.props && i.props.type === "number";
		bs(e, t ? "change" : "input", (t) => {
			t.target.composing || e[Ls](Rs(e.value, n, a));
		}), (n || a) && bs(e, "change", () => {
			e.value = Rs(e.value, n, a);
		}), t || (bs(e, "compositionstart", Fs), bs(e, "compositionend", Is), bs(e, "change", Is));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[Ls] = Ps(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? Pt(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, Bs = {
	deep: !0,
	created(e, t, n) {
		e[Ls] = Ps(n), bs(e, "change", () => {
			let t = e._modelValue, n = Ws(e), r = e.checked, i = e[Ls];
			if (D(t)) {
				let e = Jt(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (gt(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(Gs(e, r));
		});
	},
	mounted: Vs,
	beforeUpdate(e, t, n) {
		e[Ls] = Ps(n), Vs(e, t, n);
	}
};
function Vs(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (D(t)) i = Jt(t, r.props.value) > -1;
	else if (gt(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = qt(t, Gs(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Hs = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = gt(t);
		bs(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? Pt(Ws(e)) : Ws(e));
			e[Ls](e.multiple ? i ? new Set(t) : t : t[0]), e._assigning = !0, Gr(() => {
				e._assigning = !1;
			});
		}), e[Ls] = Ps(r);
	},
	mounted(e, { value: t }) {
		Us(e, t);
	},
	beforeUpdate(e, t, n) {
		e[Ls] = Ps(n);
	},
	updated(e, { value: t }) {
		e._assigning || Us(e, t);
	}
};
function Us(e, t) {
	let n = e.multiple, r = D(t);
	if (!(n && !r && !gt(t))) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = Ws(a);
			if (n) if (r) {
				let e = typeof o;
				e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = Jt(t, o) > -1;
			} else a.selected = t.has(o);
			else if (qt(Ws(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Ws(e) {
	return "_value" in e ? e._value : e.value;
}
function Gs(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Ks = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], qs = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, t) => Ks.some((n) => e[`${n}Key`] && !t.includes(n))
}, Js = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = qs[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, Ys = /* @__PURE__ */ T({ patchProp: js }, rs), Xs;
function Zs() {
	return Xs ||= Wa(Ys);
}
var Qs = ((...e) => {
	let t = Zs().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = ec(e);
		if (!r) return;
		let i = t._component;
		!O(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, $s(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function $s(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function ec(e) {
	return k(e) ? document.querySelector(e) : e;
}
//#endregion
//#region node_modules/pinia/dist/pinia.mjs
var tc = typeof window < "u", nc, rc = (e) => nc = e, ic = Symbol();
function ac(e) {
	return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var oc;
(function(e) {
	e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(oc ||= {});
var sc = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function cc(e, { autoBom: t = !1 } = {}) {
	return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["﻿", e], { type: e.type }) : e;
}
function lc(e, t, n) {
	let r = new XMLHttpRequest();
	r.open("GET", e), r.responseType = "blob", r.onload = function() {
		mc(r.response, t, n);
	}, r.onerror = function() {
		console.error("could not download file");
	}, r.send();
}
function uc(e) {
	let t = new XMLHttpRequest();
	t.open("HEAD", e, !1);
	try {
		t.send();
	} catch {}
	return t.status >= 200 && t.status <= 299;
}
function dc(e) {
	try {
		e.dispatchEvent(new MouseEvent("click"));
	} catch {
		let t = new MouseEvent("click", {
			bubbles: !0,
			cancelable: !0,
			view: window,
			detail: 0,
			screenX: 80,
			screenY: 20,
			clientX: 80,
			clientY: 20,
			ctrlKey: !1,
			altKey: !1,
			shiftKey: !1,
			metaKey: !1,
			button: 0,
			relatedTarget: null
		});
		e.dispatchEvent(t);
	}
}
var fc = typeof navigator == "object" ? navigator : { userAgent: "" }, pc = /Macintosh/.test(fc.userAgent) && /AppleWebKit/.test(fc.userAgent) && !/Safari/.test(fc.userAgent), mc = tc ? typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !pc ? hc : "msSaveOrOpenBlob" in fc ? gc : _c : () => {};
function hc(e, t = "download", n) {
	let r = document.createElement("a");
	r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin === location.origin ? dc(r) : uc(r.href) ? lc(e, t, n) : (r.target = "_blank", dc(r))) : (r.href = URL.createObjectURL(e), setTimeout(function() {
		URL.revokeObjectURL(r.href);
	}, 4e4), setTimeout(function() {
		dc(r);
	}, 0));
}
function gc(e, t = "download", n) {
	if (typeof e == "string") if (uc(e)) lc(e, t, n);
	else {
		let t = document.createElement("a");
		t.href = e, t.target = "_blank", setTimeout(function() {
			dc(t);
		});
	}
	else navigator.msSaveOrOpenBlob(cc(e, n), t);
}
function _c(e, t, n, r) {
	if (r ||= open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string") return lc(e, t, n);
	let i = e.type === "application/octet-stream", a = /constructor/i.test(String(sc.HTMLElement)) || "safari" in sc, o = /CriOS\/[\d]+/.test(navigator.userAgent);
	if ((o || i && a || pc) && typeof FileReader < "u") {
		let t = new FileReader();
		t.onloadend = function() {
			let e = t.result;
			if (typeof e != "string") throw r = null, Error("Wrong reader.result type");
			e = o ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = e : location.assign(e), r = null;
		}, t.readAsDataURL(e);
	} else {
		let t = URL.createObjectURL(e);
		r ? r.location.assign(t) : location.href = t, r = null, setTimeout(function() {
			URL.revokeObjectURL(t);
		}, 4e4);
	}
}
var { assign: vc } = Object;
function yc() {
	let e = $t(!0), t = e.run(() => /* @__PURE__ */ V({})), n = [], r = [], i = _r({
		install(e) {
			rc(i), i._a = e, e.provide(ic, i), e.config.globalProperties.$pinia = i, r.forEach((e) => n.push(e)), r = [];
		},
		use(e) {
			return this._a ? n.push(e) : r.push(e), this;
		},
		_p: n,
		_a: null,
		_e: e,
		_s: /* @__PURE__ */ new Map(),
		state: t
	});
	return i;
}
var bc = () => {};
function xc(e, t, n, r = bc) {
	e.add(t);
	let i = () => {
		e.delete(t) && r();
	};
	return !n && en() && tn(i), i;
}
function Sc(e, ...t) {
	e.forEach((e) => {
		e(...t);
	});
}
var Cc = (e) => e(), wc = Symbol(), Tc = Symbol();
function Ec(e, t) {
	e instanceof Map && t instanceof Map ? t.forEach((t, n) => e.set(n, t)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
	for (let n in t) {
		if (!t.hasOwnProperty(n)) continue;
		let r = t[n], i = e[n];
		ac(i) && ac(r) && e.hasOwnProperty(n) && !/* @__PURE__ */ B(r) && !/* @__PURE__ */ mr(r) ? e[n] = Ec(i, r) : e[n] = r;
	}
	return e;
}
var Dc = Symbol();
function Oc(e) {
	return !ac(e) || !Object.prototype.hasOwnProperty.call(e, Dc);
}
var { assign: kc } = Object;
function Ac(e) {
	return !!(/* @__PURE__ */ B(e) && e.effect);
}
function jc(e, t, n, r) {
	let { state: i, actions: a, getters: o } = t, s = n.state.value[e], c;
	function l() {
		return s || (n.state.value[e] = i ? i() : {}), kc(/* @__PURE__ */ wr(n.state.value[e]), a, Object.keys(o || {}).reduce((t, r) => (t[r] = _r(Jo(() => {
			rc(n);
			let t = n._s.get(e);
			return o[r].call(t, t);
		})), t), {}));
	}
	return c = Mc(e, l, t, n, r, !0), c;
}
function Mc(e, t, n = {}, r, i, a) {
	let o, s = kc({ actions: {} }, n), c = { deep: !0 }, l, u, d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p = r.state.value[e];
	!a && !p && (r.state.value[e] = {});
	let m;
	function h(t) {
		let n;
		l = u = !1, typeof t == "function" ? (t(r.state.value[e]), n = {
			type: oc.patchFunction,
			storeId: e,
			events: void 0
		}) : (Ec(r.state.value[e], t), n = {
			type: oc.patchObject,
			payload: t,
			storeId: e,
			events: void 0
		});
		let i = m = Symbol();
		Gr().then(() => {
			m === i && (l = !0);
		}), u = !0, Sc(d, n, r.state.value[e]);
	}
	let g = a ? function() {
		let { state: e } = n, t = e ? e() : {};
		this.$patch((e) => {
			kc(e, t);
		});
	} : bc;
	function _() {
		o.stop(), d.clear(), f.clear(), r._s.delete(e);
	}
	let v = (t, n = "") => {
		if (wc in t) return t[Tc] = n, t;
		let i = function() {
			rc(r);
			let n = Array.from(arguments), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
			function s(e) {
				a.add(e);
			}
			function c(e) {
				o.add(e);
			}
			Sc(f, {
				args: n,
				name: i[Tc],
				store: y,
				after: s,
				onError: c
			});
			let l;
			try {
				l = t.apply(this && this.$id === e ? this : y, n);
			} catch (e) {
				throw Sc(o, e), e;
			}
			return l instanceof Promise ? l.then((e) => (Sc(a, e), e)).catch((e) => (Sc(o, e), Promise.reject(e))) : (Sc(a, l), l);
		};
		return i[wc] = !0, i[Tc] = n, i;
	}, y = /* @__PURE__ */ ur({
		_p: r,
		$id: e,
		$onAction: xc.bind(null, f),
		$patch: h,
		$reset: g,
		$subscribe(t, n = {}) {
			let i = xc(d, t, n.detached, () => a()), a = o.run(() => di(() => r.state.value[e], (r) => {
				(n.flush === "sync" ? u : l) && t({
					storeId: e,
					type: oc.direct,
					events: void 0
				}, r);
			}, kc({}, c, n)));
			return i;
		},
		$dispose: _
	});
	r._s.set(e, y);
	let b = (r._a && r._a.runWithContext || Cc)(() => r._e.run(() => (o = $t()).run(() => t({ action: v }))));
	for (let t in b) {
		let n = b[t];
		/* @__PURE__ */ B(n) && !Ac(n) || /* @__PURE__ */ mr(n) ? a || (p && Oc(n) && (/* @__PURE__ */ B(n) ? n.value = p[t] : Ec(n, p[t])), r.state.value[e][t] = n) : typeof n == "function" && (b[t] = v(n, t), s.actions[t] = n);
	}
	return kc(y, b), kc(/* @__PURE__ */ z(y), b), Object.defineProperty(y, "$state", {
		get: () => r.state.value[e],
		set: (e) => {
			h((t) => {
				kc(t, e);
			});
		}
	}), r._p.forEach((e) => {
		kc(y, o.run(() => e({
			store: y,
			app: r._a,
			pinia: r,
			options: s
		})));
	}), p && a && n.hydrate && n.hydrate(y.$state, p), l = !0, u = !0, y;
}
function Nc(e, t, n) {
	let r, i = typeof t == "function";
	r = i ? n : t;
	function a(n, a) {
		let o = si();
		return n ||= o ? oi(ic, null) : null, n && rc(n), n = nc, n._s.has(e) || (i ? Mc(e, t, r, n) : jc(e, r, n)), n._s.get(e);
	}
	return a.$id = e, a;
}
//#endregion
//#region src/state/damage-console/index.ts
var Pc = Nc("damageConsole", () => {
	let e = /* @__PURE__ */ V("1d10"), t = /* @__PURE__ */ V("roll"), n = /* @__PURE__ */ V(!1), r = /* @__PURE__ */ V(!1), i = /* @__PURE__ */ V(!1), a = /* @__PURE__ */ V(!0), o = /* @__PURE__ */ V(!0), s = /* @__PURE__ */ V(""), c = /* @__PURE__ */ V([]), l = /* @__PURE__ */ V([]), u = /* @__PURE__ */ V(null), d;
	function f(e, t) {
		c.value = e, d = t;
	}
	async function p() {
		if (!d || i.value) return;
		s.value = "";
		let f = oe({
			damageFormula: e.value,
			hitLocation: t.value,
			ignoreArmour: n.value,
			ignoreToughness: r.value,
			minimumOne: a.value,
			rollSeparately: o.value,
			targetUuids: c.value.map((e) => e.uuid),
			woundingType: u.value
		});
		if (l.value = se(f), !l.value.length) {
			i.value = !0;
			try {
				await d(f);
			} catch (e) {
				s.value = e instanceof Error ? e.message : String(e);
			} finally {
				i.value = !1;
			}
		}
	}
	return {
		damageFormula: e,
		hitLocation: t,
		ignoreArmour: n,
		ignoreToughness: r,
		initialize: f,
		isPosting: i,
		minimumOne: a,
		runtimeError: s,
		rollSeparately: o,
		submit: p,
		targets: c,
		validationErrors: l,
		woundingType: u
	};
}), Fc = {
	key: 0,
	role: "alert",
	class: "tw:dui-alert tw:dui-alert-error tw:text-sm"
}, Ic = { key: 0 }, Lc = { class: "tw:dui-card tw:dui-card-border tw:dui-card-sm" }, Rc = { class: "tw:dui-card-body" }, zc = { class: "tw:dui-card-title tw:text-base" }, Bc = { class: "tw:grid tw:grid-cols-1 tw:gap-2 tw:sm:grid-cols-2" }, Vc = ["src"], Hc = { class: "tw:min-w-0 tw:truncate" }, Uc = { class: "tw:grid tw:grid-cols-1 tw:gap-4 tw:md:grid-cols-2" }, Wc = { class: "tw:dui-fieldset tw:min-w-0 tw:rounded-box tw:border tw:border-base-300 tw:p-4" }, Gc = { class: "tw:dui-fieldset-legend" }, Kc = {
	class: "tw:dui-label",
	for: "ech-damage-formula"
}, qc = { class: "tw:dui-label tw:whitespace-normal" }, Jc = {
	class: "tw:dui-label",
	for: "ech-hit-location"
}, Yc = ["value"], Xc = {
	class: "tw:dui-label",
	for: "ech-wounding-type"
}, Zc = ["value"], Qc = { class: "tw:dui-label tw:whitespace-normal" }, $c = { class: "tw:dui-fieldset tw:min-w-0 tw:rounded-box tw:border tw:border-base-300 tw:p-4" }, el = { class: "tw:dui-fieldset-legend" }, tl = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, nl = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, rl = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, il = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, al = {
	role: "alert",
	class: "tw:dui-alert tw:mt-2 tw:text-sm"
}, ol = { class: "tw:flex tw:justify-end tw:gap-2" }, sl = ["disabled"], cl = ["disabled"], ll = /* @__PURE__ */ yi({
	__name: "DamageConsoleApp",
	props: {
		hitLocationOptions: {},
		localize: { type: Function },
		onCancel: { type: Function },
		onPost: { type: Function },
		targets: {},
		woundingTypeOptions: {}
	},
	setup(e) {
		let t = e, n = Pc();
		n.initialize(t.targets, t.onPost);
		function r(e) {
			return t.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.${e}`);
		}
		return (e, i) => (Y(), uo("form", {
			class: "tw:flex tw:flex-col tw:gap-4 tw:rounded-box tw:bg-base-100 tw:p-4 tw:text-base-content",
			onSubmit: i[8] ||= Js((...e) => H(n).submit && H(n).submit(...e), ["prevent"])
		}, [
			H(n).validationErrors.length || H(n).runtimeError ? (Y(), uo("div", Fc, [i[9] ||= X("i", {
				class: "fa-solid fa-triangle-exclamation",
				"aria-hidden": "true"
			}, null, -1), X("div", null, [(Y(!0), uo(q, null, Wi(H(n).validationErrors, (e) => (Y(), uo("p", { key: e }, N(r(`validation.${e}`)), 1))), 128)), H(n).runtimeError ? (Y(), uo("p", Ic, N(H(n).runtimeError), 1)) : So("", !0)])])) : So("", !0),
			X("section", Lc, [X("div", Rc, [X("h2", zc, [i[10] ||= X("i", {
				class: "fa-solid fa-crosshairs",
				"aria-hidden": "true"
			}, null, -1), xo(" " + N(r("targets")), 1)]), X("div", Bc, [(Y(!0), uo(q, null, Wi(H(n).targets, (e) => (Y(), uo("div", {
				key: e.uuid,
				class: "tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:rounded-sm tw:bg-base-200 tw:p-2"
			}, [X("img", {
				src: e.img,
				alt: "",
				class: "tw:h-9 tw:w-9 tw:rounded-sm tw:object-cover"
			}, null, 8, Vc), X("strong", Hc, N(e.name), 1)]))), 128))])])]),
			X("div", Uc, [X("fieldset", Wc, [
				X("legend", Gc, N(r("damageDetails")), 1),
				X("label", Kc, N(r("damage")), 1),
				ri(X("input", {
					id: "ech-damage-formula",
					"onUpdate:modelValue": i[0] ||= (e) => H(n).damageFormula = e,
					class: "tw:dui-input tw:w-full",
					name: "damageFormula",
					placeholder: "1d10",
					required: "",
					type: "text"
				}, null, 512), [[zs, H(n).damageFormula]]),
				X("p", qc, N(r("damageHint")), 1),
				X("label", Jc, N(r("hitLocation")), 1),
				ri(X("select", {
					id: "ech-hit-location",
					"onUpdate:modelValue": i[1] ||= (e) => H(n).hitLocation = e,
					class: "tw:dui-select tw:w-full",
					name: "hitLocation"
				}, [(Y(!0), uo(q, null, Wi(t.hitLocationOptions, (e) => (Y(), uo("option", {
					key: e.value,
					value: e.value
				}, N(e.label), 9, Yc))), 128))], 512), [[Hs, H(n).hitLocation]]),
				X("label", Xc, N(r("woundingType")), 1),
				ri(X("select", {
					id: "ech-wounding-type",
					"onUpdate:modelValue": i[2] ||= (e) => H(n).woundingType = e,
					class: "tw:dui-select tw:w-full",
					name: "woundingType"
				}, [(Y(!0), uo(q, null, Wi(t.woundingTypeOptions, (e) => (Y(), uo("option", {
					key: e.value ?? "unspecified",
					value: e.value
				}, N(e.label), 9, Zc))), 128))], 512), [[Hs, H(n).woundingType]]),
				X("p", Qc, N(r("woundingTypeHint")), 1)
			]), X("fieldset", $c, [
				X("legend", el, N(r("damageOptions")), 1),
				X("label", tl, [X("span", null, N(r("rollSeparately")), 1), ri(X("input", {
					"onUpdate:modelValue": i[3] ||= (e) => H(n).rollSeparately = e,
					class: "tw:dui-checkbox",
					name: "rollSeparately",
					type: "checkbox"
				}, null, 512), [[Bs, H(n).rollSeparately]])]),
				X("label", nl, [X("span", null, N(r("ignoreToughness")), 1), ri(X("input", {
					"onUpdate:modelValue": i[4] ||= (e) => H(n).ignoreToughness = e,
					class: "tw:dui-checkbox",
					name: "ignoreToughness",
					type: "checkbox"
				}, null, 512), [[Bs, H(n).ignoreToughness]])]),
				X("label", rl, [X("span", null, N(r("ignoreArmour")), 1), ri(X("input", {
					"onUpdate:modelValue": i[5] ||= (e) => H(n).ignoreArmour = e,
					class: "tw:dui-checkbox",
					name: "ignoreArmour",
					type: "checkbox"
				}, null, 512), [[Bs, H(n).ignoreArmour]])]),
				X("label", il, [X("span", null, N(r("minimumOne")), 1), ri(X("input", {
					"onUpdate:modelValue": i[6] ||= (e) => H(n).minimumOne = e,
					class: "tw:dui-checkbox",
					name: "minimumOne",
					type: "checkbox"
				}, null, 512), [[Bs, H(n).minimumOne]])]),
				X("div", al, [i[11] ||= X("i", {
					class: "fa-solid fa-circle-info",
					"aria-hidden": "true"
				}, null, -1), X("span", null, N(r("postHint")), 1)])
			])]),
			X("div", ol, [X("button", {
				class: "tw:dui-btn",
				type: "button",
				disabled: H(n).isPosting,
				onClick: i[7] ||= (...e) => t.onCancel && t.onCancel(...e)
			}, N(r("cancel")), 9, sl), X("button", {
				class: "tw:dui-btn tw:dui-btn-primary",
				type: "submit",
				disabled: H(n).isPosting
			}, [X("i", {
				class: Ht(H(n).isPosting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-message"),
				"aria-hidden": "true"
			}, null, 2), xo(" " + N(r("post")), 1)], 8, cl)])
		], 32));
	}
});
//#endregion
//#region src/module/wfrp4e/damage-console/posting.ts
async function ul(e) {
	dl();
	let t = oe(e), n = se(t);
	if (n.length) throw Error(game.i18n.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.validation.${n[0]}`));
	let r = ce(t, await Promise.all(t.targetUuids.map(async (e) => (await Re(e)).snapshot))), i = Oe(r), a = game.wfrp4e?.utility?.chatDataSetup?.(i) ?? { content: i };
	return Te(a, r), (await ChatMessage.create(a))?.id;
}
function dl() {
	if (!game.user.isGM) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.gmOnly"));
}
//#endregion
//#region src/module/apps/FoundryVueApplication.ts
var fl = class extends foundry.applications.api.ApplicationV2 {
	#e;
	getVueProps() {}
	async _renderHTML(e, t) {
		let n = document.createElement("div");
		return n.classList.add("wfrp4e-expanded-critical-hits-root"), n.dataset.theme = "wfrp4e-expanded-critical-hits", n;
	}
	_replaceHTML(e, t, n) {
		this.unmountVue(), t.classList.add("wfrp4e-expanded-critical-hits-app"), t.replaceChildren(e), this.#e = Qs(this.getVueComponent(), this.getVueProps() ?? {}), this.#e.use(yc()), this.#e.mount(e);
	}
	async _preClose(e) {
		this.unmountVue(), await super._preClose(e);
	}
	unmountVue() {
		this.#e?.unmount(), this.#e = void 0;
	}
}, pl = {
	body: "Body",
	head: "Head",
	lArm: "Left Arm",
	lLeg: "Left Leg",
	rArm: "Right Arm",
	rLeg: "Right Leg",
	roll: "Roll"
}, ml = class extends fl {
	static DEFAULT_OPTIONS = {
		id: `${e}-damage-console`,
		position: {
			height: 600,
			width: 620
		},
		tag: "section",
		window: {
			icon: "fa-solid fa-bolt",
			resizable: !0,
			title: "WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.title"
		}
	};
	#e;
	constructor(e) {
		super(), this.#e = e;
	}
	getVueComponent() {
		return ll;
	}
	getVueProps() {
		return {
			hitLocationOptions: hl(),
			localize: (e) => game.i18n.localize(e),
			onCancel: () => void this.close(),
			onPost: async (e) => {
				await ul(e), await this.close();
			},
			targets: this.#e,
			woundingTypeOptions: gl()
		};
	}
};
function hl() {
	return ae.map((e) => ({
		label: game.i18n.localize(pl[e]),
		value: e
	}));
}
function gl() {
	return [{
		label: game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.unspecified"),
		value: null
	}, ..._.map((e) => ({
		label: x[e],
		value: e
	}))];
}
//#endregion
//#region src/module/wfrp4e/damage-console/launch.ts
async function _l() {
	if (!game.user.isGM) {
		ui.notifications?.warn(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.gmOnly"));
		return;
	}
	let e = Le();
	if (!e.length) {
		ui.notifications?.warn(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.targetsRequired"));
		return;
	}
	await new ml(e).render(!0);
}
//#endregion
//#region src/module/wfrp4e/damage-console/scene-controls.ts
function vl() {
	Hooks.on("getSceneControlButtons", (e) => {
		let t = e?.tokens?.tools;
		t && (t.expandedCriticalDamageConsole = {
			button: !0,
			icon: "fa-solid fa-bolt",
			name: "expandedCriticalDamageConsole",
			onClick: () => void _l(),
			title: "WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.sceneControl",
			visible: game.user.isGM
		});
	});
}
//#endregion
//#region src/module/wfrp4e/damage-console/index.ts
var yl = !1;
function bl() {
	yl ||= (Xe(), vl(), !0);
}
//#endregion
//#region src/functions/critical-hits/damage-inference/index.ts
var xl = {
	accurate: "none",
	blackpowder: "bullets",
	blast: "shrapnelShot",
	damaging: "none",
	defensive: "none",
	distract: "none",
	entangle: "none",
	fast: "none",
	hack: "cutting",
	impact: "crushing",
	impale: "piercing",
	incendiary: "flameEnergy",
	magical: "none",
	penetrating: "none",
	pistol: "bullets",
	poisonous: "none",
	precise: "none",
	pummel: "crushing",
	recoverable: "none",
	repeater: "none",
	salvo: "bullets",
	shield: "crushing",
	slash: "cutting",
	slashing: "cutting",
	spread: "shrapnelShot",
	siege: "none",
	trapblade: "cutting",
	trip: "none",
	unbreakable: "none",
	volley: "arrowsBolts",
	warpstone: "flameEnergy",
	wrap: "none",
	zzap: "flameEnergy",
	blinding: "none",
	durable: "none",
	fine: "none",
	lightweight: "none",
	practical: "none"
}, Sl = {
	basic: "none",
	blackpowder: "bullets",
	bow: "arrowsBolts",
	brawling: "unarmed",
	cavalry: "none",
	crossbow: "arrowsBolts",
	entangling: "none",
	engineering: "shrapnelShot",
	explosive: "shrapnelShot",
	explosives: "shrapnelShot",
	fencing: "piercing",
	flail: "crushing",
	parrying: "none",
	parry: "none",
	polarm: "none",
	polearm: "none",
	sling: "sling",
	throwing: "piercing",
	twohanded: "none"
};
function Cl(e) {
	if (e.explicitCategories.length > 0) return {
		categories: kl(e.explicitCategories),
		matches: [],
		source: "explicit"
	};
	if (e.defaultCategories && e.defaultCategories.length > 0) return {
		categories: kl(e.defaultCategories),
		matches: [],
		source: "default"
	};
	if (e.inferFromWeaponProperties) {
		let t = Dl(e.weaponPropertyKeys, e.weaponPropertyMapping);
		if (t.length > 0) return {
			categories: Ol(t),
			matches: t,
			source: "weaponProperty"
		};
	}
	if (e.inferFromWeaponTypes) {
		let t = Dl(e.weaponTypeKeys, e.weaponTypeMapping);
		if (t.length > 0) return {
			categories: Ol(t),
			matches: t,
			source: "weaponType"
		};
	}
	return {
		categories: [],
		matches: [],
		source: "none"
	};
}
function wl(e) {
	return e.trim().toLowerCase().replaceAll(/[^a-z0-9]/g, "");
}
function Tl(e) {
	let t = El(e), n = {};
	for (let [e, r] of Object.entries(t ?? {})) jl(r) && (n[wl(e)] = r);
	return n;
}
function El(e) {
	if (typeof e == "string") try {
		return El(JSON.parse(e));
	} catch {
		return;
	}
	if (typeof e == "object" && e && !Array.isArray(e)) return e;
}
function Dl(e, t) {
	let n = Tl(t), r = e.flatMap((e) => {
		let t = n[wl(e)];
		return t && t !== "none" ? [{
			category: t,
			key: e
		}] : [];
	}), i = /* @__PURE__ */ new Set();
	return g.flatMap((e) => r.filter((t) => {
		let n = `${e}:${wl(t.key)}`;
		return t.category !== e || i.has(n) ? !1 : (i.add(n), !0);
	}));
}
function Ol(e) {
	return kl(e.map((e) => e.category));
}
function kl(e) {
	let t = new Set(e);
	return g.filter((e) => t.has(e));
}
function Al(e) {
	return typeof e == "string" && g.includes(e);
}
function jl(e) {
	return e === "none" || Al(e);
}
//#endregion
//#region src/functions/critical-hits/natural-one-critical/index.ts
function Ml(e) {
	let t = Number(e.roll), n = Number(e.target);
	return t === 1 && t <= n;
}
//#endregion
//#region src/functions/critical-hits/table-keys.ts
function Nl(e, t, n) {
	return `ech-crit-${e}-${t}-${n}`.toLowerCase();
}
function Pl(e) {
	let t = e.toLowerCase();
	if (t === "head" || t === "body") return t;
	if (t.endsWith("arm")) return "arm";
	if (t.endsWith("leg")) return "leg";
}
function Fl(e) {
	return e ? "upInArms" : "core";
}
//#endregion
//#region src/module/settings.ts
var Il = "enableCriticalReplacement", Ll = "enableNaturalOneCriticals", Rl = "inferDamageFromWeaponProperties", zl = "inferDamageFromWeaponTypes", Bl = "weaponPropertyDamageMapping", Vl = "weaponTypeDamageMapping", Hl = JSON.stringify(xl), Ul = JSON.stringify(Sl), Wl = JSON.stringify({
	hack: "cutting",
	impale: "piercing",
	pummel: "crushing",
	slash: "cutting"
});
function Gl() {
	game.settings.register(e, n, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.debugConsoleLogging.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.debugConsoleLogging.hint",
		scope: "client",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, Il, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, Ll, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, Rl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.hint",
		scope: "world",
		config: !0,
		default: !0,
		type: Boolean
	}), game.settings.register(e, Bl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.hint",
		scope: "world",
		config: !1,
		default: Hl,
		type: String
	}), game.settings.register(e, zl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, Vl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.hint",
		scope: "world",
		config: !1,
		default: Ul,
		type: String
	}), r(`${e} | Settings registered`, tu());
}
function Kl() {
	return !!game.settings.get(e, Il);
}
function ql() {
	return !!game.settings.get(e, Ll);
}
async function Jl() {
	if (!game.user.isGM) {
		r(`${e} | Skipping mapping setting normalization for non-GM user.`);
		return;
	}
	r(`${e} | Normalizing stored mapping settings.`), await $l(Bl, Hl), await $l(Vl, Ul), r(`${e} | Mapping settings normalized`, tu());
}
function Yl() {
	return !!game.settings.get(e, Rl);
}
function Xl() {
	return !!game.settings.get(e, zl);
}
function Zl() {
	return Tl(game.settings.get(e, Bl));
}
function Ql() {
	return Tl(game.settings.get(e, Vl));
}
async function $l(t, n) {
	let i = game.settings.get(e, t);
	if (typeof i == "object" && i) {
		r(`${e} | Normalizing object mapping setting to JSON string`, {
			key: t,
			value: i
		}), await game.settings.set(e, t, JSON.stringify(i));
		return;
	}
	if (i === "[object Object]") {
		r(`${e} | Resetting invalid object-string mapping setting`, { key: t }), await game.settings.set(e, t, n);
		return;
	}
	t === "weaponPropertyDamageMapping" && eu(i, Wl) && (r(`${e} | Upgrading untouched weapon property mapping defaults`, { key: t }), await game.settings.set(e, t, n));
}
function eu(e, t) {
	return JSON.stringify(Tl(e)) === t;
}
function tu() {
	return {
		debugConsoleLogging: ru(n),
		enableCriticalReplacement: ru(Il),
		enableNaturalOneCriticals: ru(Ll),
		inferDamageFromWeaponProperties: ru(Rl),
		inferDamageFromWeaponTypes: ru(zl),
		weaponPropertyDamageMapping: nu(Bl),
		weaponTypeDamageMapping: nu(Vl)
	};
}
function nu(e) {
	let t = ru(e);
	return {
		key: e,
		type: typeof t,
		value: t
	};
}
function ru(t) {
	try {
		return game.settings.settings.has(`wfrp4e-expanded-critical-hits.${t}`) ? game.settings.get(e, t) : "<not registered>";
	} catch (e) {
		return `<error: ${e instanceof Error ? e.message : String(e)}>`;
	}
}
//#endregion
//#region src/module/wfrp4e/natural-one-critical.ts
var iu = Symbol.for(`${e}.naturalOneCriticalPatch`), au = {
	installed: !1,
	message: "Natural 1 critical patch has not run."
};
function ou() {
	return { ...au };
}
function su() {
	let t = game.wfrp4e?.rolls;
	if (!t?.TestWFRP) {
		mu(!1, "WFRP4e roll classes were not available.");
		return;
	}
	let n = cu(t.TestWFRP), r = lu([t.WeaponTest, t.TraitTest]);
	au = {
		installed: n,
		message: n ? `Natural 1 critical patch installed. Attack wrappers installed: ${r}.` : "TestWFRP.isCriticalFumble could not be patched."
	}, n || a(`${e} | ${au.message}`);
}
function cu(e) {
	let t = e.prototype;
	if (pu(t).isCriticalFumble) return !0;
	let n = Object.getOwnPropertyDescriptor(t, "isCriticalFumble");
	return n?.get ? (Object.defineProperty(t, "isCriticalFumble", {
		configurable: n.configurable,
		enumerable: n.enumerable,
		get() {
			return uu(this) ? "critical" : n.get?.call(this);
		}
	}), fu(t, "isCriticalFumble"), !0) : !1;
}
function lu(e) {
	let t = 0;
	for (let n of e) {
		let e = n?.prototype;
		if (!e || pu(e).computeProperties) continue;
		let r = e.computeProperties;
		r && (e.computeProperties = function(...e) {
			uu(this) && du(this);
			let t = r.apply(this, e);
			return uu(this) && du(this), t;
		}, fu(e, "computeProperties"), t += 1);
	}
	return t;
}
function uu(e) {
	return ql() && Ml({
		roll: e.result?.roll,
		target: e.result?.target
	});
}
function du(e) {
	e.result && (e.result.color_green = !0, e.result.critical ||= game.i18n.localize("Critical"));
}
function fu(e, t) {
	let n = pu(e);
	n[t] = !0, Object.defineProperty(e, iu, {
		configurable: !0,
		value: n
	});
}
function pu(e) {
	return Object.prototype.hasOwnProperty.call(e, iu) ? Reflect.get(e, iu) : {};
}
function mu(t, n) {
	au = {
		installed: t,
		message: n
	}, a(`${e} | ${n}`);
}
//#endregion
//#region src/module/api/create-module-api.ts
function hu() {
	return {
		getExpandedCriticalsCompendiumStatus: f,
		getNaturalOneCriticalPatchStatus: ou,
		launchDamageConsole: _l,
		postDamageConsoleCard: ul
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function gu() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let t = game.modules.get(e);
	if (!t) throw Error(`Foundry module registry entry was not found for ${e}.`);
	t.api = hu();
}
//#endregion
//#region src/functions/critical-hits/presentation/index.ts
var _u = /^ech-crit-(?:core|upinarms)-(?:arrowsbolts|bullets|cold|crushing|cutting|flameenergy|piercing|shrapnelshot|sling|teethclaws|unarmed)-(?:arm|body|head|leg)$/;
function vu(e) {
	return _u.test(e);
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/debug.ts
function yu(e) {
	return {
		criticalLocation: e.criticalLocation,
		messageId: e.messageId,
		returnResult: e.returnResult,
		sourceItemUuid: e.sourceItemUuid
	};
}
function bu(e) {
	let t = xu(e);
	if (t) return {
		id: t.id,
		name: t.name,
		type: t.type,
		uuid: t.uuid
	};
}
function xu(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/failure.ts
function Su(t, n, r) {
	return o(`${e} | ${t}`, r), ui.notifications?.error(t), [
		"<div class=\"wfrp4e chat-card\">",
		"<h3>Expanded Critical Hit Failed</h3>",
		`<p>${Cu(t)}</p>`,
		`<p><strong>Table:</strong> ${Cu(n)}</p>`,
		"</div>"
	].join("");
}
function Cu(e) {
	return e.replace(/[&<>"']/g, (e) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;"
	})[e] ?? e);
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/item-posting.ts
function wu(e, t) {
	if (!Du(e)) return;
	let n = t.criticalLocation;
	if (e.type !== "critical" || typeof n != "string") return e;
	let r = e.toObject, i = Item?.implementation;
	if (typeof r != "function" || typeof i != "function") return e;
	let a = r.call(e), o = Tu(Tu(a, "system"), "location"), s = game.wfrp4e?.config?.locations ?? {};
	return o.key = n, o.value = s[n] ?? n, new i(a);
}
function Tu(e, t) {
	let n = Eu(e[t]);
	if (n) return n;
	let r = {};
	return e[t] = r, r;
}
function Eu(e) {
	return typeof e == "object" && e ? e : void 0;
}
function Du(e) {
	let t = e;
	return typeof t == "object" && !!t && typeof t.postItem == "function";
}
//#endregion
//#region src/module/wfrp4e/runtime-values.ts
function Ou(e) {
	return Array.isArray(e) ? e : [];
}
function Q(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/item/damage-defaults.ts
var ku = "teethClaws", Au = {};
function ju(e) {
	if (Mu(e)) return {
		categories: [ku],
		labels: ["Teeth & Claws"],
		lores: [],
		source: "creatureTrait"
	};
	if (Nu(e)) {
		let t = Iu(e), n = Lu(t);
		return {
			categories: Bu(n.map((e) => ee[e])),
			labels: Bu(n.map((e) => x[e])),
			lores: t,
			source: "spellLore"
		};
	}
	return {
		categories: [],
		labels: [],
		lores: [],
		source: "none"
	};
}
function Mu(e) {
	let t = Q(e), n = Q(Q(t?.system)?.rollable);
	return t?.type === "trait" && n?.damage === !0;
}
function Nu(e) {
	let t = Q(e);
	return t?.type === "spell" && Fu(t?.system);
}
function Pu(e) {
	let t = Q(e);
	return t?.type === "prayer" && Fu(t?.system);
}
function Fu(e) {
	let t = Q(e), n = Q(t?.damage), r = Q(t?.magicMissile);
	return Ru(n?.value) || Ru(n?.dice) || n?.addSL === !0 || r?.value === !0;
}
function Iu(e) {
	let t = Q(Q(Q(e)?.system)?.lore), n = zu(t?.chosen);
	return n ? [n] : Bu((Array.isArray(t?.value) ? Ou(t?.value) : [t?.value]).map(zu).filter((e) => !!e));
}
function Lu(e, t = Au) {
	return Bu((e.length > 0 ? e : [""]).map((e) => t[zu(e) ?? ""] ?? "energy"));
}
function Ru(e) {
	return typeof e == "number" ? e !== 0 : typeof e == "string" && e.trim().length > 0;
}
function zu(e) {
	if (typeof e == "string") return e.trim().toLowerCase() || void 0;
}
function Bu(e) {
	return [...new Set(e)];
}
//#endregion
//#region src/module/wfrp4e/item/wounding-overrides.ts
var Vu = "damageTypes", Hu = new Map(_.map((e) => [y[e], e]));
function Uu(e) {
	let t = new Set([...Wu(e), ...Ku(e)]);
	return _.filter((e) => t.has(e));
}
function Wu(t) {
	let n = Q(t), r = n?.getFlag, i = Q(Q(n?.flags)?.[e]);
	return Gu(typeof r == "function" ? r.call(t, e, Vu) : i?.[Vu]);
}
function Gu(e) {
	let t = new Set(Ou(e).filter(Yu));
	return _.filter((e) => t.has(e));
}
function Ku(e) {
	let t = Ou(Q(Q(Q(e)?.system)?.qualities)?.value), n = /* @__PURE__ */ new Set();
	for (let e of t) {
		let t = Q(e);
		if (!qu(t)) continue;
		let r = t?.name, i = typeof r == "string" ? Hu.get(r) : void 0;
		i && n.add(i);
	}
	return _.filter((e) => n.has(e));
}
function qu(e) {
	let t = e?.group;
	return Ju(t) ? e?.active === !0 : !0;
}
function Ju(e) {
	return typeof e == "number" ? Number.isFinite(e) : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e));
}
function Yu(e) {
	return typeof e == "string" && _.includes(e);
}
//#endregion
//#region src/module/wfrp4e/quality-extraction.ts
function Xu(e) {
	let t = Zu(e);
	return {
		explicitCategories: re(t),
		weaponPropertyKeys: t,
		weaponTypeKeys: Qu(e)
	};
}
function Zu(e) {
	let t = Q(e), n = Q(t?.system), r = Q(t?.properties), i = Q(n?.properties), a = [Q(r?.qualities), Q(i?.qualities)], o = /* @__PURE__ */ new Set();
	for (let t of Wu(e)) o.add(y[t]);
	for (let e of a) for (let t of Object.keys(e ?? {})) o.add(t);
	let s = Ou(Q(n?.qualities)?.value);
	for (let e of s) {
		let t = Q(e), n = t?.name;
		typeof n == "string" && qu(t) && o.add(n);
	}
	return [...o];
}
function Qu(e) {
	let t = Q(Q(e)?.system), n = /* @__PURE__ */ new Set();
	for (let e of [
		t?.weaponGroup,
		t?.group,
		t?.weaponType,
		t?.weaponClass,
		t?.ammunitionGroup,
		t?.ammoGroup,
		t?.category
	]) $u(e, n);
	return [...n];
}
function $u(e, t) {
	if (typeof e == "string") {
		t.add(e);
		return;
	}
	if (Array.isArray(e)) {
		for (let n of e) $u(n, t);
		return;
	}
	let n = Q(e);
	if (n) for (let e of [
		"key",
		"id",
		"name",
		"label",
		"value",
		"type"
	]) $u(n[e], t);
}
//#endregion
//#region src/module/wfrp4e/damage-category-resolution.ts
function ed(e) {
	let t = Xu(e), n = ju(e);
	return {
		clues: t,
		defaults: n,
		resolution: Cl({
			...t,
			defaultCategories: n.categories,
			inferFromWeaponProperties: Yl(),
			inferFromWeaponTypes: Xl(),
			weaponPropertyMapping: Zl(),
			weaponTypeMapping: Ql()
		})
	};
}
//#endregion
//#region src/module/wfrp4e/critical-replacement.ts
var td = !1;
function nd() {
	if (td) {
		r(`${e} | Critical replacement patch already installed.`);
		return;
	}
	let t = game.wfrp4e?.tables;
	if (!t || typeof t.findTable != "function" || typeof t.formatChatRoll != "function") {
		r(`${e} | Critical replacement patch skipped: WFRP table API unavailable`, {
			hasTables: !!t,
			hasFindTable: typeof t?.findTable == "function",
			hasFormatChatRoll: typeof t?.formatChatRoll == "function"
		});
		return;
	}
	let n = t.findTable.bind(t), i = t.formatChatRoll.bind(t);
	t.formatChatRoll = async (t, a = {}, o = null) => {
		if (vu(t)) {
			try {
				let e = await rd(t, a, o);
				if (e !== void 0) return e;
			} catch (e) {
				return Su(`Drowsy's WFRP4e Expanded Damage System could not roll ${t}. See the browser console for details.`, t, e);
			}
			return i(t, a, o);
		}
		let s = sd(t);
		if (!Kl() || !s) return s && r(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: "replacement disabled",
			options: yu(a)
		}), i(t, a, o);
		let c = ad(t, a), l = we(a.messageId), u, d, f, p, m = l?.category;
		if (r(`${e} | Critical replacement inspecting WFRP critical roll`, {
			table: t,
			location: c,
			options: yu(a)
		}), !m) {
			try {
				u = await od(a);
			} catch (e) {
				return Su("Drowsy's WFRP4e Expanded Damage System could not resolve the critical source item. See the browser console for details.", t, e);
			}
			let e = ed(u);
			d = e.clues, f = e.defaults, p = e.resolution, m = ie(e.resolution.categories);
		}
		if (r(`${e} | Critical replacement damage category resolution`, {
			table: t,
			location: c,
			sourceItem: bu(u),
			categoryClues: d,
			categoryDefaults: f,
			categoryResolution: p,
			chosenCategory: m,
			damageConsoleSource: l,
			inferFromWeaponProperties: Yl(),
			inferFromWeaponTypes: Xl()
		}), !c || !m) return r(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: c ? "damage category unavailable" : "location unavailable"
		}), i(t, a, o);
		let h = Fl(!!game.settings.get("wfrp4e", "uiaCrits")), g = Nl(h, m, c);
		if (!n(g)) return Su(`Drowsy's WFRP4e Expanded Damage System table ${g} is missing from the module compendium.`, g);
		r(`${e} | Critical replacement rolling expanded table`, {
			table: t,
			expandedTableKey: g,
			ruleset: h,
			category: m,
			location: c
		});
		try {
			let e = await rd(g, a, o);
			if (e !== void 0) return e;
		} catch (e) {
			return Su(`Drowsy's WFRP4e Expanded Damage System could not roll ${g}. See the browser console for details.`, g, e);
		}
		return Su(`Drowsy's WFRP4e Expanded Damage System could not use WFRP's RollTable API for ${g}.`, g);
	}, td = !0, r(`${e} | Critical replacement patch installed.`);
}
async function rd(e, t, n) {
	let r = game.wfrp4e?.tables?.rollTable;
	if (typeof r != "function") return;
	let i = await r.call(game.wfrp4e.tables, e, t, n);
	if (await id(i, t)) return null;
	let a = cd(i);
	return t.returnResult ? i : a?.result;
}
async function id(t, n) {
	let i = cd(cd(t)?.object)?.documentUuid;
	if (typeof i != "string") return r(`${e} | Expanded critical result had no document UUID`, { result: t }), !1;
	let a = wu(await fromUuid(i), n);
	if (!a) throw Error(`Could not resolve expanded critical item ${i}.`);
	return r(`${e} | Posting expanded critical item`, {
		documentUuid: i,
		messageId: n.messageId,
		criticalLocation: n.criticalLocation
	}), await a.postItem(void 0, { "flags.wfrp4e.sourceMessageId": n.messageId }), !0;
}
function ad(e, t) {
	let n = t.criticalLocation;
	return Pl(typeof n == "string" ? n : e.replace(/^crit/i, ""));
}
async function od(e) {
	let t = e.sourceItemUuid;
	if (typeof t == "string") return await fromUuid(t);
	let n = e.messageId;
	if (typeof n != "string") return;
	let r = cd(cd(game.messages.get(n)?.system)?.test), i = cd(r?.preData);
	return r?.item ?? r?.weapon ?? i?.item;
}
function sd(e) {
	return /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function cd(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/support.ts
var ld = "ech-wounding-properties", ud = new Set(Object.values(y));
function dd(e) {
	let t = { ...e };
	for (let e of _) t[y[e]] = x[e];
	return t;
}
function fd(e) {
	return _d(e) || Mu(e) || vd(e);
}
function pd(e) {
	return fd(e);
}
function md(e) {
	let t = Uu(e).map((e) => x[e]);
	if (t.length > 0) return t;
	let n = ju(e);
	if (n.labels.length > 0) return n.labels.map((e) => `${e} (Default)`);
	let r = ed(e).resolution, i = r.source === "weaponProperty" || r.source === "weaponType" ? " (Inferred)" : "";
	return r.categories.map((e) => `${b[e]}${i}`);
}
function hd(e) {
	if (!(typeof e != "object" || !e)) return e;
}
function gd(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (!(t.qualities !== void 0 && !Array.isArray(t.qualities))) return t;
}
function _d(e) {
	return e?.type === "weapon" || e?.type === "ammunition" || e?.system?.isWeapon === !0;
}
function vd(e) {
	return Nu(e) || Pu(e);
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actions.ts
var yd = `.${ld}__sheet-row a[data-ech-action="configureProperties"]`, bd = /* @__PURE__ */ new Map(), xd = !1;
function Sd() {
	xd ||= (document.addEventListener("click", kd, !0), !0);
}
function Cd(e) {
	return e?.uuid;
}
function wd(e, t) {
	bd.set(e, t);
}
function Td(e) {
	if (e?.type === "spell" || e?.type === "prayer") {
		Ed(e);
		return;
	}
	let t = Md();
	!e || !t || new t(e).render(!0);
}
async function Ed(t) {
	if (typeof t.update != "function") return;
	let n = Dd(new Set(Uu(t))), i = await foundry.applications.api.DialogV2.wait({
		buttons: [{
			action: "save",
			callback: (e, t) => Od(t.form),
			class: "btn btn-primary",
			default: !0,
			icon: "fa-solid fa-check",
			label: "Save"
		}, {
			action: "cancel",
			callback: () => null,
			class: "btn",
			label: "Cancel",
			type: "button"
		}],
		content: n,
		modal: !0,
		position: { width: 420 },
		window: { title: `Damage Type — ${t.name ?? "Magic"}` }
	});
	if (!Array.isArray(i)) return;
	let a = Gu(i);
	try {
		await t.update({ [`flags.${e}.${Vu}`]: a });
	} catch (t) {
		r(`${e} | Could not update magic damage types`, { error: t }), ui.notifications?.error("Could not save Damage Types for this item.");
	}
}
function Dd(e) {
	let t = document.createElement("div"), n = document.createElement("fieldset"), r = document.createElement("legend"), i = document.createElement("p");
	n.classList.add("fieldset"), r.classList.add("fieldset-legend"), r.textContent = "Damage Types", i.classList.add("label"), i.textContent = "Choose the critical table types this damaging magic item can use.", n.append(r, i);
	for (let t of _) {
		let r = document.createElement("label"), i = document.createElement("input"), a = document.createElement("span");
		r.classList.add("label", "cursor-pointer", "justify-start", "gap-3"), i.classList.add("checkbox", "checkbox-sm"), i.type = "checkbox", i.name = "damageType", i.value = t, i.checked = e.has(t), a.textContent = x[t], r.append(i, a), n.append(r);
	}
	return t.append(n), t;
}
function Od(e) {
	return e ? Gu([...e.querySelectorAll("input[name=\"damageType\"]:checked")].map((e) => e.value)) : [];
}
function kd(e) {
	let t = Ad(e.target);
	t && (e.preventDefault(), e.stopPropagation(), jd(t));
}
function Ad(e) {
	if (e instanceof Element) return e.closest(yd) ?? void 0;
}
async function jd(e) {
	let t = e.closest(`.${ld}__sheet-row`)?.dataset.echItemUuid;
	if (!t) return;
	let n = await fromUuid(t);
	if (!Pd(n)) return;
	if (n.type === "spell" || n.type === "prayer") {
		Td(n);
		return;
	}
	let r = bd.get(t);
	if (r) {
		r(n);
		return;
	}
	Td(n);
}
function Md() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	if (Nd(e)) return e;
}
function Nd(e) {
	return typeof e == "function";
}
function Pd(e) {
	return typeof e == "object" && !!e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actor-sheet.ts
var Fd = /* @__PURE__ */ new WeakSet();
function Id(e, t) {
	if (!(t instanceof HTMLElement)) return;
	let n = Ld(t, "combat"), r = Ld(t, "trappings");
	n && (Rd(n), zd(e, n)), r && (Bd(e, r), !Fd.has(r) && (new MutationObserver(() => {
		Bd(e, r);
	}).observe(r, {
		childList: !0,
		subtree: !0
	}), Fd.add(r)));
}
function Ld(e, t) {
	return e.matches(`section[data-tab="${t}"]`) ? e : e.querySelector(`section[data-tab="${t}"]`) ?? void 0;
}
function Rd(e) {
	let t = new Set(Object.values(x)), n = e.querySelectorAll(".item-property-row a[data-action=\"itemPropertyDropdown\"][data-type=\"qualities\"]");
	for (let e of n) t.has(e.textContent.trim()) && e.classList.add("ech-wounding-property-combat-text");
}
function zd(e, t) {
	let n = t.querySelectorAll(".list-row[data-uuid] .item-property-row:not([data-ech-inference-checked=\"true\"])");
	for (let t of n) {
		t.dataset.echInferenceChecked = "true";
		let n = Ud(e, t);
		if (Kd(n)) for (let e of n.categories) t.append(qd("combat", e, n));
	}
}
function Bd(e, t) {
	Vd(t), Hd(e, t);
}
function Vd(e) {
	let t = new Set(Object.values(x)), n = e.querySelectorAll(".tags .tag:not(.ech-inferred-damage-type)");
	for (let e of n) t.has(e.textContent.trim()) && e.classList.add("ech-wounding-property-trappings-badge");
}
function Hd(e, t) {
	let n = t.querySelectorAll(".list-row[data-uuid] .tags:not([data-ech-inference-checked=\"true\"])");
	for (let t of n) {
		t.dataset.echInferenceChecked = "true";
		let n = Ud(e, t);
		if (Kd(n)) for (let e of n.categories) t.append(qd("trappings", e, n));
	}
}
function Ud(t, n) {
	let i = n.closest(".list-row[data-uuid]")?.dataset.uuid;
	if (i) try {
		let n = Wd(t, i);
		if (!Gd(n)) {
			r(`${e} | Inferred damage display skipped for ${i}: item unavailable or unsupported.`);
			return;
		}
		let a = ed(n).resolution;
		return r(`${e} | Inferred damage display resolved ${i}: source=${a.source} categories=${a.categories.join(",") || "none"}`), a;
	} catch (t) {
		r(`${e} | Could not display inferred damage type`, {
			error: t,
			uuid: i
		});
		return;
	}
}
function Wd(e, t) {
	let n = Q(e), r = Q((Q(n?.actor) ?? Q(n?.document))?.items), i = r?.get, a = t.split(".").at(-1);
	if (!(typeof i != "function" || !a)) return i.call(r, a);
}
function Gd(e) {
	let t = Q(e), n = Q(t?.system);
	return t?.type === "weapon" || t?.type === "ammunition" || n?.isWeapon === !0;
}
function Kd(e) {
	return e?.source === "weaponProperty" || e?.source === "weaponType";
}
function qd(e, t, n) {
	let r = document.createElement(e === "combat" ? "span" : "div"), i = Jd(t, n.source, n.matches);
	return r.classList.add("ech-inferred-damage-type", `ech-inferred-damage-type--${e}`), e === "trappings" && r.classList.add("tag"), r.dataset.echDamageCategory = t, r.dataset.tooltip = i, r.setAttribute("aria-label", i), r.textContent = b[t], r;
}
function Jd(e, t, n) {
	let r = n.filter((t) => t.category === e).map((e) => Yd(e.key, t)), i = t === "weaponProperty" ? "item property" : "weapon type";
	return r.length > 0 ? `Inferred from ${r.join(", ")}` : `Inferred from ${i}`;
}
function Yd(e, t) {
	if (t === "weaponProperty") {
		let t = game.wfrp4e?.utility?.qualityList?.() ?? {}, n = wl(e);
		for (let [e, r] of Object.entries(t)) if (wl(e) === n || wl(r) === n) return r;
	}
	return e.replaceAll(/([a-z])([A-Z])/g, "$1 $2").replaceAll(/[_-]+/g, " ").trim().replaceAll(/\b\w/g, (e) => e.toUpperCase());
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/debug.ts
function Xd(e) {
	if (!(typeof e != "object" || !e)) return e.constructor?.name;
}
function Zd(e) {
	if (e) return {
		id: e.id,
		name: e.name,
		type: e.type,
		uuid: e.uuid
	};
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet-box.ts
function Qd(e, t, n) {
	let r = document.createElement("div");
	r.classList.add("attribute-box", "top-label", `${ld}__sheet-row`);
	let i = Cd(n);
	i && (r.dataset.echItemUuid = i, wd(i, ef(e, n)));
	let a = document.createElement("div");
	a.classList.add("label"), a.style.gridColumn = "1 / span 12", a.innerHTML = "<label><a data-ech-action=\"configureProperties\">Damage Type <i class=\"fas fa-cog\"></i></a></label>";
	let o = document.createElement("div");
	o.classList.add("field"), o.style.gridColumn = "1 / span 12";
	let s = document.createElement("input");
	return s.type = "text", s.value = t.join(","), s.readOnly = !0, o.append(s), r.append(a, o), $d(r, n), r;
}
function $d(e, t) {
	e.querySelector("a[data-ech-action=\"configureProperties\"]")?.addEventListener("click", (e) => {
		e.preventDefault(), Td(t);
	});
}
function ef(e, t) {
	return tf(e) || ((e) => {
		Td(e ?? t);
	});
}
function tf(e) {
	if (typeof e != "object" || !e) return;
	let t = e.constructor?.DEFAULT_OPTIONS?.actions?.configureProperties;
	if (typeof t == "function") return (e) => {
		t.call({ document: e });
	};
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet.ts
function nf(t) {
	if (!(t instanceof HTMLElement)) {
		r(`${e} | ItemProperties render hook skipped: element is not HTMLElement`, { elementType: typeof t });
		return;
	}
	let n = t.querySelector(".property-column");
	if (!n) {
		r(`${e} | ItemProperties render hook skipped: quality column not found.`);
		return;
	}
	let i = af(n);
	if (i.length === 0) {
		r(`${e} | ItemProperties render hook found no damage type rows`, { checkboxCount: n.querySelectorAll("input[type=\"checkbox\"]").length });
		return;
	}
	r(`${e} | Grouping ItemProperties damage type rows`, { woundingRowCount: i.length });
	let a = n.querySelector(`.${ld}`), o = a ?? document.createElement("div");
	a || (o.classList.add(ld), o.append(of()));
	for (let e of i) o.append(e);
	let s = n.querySelector("input[name=\"custom-quality\"]")?.parentElement;
	if (s) {
		s.before(o);
		return;
	}
	n.append(o);
}
function rf(t, n) {
	if (!(n instanceof HTMLElement)) {
		r(`${e} | Item sheet render hook skipped: element is not HTMLElement`, {
			applicationName: Xd(t),
			elementType: typeof n
		});
		return;
	}
	let i = hd(t), a = i?.document ?? i?.item;
	if (!fd(a)) {
		r(`${e} | Item sheet render hook skipped: unsupported document`, {
			applicationName: Xd(t),
			document: Zd(a)
		});
		return;
	}
	r(`${e} | Item sheet render hook inspecting supported document`, {
		applicationName: Xd(t),
		document: Zd(a)
	});
	let o = cf(n);
	if (!o) {
		r(`${e} | Item sheet qualities box not found; trying standalone damage row`, { document: Zd(a) }), sf(t, n, a);
		return;
	}
	let s = o.querySelector(".field input");
	if (!s) {
		r(`${e} | Item sheet qualities input not found`, { document: Zd(a) });
		return;
	}
	let c = lf(s.value), l = c.wounding.length > 0 ? c.wounding : md(a);
	if (l.length === 0) {
		r(`${e} | Item sheet qualities contain no damage type labels`, {
			document: Zd(a),
			displayedQualities: s.value
		});
		return;
	}
	r(`${e} | Splitting item sheet damage type labels into their own row`, {
		document: Zd(a),
		normalQualities: c.normal,
		woundingQualities: c.wounding
	}), s.value = c.normal.join(","), o.parentElement?.querySelector(`.${ld}__sheet-row`)?.remove(), o.after(Qd(t, l, a));
}
function af(e) {
	let t = e.querySelectorAll("input[type=\"checkbox\"]"), n = [];
	for (let e of t) {
		if (!ud.has(e.name)) continue;
		let t = e.closest(".form-group");
		t && n.push(t);
	}
	return n;
}
function of() {
	let e = document.createElement("h2");
	return e.classList.add("property-header", `${ld}__header`), e.textContent = "Damage Type", e;
}
function sf(t, n, i) {
	if (!pd(i)) {
		r(`${e} | Standalone damage type row skipped: unsupported document`, { document: Zd(i) });
		return;
	}
	if (n.querySelector(".ech-wounding-properties__sheet-row")) {
		r(`${e} | Standalone damage type row skipped: row already exists`, { document: Zd(i) });
		return;
	}
	let a = uf(n);
	if (!a) {
		r(`${e} | Standalone damage type row skipped: damage fieldset not found`, { document: Zd(i) });
		return;
	}
	let o = md(i);
	r(`${e} | Appending standalone damage type row`, {
		document: Zd(i),
		labels: o
	}), a.after(Qd(t, o, i));
}
function cf(e) {
	let t = e.querySelectorAll("a[data-action=\"configureProperties\"]");
	for (let e of t) if (e.textContent.trim().startsWith("Qualities")) return e.closest(".attribute-box") ?? void 0;
}
function lf(e) {
	let t = [], n = [], r = new Set(Object.values(x));
	for (let i of e.split(",")) {
		let e = i.trim();
		if (e) {
			if (r.has(e)) {
				n.push(e);
				continue;
			}
			t.push(e);
		}
	}
	return {
		normal: t,
		wounding: n
	};
}
function uf(e) {
	let t = e.querySelectorAll("fieldset");
	for (let e of t) if (e.querySelector("legend")?.textContent.trim() === "Damage") return e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/display.ts
var df = !1, ff = Symbol.for(`${e}.woundingPropertiesContextPatched`);
function pf() {
	if (Sd(), gf(), df) {
		r(`${e} | Wounding property display hooks already installed.`);
		return;
	}
	Hooks.on("renderItemProperties", (e, t) => {
		nf(t);
	}), Hooks.on("renderApplicationV2", (e, t) => {
		rf(e, t), Id(e, t), hf(e) && mf(e);
	}), Hooks.on("renderBaseWFRP4eActorSheet", (e, t) => {
		Id(e, t), mf(e);
	}), df = !0, r(`${e} | Wounding property display hooks installed.`);
}
function mf(t, n = 5) {
	typeof t != "object" || !t || requestAnimationFrame(() => {
		let i = t.element;
		if (i instanceof HTMLElement && i.isConnected) {
			r(`${e} | Styling committed WFRP actor sheet with ${i.querySelectorAll(".item-property-row").length} property rows.`), Id(t, i);
			return;
		}
		if (n > 1) {
			mf(t, n - 1);
			return;
		}
		r(`${e} | Committed WFRP actor sheet element was unavailable.`);
	});
}
function hf(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e.actor;
	return typeof t == "object" && !!t;
}
function gf() {
	let t = _f()?.prototype, n = t?._prepareContext;
	if (!t || !n) {
		r(`${e} | ItemProperties context patch skipped: application unavailable.`);
		return;
	}
	if (vf(n)) {
		r(`${e} | ItemProperties context patch already installed.`);
		return;
	}
	let i = async function(...e) {
		let t = this.document;
		fd(t) && (this.qualities = dd(this.qualities ?? {}));
		let r = await n.apply(this, e);
		return yf(this, r), r;
	};
	Object.defineProperty(i, ff, { value: !0 }), t._prepareContext = i, r(`${e} | ItemProperties context patch installed.`);
}
function _f() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	return typeof e == "function" ? e : void 0;
}
function vf(e) {
	return !!e[ff];
}
function yf(t, n) {
	let i = hd(t), a = gd(n), o = i?.document;
	if (!i || !a || !fd(o)) {
		r(`${e} | Skipping ItemProperties damage type context append`, {
			applicationName: bf(t),
			hasItemProperties: !!i,
			hasRenderContext: !!a,
			document: xf(o),
			supportsDamageTypeProperties: fd(o)
		});
		return;
	}
	r(`${e} | Appending damage types to ItemProperties context`, {
		applicationName: bf(t),
		document: xf(o),
		originalQualityCount: Object.keys(i.qualities ?? {}).length,
		renderedQualityCount: a.qualities?.length ?? 0
	}), i.qualities = dd(i.qualities ?? {}), a.qualities ??= [];
	for (let e of _) {
		let t = y[e];
		a.qualities.some((e) => e.key === t) || a.qualities.push({
			existing: i.document?.originalProperties?.qualities?.[t],
			hasValue: !1,
			key: t,
			name: x[e]
		});
	}
	r(`${e} | ItemProperties context after damage type append`, {
		document: xf(o),
		renderedQualityCount: a.qualities.length
	});
}
function bf(e) {
	if (!(typeof e != "object" || !e)) return e.constructor?.name;
}
function xf(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	return {
		id: t.id,
		name: t.name,
		type: t.type,
		uuid: t.uuid
	};
}
//#endregion
//#region src/module/wfrp4e/damage-qualities.ts
var Sf = !1;
function Cf() {
	let t = game.wfrp4e?.config;
	if (!t) {
		r(`${e} | Damage quality registration skipped: WFRP config unavailable.`);
		return;
	}
	let n = t.propertyHasValue, i = t.qualityDescriptions;
	if (!n || !i) {
		r(`${e} | Damage quality registration skipped: WFRP property config missing`, {
			hasPropertyHasValue: !!n,
			hasQualityDescriptions: !!i
		});
		return;
	}
	for (let e of _) {
		let t = y[e];
		i[t] = "Drowsy's WFRP4e Expanded Damage System damage type marker. A critical hit may roll on the matching expanded critical table.", n[t] = !1;
	}
	r(`${e} | Damage qualities registered`, {
		count: _.length,
		qualityKeys: _.map((e) => y[e])
	}), wf(), pf();
}
function wf() {
	let t = game.wfrp4e?.utility, n = t?.qualityList;
	if (Sf || !t || !n) {
		r(`${e} | Quality list patch skipped`, {
			qualityListPatchInstalled: Sf,
			hasUtility: !!t,
			hasOriginalQualityList: !!n
		});
		return;
	}
	t.qualityList = function(e) {
		let t = n.call(this, e);
		return e === "armor" ? t : dd(t);
	}, Sf = !0, r(`${e} | Quality list patch installed.`);
}
//#endregion
//#region src/module/wfrp4e/zero-wound-critical-links.ts
var Tf = "data-ech-source-item-uuid", Ef = "data-ech-critical-location", Df = !1;
function Of() {
	Df ||= (kf(), document.addEventListener("click", Nf, !0), !0);
}
function kf() {
	let e = CONFIG.Actor?.documentClass?.prototype, t = e?.applyDamage;
	typeof t != "function" || !e || (e.applyDamage = async function(e, n = {}) {
		let r = await t.call(this, e, n), i = Af(n);
		return typeof r != "string" || !i || !r.includes("critical-roll") ? r : Mf(r, i, jf(n));
	});
}
function Af(e) {
	let t = $($(e.sourceTest)?.item), n = $($($(e.opposedTest)?.attackerTest)?.item), r = $(e.sourceItem), i = t?.uuid ?? n?.uuid ?? r?.uuid;
	return typeof i == "string" ? i : void 0;
}
function jf(e) {
	let t = $($(e.opposedTest)?.result)?.hitloc, n = $(t)?.value, r = e.loc, i;
	return typeof n == "string" ? i = n : typeof r == "string" && (i = r), i && Pl(i) ? i : void 0;
}
function Mf(e, t, n) {
	let r = [`${Tf}="${Rf(t)}"`, n ? `${Ef}="${Rf(n)}"` : void 0].filter(Boolean).join(" ");
	return e.replaceAll(/<a\b(?![^>]*\bdata-ech-source-item-uuid=)(?=[^>]*\bcritical-roll\b)/g, `<a ${r}`);
}
function Nf(e) {
	let t = e.target;
	if (!(t instanceof Element) || !Kl()) return;
	let n = t.closest(`[data-action="clickTable"][${Tf}]`);
	!(n instanceof HTMLElement) || !Lf(n.dataset.table) || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), Pf(n).catch((e) => {
		Ff("Drowsy's WFRP4e Expanded Damage System could not roll an annotated zero-wound critical. See the browser console for details.", e);
	}));
}
async function Pf(e) {
	let t = e.dataset.table, n = game.wfrp4e?.tables?.formatChatRoll;
	if (!t || typeof n != "function") return;
	let r = e.closest("[data-message-id]")?.dataset.messageId, i = Number.parseInt(e.dataset.modifier ?? "0", 10) || 0, a = await n(t, {
		criticalLocation: e.dataset.echCriticalLocation ?? If(r),
		messageId: r,
		modifier: i,
		showRoll: !0,
		sourceItemUuid: e.dataset.echSourceItemUuid
	}, e.dataset.column);
	if (typeof a != "string" || a.length === 0) return;
	let o = game.wfrp4e?.utility?.chatDataSetup, s = typeof o == "function" ? o("", game.settings.get("core", "rollMode"), !0) : { content: "" };
	s.content = a, await ChatMessage.create(s);
}
function Ff(t, n) {
	o(`${e} | ${t}`, n), ui.notifications?.error(t);
}
function If(e) {
	if (!e) return;
	let t = $($($(game.messages.get(e)?.system)?.test)?.result)?.hitloc, n = $(t)?.result;
	return typeof n == "string" ? n : void 0;
}
function Lf(e) {
	return typeof e == "string" && /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function Rf(e) {
	return e.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function $(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function zf() {
	Hooks.once("init", () => {
		i(`${e} | Initializing`), Gl(), r(`${e} | init hook running`, {
			foundryVersion: game.version,
			systemId: game.system?.id,
			userIsGM: game.user?.isGM
		}), pf(), bl(), Cf();
	}), Hooks.once("ready", () => {
		Bf();
	});
}
async function Bf() {
	if (r(`${e} | ready hook running`, {
		foundryVersion: game.version,
		systemId: game.system?.id,
		userIsGM: game.user?.isGM,
		settings: tu(),
		wfrpConfigAvailable: !!game.wfrp4e?.config,
		wfrpTablesAvailable: !!game.wfrp4e?.tables
	}), game.system.id !== "wfrp4e") {
		a(`${e} | Loaded outside ${t}; skipping WFRP integration.`);
		return;
	}
	gu(), await Jl(), r(`${e} | ready hook after mapping normalization`, { settings: tu() }), Cf(), await d(), su(), nd(), Of(), i(`${e} | Ready`);
}
//#endregion
//#region src/main.ts
zf();
//#endregion

//# sourceMappingURL=wfrp4e-expanded-critical-hits.mjs.map