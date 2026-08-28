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
}, S = new Map(_.map((e) => [y[e], ee[e]])), C = new Map(g.map((e) => [v[e], e]));
function te(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = S.get(n) ?? C.get(n);
		e && t.add(e);
	}
	return g.filter((e) => t.has(e));
}
function ne(e, t = Math.random()) {
	if (e.length !== 0) return e[Math.min(Math.floor(t * e.length), e.length - 1)];
}
var w = [
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
function re(e) {
	return {
		...e,
		damageFormula: e.damageFormula.trim(),
		rollSeparately: e.rollSeparately !== !1,
		targetUuids: [...new Set(e.targetUuids.map((e) => e.trim()).filter(Boolean))]
	};
}
function ie(e) {
	let t = [];
	return e.damageFormula.trim() || t.push("damageFormulaRequired"), w.includes(e.hitLocation) || t.push("hitLocationInvalid"), e.targetUuids.every((e) => !e.trim()) && t.push("targetsRequired"), e.woundingType !== null && !_.includes(e.woundingType) && t.push("woundingTypeInvalid"), t;
}
//#endregion
//#region src/functions/damage-console/card.ts
function ae(e, t) {
	let n = re(e), r = new Map(t.map((e) => [e.uuid, e]));
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
function T(e, t) {
	if (e.rollSeparately) throw Error("This damage card rolls separately for each target.");
	if (e.roll) throw Error("Damage has already been rolled for this card.");
	return {
		...e,
		roll: t
	};
}
function oe(e, t, n) {
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
function se(e, t, n) {
	let r = ce(e, t), i = !1, a = e.targets.map((e) => {
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
function ce(e, t) {
	let n = e.targets.find((e) => e.uuid === t);
	return e.rollSeparately ? n?.roll : e.roll;
}
function le(e) {
	if (e.woundingType) return {
		category: ee[e.woundingType],
		woundingType: e.woundingType
	};
}
//#endregion
//#region src/functions/damage-console/card-parser.ts
function ue(e) {
	let t = ve(e);
	if (t?.version !== 1 && t?.version !== 2 || typeof t.damageFormula != "string" || !ge(t.hitLocation) || typeof t.ignoreArmour != "boolean" || typeof t.ignoreToughness != "boolean" || typeof t.minimumOne != "boolean" || !_e(t.woundingType) || !Array.isArray(t.targets)) return;
	let n = t.targets.map((e) => t.version === 1 ? me(e) : de(e)), r = t.version === 1 ? !0 : t.rollSeparately, i = t.version === 1 || t.roll === null ? null : pe(t.roll);
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
function de(e) {
	let t = ve(e), n = he(t);
	if (!t || !n) return;
	let r = t.roll === null ? null : pe(t.roll), i = t.result === null ? null : fe(t.result);
	if (!(r === void 0 || i === void 0)) return {
		...n,
		result: i,
		roll: r
	};
}
function fe(e) {
	let t = ve(e);
	if (!(typeof t?.appliedAt != "number" || typeof t.appliedBy != "string" || typeof t.hitLocation != "string" || typeof t.html != "string")) return {
		appliedAt: t.appliedAt,
		appliedBy: t.appliedBy,
		hitLocation: t.hitLocation,
		html: t.html
	};
}
function pe(e) {
	let t = ve(e);
	if (!(typeof t?.damage != "number" || typeof t.rolledAt != "number" || typeof t.rolledBy != "string")) return {
		damage: t.damage,
		rolledAt: t.rolledAt,
		rolledBy: t.rolledBy
	};
}
function me(e) {
	let t = ve(e), n = he(t);
	if (!t || !n) return;
	if (t.result === null) return {
		...n,
		result: null,
		roll: null
	};
	let r = ve(t.result);
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
function he(e) {
	if (!(typeof e?.uuid != "string" || typeof e.name != "string" || typeof e.img != "string")) return {
		img: e.img,
		name: e.name,
		uuid: e.uuid
	};
}
function ge(e) {
	return typeof e == "string" && w.includes(e);
}
function _e(e) {
	return e === null || typeof e == "string" && _.includes(e);
}
function ve(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/card-storage.ts
var ye = "damageConsole";
function be(t) {
	return ue(t.getFlag(e, ye));
}
function xe(e) {
	if (typeof e != "string") return;
	let t = game.messages.get(e), n = t ? be(t) : void 0;
	return n ? le(n) : void 0;
}
function Se(t, n) {
	let r = we(t.flags) ?? {}, i = we(r["wfrp4e-expanded-critical-hits"]) ?? {};
	t.flags = {
		...r,
		[e]: {
			...i,
			[ye]: n
		}
	};
}
function Ce(t) {
	return { [`flags.${e}.${ye}`]: t };
}
function we(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/card-renderer.ts
function Te(e) {
	let t = e.woundingType ? x[e.woundingType] : E("damageConsole.unspecified"), n = [e.ignoreArmour ? E("damageConsole.ignoreArmour") : void 0, e.ignoreToughness ? E("damageConsole.ignoreToughness") : void 0].filter((e) => !!e), r = n.length ? n.join(", ") : E("damageConsole.none");
	return `<div class="wfrp4e chat-card ech-damage-console-card">
    <h3><i class="fa-solid fa-bolt"></i> ${Me(E("damageConsole.cardTitle"))}</h3>
    <dl class="ech-damage-console-card__summary">
      ${ke(E("damageConsole.damage"), e.damageFormula)}
      ${ke(E("damageConsole.hitLocation"), Ae(e.hitLocation))}
      ${ke(E("damageConsole.woundingType"), t)}
      ${ke(E("damageConsole.ignores"), r)}
      ${ke(E("damageConsole.minimumOne"), je(e.minimumOne))}
      ${ke(E("damageConsole.rollMode"), E(e.rollSeparately ? "damageConsole.rollSeparately" : "damageConsole.rollTogether"))}
    </dl>
    ${Ee(e)}
    <div class="ech-damage-console-card__targets">
      ${e.targets.map((t) => De(e, t)).join("")}
    </div>
  </div>`;
}
function Ee(e) {
	return e.rollSeparately ? "" : e.roll ? Oe(e.roll.damage) : `<button type="button" class="chat-button chat-button-gm ech-damage-console-card__action"
    data-ech-action="rollDamage">
    <i class="fa-solid fa-dice-d20"></i> ${Me(E("damageConsole.rollDamage"))}
  </button>`;
}
function De(e, t) {
	let n = `<div class="ech-damage-console-card__identity">
    <img src="${Ne(t.img)}" alt="" />
    <strong>${Me(t.name)}</strong>
  </div>`, r = e.rollSeparately ? t.roll : e.roll;
	if (!r) return `<section class="ech-damage-console-card__target">
      ${n}
      ${e.rollSeparately ? `<button type="button" class="chat-button chat-button-gm ech-damage-console-card__action"
        data-ech-action="rollDamage" data-target-uuid="${Ne(t.uuid)}">
        <i class="fa-solid fa-dice-d20"></i> ${Me(E("damageConsole.rollDamage"))}
      </button>` : ""}
    </section>`;
	let i = Oe(r.damage, t.result?.hitLocation);
	return t.result ? `<section class="ech-damage-console-card__target ech-damage-console-card__target--applied">
    ${n}
    ${i}
    <div class="ech-damage-console-card__result">${t.result.html}</div>
  </section>` : `<section class="ech-damage-console-card__target ech-damage-console-card__target--rolled">
    ${n}
    ${i}
    <button type="button" class="chat-button chat-button-gm ech-damage-console-card__action"
      data-ech-action="applyDamage" data-target-uuid="${Ne(t.uuid)}">
      <i class="fa-solid fa-bolt"></i> ${Me(E("damageConsole.applyDamage"))}
    </button>
  </section>`;
}
function Oe(e, t) {
	let n = t ? ` &middot; ${Me(Ae(t))}` : "";
	return `<p class="ech-damage-console-card__roll">
    ${Me(E("damageConsole.rolled"))}: <strong>${e}</strong>${n}
  </p>`;
}
function ke(e, t) {
	return `<div><dt>${Me(e)}</dt><dd>${Me(t)}</dd></div>`;
}
function Ae(e) {
	if (e === "roll") return game.i18n.localize("Roll");
	let t = game.wfrp4e?.config?.locations?.[e];
	return t ? game.i18n.localize(t) : e;
}
function je(e) {
	return E(e ? "damageConsole.yes" : "damageConsole.no");
}
function E(e) {
	return game.i18n.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.${e}`);
}
function Me(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#039;");
}
function Ne(e) {
	return Me(e);
}
//#endregion
//#region src/module/wfrp4e/damage-console/targets.ts
function Pe() {
	let e = [...game.user.targets].map(Ie).filter((e) => !!e);
	return [...new Map(e.map((e) => [e.uuid, e])).values()];
}
async function Fe(e) {
	let t = await fromUuid(e), n = t?.actor ?? t;
	if (!Le(n)) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.targetUnavailable", { uuid: e }));
	return {
		actor: n,
		snapshot: {
			img: Re(t?.texture?.src) ?? "icons/svg/mystery-man.svg",
			name: Re(t?.name) ?? e,
			uuid: e
		}
	};
}
function Ie(e) {
	let t = e, n = t?.document, r = Re(n?.uuid);
	if (!(!r || !Le(n?.actor ?? t?.actor))) return {
		img: Re(n?.texture?.src) ?? Re(t?.texture?.src) ?? "icons/svg/mystery-man.svg",
		name: Re(t?.name) ?? Re(n?.name) ?? r,
		uuid: r
	};
}
function Le(e) {
	return typeof e == "object" && !!e && typeof e.applyBasicDamage == "function";
}
function Re(e) {
	return typeof e == "string" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/runtime.ts
async function ze(e, t) {
	let n = ce(e, t);
	if (!n) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.rollRequired"));
	let { actor: r } = await Fe(t), i = await He(e, r), a = Ue(e.ignoreArmour, e.ignoreToughness), o = await r.applyBasicDamage(n.damage, {
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
async function Be(e) {
	let { damage: t, roll: n } = await Ve(e.damageFormula);
	return await n.toMessage({ flavor: game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.title") }), {
		damage: t,
		rolledAt: Date.now(),
		rolledBy: game.user.name
	};
}
async function Ve(e) {
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
async function He(e, t) {
	if (e.hitLocation !== "roll") return e.hitLocation;
	let n = Ge(t.details?.hitLocationTable?.value) ?? Ge(t.system?.details?.hitLocationTable?.value) ?? "hitloc", r = Ge(We(await game.wfrp4e?.tables?.rollTable?.(n, { hideDSN: !0 }))?.result);
	if (!r) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.hitLocationFailed"));
	return r;
}
function Ue(e, t) {
	let n = game.wfrp4e?.config?.DAMAGE_TYPE;
	if (!n) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.damageApiUnavailable"));
	return e && t ? n.IGNORE_ALL : e ? n.IGNORE_AP : t ? n.IGNORE_TB : n.NORMAL;
}
function We(e) {
	return typeof e == "object" && e ? e : void 0;
}
function Ge(e) {
	return typeof e == "string" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/chat-actions.ts
var Ke = /* @__PURE__ */ new Map();
function qe() {
	Hooks.on("renderChatMessageHTML", (e, t) => {
		if (!nt(e) || !(t instanceof HTMLElement) || !be(e)) return;
		let n = t.querySelectorAll("[data-ech-action]");
		if (!game.user.isGM) {
			n.forEach((e) => e.remove());
			return;
		}
		n.forEach((t) => {
			t.addEventListener("click", (n) => {
				n.preventDefault();
				let r = t.dataset.targetUuid, i = t.dataset.echAction;
				!tt(i) || i === "applyDamage" && !r || (t.disabled = !0, Je(e, r, i).catch((e) => {
					t.disabled = !1, ui.notifications?.error(rt(e));
				}));
			});
		});
	});
}
async function Je(e, t, n) {
	let r = (Ke.get(e.id) ?? Promise.resolve()).catch(() => void 0).then(async () => {
		if (n === "rollDamage") {
			await Ye(e, t);
			return;
		}
		t && await Xe(e, t);
	});
	Ke.set(e.id, r);
	try {
		await r;
	} finally {
		Ke.get(e.id) === r && Ke.delete(e.id);
	}
}
async function Ye(e, t) {
	let n = Qe(e);
	if (!n.rollSeparately) {
		if (n.roll) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.alreadyRolledShared"));
		await et(e, T(n, await Be(n)));
		return;
	}
	if (!t) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.cardTargetUnavailable"));
	let r = $e(n, t);
	if (r.roll) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.alreadyRolled", { name: r.name }));
	await et(e, oe(n, t, await Be(n)));
}
async function Xe(e, t) {
	let { card: n, target: r } = Ze(e, t);
	if (!ce(n, t)) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.rollRequired", { name: r.name }));
	if (r.result) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.alreadyApplied", { name: r.name }));
	await et(e, se(n, t, await ze(n, t)));
}
function Ze(e, t) {
	let n = Qe(e);
	return {
		card: n,
		target: $e(n, t)
	};
}
function Qe(e) {
	let t = be(e);
	if (!t) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.cardUnavailable"));
	return t;
}
function $e(e, t) {
	let n = e.targets.find((e) => e.uuid === t);
	if (!n) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.cardTargetUnavailable"));
	return n;
}
async function et(e, t) {
	await e.update({
		...Ce(t),
		content: Te(t)
	});
}
function tt(e) {
	return e === "applyDamage" || e === "rollDamage";
}
function nt(e) {
	return typeof e == "object" && !!e && typeof e.getFlag == "function" && typeof e.update == "function";
}
function rt(e) {
	return e instanceof Error ? e.message : String(e);
}
//#endregion
//#region node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function it(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var D = process.env.NODE_ENV === "production" ? {} : Object.freeze({}), at = process.env.NODE_ENV === "production" ? [] : Object.freeze([]), O = () => {}, ot = () => !1, st = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ct = (e) => e.startsWith("onUpdate:"), k = Object.assign, lt = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, ut = Object.prototype.hasOwnProperty, A = (e, t) => ut.call(e, t), j = Array.isArray, dt = (e) => _t(e) === "[object Map]", ft = (e) => _t(e) === "[object Set]", pt = (e) => _t(e) === "[object Date]", M = (e) => typeof e == "function", N = (e) => typeof e == "string", mt = (e) => typeof e == "symbol", P = (e) => typeof e == "object" && !!e, ht = (e) => (P(e) || M(e)) && M(e.then) && M(e.catch), gt = Object.prototype.toString, _t = (e) => gt.call(e), vt = (e) => _t(e).slice(8, -1), yt = (e) => _t(e) === "[object Object]", bt = (e) => N(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, xt = /* @__PURE__ */ it(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), St = /* @__PURE__ */ it("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"), Ct = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, wt = /-\w/g, Tt = Ct((e) => e.replace(wt, (e) => e.slice(1).toUpperCase())), Et = /\B([A-Z])/g, Dt = Ct((e) => e.replace(Et, "-$1").toLowerCase()), Ot = Ct((e) => e.charAt(0).toUpperCase() + e.slice(1)), kt = Ct((e) => e ? `on${Ot(e)}` : ""), At = (e, t) => !Object.is(e, t), jt = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, Mt = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, Nt = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, Pt, Ft = () => Pt ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function It(e) {
	if (j(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = N(r) ? Bt(r) : It(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (N(e) || P(e)) return e;
}
var Lt = /;(?![^(]*\))/g, Rt = /:([^]+)/, zt = /\/\*[^]*?\*\//g;
function Bt(e) {
	let t = {};
	return e.replace(zt, "").split(Lt).forEach((e) => {
		if (e) {
			let n = e.split(Rt);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function Vt(e) {
	let t = "";
	if (N(e)) t = e;
	else if (j(e)) for (let n = 0; n < e.length; n++) {
		let r = Vt(e[n]);
		r && (t += r + " ");
	}
	else if (P(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var Ht = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", Ut = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Wt = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", Gt = /* @__PURE__ */ it(Ht), Kt = /* @__PURE__ */ it(Ut), qt = /* @__PURE__ */ it(Wt), Jt = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Yt = /* @__PURE__ */ it(Jt);
Jt + "";
function Xt(e) {
	return !!e || e === "";
}
function Zt(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = Qt(e[r], t[r]);
	return n;
}
function Qt(e, t) {
	if (e === t) return !0;
	let n = pt(e), r = pt(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = mt(e), r = mt(t), n || r) return e === t;
	if (n = j(e), r = j(t), n || r) return n && r ? Zt(e, t) : !1;
	if (n = P(e), r = P(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !Qt(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function $t(e, t) {
	return e.findIndex((e) => Qt(e, t));
}
var en = (e) => !!(e && e.__v_isRef === !0), F = (e) => N(e) ? e : e == null ? "" : j(e) || P(e) && (e.toString === gt || !M(e.toString)) ? en(e) ? F(e.value) : JSON.stringify(e, tn, 2) : String(e), tn = (e, t) => en(t) ? tn(e, t.value) : dt(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[nn(t, r) + " =>"] = n, e), {}) } : ft(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => nn(e)) } : mt(t) ? nn(t) : P(t) && !j(t) && !yt(t) ? String(t) : t, nn = (e, t = "") => mt(e) ? `Symbol(${e.description ?? t})` : e;
//#endregion
//#region node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
function rn(e, ...t) {
	console.warn(`[Vue warn] ${e}`, ...t);
}
var I, an = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && I && (I.active ? (this.parent = I, this.index = (I.scopes ||= []).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
			let t = I;
			try {
				return I = this, e();
			} finally {
				I = t;
			}
		} else process.env.NODE_ENV !== "production" && this._warnOnRun && rn("cannot run an inactive effect scope.");
	}
	on() {
		++this._on === 1 && (this.prevScope = I, I = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (I === this) I = this.prevScope;
			else {
				let e = I;
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
function on(e) {
	return new an(e);
}
function sn() {
	return I;
}
function cn(e, t = !1) {
	I ? I.cleanups.push(e) : process.env.NODE_ENV !== "production" && !t && rn("onScopeDispose() is called when there is no active effect scope to be associated with.");
}
var L, ln = /* @__PURE__ */ new WeakSet(), un = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, I && (I.active ? I.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, ln.has(this) && (ln.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || mn(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Dn(this), _n(this);
		let e = L, t = Cn;
		L = this, Cn = !0;
		try {
			return this.fn();
		} finally {
			process.env.NODE_ENV !== "production" && L !== this && rn("Active effect was not restored correctly - this is likely a Vue internal bug."), vn(this), L = e, Cn = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) xn(e);
			this.deps = this.depsTail = void 0, Dn(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? ln.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		yn(this) && this.run();
	}
	get dirty() {
		return yn(this);
	}
}, dn = 0, fn, pn;
function mn(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = pn, pn = e;
		return;
	}
	e.next = fn, fn = e;
}
function hn() {
	dn++;
}
function gn() {
	if (--dn > 0) return;
	if (pn) {
		let e = pn;
		for (pn = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; fn;) {
		let t = fn;
		for (fn = void 0; t;) {
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
function _n(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function vn(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), xn(r), Sn(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function yn(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (bn(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function bn(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === On) || (e.globalVersion = On, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !yn(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = L, r = Cn;
	L = e, Cn = !0;
	try {
		_n(e);
		let n = e.fn(e._value);
		(t.version === 0 || At(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		L = n, Cn = r, vn(e), e.flags &= -3;
	}
}
function xn(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = i), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) xn(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Sn(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var Cn = !0, wn = [];
function Tn() {
	wn.push(Cn), Cn = !1;
}
function En() {
	let e = wn.pop();
	Cn = e === void 0 ? !0 : e;
}
function Dn(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = L;
		L = void 0;
		try {
			t();
		} finally {
			L = e;
		}
	}
}
var On = 0, kn = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, An = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
	}
	track(e) {
		if (!L || !Cn || L === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== L) t = this.activeLink = new kn(L, this), L.deps ? (t.prevDep = L.depsTail, L.depsTail.nextDep = t, L.depsTail = t) : L.deps = L.depsTail = t, jn(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = L.depsTail, t.nextDep = void 0, L.depsTail.nextDep = t, L.depsTail = t, L.deps === t && (L.deps = e);
		}
		return process.env.NODE_ENV !== "production" && L.onTrack && L.onTrack(k({ effect: L }, e)), t;
	}
	trigger(e) {
		this.version++, On++, this.notify(e);
	}
	notify(e) {
		hn();
		try {
			if (process.env.NODE_ENV !== "production") for (let t = this.subsHead; t; t = t.nextSub) t.sub.onTrigger && !(t.sub.flags & 8) && t.sub.onTrigger(k({ effect: t.sub }, e));
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			gn();
		}
	}
};
function jn(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) jn(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
	}
}
var Mn = /* @__PURE__ */ new WeakMap(), Nn = /* @__PURE__ */ Symbol(process.env.NODE_ENV === "production" ? "" : "Object iterate"), Pn = /* @__PURE__ */ Symbol(process.env.NODE_ENV === "production" ? "" : "Map keys iterate"), Fn = /* @__PURE__ */ Symbol(process.env.NODE_ENV === "production" ? "" : "Array iterate");
function R(e, t, n) {
	if (Cn && L) {
		let r = Mn.get(e);
		r || Mn.set(e, r = /* @__PURE__ */ new Map());
		let i = r.get(n);
		i || (r.set(n, i = new An()), i.map = r, i.key = n), process.env.NODE_ENV === "production" ? i.track() : i.track({
			target: e,
			type: t,
			key: n
		});
	}
}
function In(e, t, n, r, i, a) {
	let o = Mn.get(e);
	if (!o) {
		On++;
		return;
	}
	let s = (o) => {
		o && (process.env.NODE_ENV === "production" ? o.trigger() : o.trigger({
			target: e,
			type: t,
			key: n,
			newValue: r,
			oldValue: i,
			oldTarget: a
		}));
	};
	if (hn(), t === "clear") o.forEach(s);
	else {
		let i = j(e), a = i && bt(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === Fn || !mt(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(Fn)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(Nn)), dt(e) && s(o.get(Pn)));
				break;
			case "delete":
				i || (s(o.get(Nn)), dt(e) && s(o.get(Pn)));
				break;
			case "set":
				dt(e) && s(o.get(Nn));
				break;
		}
	}
	gn();
}
function Ln(e, t) {
	let n = Mn.get(e);
	return n && n.get(t);
}
function Rn(e) {
	let t = /* @__PURE__ */ B(e);
	return t === e ? t : (R(t, "iterate", Fn), /* @__PURE__ */ z(e) ? t : t.map(kr));
}
function zn(e) {
	return R(e = /* @__PURE__ */ B(e), "iterate", Fn), e;
}
function Bn(e, t) {
	return /* @__PURE__ */ Er(e) ? Ar(/* @__PURE__ */ Tr(e) ? kr(t) : t) : kr(t);
}
var Vn = {
	__proto__: null,
	[Symbol.iterator]() {
		return Hn(this, Symbol.iterator, (e) => Bn(this, e));
	},
	concat(...e) {
		return Rn(this).concat(...e.map((e) => j(e) ? Rn(e) : e));
	},
	entries() {
		return Hn(this, "entries", (e) => (e[1] = Bn(this, e[1]), e));
	},
	every(e, t) {
		return Wn(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return Wn(this, "filter", e, t, (e) => e.map((e) => Bn(this, e)), arguments);
	},
	find(e, t) {
		return Wn(this, "find", e, t, (e) => Bn(this, e), arguments);
	},
	findIndex(e, t) {
		return Wn(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return Wn(this, "findLast", e, t, (e) => Bn(this, e), arguments);
	},
	findLastIndex(e, t) {
		return Wn(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return Wn(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return Kn(this, "includes", e);
	},
	indexOf(...e) {
		return Kn(this, "indexOf", e);
	},
	join(e) {
		return Rn(this).join(e);
	},
	lastIndexOf(...e) {
		return Kn(this, "lastIndexOf", e);
	},
	map(e, t) {
		return Wn(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return qn(this, "pop");
	},
	push(...e) {
		return qn(this, "push", e);
	},
	reduce(e, ...t) {
		return Gn(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return Gn(this, "reduceRight", e, t);
	},
	shift() {
		return qn(this, "shift");
	},
	some(e, t) {
		return Wn(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return qn(this, "splice", e);
	},
	toReversed() {
		return Rn(this).toReversed();
	},
	toSorted(e) {
		return Rn(this).toSorted(e);
	},
	toSpliced(...e) {
		return Rn(this).toSpliced(...e);
	},
	unshift(...e) {
		return qn(this, "unshift", e);
	},
	values() {
		return Hn(this, "values", (e) => Bn(this, e));
	}
};
function Hn(e, t, n) {
	let r = zn(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ z(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var Un = Array.prototype;
function Wn(e, t, n, r, i, a) {
	let o = zn(e), s = o !== e && !/* @__PURE__ */ z(e), c = o[t];
	if (c !== Un[t]) {
		let t = c.apply(e, a);
		return s ? kr(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, Bn(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function Gn(e, t, n, r) {
	let i = zn(e), a = i !== e && !/* @__PURE__ */ z(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = Bn(e, t)), n.call(this, t, Bn(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? Bn(e, c) : c;
}
function Kn(e, t, n) {
	let r = /* @__PURE__ */ B(e);
	R(r, "iterate", Fn);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Dr(n[0]) ? (n[0] = /* @__PURE__ */ B(n[0]), r[t](...n)) : i;
}
function qn(e, t, n = []) {
	Tn(), hn();
	let r = (/* @__PURE__ */ B(e))[t].apply(e, n);
	return gn(), En(), r;
}
var Jn = /* @__PURE__ */ it("__proto__,__v_isRef,__isVue"), Yn = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(mt));
function Xn(e) {
	mt(e) || (e = String(e));
	let t = /* @__PURE__ */ B(this);
	return R(t, "has", e), t.hasOwnProperty(e);
}
var Zn = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? vr : _r : i ? gr : hr).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = j(e);
		if (!r) {
			let e;
			if (a && (e = Vn[t])) return e;
			if (t === "hasOwnProperty") return Xn;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ V(e) ? e : n);
		if ((mt(t) ? Yn.has(t) : Jn(t)) || (r || R(e, "get", t), i)) return o;
		if (/* @__PURE__ */ V(o)) {
			let e = a && bt(t) ? o : o.value;
			return r && P(e) ? /* @__PURE__ */ Sr(e) : e;
		}
		return P(o) ? r ? /* @__PURE__ */ Sr(o) : /* @__PURE__ */ br(o) : o;
	}
}, Qn = class extends Zn {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = j(e) && bt(t);
		if (!this._isShallow) {
			let r = /* @__PURE__ */ Er(i);
			if (!/* @__PURE__ */ z(n) && !/* @__PURE__ */ Er(n) && (i = /* @__PURE__ */ B(i), n = /* @__PURE__ */ B(n)), !a && /* @__PURE__ */ V(i) && !/* @__PURE__ */ V(n)) return r ? (process.env.NODE_ENV !== "production" && rn(`Set operation on key "${String(t)}" failed: target is readonly.`, e[t]), !0) : (i.value = n, !0);
		}
		let o = a ? Number(t) < e.length : A(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ V(e) ? e : r);
		return e === /* @__PURE__ */ B(r) && (o ? At(n, i) && In(e, "set", t, n, i) : In(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = A(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && In(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!mt(t) || !Yn.has(t)) && R(e, "has", t), n;
	}
	ownKeys(e) {
		return R(e, "iterate", j(e) ? "length" : Nn), Reflect.ownKeys(e);
	}
}, $n = class extends Zn {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return process.env.NODE_ENV !== "production" && rn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
	}
	deleteProperty(e, t) {
		return process.env.NODE_ENV !== "production" && rn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
	}
}, er = /* @__PURE__ */ new Qn(), tr = /* @__PURE__ */ new $n(), nr = /* @__PURE__ */ new Qn(!0), rr = /* @__PURE__ */ new $n(!0), ir = (e) => e, ar = (e) => Reflect.getPrototypeOf(e);
function or(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ B(i), o = dt(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), u = n ? ir : t ? Ar : kr;
		return !t && R(a, "iterate", c ? Pn : Nn), k(Object.create(l), { next() {
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
function sr(e) {
	return function(...t) {
		if (process.env.NODE_ENV !== "production") {
			let n = t[0] ? `on key "${t[0]}" ` : "";
			rn(`${Ot(e)} operation ${n}failed: target is readonly.`, /* @__PURE__ */ B(this));
		}
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function cr(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ B(r), a = /* @__PURE__ */ B(n);
			e || (At(n, a) && R(i, "get", n), R(i, "get", a));
			let { has: o } = ar(i), s = t ? ir : e ? Ar : kr;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && R(/* @__PURE__ */ B(t), "iterate", Nn), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ B(n), i = /* @__PURE__ */ B(t);
			return e || (At(t, i) && R(r, "has", t), R(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ B(a), s = t ? ir : e ? Ar : kr;
			return !e && R(o, "iterate", Nn), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return k(n, e ? {
		add: sr("add"),
		set: sr("set"),
		delete: sr("delete"),
		clear: sr("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ B(this), r = ar(n), i = /* @__PURE__ */ B(e), a = !t && !/* @__PURE__ */ z(e) && !/* @__PURE__ */ Er(e) ? i : e;
			return r.has.call(n, a) || At(e, a) && r.has.call(n, e) || At(i, a) && r.has.call(n, i) || (n.add(a), In(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ z(n) && !/* @__PURE__ */ Er(n) && (n = /* @__PURE__ */ B(n));
			let r = /* @__PURE__ */ B(this), { has: i, get: a } = ar(r), o = i.call(r, e);
			o ? process.env.NODE_ENV !== "production" && mr(r, i, e) : (e = /* @__PURE__ */ B(e), o = i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? At(n, s) && In(r, "set", e, n, s) : In(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ B(this), { has: n, get: r } = ar(t), i = n.call(t, e);
			i ? process.env.NODE_ENV !== "production" && mr(t, n, e) : (e = /* @__PURE__ */ B(e), i = n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && In(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ B(this), t = e.size !== 0, n = process.env.NODE_ENV === "production" ? void 0 : dt(e) ? new Map(e) : new Set(e), r = e.clear();
			return t && In(e, "clear", void 0, void 0, n), r;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = or(r, e, t);
	}), n;
}
function lr(e, t) {
	let n = cr(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(A(n, r) && r in t ? n : t, r, i);
}
var ur = { get: /* @__PURE__ */ lr(!1, !1) }, dr = { get: /* @__PURE__ */ lr(!1, !0) }, fr = { get: /* @__PURE__ */ lr(!0, !1) }, pr = { get: /* @__PURE__ */ lr(!0, !0) };
function mr(e, t, n) {
	let r = /* @__PURE__ */ B(n);
	if (r !== n && t.call(e, r)) {
		let t = vt(e);
		rn(`Reactive ${t} contains both the raw and reactive versions of the same object${t === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
	}
}
var hr = /* @__PURE__ */ new WeakMap(), gr = /* @__PURE__ */ new WeakMap(), _r = /* @__PURE__ */ new WeakMap(), vr = /* @__PURE__ */ new WeakMap();
function yr(e) {
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
function br(e) {
	return /* @__PURE__ */ Er(e) ? e : wr(e, !1, er, ur, hr);
}
// @__NO_SIDE_EFFECTS__
function xr(e) {
	return wr(e, !1, nr, dr, gr);
}
// @__NO_SIDE_EFFECTS__
function Sr(e) {
	return wr(e, !0, tr, fr, _r);
}
// @__NO_SIDE_EFFECTS__
function Cr(e) {
	return wr(e, !0, rr, pr, vr);
}
function wr(e, t, n, r, i) {
	if (!P(e)) return process.env.NODE_ENV !== "production" && rn(`value cannot be made ${t ? "readonly" : "reactive"}: ${String(e)}`), e;
	if (e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = yr(vt(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function Tr(e) {
	return /* @__PURE__ */ Er(e) ? /* @__PURE__ */ Tr(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Er(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function z(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Dr(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function B(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ B(t) : e;
}
function Or(e) {
	return !A(e, "__v_skip") && Object.isExtensible(e) && Mt(e, "__v_skip", !0), e;
}
var kr = (e) => P(e) ? /* @__PURE__ */ br(e) : e, Ar = (e) => P(e) ? /* @__PURE__ */ Sr(e) : e;
// @__NO_SIDE_EFFECTS__
function V(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function jr(e) {
	return Mr(e, !1);
}
function Mr(e, t) {
	return /* @__PURE__ */ V(e) ? e : new Nr(e, t);
}
var Nr = class {
	constructor(e, t) {
		this.dep = new An(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ B(e), this._value = t ? e : kr(e), this.__v_isShallow = t;
	}
	get value() {
		return process.env.NODE_ENV === "production" ? this.dep.track() : this.dep.track({
			target: this,
			type: "get",
			key: "value"
		}), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ z(e) || /* @__PURE__ */ Er(e);
		e = n ? e : /* @__PURE__ */ B(e), At(e, t) && (this._rawValue = e, this._value = n ? e : kr(e), process.env.NODE_ENV === "production" ? this.dep.trigger() : this.dep.trigger({
			target: this,
			type: "set",
			key: "value",
			newValue: e,
			oldValue: t
		}));
	}
};
function H(e) {
	return /* @__PURE__ */ V(e) ? e.value : e;
}
var Pr = {
	get: (e, t, n) => t === "__v_raw" ? e : H(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ V(i) && !/* @__PURE__ */ V(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Fr(e) {
	return /* @__PURE__ */ Tr(e) ? e : new Proxy(e, Pr);
}
// @__NO_SIDE_EFFECTS__
function Ir(e) {
	process.env.NODE_ENV !== "production" && !/* @__PURE__ */ Dr(e) && rn("toRefs() expects a reactive object but received a plain one.");
	let t = j(e) ? Array(e.length) : {};
	for (let n in e) t[n] = Br(e, n);
	return t;
}
var Lr = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = mt(t) ? t : String(t), this._raw = /* @__PURE__ */ B(e);
		let r = !0, i = e;
		if (!j(e) || mt(this._key) || !bt(this._key)) do
			r = !/* @__PURE__ */ Dr(i) || /* @__PURE__ */ z(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = H(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ V(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ V(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return Ln(this._raw, this._key);
	}
}, Rr = class {
	constructor(e) {
		this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
	}
	get value() {
		return this._value = this._getter();
	}
};
// @__NO_SIDE_EFFECTS__
function zr(e, t, n) {
	return /* @__PURE__ */ V(e) ? e : M(e) ? new Rr(e) : P(e) && arguments.length > 1 ? Br(e, t, n) : /* @__PURE__ */ jr(e);
}
function Br(e, t, n) {
	return new Lr(e, t, n);
}
var Vr = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new An(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = On - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && L !== this) return mn(this, !0), !0;
		process.env.NODE_ENV;
	}
	get value() {
		let e = process.env.NODE_ENV === "production" ? this.dep.track() : this.dep.track({
			target: this,
			type: "get",
			key: "value"
		});
		return bn(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter ? this.setter(e) : process.env.NODE_ENV !== "production" && rn("Write operation failed: computed value is readonly");
	}
};
// @__NO_SIDE_EFFECTS__
function Hr(e, t, n = !1) {
	let r, i;
	M(e) ? r = e : (r = e.get, i = e.set);
	let a = new Vr(r, i, n);
	return process.env.NODE_ENV !== "production" && t && !n && (a.onTrack = t.onTrack, a.onTrigger = t.onTrigger), a;
}
var Ur = {}, Wr = /* @__PURE__ */ new WeakMap(), Gr = void 0;
function Kr(e, t = !1, n = Gr) {
	if (n) {
		let t = Wr.get(n);
		t || Wr.set(n, t = []), t.push(e);
	} else process.env.NODE_ENV !== "production" && !t && rn("onWatcherCleanup() was called when there was no active watcher to associate with.");
}
function qr(e, t, n = D) {
	let { immediate: r, deep: i, once: a, scheduler: o, augmentJob: s, call: c } = n, l = (e) => {
		(n.onWarn || rn)("Invalid watch source: ", e, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
	}, u = (e) => i ? e : /* @__PURE__ */ z(e) || i === !1 || i === 0 ? Jr(e, 1) : Jr(e), d, f, p, m, h = !1, g = !1;
	if (/* @__PURE__ */ V(e) ? (f = () => e.value, h = /* @__PURE__ */ z(e)) : /* @__PURE__ */ Tr(e) ? (f = () => u(e), h = !0) : j(e) ? (g = !0, h = e.some((e) => /* @__PURE__ */ Tr(e) || /* @__PURE__ */ z(e)), f = () => e.map((e) => {
		if (/* @__PURE__ */ V(e)) return e.value;
		if (/* @__PURE__ */ Tr(e)) return u(e);
		if (M(e)) return c ? c(e, 2) : e();
		process.env.NODE_ENV !== "production" && l(e);
	})) : M(e) ? f = t ? c ? () => c(e, 2) : e : () => {
		if (p) {
			Tn();
			try {
				p();
			} finally {
				En();
			}
		}
		let t = Gr;
		Gr = d;
		try {
			return c ? c(e, 3, [m]) : e(m);
		} finally {
			Gr = t;
		}
	} : (f = O, process.env.NODE_ENV !== "production" && l(e)), t && i) {
		let e = f, t = i === !0 ? Infinity : i;
		f = () => Jr(e(), t);
	}
	let _ = sn(), v = () => {
		d.stop(), _ && _.active && lt(_.effects, d);
	};
	if (a && t) {
		let e = t;
		t = (...t) => {
			let n = e(...t);
			return v(), n;
		};
	}
	let y = g ? Array(e.length).fill(Ur) : Ur, b = (e) => {
		if (!(!(d.flags & 1) || !d.dirty && !e)) if (t) {
			let n = d.run();
			if (e || i || h || (g ? n.some((e, t) => At(e, y[t])) : At(n, y))) {
				p && p();
				let e = Gr;
				Gr = d;
				try {
					let e = [
						n,
						y === Ur ? void 0 : g && y[0] === Ur ? [] : y,
						m
					];
					y = n, c ? c(t, 3, e) : t(...e);
				} finally {
					Gr = e;
				}
			}
		} else d.run();
	};
	return s && s(b), d = new un(f), d.scheduler = o ? () => o(b, !1) : b, m = (e) => Kr(e, !1, d), p = d.onStop = () => {
		let e = Wr.get(d);
		if (e) {
			if (c) c(e, 4);
			else for (let t of e) t();
			Wr.delete(d);
		}
	}, process.env.NODE_ENV !== "production" && (d.onTrack = n.onTrack, d.onTrigger = n.onTrigger), t ? r ? b(!0) : y = d.run() : o ? o(b.bind(null, !0), !0) : d.run(), v.pause = d.pause.bind(d), v.resume = d.resume.bind(d), v.stop = v, v;
}
function Jr(e, t = Infinity, n) {
	if (t <= 0 || !P(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ V(e)) Jr(e.value, t, n);
	else if (j(e)) for (let r = 0; r < e.length; r++) Jr(e[r], t, n);
	else if (ft(e) || dt(e)) e.forEach((e) => {
		Jr(e, t, n);
	});
	else if (yt(e)) {
		for (let r in e) Jr(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Jr(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var Yr = [];
function Xr(e) {
	Yr.push(e);
}
function Zr() {
	Yr.pop();
}
var Qr = !1;
function U(e, ...t) {
	if (Qr) return;
	Qr = !0, Tn();
	let n = Yr.length ? Yr[Yr.length - 1].component : null, r = n && n.appContext.config.warnHandler, i = $r();
	if (r) ai(r, n, 11, [
		e + t.map((e) => e.toString?.call(e) ?? JSON.stringify(e)).join(""),
		n && n.proxy,
		i.map(({ vnode: e }) => `at <${Lc(n, e.type)}>`).join("\n"),
		i
	]);
	else {
		let n = [`[Vue warn]: ${e}`, ...t];
		i.length && n.push("\n", ...ei(i)), console.warn(...n);
	}
	En(), Qr = !1;
}
function $r() {
	let e = Yr[Yr.length - 1];
	if (!e) return [];
	let t = [];
	for (; e;) {
		let n = t[0];
		n && n.vnode === e ? n.recurseCount++ : t.push({
			vnode: e,
			recurseCount: 0
		});
		let r = e.component && e.component.parent;
		e = r && r.vnode;
	}
	return t;
}
function ei(e) {
	let t = [];
	return e.forEach((e, n) => {
		t.push(...n === 0 ? [] : ["\n"], ...ti(e));
	}), t;
}
function ti({ vnode: e, recurseCount: t }) {
	let n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, i = ` at <${Lc(e.component, e.type, r)}`, a = ">" + n;
	return e.props ? [
		i,
		...ni(e.props),
		a
	] : [i + a];
}
function ni(e) {
	let t = [], n = Object.keys(e);
	return n.slice(0, 3).forEach((n) => {
		t.push(...ri(n, e[n]));
	}), n.length > 3 && t.push(" ..."), t;
}
function ri(e, t, n) {
	return N(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : /* @__PURE__ */ V(t) ? (t = ri(e, /* @__PURE__ */ B(t.value), !0), n ? t : [
		`${e}=Ref<`,
		t,
		">"
	]) : M(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = /* @__PURE__ */ B(t), n ? t : [`${e}=`, t]);
}
var ii = {
	sp: "serverPrefetch hook",
	bc: "beforeCreate hook",
	c: "created hook",
	bm: "beforeMount hook",
	m: "mounted hook",
	bu: "beforeUpdate hook",
	u: "updated",
	bum: "beforeUnmount hook",
	um: "unmounted hook",
	a: "activated hook",
	da: "deactivated hook",
	ec: "errorCaptured hook",
	rtc: "renderTracked hook",
	rtg: "renderTriggered hook",
	0: "setup function",
	1: "render function",
	2: "watcher getter",
	3: "watcher callback",
	4: "watcher cleanup function",
	5: "native event handler",
	6: "component event handler",
	7: "vnode hook",
	8: "directive hook",
	9: "transition hook",
	10: "app errorHandler",
	11: "app warnHandler",
	12: "ref function",
	13: "async component loader",
	14: "scheduler flush",
	15: "component update",
	16: "app unmount cleanup function"
};
function ai(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		si(e, t, n);
	}
}
function oi(e, t, n, r) {
	if (M(e)) {
		let i = ai(e, t, n, r);
		return i && ht(i) && i.catch((e) => {
			si(e, t, n);
		}), i;
	}
	if (j(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(oi(e[a], t, n, r));
		return i;
	} else process.env.NODE_ENV !== "production" && U(`Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`);
}
function si(e, t, n, r = !0) {
	let i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || D;
	if (t) {
		let r = t.parent, i = t.proxy, o = process.env.NODE_ENV === "production" ? `https://vuejs.org/error-reference/#runtime-${n}` : ii[n];
		for (; r;) {
			let t = r.ec;
			if (t) {
				for (let n = 0; n < t.length; n++) if (t[n](e, i, o) === !1) return;
			}
			r = r.parent;
		}
		if (a) {
			Tn(), ai(a, null, 10, [
				e,
				i,
				o
			]), En();
			return;
		}
	}
	ci(e, n, i, r, o);
}
function ci(e, t, n, r = !0, i = !1) {
	if (process.env.NODE_ENV !== "production") {
		let i = ii[t];
		if (n && Xr(n), U(`Unhandled error${i ? ` during execution of ${i}` : ""}`), n && Zr(), r) throw e;
		console.error(e);
	} else if (i) throw e;
	else console.error(e);
}
var li = [], di = -1, fi = [], pi = null, mi = 0, hi = /* @__PURE__ */ Promise.resolve(), gi = null, _i = 100;
function vi(e) {
	let t = gi || hi;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function yi(e) {
	let t = di + 1, n = li.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = li[r], a = Ti(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function bi(e) {
	if (!(e.flags & 1)) {
		let t = Ti(e), n = li[li.length - 1];
		!n || !(e.flags & 2) && t >= Ti(n) ? li.push(e) : li.splice(yi(t), 0, e), e.flags |= 1, xi();
	}
}
function xi() {
	gi ||= hi.then(Ei);
}
function Si(e) {
	j(e) ? fi.push(...e) : pi && e.id === -1 ? pi.splice(mi + 1, 0, e) : e.flags & 1 || (fi.push(e), e.flags |= 1), xi();
}
function Ci(e, t, n = di + 1) {
	for (process.env.NODE_ENV !== "production" && (t ||= /* @__PURE__ */ new Map()); n < li.length; n++) {
		let r = li[n];
		if (r && r.flags & 2) {
			if (e && r.id !== e.uid || process.env.NODE_ENV !== "production" && Di(t, r)) continue;
			li.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
		}
	}
}
function wi(e) {
	if (fi.length) {
		let t = [...new Set(fi)].sort((e, t) => Ti(e) - Ti(t));
		if (fi.length = 0, pi) {
			pi.push(...t);
			return;
		}
		for (pi = t, process.env.NODE_ENV !== "production" && (e ||= /* @__PURE__ */ new Map()), mi = 0; mi < pi.length; mi++) {
			let t = pi[mi];
			process.env.NODE_ENV !== "production" && Di(e, t) || (t.flags & 4 && (t.flags &= -2), t.flags & 8 || t(), t.flags &= -2);
		}
		pi = null, mi = 0;
	}
}
var Ti = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function Ei(e) {
	process.env.NODE_ENV !== "production" && (e ||= /* @__PURE__ */ new Map());
	let t = process.env.NODE_ENV === "production" ? O : (t) => Di(e, t);
	try {
		for (di = 0; di < li.length; di++) {
			let e = li[di];
			if (e && !(e.flags & 8)) {
				if (process.env.NODE_ENV !== "production" && t(e)) continue;
				e.flags & 4 && (e.flags &= -2), ai(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2);
			}
		}
	} finally {
		for (; di < li.length; di++) {
			let e = li[di];
			e && (e.flags &= -2);
		}
		di = -1, li.length = 0, wi(e), gi = null, (li.length || fi.length) && Ei(e);
	}
}
function Di(e, t) {
	let n = e.get(t) || 0;
	if (n > _i) {
		let e = t.i, n = e && Ic(e.type);
		return si(`Maximum recursive updates exceeded${n ? ` in component <${n}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`, null, 10), !0;
	}
	return e.set(t, n + 1), !1;
}
var Oi = !1, ki = (e) => {
	try {
		return Oi;
	} finally {
		Oi = e;
	}
}, Ai = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Ft().__VUE_HMR_RUNTIME__ = {
	createRecord: zi(Pi),
	rerender: zi(Ii),
	reload: zi(Li)
});
var ji = /* @__PURE__ */ new Map();
function Mi(e) {
	let t = e.type.__hmrId, n = ji.get(t);
	n ||= (Pi(t, e.type), ji.get(t)), n.instances.add(e);
}
function Ni(e) {
	ji.get(e.type.__hmrId).instances.delete(e);
}
function Pi(e, t) {
	return ji.has(e) ? !1 : (ji.set(e, {
		initialDef: Fi(t),
		instances: /* @__PURE__ */ new Set()
	}), !0);
}
function Fi(e) {
	return Rc(e) ? e.__vccOpts : e;
}
function Ii(e, t) {
	let n = ji.get(e);
	n && (n.initialDef.render = t, [...n.instances].forEach((e) => {
		t && (e.render = t, Fi(e.type).render = t), e.renderCache = [], Oi = !0, e.job.flags & 8 || e.update(), Oi = !1;
	}));
}
function Li(e, t) {
	let n = ji.get(e);
	if (!n) return;
	t = Fi(t), Ri(n.initialDef, t);
	let r = [...n.instances];
	for (let e = 0; e < r.length; e++) {
		let i = r[e], a = Fi(i.type), o = Ai.get(a);
		o || (a !== n.initialDef && Ri(a, t), Ai.set(a, o = /* @__PURE__ */ new Set())), o.add(i), i.appContext.propsCache.delete(i.type), i.appContext.emitsCache.delete(i.type), i.appContext.optionsCache.delete(i.type), i.ceReload ? (o.add(i), i.ceReload(t.styles), o.delete(i)) : i.parent ? bi(() => {
			i.job.flags & 8 || (Oi = !0, i.parent.update(), Oi = !1, o.delete(i));
		}) : i.appContext.reload ? i.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required."), i.root.ce && i !== i.root && i.root.ce._removeChildStyle(a);
	}
	Si(() => {
		Ai.clear();
	});
}
function Ri(e, t) {
	k(e, t);
	for (let n in e) n !== "__file" && !(n in t) && delete e[n];
}
function zi(e) {
	return (t, n) => {
		try {
			return e(t, n);
		} catch (e) {
			console.error(e), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
		}
	};
}
var Bi, Vi = [], Hi = !1;
function Ui(e, ...t) {
	Bi ? Bi.emit(e, ...t) : Hi || Vi.push({
		event: e,
		args: t
	});
}
function Wi(e, t) {
	Bi = e, Bi ? (Bi.enabled = !0, Vi.forEach(({ event: e, args: t }) => Bi.emit(e, ...t)), Vi = []) : typeof window < "u" && window.HTMLElement && !(window.navigator?.userAgent)?.includes("jsdom") ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((e) => {
		Wi(e, t);
	}), setTimeout(() => {
		Bi || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Hi = !0, Vi = []);
	}, 3e3)) : (Hi = !0, Vi = []);
}
function Gi(e, t) {
	Ui("app:init", e, t, {
		Fragment: Ps,
		Text: Fs,
		Comment: Is,
		Static: Ls
	});
}
function Ki(e) {
	Ui("app:unmount", e);
}
var qi = /* @__PURE__ */ Zi("component:added"), Ji = /* @__PURE__ */ Zi("component:updated"), Yi = /* @__PURE__ */ Zi("component:removed"), Xi = (e) => {
	Bi && typeof Bi.cleanupBuffer == "function" && !Bi.cleanupBuffer(e) && Yi(e);
};
// @__NO_SIDE_EFFECTS__
function Zi(e) {
	return (t) => {
		Ui(e, t.appContext.app, t.uid, t.parent ? t.parent.uid : void 0, t);
	};
}
var Qi = /* @__PURE__ */ ea("perf:start"), $i = /* @__PURE__ */ ea("perf:end");
function ea(e) {
	return (t, n, r) => {
		Ui(e, t.appContext.app, t.uid, t, n, r);
	};
}
function ta(e, t, n) {
	Ui("component:emit", e.appContext.app, e, t, n);
}
var W = null, na = null;
function ra(e) {
	let t = W;
	return W = e, na = e && e.type.__scopeId || null, t;
}
function ia(e, t = W, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && Us(-1);
		let i = ra(t), a;
		try {
			a = e(...n);
		} finally {
			ra(i), r._d && Us(1);
		}
		return process.env.NODE_ENV !== "production" && Ji(t), a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function aa(e) {
	St(e) && U("Do not use built-in directive ids as custom directive id: " + e);
}
function oa(e, t) {
	if (W === null) return process.env.NODE_ENV !== "production" && U("withDirectives can only be used inside render functions."), e;
	let n = Nc(W), r = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [i, a, o, s = D] = t[e];
		i && (M(i) && (i = {
			mounted: i,
			updated: i
		}), i.deep && Jr(a), r.push({
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
function sa(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (Tn(), oi(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), En());
	}
}
function ca(e, t) {
	if (process.env.NODE_ENV !== "production" && (!K || K.isMounted) && U("provide() can only be used inside setup()."), K) {
		let n = K.provides, r = K.parent && K.parent.provides;
		r === n && (n = K.provides = Object.create(r)), n[e] = t;
	}
}
function la(e, t, n = !1) {
	let r = mc();
	if (r || Co) {
		let i = Co ? Co._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && M(t) ? t.call(r && r.proxy) : t;
		process.env.NODE_ENV !== "production" && U(`injection "${String(e)}" not found.`);
	} else process.env.NODE_ENV !== "production" && U("inject() can only be used inside setup() or functional components.");
}
function ua() {
	return !!(mc() || Co);
}
var da = /* @__PURE__ */ Symbol.for("v-scx"), fa = () => {
	{
		let e = la(da);
		return e || process.env.NODE_ENV !== "production" && U("Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."), e;
	}
};
function pa(e, t, n) {
	return process.env.NODE_ENV !== "production" && !M(t) && U("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."), ma(e, t, n);
}
function ma(e, t, n = D) {
	let { immediate: r, deep: i, flush: a, once: o } = n;
	process.env.NODE_ENV !== "production" && !t && (r !== void 0 && U("watch() \"immediate\" option is only respected when using the watch(source, callback, options?) signature."), i !== void 0 && U("watch() \"deep\" option is only respected when using the watch(source, callback, options?) signature."), o !== void 0 && U("watch() \"once\" option is only respected when using the watch(source, callback, options?) signature."));
	let s = k({}, n);
	process.env.NODE_ENV !== "production" && (s.onWarn = U);
	let c = t && r || !t && a !== "post", l;
	if (Sc) {
		if (a === "sync") {
			let e = fa();
			l = e.__watcherHandles ||= [];
		} else if (!c) {
			let e = () => {};
			return e.stop = O, e.resume = O, e.pause = O, e;
		}
	}
	let u = K;
	s.call = (e, t, n) => oi(e, u, t, n);
	let d = !1;
	a === "post" ? s.scheduler = (e) => {
		xs(e, u && u.suspense);
	} : a !== "sync" && (d = !0, s.scheduler = (e, t) => {
		t ? e() : bi(e);
	}), s.augmentJob = (e) => {
		t && (e.flags |= 4), d && (e.flags |= 2, u && (e.id = u.uid, e.i = u));
	};
	let f = qr(e, t, s);
	return Sc && (l ? l.push(f) : c && f()), f;
}
function ha(e, t, n) {
	let r = this.proxy, i = N(e) ? e.includes(".") ? ga(r, e) : () => r[e] : e.bind(r, r), a;
	M(t) ? a = t : (a = t.handler, n = t);
	let o = _c(this), s = ma(i, a.bind(r), n);
	return o(), s;
}
function ga(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var _a = /* @__PURE__ */ Symbol("_vte"), va = (e) => e.__isTeleport, ya = /* @__PURE__ */ Symbol("_leaveCb");
function ba(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, ba(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function xa(e, t) {
	return M(e) ? /* @__PURE__ */ k({ name: e.name }, t, { setup: e }) : e;
}
function Sa(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
var Ca = /* @__PURE__ */ new WeakSet();
function wa(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var Ta = /* @__PURE__ */ new WeakMap();
function Ea(e, t, n, r, i = !1) {
	if (j(e)) {
		e.forEach((e, a) => Ea(e, t && (j(t) ? t[a] : t), n, r, i));
		return;
	}
	if (Oa(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Ea(e, t, n, r.component.subTree);
		return;
	}
	let a = r.shapeFlag & 4 ? Nc(r.component) : r.el, o = i ? null : a, { i: s, r: c } = e;
	if (process.env.NODE_ENV !== "production" && !s) {
		U("Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.");
		return;
	}
	let l = t && t.r, u = s.refs === D ? s.refs = {} : s.refs, d = s.setupState, f = /* @__PURE__ */ B(d), p = d === D ? ot : (e) => process.env.NODE_ENV !== "production" && (A(f, e) && !/* @__PURE__ */ V(f[e]) && U(`Template ref "${e}" used on a non-ref value. It will not work in the production build.`), Ca.has(f[e])) || wa(u, e) ? !1 : A(f, e), m = (e, t) => !(process.env.NODE_ENV !== "production" && Ca.has(e) || t && wa(u, t));
	if (l != null && l !== c) {
		if (Da(t), N(l)) u[l] = null, p(l) && (d[l] = null);
		else if (/* @__PURE__ */ V(l)) {
			let e = t;
			m(l, e.k) && (l.value = null), e.k && (u[e.k] = null);
		}
	}
	if (M(c)) ai(c, s, 12, [o, u]);
	else {
		let t = N(c), r = /* @__PURE__ */ V(c);
		if (t || r) {
			let s = () => {
				if (e.f) {
					let n = t ? p(c) ? d[c] : u[c] : m(c) || !e.k ? c.value : u[e.k];
					if (i) j(n) && lt(n, a);
					else if (j(n)) n.includes(a) || n.push(a);
					else if (t) u[c] = [a], p(c) && (d[c] = u[c]);
					else {
						let t = [a];
						m(c, e.k) && (c.value = t), e.k && (u[e.k] = t);
					}
				} else t ? (u[c] = o, p(c) && (d[c] = o)) : r ? (m(c, e.k) && (c.value = o), e.k && (u[e.k] = o)) : process.env.NODE_ENV !== "production" && U("Invalid template ref type:", c, `(${typeof c})`);
			};
			if (o) {
				let t = () => {
					s(), Ta.delete(e);
				};
				t.id = -1, Ta.set(e, t), xs(t, n);
			} else Da(e), s();
		} else process.env.NODE_ENV !== "production" && U("Invalid template ref type:", c, `(${typeof c})`);
	}
}
function Da(e) {
	let t = Ta.get(e);
	t && (t.flags |= 8, Ta.delete(e));
}
Ft().requestIdleCallback, Ft().cancelIdleCallback;
var Oa = (e) => !!e.type.__asyncLoader, ka = (e) => e.type.__isKeepAlive;
function Aa(e, t) {
	Ma(e, "a", t);
}
function ja(e, t) {
	Ma(e, "da", t);
}
function Ma(e, t, n = K) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (Pa(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) ka(e.parent.vnode) && Na(r, t, n, e), e = e.parent;
	}
}
function Na(e, t, n, r) {
	let i = Pa(t, e, r, !0);
	Va(() => {
		lt(r[t], i);
	}, n);
}
function Pa(e, t, n = K, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Tn();
			let i = _c(n), a = oi(t, n, e, r);
			return i(), En(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	} else process.env.NODE_ENV !== "production" && U(`${kt(ii[e].replace(/ hook$/, ""))} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
}
var Fa = (e) => (t, n = K) => {
	(!Sc || e === "sp") && Pa(e, (...e) => t(...e), n);
}, Ia = Fa("bm"), La = Fa("m"), Ra = Fa("bu"), za = Fa("u"), Ba = Fa("bum"), Va = Fa("um"), Ha = Fa("sp"), Ua = Fa("rtg"), Wa = Fa("rtc");
function Ga(e, t = K) {
	Pa("ec", e, t);
}
var Ka = /* @__PURE__ */ Symbol.for("v-ndc");
function qa(e, t, n, r) {
	let i, a = n && n[r], o = j(e);
	if (o || N(e)) {
		let n = o && /* @__PURE__ */ Tr(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ z(e), s = /* @__PURE__ */ Er(e), e = zn(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? Ar(kr(e[n])) : kr(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") if (process.env.NODE_ENV !== "production" && (!Number.isInteger(e) || e < 0)) U(`The v-for range expects a positive integer value but got ${e}.`), i = [];
	else {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	}
	else if (P(e)) if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
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
var Ja = (e) => e ? xc(e) ? Nc(e) : Ja(e.parent) : null, Ya = /* @__PURE__ */ k(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => process.env.NODE_ENV === "production" ? e.props : /* @__PURE__ */ Cr(e.props),
	$attrs: (e) => process.env.NODE_ENV === "production" ? e.attrs : /* @__PURE__ */ Cr(e.attrs),
	$slots: (e) => process.env.NODE_ENV === "production" ? e.slots : /* @__PURE__ */ Cr(e.slots),
	$refs: (e) => process.env.NODE_ENV === "production" ? e.refs : /* @__PURE__ */ Cr(e.refs),
	$parent: (e) => Ja(e.parent),
	$root: (e) => Ja(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => lo(e),
	$forceUpdate: (e) => e.f ||= () => {
		bi(e.update);
	},
	$nextTick: (e) => e.n ||= vi.bind(e.proxy),
	$watch: (e) => ha.bind(e)
}), Xa = (e) => e === "_" || e === "$", Za = (e, t) => e !== D && !e.__isScriptSetup && A(e, t), Qa = {
	get({ _: e }, t) {
		if (t === "__v_skip") return !0;
		let { ctx: n, setupState: r, data: i, props: a, accessCache: o, type: s, appContext: c } = e;
		if (process.env.NODE_ENV !== "production" && t === "__isVue") return !0;
		if (t[0] !== "$") {
			let e = o[t];
			if (e !== void 0) switch (e) {
				case 1: return r[t];
				case 2: return i[t];
				case 4: return n[t];
				case 3: return a[t];
			}
			else if (Za(r, t)) return o[t] = 1, r[t];
			else if (i !== D && A(i, t)) return o[t] = 2, i[t];
			else if (A(a, t)) return o[t] = 3, a[t];
			else if (n !== D && A(n, t)) return o[t] = 4, n[t];
			else io && (o[t] = 0);
		}
		let l = Ya[t], u, d;
		if (l) return t === "$attrs" ? (R(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && Ao()) : process.env.NODE_ENV !== "production" && t === "$slots" && R(e, "get", t), l(e);
		if ((u = s.__cssModules) && (u = u[t])) return u;
		if (n !== D && A(n, t)) return o[t] = 4, n[t];
		if (d = c.config.globalProperties, A(d, t)) return d[t];
		process.env.NODE_ENV !== "production" && W && (!N(t) || t.indexOf("__v") !== 0) && (i !== D && Xa(t[0]) && A(i, t) ? U(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === W && U(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: a } = e;
		return Za(i, t) ? (i[t] = n, !0) : process.env.NODE_ENV !== "production" && i.__isScriptSetup && A(i, t) ? (U(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : r !== D && A(r, t) ? (r[t] = n, !0) : A(e.props, t) ? (process.env.NODE_ENV !== "production" && U(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && U(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(a, t, {
			enumerable: !0,
			configurable: !0,
			value: n
		}) : a[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
		let c;
		return !!(n[s] || e !== D && s[0] !== "$" && A(e, s) || Za(t, s) || A(a, s) || A(r, s) || A(Ya, s) || A(i.config.globalProperties, s) || (c = o.__cssModules) && c[s]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? A(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
process.env.NODE_ENV !== "production" && (Qa.ownKeys = (e) => (U("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function $a(e) {
	let t = {};
	return Object.defineProperty(t, "_", {
		configurable: !0,
		enumerable: !1,
		get: () => e
	}), Object.keys(Ya).forEach((n) => {
		Object.defineProperty(t, n, {
			configurable: !0,
			enumerable: !1,
			get: () => Ya[n](e),
			set: O
		});
	}), t;
}
function eo(e) {
	let { ctx: t, propsOptions: [n] } = e;
	n && Object.keys(n).forEach((n) => {
		Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => e.props[n],
			set: O
		});
	});
}
function to(e) {
	let { ctx: t, setupState: n } = e;
	Object.keys(/* @__PURE__ */ B(n)).forEach((e) => {
		if (!n.__isScriptSetup) {
			if (Xa(e[0])) {
				U(`setup() return property ${JSON.stringify(e)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
				return;
			}
			Object.defineProperty(t, e, {
				enumerable: !0,
				configurable: !0,
				get: () => n[e],
				set: O
			});
		}
	});
}
function no(e) {
	return j(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
function ro() {
	let e = /* @__PURE__ */ Object.create(null);
	return (t, n) => {
		e[n] ? U(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
	};
}
var io = !0;
function ao(e) {
	let t = lo(e), n = e.proxy, r = e.ctx;
	io = !1, t.beforeCreate && so(t.beforeCreate, e, "bc");
	let { data: i, computed: a, methods: o, watch: s, provide: c, inject: l, created: u, beforeMount: d, mounted: f, beforeUpdate: p, updated: m, activated: h, deactivated: g, beforeDestroy: _, beforeUnmount: v, destroyed: y, unmounted: b, render: x, renderTracked: ee, renderTriggered: S, errorCaptured: C, serverPrefetch: te, expose: ne, inheritAttrs: w, components: re, directives: ie, filters: ae } = t, T = process.env.NODE_ENV === "production" ? null : ro();
	if (process.env.NODE_ENV !== "production") {
		let [t] = e.propsOptions;
		if (t) for (let e in t) T("Props", e);
	}
	if (l && oo(l, r, T), o) for (let e in o) {
		let t = o[e];
		M(t) ? (process.env.NODE_ENV === "production" ? r[e] = t.bind(n) : Object.defineProperty(r, e, {
			value: t.bind(n),
			configurable: !0,
			enumerable: !0,
			writable: !0
		}), process.env.NODE_ENV !== "production" && T("Methods", e)) : process.env.NODE_ENV !== "production" && U(`Method "${e}" has type "${typeof t}" in the component definition. Did you reference the function correctly?`);
	}
	if (i) {
		process.env.NODE_ENV !== "production" && !M(i) && U("The data option must be a function. Plain object usage is no longer supported.");
		let t = i.call(n, n);
		if (process.env.NODE_ENV !== "production" && ht(t) && U("data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."), !P(t)) process.env.NODE_ENV !== "production" && U("data() should return an object.");
		else if (e.data = /* @__PURE__ */ br(t), process.env.NODE_ENV !== "production") for (let e in t) T("Data", e), Xa(e[0]) || Object.defineProperty(r, e, {
			configurable: !0,
			enumerable: !0,
			get: () => t[e],
			set: O
		});
	}
	if (io = !0, a) for (let e in a) {
		let t = a[e], i = M(t) ? t.bind(n, n) : M(t.get) ? t.get.bind(n, n) : O;
		process.env.NODE_ENV !== "production" && i === O && U(`Computed property "${e}" has no getter.`);
		let o = zc({
			get: i,
			set: !M(t) && M(t.set) ? t.set.bind(n) : process.env.NODE_ENV === "production" ? O : () => {
				U(`Write operation failed: computed property "${e}" is readonly.`);
			}
		});
		Object.defineProperty(r, e, {
			enumerable: !0,
			configurable: !0,
			get: () => o.value,
			set: (e) => o.value = e
		}), process.env.NODE_ENV !== "production" && T("Computed", e);
	}
	if (s) for (let e in s) co(s[e], r, n, e);
	if (c) {
		let e = M(c) ? c.call(n) : c;
		Reflect.ownKeys(e).forEach((t) => {
			ca(t, e[t]);
		});
	}
	u && so(u, e, "c");
	function oe(e, t) {
		j(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (oe(Ia, d), oe(La, f), oe(Ra, p), oe(za, m), oe(Aa, h), oe(ja, g), oe(Ga, C), oe(Wa, ee), oe(Ua, S), oe(Ba, v), oe(Va, b), oe(Ha, te), j(ne)) if (ne.length) {
		let t = e.exposed ||= {};
		ne.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	x && e.render === O && (e.render = x), w != null && (e.inheritAttrs = w), re && (e.components = re), ie && (e.directives = ie), te && Sa(e);
}
function oo(e, t, n = O) {
	j(e) && (e = ho(e));
	for (let r in e) {
		let i = e[r], a;
		a = P(i) ? "default" in i ? la(i.from || r, i.default, !0) : la(i.from || r) : la(i), /* @__PURE__ */ V(a) ? Object.defineProperty(t, r, {
			enumerable: !0,
			configurable: !0,
			get: () => a.value,
			set: (e) => a.value = e
		}) : t[r] = a, process.env.NODE_ENV !== "production" && n("Inject", r);
	}
}
function so(e, t, n) {
	oi(j(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function co(e, t, n, r) {
	let i = r.includes(".") ? ga(n, r) : () => n[r];
	if (N(e)) {
		let n = t[e];
		M(n) ? pa(i, n) : process.env.NODE_ENV !== "production" && U(`Invalid watch handler specified by key "${e}"`, n);
	} else if (M(e)) pa(i, e.bind(n));
	else if (P(e)) if (j(e)) e.forEach((e) => co(e, t, n, r));
	else {
		let r = M(e.handler) ? e.handler.bind(n) : t[e.handler];
		M(r) ? pa(i, r, e) : process.env.NODE_ENV !== "production" && U(`Invalid watch handler specified by key "${e.handler}"`, r);
	}
	else process.env.NODE_ENV !== "production" && U(`Invalid watch option: "${r}"`, e);
}
function lo(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => uo(c, e, o, !0)), uo(c, t, o)), P(t) && a.set(t, c), c;
}
function uo(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && uo(e, a, n, !0), i && i.forEach((t) => uo(e, t, n, !0));
	for (let i in t) if (r && i === "expose") process.env.NODE_ENV !== "production" && U("\"expose\" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.");
	else {
		let r = fo[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var fo = {
	data: po,
	props: vo,
	emits: vo,
	methods: _o,
	computed: _o,
	beforeCreate: go,
	created: go,
	beforeMount: go,
	mounted: go,
	beforeUpdate: go,
	updated: go,
	beforeDestroy: go,
	beforeUnmount: go,
	destroyed: go,
	unmounted: go,
	activated: go,
	deactivated: go,
	errorCaptured: go,
	serverPrefetch: go,
	components: _o,
	directives: _o,
	watch: yo,
	provide: po,
	inject: mo
};
function po(e, t) {
	return t ? e ? function() {
		return k(M(e) ? e.call(this, this) : e, M(t) ? t.call(this, this) : t);
	} : t : e;
}
function mo(e, t) {
	return _o(ho(e), ho(t));
}
function ho(e) {
	if (j(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function go(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function _o(e, t) {
	return e ? k(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function vo(e, t) {
	return e ? j(e) && j(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : k(/* @__PURE__ */ Object.create(null), no(e), no(t ?? {})) : t;
}
function yo(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = k(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = go(e[r], t[r]);
	return n;
}
function bo() {
	return {
		app: null,
		config: {
			isNativeTag: ot,
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
var xo = 0;
function So(e, t) {
	return function(n, r = null) {
		M(n) || (n = k({}, n)), r != null && !P(r) && (process.env.NODE_ENV !== "production" && U("root props passed to app.mount() must be an object."), r = null);
		let i = bo(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: xo++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Vc,
			get config() {
				return i.config;
			},
			set config(e) {
				process.env.NODE_ENV !== "production" && U("app.config cannot be replaced. Modify individual options instead.");
			},
			use(e, ...t) {
				return a.has(e) ? process.env.NODE_ENV !== "production" && U("Plugin has already been applied to target app.") : e && M(e.install) ? (a.add(e), e.install(c, ...t)) : M(e) ? (a.add(e), e(c, ...t)) : process.env.NODE_ENV !== "production" && U("A plugin must either be a function or an object with an \"install\" function."), c;
			},
			mixin(e) {
				return i.mixins.includes(e) ? process.env.NODE_ENV !== "production" && U("Mixin has already been applied to target app" + (e.name ? `: ${e.name}` : "")) : i.mixins.push(e), c;
			},
			component(e, t) {
				return process.env.NODE_ENV !== "production" && bc(e, i.config), t ? (process.env.NODE_ENV !== "production" && i.components[e] && U(`Component "${e}" has already been registered in target app.`), i.components[e] = t, c) : i.components[e];
			},
			directive(e, t) {
				return process.env.NODE_ENV !== "production" && aa(e), t ? (process.env.NODE_ENV !== "production" && i.directives[e] && U(`Directive "${e}" has already been registered in target app.`), i.directives[e] = t, c) : i.directives[e];
			},
			mount(a, o, l) {
				if (s) process.env.NODE_ENV !== "production" && U("App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`");
				else {
					process.env.NODE_ENV !== "production" && a.__vue_app__ && U("There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first.");
					let u = c._ceVNode || $s(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), process.env.NODE_ENV !== "production" && (i.reload = () => {
						let t = nc(u);
						t.el = null, e(t, a, l);
					}), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, process.env.NODE_ENV !== "production" && (c._instance = u.component, Gi(c, Vc)), Nc(u.component);
				}
			},
			onUnmount(e) {
				process.env.NODE_ENV !== "production" && typeof e != "function" && U(`Expected function as first argument to app.onUnmount(), but got ${typeof e}`), o.push(e);
			},
			unmount() {
				s ? (oi(o, c._instance, 16), e(null, c._container), process.env.NODE_ENV !== "production" && (c._instance = null, Ki(c)), delete c._container.__vue_app__) : process.env.NODE_ENV !== "production" && U("Cannot unmount an app that is not mounted.");
			},
			provide(e, t) {
				return process.env.NODE_ENV !== "production" && e in i.provides && (A(i.provides, e) ? U(`App already provides property with key "${String(e)}". It will be overwritten with the new value.`) : U(`App already provides property with key "${String(e)}" inherited from its parent element. It will be overwritten with the new value.`)), i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = Co;
				Co = c;
				try {
					return e();
				} finally {
					Co = t;
				}
			}
		};
		return c;
	};
}
var Co = null, wo = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Tt(t)}Modifiers`] || e[`${Dt(t)}Modifiers`];
function To(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || D;
	if (process.env.NODE_ENV !== "production") {
		let { emitsOptions: r, propsOptions: [i] } = e;
		if (r) if (!(t in r)) (!i || !(kt(Tt(t)) in i)) && U(`Component emitted event "${t}" but it is neither declared in the emits option nor as an "${kt(Tt(t))}" prop.`);
		else {
			let e = r[t];
			M(e) && (e(...n) || U(`Invalid event arguments: event validation failed for event "${t}".`));
		}
	}
	let i = n, a = t.startsWith("update:"), o = a && wo(r, t.slice(7));
	if (o && (o.trim && (i = n.map((e) => N(e) ? e.trim() : e)), o.number && (i = n.map(Nt))), process.env.NODE_ENV !== "production" && ta(e, t, i), process.env.NODE_ENV !== "production") {
		let n = t.toLowerCase();
		n !== t && r[kt(n)] && U(`Event "${n}" is emitted in component ${Lc(e, e.type)} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${Dt(t)}" instead of "${t}".`);
	}
	let s, c = r[s = kt(t)] || r[s = kt(Tt(t))];
	!c && a && (c = r[s = kt(Dt(t))]), c && oi(c, e, 6, i);
	let l = r[s + "Once"];
	if (l) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		e.emitted[s] = !0, oi(l, e, 6, i);
	}
}
var Eo = /* @__PURE__ */ new WeakMap();
function Do(e, t, n = !1) {
	let r = n ? Eo : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, s = !1;
	if (!M(e)) {
		let r = (e) => {
			let n = Do(e, t, !0);
			n && (s = !0, k(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !s ? (P(e) && r.set(e, null), null) : (j(a) ? a.forEach((e) => o[e] = null) : k(o, a), P(e) && r.set(e, o), o);
}
function Oo(e, t) {
	return !e || !st(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), A(e, t[0].toLowerCase() + t.slice(1)) || A(e, Dt(t)) || A(e, t));
}
var ko = !1;
function Ao() {
	ko = !0;
}
function jo(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: l, renderCache: u, props: d, data: f, setupState: p, ctx: m, inheritAttrs: h } = e, g = ra(e), _, v;
	process.env.NODE_ENV !== "production" && (ko = !1);
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = process.env.NODE_ENV !== "production" && p.__isScriptSetup ? new Proxy(e, { get(e, t, n) {
				return U(`Property '${String(t)}' was accessed via 'this'. Avoid using 'this' in templates.`), Reflect.get(e, t, n);
			} }) : e;
			_ = oc(l.call(t, e, u, process.env.NODE_ENV === "production" ? d : /* @__PURE__ */ Cr(d), p, f, m)), v = s;
		} else {
			let e = t;
			process.env.NODE_ENV !== "production" && s === d && Ao(), _ = oc(e.length > 1 ? e(process.env.NODE_ENV === "production" ? d : /* @__PURE__ */ Cr(d), process.env.NODE_ENV === "production" ? {
				attrs: s,
				slots: o,
				emit: c
			} : {
				get attrs() {
					return Ao(), /* @__PURE__ */ Cr(s);
				},
				slots: o,
				emit: c
			}) : e(process.env.NODE_ENV === "production" ? d : /* @__PURE__ */ Cr(d), null)), v = t.props ? s : Po(s);
		}
	} catch (t) {
		Rs.length = 0, si(t, e, 1), _ = $s(Is);
	}
	let y = _, b;
	if (process.env.NODE_ENV !== "production" && _.patchFlag > 0 && _.patchFlag & 2048 && ([y, b] = Mo(_)), v && h !== !1) {
		let e = Object.keys(v), { shapeFlag: t } = y;
		if (e.length) {
			if (t & 7) a && e.some(ct) && (v = Fo(v, a)), y = nc(y, v, !1, !0);
			else if (process.env.NODE_ENV !== "production" && !ko && y.type !== Is) {
				let e = Object.keys(s), t = [], n = [];
				for (let r = 0, i = e.length; r < i; r++) {
					let i = e[r];
					st(i) ? ct(i) || t.push(i[2].toLowerCase() + i.slice(3)) : n.push(i);
				}
				n.length && U(`Extraneous non-props attributes (${n.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`), t.length && U(`Extraneous non-emits event listeners (${t.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
			}
		}
	}
	return n.dirs && (process.env.NODE_ENV !== "production" && !Io(y) && U("Runtime directive used on component with non-element root node. The directives will not function as intended."), y = nc(y, null, !1, !0), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !Io(y) && U("Component inside <Transition> renders non-element root node that cannot be animated."), ba(y, n.transition)), process.env.NODE_ENV !== "production" && b ? b(y) : _ = y, ra(g), _;
}
var Mo = (e) => {
	let t = e.children, n = e.dynamicChildren, r = No(t, !1);
	if (!r) return [e, void 0];
	if (process.env.NODE_ENV !== "production" && r.patchFlag > 0 && r.patchFlag & 2048) return Mo(r);
	let i = t.indexOf(r), a = n ? n.indexOf(r) : -1;
	return [oc(r), (r) => {
		t[i] = r, n && (a > -1 ? n[a] = r : r.patchFlag > 0 && (e.dynamicChildren = [...n, r]));
	}];
};
function No(e, t = !0) {
	let n;
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (qs(i)) {
			if (i.type !== Is || i.children === "v-if") {
				if (n) return;
				if (n = i, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048) return No(n.children);
			}
		} else return;
	}
	return n;
}
var Po = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || st(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, Fo = (e, t) => {
	let n = {};
	for (let r in e) (!ct(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
}, Io = (e) => e.shapeFlag & 7 || e.type === Is;
function Lo(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (process.env.NODE_ENV !== "production" && (i || s) && Oi || t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? Ro(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (zo(o, r, n) && !Oo(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? Ro(r, o, l) : !0 : !!o;
	return !1;
}
function Ro(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (zo(t, e, a) && !Oo(n, a)) return !0;
	}
	return !1;
}
function zo(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && P(r) && P(i) ? !Qt(r, i) : r !== i;
}
function Bo({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var Vo = {}, Ho = () => Object.create(Vo), Uo = (e) => Object.getPrototypeOf(e) === Vo;
function Wo(e, t, n, r = !1) {
	let i = {}, a = Ho();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), qo(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	process.env.NODE_ENV !== "production" && $o(t || {}, i, e), n ? e.props = r ? i : /* @__PURE__ */ xr(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function Go(e) {
	for (; e;) {
		if (e.type.__hmrId) return !0;
		e = e.parent;
	}
}
function Ko(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ B(i), [c] = e.propsOptions, l = !1;
	if (!(process.env.NODE_ENV !== "production" && Go(e)) && (r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (Oo(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) if (A(a, o)) u !== a[o] && (a[o] = u, l = !0);
				else {
					let t = Tt(o);
					i[t] = Jo(c, s, t, u, e, !1);
				}
				else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		qo(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !A(t, a) && ((r = Dt(a)) === a || !A(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = Jo(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !A(t, e)) && (delete a[e], l = !0);
	}
	l && In(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && $o(t || {}, i, e);
}
function qo(e, t, n, r) {
	let [i, a] = e.propsOptions, o = !1, s;
	if (t) for (let c in t) {
		if (xt(c)) continue;
		let l = t[c], u;
		i && A(i, u = Tt(c)) ? !a || !a.includes(u) ? n[u] = l : (s ||= {})[u] = l : Oo(e.emitsOptions, c) || (!(c in r) || l !== r[c]) && (r[c] = l, o = !0);
	}
	if (a) {
		let t = /* @__PURE__ */ B(n), r = s || D;
		for (let o = 0; o < a.length; o++) {
			let s = a[o];
			n[s] = Jo(i, t, s, r[s], e, !A(r, s));
		}
	}
	return o;
}
function Jo(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = A(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && M(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = _c(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === Dt(n)) && (r = !0));
	}
	return r;
}
var Yo = /* @__PURE__ */ new WeakMap();
function Xo(e, t, n = !1) {
	let r = n ? Yo : t.propsCache, i = r.get(e);
	if (i) return i;
	let a = e.props, o = {}, s = [], c = !1;
	if (!M(e)) {
		let r = (e) => {
			c = !0;
			let [n, r] = Xo(e, t, !0);
			k(o, n), r && s.push(...r);
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	if (!a && !c) return P(e) && r.set(e, at), at;
	if (j(a)) for (let e = 0; e < a.length; e++) {
		process.env.NODE_ENV !== "production" && !N(a[e]) && U("props must be strings when using array syntax.", a[e]);
		let t = Tt(a[e]);
		Zo(t) && (o[t] = D);
	}
	else if (a) {
		process.env.NODE_ENV !== "production" && !P(a) && U("invalid props options", a);
		for (let e in a) {
			let t = Tt(e);
			if (Zo(t)) {
				let n = a[e], r = o[t] = j(n) || M(n) ? { type: n } : k({}, n), i = r.type, c = !1, l = !0;
				if (j(i)) for (let e = 0; e < i.length; ++e) {
					let t = i[e], n = M(t) && t.name;
					if (n === "Boolean") {
						c = !0;
						break;
					} else n === "String" && (l = !1);
				}
				else c = M(i) && i.name === "Boolean";
				r[0] = c, r[1] = l, (c || A(r, "default")) && s.push(t);
			}
		}
	}
	let l = [o, s];
	return P(e) && r.set(e, l), l;
}
function Zo(e) {
	return e[0] !== "$" && !xt(e) ? !0 : (process.env.NODE_ENV !== "production" && U(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Qo(e) {
	return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function $o(e, t, n) {
	let r = /* @__PURE__ */ B(t), i = n.propsOptions[0], a = Object.keys(e).map((e) => Tt(e));
	for (let e in i) {
		let t = i[e];
		t != null && es(e, r[e], t, process.env.NODE_ENV === "production" ? r : /* @__PURE__ */ Cr(r), !a.includes(e));
	}
}
function es(e, t, n, r, i) {
	let { type: a, required: o, validator: s, skipCheck: c } = n;
	if (o && i) {
		U("Missing required prop: \"" + e + "\"");
		return;
	}
	if (!(t == null && !o)) {
		if (a != null && a !== !0 && !c) {
			let n = !1, r = j(a) ? a : [a], i = [];
			for (let e = 0; e < r.length && !n; e++) {
				let { valid: a, expectedType: o } = ns(t, r[e]);
				i.push(o || ""), n = a;
			}
			if (!n) {
				U(rs(e, t, i));
				return;
			}
		}
		s && !s(t, r) && U("Invalid prop: custom validator check failed for prop \"" + e + "\".");
	}
}
var ts = /* @__PURE__ */ it("String,Number,Boolean,Function,Symbol,BigInt");
function ns(e, t) {
	let n, r = Qo(t);
	if (r === "null") n = e === null;
	else if (ts(r)) {
		let i = typeof e;
		n = i === r.toLowerCase(), !n && i === "object" && (n = e instanceof t);
	} else n = r === "Object" ? P(e) : r === "Array" ? j(e) : e instanceof t;
	return {
		valid: n,
		expectedType: r
	};
}
function rs(e, t, n) {
	if (n.length === 0) return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
	let r = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(Ot).join(" | ")}`, i = n[0], a = vt(t), o = is(t, i), s = is(t, a);
	return n.length === 1 && as(i) && os(i, a) && (r += ` with value ${o}`), r += `, got ${a} `, as(a) && (r += `with value ${s}.`), r;
}
function is(e, t) {
	return mt(e) ? e.toString() : t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function as(e) {
	return [
		"string",
		"number",
		"boolean"
	].some((t) => e.toLowerCase() === t);
}
function os(...e) {
	return e.every((e) => {
		let t = e.toLowerCase();
		return t !== "boolean" && t !== "symbol";
	});
}
var ss = (e) => e === "_" || e === "_ctx" || e === "$stable", cs = (e) => j(e) ? e.map(oc) : [oc(e)], ls = (e, t, n) => {
	if (t._n) return t;
	let r = ia((...r) => (process.env.NODE_ENV !== "production" && K && !(n === null && W) && !(n && n.root !== K.root) && U(`Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`), cs(t(...r))), n);
	return r._c = !1, r;
}, us = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (ss(n)) continue;
		let i = e[n];
		if (M(i)) t[n] = ls(n, i, r);
		else if (i != null) {
			process.env.NODE_ENV !== "production" && U(`Non-function value encountered for slot "${n}". Prefer function slots for better performance.`);
			let e = cs(i);
			t[n] = () => e;
		}
	}
}, ds = (e, t) => {
	process.env.NODE_ENV !== "production" && !ka(e.vnode) && U("Non-function value encountered for default slot. Prefer function slots for better performance.");
	let n = cs(t);
	e.slots.default = () => n;
}, fs = (e, t, n) => {
	for (let r in t) (n || !ss(r)) && (e[r] = t[r]);
}, ps = (e, t, n) => {
	let r = e.slots = Ho();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (fs(r, t, n), n && Mt(r, "_", e, !0)) : us(t, r);
	} else t && ds(e, t);
}, ms = (e, t, n) => {
	let { vnode: r, slots: i } = e, a = !0, o = D;
	if (r.shapeFlag & 32) {
		let r = t._;
		r ? process.env.NODE_ENV !== "production" && Oi ? (fs(i, t, n), In(e, "set", "$slots")) : n && r === 1 ? a = !1 : fs(i, t, n) : (a = !t.$stable, us(t, i)), o = t;
	} else t && (ds(e, t), o = { default: 1 });
	if (a) for (let e in i) !ss(e) && o[e] == null && delete i[e];
}, hs, gs;
function _s(e, t) {
	e.appContext.config.performance && ys() && gs.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && Qi(e, t, ys() ? gs.now() : Date.now());
}
function vs(e, t) {
	if (e.appContext.config.performance && ys()) {
		let n = `vue-${t}-${e.uid}`, r = n + ":end", i = `<${Lc(e, e.type)}> ${t}`;
		gs.mark(r), gs.measure(i, n, r), gs.clearMeasures(i), gs.clearMarks(n), gs.clearMarks(r);
	}
	process.env.NODE_ENV !== "production" && $i(e, t, ys() ? gs.now() : Date.now());
}
function ys() {
	return hs === void 0 && (typeof window < "u" && window.performance ? (hs = !0, gs = window.performance) : hs = !1), hs;
}
function bs() {
	let e = [];
	if (process.env.NODE_ENV !== "production" && e.length) {
		let t = e.length > 1;
		console.warn(`Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
	}
}
var xs = Ns;
function Ss(e) {
	return Cs(e);
}
function Cs(e, t) {
	bs();
	let n = Ft();
	n.__VUE__ = !0, process.env.NODE_ENV !== "production" && Wi(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
	let { insert: r, remove: i, patchProp: a, createElement: o, createText: s, createComment: c, setText: l, setElementText: u, parentNode: d, nextSibling: f, setScopeId: p = O, insertStaticContent: m } = e, h = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = process.env.NODE_ENV !== "production" && Oi ? !1 : !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Js(e, t) && (r = ve(e), pe(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Fs:
				g(e, t, n, r);
				break;
			case Is:
				_(e, t, n, r);
				break;
			case Ls:
				e == null ? v(t, n, r, o) : process.env.NODE_ENV !== "production" && y(e, t, n, o);
				break;
			case Ps:
				ie(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? ee(e, t, n, r, i, a, o, s, c) : d & 6 ? ae(e, t, n, r, i, a, o, s, c) : d & 64 || d & 128 ? l.process(e, t, n, r, i, a, o, s, c, xe) : process.env.NODE_ENV !== "production" && U("Invalid VNode type:", l, `(${typeof l})`);
		}
		u != null && i ? Ea(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && Ea(e.ref, null, a, e, !0);
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
	}, y = (e, t, n, r) => {
		if (t.children !== e.children) {
			let i = f(e.anchor);
			x(e), [t.el, t.anchor] = m(t.children, n, i, r);
		} else t.el = e.el, t.anchor = e.anchor;
	}, b = ({ el: e, anchor: t }, n, i) => {
		let a;
		for (; e && e !== t;) a = f(e), r(e, n, i), e = a;
		r(t, n, i);
	}, x = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, ee = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) S(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), ne(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, S = (e, t, n, i, s, c, l, d) => {
		let f, p, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (f = e.el = o(e.type, c, m && m.is, m), h & 8 ? u(f, e.children) : h & 16 && te(e.children, f, null, i, s, ws(e, c), l, d), _ && sa(e, null, i, "created"), C(f, e, e.scopeId, l, i), m) {
			for (let e in m) e !== "value" && !xt(e) && a(f, e, null, m[e], c, i);
			"value" in m && a(f, "value", null, m.value, c), (p = m.onVnodeBeforeMount) && uc(p, i, e);
		}
		process.env.NODE_ENV !== "production" && (Mt(f, "__vnode", e, !0), Mt(f, "__vueParentComponent", i, !0)), _ && sa(e, null, i, "beforeMount");
		let v = Es(s, g);
		if (v && g.beforeEnter(f), r(f, t, n), (p = m && m.onVnodeMounted) || v || _) {
			let t = process.env.NODE_ENV !== "production" && Oi;
			xs(() => {
				let n;
				process.env.NODE_ENV !== "production" && (n = ki(t));
				try {
					p && uc(p, i, e), v && g.enter(f), _ && sa(e, null, i, "mounted");
				} finally {
					process.env.NODE_ENV !== "production" && ki(n);
				}
			}, s);
		}
	}, C = (e, t, n, r, i) => {
		if (n && p(e, n), r) for (let t = 0; t < r.length; t++) p(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (process.env.NODE_ENV !== "production" && n.patchFlag > 0 && n.patchFlag & 2048 && (n = No(n.children) || n), t === n || Ms(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				C(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, te = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) h(null, e[l] = s ? sc(e[l]) : oc(e[l]), t, n, r, i, a, o, s);
	}, ne = (e, t, n, r, i, o, s) => {
		let c = t.el = e.el;
		process.env.NODE_ENV !== "production" && (c.__vnode = t);
		let { patchFlag: l, dynamicChildren: d, dirs: f } = t;
		l |= e.patchFlag & 16;
		let p = e.props || D, m = t.props || D, h;
		if (n && Ts(n, !1), (h = m.onVnodeBeforeUpdate) && uc(h, n, t, e), f && sa(t, e, n, "beforeUpdate"), n && Ts(n, !0), process.env.NODE_ENV !== "production" && Oi && (l = 0, s = !1, d = null), (p.innerHTML && m.innerHTML == null || p.textContent && m.textContent == null) && u(c, ""), d ? (w(e.dynamicChildren, d, c, n, r, ws(t, i), o), process.env.NODE_ENV !== "production" && Ds(e, t)) : s || le(e, t, c, null, n, r, ws(t, i), o, !1), l > 0) {
			if (l & 16) re(c, p, m, n, i);
			else if (l & 2 && p.class !== m.class && a(c, "class", null, m.class, i), l & 4 && a(c, "style", p.style, m.style, i), l & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], o = p[r], s = m[r];
					(s !== o || r === "value") && a(c, r, o, s, i, n);
				}
			}
			l & 1 && e.children !== t.children && u(c, t.children);
		} else !s && d == null && re(c, p, m, n, i);
		((h = m.onVnodeUpdated) || f) && xs(() => {
			h && uc(h, n, t, e), f && sa(t, e, n, "updated");
		}, r);
	}, w = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			h(c, l, c.el && (c.type === Ps || !Js(c, l) || c.shapeFlag & 198) ? d(c.el) : n, null, r, i, a, o, !0);
		}
	}, re = (e, t, n, r, i) => {
		if (t !== n) {
			if (t !== D) for (let o in t) !xt(o) && !(o in n) && a(e, o, t[o], null, i, r);
			for (let o in n) {
				if (xt(o)) continue;
				let s = n[o], c = t[o];
				s !== c && o !== "value" && a(e, o, c, s, i, r);
			}
			"value" in n && a(e, "value", t.value, n.value, i);
		}
	}, ie = (e, t, n, i, a, o, c, l, u) => {
		let d = t.el = e ? e.el : s(""), f = t.anchor = e ? e.anchor : s(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		process.env.NODE_ENV !== "production" && (Oi || p & 2048) && (p = 0, u = !1, m = null), h && (l = l ? l.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), te(t.children || [], n, f, a, o, c, l, u)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (w(e.dynamicChildren, m, n, a, o, c, l), process.env.NODE_ENV === "production" ? (t.key != null || a && t === a.subTree) && Ds(e, t, !0) : Ds(e, t)) : le(e, t, n, f, a, o, c, l, u);
	}, ae = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : T(t, n, r, i, a, o, c) : oe(e, t, c);
	}, T = (e, t, n, r, i, a, o) => {
		let s = e.component = pc(e, r, i);
		if (process.env.NODE_ENV !== "production" && s.type.__hmrId && Mi(s), process.env.NODE_ENV !== "production" && (Xr(e), _s(s, "mount")), ka(e) && (s.ctx.renderer = xe), process.env.NODE_ENV !== "production" && _s(s, "init"), Cc(s, !1, o), process.env.NODE_ENV !== "production" && vs(s, "init"), process.env.NODE_ENV !== "production" && Oi && (e.el = null), s.asyncDep) {
			if (i && i.registerDep(s, se, o), !e.el) {
				let r = s.subTree = $s(Is);
				_(null, r, t, n), e.placeholder = r.el;
			}
		} else se(s, e, t, n, i, a, o);
		process.env.NODE_ENV !== "production" && (Zr(), vs(s, "mount"));
	}, oe = (e, t, n) => {
		let r = t.component = e.component;
		if (Lo(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			process.env.NODE_ENV !== "production" && Xr(t), ce(r, t, n), process.env.NODE_ENV !== "production" && Zr();
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, se = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = ks(e);
					if (n) {
						t && (t.el = c.el, ce(e, t, o)), n.asyncDep.then(() => {
							xs(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, f;
				process.env.NODE_ENV !== "production" && Xr(t || e.vnode), Ts(e, !1), t ? (t.el = c.el, ce(e, t, o)) : t = c, n && jt(n), (f = t.props && t.props.onVnodeBeforeUpdate) && uc(f, s, t, c), Ts(e, !0), process.env.NODE_ENV !== "production" && _s(e, "render");
				let p = jo(e);
				process.env.NODE_ENV !== "production" && vs(e, "render");
				let m = e.subTree;
				e.subTree = p, process.env.NODE_ENV !== "production" && _s(e, "patch"), h(m, p, d(m.el), ve(m), e, i, a), process.env.NODE_ENV !== "production" && vs(e, "patch"), t.el = p.el, u === null && Bo(e, p.el), r && xs(r, i), (f = t.props && t.props.onVnodeUpdated) && xs(() => uc(f, s, t, c), i), process.env.NODE_ENV !== "production" && Ji(e), process.env.NODE_ENV !== "production" && Zr();
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = Oa(t);
				if (Ts(e, !1), l && jt(l), !m && (o = c && c.onVnodeBeforeMount) && uc(o, d, t), Ts(e, !0), s && Ce) {
					let t = () => {
						process.env.NODE_ENV !== "production" && _s(e, "render"), e.subTree = jo(e), process.env.NODE_ENV !== "production" && vs(e, "render"), process.env.NODE_ENV !== "production" && _s(e, "hydrate"), Ce(s, e.subTree, e, i, null), process.env.NODE_ENV !== "production" && vs(e, "hydrate");
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0), process.env.NODE_ENV !== "production" && _s(e, "render");
					let o = e.subTree = jo(e);
					process.env.NODE_ENV !== "production" && vs(e, "render"), process.env.NODE_ENV !== "production" && _s(e, "patch"), h(null, o, n, r, e, i, a), process.env.NODE_ENV !== "production" && vs(e, "patch"), t.el = o.el;
				}
				if (u && xs(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					xs(() => uc(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && Oa(d.vnode) && d.vnode.shapeFlag & 256) && e.a && xs(e.a, i), e.isMounted = !0, process.env.NODE_ENV !== "production" && qi(e), t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new un(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => bi(u), Ts(e, !0), process.env.NODE_ENV !== "production" && (c.onTrack = e.rtc ? (t) => jt(e.rtc, t) : void 0, c.onTrigger = e.rtg ? (t) => jt(e.rtg, t) : void 0), l();
	}, ce = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, Ko(e, t.props, r, n), ms(e, t.children, n), Tn(), Ci(e), En();
	}, le = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, d = e ? e.shapeFlag : 0, f = t.children, { patchFlag: p, shapeFlag: m } = t;
		if (p > 0) {
			if (p & 128) {
				de(l, f, n, r, i, a, o, s, c);
				return;
			} else if (p & 256) {
				ue(l, f, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (d & 16 && _e(l, i, a), f !== l && u(n, f)) : d & 16 ? m & 16 ? de(l, f, n, r, i, a, o, s, c) : _e(l, i, a, !0) : (d & 8 && u(n, ""), m & 16 && te(f, n, r, i, a, o, s, c));
	}, ue = (e, t, n, r, i, a, o, s, c) => {
		e ||= at, t ||= at;
		let l = e.length, u = t.length, d = Math.min(l, u), f;
		for (f = 0; f < d; f++) {
			let r = t[f] = c ? sc(t[f]) : oc(t[f]);
			h(e[f], r, n, null, i, a, o, s, c);
		}
		l > u ? _e(e, i, a, !0, !1, d) : te(t, n, r, i, a, o, s, c, d);
	}, de = (e, t, n, r, i, a, o, s, c) => {
		let l = 0, u = t.length, d = e.length - 1, f = u - 1;
		for (; l <= d && l <= f;) {
			let r = e[l], u = t[l] = c ? sc(t[l]) : oc(t[l]);
			if (Js(r, u)) h(r, u, n, null, i, a, o, s, c);
			else break;
			l++;
		}
		for (; l <= d && l <= f;) {
			let r = e[d], l = t[f] = c ? sc(t[f]) : oc(t[f]);
			if (Js(r, l)) h(r, l, n, null, i, a, o, s, c);
			else break;
			d--, f--;
		}
		if (l > d) {
			if (l <= f) {
				let e = f + 1, d = e < u ? t[e].el : r;
				for (; l <= f;) h(null, t[l] = c ? sc(t[l]) : oc(t[l]), n, d, i, a, o, s, c), l++;
			}
		} else if (l > f) for (; l <= d;) pe(e[l], i, a, !0), l++;
		else {
			let p = l, m = l, g = /* @__PURE__ */ new Map();
			for (l = m; l <= f; l++) {
				let e = t[l] = c ? sc(t[l]) : oc(t[l]);
				e.key != null && (process.env.NODE_ENV !== "production" && g.has(e.key) && U("Duplicate keys found during update:", JSON.stringify(e.key), "Make sure keys are unique."), g.set(e.key, l));
			}
			let _, v = 0, y = f - m + 1, b = !1, x = 0, ee = Array(y);
			for (l = 0; l < y; l++) ee[l] = 0;
			for (l = p; l <= d; l++) {
				let r = e[l];
				if (v >= y) {
					pe(r, i, a, !0);
					continue;
				}
				let u;
				if (r.key != null) u = g.get(r.key);
				else for (_ = m; _ <= f; _++) if (ee[_ - m] === 0 && Js(r, t[_])) {
					u = _;
					break;
				}
				u === void 0 ? pe(r, i, a, !0) : (ee[u - m] = l + 1, u >= x ? x = u : b = !0, h(r, t[u], n, null, i, a, o, s, c), v++);
			}
			let S = b ? Os(ee) : at;
			for (_ = S.length - 1, l = y - 1; l >= 0; l--) {
				let e = m + l, d = t[e], f = t[e + 1], p = e + 1 < u ? f.el || js(f) : r;
				ee[l] === 0 ? h(null, d, n, p, i, a, o, s, c) : b && (_ < 0 || l !== S[_] ? fe(d, n, p, 2) : _--);
			}
		}
	}, fe = (e, t, n, a, o = null) => {
		let { el: s, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			fe(e.component.subTree, t, n, a);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, a);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, xe);
			return;
		}
		if (c === Ps) {
			r(s, t, n);
			for (let e = 0; e < u.length; e++) fe(u[e], t, n, a);
			r(e.anchor, t, n);
			return;
		}
		if (c === Ls) {
			b(e, t, n);
			return;
		}
		if (a !== 2 && d & 1 && l) if (a === 0) l.persisted && !s[ya] ? r(s, t, n) : (l.beforeEnter(s), r(s, t, n), xs(() => l.enter(s), o));
		else {
			let { leave: a, delayLeave: o, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? i(s) : r(s, t, n);
			}, d = () => {
				let e = s._isLeaving || !!s[ya];
				s._isLeaving && s[ya](!0), l.persisted && !e ? u() : a(s, () => {
					u(), c && c();
				});
			};
			o ? o(s, u, d) : d();
		}
		else r(s, t, n);
	}, pe = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (Tn(), Ea(s, null, n, e, !0), En()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !Oa(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && uc(_, t, e), u & 6) ge(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && sa(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, xe, r) : l && !l.hasOnce && (a !== Ps || d > 0 && d & 64) ? _e(l, t, n, !1, !0) : (a === Ps && d & 384 || !i && u & 16) && _e(c, t, n), r && me(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && xs(() => {
			_ && uc(_, t, e), h && sa(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, me = (e) => {
		let { type: t, el: n, anchor: r, transition: a } = e;
		if (t === Ps) {
			process.env.NODE_ENV !== "production" && e.patchFlag > 0 && e.patchFlag & 2048 && a && !a.persisted ? e.children.forEach((e) => {
				e.type === Is ? i(e.el) : me(e);
			}) : he(n, r);
			return;
		}
		if (t === Ls) {
			x(e);
			return;
		}
		let o = () => {
			i(n), a && !a.persisted && a.afterLeave && a.afterLeave();
		};
		if (e.shapeFlag & 1 && a && !a.persisted) {
			let { leave: t, delayLeave: r } = a, i = () => t(n, o);
			r ? r(e.el, o, i) : i();
		} else o();
	}, he = (e, t) => {
		let n;
		for (; e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, ge = (e, t, n) => {
		process.env.NODE_ENV !== "production" && e.type.__hmrId && Ni(e);
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		As(c), As(l), r && jt(r), i.stop(), a && (a.flags |= 8, pe(o, e, t, n)), s && xs(s, t), xs(() => {
			e.isUnmounted = !0;
		}, t), process.env.NODE_ENV !== "production" && Xi(e);
	}, _e = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) pe(e[o], t, n, r, i);
	}, ve = (e) => {
		if (e.shapeFlag & 6) return ve(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = f(e.anchor || e.el), n = t && t[_a];
		return n ? f(n) : t;
	}, ye = !1, be = (e, t, n) => {
		let r;
		e == null ? t._vnode && (pe(t._vnode, null, null, !0), r = t._vnode.component) : h(t._vnode || null, e, t, null, null, null, n), t._vnode = e, ye ||= (ye = !0, Ci(r), wi(), !1);
	}, xe = {
		p: h,
		um: pe,
		m: fe,
		r: me,
		mt: T,
		mc: te,
		pc: le,
		pbc: w,
		n: ve,
		o: e
	}, Se, Ce;
	return t && ([Se, Ce] = t(xe)), {
		render: be,
		hydrate: Se,
		createApp: So(be, Se)
	};
}
function ws({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ts({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Es(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ds(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (j(r) && j(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = sc(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Ds(t, a)), a.type === Fs && (a.patchFlag === -1 && (a = i[e] = sc(a)), a.el = t.el), a.type === Is && !a.el && (a.el = t.el), process.env.NODE_ENV !== "production" && a.el && (a.el.__vnode = a);
	}
}
function Os(e) {
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
function ks(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : ks(t);
}
function As(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function js(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? js(t.subTree) : null;
}
var Ms = (e) => e.__isSuspense;
function Ns(e, t) {
	t && t.pendingBranch ? j(e) ? t.effects.push(...e) : t.effects.push(e) : Si(e);
}
var Ps = /* @__PURE__ */ Symbol.for("v-fgt"), Fs = /* @__PURE__ */ Symbol.for("v-txt"), Is = /* @__PURE__ */ Symbol.for("v-cmt"), Ls = /* @__PURE__ */ Symbol.for("v-stc"), Rs = [], zs = null;
function Bs(e = !1) {
	Rs.push(zs = e ? null : []);
}
function Vs() {
	Rs.pop(), zs = Rs[Rs.length - 1] || null;
}
var Hs = 1;
function Us(e, t = !1) {
	Hs += e, e < 0 && zs && t && (zs.hasOnce = !0);
}
function Ws(e) {
	return e.dynamicChildren = Hs > 0 ? zs || at : null, Vs(), Hs > 0 && zs && zs.push(e), e;
}
function Gs(e, t, n, r, i, a) {
	return Ws(G(e, t, n, r, i, a, !0));
}
function Ks(e, t, n, r, i) {
	return Ws($s(e, t, n, r, i, !0));
}
function qs(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Js(e, t) {
	if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
		let n = Ai.get(t.type);
		if (n && n.has(e.component)) return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
	}
	return e.type === t.type && e.key === t.key;
}
var Ys, Xs = (...e) => ec(...Ys ? Ys(e, W) : e), Zs = ({ key: e }) => e ?? null, Qs = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : N(e) || /* @__PURE__ */ V(e) || M(e) ? {
	i: W,
	r: e,
	k: t,
	f: !!n
} : e);
function G(e, t = null, n = null, r = 0, i = null, a = e === Ps ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Zs(t),
		ref: t && Qs(t),
		scopeId: na,
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
	return s ? (cc(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= N(n) ? 8 : 16), process.env.NODE_ENV !== "production" && c.key !== c.key && U("VNode created with invalid key (NaN). VNode type:", c.type), Hs > 0 && !o && zs && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && zs.push(c), c;
}
var $s = process.env.NODE_ENV === "production" ? ec : Xs;
function ec(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === Ka) && (process.env.NODE_ENV !== "production" && !e && U(`Invalid vnode type when creating vnode: ${e}.`), e = Is), qs(e)) {
		let r = nc(e, t, !0);
		return n && cc(r, n), Hs > 0 && !a && zs && (r.shapeFlag & 6 ? zs[zs.indexOf(e)] = r : zs.push(r)), r.patchFlag = -2, r;
	}
	if (Rc(e) && (e = e.__vccOpts), t) {
		t = tc(t);
		let { class: e, style: n } = t;
		e && !N(e) && (t.class = Vt(e)), P(n) && (/* @__PURE__ */ Dr(n) && !j(n) && (n = k({}, n)), t.style = It(n));
	}
	let o = N(e) ? 1 : Ms(e) ? 128 : va(e) ? 64 : P(e) ? 4 : M(e) ? 2 : 0;
	return process.env.NODE_ENV !== "production" && o & 4 && /* @__PURE__ */ Dr(e) && (e = /* @__PURE__ */ B(e), U("Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", "\nComponent that was made reactive: ", e)), G(e, t, n, r, i, o, a, !0);
}
function tc(e) {
	return e ? /* @__PURE__ */ Dr(e) || Uo(e) ? k({}, e) : e : null;
}
function nc(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? lc(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && Zs(l),
		ref: t && t.ref ? n && a ? j(a) ? a.concat(Qs(t)) : [a, Qs(t)] : Qs(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: process.env.NODE_ENV !== "production" && o === -1 && j(s) ? s.map(rc) : s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== Ps ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && nc(e.ssContent),
		ssFallback: e.ssFallback && nc(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && ba(u, c.clone(u)), u;
}
function rc(e) {
	let t = nc(e);
	return j(e.children) && (t.children = e.children.map(rc)), t;
}
function ic(e = " ", t = 0) {
	return $s(Fs, null, e, t);
}
function ac(e = "", t = !1) {
	return t ? (Bs(), Ks(Is, null, e)) : $s(Is, null, e);
}
function oc(e) {
	return e == null || typeof e == "boolean" ? $s(Is) : j(e) ? $s(Ps, null, e.slice()) : qs(e) ? sc(e) : $s(Fs, null, String(e));
}
function sc(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : nc(e);
}
function cc(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (j(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), cc(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !Uo(t) ? t._ctx = W : r === 3 && W && (W.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else M(t) ? (t = {
		default: t,
		_ctx: W
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [ic(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function lc(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = Vt([t.class, r.class]));
		else if (e === "style") t.style = It([t.style, r.style]);
		else if (st(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(j(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !ct(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function uc(e, t, n, r = null) {
	oi(e, t, 7, [n, r]);
}
var dc = bo(), fc = 0;
function pc(e, t, n) {
	let r = e.type, i = (t ? t.appContext : e.appContext) || dc, a = {
		uid: fc++,
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
		scope: new an(!0),
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
		propsOptions: Xo(r, i),
		emitsOptions: Do(r, i),
		emit: null,
		emitted: null,
		propsDefaults: D,
		inheritAttrs: r.inheritAttrs,
		ctx: D,
		data: D,
		props: D,
		attrs: D,
		slots: D,
		refs: D,
		setupState: D,
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
	return process.env.NODE_ENV === "production" ? a.ctx = { _: a } : a.ctx = $a(a), a.root = t ? t.root : a, a.emit = To.bind(null, a), e.ce && e.ce(a), a;
}
var K = null, mc = () => K || W, hc, gc;
{
	let e = Ft(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	hc = t("__VUE_INSTANCE_SETTERS__", (e) => K = e), gc = t("__VUE_SSR_SETTERS__", (e) => Sc = e);
}
var _c = (e) => {
	let t = K;
	return hc(e), e.scope.on(), () => {
		e.scope.off(), hc(t);
	};
}, vc = () => {
	K && K.scope.off(), hc(null);
}, yc = /* @__PURE__ */ it("slot,component");
function bc(e, { isNativeTag: t }) {
	(yc(e) || t(e)) && U("Do not use built-in or reserved HTML elements as component id: " + e);
}
function xc(e) {
	return e.vnode.shapeFlag & 4;
}
var Sc = !1;
function Cc(e, t = !1, n = !1) {
	t && gc(t);
	let { props: r, children: i } = e.vnode, a = xc(e);
	Wo(e, r, a, t), ps(e, i, n || t);
	let o = a ? wc(e, t) : void 0;
	return t && gc(!1), o;
}
function wc(e, t) {
	let n = e.type;
	if (process.env.NODE_ENV !== "production") {
		if (n.name && bc(n.name, e.appContext.config), n.components) {
			let t = Object.keys(n.components);
			for (let n = 0; n < t.length; n++) bc(t[n], e.appContext.config);
		}
		if (n.directives) {
			let e = Object.keys(n.directives);
			for (let t = 0; t < e.length; t++) aa(e[t]);
		}
		n.compilerOptions && Oc() && U("\"compilerOptions\" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.");
	}
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Qa), process.env.NODE_ENV !== "production" && eo(e);
	let { setup: r } = n;
	if (r) {
		Tn();
		let i = e.setupContext = r.length > 1 ? Mc(e) : null, a = _c(e), o = ai(r, e, 0, [process.env.NODE_ENV === "production" ? e.props : /* @__PURE__ */ Cr(e.props), i]), s = ht(o);
		if (En(), a(), (s || e.sp) && !Oa(e) && Sa(e), s) {
			if (o.then(vc, vc), t) return o.then((n) => {
				Tc(e, n, t);
			}).catch((t) => {
				si(t, e, 0);
			});
			e.asyncDep = o, process.env.NODE_ENV !== "production" && !e.suspense && U(`Component <${Lc(e, n)}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
		} else Tc(e, o, t);
	} else kc(e, t);
}
function Tc(e, t, n) {
	M(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : P(t) ? (process.env.NODE_ENV !== "production" && qs(t) && U("setup() should not return VNodes directly - return a render function instead."), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = Fr(t), process.env.NODE_ENV !== "production" && to(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && U(`setup() should return an object. Received: ${t === null ? "null" : typeof t}`), kc(e, n);
}
var Ec, Dc, Oc = () => !Ec;
function kc(e, t, n) {
	let r = e.type;
	if (!e.render) {
		if (!t && Ec && !r.render) {
			let t = r.template || lo(e).template;
			if (t) {
				process.env.NODE_ENV !== "production" && _s(e, "compile");
				let { isCustomElement: n, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: o } = r;
				r.render = Ec(t, k(k({
					isCustomElement: n,
					delimiters: a
				}, i), o)), process.env.NODE_ENV !== "production" && vs(e, "compile");
			}
		}
		e.render = r.render || O, Dc && Dc(e);
	}
	{
		let t = _c(e);
		Tn();
		try {
			ao(e);
		} finally {
			En(), t();
		}
	}
	process.env.NODE_ENV !== "production" && !r.render && e.render === O && !t && (!Ec && r.template ? U("Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias \"vue\" to \"vue/dist/vue.esm-bundler.js\".") : U("Component is missing template or render function: ", r));
}
var Ac = process.env.NODE_ENV === "production" ? { get(e, t) {
	return R(e, "get", ""), e[t];
} } : {
	get(e, t) {
		return Ao(), R(e, "get", ""), e[t];
	},
	set() {
		return U("setupContext.attrs is readonly."), !1;
	},
	deleteProperty() {
		return U("setupContext.attrs is readonly."), !1;
	}
};
function jc(e) {
	return new Proxy(e.slots, { get(t, n) {
		return R(e, "get", "$slots"), t[n];
	} });
}
function Mc(e) {
	let t = (t) => {
		if (process.env.NODE_ENV !== "production" && (e.exposed && U("expose() should be called only once per setup()."), t != null)) {
			let e = typeof t;
			e === "object" && (j(t) ? e = "array" : /* @__PURE__ */ V(t) && (e = "ref")), e !== "object" && U(`expose() should be passed a plain object, received ${e}.`);
		}
		e.exposed = t || {};
	};
	if (process.env.NODE_ENV !== "production") {
		let n, r;
		return Object.freeze({
			get attrs() {
				return n ||= new Proxy(e.attrs, Ac);
			},
			get slots() {
				return r ||= jc(e);
			},
			get emit() {
				return (t, ...n) => e.emit(t, ...n);
			},
			expose: t
		});
	} else return {
		attrs: new Proxy(e.attrs, Ac),
		slots: e.slots,
		emit: e.emit,
		expose: t
	};
}
function Nc(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Fr(Or(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Ya) return Ya[n](e);
		},
		has(e, t) {
			return t in e || t in Ya;
		}
	}) : e.proxy;
}
var Pc = /(?:^|[-_])\w/g, Fc = (e) => e.replace(Pc, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function Ic(e, t = !0) {
	return M(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Lc(e, t, n = !1) {
	let r = Ic(t);
	if (!r && t.__file) {
		let e = t.__file.match(/([^/\\]+)\.\w+$/);
		e && (r = e[1]);
	}
	if (!r && e) {
		let n = (e) => {
			for (let n in e) if (e[n] === t) return n;
		};
		r = n(e.components) || e.parent && n(e.parent.type.components) || n(e.appContext.components);
	}
	return r ? Fc(r) : n ? "App" : "Anonymous";
}
function Rc(e) {
	return M(e) && "__vccOpts" in e;
}
var zc = (e, t) => {
	let n = /* @__PURE__ */ Hr(e, t, Sc);
	if (process.env.NODE_ENV !== "production") {
		let e = mc();
		e && e.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
	}
	return n;
};
function Bc() {
	if (process.env.NODE_ENV === "production" || typeof window > "u") return;
	let e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, r = { style: "color:#eb2f96" }, i = {
		__vue_custom_formatter: !0,
		header(t) {
			if (!P(t)) return null;
			if (t.__isVue) return [
				"div",
				e,
				"VueInstance"
			];
			if (/* @__PURE__ */ V(t)) {
				Tn();
				let n = t.value;
				return En(), [
					"div",
					{},
					[
						"span",
						e,
						u(t)
					],
					"<",
					s(n),
					">"
				];
			} else if (/* @__PURE__ */ Tr(t)) return [
				"div",
				{},
				[
					"span",
					e,
					/* @__PURE__ */ z(t) ? "ShallowReactive" : "Reactive"
				],
				"<",
				s(t),
				`>${/* @__PURE__ */ Er(t) ? " (readonly)" : ""}`
			];
			else if (/* @__PURE__ */ Er(t)) return [
				"div",
				{},
				[
					"span",
					e,
					/* @__PURE__ */ z(t) ? "ShallowReadonly" : "Readonly"
				],
				"<",
				s(t),
				">"
			];
			return null;
		},
		hasBody(e) {
			return e && e.__isVue;
		},
		body(e) {
			if (e && e.__isVue) return [
				"div",
				{},
				...a(e.$)
			];
		}
	};
	function a(e) {
		let t = [];
		e.type.props && e.props && t.push(o("props", /* @__PURE__ */ B(e.props))), e.setupState !== D && t.push(o("setup", e.setupState)), e.data !== D && t.push(o("data", /* @__PURE__ */ B(e.data)));
		let n = c(e, "computed");
		n && t.push(o("computed", n));
		let i = c(e, "inject");
		return i && t.push(o("injected", i)), t.push([
			"div",
			{},
			[
				"span",
				{ style: r.style + ";opacity:0.66" },
				"$ (internal): "
			],
			["object", { object: e }]
		]), t;
	}
	function o(e, t) {
		return t = k({}, t), Object.keys(t).length ? [
			"div",
			{ style: "line-height:1.25em;margin-bottom:0.6em" },
			[
				"div",
				{ style: "color:#476582" },
				e
			],
			[
				"div",
				{ style: "padding-left:1.25em" },
				...Object.keys(t).map((e) => [
					"div",
					{},
					[
						"span",
						r,
						e + ": "
					],
					s(t[e], !1)
				])
			]
		] : ["span", {}];
	}
	function s(e, i = !0) {
		return typeof e == "number" ? [
			"span",
			t,
			e
		] : typeof e == "string" ? [
			"span",
			n,
			JSON.stringify(e)
		] : typeof e == "boolean" ? [
			"span",
			r,
			e
		] : P(e) ? ["object", { object: i ? /* @__PURE__ */ B(e) : e }] : [
			"span",
			n,
			String(e)
		];
	}
	function c(e, t) {
		let n = e.type;
		if (M(n)) return;
		let r = {};
		for (let i in e.ctx) l(n, i, t) && (r[i] = e.ctx[i]);
		return r;
	}
	function l(e, t, n) {
		let r = e[n];
		if (j(r) && r.includes(t) || P(r) && t in r || e.extends && l(e.extends, t, n) || e.mixins && e.mixins.some((e) => l(e, t, n))) return !0;
	}
	function u(e) {
		return /* @__PURE__ */ z(e) ? "ShallowRef" : e.effect ? "ComputedRef" : "Ref";
	}
	window.devtoolsFormatters ? window.devtoolsFormatters.push(i) : window.devtoolsFormatters = [i];
}
var Vc = "3.5.38", Hc = process.env.NODE_ENV === "production" ? O : U;
process.env.NODE_ENV, process.env.NODE_ENV;
//#endregion
//#region node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
var Uc = void 0, Wc = typeof window < "u" && window.trustedTypes;
if (Wc) try {
	Uc = /* @__PURE__ */ Wc.createPolicy("vue", { createHTML: (e) => e });
} catch (e) {
	process.env.NODE_ENV !== "production" && Hc(`Error creating trusted types policy: ${e}`);
}
var Gc = Uc ? (e) => Uc.createHTML(e) : (e) => e, Kc = "http://www.w3.org/2000/svg", qc = "http://www.w3.org/1998/Math/MathML", Jc = typeof document < "u" ? document : null, Yc = Jc && /* @__PURE__ */ Jc.createElement("template"), Xc = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? Jc.createElementNS(Kc, e) : t === "mathml" ? Jc.createElementNS(qc, e) : n ? Jc.createElement(e, { is: n }) : Jc.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => Jc.createTextNode(e),
	createComment: (e) => Jc.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => Jc.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			Yc.innerHTML = Gc(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Yc.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Zc = /* @__PURE__ */ Symbol("_vtc");
function Qc(e, t, n) {
	let r = e[Zc];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var $c = /* @__PURE__ */ Symbol("_vod"), el = /* @__PURE__ */ Symbol("_vsh"), tl = /* @__PURE__ */ Symbol(process.env.NODE_ENV === "production" ? "" : "CSS_VAR_TEXT"), nl = /(?:^|;)\s*display\s*:/;
function rl(e, t, n) {
	let r = e.style, i = N(n), a = !1;
	if (n && !i) {
		if (t) if (N(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? ol(r, t, "");
		}
		else for (let e in t) n[e] ?? ol(r, e, "");
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? ol(r, i, "") : ul(e, i, !N(t) && t ? t[i] : void 0, o) || ol(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[tl];
			e && (n += ";" + e), r.cssText = n, a = nl.test(n);
		}
	} else t && e.removeAttribute("style");
	$c in e && (e[$c] = a ? r.display : "", e[el] && (r.display = "none"));
}
var il = /[^\\];\s*$/, al = /\s*!important$/;
function ol(e, t, n) {
	if (j(n)) n.forEach((n) => ol(e, t, n));
	else if (n ??= "", process.env.NODE_ENV !== "production" && il.test(n) && Hc(`Unexpected semicolon at the end of '${t}' style value: '${n}'`), t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = ll(e, t);
		al.test(n) ? e.setProperty(Dt(r), n.replace(al, ""), "important") : e[r] = n;
	}
}
var sl = [
	"Webkit",
	"Moz",
	"ms"
], cl = {};
function ll(e, t) {
	let n = cl[t];
	if (n) return n;
	let r = Tt(t);
	if (r !== "filter" && r in e) return cl[t] = r;
	r = Ot(r);
	for (let n = 0; n < sl.length; n++) {
		let i = sl[n] + r;
		if (i in e) return cl[t] = i;
	}
	return t;
}
function ul(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && N(r) && n === r;
}
var dl = "http://www.w3.org/1999/xlink";
function fl(e, t, n, r, i, a = Yt(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(dl, t.slice(6, t.length)) : e.setAttributeNS(dl, t, n) : n == null || a && !Xt(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : mt(n) ? String(n) : n);
}
function pl(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Gc(n) : n);
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
		r === "boolean" ? n = Xt(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch (e) {
		process.env.NODE_ENV !== "production" && !o && Hc(`Failed setting prop "${t}" on <${a.toLowerCase()}>: value ${n} is invalid.`, e);
	}
	o && e.removeAttribute(i || t);
}
function ml(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function hl(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var gl = /* @__PURE__ */ Symbol("_vei");
function _l(e, t, n, r, i = null) {
	let a = e[gl] || (e[gl] = {}), o = a[t];
	if (r && o) o.value = process.env.NODE_ENV === "production" ? r : wl(r, t);
	else {
		let [n, s] = yl(t);
		r ? ml(e, n, a[t] = Cl(process.env.NODE_ENV === "production" ? r : wl(r, t), i), s) : o && (hl(e, n, o, s), a[t] = void 0);
	}
}
var vl = /(?:Once|Passive|Capture)$/;
function yl(e) {
	let t;
	if (vl.test(e)) {
		t = {};
		let n;
		for (; n = e.match(vl);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
	}
	return [e[2] === ":" ? e.slice(3) : Dt(e.slice(2)), t];
}
var bl = 0, xl = /* @__PURE__ */ Promise.resolve(), Sl = () => bl ||= (xl.then(() => bl = 0), Date.now());
function Cl(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (j(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && oi(e, t, 5, a);
			}
		} else oi(r, t, 5, [e]);
	};
	return n.value = e, n.attached = Sl(), n;
}
function wl(e, t) {
	return M(e) || j(e) ? e : (Hc(`Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`), O);
}
var Tl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, El = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? Qc(e, r, o) : t === "style" ? rl(e, n, r) : st(t) ? ct(t) || _l(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Dl(e, t, r, o)) ? (pl(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && fl(e, t, r, o, a, t !== "value")) : e._isVueCE && (Ol(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !N(r))) ? pl(e, Tt(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), fl(e, t, r, o));
};
function Dl(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Tl(t) && M(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return Tl(t) && N(n) ? !1 : t in e;
}
function Ol(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = Tt(t);
	return Array.isArray(n) ? n.some((e) => Tt(e) === r) : Object.keys(n).some((e) => Tt(e) === r);
}
var kl = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return j(t) ? (e) => jt(t, e) : t;
};
function Al(e) {
	e.target.composing = !0;
}
function jl(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Ml = /* @__PURE__ */ Symbol("_assign");
function Nl(e, t, n) {
	return t && (e = e.trim()), n && (e = Nt(e)), e;
}
var Pl = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[Ml] = kl(i);
		let a = r || i.props && i.props.type === "number";
		ml(e, t ? "change" : "input", (t) => {
			t.target.composing || e[Ml](Nl(e.value, n, a));
		}), (n || a) && ml(e, "change", () => {
			e.value = Nl(e.value, n, a);
		}), t || (ml(e, "compositionstart", Al), ml(e, "compositionend", jl), ml(e, "change", jl));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[Ml] = kl(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? Nt(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, Fl = {
	deep: !0,
	created(e, t, n) {
		e[Ml] = kl(n), ml(e, "change", () => {
			let t = e._modelValue, n = zl(e), r = e.checked, i = e[Ml];
			if (j(t)) {
				let e = $t(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (ft(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(Bl(e, r));
		});
	},
	mounted: Il,
	beforeUpdate(e, t, n) {
		e[Ml] = kl(n), Il(e, t, n);
	}
};
function Il(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (j(t)) i = $t(t, r.props.value) > -1;
	else if (ft(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = Qt(t, Bl(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Ll = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = ft(t);
		ml(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? Nt(zl(e)) : zl(e));
			e[Ml](e.multiple ? i ? new Set(t) : t : t[0]), e._assigning = !0, vi(() => {
				e._assigning = !1;
			});
		}), e[Ml] = kl(r);
	},
	mounted(e, { value: t }) {
		Rl(e, t);
	},
	beforeUpdate(e, t, n) {
		e[Ml] = kl(n);
	},
	updated(e, { value: t }) {
		e._assigning || Rl(e, t);
	}
};
function Rl(e, t) {
	let n = e.multiple, r = j(t);
	if (n && !r && !ft(t)) {
		process.env.NODE_ENV !== "production" && Hc(`<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(t).slice(8, -1)}.`);
		return;
	}
	for (let i = 0, a = e.options.length; i < a; i++) {
		let a = e.options[i], o = zl(a);
		if (n) if (r) {
			let e = typeof o;
			e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = $t(t, o) > -1;
		} else a.selected = t.has(o);
		else if (Qt(zl(a), t)) {
			e.selectedIndex !== i && (e.selectedIndex = i);
			return;
		}
	}
	!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
}
function zl(e) {
	return "_value" in e ? e._value : e.value;
}
function Bl(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Vl = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], Hl = {
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
	exact: (e, t) => Vl.some((n) => e[`${n}Key`] && !t.includes(n))
}, Ul = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = Hl[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, Wl = /* @__PURE__ */ k({ patchProp: El }, Xc), Gl;
function Kl() {
	return Gl ||= Ss(Wl);
}
var ql = ((...e) => {
	let t = Kl().createApp(...e);
	process.env.NODE_ENV !== "production" && (Yl(t), Xl(t));
	let { mount: n } = t;
	return t.mount = (e) => {
		let r = Zl(e);
		if (!r) return;
		let i = t._component;
		!M(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, Jl(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function Jl(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Yl(e) {
	Object.defineProperty(e.config, "isNativeTag", {
		value: (e) => Gt(e) || Kt(e) || qt(e),
		writable: !1
	});
}
function Xl(e) {
	if (Oc()) {
		let t = e.config.isCustomElement;
		Object.defineProperty(e.config, "isCustomElement", {
			get() {
				return t;
			},
			set() {
				Hc("The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead.");
			}
		});
		let n = e.config.compilerOptions, r = "The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka \"full build\"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader's `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc";
		Object.defineProperty(e.config, "compilerOptions", {
			get() {
				return Hc(r), n;
			},
			set() {
				Hc(r);
			}
		});
	}
}
function Zl(e) {
	if (N(e)) {
		let t = document.querySelector(e);
		return process.env.NODE_ENV !== "production" && !t && Hc(`Failed to mount app: mount target selector "${e}" returned null.`), t;
	}
	return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && Hc("mounting on a ShadowRoot with `{mode: \"closed\"}` may lead to unpredictable bugs"), e;
}
//#endregion
//#region node_modules/vue/dist/vue.runtime.esm-bundler.js
function Ql() {
	Bc();
}
process.env.NODE_ENV !== "production" && Ql();
//#endregion
//#region node_modules/@vue/devtools-shared/dist/index.js
var $l = Object.create, eu = Object.defineProperty, tu = Object.getOwnPropertyDescriptor, nu = Object.getOwnPropertyNames, ru = Object.getPrototypeOf, iu = Object.prototype.hasOwnProperty, au = (e, t) => function() {
	return e && (t = (0, e[nu(e)[0]])(e = 0)), t;
}, ou = (e, t) => function() {
	return t || (0, e[nu(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, su = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (let i of nu(t)) !iu.call(e, i) && i !== n && eu(e, i, {
		get: () => t[i],
		enumerable: !(r = tu(t, i)) || r.enumerable
	});
	return e;
}, cu = (e, t, n) => (n = e == null ? {} : $l(ru(e)), su(t || !e || !e.__esModule ? eu(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), lu = au({ "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {} }), uu = ou({ "../../node_modules/.pnpm/rfdc@1.4.1/node_modules/rfdc/index.js"(e, t) {
	lu(), t.exports = r;
	function n(e) {
		return e instanceof Buffer ? Buffer.from(e) : new e.constructor(e.buffer.slice(), e.byteOffset, e.length);
	}
	function r(e) {
		if (e ||= {}, e.circles) return i(e);
		let t = /* @__PURE__ */ new Map();
		if (t.set(Date, (e) => new Date(e)), t.set(Map, (e, t) => new Map(a(Array.from(e), t))), t.set(Set, (e, t) => new Set(a(Array.from(e), t))), e.constructorHandlers) for (let n of e.constructorHandlers) t.set(n[0], n[1]);
		let r = null;
		return e.proto ? s : o;
		function a(e, i) {
			let a = Object.keys(e), o = Array(a.length);
			for (let s = 0; s < a.length; s++) {
				let c = a[s], l = e[c];
				typeof l != "object" || !l ? o[c] = l : l.constructor !== Object && (r = t.get(l.constructor)) ? o[c] = r(l, i) : ArrayBuffer.isView(l) ? o[c] = n(l) : o[c] = i(l);
			}
			return o;
		}
		function o(e) {
			if (typeof e != "object" || !e) return e;
			if (Array.isArray(e)) return a(e, o);
			if (e.constructor !== Object && (r = t.get(e.constructor))) return r(e, o);
			let i = {};
			for (let a in e) {
				if (Object.hasOwnProperty.call(e, a) === !1) continue;
				let s = e[a];
				typeof s != "object" || !s ? i[a] = s : s.constructor !== Object && (r = t.get(s.constructor)) ? i[a] = r(s, o) : ArrayBuffer.isView(s) ? i[a] = n(s) : i[a] = o(s);
			}
			return i;
		}
		function s(e) {
			if (typeof e != "object" || !e) return e;
			if (Array.isArray(e)) return a(e, s);
			if (e.constructor !== Object && (r = t.get(e.constructor))) return r(e, s);
			let i = {};
			for (let a in e) {
				let o = e[a];
				typeof o != "object" || !o ? i[a] = o : o.constructor !== Object && (r = t.get(o.constructor)) ? i[a] = r(o, s) : ArrayBuffer.isView(o) ? i[a] = n(o) : i[a] = s(o);
			}
			return i;
		}
	}
	function i(e) {
		let t = [], r = [], i = /* @__PURE__ */ new Map();
		if (i.set(Date, (e) => new Date(e)), i.set(Map, (e, t) => new Map(o(Array.from(e), t))), i.set(Set, (e, t) => new Set(o(Array.from(e), t))), e.constructorHandlers) for (let t of e.constructorHandlers) i.set(t[0], t[1]);
		let a = null;
		return e.proto ? c : s;
		function o(e, o) {
			let s = Object.keys(e), c = Array(s.length);
			for (let l = 0; l < s.length; l++) {
				let u = s[l], d = e[u];
				if (typeof d != "object" || !d) c[u] = d;
				else if (d.constructor !== Object && (a = i.get(d.constructor))) c[u] = a(d, o);
				else if (ArrayBuffer.isView(d)) c[u] = n(d);
				else {
					let e = t.indexOf(d);
					e === -1 ? c[u] = o(d) : c[u] = r[e];
				}
			}
			return c;
		}
		function s(e) {
			if (typeof e != "object" || !e) return e;
			if (Array.isArray(e)) return o(e, s);
			if (e.constructor !== Object && (a = i.get(e.constructor))) return a(e, s);
			let c = {};
			t.push(e), r.push(c);
			for (let o in e) {
				if (Object.hasOwnProperty.call(e, o) === !1) continue;
				let l = e[o];
				if (typeof l != "object" || !l) c[o] = l;
				else if (l.constructor !== Object && (a = i.get(l.constructor))) c[o] = a(l, s);
				else if (ArrayBuffer.isView(l)) c[o] = n(l);
				else {
					let e = t.indexOf(l);
					e === -1 ? c[o] = s(l) : c[o] = r[e];
				}
			}
			return t.pop(), r.pop(), c;
		}
		function c(e) {
			if (typeof e != "object" || !e) return e;
			if (Array.isArray(e)) return o(e, c);
			if (e.constructor !== Object && (a = i.get(e.constructor))) return a(e, c);
			let s = {};
			t.push(e), r.push(s);
			for (let o in e) {
				let l = e[o];
				if (typeof l != "object" || !l) s[o] = l;
				else if (l.constructor !== Object && (a = i.get(l.constructor))) s[o] = a(l, c);
				else if (ArrayBuffer.isView(l)) s[o] = n(l);
				else {
					let e = t.indexOf(l);
					e === -1 ? s[o] = c(l) : s[o] = r[e];
				}
			}
			return t.pop(), r.pop(), s;
		}
	}
} });
lu(), lu(), lu();
var du = typeof navigator < "u", q = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : {};
q.chrome !== void 0 && q.chrome.devtools, du && (q.self, q.top), typeof navigator < "u" && navigator.userAgent?.toLowerCase().includes("electron"), typeof window < "u" && window.__NUXT__, lu();
var fu = cu(uu(), 1), pu = /(?:^|[-_/])(\w)/g;
function mu(e, t) {
	return t ? t.toUpperCase() : "";
}
function hu(e) {
	return e && `${e}`.replace(pu, mu);
}
function gu(e, t) {
	let n = e.replace(/^[a-z]:/i, "").replace(/\\/g, "/");
	n.endsWith(`index${t}`) && (n = n.replace(`/index${t}`, t));
	let r = n.lastIndexOf("/"), i = n.substring(r + 1);
	if (t) {
		let e = i.lastIndexOf(t);
		return i.substring(0, e);
	}
	return "";
}
var _u = (0, fu.default)({ circles: !0 }), vu = { trailing: !0 };
function yu(e, t = 25, n = {}) {
	if (n = {
		...vu,
		...n
	}, !Number.isFinite(t)) throw TypeError("Expected `wait` to be a finite number");
	let r, i, a = [], o, s, c = (t, r) => (o = bu(e, t, r), o.finally(() => {
		if (o = null, n.trailing && s && !i) {
			let e = c(t, s);
			return s = null, e;
		}
	}), o);
	return function(...e) {
		return o ? (n.trailing && (s = e), o) : new Promise((o) => {
			let s = !i && n.leading;
			clearTimeout(i), i = setTimeout(() => {
				i = null;
				let t = n.leading ? r : c(this, e);
				for (let e of a) e(t);
				a = [];
			}, t), s ? (r = c(this, e), o(r)) : a.push(o);
		});
	};
}
async function bu(e, t, n) {
	return await e.apply(t, n);
}
//#endregion
//#region node_modules/hookable/dist/index.mjs
function xu(e, t = {}, n) {
	for (let r in e) {
		let i = e[r], a = n ? `${n}:${r}` : r;
		typeof i == "object" && i ? xu(i, t, a) : typeof i == "function" && (t[a] = i);
	}
	return t;
}
var Su = { run: (e) => e() }, Cu = console.createTask === void 0 ? () => Su : console.createTask;
function wu(e, t) {
	let n = Cu(t.shift());
	return e.reduce((e, r) => e.then(() => n.run(() => r(...t))), Promise.resolve());
}
function Tu(e, t) {
	let n = Cu(t.shift());
	return Promise.all(e.map((e) => n.run(() => e(...t))));
}
function Eu(e, t) {
	for (let n of [...e]) n(t);
}
var Du = class {
	constructor() {
		this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
	}
	hook(e, t, n = {}) {
		if (!e || typeof t != "function") return () => {};
		let r = e, i;
		for (; this._deprecatedHooks[e];) i = this._deprecatedHooks[e], e = i.to;
		if (i && !n.allowDeprecated) {
			let e = i.message;
			e ||= `${r} hook has been deprecated` + (i.to ? `, please use ${i.to}` : ""), this._deprecatedMessages ||= /* @__PURE__ */ new Set(), this._deprecatedMessages.has(e) || (console.warn(e), this._deprecatedMessages.add(e));
		}
		if (!t.name) try {
			Object.defineProperty(t, "name", {
				get: () => "_" + e.replace(/\W+/g, "_") + "_hook_cb",
				configurable: !0
			});
		} catch {}
		return this._hooks[e] = this._hooks[e] || [], this._hooks[e].push(t), () => {
			t &&= (this.removeHook(e, t), void 0);
		};
	}
	hookOnce(e, t) {
		let n, r = (...e) => (typeof n == "function" && n(), n = void 0, r = void 0, t(...e));
		return n = this.hook(e, r), n;
	}
	removeHook(e, t) {
		if (this._hooks[e]) {
			let n = this._hooks[e].indexOf(t);
			n !== -1 && this._hooks[e].splice(n, 1), this._hooks[e].length === 0 && delete this._hooks[e];
		}
	}
	deprecateHook(e, t) {
		this._deprecatedHooks[e] = typeof t == "string" ? { to: t } : t;
		let n = this._hooks[e] || [];
		delete this._hooks[e];
		for (let t of n) this.hook(e, t);
	}
	deprecateHooks(e) {
		Object.assign(this._deprecatedHooks, e);
		for (let t in e) this.deprecateHook(t, e[t]);
	}
	addHooks(e) {
		let t = xu(e), n = Object.keys(t).map((e) => this.hook(e, t[e]));
		return () => {
			for (let e of n.splice(0, n.length)) e();
		};
	}
	removeHooks(e) {
		let t = xu(e);
		for (let e in t) this.removeHook(e, t[e]);
	}
	removeAllHooks() {
		for (let e in this._hooks) delete this._hooks[e];
	}
	callHook(e, ...t) {
		return t.unshift(e), this.callHookWith(wu, e, ...t);
	}
	callHookParallel(e, ...t) {
		return t.unshift(e), this.callHookWith(Tu, e, ...t);
	}
	callHookWith(e, t, ...n) {
		let r = this._before || this._after ? {
			name: t,
			args: n,
			context: {}
		} : void 0;
		this._before && Eu(this._before, r);
		let i = e(t in this._hooks ? [...this._hooks[t]] : [], n);
		return i instanceof Promise ? i.finally(() => {
			this._after && r && Eu(this._after, r);
		}) : (this._after && r && Eu(this._after, r), i);
	}
	beforeEach(e) {
		return this._before = this._before || [], this._before.push(e), () => {
			if (this._before !== void 0) {
				let t = this._before.indexOf(e);
				t !== -1 && this._before.splice(t, 1);
			}
		};
	}
	afterEach(e) {
		return this._after = this._after || [], this._after.push(e), () => {
			if (this._after !== void 0) {
				let t = this._after.indexOf(e);
				t !== -1 && this._after.splice(t, 1);
			}
		};
	}
};
function Ou() {
	return new Du();
}
//#endregion
//#region node_modules/@vue/devtools-kit/dist/index.js
var ku = Object.create, Au = Object.defineProperty, ju = Object.getOwnPropertyDescriptor, Mu = Object.getOwnPropertyNames, Nu = Object.getPrototypeOf, Pu = Object.prototype.hasOwnProperty, Fu = (e, t) => function() {
	return e && (t = (0, e[Mu(e)[0]])(e = 0)), t;
}, Iu = (e, t) => function() {
	return t || (0, e[Mu(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, Lu = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (let i of Mu(t)) !Pu.call(e, i) && i !== n && Au(e, i, {
		get: () => t[i],
		enumerable: !(r = ju(t, i)) || r.enumerable
	});
	return e;
}, Ru = (e, t, n) => (n = e == null ? {} : ku(Nu(e)), Lu(t || !e || !e.__esModule ? Au(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), J = Fu({ "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {} }), zu = Iu({ "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/lib/speakingurl.js"(e, t) {
	J(), (function(e) {
		var n = {
			À: "A",
			Á: "A",
			Â: "A",
			Ã: "A",
			Ä: "Ae",
			Å: "A",
			Æ: "AE",
			Ç: "C",
			È: "E",
			É: "E",
			Ê: "E",
			Ë: "E",
			Ì: "I",
			Í: "I",
			Î: "I",
			Ï: "I",
			Ð: "D",
			Ñ: "N",
			Ò: "O",
			Ó: "O",
			Ô: "O",
			Õ: "O",
			Ö: "Oe",
			Ő: "O",
			Ø: "O",
			Ù: "U",
			Ú: "U",
			Û: "U",
			Ü: "Ue",
			Ű: "U",
			Ý: "Y",
			Þ: "TH",
			ß: "ss",
			à: "a",
			á: "a",
			â: "a",
			ã: "a",
			ä: "ae",
			å: "a",
			æ: "ae",
			ç: "c",
			è: "e",
			é: "e",
			ê: "e",
			ë: "e",
			ì: "i",
			í: "i",
			î: "i",
			ï: "i",
			ð: "d",
			ñ: "n",
			ò: "o",
			ó: "o",
			ô: "o",
			õ: "o",
			ö: "oe",
			ő: "o",
			ø: "o",
			ù: "u",
			ú: "u",
			û: "u",
			ü: "ue",
			ű: "u",
			ý: "y",
			þ: "th",
			ÿ: "y",
			ẞ: "SS",
			ا: "a",
			أ: "a",
			إ: "i",
			آ: "aa",
			ؤ: "u",
			ئ: "e",
			ء: "a",
			ب: "b",
			ت: "t",
			ث: "th",
			ج: "j",
			ح: "h",
			خ: "kh",
			د: "d",
			ذ: "th",
			ر: "r",
			ز: "z",
			س: "s",
			ش: "sh",
			ص: "s",
			ض: "dh",
			ط: "t",
			ظ: "z",
			ع: "a",
			غ: "gh",
			ف: "f",
			ق: "q",
			ك: "k",
			ل: "l",
			م: "m",
			ن: "n",
			ه: "h",
			و: "w",
			ي: "y",
			ى: "a",
			ة: "h",
			ﻻ: "la",
			ﻷ: "laa",
			ﻹ: "lai",
			ﻵ: "laa",
			گ: "g",
			چ: "ch",
			پ: "p",
			ژ: "zh",
			ک: "k",
			ی: "y",
			"َ": "a",
			"ً": "an",
			"ِ": "e",
			"ٍ": "en",
			"ُ": "u",
			"ٌ": "on",
			"ْ": "",
			"٠": "0",
			"١": "1",
			"٢": "2",
			"٣": "3",
			"٤": "4",
			"٥": "5",
			"٦": "6",
			"٧": "7",
			"٨": "8",
			"٩": "9",
			"۰": "0",
			"۱": "1",
			"۲": "2",
			"۳": "3",
			"۴": "4",
			"۵": "5",
			"۶": "6",
			"۷": "7",
			"۸": "8",
			"۹": "9",
			က: "k",
			ခ: "kh",
			ဂ: "g",
			ဃ: "ga",
			င: "ng",
			စ: "s",
			ဆ: "sa",
			ဇ: "z",
			စျ: "za",
			ည: "ny",
			ဋ: "t",
			ဌ: "ta",
			ဍ: "d",
			ဎ: "da",
			ဏ: "na",
			တ: "t",
			ထ: "ta",
			ဒ: "d",
			ဓ: "da",
			န: "n",
			ပ: "p",
			ဖ: "pa",
			ဗ: "b",
			ဘ: "ba",
			မ: "m",
			ယ: "y",
			ရ: "ya",
			လ: "l",
			ဝ: "w",
			သ: "th",
			ဟ: "h",
			ဠ: "la",
			အ: "a",
			"ြ": "y",
			"ျ": "ya",
			"ွ": "w",
			"ြွ": "yw",
			"ျွ": "ywa",
			"ှ": "h",
			ဧ: "e",
			"၏": "-e",
			ဣ: "i",
			ဤ: "-i",
			ဉ: "u",
			ဦ: "-u",
			ဩ: "aw",
			သြော: "aw",
			ဪ: "aw",
			"၀": "0",
			"၁": "1",
			"၂": "2",
			"၃": "3",
			"၄": "4",
			"၅": "5",
			"၆": "6",
			"၇": "7",
			"၈": "8",
			"၉": "9",
			"္": "",
			"့": "",
			"း": "",
			č: "c",
			ď: "d",
			ě: "e",
			ň: "n",
			ř: "r",
			š: "s",
			ť: "t",
			ů: "u",
			ž: "z",
			Č: "C",
			Ď: "D",
			Ě: "E",
			Ň: "N",
			Ř: "R",
			Š: "S",
			Ť: "T",
			Ů: "U",
			Ž: "Z",
			ހ: "h",
			ށ: "sh",
			ނ: "n",
			ރ: "r",
			ބ: "b",
			ޅ: "lh",
			ކ: "k",
			އ: "a",
			ވ: "v",
			މ: "m",
			ފ: "f",
			ދ: "dh",
			ތ: "th",
			ލ: "l",
			ގ: "g",
			ޏ: "gn",
			ސ: "s",
			ޑ: "d",
			ޒ: "z",
			ޓ: "t",
			ޔ: "y",
			ޕ: "p",
			ޖ: "j",
			ޗ: "ch",
			ޘ: "tt",
			ޙ: "hh",
			ޚ: "kh",
			ޛ: "th",
			ޜ: "z",
			ޝ: "sh",
			ޞ: "s",
			ޟ: "d",
			ޠ: "t",
			ޡ: "z",
			ޢ: "a",
			ޣ: "gh",
			ޤ: "q",
			ޥ: "w",
			"ަ": "a",
			"ާ": "aa",
			"ި": "i",
			"ީ": "ee",
			"ު": "u",
			"ޫ": "oo",
			"ެ": "e",
			"ޭ": "ey",
			"ޮ": "o",
			"ޯ": "oa",
			"ް": "",
			ა: "a",
			ბ: "b",
			გ: "g",
			დ: "d",
			ე: "e",
			ვ: "v",
			ზ: "z",
			თ: "t",
			ი: "i",
			კ: "k",
			ლ: "l",
			მ: "m",
			ნ: "n",
			ო: "o",
			პ: "p",
			ჟ: "zh",
			რ: "r",
			ს: "s",
			ტ: "t",
			უ: "u",
			ფ: "p",
			ქ: "k",
			ღ: "gh",
			ყ: "q",
			შ: "sh",
			ჩ: "ch",
			ც: "ts",
			ძ: "dz",
			წ: "ts",
			ჭ: "ch",
			ხ: "kh",
			ჯ: "j",
			ჰ: "h",
			α: "a",
			β: "v",
			γ: "g",
			δ: "d",
			ε: "e",
			ζ: "z",
			η: "i",
			θ: "th",
			ι: "i",
			κ: "k",
			λ: "l",
			μ: "m",
			ν: "n",
			ξ: "ks",
			ο: "o",
			π: "p",
			ρ: "r",
			σ: "s",
			τ: "t",
			υ: "y",
			φ: "f",
			χ: "x",
			ψ: "ps",
			ω: "o",
			ά: "a",
			έ: "e",
			ί: "i",
			ό: "o",
			ύ: "y",
			ή: "i",
			ώ: "o",
			ς: "s",
			ϊ: "i",
			ΰ: "y",
			ϋ: "y",
			ΐ: "i",
			Α: "A",
			Β: "B",
			Γ: "G",
			Δ: "D",
			Ε: "E",
			Ζ: "Z",
			Η: "I",
			Θ: "TH",
			Ι: "I",
			Κ: "K",
			Λ: "L",
			Μ: "M",
			Ν: "N",
			Ξ: "KS",
			Ο: "O",
			Π: "P",
			Ρ: "R",
			Σ: "S",
			Τ: "T",
			Υ: "Y",
			Φ: "F",
			Χ: "X",
			Ψ: "PS",
			Ω: "O",
			Ά: "A",
			Έ: "E",
			Ί: "I",
			Ό: "O",
			Ύ: "Y",
			Ή: "I",
			Ώ: "O",
			Ϊ: "I",
			Ϋ: "Y",
			ā: "a",
			ē: "e",
			ģ: "g",
			ī: "i",
			ķ: "k",
			ļ: "l",
			ņ: "n",
			ū: "u",
			Ā: "A",
			Ē: "E",
			Ģ: "G",
			Ī: "I",
			Ķ: "k",
			Ļ: "L",
			Ņ: "N",
			Ū: "U",
			Ќ: "Kj",
			ќ: "kj",
			Љ: "Lj",
			љ: "lj",
			Њ: "Nj",
			њ: "nj",
			Тс: "Ts",
			тс: "ts",
			ą: "a",
			ć: "c",
			ę: "e",
			ł: "l",
			ń: "n",
			ś: "s",
			ź: "z",
			ż: "z",
			Ą: "A",
			Ć: "C",
			Ę: "E",
			Ł: "L",
			Ń: "N",
			Ś: "S",
			Ź: "Z",
			Ż: "Z",
			Є: "Ye",
			І: "I",
			Ї: "Yi",
			Ґ: "G",
			є: "ye",
			і: "i",
			ї: "yi",
			ґ: "g",
			ă: "a",
			Ă: "A",
			ș: "s",
			Ș: "S",
			ț: "t",
			Ț: "T",
			ţ: "t",
			Ţ: "T",
			а: "a",
			б: "b",
			в: "v",
			г: "g",
			д: "d",
			е: "e",
			ё: "yo",
			ж: "zh",
			з: "z",
			и: "i",
			й: "i",
			к: "k",
			л: "l",
			м: "m",
			н: "n",
			о: "o",
			п: "p",
			р: "r",
			с: "s",
			т: "t",
			у: "u",
			ф: "f",
			х: "kh",
			ц: "c",
			ч: "ch",
			ш: "sh",
			щ: "sh",
			ъ: "",
			ы: "y",
			ь: "",
			э: "e",
			ю: "yu",
			я: "ya",
			А: "A",
			Б: "B",
			В: "V",
			Г: "G",
			Д: "D",
			Е: "E",
			Ё: "Yo",
			Ж: "Zh",
			З: "Z",
			И: "I",
			Й: "I",
			К: "K",
			Л: "L",
			М: "M",
			Н: "N",
			О: "O",
			П: "P",
			Р: "R",
			С: "S",
			Т: "T",
			У: "U",
			Ф: "F",
			Х: "Kh",
			Ц: "C",
			Ч: "Ch",
			Ш: "Sh",
			Щ: "Sh",
			Ъ: "",
			Ы: "Y",
			Ь: "",
			Э: "E",
			Ю: "Yu",
			Я: "Ya",
			ђ: "dj",
			ј: "j",
			ћ: "c",
			џ: "dz",
			Ђ: "Dj",
			Ј: "j",
			Ћ: "C",
			Џ: "Dz",
			ľ: "l",
			ĺ: "l",
			ŕ: "r",
			Ľ: "L",
			Ĺ: "L",
			Ŕ: "R",
			ş: "s",
			Ş: "S",
			ı: "i",
			İ: "I",
			ğ: "g",
			Ğ: "G",
			ả: "a",
			Ả: "A",
			ẳ: "a",
			Ẳ: "A",
			ẩ: "a",
			Ẩ: "A",
			đ: "d",
			Đ: "D",
			ẹ: "e",
			Ẹ: "E",
			ẽ: "e",
			Ẽ: "E",
			ẻ: "e",
			Ẻ: "E",
			ế: "e",
			Ế: "E",
			ề: "e",
			Ề: "E",
			ệ: "e",
			Ệ: "E",
			ễ: "e",
			Ễ: "E",
			ể: "e",
			Ể: "E",
			ỏ: "o",
			ọ: "o",
			Ọ: "o",
			ố: "o",
			Ố: "O",
			ồ: "o",
			Ồ: "O",
			ổ: "o",
			Ổ: "O",
			ộ: "o",
			Ộ: "O",
			ỗ: "o",
			Ỗ: "O",
			ơ: "o",
			Ơ: "O",
			ớ: "o",
			Ớ: "O",
			ờ: "o",
			Ờ: "O",
			ợ: "o",
			Ợ: "O",
			ỡ: "o",
			Ỡ: "O",
			Ở: "o",
			ở: "o",
			ị: "i",
			Ị: "I",
			ĩ: "i",
			Ĩ: "I",
			ỉ: "i",
			Ỉ: "i",
			ủ: "u",
			Ủ: "U",
			ụ: "u",
			Ụ: "U",
			ũ: "u",
			Ũ: "U",
			ư: "u",
			Ư: "U",
			ứ: "u",
			Ứ: "U",
			ừ: "u",
			Ừ: "U",
			ự: "u",
			Ự: "U",
			ữ: "u",
			Ữ: "U",
			ử: "u",
			Ử: "ư",
			ỷ: "y",
			Ỷ: "y",
			ỳ: "y",
			Ỳ: "Y",
			ỵ: "y",
			Ỵ: "Y",
			ỹ: "y",
			Ỹ: "Y",
			ạ: "a",
			Ạ: "A",
			ấ: "a",
			Ấ: "A",
			ầ: "a",
			Ầ: "A",
			ậ: "a",
			Ậ: "A",
			ẫ: "a",
			Ẫ: "A",
			ắ: "a",
			Ắ: "A",
			ằ: "a",
			Ằ: "A",
			ặ: "a",
			Ặ: "A",
			ẵ: "a",
			Ẵ: "A",
			"⓪": "0",
			"①": "1",
			"②": "2",
			"③": "3",
			"④": "4",
			"⑤": "5",
			"⑥": "6",
			"⑦": "7",
			"⑧": "8",
			"⑨": "9",
			"⑩": "10",
			"⑪": "11",
			"⑫": "12",
			"⑬": "13",
			"⑭": "14",
			"⑮": "15",
			"⑯": "16",
			"⑰": "17",
			"⑱": "18",
			"⑲": "18",
			"⑳": "18",
			"⓵": "1",
			"⓶": "2",
			"⓷": "3",
			"⓸": "4",
			"⓹": "5",
			"⓺": "6",
			"⓻": "7",
			"⓼": "8",
			"⓽": "9",
			"⓾": "10",
			"⓿": "0",
			"⓫": "11",
			"⓬": "12",
			"⓭": "13",
			"⓮": "14",
			"⓯": "15",
			"⓰": "16",
			"⓱": "17",
			"⓲": "18",
			"⓳": "19",
			"⓴": "20",
			"Ⓐ": "A",
			"Ⓑ": "B",
			"Ⓒ": "C",
			"Ⓓ": "D",
			"Ⓔ": "E",
			"Ⓕ": "F",
			"Ⓖ": "G",
			"Ⓗ": "H",
			"Ⓘ": "I",
			"Ⓙ": "J",
			"Ⓚ": "K",
			"Ⓛ": "L",
			"Ⓜ": "M",
			"Ⓝ": "N",
			"Ⓞ": "O",
			"Ⓟ": "P",
			"Ⓠ": "Q",
			"Ⓡ": "R",
			"Ⓢ": "S",
			"Ⓣ": "T",
			"Ⓤ": "U",
			"Ⓥ": "V",
			"Ⓦ": "W",
			"Ⓧ": "X",
			"Ⓨ": "Y",
			"Ⓩ": "Z",
			"ⓐ": "a",
			"ⓑ": "b",
			"ⓒ": "c",
			"ⓓ": "d",
			"ⓔ": "e",
			"ⓕ": "f",
			"ⓖ": "g",
			"ⓗ": "h",
			"ⓘ": "i",
			"ⓙ": "j",
			"ⓚ": "k",
			"ⓛ": "l",
			"ⓜ": "m",
			"ⓝ": "n",
			"ⓞ": "o",
			"ⓟ": "p",
			"ⓠ": "q",
			"ⓡ": "r",
			"ⓢ": "s",
			"ⓣ": "t",
			"ⓤ": "u",
			"ⓦ": "v",
			"ⓥ": "w",
			"ⓧ": "x",
			"ⓨ": "y",
			"ⓩ": "z",
			"“": "\"",
			"”": "\"",
			"‘": "'",
			"’": "'",
			"∂": "d",
			ƒ: "f",
			"™": "(TM)",
			"©": "(C)",
			œ: "oe",
			Œ: "OE",
			"®": "(R)",
			"†": "+",
			"℠": "(SM)",
			"…": "...",
			"˚": "o",
			º: "o",
			ª: "a",
			"•": "*",
			"၊": ",",
			"။": ".",
			$: "USD",
			"€": "EUR",
			"₢": "BRN",
			"₣": "FRF",
			"£": "GBP",
			"₤": "ITL",
			"₦": "NGN",
			"₧": "ESP",
			"₩": "KRW",
			"₪": "ILS",
			"₫": "VND",
			"₭": "LAK",
			"₮": "MNT",
			"₯": "GRD",
			"₱": "ARS",
			"₲": "PYG",
			"₳": "ARA",
			"₴": "UAH",
			"₵": "GHS",
			"¢": "cent",
			"¥": "CNY",
			元: "CNY",
			円: "YEN",
			"﷼": "IRR",
			"₠": "EWE",
			"฿": "THB",
			"₨": "INR",
			"₹": "INR",
			"₰": "PF",
			"₺": "TRY",
			"؋": "AFN",
			"₼": "AZN",
			лв: "BGN",
			"៛": "KHR",
			"₡": "CRC",
			"₸": "KZT",
			ден: "MKD",
			zł: "PLN",
			"₽": "RUB",
			"₾": "GEL"
		}, r = ["်", "ް"], i = {
			"ာ": "a",
			"ါ": "a",
			"ေ": "e",
			"ဲ": "e",
			"ိ": "i",
			"ီ": "i",
			"ို": "o",
			"ု": "u",
			"ူ": "u",
			"ေါင်": "aung",
			"ော": "aw",
			"ော်": "aw",
			"ေါ": "aw",
			"ေါ်": "aw",
			"်": "်",
			က်: "et",
			"ိုက်": "aik",
			"ောက်": "auk",
			င်: "in",
			"ိုင်": "aing",
			"ောင်": "aung",
			စ်: "it",
			ည်: "i",
			တ်: "at",
			"ိတ်": "eik",
			"ုတ်": "ok",
			"ွတ်": "ut",
			"ေတ်": "it",
			ဒ်: "d",
			"ိုဒ်": "ok",
			"ုဒ်": "ait",
			န်: "an",
			"ာန်": "an",
			"ိန်": "ein",
			"ုန်": "on",
			"ွန်": "un",
			ပ်: "at",
			"ိပ်": "eik",
			"ုပ်": "ok",
			"ွပ်": "ut",
			န်ုပ်: "nub",
			မ်: "an",
			"ိမ်": "ein",
			"ုမ်": "on",
			"ွမ်": "un",
			ယ်: "e",
			"ိုလ်": "ol",
			ဉ်: "in",
			"ံ": "an",
			"ိံ": "ein",
			"ုံ": "on",
			"ައް": "ah",
			"ަށް": "ah"
		}, a = {
			en: {},
			az: {
				ç: "c",
				ə: "e",
				ğ: "g",
				ı: "i",
				ö: "o",
				ş: "s",
				ü: "u",
				Ç: "C",
				Ə: "E",
				Ğ: "G",
				İ: "I",
				Ö: "O",
				Ş: "S",
				Ü: "U"
			},
			cs: {
				č: "c",
				ď: "d",
				ě: "e",
				ň: "n",
				ř: "r",
				š: "s",
				ť: "t",
				ů: "u",
				ž: "z",
				Č: "C",
				Ď: "D",
				Ě: "E",
				Ň: "N",
				Ř: "R",
				Š: "S",
				Ť: "T",
				Ů: "U",
				Ž: "Z"
			},
			fi: {
				ä: "a",
				Ä: "A",
				ö: "o",
				Ö: "O"
			},
			hu: {
				ä: "a",
				Ä: "A",
				ö: "o",
				Ö: "O",
				ü: "u",
				Ü: "U",
				ű: "u",
				Ű: "U"
			},
			lt: {
				ą: "a",
				č: "c",
				ę: "e",
				ė: "e",
				į: "i",
				š: "s",
				ų: "u",
				ū: "u",
				ž: "z",
				Ą: "A",
				Č: "C",
				Ę: "E",
				Ė: "E",
				Į: "I",
				Š: "S",
				Ų: "U",
				Ū: "U"
			},
			lv: {
				ā: "a",
				č: "c",
				ē: "e",
				ģ: "g",
				ī: "i",
				ķ: "k",
				ļ: "l",
				ņ: "n",
				š: "s",
				ū: "u",
				ž: "z",
				Ā: "A",
				Č: "C",
				Ē: "E",
				Ģ: "G",
				Ī: "i",
				Ķ: "k",
				Ļ: "L",
				Ņ: "N",
				Š: "S",
				Ū: "u",
				Ž: "Z"
			},
			pl: {
				ą: "a",
				ć: "c",
				ę: "e",
				ł: "l",
				ń: "n",
				ó: "o",
				ś: "s",
				ź: "z",
				ż: "z",
				Ą: "A",
				Ć: "C",
				Ę: "e",
				Ł: "L",
				Ń: "N",
				Ó: "O",
				Ś: "S",
				Ź: "Z",
				Ż: "Z"
			},
			sv: {
				ä: "a",
				Ä: "A",
				ö: "o",
				Ö: "O"
			},
			sk: {
				ä: "a",
				Ä: "A"
			},
			sr: {
				љ: "lj",
				њ: "nj",
				Љ: "Lj",
				Њ: "Nj",
				đ: "dj",
				Đ: "Dj"
			},
			tr: {
				Ü: "U",
				Ö: "O",
				ü: "u",
				ö: "o"
			}
		}, o = {
			ar: {
				"∆": "delta",
				"∞": "la-nihaya",
				"♥": "hob",
				"&": "wa",
				"|": "aw",
				"<": "aqal-men",
				">": "akbar-men",
				"∑": "majmou",
				"¤": "omla"
			},
			az: {},
			ca: {
				"∆": "delta",
				"∞": "infinit",
				"♥": "amor",
				"&": "i",
				"|": "o",
				"<": "menys que",
				">": "mes que",
				"∑": "suma dels",
				"¤": "moneda"
			},
			cs: {
				"∆": "delta",
				"∞": "nekonecno",
				"♥": "laska",
				"&": "a",
				"|": "nebo",
				"<": "mensi nez",
				">": "vetsi nez",
				"∑": "soucet",
				"¤": "mena"
			},
			de: {
				"∆": "delta",
				"∞": "unendlich",
				"♥": "Liebe",
				"&": "und",
				"|": "oder",
				"<": "kleiner als",
				">": "groesser als",
				"∑": "Summe von",
				"¤": "Waehrung"
			},
			dv: {
				"∆": "delta",
				"∞": "kolunulaa",
				"♥": "loabi",
				"&": "aai",
				"|": "noonee",
				"<": "ah vure kuda",
				">": "ah vure bodu",
				"∑": "jumula",
				"¤": "faisaa"
			},
			en: {
				"∆": "delta",
				"∞": "infinity",
				"♥": "love",
				"&": "and",
				"|": "or",
				"<": "less than",
				">": "greater than",
				"∑": "sum",
				"¤": "currency"
			},
			es: {
				"∆": "delta",
				"∞": "infinito",
				"♥": "amor",
				"&": "y",
				"|": "u",
				"<": "menos que",
				">": "mas que",
				"∑": "suma de los",
				"¤": "moneda"
			},
			fa: {
				"∆": "delta",
				"∞": "bi-nahayat",
				"♥": "eshgh",
				"&": "va",
				"|": "ya",
				"<": "kamtar-az",
				">": "bishtar-az",
				"∑": "majmooe",
				"¤": "vahed"
			},
			fi: {
				"∆": "delta",
				"∞": "aarettomyys",
				"♥": "rakkaus",
				"&": "ja",
				"|": "tai",
				"<": "pienempi kuin",
				">": "suurempi kuin",
				"∑": "summa",
				"¤": "valuutta"
			},
			fr: {
				"∆": "delta",
				"∞": "infiniment",
				"♥": "Amour",
				"&": "et",
				"|": "ou",
				"<": "moins que",
				">": "superieure a",
				"∑": "somme des",
				"¤": "monnaie"
			},
			ge: {
				"∆": "delta",
				"∞": "usasruloba",
				"♥": "siqvaruli",
				"&": "da",
				"|": "an",
				"<": "naklebi",
				">": "meti",
				"∑": "jami",
				"¤": "valuta"
			},
			gr: {},
			hu: {
				"∆": "delta",
				"∞": "vegtelen",
				"♥": "szerelem",
				"&": "es",
				"|": "vagy",
				"<": "kisebb mint",
				">": "nagyobb mint",
				"∑": "szumma",
				"¤": "penznem"
			},
			it: {
				"∆": "delta",
				"∞": "infinito",
				"♥": "amore",
				"&": "e",
				"|": "o",
				"<": "minore di",
				">": "maggiore di",
				"∑": "somma",
				"¤": "moneta"
			},
			lt: {
				"∆": "delta",
				"∞": "begalybe",
				"♥": "meile",
				"&": "ir",
				"|": "ar",
				"<": "maziau nei",
				">": "daugiau nei",
				"∑": "suma",
				"¤": "valiuta"
			},
			lv: {
				"∆": "delta",
				"∞": "bezgaliba",
				"♥": "milestiba",
				"&": "un",
				"|": "vai",
				"<": "mazak neka",
				">": "lielaks neka",
				"∑": "summa",
				"¤": "valuta"
			},
			my: {
				"∆": "kwahkhyaet",
				"∞": "asaonasme",
				"♥": "akhyait",
				"&": "nhin",
				"|": "tho",
				"<": "ngethaw",
				">": "kyithaw",
				"∑": "paungld",
				"¤": "ngwekye"
			},
			mk: {},
			nl: {
				"∆": "delta",
				"∞": "oneindig",
				"♥": "liefde",
				"&": "en",
				"|": "of",
				"<": "kleiner dan",
				">": "groter dan",
				"∑": "som",
				"¤": "valuta"
			},
			pl: {
				"∆": "delta",
				"∞": "nieskonczonosc",
				"♥": "milosc",
				"&": "i",
				"|": "lub",
				"<": "mniejsze niz",
				">": "wieksze niz",
				"∑": "suma",
				"¤": "waluta"
			},
			pt: {
				"∆": "delta",
				"∞": "infinito",
				"♥": "amor",
				"&": "e",
				"|": "ou",
				"<": "menor que",
				">": "maior que",
				"∑": "soma",
				"¤": "moeda"
			},
			ro: {
				"∆": "delta",
				"∞": "infinit",
				"♥": "dragoste",
				"&": "si",
				"|": "sau",
				"<": "mai mic ca",
				">": "mai mare ca",
				"∑": "suma",
				"¤": "valuta"
			},
			ru: {
				"∆": "delta",
				"∞": "beskonechno",
				"♥": "lubov",
				"&": "i",
				"|": "ili",
				"<": "menshe",
				">": "bolshe",
				"∑": "summa",
				"¤": "valjuta"
			},
			sk: {
				"∆": "delta",
				"∞": "nekonecno",
				"♥": "laska",
				"&": "a",
				"|": "alebo",
				"<": "menej ako",
				">": "viac ako",
				"∑": "sucet",
				"¤": "mena"
			},
			sr: {},
			tr: {
				"∆": "delta",
				"∞": "sonsuzluk",
				"♥": "ask",
				"&": "ve",
				"|": "veya",
				"<": "kucuktur",
				">": "buyuktur",
				"∑": "toplam",
				"¤": "para birimi"
			},
			uk: {
				"∆": "delta",
				"∞": "bezkinechnist",
				"♥": "lubov",
				"&": "i",
				"|": "abo",
				"<": "menshe",
				">": "bilshe",
				"∑": "suma",
				"¤": "valjuta"
			},
			vn: {
				"∆": "delta",
				"∞": "vo cuc",
				"♥": "yeu",
				"&": "va",
				"|": "hoac",
				"<": "nho hon",
				">": "lon hon",
				"∑": "tong",
				"¤": "tien te"
			}
		}, s = [
			";",
			"?",
			":",
			"@",
			"&",
			"=",
			"+",
			"$",
			",",
			"/"
		].join(""), c = [
			";",
			"?",
			":",
			"@",
			"&",
			"=",
			"+",
			"$",
			","
		].join(""), l = [
			".",
			"!",
			"~",
			"*",
			"'",
			"(",
			")"
		].join(""), u = function(e, t) {
			var u = "-", d = "", m = "", h = !0, g = {}, _, v, y, b, x, ee, S, C, te, ne, w, re, ie, ae, T = "";
			if (typeof e != "string") return "";
			if (typeof t == "string" && (u = t), S = o.en, C = a.en, typeof t == "object") for (w in _ = t.maintainCase || !1, g = t.custom && typeof t.custom == "object" ? t.custom : g, y = +t.truncate > 1 && t.truncate || !1, b = t.uric || !1, x = t.uricNoSlash || !1, ee = t.mark || !1, h = !(t.symbols === !1 || t.lang === !1), u = t.separator || u, b && (T += s), x && (T += c), ee && (T += l), S = t.lang && o[t.lang] && h ? o[t.lang] : h ? o.en : {}, C = t.lang && a[t.lang] ? a[t.lang] : t.lang === !1 || t.lang === !0 ? {} : a.en, t.titleCase && typeof t.titleCase.length == "number" && Array.prototype.toString.call(t.titleCase) ? (t.titleCase.forEach(function(e) {
				g[e + ""] = e + "";
			}), v = !0) : v = !!t.titleCase, t.custom && typeof t.custom.length == "number" && Array.prototype.toString.call(t.custom) && t.custom.forEach(function(e) {
				g[e + ""] = e + "";
			}), Object.keys(g).forEach(function(t) {
				var n = t.length > 1 ? RegExp("\\b" + f(t) + "\\b", "gi") : new RegExp(f(t), "gi");
				e = e.replace(n, g[t]);
			}), g) T += w;
			for (T += u, T = f(T), e = e.replace(/(^\s+|\s+$)/g, ""), ie = !1, ae = !1, ne = 0, re = e.length; ne < re; ne++) w = e[ne], p(w, g) ? ie = !1 : C[w] ? (w = ie && C[w].match(/[A-Za-z0-9]/) ? " " + C[w] : C[w], ie = !1) : w in n ? (ne + 1 < re && r.indexOf(e[ne + 1]) >= 0 ? (m += w, w = "") : ae === !0 ? (w = i[m] + n[w], m = "") : w = ie && n[w].match(/[A-Za-z0-9]/) ? " " + n[w] : n[w], ie = !1, ae = !1) : w in i ? (m += w, w = "", ne === re - 1 && (w = i[m]), ae = !0) : S[w] && !(b && s.indexOf(w) !== -1) && !(x && c.indexOf(w) !== -1) ? (w = ie || d.substr(-1).match(/[A-Za-z0-9]/) ? u + S[w] : S[w], w += e[ne + 1] !== void 0 && e[ne + 1].match(/[A-Za-z0-9]/) ? u : "", ie = !0) : (ae === !0 ? (w = i[m] + w, m = "", ae = !1) : ie && (/[A-Za-z0-9]/.test(w) || d.substr(-1).match(/A-Za-z0-9]/)) && (w = " " + w), ie = !1), d += w.replace(RegExp("[^\\w\\s" + T + "_-]", "g"), u);
			return v && (d = d.replace(/(\w)(\S*)/g, function(e, t, n) {
				var r = t.toUpperCase() + (n === null ? "" : n);
				return Object.keys(g).indexOf(r.toLowerCase()) < 0 ? r : r.toLowerCase();
			})), d = d.replace(/\s+/g, u).replace(RegExp("\\" + u + "+", "g"), u).replace(RegExp("(^\\" + u + "+|\\" + u + "+$)", "g"), ""), y && d.length > y && (te = d.charAt(y) === u, d = d.slice(0, y), te || (d = d.slice(0, d.lastIndexOf(u)))), !_ && !v && (d = d.toLowerCase()), d;
		}, d = function(e) {
			return function(t) {
				return u(t, e);
			};
		}, f = function(e) {
			return e.replace(/[-\\^$*+?.()|[\]{}\/]/g, "\\$&");
		}, p = function(e, t) {
			for (var n in t) if (t[n] === e) return !0;
		};
		if (t !== void 0 && t.exports) t.exports = u, t.exports.createSlug = d;
		else if (typeof define < "u" && define.amd) define([], function() {
			return u;
		});
		else try {
			if (e.getSlug || e.createSlug) throw "speakingurl: globals exists /(getSlug|createSlug)/";
			e.getSlug = u, e.createSlug = d;
		} catch {}
	})(e);
} }), Bu = Iu({ "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/index.js"(e, t) {
	J(), t.exports = zu();
} });
J(), J(), J(), J(), J(), J(), J(), J();
function Vu(e) {
	let t = e.name || e._componentTag || e.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || e.__name;
	return t === "index" && e.__file?.endsWith("index.vue") ? "" : t;
}
function Hu(e) {
	let t = e.__file;
	if (t) return hu(gu(t, ".vue"));
}
function Uu(e, t) {
	return e.type.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ = t, t;
}
function Wu(e) {
	if (e.__VUE_DEVTOOLS_NEXT_APP_RECORD__) return e.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
	if (e.root) return e.appContext.app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
}
function Gu(e) {
	let t = e.subTree?.type, n = Wu(e);
	return n ? n?.types?.Fragment === t : !1;
}
function Ku(e) {
	let t = Vu(e?.type || {});
	if (t) return t;
	if (e?.root === e) return "Root";
	for (let t in e.parent?.type?.components) if (e.parent.type.components[t] === e?.type) return Uu(e, t);
	for (let t in e.appContext?.components) if (e.appContext.components[t] === e?.type) return Uu(e, t);
	return Hu(e?.type || {}) || "Anonymous Component";
}
function qu(e) {
	return `${e?.appContext?.app?.__VUE_DEVTOOLS_NEXT_APP_RECORD_ID__ ?? 0}:${e === e?.root ? "root" : e.uid}`;
}
function Ju(e, t) {
	return t ||= `${e.id}:root`, e.instanceMap.get(t) || e.instanceMap.get(":root");
}
function Yu() {
	let e = {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		get width() {
			return e.right - e.left;
		},
		get height() {
			return e.bottom - e.top;
		}
	};
	return e;
}
var Xu;
function Zu(e) {
	return Xu ||= document.createRange(), Xu.selectNode(e), Xu.getBoundingClientRect();
}
function Qu(e) {
	let t = Yu();
	if (!e.children) return t;
	for (let n = 0, r = e.children.length; n < r; n++) {
		let r = e.children[n], i;
		if (r.component) i = td(r.component);
		else if (r.el) {
			let e = r.el;
			e.nodeType === 1 || e.getBoundingClientRect ? i = e.getBoundingClientRect() : e.nodeType === 3 && e.data.trim() && (i = Zu(e));
		}
		i && $u(t, i);
	}
	return t;
}
function $u(e, t) {
	return (!e.top || t.top < e.top) && (e.top = t.top), (!e.bottom || t.bottom > e.bottom) && (e.bottom = t.bottom), (!e.left || t.left < e.left) && (e.left = t.left), (!e.right || t.right > e.right) && (e.right = t.right), e;
}
var ed = {
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	width: 0,
	height: 0
};
function td(e) {
	let t = e.subTree.el;
	return typeof window > "u" ? ed : Gu(e) ? Qu(e.subTree) : t?.nodeType === 1 ? t?.getBoundingClientRect() : e.subTree.component ? td(e.subTree.component) : ed;
}
J();
function nd(e) {
	return Gu(e) ? rd(e.subTree) : e.subTree ? [e.subTree.el] : [];
}
function rd(e) {
	if (!e.children) return [];
	let t = [];
	return e.children.forEach((e) => {
		e.component ? t.push(...nd(e.component)) : e?.el && t.push(e.el);
	}), t;
}
var id = "__vue-devtools-component-inspector__", ad = "__vue-devtools-component-inspector__card__", od = "__vue-devtools-component-inspector__name__", sd = "__vue-devtools-component-inspector__indicator__", cd = {
	display: "block",
	zIndex: 2147483640,
	position: "fixed",
	backgroundColor: "#42b88325",
	border: "1px solid #42b88350",
	borderRadius: "5px",
	transition: "all 0.1s ease-in",
	pointerEvents: "none"
}, ld = {
	fontFamily: "Arial, Helvetica, sans-serif",
	padding: "5px 8px",
	borderRadius: "4px",
	textAlign: "left",
	position: "absolute",
	left: 0,
	color: "#e9e9e9",
	fontSize: "14px",
	fontWeight: 600,
	lineHeight: "24px",
	backgroundColor: "#42b883",
	boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
}, ud = {
	display: "inline-block",
	fontWeight: 400,
	fontStyle: "normal",
	fontSize: "12px",
	opacity: .7
};
function dd() {
	return document.getElementById(id);
}
function fd() {
	return document.getElementById(ad);
}
function pd() {
	return document.getElementById(sd);
}
function md() {
	return document.getElementById(od);
}
function hd(e) {
	return {
		left: `${Math.round(e.left * 100) / 100}px`,
		top: `${Math.round(e.top * 100) / 100}px`,
		width: `${Math.round(e.width * 100) / 100}px`,
		height: `${Math.round(e.height * 100) / 100}px`
	};
}
function gd(e) {
	let t = document.createElement("div");
	t.id = e.elementId ?? id, Object.assign(t.style, {
		...cd,
		...hd(e.bounds),
		...e.style
	});
	let n = document.createElement("span");
	n.id = ad, Object.assign(n.style, {
		...ld,
		top: e.bounds.top < 35 ? 0 : "-35px"
	});
	let r = document.createElement("span");
	r.id = od, r.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`;
	let i = document.createElement("i");
	return i.id = sd, i.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`, Object.assign(i.style, ud), n.appendChild(r), n.appendChild(i), t.appendChild(n), document.body.appendChild(t), t;
}
function _d(e) {
	let t = dd(), n = fd(), r = md(), i = pd();
	t && (Object.assign(t.style, {
		...cd,
		...hd(e.bounds)
	}), Object.assign(n.style, { top: e.bounds.top < 35 ? 0 : "-35px" }), r.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`, i.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`);
}
function vd(e) {
	let t = td(e);
	if (!t.width && !t.height) return;
	let n = Ku(e);
	dd() ? _d({
		bounds: t,
		name: n
	}) : gd({
		bounds: t,
		name: n
	});
}
function yd() {
	let e = dd();
	e && (e.style.display = "none");
}
var bd = null;
function xd(e) {
	let t = e.target;
	if (t) {
		let e = t.__vueParentComponent;
		if (e && (bd = e, e.vnode.el)) {
			let t = td(e), n = Ku(e);
			dd() ? _d({
				bounds: t,
				name: n
			}) : gd({
				bounds: t,
				name: n
			});
		}
	}
}
function Sd(e, t) {
	e.preventDefault(), e.stopPropagation(), bd && t(qu(bd));
}
var Cd = null;
function wd() {
	yd(), window.removeEventListener("mouseover", xd), window.removeEventListener("click", Cd, !0), Cd = null;
}
function Td() {
	return window.addEventListener("mouseover", xd), new Promise((e) => {
		function t(n) {
			n.preventDefault(), n.stopPropagation(), Sd(n, (n) => {
				window.removeEventListener("click", t, !0), Cd = null, window.removeEventListener("mouseover", xd);
				let r = dd();
				r && (r.style.display = "none"), e(JSON.stringify({ id: n }));
			});
		}
		Cd = t, window.addEventListener("click", t, !0);
	});
}
function Ed(e) {
	let t = Ju(of.value, e.id);
	if (t) {
		let [n] = nd(t);
		if (typeof n.scrollIntoView == "function") n.scrollIntoView({ behavior: "smooth" });
		else {
			let e = td(t), n = document.createElement("div"), r = {
				...hd(e),
				position: "absolute"
			};
			Object.assign(n.style, r), document.body.appendChild(n), n.scrollIntoView({ behavior: "smooth" }), setTimeout(() => {
				document.body.removeChild(n);
			}, 2e3);
		}
		setTimeout(() => {
			let n = td(t);
			if (n.width || n.height) {
				let r = Ku(t), i = dd();
				i ? _d({
					...e,
					name: r,
					bounds: n
				}) : gd({
					...e,
					name: r,
					bounds: n
				}), setTimeout(() => {
					i && (i.style.display = "none");
				}, 1500);
			}
		}, 1200);
	}
}
J();
var Dd;
(Dd = q).__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ ?? (Dd.__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ = !0);
function Od(e) {
	let t = 0, n = setInterval(() => {
		q.__VUE_INSPECTOR__ && (clearInterval(n), t += 30, e()), t >= 5e3 && clearInterval(n);
	}, 30);
}
function kd() {
	let e = q.__VUE_INSPECTOR__, t = e.openInEditor;
	e.openInEditor = async (...n) => {
		e.disable(), t(...n);
	};
}
function Ad() {
	return new Promise((e) => {
		function t() {
			kd(), e(q.__VUE_INSPECTOR__);
		}
		q.__VUE_INSPECTOR__ ? t() : Od(() => {
			t();
		});
	});
}
J(), J();
function jd(e) {
	return !!(e && e.__v_isReadonly);
}
function Md(e) {
	return jd(e) ? Md(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Nd(e) {
	return !!(e && e.__v_isRef === !0);
}
function Pd(e) {
	let t = e && e.__v_raw;
	return t ? Pd(t) : e;
}
var Fd = class {
	constructor() {
		this.refEditor = new Id();
	}
	set(e, t, n, r) {
		let i = Array.isArray(t) ? t : t.split(".");
		for (; i.length > 1;) {
			let t = i.shift();
			e = e instanceof Map ? e.get(t) : e instanceof Set ? Array.from(e.values())[t] : e[t], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
		}
		let a = i[0], o = this.refEditor.get(e)[a];
		r ? r(e, a, n) : this.refEditor.isRef(o) ? this.refEditor.set(o, n) : e[a] = n;
	}
	get(e, t) {
		let n = Array.isArray(t) ? t : t.split(".");
		for (let t = 0; t < n.length; t++) if (e = e instanceof Map ? e.get(n[t]) : e[n[t]], this.refEditor.isRef(e) && (e = this.refEditor.get(e)), !e) return;
		return e;
	}
	has(e, t, n = !1) {
		if (e === void 0) return !1;
		let r = Array.isArray(t) ? t.slice() : t.split("."), i = n ? 2 : 1;
		for (; e && r.length > i;) {
			let t = r.shift();
			e = e[t], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
		}
		return e != null && Object.prototype.hasOwnProperty.call(e, r[0]);
	}
	createDefaultSetCallback(e) {
		return (t, n, r) => {
			if ((e.remove || e.newKey) && (Array.isArray(t) ? t.splice(n, 1) : Pd(t) instanceof Map ? t.delete(n) : Pd(t) instanceof Set ? t.delete(Array.from(t.values())[n]) : Reflect.deleteProperty(t, n)), !e.remove) {
				let i = t[e.newKey || n];
				this.refEditor.isRef(i) ? this.refEditor.set(i, r) : Pd(t) instanceof Map ? t.set(e.newKey || n, r) : Pd(t) instanceof Set ? t.add(r) : t[e.newKey || n] = r;
			}
		};
	}
}, Id = class {
	set(e, t) {
		if (Nd(e)) e.value = t;
		else {
			if (e instanceof Set && Array.isArray(t)) {
				e.clear(), t.forEach((t) => e.add(t));
				return;
			}
			let n = Object.keys(t);
			if (e instanceof Map) {
				let r = new Set(e.keys());
				n.forEach((n) => {
					e.set(n, Reflect.get(t, n)), r.delete(n);
				}), r.forEach((t) => e.delete(t));
				return;
			}
			let r = new Set(Object.keys(e));
			n.forEach((n) => {
				Reflect.set(e, n, Reflect.get(t, n)), r.delete(n);
			}), r.forEach((t) => Reflect.deleteProperty(e, t));
		}
	}
	get(e) {
		return Nd(e) ? e.value : e;
	}
	isRef(e) {
		return Nd(e) || Md(e);
	}
};
new Fd(), J(), J(), J();
var Ld = "__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__";
function Rd() {
	if (typeof window > "u" || !du || typeof localStorage > "u" || localStorage === null) return {
		recordingState: !1,
		mouseEventEnabled: !1,
		keyboardEventEnabled: !1,
		componentEventEnabled: !1,
		performanceEventEnabled: !1,
		selected: ""
	};
	let e = localStorage.getItem === void 0 ? null : localStorage.getItem(Ld);
	return e ? JSON.parse(e) : {
		recordingState: !1,
		mouseEventEnabled: !1,
		keyboardEventEnabled: !1,
		componentEventEnabled: !1,
		performanceEventEnabled: !1,
		selected: ""
	};
}
J(), J(), J();
var zd;
(zd = q).__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS ?? (zd.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS = []);
var Bd = new Proxy(q.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS, { get(e, t, n) {
	return Reflect.get(e, t, n);
} });
function Vd(e, t) {
	Y.timelineLayersState[t.id] = !1, Bd.push({
		...e,
		descriptorId: t.id,
		appRecord: Wu(t.app)
	});
}
var Hd;
(Hd = q).__VUE_DEVTOOLS_KIT_INSPECTOR__ ?? (Hd.__VUE_DEVTOOLS_KIT_INSPECTOR__ = []);
var Ud = new Proxy(q.__VUE_DEVTOOLS_KIT_INSPECTOR__, { get(e, t, n) {
	return Reflect.get(e, t, n);
} }), Wd = yu(() => {
	Uf.hooks.callHook("sendInspectorToClient", Kd());
});
function Gd(e, t) {
	Ud.push({
		options: e,
		descriptor: t,
		treeFilterPlaceholder: e.treeFilterPlaceholder ?? "Search tree...",
		stateFilterPlaceholder: e.stateFilterPlaceholder ?? "Search state...",
		treeFilter: "",
		selectedNodeId: "",
		appRecord: Wu(t.app)
	}), Wd();
}
function Kd() {
	return Ud.filter((e) => e.descriptor.app === of.value.app).filter((e) => e.descriptor.id !== "components").map((e) => {
		let t = e.descriptor, n = e.options;
		return {
			id: n.id,
			label: n.label,
			logo: t.logo,
			icon: `custom-ic-baseline-${(n?.icon)?.replace(/_/g, "-")}`,
			packageName: t.packageName,
			homepage: t.homepage,
			pluginId: t.id
		};
	});
}
function qd(e, t) {
	return Ud.find((n) => n.options.id === e && (t ? n.descriptor.app === t : !0));
}
function Jd() {
	let e = Ou();
	e.hook("addInspector", ({ inspector: e, plugin: t }) => {
		Gd(e, t.descriptor);
	});
	let t = yu(async ({ inspectorId: t, plugin: n }) => {
		if (!t || !n?.descriptor?.app || Y.highPerfModeEnabled) return;
		let r = qd(t, n.descriptor.app), i = {
			app: n.descriptor.app,
			inspectorId: t,
			filter: r?.treeFilter || "",
			rootNodes: []
		};
		await new Promise((t) => {
			e.callHookWith(async (e) => {
				await Promise.all(e.map((e) => e(i))), t();
			}, "getInspectorTree");
		}), e.callHookWith(async (e) => {
			await Promise.all(e.map((e) => e({
				inspectorId: t,
				rootNodes: i.rootNodes
			})));
		}, "sendInspectorTreeToClient");
	}, 120);
	e.hook("sendInspectorTree", t);
	let n = yu(async ({ inspectorId: t, plugin: n }) => {
		if (!t || !n?.descriptor?.app || Y.highPerfModeEnabled) return;
		let r = qd(t, n.descriptor.app), i = {
			app: n.descriptor.app,
			inspectorId: t,
			nodeId: r?.selectedNodeId || "",
			state: null
		}, a = { currentTab: `custom-inspector:${t}` };
		i.nodeId && await new Promise((t) => {
			e.callHookWith(async (e) => {
				await Promise.all(e.map((e) => e(i, a))), t();
			}, "getInspectorState");
		}), e.callHookWith(async (e) => {
			await Promise.all(e.map((e) => e({
				inspectorId: t,
				nodeId: i.nodeId,
				state: i.state
			})));
		}, "sendInspectorStateToClient");
	}, 120);
	return e.hook("sendInspectorState", n), e.hook("customInspectorSelectNode", ({ inspectorId: e, nodeId: t, plugin: n }) => {
		let r = qd(e, n.descriptor.app);
		r && (r.selectedNodeId = t);
	}), e.hook("timelineLayerAdded", ({ options: e, plugin: t }) => {
		Vd(e, t.descriptor);
	}), e.hook("timelineEventAdded", ({ options: t, plugin: n }) => {
		Y.highPerfModeEnabled || !Y.timelineLayersState?.[n.descriptor.id] && ![
			"performance",
			"component-event",
			"keyboard",
			"mouse"
		].includes(t.layerId) || e.callHookWith(async (e) => {
			await Promise.all(e.map((e) => e(t)));
		}, "sendTimelineEventToClient");
	}), e.hook("getComponentInstances", async ({ app: e }) => {
		let t = e.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
		if (!t) return null;
		let n = t.id.toString();
		return [...t.instanceMap].filter(([e]) => e.split(":")[0] === n).map(([, e]) => e);
	}), e.hook("getComponentBounds", async ({ instance: e }) => td(e)), e.hook("getComponentName", ({ instance: e }) => Ku(e)), e.hook("componentHighlight", ({ uid: e }) => {
		let t = of.value.instanceMap.get(e);
		t && vd(t);
	}), e.hook("componentUnhighlight", () => {
		yd();
	}), e;
}
var Yd;
(Yd = q).__VUE_DEVTOOLS_KIT_APP_RECORDS__ ?? (Yd.__VUE_DEVTOOLS_KIT_APP_RECORDS__ = []);
var Xd;
(Xd = q).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ ?? (Xd.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = {});
var Zd;
(Zd = q).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ ?? (Zd.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = "");
var Qd;
(Qd = q).__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ ?? (Qd.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ = []);
var $d;
($d = q).__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ ?? ($d.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ = []);
var ef = "__VUE_DEVTOOLS_KIT_GLOBAL_STATE__";
function tf() {
	return {
		connected: !1,
		clientConnected: !1,
		vitePluginDetected: !0,
		appRecords: [],
		activeAppRecordId: "",
		tabs: [],
		commands: [],
		highPerfModeEnabled: !0,
		devtoolsClientDetected: {},
		perfUniqueGroupId: 0,
		timelineLayersState: Rd()
	};
}
var nf;
(nf = q)[ef] ?? (nf[ef] = tf());
var rf = yu((e) => {
	Uf.hooks.callHook("devtoolsStateUpdated", { state: e });
});
yu((e, t) => {
	Uf.hooks.callHook("devtoolsConnectedUpdated", {
		state: e,
		oldState: t
	});
});
var af = new Proxy(q.__VUE_DEVTOOLS_KIT_APP_RECORDS__, { get(e, t, n) {
	return t === "value" ? q.__VUE_DEVTOOLS_KIT_APP_RECORDS__ : q.__VUE_DEVTOOLS_KIT_APP_RECORDS__[t];
} }), of = new Proxy(q.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__, { get(e, t, n) {
	return t === "value" ? q.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ : t === "id" ? q.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ : q.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__[t];
} });
function sf() {
	rf({
		...q[ef],
		appRecords: af.value,
		activeAppRecordId: of.id,
		tabs: q.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__,
		commands: q.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__
	});
}
function cf(e) {
	q.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = e, sf();
}
function lf(e) {
	q.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = e, sf();
}
var Y = new Proxy(q[ef], {
	get(e, t) {
		return t === "appRecords" ? af : t === "activeAppRecordId" ? of.id : t === "tabs" ? q.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ : t === "commands" ? q.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ : q[ef][t];
	},
	deleteProperty(e, t) {
		return delete e[t], !0;
	},
	set(e, t, n) {
		return { ...q[ef] }, e[t] = n, q[ef][t] = n, !0;
	}
});
function uf(e = {}) {
	let { file: t, host: n, baseUrl: r = window.location.origin, line: i = 0, column: a = 0 } = e;
	if (t) {
		if (n === "chrome-extension") {
			let e = t.replace(/\\/g, "\\\\"), n = window.VUE_DEVTOOLS_CONFIG?.openInEditorHost ?? "/";
			fetch(`${n}__open-in-editor?file=${encodeURI(t)}`).then((t) => {
				if (!t.ok) {
					let t = `Opening component ${e} failed`;
					console.log(`%c${t}`, "color:red");
				}
			});
		} else if (Y.vitePluginDetected) {
			let e = q.__VUE_DEVTOOLS_OPEN_IN_EDITOR_BASE_URL__ ?? r;
			q.__VUE_INSPECTOR__.openInEditor(e, t, i, a);
		}
	}
}
J(), J(), J(), J(), J();
var df;
(df = q).__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ ?? (df.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ = []);
var ff = new Proxy(q.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__, { get(e, t, n) {
	return Reflect.get(e, t, n);
} });
function pf(e) {
	let t = {};
	return Object.keys(e).forEach((n) => {
		t[n] = e[n].defaultValue;
	}), t;
}
function mf(e) {
	return `__VUE_DEVTOOLS_NEXT_PLUGIN_SETTINGS__${e}__`;
}
function hf(e) {
	return (ff.find((t) => t[0].id === e && !!t[0]?.settings)?.[0] ?? null)?.settings ?? null;
}
function gf(e, t) {
	let n = mf(e);
	if (n) {
		let e = localStorage.getItem(n);
		if (e) return JSON.parse(e);
	}
	return pf(e ? (ff.find((t) => t[0].id === e)?.[0] ?? null)?.settings ?? {} : t);
}
function _f(e, t) {
	let n = mf(e);
	localStorage.getItem(n) || localStorage.setItem(n, JSON.stringify(pf(t)));
}
function vf(e, t, n) {
	let r = mf(e), i = localStorage.getItem(r), a = JSON.parse(i || "{}"), o = {
		...a,
		[t]: n
	};
	localStorage.setItem(r, JSON.stringify(o)), Uf.hooks.callHookWith((r) => {
		r.forEach((r) => r({
			pluginId: e,
			key: t,
			oldValue: a[t],
			newValue: n,
			settings: o
		}));
	}, "setPluginSettings");
}
J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J();
var yf, bf = (yf = q).__VUE_DEVTOOLS_HOOK ?? (yf.__VUE_DEVTOOLS_HOOK = Ou()), xf = {
	on: {
		vueAppInit(e) {
			bf.hook("app:init", e);
		},
		vueAppUnmount(e) {
			bf.hook("app:unmount", e);
		},
		vueAppConnected(e) {
			bf.hook("app:connected", e);
		},
		componentAdded(e) {
			return bf.hook("component:added", e);
		},
		componentEmit(e) {
			return bf.hook("component:emit", e);
		},
		componentUpdated(e) {
			return bf.hook("component:updated", e);
		},
		componentRemoved(e) {
			return bf.hook("component:removed", e);
		},
		setupDevtoolsPlugin(e) {
			bf.hook("devtools-plugin:setup", e);
		},
		perfStart(e) {
			return bf.hook("perf:start", e);
		},
		perfEnd(e) {
			return bf.hook("perf:end", e);
		}
	},
	setupDevToolsPlugin(e, t) {
		return bf.callHook("devtools-plugin:setup", e, t);
	}
}, Sf = class {
	constructor({ plugin: e, ctx: t }) {
		this.hooks = t.hooks, this.plugin = e;
	}
	get on() {
		return {
			visitComponentTree: (e) => {
				this.hooks.hook("visitComponentTree", e);
			},
			inspectComponent: (e) => {
				this.hooks.hook("inspectComponent", e);
			},
			editComponentState: (e) => {
				this.hooks.hook("editComponentState", e);
			},
			getInspectorTree: (e) => {
				this.hooks.hook("getInspectorTree", e);
			},
			getInspectorState: (e) => {
				this.hooks.hook("getInspectorState", e);
			},
			editInspectorState: (e) => {
				this.hooks.hook("editInspectorState", e);
			},
			inspectTimelineEvent: (e) => {
				this.hooks.hook("inspectTimelineEvent", e);
			},
			timelineCleared: (e) => {
				this.hooks.hook("timelineCleared", e);
			},
			setPluginSettings: (e) => {
				this.hooks.hook("setPluginSettings", e);
			}
		};
	}
	notifyComponentUpdate(e) {
		if (Y.highPerfModeEnabled) return;
		let t = Kd().find((e) => e.packageName === this.plugin.descriptor.packageName);
		if (t?.id) {
			if (e) {
				let t = [
					e.appContext.app,
					e.uid,
					e.parent?.uid,
					e
				];
				bf.callHook("component:updated", ...t);
			} else bf.callHook("component:updated");
			this.hooks.callHook("sendInspectorState", {
				inspectorId: t.id,
				plugin: this.plugin
			});
		}
	}
	addInspector(e) {
		this.hooks.callHook("addInspector", {
			inspector: e,
			plugin: this.plugin
		}), this.plugin.descriptor.settings && _f(e.id, this.plugin.descriptor.settings);
	}
	sendInspectorTree(e) {
		Y.highPerfModeEnabled || this.hooks.callHook("sendInspectorTree", {
			inspectorId: e,
			plugin: this.plugin
		});
	}
	sendInspectorState(e) {
		Y.highPerfModeEnabled || this.hooks.callHook("sendInspectorState", {
			inspectorId: e,
			plugin: this.plugin
		});
	}
	selectInspectorNode(e, t) {
		this.hooks.callHook("customInspectorSelectNode", {
			inspectorId: e,
			nodeId: t,
			plugin: this.plugin
		});
	}
	visitComponentTree(e) {
		return this.hooks.callHook("visitComponentTree", e);
	}
	now() {
		return Y.highPerfModeEnabled ? 0 : Date.now();
	}
	addTimelineLayer(e) {
		this.hooks.callHook("timelineLayerAdded", {
			options: e,
			plugin: this.plugin
		});
	}
	addTimelineEvent(e) {
		Y.highPerfModeEnabled || this.hooks.callHook("timelineEventAdded", {
			options: e,
			plugin: this.plugin
		});
	}
	getSettings(e) {
		return gf(e ?? this.plugin.descriptor.id, this.plugin.descriptor.settings);
	}
	getComponentInstances(e) {
		return this.hooks.callHook("getComponentInstances", { app: e });
	}
	getComponentBounds(e) {
		return this.hooks.callHook("getComponentBounds", { instance: e });
	}
	getComponentName(e) {
		return this.hooks.callHook("getComponentName", { instance: e });
	}
	highlightElement(e) {
		let t = e.__VUE_DEVTOOLS_NEXT_UID__;
		return this.hooks.callHook("componentHighlight", { uid: t });
	}
	unhighlightElement() {
		return this.hooks.callHook("componentUnhighlight");
	}
};
J(), J(), J(), J();
var Cf = "__vue_devtool_undefined__", wf = "__vue_devtool_infinity__", Tf = "__vue_devtool_negative_infinity__", Ef = "__vue_devtool_nan__";
J(), J(), Object.entries({
	[Cf]: "undefined",
	[Ef]: "NaN",
	[wf]: "Infinity",
	[Tf]: "-Infinity"
}).reduce((e, [t, n]) => (e[n] = t, e), {}), J(), J(), J(), J(), J();
var Df;
(Df = q).__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ ?? (Df.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ = /* @__PURE__ */ new Set());
function Of(e, t) {
	return xf.setupDevToolsPlugin(e, t);
}
function kf(e, t) {
	let [n, r] = e;
	if (n.app !== t) return;
	let i = new Sf({
		plugin: {
			setupFn: r,
			descriptor: n
		},
		ctx: Uf
	});
	n.packageName === "vuex" && i.on.editInspectorState((e) => {
		i.sendInspectorState(e.inspectorId);
	}), r(i);
}
function Af(e, t) {
	q.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.has(e) || Y.highPerfModeEnabled && !t?.inspectingComponent || (q.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.add(e), ff.forEach((t) => {
		kf(t, e);
	}));
}
J(), J();
var jf = "__VUE_DEVTOOLS_ROUTER__", Mf = "__VUE_DEVTOOLS_ROUTER_INFO__", Nf;
(Nf = q).__VUE_DEVTOOLS_ROUTER_INFO__ ?? (Nf.__VUE_DEVTOOLS_ROUTER_INFO__ = {
	currentRoute: null,
	routes: []
});
var Pf;
(Pf = q).__VUE_DEVTOOLS_ROUTER__ ?? (Pf.__VUE_DEVTOOLS_ROUTER__ = {}), new Proxy(q[Mf], { get(e, t) {
	return q[Mf][t];
} }), new Proxy(q[jf], { get(e, t) {
	if (t === "value") return q[jf];
} });
function Ff(e) {
	let t = /* @__PURE__ */ new Map();
	return (e?.getRoutes() || []).filter((e) => !t.has(e.path) && t.set(e.path, 1));
}
function If(e) {
	return e.map((e) => {
		let { path: t, name: n, children: r, meta: i } = e;
		return r?.length && (r = If(r)), {
			path: t,
			name: n,
			children: r,
			meta: i
		};
	});
}
function Lf(e) {
	if (e) {
		let { fullPath: t, hash: n, href: r, path: i, name: a, matched: o, params: s, query: c } = e;
		return {
			fullPath: t,
			hash: n,
			href: r,
			path: i,
			name: a,
			params: s,
			query: c,
			matched: If(o)
		};
	}
	return e;
}
function Rf(e, t) {
	function n() {
		let t = e.app?.config.globalProperties.$router, n = Lf(t?.currentRoute.value), r = If(Ff(t)), i = console.warn;
		console.warn = () => {}, q[Mf] = {
			currentRoute: n ? _u(n) : {},
			routes: _u(r)
		}, q[jf] = t, console.warn = i;
	}
	n(), xf.on.componentUpdated(yu(() => {
		t.value?.app === e.app && (n(), !Y.highPerfModeEnabled && Uf.hooks.callHook("routerInfoUpdated", { state: q[Mf] }));
	}, 200));
}
function zf(e) {
	return {
		async getInspectorTree(t) {
			let n = {
				...t,
				app: of.value.app,
				rootNodes: []
			};
			return await new Promise((t) => {
				e.callHookWith(async (e) => {
					await Promise.all(e.map((e) => e(n))), t();
				}, "getInspectorTree");
			}), n.rootNodes;
		},
		async getInspectorState(t) {
			let n = {
				...t,
				app: of.value.app,
				state: null
			}, r = { currentTab: `custom-inspector:${t.inspectorId}` };
			return await new Promise((t) => {
				e.callHookWith(async (e) => {
					await Promise.all(e.map((e) => e(n, r))), t();
				}, "getInspectorState");
			}), n.state;
		},
		editInspectorState(t) {
			let n = new Fd(), r = {
				...t,
				app: of.value.app,
				set: (e, r = t.path, i = t.state.value, a) => {
					n.set(e, r, i, a || n.createDefaultSetCallback(t.state));
				}
			};
			e.callHookWith((e) => {
				e.forEach((e) => e(r));
			}, "editInspectorState");
		},
		sendInspectorState(t) {
			let n = qd(t);
			e.callHook("sendInspectorState", {
				inspectorId: t,
				plugin: {
					descriptor: n.descriptor,
					setupFn: () => ({})
				}
			});
		},
		inspectComponentInspector() {
			return Td();
		},
		cancelInspectComponentInspector() {
			return wd();
		},
		getComponentRenderCode(e) {
			let t = Ju(of.value, e);
			if (t) return typeof t?.type == "function" ? t.type.toString() : t.render.toString();
		},
		scrollToComponent(e) {
			return Ed({ id: e });
		},
		openInEditor: uf,
		getVueInspector: Ad,
		toggleApp(e, t) {
			let n = af.value.find((t) => t.id === e);
			n && (lf(e), cf(n), Rf(n, of), Wd(), Af(n.app, t));
		},
		inspectDOM(e) {
			let t = Ju(of.value, e);
			if (t) {
				let [e] = nd(t);
				e && (q.__VUE_DEVTOOLS_INSPECT_DOM_TARGET__ = e);
			}
		},
		updatePluginSettings(e, t, n) {
			vf(e, t, n);
		},
		getPluginSettings(e) {
			return {
				options: hf(e),
				values: gf(e)
			};
		}
	};
}
J();
var Bf;
(Bf = q).__VUE_DEVTOOLS_ENV__ ?? (Bf.__VUE_DEVTOOLS_ENV__ = { vitePluginDetected: !1 });
var Vf = Jd(), Hf;
(Hf = q).__VUE_DEVTOOLS_KIT_CONTEXT__ ?? (Hf.__VUE_DEVTOOLS_KIT_CONTEXT__ = {
	hooks: Vf,
	get state() {
		return {
			...Y,
			activeAppRecordId: of.id,
			activeAppRecord: of.value,
			appRecords: af.value
		};
	},
	api: zf(Vf)
});
var Uf = q.__VUE_DEVTOOLS_KIT_CONTEXT__;
J(), Ru(Bu(), 1);
var Wf;
(Wf = q).__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ ?? (Wf.__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ = {
	id: 0,
	appIds: /* @__PURE__ */ new Set()
}), J(), J();
function Gf(e) {
	Y.highPerfModeEnabled = e ?? !Y.highPerfModeEnabled, !e && of.value && Af(of.value.app);
}
J(), J(), J();
function Kf(e) {
	Y.devtoolsClientDetected = {
		...Y.devtoolsClientDetected,
		...e
	}, Gf(!Object.values(Y.devtoolsClientDetected).some(Boolean));
}
var qf;
(qf = q).__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ ?? (qf.__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ = Kf), J(), J(), J(), J(), J(), J(), J();
var Jf = class {
	constructor() {
		this.keyToValue = /* @__PURE__ */ new Map(), this.valueToKey = /* @__PURE__ */ new Map();
	}
	set(e, t) {
		this.keyToValue.set(e, t), this.valueToKey.set(t, e);
	}
	getByKey(e) {
		return this.keyToValue.get(e);
	}
	getByValue(e) {
		return this.valueToKey.get(e);
	}
	clear() {
		this.keyToValue.clear(), this.valueToKey.clear();
	}
}, Yf = class {
	constructor(e) {
		this.generateIdentifier = e, this.kv = new Jf();
	}
	register(e, t) {
		this.kv.getByValue(e) || (t ||= this.generateIdentifier(e), this.kv.set(t, e));
	}
	clear() {
		this.kv.clear();
	}
	getIdentifier(e) {
		return this.kv.getByValue(e);
	}
	getValue(e) {
		return this.kv.getByKey(e);
	}
}, Xf = class extends Yf {
	constructor() {
		super((e) => e.name), this.classToAllowedProps = /* @__PURE__ */ new Map();
	}
	register(e, t) {
		typeof t == "object" ? (t.allowProps && this.classToAllowedProps.set(e, t.allowProps), super.register(e, t.identifier)) : super.register(e, t);
	}
	getAllowedProps(e) {
		return this.classToAllowedProps.get(e);
	}
};
J(), J();
function Zf(e) {
	if ("values" in Object) return Object.values(e);
	let t = [];
	for (let n in e) e.hasOwnProperty(n) && t.push(e[n]);
	return t;
}
function Qf(e, t) {
	let n = Zf(e);
	if ("find" in n) return n.find(t);
	let r = n;
	for (let e = 0; e < r.length; e++) {
		let n = r[e];
		if (t(n)) return n;
	}
}
function $f(e, t) {
	Object.entries(e).forEach(([e, n]) => t(n, e));
}
function ep(e, t) {
	return e.indexOf(t) !== -1;
}
function tp(e, t) {
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (t(r)) return r;
	}
}
var np = class {
	constructor() {
		this.transfomers = {};
	}
	register(e) {
		this.transfomers[e.name] = e;
	}
	findApplicable(e) {
		return Qf(this.transfomers, (t) => t.isApplicable(e));
	}
	findByName(e) {
		return this.transfomers[e];
	}
};
J(), J();
var rp = (e) => Object.prototype.toString.call(e).slice(8, -1), ip = (e) => e === void 0, ap = (e) => e === null, op = (e) => typeof e != "object" || !e || e === Object.prototype ? !1 : Object.getPrototypeOf(e) === null ? !0 : Object.getPrototypeOf(e) === Object.prototype, sp = (e) => op(e) && Object.keys(e).length === 0, cp = (e) => Array.isArray(e), lp = (e) => typeof e == "string", up = (e) => typeof e == "number" && !isNaN(e), dp = (e) => typeof e == "boolean", fp = (e) => e instanceof RegExp, pp = (e) => e instanceof Map, mp = (e) => e instanceof Set, hp = (e) => rp(e) === "Symbol", gp = (e) => e instanceof Date && !isNaN(e.valueOf()), _p = (e) => e instanceof Error, vp = (e) => typeof e == "number" && isNaN(e), yp = (e) => dp(e) || ap(e) || ip(e) || up(e) || lp(e) || hp(e), bp = (e) => typeof e == "bigint", xp = (e) => e === Infinity || e === -Infinity, Sp = (e) => ArrayBuffer.isView(e) && !(e instanceof DataView), Cp = (e) => e instanceof URL;
J();
var wp = (e) => e.replace(/\./g, "\\."), Tp = (e) => e.map(String).map(wp).join("."), Ep = (e) => {
	let t = [], n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e.charAt(r);
		if (i === "\\" && e.charAt(r + 1) === ".") {
			n += ".", r++;
			continue;
		}
		if (i === ".") {
			t.push(n), n = "";
			continue;
		}
		n += i;
	}
	let r = n;
	return t.push(r), t;
};
J();
function Dp(e, t, n, r) {
	return {
		isApplicable: e,
		annotation: t,
		transform: n,
		untransform: r
	};
}
var Op = [
	Dp(ip, "undefined", () => null, () => void 0),
	Dp(bp, "bigint", (e) => e.toString(), (e) => typeof BigInt < "u" ? BigInt(e) : (console.error("Please add a BigInt polyfill."), e)),
	Dp(gp, "Date", (e) => e.toISOString(), (e) => new Date(e)),
	Dp(_p, "Error", (e, t) => {
		let n = {
			name: e.name,
			message: e.message
		};
		return t.allowedErrorProps.forEach((t) => {
			n[t] = e[t];
		}), n;
	}, (e, t) => {
		let n = Error(e.message);
		return n.name = e.name, n.stack = e.stack, t.allowedErrorProps.forEach((t) => {
			n[t] = e[t];
		}), n;
	}),
	Dp(fp, "regexp", (e) => "" + e, (e) => {
		let t = e.slice(1, e.lastIndexOf("/")), n = e.slice(e.lastIndexOf("/") + 1);
		return new RegExp(t, n);
	}),
	Dp(mp, "set", (e) => [...e.values()], (e) => new Set(e)),
	Dp(pp, "map", (e) => [...e.entries()], (e) => new Map(e)),
	Dp((e) => vp(e) || xp(e), "number", (e) => vp(e) ? "NaN" : e > 0 ? "Infinity" : "-Infinity", Number),
	Dp((e) => e === 0 && 1 / e == -Infinity, "number", () => "-0", Number),
	Dp(Cp, "URL", (e) => e.toString(), (e) => new URL(e))
];
function kp(e, t, n, r) {
	return {
		isApplicable: e,
		annotation: t,
		transform: n,
		untransform: r
	};
}
var Ap = kp((e, t) => hp(e) ? !!t.symbolRegistry.getIdentifier(e) : !1, (e, t) => ["symbol", t.symbolRegistry.getIdentifier(e)], (e) => e.description, (e, t, n) => {
	let r = n.symbolRegistry.getValue(t[1]);
	if (!r) throw Error("Trying to deserialize unknown symbol");
	return r;
}), jp = [
	Int8Array,
	Uint8Array,
	Int16Array,
	Uint16Array,
	Int32Array,
	Uint32Array,
	Float32Array,
	Float64Array,
	Uint8ClampedArray
].reduce((e, t) => (e[t.name] = t, e), {}), Mp = kp(Sp, (e) => ["typed-array", e.constructor.name], (e) => [...e], (e, t) => {
	let n = jp[t[1]];
	if (!n) throw Error("Trying to deserialize unknown typed array");
	return new n(e);
});
function Np(e, t) {
	return e?.constructor ? !!t.classRegistry.getIdentifier(e.constructor) : !1;
}
var Pp = kp(Np, (e, t) => ["class", t.classRegistry.getIdentifier(e.constructor)], (e, t) => {
	let n = t.classRegistry.getAllowedProps(e.constructor);
	if (!n) return { ...e };
	let r = {};
	return n.forEach((t) => {
		r[t] = e[t];
	}), r;
}, (e, t, n) => {
	let r = n.classRegistry.getValue(t[1]);
	if (!r) throw Error(`Trying to deserialize unknown class '${t[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
	return Object.assign(Object.create(r.prototype), e);
}), Fp = kp((e, t) => !!t.customTransformerRegistry.findApplicable(e), (e, t) => ["custom", t.customTransformerRegistry.findApplicable(e).name], (e, t) => t.customTransformerRegistry.findApplicable(e).serialize(e), (e, t, n) => {
	let r = n.customTransformerRegistry.findByName(t[1]);
	if (!r) throw Error("Trying to deserialize unknown custom value");
	return r.deserialize(e);
}), Ip = [
	Pp,
	Ap,
	Fp,
	Mp
], Lp = (e, t) => {
	let n = tp(Ip, (n) => n.isApplicable(e, t));
	if (n) return {
		value: n.transform(e, t),
		type: n.annotation(e, t)
	};
	let r = tp(Op, (n) => n.isApplicable(e, t));
	if (r) return {
		value: r.transform(e, t),
		type: r.annotation
	};
}, Rp = {};
Op.forEach((e) => {
	Rp[e.annotation] = e;
});
var zp = (e, t, n) => {
	if (cp(t)) switch (t[0]) {
		case "symbol": return Ap.untransform(e, t, n);
		case "class": return Pp.untransform(e, t, n);
		case "custom": return Fp.untransform(e, t, n);
		case "typed-array": return Mp.untransform(e, t, n);
		default: throw Error("Unknown transformation: " + t);
	}
	else {
		let r = Rp[t];
		if (!r) throw Error("Unknown transformation: " + t);
		return r.untransform(e, n);
	}
};
J();
var Bp = (e, t) => {
	if (t > e.size) throw Error("index out of bounds");
	let n = e.keys();
	for (; t > 0;) n.next(), t--;
	return n.next().value;
};
function Vp(e) {
	if (ep(e, "__proto__")) throw Error("__proto__ is not allowed as a property");
	if (ep(e, "prototype")) throw Error("prototype is not allowed as a property");
	if (ep(e, "constructor")) throw Error("constructor is not allowed as a property");
}
var Hp = (e, t) => {
	Vp(t);
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (mp(e)) e = Bp(e, +r);
		else if (pp(e)) {
			let i = +r, a = +t[++n] == 0 ? "key" : "value", o = Bp(e, i);
			switch (a) {
				case "key":
					e = o;
					break;
				case "value":
					e = e.get(o);
					break;
			}
		} else e = e[r];
	}
	return e;
}, Up = (e, t, n) => {
	if (Vp(t), t.length === 0) return n(e);
	let r = e;
	for (let e = 0; e < t.length - 1; e++) {
		let n = t[e];
		if (cp(r)) {
			let e = +n;
			r = r[e];
		} else if (op(r)) r = r[n];
		else if (mp(r)) {
			let e = +n;
			r = Bp(r, e);
		} else if (pp(r)) {
			if (e === t.length - 2) break;
			let i = +n, a = +t[++e] == 0 ? "key" : "value", o = Bp(r, i);
			switch (a) {
				case "key":
					r = o;
					break;
				case "value":
					r = r.get(o);
					break;
			}
		}
	}
	let i = t[t.length - 1];
	if (cp(r) ? r[+i] = n(r[+i]) : op(r) && (r[i] = n(r[i])), mp(r)) {
		let e = Bp(r, +i), t = n(e);
		e !== t && (r.delete(e), r.add(t));
	}
	if (pp(r)) {
		let e = +t[t.length - 2], a = Bp(r, e);
		switch (+i == 0 ? "key" : "value") {
			case "key": {
				let e = n(a);
				r.set(e, r.get(a)), e !== a && r.delete(a);
				break;
			}
			case "value":
				r.set(a, n(r.get(a)));
				break;
		}
	}
	return e;
};
function Wp(e, t, n = []) {
	if (!e) return;
	if (!cp(e)) {
		$f(e, (e, r) => Wp(e, t, [...n, ...Ep(r)]));
		return;
	}
	let [r, i] = e;
	i && $f(i, (e, r) => {
		Wp(e, t, [...n, ...Ep(r)]);
	}), t(r, n);
}
function Gp(e, t, n) {
	return Wp(t, (t, r) => {
		e = Up(e, r, (e) => zp(e, t, n));
	}), e;
}
function Kp(e, t) {
	function n(t, n) {
		let r = Hp(e, Ep(n));
		t.map(Ep).forEach((t) => {
			e = Up(e, t, () => r);
		});
	}
	if (cp(t)) {
		let [r, i] = t;
		r.forEach((t) => {
			e = Up(e, Ep(t), () => e);
		}), i && $f(i, n);
	} else $f(t, n);
	return e;
}
var qp = (e, t) => op(e) || cp(e) || pp(e) || mp(e) || Np(e, t);
function Jp(e, t, n) {
	let r = n.get(e);
	r ? r.push(t) : n.set(e, [t]);
}
function Yp(e, t) {
	let n = {}, r;
	return e.forEach((e) => {
		if (e.length <= 1) return;
		t || (e = e.map((e) => e.map(String)).sort((e, t) => e.length - t.length));
		let [i, ...a] = e;
		i.length === 0 ? r = a.map(Tp) : n[Tp(i)] = a.map(Tp);
	}), r ? sp(n) ? [r] : [r, n] : sp(n) ? void 0 : n;
}
var Xp = (e, t, n, r, i = [], a = [], o = /* @__PURE__ */ new Map()) => {
	let s = yp(e);
	if (!s) {
		Jp(e, i, t);
		let n = o.get(e);
		if (n) return r ? { transformedValue: null } : n;
	}
	if (!qp(e, n)) {
		let t = Lp(e, n), r = t ? {
			transformedValue: t.value,
			annotations: [t.type]
		} : { transformedValue: e };
		return s || o.set(e, r), r;
	}
	if (ep(a, e)) return { transformedValue: null };
	let c = Lp(e, n), l = c?.value ?? e, u = cp(l) ? [] : {}, d = {};
	$f(l, (s, c) => {
		if (c === "__proto__" || c === "constructor" || c === "prototype") throw Error(`Detected property ${c}. This is a prototype pollution risk, please remove it from your object.`);
		let l = Xp(s, t, n, r, [...i, c], [...a, e], o);
		u[c] = l.transformedValue, cp(l.annotations) ? d[c] = l.annotations : op(l.annotations) && $f(l.annotations, (e, t) => {
			d[wp(c) + "." + t] = e;
		});
	});
	let f = sp(d) ? {
		transformedValue: u,
		annotations: c ? [c.type] : void 0
	} : {
		transformedValue: u,
		annotations: c ? [c.type, d] : d
	};
	return s || o.set(e, f), f;
};
J(), J();
function Zp(e) {
	return Object.prototype.toString.call(e).slice(8, -1);
}
function Qp(e) {
	return Zp(e) === "Array";
}
function $p(e) {
	if (Zp(e) !== "Object") return !1;
	let t = Object.getPrototypeOf(e);
	return !!t && t.constructor === Object && t === Object.prototype;
}
function em(e, t, n, r, i) {
	let a = {}.propertyIsEnumerable.call(r, t) ? "enumerable" : "nonenumerable";
	a === "enumerable" && (e[t] = n), i && a === "nonenumerable" && Object.defineProperty(e, t, {
		value: n,
		enumerable: !1,
		writable: !0,
		configurable: !0
	});
}
function tm(e, t = {}) {
	if (Qp(e)) return e.map((e) => tm(e, t));
	if (!$p(e)) return e;
	let n = Object.getOwnPropertyNames(e), r = Object.getOwnPropertySymbols(e);
	return [...n, ...r].reduce((n, r) => {
		if (Qp(t.props) && !t.props.includes(r)) return n;
		let i = e[r];
		return em(n, r, tm(i, t), e, t.nonenumerable), n;
	}, {});
}
var X = class {
	constructor({ dedupe: e = !1 } = {}) {
		this.classRegistry = new Xf(), this.symbolRegistry = new Yf((e) => e.description ?? ""), this.customTransformerRegistry = new np(), this.allowedErrorProps = [], this.dedupe = e;
	}
	serialize(e) {
		let t = /* @__PURE__ */ new Map(), n = Xp(e, t, this, this.dedupe), r = { json: n.transformedValue };
		n.annotations && (r.meta = {
			...r.meta,
			values: n.annotations
		});
		let i = Yp(t, this.dedupe);
		return i && (r.meta = {
			...r.meta,
			referentialEqualities: i
		}), r;
	}
	deserialize(e) {
		let { json: t, meta: n } = e, r = tm(t);
		return n?.values && (r = Gp(r, n.values, this)), n?.referentialEqualities && (r = Kp(r, n.referentialEqualities)), r;
	}
	stringify(e) {
		return JSON.stringify(this.serialize(e));
	}
	parse(e) {
		return this.deserialize(JSON.parse(e));
	}
	registerClass(e, t) {
		this.classRegistry.register(e, t);
	}
	registerSymbol(e, t) {
		this.symbolRegistry.register(e, t);
	}
	registerCustom(e, t) {
		this.customTransformerRegistry.register({
			name: t,
			...e
		});
	}
	allowErrorProps(...e) {
		this.allowedErrorProps.push(...e);
	}
};
X.defaultInstance = new X(), X.serialize = X.defaultInstance.serialize.bind(X.defaultInstance), X.deserialize = X.defaultInstance.deserialize.bind(X.defaultInstance), X.stringify = X.defaultInstance.stringify.bind(X.defaultInstance), X.parse = X.defaultInstance.parse.bind(X.defaultInstance), X.registerClass = X.defaultInstance.registerClass.bind(X.defaultInstance), X.registerSymbol = X.defaultInstance.registerSymbol.bind(X.defaultInstance), X.registerCustom = X.defaultInstance.registerCustom.bind(X.defaultInstance), X.allowErrorProps = X.defaultInstance.allowErrorProps.bind(X.defaultInstance), X.serialize, X.deserialize, X.stringify, X.parse, X.registerClass, X.registerCustom, X.registerSymbol, X.allowErrorProps, J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J();
var nm;
(nm = q).__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ ?? (nm.__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ = []);
var rm;
(rm = q).__VUE_DEVTOOLS_KIT_RPC_CLIENT__ ?? (rm.__VUE_DEVTOOLS_KIT_RPC_CLIENT__ = null);
var im;
(im = q).__VUE_DEVTOOLS_KIT_RPC_SERVER__ ?? (im.__VUE_DEVTOOLS_KIT_RPC_SERVER__ = null);
var am;
(am = q).__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ ?? (am.__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ = null);
var om;
(om = q).__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ ?? (om.__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ = null);
var sm;
(sm = q).__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ ?? (sm.__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ = null), J(), J(), J(), J(), J(), J(), J();
//#endregion
//#region node_modules/pinia/dist/pinia.mjs
var cm = typeof window < "u", lm, um = (e) => lm = e;
process.env.NODE_ENV;
var dm = process.env.NODE_ENV === "production" ? Symbol() : Symbol("pinia");
function fm(e) {
	return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var pm;
(function(e) {
	e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(pm ||= {});
var mm = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function hm(e, { autoBom: t = !1 } = {}) {
	return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["﻿", e], { type: e.type }) : e;
}
function gm(e, t, n) {
	let r = new XMLHttpRequest();
	r.open("GET", e), r.responseType = "blob", r.onload = function() {
		xm(r.response, t, n);
	}, r.onerror = function() {
		console.error("could not download file");
	}, r.send();
}
function _m(e) {
	let t = new XMLHttpRequest();
	t.open("HEAD", e, !1);
	try {
		t.send();
	} catch {}
	return t.status >= 200 && t.status <= 299;
}
function vm(e) {
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
var ym = typeof navigator == "object" ? navigator : { userAgent: "" }, bm = /Macintosh/.test(ym.userAgent) && /AppleWebKit/.test(ym.userAgent) && !/Safari/.test(ym.userAgent), xm = cm ? typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !bm ? Sm : "msSaveOrOpenBlob" in ym ? Cm : wm : () => {};
function Sm(e, t = "download", n) {
	let r = document.createElement("a");
	r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin === location.origin ? vm(r) : _m(r.href) ? gm(e, t, n) : (r.target = "_blank", vm(r))) : (r.href = URL.createObjectURL(e), setTimeout(function() {
		URL.revokeObjectURL(r.href);
	}, 4e4), setTimeout(function() {
		vm(r);
	}, 0));
}
function Cm(e, t = "download", n) {
	if (typeof e == "string") if (_m(e)) gm(e, t, n);
	else {
		let t = document.createElement("a");
		t.href = e, t.target = "_blank", setTimeout(function() {
			vm(t);
		});
	}
	else navigator.msSaveOrOpenBlob(hm(e, n), t);
}
function wm(e, t, n, r) {
	if (r ||= open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string") return gm(e, t, n);
	let i = e.type === "application/octet-stream", a = /constructor/i.test(String(mm.HTMLElement)) || "safari" in mm, o = /CriOS\/[\d]+/.test(navigator.userAgent);
	if ((o || i && a || bm) && typeof FileReader < "u") {
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
function Z(e, t) {
	let n = "🍍 " + e;
	typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function Tm(e) {
	return "_a" in e && "install" in e;
}
function Em() {
	if (!("clipboard" in navigator)) return Z("Your browser doesn't support the Clipboard API", "error"), !0;
}
function Dm(e) {
	return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (Z("You need to activate the \"Emulate a focused page\" setting in the \"Rendering\" panel of devtools.", "warn"), !0) : !1;
}
async function Om(e) {
	if (!Em()) try {
		await navigator.clipboard.writeText(JSON.stringify(e.state.value)), Z("Global state copied to clipboard.");
	} catch (e) {
		if (Dm(e)) return;
		Z("Failed to serialize the state. Check the console for more details.", "error"), console.error(e);
	}
}
async function km(e) {
	if (!Em()) try {
		Pm(e, JSON.parse(await navigator.clipboard.readText())), Z("Global state pasted from clipboard.");
	} catch (e) {
		if (Dm(e)) return;
		Z("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(e);
	}
}
async function Am(e) {
	try {
		xm(new Blob([JSON.stringify(e.state.value)], { type: "text/plain;charset=utf-8" }), "pinia-state.json");
	} catch (e) {
		Z("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(e);
	}
}
var jm;
function Mm() {
	jm || (jm = document.createElement("input"), jm.type = "file", jm.accept = ".json");
	function e() {
		return new Promise((e, t) => {
			jm.onchange = async () => {
				let t = jm.files;
				if (!t) return e(null);
				let n = t.item(0);
				return e(n ? {
					text: await n.text(),
					file: n
				} : null);
			}, jm.oncancel = () => e(null), jm.onerror = t, jm.click();
		});
	}
	return e;
}
async function Nm(e) {
	try {
		let t = await Mm()();
		if (!t) return;
		let { text: n, file: r } = t;
		Pm(e, JSON.parse(n)), Z(`Global state imported from "${r.name}".`);
	} catch (e) {
		Z("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(e);
	}
}
function Pm(e, t) {
	for (let n in t) {
		let r = e.state.value[n];
		r ? Object.assign(r, t[n]) : e.state.value[n] = t[n];
	}
}
function Fm(e) {
	return { _custom: { display: e } };
}
var Im = "🍍 Pinia (root)", Lm = "_root";
function Rm(e) {
	return Tm(e) ? {
		id: Lm,
		label: Im
	} : {
		id: e.$id,
		label: e.$id
	};
}
function zm(e) {
	if (Tm(e)) {
		let t = Array.from(e._s.keys()), n = e._s;
		return {
			state: t.map((t) => ({
				editable: !0,
				key: t,
				value: e.state.value[t]
			})),
			getters: t.filter((e) => n.get(e)._getters).map((e) => {
				let t = n.get(e);
				return {
					editable: !1,
					key: e,
					value: t._getters.reduce((e, n) => (e[n] = t[n], e), {})
				};
			})
		};
	}
	let t = { state: Object.keys(e.$state).map((t) => ({
		editable: !0,
		key: t,
		value: e.$state[t]
	})) };
	return e._getters && e._getters.length && (t.getters = e._getters.map((t) => ({
		editable: !1,
		key: t,
		value: e[t]
	}))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((t) => ({
		editable: !0,
		key: t,
		value: e[t]
	}))), t;
}
function Bm(e) {
	return e ? Array.isArray(e) ? e.reduce((e, t) => (e.keys.push(t.key), e.operations.push(t.type), e.oldValue[t.key] = t.oldValue, e.newValue[t.key] = t.newValue, e), {
		oldValue: {},
		keys: [],
		operations: [],
		newValue: {}
	}) : {
		operation: Fm(e.type),
		key: Fm(e.key),
		oldValue: e.oldValue,
		newValue: e.newValue
	} : {};
}
function Vm(e) {
	switch (e) {
		case pm.direct: return "mutation";
		case pm.patchFunction: return "$patch";
		case pm.patchObject: return "$patch";
		default: return "unknown";
	}
}
var Hm = !0, Um = [], Wm = "pinia:mutations", Q = "pinia", { assign: Gm } = Object, Km = (e) => "🍍 " + e;
function qm(e, t) {
	Of({
		id: "dev.esm.pinia",
		label: "Pinia 🍍",
		logo: "https://pinia.vuejs.org/logo.svg",
		packageName: "pinia",
		homepage: "https://pinia.vuejs.org",
		componentStateTypes: Um,
		app: e
	}, (n) => {
		typeof n.now != "function" && Z("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
			id: Wm,
			label: "Pinia 🍍",
			color: 15064968
		}), n.addInspector({
			id: Q,
			label: "Pinia 🍍",
			icon: "storage",
			treeFilterPlaceholder: "Search stores",
			actions: [
				{
					icon: "content_copy",
					action: () => {
						Om(t);
					},
					tooltip: "Serialize and copy the state"
				},
				{
					icon: "content_paste",
					action: async () => {
						await km(t), n.sendInspectorTree(Q), n.sendInspectorState(Q);
					},
					tooltip: "Replace the state with the content of your clipboard"
				},
				{
					icon: "save",
					action: () => {
						Am(t);
					},
					tooltip: "Save the state as a JSON file"
				},
				{
					icon: "folder_open",
					action: async () => {
						await Nm(t), n.sendInspectorTree(Q), n.sendInspectorState(Q);
					},
					tooltip: "Import the state from a JSON file"
				}
			],
			nodeActions: [{
				icon: "restore",
				tooltip: "Reset the state (with \"$reset\")",
				action: (e) => {
					let n = t._s.get(e);
					n ? typeof n.$reset == "function" ? (n.$reset(), Z(`Store "${e}" reset.`)) : Z(`Cannot reset "${e}" store because it doesn't have a "$reset" method implemented.`, "warn") : Z(`Cannot reset "${e}" store because it wasn't found.`, "warn");
				}
			}]
		}), n.on.inspectComponent((e) => {
			let t = e.componentInstance && e.componentInstance.proxy;
			if (t && t._pStores) {
				let t = e.componentInstance.proxy._pStores;
				Object.values(t).forEach((t) => {
					e.instanceData.state.push({
						type: Km(t.$id),
						key: "state",
						editable: !0,
						value: t._isOptionsAPI ? { _custom: {
							value: /* @__PURE__ */ B(t.$state),
							actions: [{
								icon: "restore",
								tooltip: "Reset the state of this store",
								action: () => t.$reset()
							}]
						} } : Object.keys(t.$state).reduce((e, n) => (e[n] = t.$state[n], e), {})
					}), t._getters && t._getters.length && e.instanceData.state.push({
						type: Km(t.$id),
						key: "getters",
						editable: !1,
						value: t._getters.reduce((e, n) => {
							try {
								e[n] = t[n];
							} catch (t) {
								e[n] = t;
							}
							return e;
						}, {})
					});
				});
			}
		}), n.on.getInspectorTree((n) => {
			if (n.app === e && n.inspectorId === Q) {
				let e = [t];
				e = e.concat(Array.from(t._s.values())), n.rootNodes = (n.filter ? e.filter((e) => "$id" in e ? e.$id.toLowerCase().includes(n.filter.toLowerCase()) : Im.toLowerCase().includes(n.filter.toLowerCase())) : e).map(Rm);
			}
		}), globalThis.$pinia = t, n.on.getInspectorState((n) => {
			if (n.app === e && n.inspectorId === Q) {
				let e = n.nodeId === Lm ? t : t._s.get(n.nodeId);
				if (!e) return;
				e && (n.nodeId !== Lm && (globalThis.$store = /* @__PURE__ */ B(e)), n.state = zm(e));
			}
		}), n.on.editInspectorState((n) => {
			if (n.app === e && n.inspectorId === Q) {
				let e = n.nodeId === Lm ? t : t._s.get(n.nodeId);
				if (!e) return Z(`store "${n.nodeId}" not found`, "error");
				let { path: r } = n;
				Tm(e) ? r.unshift("state") : (r.length !== 1 || !e._customProperties.has(r[0]) || r[0] in e.$state) && r.unshift("$state"), Hm = !1, n.set(e, r, n.state.value), Hm = !0;
			}
		}), n.on.editComponentState((e) => {
			if (e.type.startsWith("🍍")) {
				let n = e.type.replace(/^🍍\s*/, ""), r = t._s.get(n);
				if (!r) return Z(`store "${n}" not found`, "error");
				let { path: i } = e;
				if (i[0] !== "state") return Z(`Invalid path for store "${n}":\n${i}\nOnly state can be modified.`);
				i[0] = "$state", Hm = !1, e.set(r, i, e.state.value), Hm = !0;
			}
		});
	});
}
function Jm(e, t) {
	Um.includes(Km(t.$id)) || Um.push(Km(t.$id)), Of({
		id: "dev.esm.pinia",
		label: "Pinia 🍍",
		logo: "https://pinia.vuejs.org/logo.svg",
		packageName: "pinia",
		homepage: "https://pinia.vuejs.org",
		componentStateTypes: Um,
		app: e,
		settings: { logStoreChanges: {
			label: "Notify about new/deleted stores",
			type: "boolean",
			defaultValue: !0
		} }
	}, (e) => {
		let n = typeof e.now == "function" ? e.now.bind(e) : Date.now;
		t.$onAction(({ after: r, onError: i, name: a, args: o }) => {
			let s = Ym++;
			e.addTimelineEvent({
				layerId: Wm,
				event: {
					time: n(),
					title: "🛫 " + a,
					subtitle: "start",
					data: {
						store: Fm(t.$id),
						action: Fm(a),
						args: o
					},
					groupId: s
				}
			}), r((r) => {
				Xm = void 0, e.addTimelineEvent({
					layerId: Wm,
					event: {
						time: n(),
						title: "🛬 " + a,
						subtitle: "end",
						data: {
							store: Fm(t.$id),
							action: Fm(a),
							args: o,
							result: r
						},
						groupId: s
					}
				});
			}), i((r) => {
				Xm = void 0, e.addTimelineEvent({
					layerId: Wm,
					event: {
						time: n(),
						logType: "error",
						title: "💥 " + a,
						subtitle: "end",
						data: {
							store: Fm(t.$id),
							action: Fm(a),
							args: o,
							error: r
						},
						groupId: s
					}
				});
			});
		}, !0), t._customProperties.forEach((r) => {
			pa(() => H(t[r]), (t, i) => {
				e.notifyComponentUpdate(), e.sendInspectorState(Q), Hm && e.addTimelineEvent({
					layerId: Wm,
					event: {
						time: n(),
						title: "Change",
						subtitle: r,
						data: {
							newValue: t,
							oldValue: i
						},
						groupId: Xm
					}
				});
			}, { deep: !0 });
		}), t.$subscribe(({ events: r, type: i }, a) => {
			if (e.notifyComponentUpdate(), e.sendInspectorState(Q), !Hm) return;
			let o = {
				time: n(),
				title: Vm(i),
				data: Gm({ store: Fm(t.$id) }, Bm(r)),
				groupId: Xm
			};
			i === pm.patchFunction ? o.subtitle = "⤵️" : i === pm.patchObject ? o.subtitle = "🧩" : r && !Array.isArray(r) && (o.subtitle = r.type), r && (o.data["rawEvent(s)"] = { _custom: {
				display: "DebuggerEvent",
				type: "object",
				tooltip: "raw DebuggerEvent[]",
				value: r
			} }), e.addTimelineEvent({
				layerId: Wm,
				event: o
			});
		}, {
			detached: !0,
			flush: "sync"
		});
		let r = t._hotUpdate;
		t._hotUpdate = Or((i) => {
			r(i), e.addTimelineEvent({
				layerId: Wm,
				event: {
					time: n(),
					title: "🔥 " + t.$id,
					subtitle: "HMR update",
					data: {
						store: Fm(t.$id),
						info: Fm("HMR update")
					}
				}
			}), e.notifyComponentUpdate(), e.sendInspectorTree(Q), e.sendInspectorState(Q);
		});
		let { $dispose: i } = t;
		t.$dispose = () => {
			i(), e.notifyComponentUpdate(), e.sendInspectorTree(Q), e.sendInspectorState(Q), e.getSettings().logStoreChanges && Z(`Disposed "${t.$id}" store 🗑`);
		}, e.notifyComponentUpdate(), e.sendInspectorTree(Q), e.sendInspectorState(Q), e.getSettings().logStoreChanges && Z(`"${t.$id}" store installed 🆕`);
	});
}
var Ym = 0, Xm;
function Zm(e, t, n) {
	let r = t.reduce((t, n) => (t[n] = (/* @__PURE__ */ B(e))[n], t), {});
	for (let t in r) e[t] = function() {
		let i = Ym, a = n ? new Proxy(e, {
			get(...e) {
				return Xm = i, Reflect.get(...e);
			},
			set(...e) {
				return Xm = i, Reflect.set(...e);
			}
		}) : e;
		Xm = i;
		let o = r[t].apply(a, arguments);
		return Xm = void 0, o;
	};
}
function Qm({ app: e, store: t, options: n }) {
	if (!t.$id.startsWith("__hot:")) {
		if (t._isOptionsAPI = !!n.state, !t._p._testing) {
			Zm(t, Object.keys(n.actions), t._isOptionsAPI);
			let e = t._hotUpdate;
			(/* @__PURE__ */ B(t))._hotUpdate = function(n) {
				e.apply(this, arguments), Zm(t, Object.keys(n._hmrPayload.actions), !!t._isOptionsAPI);
			};
		}
		Jm(e, t);
	}
}
function $m() {
	let e = on(!0), t = e.run(() => /* @__PURE__ */ jr({})), n = [], r = [], i = Or({
		install(e) {
			um(i), i._a = e, e.provide(dm, i), e.config.globalProperties.$pinia = i, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && cm && qm(e, i), r.forEach((e) => n.push(e)), r = [];
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
	return process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && cm && typeof Proxy < "u" && i.use(Qm), i;
}
function eh(e, t) {
	for (let n in t) {
		let r = t[n];
		if (!(n in e)) continue;
		let i = e[n];
		fm(i) && fm(r) && !/* @__PURE__ */ V(r) && !/* @__PURE__ */ Tr(r) ? e[n] = eh(i, r) : e[n] = r;
	}
	return e;
}
var th = () => {};
function nh(e, t, n, r = th) {
	e.add(t);
	let i = () => {
		e.delete(t) && r();
	};
	return !n && sn() && cn(i), i;
}
function rh(e, ...t) {
	e.forEach((e) => {
		e(...t);
	});
}
var ih = (e) => e(), ah = Symbol(), oh = Symbol();
function sh(e, t) {
	e instanceof Map && t instanceof Map ? t.forEach((t, n) => e.set(n, t)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
	for (let n in t) {
		if (!t.hasOwnProperty(n)) continue;
		let r = t[n], i = e[n];
		fm(i) && fm(r) && e.hasOwnProperty(n) && !/* @__PURE__ */ V(r) && !/* @__PURE__ */ Tr(r) ? e[n] = sh(i, r) : e[n] = r;
	}
	return e;
}
var ch = process.env.NODE_ENV === "production" ? Symbol() : Symbol("pinia:skipHydration");
function lh(e) {
	return !fm(e) || !Object.prototype.hasOwnProperty.call(e, ch);
}
var { assign: uh } = Object;
function dh(e) {
	return !!(/* @__PURE__ */ V(e) && e.effect);
}
function fh(e, t, n, r) {
	let { state: i, actions: a, getters: o } = t, s = n.state.value[e], c;
	function l() {
		!s && (process.env.NODE_ENV === "production" || !r) && (n.state.value[e] = i ? i() : {});
		let t = process.env.NODE_ENV !== "production" && r ? /* @__PURE__ */ Ir((/* @__PURE__ */ jr(i ? i() : {})).value) : /* @__PURE__ */ Ir(n.state.value[e]);
		return uh(t, a, Object.keys(o || {}).reduce((r, i) => (process.env.NODE_ENV !== "production" && i in t && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${i}" in store "${e}".`), r[i] = Or(zc(() => {
			um(n);
			let t = n._s.get(e);
			return o[i].call(t, t);
		})), r), {}));
	}
	return c = ph(e, l, t, n, r, !0), c;
}
function ph(e, t, n = {}, r, i, a) {
	let o, s = uh({ actions: {} }, n);
	/* istanbul ignore if */
	if (process.env.NODE_ENV !== "production" && !r._e.active) throw Error("Pinia destroyed");
	let c = { deep: !0 };
	/* istanbul ignore else */
	process.env.NODE_ENV !== "production" && (c.onTrigger = (e) => {
		/* istanbul ignore else */
		l ? p = e : l == 0 && !S._hotUpdating && (Array.isArray(p) ? p.push(e) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
	});
	let l, u, d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p, m = r.state.value[e];
	!a && !m && (process.env.NODE_ENV === "production" || !i) && (r.state.value[e] = {});
	let h = /* @__PURE__ */ jr({}), g;
	function _(t) {
		let n;
		l = u = !1, process.env.NODE_ENV !== "production" && (p = []), typeof t == "function" ? (t(r.state.value[e]), n = {
			type: pm.patchFunction,
			storeId: e,
			events: p
		}) : (sh(r.state.value[e], t), n = {
			type: pm.patchObject,
			payload: t,
			storeId: e,
			events: p
		});
		let i = g = Symbol();
		vi().then(() => {
			g === i && (l = !0);
		}), u = !0, rh(d, n, r.state.value[e]);
	}
	let v = a ? function() {
		let { state: e } = n, t = e ? e() : {};
		this.$patch((e) => {
			uh(e, t);
		});
	} : process.env.NODE_ENV === "production" ? th : () => {
		throw Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
	};
	function y() {
		o.stop(), d.clear(), f.clear(), r._s.delete(e);
	}
	let b = (t, n = "") => {
		if (ah in t) return t[oh] = n, t;
		let i = function() {
			um(r);
			let n = Array.from(arguments), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
			function s(e) {
				a.add(e);
			}
			function c(e) {
				o.add(e);
			}
			rh(f, {
				args: n,
				name: i[oh],
				store: S,
				after: s,
				onError: c
			});
			let l;
			try {
				l = t.apply(this && this.$id === e ? this : S, n);
			} catch (e) {
				throw rh(o, e), e;
			}
			return l instanceof Promise ? l.then((e) => (rh(a, e), e)).catch((e) => (rh(o, e), Promise.reject(e))) : (rh(a, l), l);
		};
		return i[ah] = !0, i[oh] = n, i;
	}, x = /*#__PURE__*/ Or({
		actions: {},
		getters: {},
		state: [],
		hotState: h
	}), ee = {
		_p: r,
		$id: e,
		$onAction: nh.bind(null, f),
		$patch: _,
		$reset: v,
		$subscribe(t, n = {}) {
			let i = nh(d, t, n.detached, () => a()), a = o.run(() => pa(() => r.state.value[e], (r) => {
				(n.flush === "sync" ? u : l) && t({
					storeId: e,
					type: pm.direct,
					events: p
				}, r);
			}, uh({}, c, n)));
			return i;
		},
		$dispose: y
	}, S = /* @__PURE__ */ br(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && cm ? uh({
		_hmrPayload: x,
		_customProperties: Or(/* @__PURE__ */ new Set())
	}, ee) : ee);
	r._s.set(e, S);
	let C = (r._a && r._a.runWithContext || ih)(() => r._e.run(() => (o = on()).run(() => t({ action: b }))));
	for (let t in C) {
		let o = C[t];
		/* @__PURE__ */ V(o) && !dh(o) || /* @__PURE__ */ Tr(o) ? (process.env.NODE_ENV !== "production" && i ? h.value[t] = /* @__PURE__ */ zr(C, t) : a || (m && lh(o) && (/* @__PURE__ */ V(o) ? o.value = m[t] : sh(o, m[t])), r.state.value[e][t] = o), process.env.NODE_ENV !== "production" && x.state.push(t)) : typeof o == "function" ? (C[t] = process.env.NODE_ENV !== "production" && i ? o : b(o, t), process.env.NODE_ENV !== "production" && (x.actions[t] = o), s.actions[t] = o) : process.env.NODE_ENV !== "production" && dh(o) && (x.getters[t] = a ? n.getters[t] : o, cm && (C._getters ||= Or([])).push(t));
	}
	if (uh(S, C), uh(/* @__PURE__ */ B(S), C), Object.defineProperty(S, "$state", {
		get: () => process.env.NODE_ENV !== "production" && i ? h.value : r.state.value[e],
		set: (e) => {
			/* istanbul ignore if */
			if (process.env.NODE_ENV !== "production" && i) throw Error("cannot set hotState");
			_((t) => {
				uh(t, e);
			});
		}
	}), process.env.NODE_ENV !== "production" && (S._hotUpdate = Or((t) => {
		S._hotUpdating = !0, t._hmrPayload.state.forEach((e) => {
			if (e in S.$state) {
				let n = t.$state[e], r = S.$state[e];
				typeof n == "object" && fm(n) && fm(r) ? eh(n, r) : t.$state[e] = r;
			}
			S[e] = /* @__PURE__ */ zr(t.$state, e);
		}), Object.keys(S.$state).forEach((e) => {
			e in t.$state || delete S[e];
		}), l = !1, u = !1, r.state.value[e] = /* @__PURE__ */ zr(t._hmrPayload, "hotState"), u = !0, vi().then(() => {
			l = !0;
		});
		for (let e in t._hmrPayload.actions) {
			let n = t[e];
			S[e] = b(n, e);
		}
		for (let e in t._hmrPayload.getters) {
			let n = t._hmrPayload.getters[e];
			S[e] = a ? zc(() => (um(r), n.call(S, S))) : n;
		}
		Object.keys(S._hmrPayload.getters).forEach((e) => {
			e in t._hmrPayload.getters || delete S[e];
		}), Object.keys(S._hmrPayload.actions).forEach((e) => {
			e in t._hmrPayload.actions || delete S[e];
		}), S._hmrPayload = t._hmrPayload, S._getters = t._getters, S._hotUpdating = !1;
	})), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && cm) {
		let e = {
			writable: !0,
			configurable: !0,
			enumerable: !1
		};
		[
			"_p",
			"_hmrPayload",
			"_getters",
			"_customProperties"
		].forEach((t) => {
			Object.defineProperty(S, t, uh({ value: S[t] }, e));
		});
	}
	return r._p.forEach((e) => {
		/* istanbul ignore else */
		if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && cm) {
			let t = o.run(() => e({
				store: S,
				app: r._a,
				pinia: r,
				options: s
			}));
			Object.keys(t || {}).forEach((e) => S._customProperties.add(e)), uh(S, t);
		} else uh(S, o.run(() => e({
			store: S,
			app: r._a,
			pinia: r,
			options: s
		})));
	}), process.env.NODE_ENV !== "production" && S.$state && typeof S.$state == "object" && typeof S.$state.constructor == "function" && !S.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${S.$id}".`), m && a && n.hydrate && n.hydrate(S.$state, m), l = !0, u = !0, S;
}
function mh(e, t, n) {
	let r, i = typeof t == "function";
	r = i ? n : t;
	function a(n, o) {
		let s = ua();
		if (n = (process.env.NODE_ENV === "test" && lm && lm._testing ? null : n) || (s ? la(dm, null) : null), n && um(n), process.env.NODE_ENV !== "production" && !lm) throw Error("[🍍]: \"getActivePinia()\" was called but there was no active Pinia. Are you trying to use a store before calling \"app.use(pinia)\"?\nSee https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.\nThis will fail in production.");
		n = lm, n._s.has(e) || (i ? ph(e, t, r, n) : fh(e, r, n), process.env.NODE_ENV !== "production" && (a._pinia = n));
		let c = n._s.get(e);
		if (process.env.NODE_ENV !== "production" && o) {
			let a = "__hot:" + e, s = i ? ph(a, t, r, n, !0) : fh(a, uh({}, r), n, !0);
			o._hotUpdate(s), delete n.state.value[a], n._s.delete(a);
		}
		if (process.env.NODE_ENV !== "production" && cm) {
			let t = mc();
			if (t && t.proxy && !o) {
				let n = t.proxy, r = "_pStores" in n ? n._pStores : n._pStores = {};
				r[e] = c;
			}
		}
		return c;
	}
	return a.$id = e, a;
}
//#endregion
//#region src/state/damage-console/index.ts
var hh = mh("damageConsole", () => {
	let e = /* @__PURE__ */ jr("1d10"), t = /* @__PURE__ */ jr("roll"), n = /* @__PURE__ */ jr(!1), r = /* @__PURE__ */ jr(!1), i = /* @__PURE__ */ jr(!1), a = /* @__PURE__ */ jr(!0), o = /* @__PURE__ */ jr(!0), s = /* @__PURE__ */ jr(""), c = /* @__PURE__ */ jr([]), l = /* @__PURE__ */ jr([]), u = /* @__PURE__ */ jr(null), d;
	function f(e, t) {
		c.value = e, d = t;
	}
	async function p() {
		if (!d || i.value) return;
		s.value = "";
		let f = re({
			damageFormula: e.value,
			hitLocation: t.value,
			ignoreArmour: n.value,
			ignoreToughness: r.value,
			minimumOne: a.value,
			rollSeparately: o.value,
			targetUuids: c.value.map((e) => e.uuid),
			woundingType: u.value
		});
		if (l.value = ie(f), !l.value.length) {
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
}), gh = {
	key: 0,
	role: "alert",
	class: "tw:dui-alert tw:dui-alert-error tw:text-sm"
}, _h = { key: 0 }, vh = { class: "tw:dui-card tw:dui-card-border tw:dui-card-sm" }, yh = { class: "tw:dui-card-body" }, bh = { class: "tw:dui-card-title tw:text-base" }, xh = { class: "tw:grid tw:grid-cols-1 tw:gap-2 tw:sm:grid-cols-2" }, Sh = ["src"], Ch = { class: "tw:min-w-0 tw:truncate" }, wh = { class: "tw:grid tw:grid-cols-1 tw:gap-4 tw:md:grid-cols-2" }, Th = { class: "tw:dui-fieldset tw:min-w-0 tw:rounded-box tw:border tw:border-base-300 tw:p-4" }, Eh = { class: "tw:dui-fieldset-legend" }, Dh = {
	class: "tw:dui-label",
	for: "ech-damage-formula"
}, Oh = { class: "tw:dui-label tw:whitespace-normal" }, kh = {
	class: "tw:dui-label",
	for: "ech-hit-location"
}, Ah = ["value"], jh = {
	class: "tw:dui-label",
	for: "ech-wounding-type"
}, Mh = ["value"], Nh = { class: "tw:dui-label tw:whitespace-normal" }, Ph = { class: "tw:dui-fieldset tw:min-w-0 tw:rounded-box tw:border tw:border-base-300 tw:p-4" }, Fh = { class: "tw:dui-fieldset-legend" }, Ih = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, Lh = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, Rh = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, zh = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, Bh = {
	role: "alert",
	class: "tw:dui-alert tw:mt-2 tw:text-sm"
}, Vh = { class: "tw:flex tw:justify-end tw:gap-2" }, Hh = ["disabled"], Uh = ["disabled"], Wh = /* @__PURE__ */ xa({
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
		let t = e, n = hh();
		n.initialize(t.targets, t.onPost);
		function r(e) {
			return t.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.${e}`);
		}
		return (e, i) => (Bs(), Gs("form", {
			class: "tw:flex tw:flex-col tw:gap-4 tw:rounded-box tw:bg-base-100 tw:p-4 tw:text-base-content",
			onSubmit: i[8] ||= Ul((...e) => H(n).submit && H(n).submit(...e), ["prevent"])
		}, [
			H(n).validationErrors.length || H(n).runtimeError ? (Bs(), Gs("div", gh, [i[9] ||= G("i", {
				class: "fa-solid fa-triangle-exclamation",
				"aria-hidden": "true"
			}, null, -1), G("div", null, [(Bs(!0), Gs(Ps, null, qa(H(n).validationErrors, (e) => (Bs(), Gs("p", { key: e }, F(r(`validation.${e}`)), 1))), 128)), H(n).runtimeError ? (Bs(), Gs("p", _h, F(H(n).runtimeError), 1)) : ac("", !0)])])) : ac("", !0),
			G("section", vh, [G("div", yh, [G("h2", bh, [i[10] ||= G("i", {
				class: "fa-solid fa-crosshairs",
				"aria-hidden": "true"
			}, null, -1), ic(" " + F(r("targets")), 1)]), G("div", xh, [(Bs(!0), Gs(Ps, null, qa(H(n).targets, (e) => (Bs(), Gs("div", {
				key: e.uuid,
				class: "tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:rounded-sm tw:bg-base-200 tw:p-2"
			}, [G("img", {
				src: e.img,
				alt: "",
				class: "tw:h-9 tw:w-9 tw:rounded-sm tw:object-cover"
			}, null, 8, Sh), G("strong", Ch, F(e.name), 1)]))), 128))])])]),
			G("div", wh, [G("fieldset", Th, [
				G("legend", Eh, F(r("damageDetails")), 1),
				G("label", Dh, F(r("damage")), 1),
				oa(G("input", {
					id: "ech-damage-formula",
					"onUpdate:modelValue": i[0] ||= (e) => H(n).damageFormula = e,
					class: "tw:dui-input tw:w-full",
					name: "damageFormula",
					placeholder: "1d10",
					required: "",
					type: "text"
				}, null, 512), [[Pl, H(n).damageFormula]]),
				G("p", Oh, F(r("damageHint")), 1),
				G("label", kh, F(r("hitLocation")), 1),
				oa(G("select", {
					id: "ech-hit-location",
					"onUpdate:modelValue": i[1] ||= (e) => H(n).hitLocation = e,
					class: "tw:dui-select tw:w-full",
					name: "hitLocation"
				}, [(Bs(!0), Gs(Ps, null, qa(t.hitLocationOptions, (e) => (Bs(), Gs("option", {
					key: e.value,
					value: e.value
				}, F(e.label), 9, Ah))), 128))], 512), [[Ll, H(n).hitLocation]]),
				G("label", jh, F(r("woundingType")), 1),
				oa(G("select", {
					id: "ech-wounding-type",
					"onUpdate:modelValue": i[2] ||= (e) => H(n).woundingType = e,
					class: "tw:dui-select tw:w-full",
					name: "woundingType"
				}, [(Bs(!0), Gs(Ps, null, qa(t.woundingTypeOptions, (e) => (Bs(), Gs("option", {
					key: e.value ?? "unspecified",
					value: e.value
				}, F(e.label), 9, Mh))), 128))], 512), [[Ll, H(n).woundingType]]),
				G("p", Nh, F(r("woundingTypeHint")), 1)
			]), G("fieldset", Ph, [
				G("legend", Fh, F(r("damageOptions")), 1),
				G("label", Ih, [G("span", null, F(r("rollSeparately")), 1), oa(G("input", {
					"onUpdate:modelValue": i[3] ||= (e) => H(n).rollSeparately = e,
					class: "tw:dui-checkbox",
					name: "rollSeparately",
					type: "checkbox"
				}, null, 512), [[Fl, H(n).rollSeparately]])]),
				G("label", Lh, [G("span", null, F(r("ignoreToughness")), 1), oa(G("input", {
					"onUpdate:modelValue": i[4] ||= (e) => H(n).ignoreToughness = e,
					class: "tw:dui-checkbox",
					name: "ignoreToughness",
					type: "checkbox"
				}, null, 512), [[Fl, H(n).ignoreToughness]])]),
				G("label", Rh, [G("span", null, F(r("ignoreArmour")), 1), oa(G("input", {
					"onUpdate:modelValue": i[5] ||= (e) => H(n).ignoreArmour = e,
					class: "tw:dui-checkbox",
					name: "ignoreArmour",
					type: "checkbox"
				}, null, 512), [[Fl, H(n).ignoreArmour]])]),
				G("label", zh, [G("span", null, F(r("minimumOne")), 1), oa(G("input", {
					"onUpdate:modelValue": i[6] ||= (e) => H(n).minimumOne = e,
					class: "tw:dui-checkbox",
					name: "minimumOne",
					type: "checkbox"
				}, null, 512), [[Fl, H(n).minimumOne]])]),
				G("div", Bh, [i[11] ||= G("i", {
					class: "fa-solid fa-circle-info",
					"aria-hidden": "true"
				}, null, -1), G("span", null, F(r("postHint")), 1)])
			])]),
			G("div", Vh, [G("button", {
				class: "tw:dui-btn",
				type: "button",
				disabled: H(n).isPosting,
				onClick: i[7] ||= (...e) => t.onCancel && t.onCancel(...e)
			}, F(r("cancel")), 9, Hh), G("button", {
				class: "tw:dui-btn tw:dui-btn-primary",
				type: "submit",
				disabled: H(n).isPosting
			}, [G("i", {
				class: Vt(H(n).isPosting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-message"),
				"aria-hidden": "true"
			}, null, 2), ic(" " + F(r("post")), 1)], 8, Uh)])
		], 32));
	}
});
//#endregion
//#region src/module/wfrp4e/damage-console/posting.ts
async function Gh(e) {
	Kh();
	let t = re(e), n = ie(t);
	if (n.length) throw Error(game.i18n.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.validation.${n[0]}`));
	let r = ae(t, await Promise.all(t.targetUuids.map(async (e) => (await Fe(e)).snapshot))), i = Te(r), a = game.wfrp4e?.utility?.chatDataSetup?.(i) ?? { content: i };
	return Se(a, r), (await ChatMessage.create(a))?.id;
}
function Kh() {
	if (!game.user.isGM) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.gmOnly"));
}
//#endregion
//#region src/module/apps/FoundryVueApplication.ts
var qh = class extends foundry.applications.api.ApplicationV2 {
	#e;
	getVueProps() {}
	async _renderHTML(e, t) {
		let n = document.createElement("div");
		return n.classList.add("wfrp4e-expanded-critical-hits-root"), n.dataset.theme = "wfrp4e-expanded-critical-hits", n;
	}
	_replaceHTML(e, t, n) {
		this.unmountVue(), t.classList.add("wfrp4e-expanded-critical-hits-app"), t.replaceChildren(e), this.#e = ql(this.getVueComponent(), this.getVueProps() ?? {}), this.#e.use($m()), this.#e.mount(e);
	}
	async _preClose(e) {
		this.unmountVue(), await super._preClose(e);
	}
	unmountVue() {
		this.#e?.unmount(), this.#e = void 0;
	}
}, Jh = {
	body: "Body",
	head: "Head",
	lArm: "Left Arm",
	lLeg: "Left Leg",
	rArm: "Right Arm",
	rLeg: "Right Leg",
	roll: "Roll"
}, Yh = class extends qh {
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
		return Wh;
	}
	getVueProps() {
		return {
			hitLocationOptions: Xh(),
			localize: (e) => game.i18n.localize(e),
			onCancel: () => void this.close(),
			onPost: async (e) => {
				await Gh(e), await this.close();
			},
			targets: this.#e,
			woundingTypeOptions: Zh()
		};
	}
};
function Xh() {
	return w.map((e) => ({
		label: game.i18n.localize(Jh[e]),
		value: e
	}));
}
function Zh() {
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
async function Qh() {
	if (!game.user.isGM) {
		ui.notifications?.warn(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.gmOnly"));
		return;
	}
	let e = Pe();
	if (!e.length) {
		ui.notifications?.warn(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.targetsRequired"));
		return;
	}
	await new Yh(e).render(!0);
}
//#endregion
//#region src/module/wfrp4e/damage-console/scene-controls.ts
function $h() {
	Hooks.on("getSceneControlButtons", (e) => {
		let t = e?.tokens?.tools;
		t && (t.expandedCriticalDamageConsole = {
			button: !0,
			icon: "fa-solid fa-bolt",
			name: "expandedCriticalDamageConsole",
			onClick: () => void Qh(),
			title: "WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.sceneControl",
			visible: game.user.isGM
		});
	});
}
//#endregion
//#region src/module/wfrp4e/damage-console/index.ts
var eg = !1;
function tg() {
	eg ||= (qe(), $h(), !0);
}
//#endregion
//#region src/functions/critical-hits/damage-inference/index.ts
var ng = {
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
}, rg = {
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
function ig(e) {
	if (e.explicitCategories.length > 0) return {
		categories: ug(e.explicitCategories),
		matches: [],
		source: "explicit"
	};
	if (e.defaultCategories && e.defaultCategories.length > 0) return {
		categories: ug(e.defaultCategories),
		matches: [],
		source: "default"
	};
	if (e.inferFromWeaponProperties) {
		let t = cg(e.weaponPropertyKeys, e.weaponPropertyMapping);
		if (t.length > 0) return {
			categories: lg(t),
			matches: t,
			source: "weaponProperty"
		};
	}
	if (e.inferFromWeaponTypes) {
		let t = cg(e.weaponTypeKeys, e.weaponTypeMapping);
		if (t.length > 0) return {
			categories: lg(t),
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
function ag(e) {
	return e.trim().toLowerCase().replaceAll(/[^a-z0-9]/g, "");
}
function og(e) {
	let t = sg(e), n = {};
	for (let [e, r] of Object.entries(t ?? {})) fg(r) && (n[ag(e)] = r);
	return n;
}
function sg(e) {
	if (typeof e == "string") try {
		return sg(JSON.parse(e));
	} catch {
		return;
	}
	if (typeof e == "object" && e && !Array.isArray(e)) return e;
}
function cg(e, t) {
	let n = og(t), r = e.flatMap((e) => {
		let t = n[ag(e)];
		return t && t !== "none" ? [{
			category: t,
			key: e
		}] : [];
	}), i = /* @__PURE__ */ new Set();
	return g.flatMap((e) => r.filter((t) => {
		let n = `${e}:${ag(t.key)}`;
		return t.category !== e || i.has(n) ? !1 : (i.add(n), !0);
	}));
}
function lg(e) {
	return ug(e.map((e) => e.category));
}
function ug(e) {
	let t = new Set(e);
	return g.filter((e) => t.has(e));
}
function dg(e) {
	return typeof e == "string" && g.includes(e);
}
function fg(e) {
	return e === "none" || dg(e);
}
//#endregion
//#region src/functions/critical-hits/natural-one-critical/index.ts
function pg(e) {
	let t = Number(e.roll), n = Number(e.target);
	return t === 1 && t <= n;
}
//#endregion
//#region src/functions/critical-hits/table-keys.ts
function mg(e, t, n) {
	return `ech-crit-${e}-${t}-${n}`.toLowerCase();
}
function hg(e) {
	let t = e.toLowerCase();
	if (t === "head" || t === "body") return t;
	if (t.endsWith("arm")) return "arm";
	if (t.endsWith("leg")) return "leg";
}
function gg(e) {
	return e ? "upInArms" : "core";
}
//#endregion
//#region src/module/settings.ts
var _g = "enableCriticalReplacement", vg = "enableNaturalOneCriticals", yg = "inferDamageFromWeaponProperties", bg = "inferDamageFromWeaponTypes", xg = "weaponPropertyDamageMapping", Sg = "weaponTypeDamageMapping", Cg = JSON.stringify(ng), wg = JSON.stringify(rg), Tg = JSON.stringify({
	hack: "cutting",
	impale: "piercing",
	pummel: "crushing",
	slash: "cutting"
});
function Eg() {
	game.settings.register(e, n, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.debugConsoleLogging.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.debugConsoleLogging.hint",
		scope: "client",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, _g, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, vg, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, yg, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.hint",
		scope: "world",
		config: !0,
		default: !0,
		type: Boolean
	}), game.settings.register(e, xg, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.hint",
		scope: "world",
		config: !1,
		default: Cg,
		type: String
	}), game.settings.register(e, bg, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, Sg, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.hint",
		scope: "world",
		config: !1,
		default: wg,
		type: String
	}), r(`${e} | Settings registered`, Ig());
}
function Dg() {
	return !!game.settings.get(e, _g);
}
function Og() {
	return !!game.settings.get(e, vg);
}
async function kg() {
	if (!game.user.isGM) {
		r(`${e} | Skipping mapping setting normalization for non-GM user.`);
		return;
	}
	r(`${e} | Normalizing stored mapping settings.`), await Pg(xg, Cg), await Pg(Sg, wg), r(`${e} | Mapping settings normalized`, Ig());
}
function Ag() {
	return !!game.settings.get(e, yg);
}
function jg() {
	return !!game.settings.get(e, bg);
}
function Mg() {
	return og(game.settings.get(e, xg));
}
function Ng() {
	return og(game.settings.get(e, Sg));
}
async function Pg(t, n) {
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
	t === "weaponPropertyDamageMapping" && Fg(i, Tg) && (r(`${e} | Upgrading untouched weapon property mapping defaults`, { key: t }), await game.settings.set(e, t, n));
}
function Fg(e, t) {
	return JSON.stringify(og(e)) === t;
}
function Ig() {
	return {
		debugConsoleLogging: Rg(n),
		enableCriticalReplacement: Rg(_g),
		enableNaturalOneCriticals: Rg(vg),
		inferDamageFromWeaponProperties: Rg(yg),
		inferDamageFromWeaponTypes: Rg(bg),
		weaponPropertyDamageMapping: Lg(xg),
		weaponTypeDamageMapping: Lg(Sg)
	};
}
function Lg(e) {
	let t = Rg(e);
	return {
		key: e,
		type: typeof t,
		value: t
	};
}
function Rg(t) {
	try {
		return game.settings.settings.has(`wfrp4e-expanded-critical-hits.${t}`) ? game.settings.get(e, t) : "<not registered>";
	} catch (e) {
		return `<error: ${e instanceof Error ? e.message : String(e)}>`;
	}
}
//#endregion
//#region src/module/wfrp4e/natural-one-critical.ts
var zg = Symbol.for(`${e}.naturalOneCriticalPatch`), Bg = {
	installed: !1,
	message: "Natural 1 critical patch has not run."
};
function Vg() {
	return { ...Bg };
}
function Hg() {
	let t = game.wfrp4e?.rolls;
	if (!t?.TestWFRP) {
		Yg(!1, "WFRP4e roll classes were not available.");
		return;
	}
	let n = Ug(t.TestWFRP), r = Wg([t.WeaponTest, t.TraitTest]);
	Bg = {
		installed: n,
		message: n ? `Natural 1 critical patch installed. Attack wrappers installed: ${r}.` : "TestWFRP.isCriticalFumble could not be patched."
	}, n || a(`${e} | ${Bg.message}`);
}
function Ug(e) {
	let t = e.prototype;
	if (Jg(t).isCriticalFumble) return !0;
	let n = Object.getOwnPropertyDescriptor(t, "isCriticalFumble");
	return n?.get ? (Object.defineProperty(t, "isCriticalFumble", {
		configurable: n.configurable,
		enumerable: n.enumerable,
		get() {
			return Gg(this) ? "critical" : n.get?.call(this);
		}
	}), qg(t, "isCriticalFumble"), !0) : !1;
}
function Wg(e) {
	let t = 0;
	for (let n of e) {
		let e = n?.prototype;
		if (!e || Jg(e).computeProperties) continue;
		let r = e.computeProperties;
		r && (e.computeProperties = function(...e) {
			Gg(this) && Kg(this);
			let t = r.apply(this, e);
			return Gg(this) && Kg(this), t;
		}, qg(e, "computeProperties"), t += 1);
	}
	return t;
}
function Gg(e) {
	return Og() && pg({
		roll: e.result?.roll,
		target: e.result?.target
	});
}
function Kg(e) {
	e.result && (e.result.color_green = !0, e.result.critical ||= game.i18n.localize("Critical"));
}
function qg(e, t) {
	let n = Jg(e);
	n[t] = !0, Object.defineProperty(e, zg, {
		configurable: !0,
		value: n
	});
}
function Jg(e) {
	return Object.prototype.hasOwnProperty.call(e, zg) ? Reflect.get(e, zg) : {};
}
function Yg(t, n) {
	Bg = {
		installed: t,
		message: n
	}, a(`${e} | ${n}`);
}
//#endregion
//#region src/module/api/create-module-api.ts
function Xg() {
	return {
		getExpandedCriticalsCompendiumStatus: f,
		getNaturalOneCriticalPatchStatus: Vg,
		launchDamageConsole: Qh,
		postDamageConsoleCard: Gh
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function Zg() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let t = game.modules.get(e);
	if (!t) throw Error(`Foundry module registry entry was not found for ${e}.`);
	t.api = Xg();
}
//#endregion
//#region src/functions/critical-hits/presentation/index.ts
var Qg = /^ech-crit-(?:core|upinarms)-(?:arrowsbolts|bullets|cold|crushing|cutting|flameenergy|piercing|shrapnelshot|sling|teethclaws|unarmed)-(?:arm|body|head|leg)$/;
function $g(e) {
	return Qg.test(e);
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/debug.ts
function e_(e) {
	return {
		criticalLocation: e.criticalLocation,
		messageId: e.messageId,
		returnResult: e.returnResult,
		sourceItemUuid: e.sourceItemUuid
	};
}
function t_(e) {
	let t = n_(e);
	if (t) return {
		id: t.id,
		name: t.name,
		type: t.type,
		uuid: t.uuid
	};
}
function n_(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/failure.ts
function r_(t, n, r) {
	return o(`${e} | ${t}`, r), ui.notifications?.error(t), [
		"<div class=\"wfrp4e chat-card\">",
		"<h3>Expanded Critical Hit Failed</h3>",
		`<p>${i_(t)}</p>`,
		`<p><strong>Table:</strong> ${i_(n)}</p>`,
		"</div>"
	].join("");
}
function i_(e) {
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
function a_(e, t) {
	if (!c_(e)) return;
	let n = t.criticalLocation;
	if (e.type !== "critical" || typeof n != "string") return e;
	let r = e.toObject, i = Item?.implementation;
	if (typeof r != "function" || typeof i != "function") return e;
	let a = r.call(e), o = o_(o_(a, "system"), "location"), s = game.wfrp4e?.config?.locations ?? {};
	return o.key = n, o.value = s[n] ?? n, new i(a);
}
function o_(e, t) {
	let n = s_(e[t]);
	if (n) return n;
	let r = {};
	return e[t] = r, r;
}
function s_(e) {
	return typeof e == "object" && e ? e : void 0;
}
function c_(e) {
	let t = e;
	return typeof t == "object" && !!t && typeof t.postItem == "function";
}
//#endregion
//#region src/module/wfrp4e/runtime-values.ts
function l_(e) {
	return Array.isArray(e) ? e : [];
}
function $(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/item/damage-defaults.ts
var u_ = "teethClaws", d_ = {};
function f_(e) {
	if (p_(e)) return {
		categories: [u_],
		labels: ["Teeth & Claws"],
		lores: [],
		source: "creatureTrait"
	};
	if (m_(e)) {
		let t = __(e), n = v_(t);
		return {
			categories: x_(n.map((e) => ee[e])),
			labels: x_(n.map((e) => x[e])),
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
function p_(e) {
	let t = $(e), n = $($(t?.system)?.rollable);
	return t?.type === "trait" && n?.damage === !0;
}
function m_(e) {
	let t = $(e);
	return t?.type === "spell" && g_(t?.system);
}
function h_(e) {
	let t = $(e);
	return t?.type === "prayer" && g_(t?.system);
}
function g_(e) {
	let t = $(e), n = $(t?.damage), r = $(t?.magicMissile);
	return y_(n?.value) || y_(n?.dice) || n?.addSL === !0 || r?.value === !0;
}
function __(e) {
	let t = $($($(e)?.system)?.lore), n = b_(t?.chosen);
	return n ? [n] : x_((Array.isArray(t?.value) ? l_(t?.value) : [t?.value]).map(b_).filter((e) => !!e));
}
function v_(e, t = d_) {
	return x_((e.length > 0 ? e : [""]).map((e) => t[b_(e) ?? ""] ?? "energy"));
}
function y_(e) {
	return typeof e == "number" ? e !== 0 : typeof e == "string" && e.trim().length > 0;
}
function b_(e) {
	if (typeof e == "string") return e.trim().toLowerCase() || void 0;
}
function x_(e) {
	return [...new Set(e)];
}
//#endregion
//#region src/module/wfrp4e/item/wounding-overrides.ts
var S_ = "damageTypes", C_ = new Map(_.map((e) => [y[e], e]));
function w_(e) {
	let t = new Set([...T_(e), ...D_(e)]);
	return _.filter((e) => t.has(e));
}
function T_(t) {
	let n = $(t), r = n?.getFlag, i = $($(n?.flags)?.[e]);
	return E_(typeof r == "function" ? r.call(t, e, S_) : i?.[S_]);
}
function E_(e) {
	let t = new Set(l_(e).filter(A_));
	return _.filter((e) => t.has(e));
}
function D_(e) {
	let t = l_($($($(e)?.system)?.qualities)?.value), n = /* @__PURE__ */ new Set();
	for (let e of t) {
		let t = $(e);
		if (!O_(t)) continue;
		let r = t?.name, i = typeof r == "string" ? C_.get(r) : void 0;
		i && n.add(i);
	}
	return _.filter((e) => n.has(e));
}
function O_(e) {
	let t = e?.group;
	return k_(t) ? e?.active === !0 : !0;
}
function k_(e) {
	return typeof e == "number" ? Number.isFinite(e) : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e));
}
function A_(e) {
	return typeof e == "string" && _.includes(e);
}
//#endregion
//#region src/module/wfrp4e/quality-extraction.ts
function j_(e) {
	let t = M_(e);
	return {
		explicitCategories: te(t),
		weaponPropertyKeys: t,
		weaponTypeKeys: N_(e)
	};
}
function M_(e) {
	let t = $(e), n = $(t?.system), r = $(t?.properties), i = $(n?.properties), a = [$(r?.qualities), $(i?.qualities)], o = /* @__PURE__ */ new Set();
	for (let t of T_(e)) o.add(y[t]);
	for (let e of a) for (let t of Object.keys(e ?? {})) o.add(t);
	let s = l_($(n?.qualities)?.value);
	for (let e of s) {
		let t = $(e), n = t?.name;
		typeof n == "string" && O_(t) && o.add(n);
	}
	return [...o];
}
function N_(e) {
	let t = $($(e)?.system), n = /* @__PURE__ */ new Set();
	for (let e of [
		t?.weaponGroup,
		t?.group,
		t?.weaponType,
		t?.weaponClass,
		t?.ammunitionGroup,
		t?.ammoGroup,
		t?.category
	]) P_(e, n);
	return [...n];
}
function P_(e, t) {
	if (typeof e == "string") {
		t.add(e);
		return;
	}
	if (Array.isArray(e)) {
		for (let n of e) P_(n, t);
		return;
	}
	let n = $(e);
	if (n) for (let e of [
		"key",
		"id",
		"name",
		"label",
		"value",
		"type"
	]) P_(n[e], t);
}
//#endregion
//#region src/module/wfrp4e/damage-category-resolution.ts
function F_(e) {
	let t = j_(e), n = f_(e);
	return {
		clues: t,
		defaults: n,
		resolution: ig({
			...t,
			defaultCategories: n.categories,
			inferFromWeaponProperties: Ag(),
			inferFromWeaponTypes: jg(),
			weaponPropertyMapping: Mg(),
			weaponTypeMapping: Ng()
		})
	};
}
//#endregion
//#region src/module/wfrp4e/critical-replacement.ts
var I_ = !1;
function L_() {
	if (I_) {
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
		if ($g(t)) {
			try {
				let e = await R_(t, a, o);
				if (e !== void 0) return e;
			} catch (e) {
				return r_(`Drowsy's WFRP4e Expanded Damage System could not roll ${t}. See the browser console for details.`, t, e);
			}
			return i(t, a, o);
		}
		let s = H_(t);
		if (!Dg() || !s) return s && r(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: "replacement disabled",
			options: e_(a)
		}), i(t, a, o);
		let c = B_(t, a), l = xe(a.messageId), u, d, f, p, m = l?.category;
		if (r(`${e} | Critical replacement inspecting WFRP critical roll`, {
			table: t,
			location: c,
			options: e_(a)
		}), !m) {
			try {
				u = await V_(a);
			} catch (e) {
				return r_("Drowsy's WFRP4e Expanded Damage System could not resolve the critical source item. See the browser console for details.", t, e);
			}
			let e = F_(u);
			d = e.clues, f = e.defaults, p = e.resolution, m = ne(e.resolution.categories);
		}
		if (r(`${e} | Critical replacement damage category resolution`, {
			table: t,
			location: c,
			sourceItem: t_(u),
			categoryClues: d,
			categoryDefaults: f,
			categoryResolution: p,
			chosenCategory: m,
			damageConsoleSource: l,
			inferFromWeaponProperties: Ag(),
			inferFromWeaponTypes: jg()
		}), !c || !m) return r(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: c ? "damage category unavailable" : "location unavailable"
		}), i(t, a, o);
		let h = gg(!!game.settings.get("wfrp4e", "uiaCrits")), g = mg(h, m, c);
		if (!n(g)) return r_(`Drowsy's WFRP4e Expanded Damage System table ${g} is missing from the module compendium.`, g);
		r(`${e} | Critical replacement rolling expanded table`, {
			table: t,
			expandedTableKey: g,
			ruleset: h,
			category: m,
			location: c
		});
		try {
			let e = await R_(g, a, o);
			if (e !== void 0) return e;
		} catch (e) {
			return r_(`Drowsy's WFRP4e Expanded Damage System could not roll ${g}. See the browser console for details.`, g, e);
		}
		return r_(`Drowsy's WFRP4e Expanded Damage System could not use WFRP's RollTable API for ${g}.`, g);
	}, I_ = !0, r(`${e} | Critical replacement patch installed.`);
}
async function R_(e, t, n) {
	let r = game.wfrp4e?.tables?.rollTable;
	if (typeof r != "function") return;
	let i = await r.call(game.wfrp4e.tables, e, t, n);
	if (await z_(i, t)) return null;
	let a = U_(i);
	return t.returnResult ? i : a?.result;
}
async function z_(t, n) {
	let i = U_(U_(t)?.object)?.documentUuid;
	if (typeof i != "string") return r(`${e} | Expanded critical result had no document UUID`, { result: t }), !1;
	let a = a_(await fromUuid(i), n);
	if (!a) throw Error(`Could not resolve expanded critical item ${i}.`);
	return r(`${e} | Posting expanded critical item`, {
		documentUuid: i,
		messageId: n.messageId,
		criticalLocation: n.criticalLocation
	}), await a.postItem(void 0, { "flags.wfrp4e.sourceMessageId": n.messageId }), !0;
}
function B_(e, t) {
	let n = t.criticalLocation;
	return hg(typeof n == "string" ? n : e.replace(/^crit/i, ""));
}
async function V_(e) {
	let t = e.sourceItemUuid;
	if (typeof t == "string") return await fromUuid(t);
	let n = e.messageId;
	if (typeof n != "string") return;
	let r = U_(U_(game.messages.get(n)?.system)?.test), i = U_(r?.preData);
	return r?.item ?? r?.weapon ?? i?.item;
}
function H_(e) {
	return /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function U_(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/support.ts
var W_ = "ech-wounding-properties", G_ = new Set(Object.values(y));
function K_(e) {
	let t = { ...e };
	for (let e of _) t[y[e]] = x[e];
	return t;
}
function q_(e) {
	return Q_(e) || p_(e) || $_(e);
}
function J_(e) {
	return q_(e);
}
function Y_(e) {
	let t = w_(e).map((e) => x[e]);
	if (t.length > 0) return t;
	let n = f_(e);
	if (n.labels.length > 0) return n.labels.map((e) => `${e} (Default)`);
	let r = F_(e).resolution, i = r.source === "weaponProperty" || r.source === "weaponType" ? " (Inferred)" : "";
	return r.categories.map((e) => `${b[e]}${i}`);
}
function X_(e) {
	if (!(typeof e != "object" || !e)) return e;
}
function Z_(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (!(t.qualities !== void 0 && !Array.isArray(t.qualities))) return t;
}
function Q_(e) {
	return e?.type === "weapon" || e?.type === "ammunition" || e?.system?.isWeapon === !0;
}
function $_(e) {
	return m_(e) || h_(e);
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actions.ts
var ev = `.${W_}__sheet-row a[data-ech-action="configureProperties"]`, tv = /* @__PURE__ */ new Map(), nv = !1;
function rv() {
	nv ||= (document.addEventListener("click", uv, !0), !0);
}
function iv(e) {
	return e?.uuid;
}
function av(e, t) {
	tv.set(e, t);
}
function ov(e) {
	if (e?.type === "spell" || e?.type === "prayer") {
		sv(e);
		return;
	}
	let t = pv();
	!e || !t || new t(e).render(!0);
}
async function sv(t) {
	if (typeof t.update != "function") return;
	let n = cv(new Set(w_(t))), i = await foundry.applications.api.DialogV2.wait({
		buttons: [{
			action: "save",
			callback: (e, t) => lv(t.form),
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
	let a = E_(i);
	try {
		await t.update({ [`flags.${e}.${S_}`]: a });
	} catch (t) {
		r(`${e} | Could not update magic damage types`, { error: t }), ui.notifications?.error("Could not save Damage Types for this item.");
	}
}
function cv(e) {
	let t = document.createElement("div"), n = document.createElement("fieldset"), r = document.createElement("legend"), i = document.createElement("p");
	n.classList.add("fieldset"), r.classList.add("fieldset-legend"), r.textContent = "Damage Types", i.classList.add("label"), i.textContent = "Choose the critical table types this damaging magic item can use.", n.append(r, i);
	for (let t of _) {
		let r = document.createElement("label"), i = document.createElement("input"), a = document.createElement("span");
		r.classList.add("label", "cursor-pointer", "justify-start", "gap-3"), i.classList.add("checkbox", "checkbox-sm"), i.type = "checkbox", i.name = "damageType", i.value = t, i.checked = e.has(t), a.textContent = x[t], r.append(i, a), n.append(r);
	}
	return t.append(n), t;
}
function lv(e) {
	return e ? E_([...e.querySelectorAll("input[name=\"damageType\"]:checked")].map((e) => e.value)) : [];
}
function uv(e) {
	let t = dv(e.target);
	t && (e.preventDefault(), e.stopPropagation(), fv(t));
}
function dv(e) {
	if (e instanceof Element) return e.closest(ev) ?? void 0;
}
async function fv(e) {
	let t = e.closest(`.${W_}__sheet-row`)?.dataset.echItemUuid;
	if (!t) return;
	let n = await fromUuid(t);
	if (!hv(n)) return;
	if (n.type === "spell" || n.type === "prayer") {
		ov(n);
		return;
	}
	let r = tv.get(t);
	if (r) {
		r(n);
		return;
	}
	ov(n);
}
function pv() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	if (mv(e)) return e;
}
function mv(e) {
	return typeof e == "function";
}
function hv(e) {
	return typeof e == "object" && !!e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actor-sheet.ts
var gv = /* @__PURE__ */ new WeakSet();
function _v(e, t) {
	if (!(t instanceof HTMLElement)) return;
	let n = vv(t, "combat"), r = vv(t, "trappings");
	n && (yv(n), bv(e, n)), r && (xv(e, r), !gv.has(r) && (new MutationObserver(() => {
		xv(e, r);
	}).observe(r, {
		childList: !0,
		subtree: !0
	}), gv.add(r)));
}
function vv(e, t) {
	return e.matches(`section[data-tab="${t}"]`) ? e : e.querySelector(`section[data-tab="${t}"]`) ?? void 0;
}
function yv(e) {
	let t = new Set(Object.values(x)), n = e.querySelectorAll(".item-property-row a[data-action=\"itemPropertyDropdown\"][data-type=\"qualities\"]");
	for (let e of n) t.has(e.textContent.trim()) && e.classList.add("ech-wounding-property-combat-text");
}
function bv(e, t) {
	let n = t.querySelectorAll(".list-row[data-uuid] .item-property-row:not([data-ech-inference-checked=\"true\"])");
	for (let t of n) {
		t.dataset.echInferenceChecked = "true";
		let n = wv(e, t);
		if (Dv(n)) for (let e of n.categories) t.append(Ov("combat", e, n));
	}
}
function xv(e, t) {
	Sv(t), Cv(e, t);
}
function Sv(e) {
	let t = new Set(Object.values(x)), n = e.querySelectorAll(".tags .tag:not(.ech-inferred-damage-type)");
	for (let e of n) t.has(e.textContent.trim()) && e.classList.add("ech-wounding-property-trappings-badge");
}
function Cv(e, t) {
	let n = t.querySelectorAll(".list-row[data-uuid] .tags:not([data-ech-inference-checked=\"true\"])");
	for (let t of n) {
		t.dataset.echInferenceChecked = "true";
		let n = wv(e, t);
		if (Dv(n)) for (let e of n.categories) t.append(Ov("trappings", e, n));
	}
}
function wv(t, n) {
	let i = n.closest(".list-row[data-uuid]")?.dataset.uuid;
	if (i) try {
		let n = Tv(t, i);
		if (!Ev(n)) {
			r(`${e} | Inferred damage display skipped for ${i}: item unavailable or unsupported.`);
			return;
		}
		let a = F_(n).resolution;
		return r(`${e} | Inferred damage display resolved ${i}: source=${a.source} categories=${a.categories.join(",") || "none"}`), a;
	} catch (t) {
		r(`${e} | Could not display inferred damage type`, {
			error: t,
			uuid: i
		});
		return;
	}
}
function Tv(e, t) {
	let n = $(e), r = $(($(n?.actor) ?? $(n?.document))?.items), i = r?.get, a = t.split(".").at(-1);
	if (!(typeof i != "function" || !a)) return i.call(r, a);
}
function Ev(e) {
	let t = $(e), n = $(t?.system);
	return t?.type === "weapon" || t?.type === "ammunition" || n?.isWeapon === !0;
}
function Dv(e) {
	return e?.source === "weaponProperty" || e?.source === "weaponType";
}
function Ov(e, t, n) {
	let r = document.createElement(e === "combat" ? "span" : "div"), i = kv(t, n.source, n.matches);
	return r.classList.add("ech-inferred-damage-type", `ech-inferred-damage-type--${e}`), e === "trappings" && r.classList.add("tag"), r.dataset.echDamageCategory = t, r.dataset.tooltip = i, r.setAttribute("aria-label", i), r.textContent = b[t], r;
}
function kv(e, t, n) {
	let r = n.filter((t) => t.category === e).map((e) => Av(e.key, t)), i = t === "weaponProperty" ? "item property" : "weapon type";
	return r.length > 0 ? `Inferred from ${r.join(", ")}` : `Inferred from ${i}`;
}
function Av(e, t) {
	if (t === "weaponProperty") {
		let t = game.wfrp4e?.utility?.qualityList?.() ?? {}, n = ag(e);
		for (let [e, r] of Object.entries(t)) if (ag(e) === n || ag(r) === n) return r;
	}
	return e.replaceAll(/([a-z])([A-Z])/g, "$1 $2").replaceAll(/[_-]+/g, " ").trim().replaceAll(/\b\w/g, (e) => e.toUpperCase());
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/debug.ts
function jv(e) {
	if (!(typeof e != "object" || !e)) return e.constructor?.name;
}
function Mv(e) {
	if (e) return {
		id: e.id,
		name: e.name,
		type: e.type,
		uuid: e.uuid
	};
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet-box.ts
function Nv(e, t, n) {
	let r = document.createElement("div");
	r.classList.add("attribute-box", "top-label", `${W_}__sheet-row`);
	let i = iv(n);
	i && (r.dataset.echItemUuid = i, av(i, Fv(e, n)));
	let a = document.createElement("div");
	a.classList.add("label"), a.style.gridColumn = "1 / span 12", a.innerHTML = "<label><a data-ech-action=\"configureProperties\">Damage Type <i class=\"fas fa-cog\"></i></a></label>";
	let o = document.createElement("div");
	o.classList.add("field"), o.style.gridColumn = "1 / span 12";
	let s = document.createElement("input");
	return s.type = "text", s.value = t.join(","), s.readOnly = !0, o.append(s), r.append(a, o), Pv(r, n), r;
}
function Pv(e, t) {
	e.querySelector("a[data-ech-action=\"configureProperties\"]")?.addEventListener("click", (e) => {
		e.preventDefault(), ov(t);
	});
}
function Fv(e, t) {
	return Iv(e) || ((e) => {
		ov(e ?? t);
	});
}
function Iv(e) {
	if (typeof e != "object" || !e) return;
	let t = e.constructor?.DEFAULT_OPTIONS?.actions?.configureProperties;
	if (typeof t == "function") return (e) => {
		t.call({ document: e });
	};
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet.ts
function Lv(t) {
	if (!(t instanceof HTMLElement)) {
		r(`${e} | ItemProperties render hook skipped: element is not HTMLElement`, { elementType: typeof t });
		return;
	}
	let n = t.querySelector(".property-column");
	if (!n) {
		r(`${e} | ItemProperties render hook skipped: quality column not found.`);
		return;
	}
	let i = zv(n);
	if (i.length === 0) {
		r(`${e} | ItemProperties render hook found no damage type rows`, { checkboxCount: n.querySelectorAll("input[type=\"checkbox\"]").length });
		return;
	}
	r(`${e} | Grouping ItemProperties damage type rows`, { woundingRowCount: i.length });
	let a = n.querySelector(`.${W_}`), o = a ?? document.createElement("div");
	a || (o.classList.add(W_), o.append(Bv()));
	for (let e of i) o.append(e);
	let s = n.querySelector("input[name=\"custom-quality\"]")?.parentElement;
	if (s) {
		s.before(o);
		return;
	}
	n.append(o);
}
function Rv(t, n) {
	if (!(n instanceof HTMLElement)) {
		r(`${e} | Item sheet render hook skipped: element is not HTMLElement`, {
			applicationName: jv(t),
			elementType: typeof n
		});
		return;
	}
	let i = X_(t), a = i?.document ?? i?.item;
	if (!q_(a)) {
		r(`${e} | Item sheet render hook skipped: unsupported document`, {
			applicationName: jv(t),
			document: Mv(a)
		});
		return;
	}
	r(`${e} | Item sheet render hook inspecting supported document`, {
		applicationName: jv(t),
		document: Mv(a)
	});
	let o = Hv(n);
	if (!o) {
		r(`${e} | Item sheet qualities box not found; trying standalone damage row`, { document: Mv(a) }), Vv(t, n, a);
		return;
	}
	let s = o.querySelector(".field input");
	if (!s) {
		r(`${e} | Item sheet qualities input not found`, { document: Mv(a) });
		return;
	}
	let c = Uv(s.value), l = c.wounding.length > 0 ? c.wounding : Y_(a);
	if (l.length === 0) {
		r(`${e} | Item sheet qualities contain no damage type labels`, {
			document: Mv(a),
			displayedQualities: s.value
		});
		return;
	}
	r(`${e} | Splitting item sheet damage type labels into their own row`, {
		document: Mv(a),
		normalQualities: c.normal,
		woundingQualities: c.wounding
	}), s.value = c.normal.join(","), o.parentElement?.querySelector(`.${W_}__sheet-row`)?.remove(), o.after(Nv(t, l, a));
}
function zv(e) {
	let t = e.querySelectorAll("input[type=\"checkbox\"]"), n = [];
	for (let e of t) {
		if (!G_.has(e.name)) continue;
		let t = e.closest(".form-group");
		t && n.push(t);
	}
	return n;
}
function Bv() {
	let e = document.createElement("h2");
	return e.classList.add("property-header", `${W_}__header`), e.textContent = "Damage Type", e;
}
function Vv(t, n, i) {
	if (!J_(i)) {
		r(`${e} | Standalone damage type row skipped: unsupported document`, { document: Mv(i) });
		return;
	}
	if (n.querySelector(".ech-wounding-properties__sheet-row")) {
		r(`${e} | Standalone damage type row skipped: row already exists`, { document: Mv(i) });
		return;
	}
	let a = Wv(n);
	if (!a) {
		r(`${e} | Standalone damage type row skipped: damage fieldset not found`, { document: Mv(i) });
		return;
	}
	let o = Y_(i);
	r(`${e} | Appending standalone damage type row`, {
		document: Mv(i),
		labels: o
	}), a.after(Nv(t, o, i));
}
function Hv(e) {
	let t = e.querySelectorAll("a[data-action=\"configureProperties\"]");
	for (let e of t) if (e.textContent.trim().startsWith("Qualities")) return e.closest(".attribute-box") ?? void 0;
}
function Uv(e) {
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
function Wv(e) {
	let t = e.querySelectorAll("fieldset");
	for (let e of t) if (e.querySelector("legend")?.textContent.trim() === "Damage") return e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/display.ts
var Gv = !1, Kv = Symbol.for(`${e}.woundingPropertiesContextPatched`);
function qv() {
	if (rv(), Xv(), Gv) {
		r(`${e} | Wounding property display hooks already installed.`);
		return;
	}
	Hooks.on("renderItemProperties", (e, t) => {
		Lv(t);
	}), Hooks.on("renderApplicationV2", (e, t) => {
		Rv(e, t), _v(e, t), Yv(e) && Jv(e);
	}), Hooks.on("renderBaseWFRP4eActorSheet", (e, t) => {
		_v(e, t), Jv(e);
	}), Gv = !0, r(`${e} | Wounding property display hooks installed.`);
}
function Jv(t, n = 5) {
	typeof t != "object" || !t || requestAnimationFrame(() => {
		let i = t.element;
		if (i instanceof HTMLElement && i.isConnected) {
			r(`${e} | Styling committed WFRP actor sheet with ${i.querySelectorAll(".item-property-row").length} property rows.`), _v(t, i);
			return;
		}
		if (n > 1) {
			Jv(t, n - 1);
			return;
		}
		r(`${e} | Committed WFRP actor sheet element was unavailable.`);
	});
}
function Yv(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e.actor;
	return typeof t == "object" && !!t;
}
function Xv() {
	let t = Zv()?.prototype, n = t?._prepareContext;
	if (!t || !n) {
		r(`${e} | ItemProperties context patch skipped: application unavailable.`);
		return;
	}
	if (Qv(n)) {
		r(`${e} | ItemProperties context patch already installed.`);
		return;
	}
	let i = async function(...e) {
		let t = this.document;
		q_(t) && (this.qualities = K_(this.qualities ?? {}));
		let r = await n.apply(this, e);
		return $v(this, r), r;
	};
	Object.defineProperty(i, Kv, { value: !0 }), t._prepareContext = i, r(`${e} | ItemProperties context patch installed.`);
}
function Zv() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	return typeof e == "function" ? e : void 0;
}
function Qv(e) {
	return !!e[Kv];
}
function $v(t, n) {
	let i = X_(t), a = Z_(n), o = i?.document;
	if (!i || !a || !q_(o)) {
		r(`${e} | Skipping ItemProperties damage type context append`, {
			applicationName: ey(t),
			hasItemProperties: !!i,
			hasRenderContext: !!a,
			document: ty(o),
			supportsDamageTypeProperties: q_(o)
		});
		return;
	}
	r(`${e} | Appending damage types to ItemProperties context`, {
		applicationName: ey(t),
		document: ty(o),
		originalQualityCount: Object.keys(i.qualities ?? {}).length,
		renderedQualityCount: a.qualities?.length ?? 0
	}), i.qualities = K_(i.qualities ?? {}), a.qualities ??= [];
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
		document: ty(o),
		renderedQualityCount: a.qualities.length
	});
}
function ey(e) {
	if (!(typeof e != "object" || !e)) return e.constructor?.name;
}
function ty(e) {
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
var ny = !1;
function ry() {
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
	}), iy(), qv();
}
function iy() {
	let t = game.wfrp4e?.utility, n = t?.qualityList;
	if (ny || !t || !n) {
		r(`${e} | Quality list patch skipped`, {
			qualityListPatchInstalled: ny,
			hasUtility: !!t,
			hasOriginalQualityList: !!n
		});
		return;
	}
	t.qualityList = function(e) {
		let t = n.call(this, e);
		return e === "armor" ? t : K_(t);
	}, ny = !0, r(`${e} | Quality list patch installed.`);
}
//#endregion
//#region src/module/wfrp4e/zero-wound-critical-links.ts
var ay = "data-ech-source-item-uuid", oy = "data-ech-critical-location", sy = !1;
function cy() {
	sy ||= (ly(), document.addEventListener("click", py, !0), !0);
}
function ly() {
	let e = CONFIG.Actor?.documentClass?.prototype, t = e?.applyDamage;
	typeof t != "function" || !e || (e.applyDamage = async function(e, n = {}) {
		let r = await t.call(this, e, n), i = uy(n);
		return typeof r != "string" || !i || !r.includes("critical-roll") ? r : fy(r, i, dy(n));
	});
}
function uy(e) {
	let t = yy(yy(e.sourceTest)?.item), n = yy(yy(yy(e.opposedTest)?.attackerTest)?.item), r = yy(e.sourceItem), i = t?.uuid ?? n?.uuid ?? r?.uuid;
	return typeof i == "string" ? i : void 0;
}
function dy(e) {
	let t = yy(yy(e.opposedTest)?.result)?.hitloc, n = yy(t)?.value, r = e.loc, i;
	return typeof n == "string" ? i = n : typeof r == "string" && (i = r), i && hg(i) ? i : void 0;
}
function fy(e, t, n) {
	let r = [`${ay}="${vy(t)}"`, n ? `${oy}="${vy(n)}"` : void 0].filter(Boolean).join(" ");
	return e.replaceAll(/<a\b(?![^>]*\bdata-ech-source-item-uuid=)(?=[^>]*\bcritical-roll\b)/g, `<a ${r}`);
}
function py(e) {
	let t = e.target;
	if (!(t instanceof Element) || !Dg()) return;
	let n = t.closest(`[data-action="clickTable"][${ay}]`);
	!(n instanceof HTMLElement) || !_y(n.dataset.table) || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), my(n).catch((e) => {
		hy("Drowsy's WFRP4e Expanded Damage System could not roll an annotated zero-wound critical. See the browser console for details.", e);
	}));
}
async function my(e) {
	let t = e.dataset.table, n = game.wfrp4e?.tables?.formatChatRoll;
	if (!t || typeof n != "function") return;
	let r = e.closest("[data-message-id]")?.dataset.messageId, i = Number.parseInt(e.dataset.modifier ?? "0", 10) || 0, a = await n(t, {
		criticalLocation: e.dataset.echCriticalLocation ?? gy(r),
		messageId: r,
		modifier: i,
		showRoll: !0,
		sourceItemUuid: e.dataset.echSourceItemUuid
	}, e.dataset.column);
	if (typeof a != "string" || a.length === 0) return;
	let o = game.wfrp4e?.utility?.chatDataSetup, s = typeof o == "function" ? o("", game.settings.get("core", "rollMode"), !0) : { content: "" };
	s.content = a, await ChatMessage.create(s);
}
function hy(t, n) {
	o(`${e} | ${t}`, n), ui.notifications?.error(t);
}
function gy(e) {
	if (!e) return;
	let t = yy(yy(yy(game.messages.get(e)?.system)?.test)?.result)?.hitloc, n = yy(t)?.result;
	return typeof n == "string" ? n : void 0;
}
function _y(e) {
	return typeof e == "string" && /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function vy(e) {
	return e.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function yy(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function by() {
	Hooks.once("init", () => {
		i(`${e} | Initializing`), Eg(), r(`${e} | init hook running`, {
			foundryVersion: game.version,
			systemId: game.system?.id,
			userIsGM: game.user?.isGM
		}), qv(), tg(), ry();
	}), Hooks.once("ready", () => {
		xy();
	});
}
async function xy() {
	if (r(`${e} | ready hook running`, {
		foundryVersion: game.version,
		systemId: game.system?.id,
		userIsGM: game.user?.isGM,
		settings: Ig(),
		wfrpConfigAvailable: !!game.wfrp4e?.config,
		wfrpTablesAvailable: !!game.wfrp4e?.tables
	}), game.system.id !== "wfrp4e") {
		a(`${e} | Loaded outside ${t}; skipping WFRP integration.`);
		return;
	}
	Zg(), await kg(), r(`${e} | ready hook after mapping normalization`, { settings: Ig() }), ry(), await d(), Hg(), L_(), cy(), i(`${e} | Ready`);
}
//#endregion
//#region src/main.ts
by();
//#endregion

//# sourceMappingURL=wfrp4e-expanded-critical-hits.mjs.map