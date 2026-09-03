//#region src/module/constants.ts
var e = "wfrp4e-expanded-critical-hits", t = "wfrp4e", n = "debugConsoleLogging", r = "criticalReviewActorId", i = "criticalReviewNotes";
//#endregion
//#region src/module/logging.ts
function a(e, ...t) {
	l() && console.debug(e, ...t);
}
function o(e, ...t) {
	console.info(e, ...t);
}
function s(e, ...t) {
	console.warn(e, ...t);
}
function c(e, ...t) {
	console.error(e, ...t);
}
function l() {
	try {
		return localStorage.getItem("wfrp4e-expanded-critical-hits.debug") === "true" ? !0 : game?.settings?.settings?.has("wfrp4e-expanded-critical-hits.debugConsoleLogging") ? !!game.settings.get(e, n) : !1;
	} catch {
		return !1;
	}
}
//#endregion
//#region src/module/wfrp4e/critical-compendiums.ts
var u = "expanded-critical-wounds", d = "expanded-critical-tables", f = !1;
async function p() {
	if (f) return;
	let t = game.wfrp4e?.tables, n = t?.findTable?.bind(t);
	if (!t || typeof n != "function") {
		s(`${e} | WFRP table lookup API was unavailable.`);
		return;
	}
	let r = await g();
	r.size === 0 && s(`${e} | No expanded critical RollTables were found in the module pack.`), t.findTable = (e, t) => n(e, t) || r.get(e.toLowerCase()), f = !0;
}
async function m() {
	return {
		criticalItems: await _(u, "Items"),
		criticalTables: await _(d, "Tables")
	};
}
function h(t) {
	return `${e}.${t}`;
}
async function g() {
	let e = /* @__PURE__ */ new Map(), t = game.packs.get(h(d));
	if (!t) return e;
	let n = await t.getDocuments();
	for (let t of n) {
		let n = t.getFlag("wfrp4e", "key");
		typeof n == "string" && e.set(n.toLowerCase(), t);
	}
	return e;
}
async function _(e, t) {
	let n = h(e), r = game.packs.get(n);
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
var v = [
	"head",
	"arm",
	"body",
	"leg"
], y = [
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
], b = [
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
], ee = {
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
}, x = {
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
}, te = {
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
}, S = {
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
}, ne = {
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
}, re = new Map(b.map((e) => [x[e], ne[e]])), ie = new Map(y.map((e) => [ee[e], e]));
function ae(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = re.get(n) ?? ie.get(n);
		e && t.add(e);
	}
	return y.filter((e) => t.has(e));
}
function oe(e, t = Math.random()) {
	if (e.length !== 0) return e[Math.min(Math.floor(t * e.length), e.length - 1)];
}
var se = [
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
function C(e) {
	return {
		...e,
		damageFormula: e.damageFormula.trim(),
		rollSeparately: e.rollSeparately !== !1,
		targetUuids: [...new Set(e.targetUuids.map((e) => e.trim()).filter(Boolean))]
	};
}
function ce(e) {
	let t = [];
	return e.damageFormula.trim() || t.push("damageFormulaRequired"), se.includes(e.hitLocation) || t.push("hitLocationInvalid"), e.targetUuids.every((e) => !e.trim()) && t.push("targetsRequired"), e.woundingType !== null && !b.includes(e.woundingType) && t.push("woundingTypeInvalid"), t;
}
//#endregion
//#region src/functions/damage-console/card.ts
function le(e, t) {
	let n = C(e), r = new Map(t.map((e) => [e.uuid, e]));
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
function ue(e, t) {
	if (e.rollSeparately) throw Error("This damage card rolls separately for each target.");
	if (e.roll) throw Error("Damage has already been rolled for this card.");
	return {
		...e,
		roll: t
	};
}
function de(e, t, n) {
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
function fe(e, t, n) {
	let r = pe(e, t), i = !1, a = e.targets.map((e) => {
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
function pe(e, t) {
	let n = e.targets.find((e) => e.uuid === t);
	return e.rollSeparately ? n?.roll : e.roll;
}
function me(e) {
	if (e.woundingType) return {
		category: ne[e.woundingType],
		woundingType: e.woundingType
	};
}
//#endregion
//#region src/functions/damage-console/card-parser.ts
function he(e) {
	let t = Ce(e);
	if (t?.version !== 1 && t?.version !== 2 || typeof t.damageFormula != "string" || !xe(t.hitLocation) || typeof t.ignoreArmour != "boolean" || typeof t.ignoreToughness != "boolean" || typeof t.minimumOne != "boolean" || !Se(t.woundingType) || !Array.isArray(t.targets)) return;
	let n = t.targets.map((e) => t.version === 1 ? ye(e) : ge(e)), r = t.version === 1 ? !0 : t.rollSeparately, i = t.version === 1 || t.roll === null ? null : ve(t.roll);
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
function ge(e) {
	let t = Ce(e), n = be(t);
	if (!t || !n) return;
	let r = t.roll === null ? null : ve(t.roll), i = t.result === null ? null : _e(t.result);
	if (!(r === void 0 || i === void 0)) return {
		...n,
		result: i,
		roll: r
	};
}
function _e(e) {
	let t = Ce(e);
	if (!(typeof t?.appliedAt != "number" || typeof t.appliedBy != "string" || typeof t.hitLocation != "string" || typeof t.html != "string")) return {
		appliedAt: t.appliedAt,
		appliedBy: t.appliedBy,
		hitLocation: t.hitLocation,
		html: t.html
	};
}
function ve(e) {
	let t = Ce(e);
	if (!(typeof t?.damage != "number" || typeof t.rolledAt != "number" || typeof t.rolledBy != "string")) return {
		damage: t.damage,
		rolledAt: t.rolledAt,
		rolledBy: t.rolledBy
	};
}
function ye(e) {
	let t = Ce(e), n = be(t);
	if (!t || !n) return;
	if (t.result === null) return {
		...n,
		result: null,
		roll: null
	};
	let r = Ce(t.result);
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
function be(e) {
	if (!(typeof e?.uuid != "string" || typeof e.name != "string" || typeof e.img != "string")) return {
		img: e.img,
		name: e.name,
		uuid: e.uuid
	};
}
function xe(e) {
	return typeof e == "string" && se.includes(e);
}
function Se(e) {
	return e === null || typeof e == "string" && b.includes(e);
}
function Ce(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/card-storage.ts
var we = "damageConsole";
function Te(t) {
	return he(t.getFlag(e, we));
}
function Ee(e) {
	if (typeof e != "string") return;
	let t = game.messages.get(e), n = t ? Te(t) : void 0;
	return n ? me(n) : void 0;
}
function De(t, n) {
	let r = ke(t.flags) ?? {}, i = ke(r["wfrp4e-expanded-critical-hits"]) ?? {};
	t.flags = {
		...r,
		[e]: {
			...i,
			[we]: n
		}
	};
}
function Oe(t) {
	return { [`flags.${e}.${we}`]: t };
}
function ke(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/card-renderer.ts
function Ae(e) {
	let t = e.woundingType ? S[e.woundingType] : w("damageConsole.unspecified"), n = [e.ignoreArmour ? w("damageConsole.ignoreArmour") : void 0, e.ignoreToughness ? w("damageConsole.ignoreToughness") : void 0].filter((e) => !!e), r = n.length ? n.join(", ") : w("damageConsole.none");
	return `<div class="wfrp4e chat-card ech-damage-console-card">
    <h3><i class="fa-solid fa-bolt"></i> ${Le(w("damageConsole.cardTitle"))}</h3>
    <dl class="ech-damage-console-card__summary">
      ${Pe(w("damageConsole.damage"), e.damageFormula)}
      ${Pe(w("damageConsole.hitLocation"), Fe(e.hitLocation))}
      ${Pe(w("damageConsole.woundingType"), t)}
      ${Pe(w("damageConsole.ignores"), r)}
      ${Pe(w("damageConsole.minimumOne"), Ie(e.minimumOne))}
      ${Pe(w("damageConsole.rollMode"), w(e.rollSeparately ? "damageConsole.rollSeparately" : "damageConsole.rollTogether"))}
    </dl>
    ${je(e)}
    <div class="ech-damage-console-card__targets">
      ${e.targets.map((t) => Me(e, t)).join("")}
    </div>
  </div>`;
}
function je(e) {
	return e.rollSeparately ? "" : e.roll ? Ne(e.roll.damage) : `<button type="button" class="chat-button chat-button-gm ech-damage-console-card__action"
    data-ech-action="rollDamage">
    <i class="fa-solid fa-dice-d20"></i> ${Le(w("damageConsole.rollDamage"))}
  </button>`;
}
function Me(e, t) {
	let n = `<div class="ech-damage-console-card__identity">
    <img src="${Re(t.img)}" alt="" />
    <strong>${Le(t.name)}</strong>
  </div>`, r = e.rollSeparately ? t.roll : e.roll;
	if (!r) return `<section class="ech-damage-console-card__target">
      ${n}
      ${e.rollSeparately ? `<button type="button" class="chat-button chat-button-gm ech-damage-console-card__action"
        data-ech-action="rollDamage" data-target-uuid="${Re(t.uuid)}">
        <i class="fa-solid fa-dice-d20"></i> ${Le(w("damageConsole.rollDamage"))}
      </button>` : ""}
    </section>`;
	let i = Ne(r.damage, t.result?.hitLocation);
	return t.result ? `<section class="ech-damage-console-card__target ech-damage-console-card__target--applied">
    ${n}
    ${i}
    <div class="ech-damage-console-card__result">${t.result.html}</div>
  </section>` : `<section class="ech-damage-console-card__target ech-damage-console-card__target--rolled">
    ${n}
    ${i}
    <button type="button" class="chat-button chat-button-gm ech-damage-console-card__action"
      data-ech-action="applyDamage" data-target-uuid="${Re(t.uuid)}">
      <i class="fa-solid fa-bolt"></i> ${Le(w("damageConsole.applyDamage"))}
    </button>
  </section>`;
}
function Ne(e, t) {
	let n = t ? ` &middot; ${Le(Fe(t))}` : "";
	return `<p class="ech-damage-console-card__roll">
    ${Le(w("damageConsole.rolled"))}: <strong>${e}</strong>${n}
  </p>`;
}
function Pe(e, t) {
	return `<div><dt>${Le(e)}</dt><dd>${Le(t)}</dd></div>`;
}
function Fe(e) {
	if (e === "roll") return game.i18n.localize("Roll");
	let t = game.wfrp4e?.config?.locations?.[e];
	return t ? game.i18n.localize(t) : e;
}
function Ie(e) {
	return w(e ? "damageConsole.yes" : "damageConsole.no");
}
function w(e) {
	return game.i18n.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.${e}`);
}
function Le(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#039;");
}
function Re(e) {
	return Le(e);
}
//#endregion
//#region src/module/wfrp4e/damage-console/targets.ts
function ze() {
	let e = [...game.user.targets].map(Ve).filter((e) => !!e);
	return [...new Map(e.map((e) => [e.uuid, e])).values()];
}
async function Be(e) {
	let t = await fromUuid(e), n = t?.actor ?? t;
	if (!He(n)) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.targetUnavailable", { uuid: e }));
	return {
		actor: n,
		snapshot: {
			img: Ue(t?.texture?.src) ?? "icons/svg/mystery-man.svg",
			name: Ue(t?.name) ?? e,
			uuid: e
		}
	};
}
function Ve(e) {
	let t = e, n = t?.document, r = Ue(n?.uuid);
	if (!(!r || !He(n?.actor ?? t?.actor))) return {
		img: Ue(n?.texture?.src) ?? Ue(t?.texture?.src) ?? "icons/svg/mystery-man.svg",
		name: Ue(t?.name) ?? Ue(n?.name) ?? r,
		uuid: r
	};
}
function He(e) {
	return typeof e == "object" && !!e && typeof e.applyBasicDamage == "function";
}
function Ue(e) {
	return typeof e == "string" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/runtime.ts
async function We(e, t) {
	let n = pe(e, t);
	if (!n) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.rollRequired"));
	let { actor: r } = await Be(t), i = await qe(e, r), a = Je(e.ignoreArmour, e.ignoreToughness), o = await r.applyBasicDamage(n.damage, {
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
async function Ge(e) {
	let { damage: t, roll: n } = await Ke(e.damageFormula);
	return await n.toMessage({ flavor: game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.title") }), {
		damage: t,
		rolledAt: Date.now(),
		rolledBy: game.user.name
	};
}
async function Ke(e) {
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
async function qe(e, t) {
	if (e.hitLocation !== "roll") return e.hitLocation;
	let n = Xe(t.details?.hitLocationTable?.value) ?? Xe(t.system?.details?.hitLocationTable?.value) ?? "hitloc", r = Xe(Ye(await game.wfrp4e?.tables?.rollTable?.(n, { hideDSN: !0 }))?.result);
	if (!r) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.hitLocationFailed"));
	return r;
}
function Je(e, t) {
	let n = game.wfrp4e?.config?.DAMAGE_TYPE;
	if (!n) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.damageApiUnavailable"));
	return e && t ? n.IGNORE_ALL : e ? n.IGNORE_AP : t ? n.IGNORE_TB : n.NORMAL;
}
function Ye(e) {
	return typeof e == "object" && e ? e : void 0;
}
function Xe(e) {
	return typeof e == "string" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/chat-actions.ts
var Ze = /* @__PURE__ */ new Map();
function Qe() {
	Hooks.on("renderChatMessageHTML", (e, t) => {
		if (!st(e) || !(t instanceof HTMLElement) || !Te(e)) return;
		let n = t.querySelectorAll("[data-ech-action]");
		if (!game.user.isGM) {
			n.forEach((e) => e.remove());
			return;
		}
		n.forEach((t) => {
			t.addEventListener("click", (n) => {
				n.preventDefault();
				let r = t.dataset.targetUuid, i = t.dataset.echAction;
				!ot(i) || i === "applyDamage" && !r || (t.disabled = !0, $e(e, r, i).catch((e) => {
					t.disabled = !1, ui.notifications?.error(ct(e));
				}));
			});
		});
	});
}
async function $e(e, t, n) {
	let r = (Ze.get(e.id) ?? Promise.resolve()).catch(() => void 0).then(async () => {
		if (n === "rollDamage") {
			await et(e, t);
			return;
		}
		t && await tt(e, t);
	});
	Ze.set(e.id, r);
	try {
		await r;
	} finally {
		Ze.get(e.id) === r && Ze.delete(e.id);
	}
}
async function et(e, t) {
	let n = rt(e);
	if (!n.rollSeparately) {
		if (n.roll) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.alreadyRolledShared"));
		await at(e, ue(n, await Ge(n)));
		return;
	}
	if (!t) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.cardTargetUnavailable"));
	let r = it(n, t);
	if (r.roll) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.alreadyRolled", { name: r.name }));
	await at(e, de(n, t, await Ge(n)));
}
async function tt(e, t) {
	let { card: n, target: r } = nt(e, t);
	if (!pe(n, t)) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.rollRequired", { name: r.name }));
	if (r.result) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.alreadyApplied", { name: r.name }));
	await at(e, fe(n, t, await We(n, t)));
}
function nt(e, t) {
	let n = rt(e);
	return {
		card: n,
		target: it(n, t)
	};
}
function rt(e) {
	let t = Te(e);
	if (!t) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.cardUnavailable"));
	return t;
}
function it(e, t) {
	let n = e.targets.find((e) => e.uuid === t);
	if (!n) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.cardTargetUnavailable"));
	return n;
}
async function at(e, t) {
	await e.update({
		...Oe(t),
		content: Ae(t)
	});
}
function ot(e) {
	return e === "applyDamage" || e === "rollDamage";
}
function st(e) {
	return typeof e == "object" && !!e && typeof e.getFlag == "function" && typeof e.update == "function";
}
function ct(e) {
	return e instanceof Error ? e.message : String(e);
}
//#endregion
//#region node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function lt(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var T = {}, ut = [], dt = () => {}, ft = () => !1, pt = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), mt = (e) => e.startsWith("onUpdate:"), E = Object.assign, ht = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, gt = Object.prototype.hasOwnProperty, D = (e, t) => gt.call(e, t), O = Array.isArray, _t = (e) => Ct(e) === "[object Map]", vt = (e) => Ct(e) === "[object Set]", yt = (e) => Ct(e) === "[object Date]", k = (e) => typeof e == "function", A = (e) => typeof e == "string", bt = (e) => typeof e == "symbol", j = (e) => typeof e == "object" && !!e, xt = (e) => (j(e) || k(e)) && k(e.then) && k(e.catch), St = Object.prototype.toString, Ct = (e) => St.call(e), wt = (e) => Ct(e).slice(8, -1), Tt = (e) => Ct(e) === "[object Object]", Et = (e) => A(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Dt = /* @__PURE__ */ lt(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Ot = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, kt = /-\w/g, At = Ot((e) => e.replace(kt, (e) => e.slice(1).toUpperCase())), jt = /\B([A-Z])/g, Mt = Ot((e) => e.replace(jt, "-$1").toLowerCase()), Nt = Ot((e) => e.charAt(0).toUpperCase() + e.slice(1)), Pt = Ot((e) => e ? `on${Nt(e)}` : ""), Ft = (e, t) => !Object.is(e, t), It = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, Lt = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, Rt = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, zt, Bt = () => zt ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function Vt(e) {
	if (O(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = A(r) ? Gt(r) : Vt(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (A(e) || j(e)) return e;
}
var Ht = /;(?![^(]*\))/g, Ut = /:([^]+)/, Wt = /\/\*[^]*?\*\//g;
function Gt(e) {
	let t = {};
	return e.replace(Wt, "").split(Ht).forEach((e) => {
		if (e) {
			let n = e.split(Ut);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function Kt(e) {
	let t = "";
	if (A(e)) t = e;
	else if (O(e)) for (let n = 0; n < e.length; n++) {
		let r = Kt(e[n]);
		r && (t += r + " ");
	}
	else if (j(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var qt = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Jt = /* @__PURE__ */ lt(qt);
qt + "";
function Yt(e) {
	return !!e || e === "";
}
function Xt(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = Zt(e[r], t[r]);
	return n;
}
function Zt(e, t) {
	if (e === t) return !0;
	let n = yt(e), r = yt(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = bt(e), r = bt(t), n || r) return e === t;
	if (n = O(e), r = O(t), n || r) return n && r ? Xt(e, t) : !1;
	if (n = j(e), r = j(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !Zt(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function Qt(e, t) {
	return e.findIndex((e) => Zt(e, t));
}
var $t = (e) => !!(e && e.__v_isRef === !0), M = (e) => A(e) ? e : e == null ? "" : O(e) || j(e) && (e.toString === St || !k(e.toString)) ? $t(e) ? M(e.value) : JSON.stringify(e, en, 2) : String(e), en = (e, t) => $t(t) ? en(e, t.value) : _t(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[tn(t, r) + " =>"] = n, e), {}) } : vt(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => tn(e)) } : bt(t) ? tn(t) : j(t) && !O(t) && !Tt(t) ? String(t) : t, tn = (e, t = "") => bt(e) ? `Symbol(${e.description ?? t})` : e, N, nn = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && N && (N.active ? (this.parent = N, this.index = (N.scopes ||= []).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
			let t = N;
			try {
				return N = this, e();
			} finally {
				N = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = N, N = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (N === this) N = this.prevScope;
			else {
				let e = N;
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
function rn(e) {
	return new nn(e);
}
function an() {
	return N;
}
function on(e, t = !1) {
	N && N.cleanups.push(e);
}
var P, sn = /* @__PURE__ */ new WeakSet(), cn = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, N && (N.active ? N.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, sn.has(this) && (sn.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || fn(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Tn(this), hn(this);
		let e = P, t = xn;
		P = this, xn = !0;
		try {
			return this.fn();
		} finally {
			gn(this), P = e, xn = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) yn(e);
			this.deps = this.depsTail = void 0, Tn(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? sn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		_n(this) && this.run();
	}
	get dirty() {
		return _n(this);
	}
}, ln = 0, un, dn;
function fn(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = dn, dn = e;
		return;
	}
	e.next = un, un = e;
}
function pn() {
	ln++;
}
function mn() {
	if (--ln > 0) return;
	if (dn) {
		let e = dn;
		for (dn = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; un;) {
		let t = un;
		for (un = void 0; t;) {
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
function hn(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function gn(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), yn(r), bn(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function _n(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (vn(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function vn(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === En) || (e.globalVersion = En, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !_n(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = P, r = xn;
	P = e, xn = !0;
	try {
		hn(e);
		let n = e.fn(e._value);
		(t.version === 0 || Ft(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		P = n, xn = r, gn(e), e.flags &= -3;
	}
}
function yn(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) yn(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function bn(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var xn = !0, Sn = [];
function Cn() {
	Sn.push(xn), xn = !1;
}
function wn() {
	let e = Sn.pop();
	xn = e === void 0 ? !0 : e;
}
function Tn(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = P;
		P = void 0;
		try {
			t();
		} finally {
			P = e;
		}
	}
}
var En = 0, Dn = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, On = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!P || !xn || P === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== P) t = this.activeLink = new Dn(P, this), P.deps ? (t.prevDep = P.depsTail, P.depsTail.nextDep = t, P.depsTail = t) : P.deps = P.depsTail = t, kn(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = P.depsTail, t.nextDep = void 0, P.depsTail.nextDep = t, P.depsTail = t, P.deps === t && (P.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, En++, this.notify(e);
	}
	notify(e) {
		pn();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			mn();
		}
	}
};
function kn(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) kn(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var An = /* @__PURE__ */ new WeakMap(), jn = /* @__PURE__ */ Symbol(""), Mn = /* @__PURE__ */ Symbol(""), Nn = /* @__PURE__ */ Symbol("");
function F(e, t, n) {
	if (xn && P) {
		let t = An.get(e);
		t || An.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new On()), r.map = t, r.key = n), r.track();
	}
}
function Pn(e, t, n, r, i, a) {
	let o = An.get(e);
	if (!o) {
		En++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (pn(), t === "clear") o.forEach(s);
	else {
		let i = O(e), a = i && Et(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === Nn || !bt(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(Nn)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(jn)), _t(e) && s(o.get(Mn)));
				break;
			case "delete":
				i || (s(o.get(jn)), _t(e) && s(o.get(Mn)));
				break;
			case "set":
				_t(e) && s(o.get(jn));
				break;
		}
	}
	mn();
}
function Fn(e, t) {
	let n = An.get(e);
	return n && n.get(t);
}
function In(e) {
	let t = /* @__PURE__ */ L(e);
	return t === e ? t : (F(t, "iterate", Nn), /* @__PURE__ */ I(e) ? t : t.map(Cr));
}
function Ln(e) {
	return F(e = /* @__PURE__ */ L(e), "iterate", Nn), e;
}
function Rn(e, t) {
	return /* @__PURE__ */ br(e) ? wr(/* @__PURE__ */ yr(e) ? Cr(t) : t) : Cr(t);
}
var zn = {
	__proto__: null,
	[Symbol.iterator]() {
		return Bn(this, Symbol.iterator, (e) => Rn(this, e));
	},
	concat(...e) {
		return In(this).concat(...e.map((e) => O(e) ? In(e) : e));
	},
	entries() {
		return Bn(this, "entries", (e) => (e[1] = Rn(this, e[1]), e));
	},
	every(e, t) {
		return Hn(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return Hn(this, "filter", e, t, (e) => e.map((e) => Rn(this, e)), arguments);
	},
	find(e, t) {
		return Hn(this, "find", e, t, (e) => Rn(this, e), arguments);
	},
	findIndex(e, t) {
		return Hn(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return Hn(this, "findLast", e, t, (e) => Rn(this, e), arguments);
	},
	findLastIndex(e, t) {
		return Hn(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return Hn(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return Wn(this, "includes", e);
	},
	indexOf(...e) {
		return Wn(this, "indexOf", e);
	},
	join(e) {
		return In(this).join(e);
	},
	lastIndexOf(...e) {
		return Wn(this, "lastIndexOf", e);
	},
	map(e, t) {
		return Hn(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return Gn(this, "pop");
	},
	push(...e) {
		return Gn(this, "push", e);
	},
	reduce(e, ...t) {
		return Un(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return Un(this, "reduceRight", e, t);
	},
	shift() {
		return Gn(this, "shift");
	},
	some(e, t) {
		return Hn(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return Gn(this, "splice", e);
	},
	toReversed() {
		return In(this).toReversed();
	},
	toSorted(e) {
		return In(this).toSorted(e);
	},
	toSpliced(...e) {
		return In(this).toSpliced(...e);
	},
	unshift(...e) {
		return Gn(this, "unshift", e);
	},
	values() {
		return Bn(this, "values", (e) => Rn(this, e));
	}
};
function Bn(e, t, n) {
	let r = Ln(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ I(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var Vn = Array.prototype;
function Hn(e, t, n, r, i, a) {
	let o = Ln(e), s = o !== e && !/* @__PURE__ */ I(e), c = o[t];
	if (c !== Vn[t]) {
		let t = c.apply(e, a);
		return s ? Cr(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, Rn(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function Un(e, t, n, r) {
	let i = Ln(e), a = i !== e && !/* @__PURE__ */ I(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = Rn(e, t)), n.call(this, t, Rn(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? Rn(e, c) : c;
}
function Wn(e, t, n) {
	let r = /* @__PURE__ */ L(e);
	F(r, "iterate", Nn);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ xr(n[0]) ? (n[0] = /* @__PURE__ */ L(n[0]), r[t](...n)) : i;
}
function Gn(e, t, n = []) {
	Cn(), pn();
	let r = (/* @__PURE__ */ L(e))[t].apply(e, n);
	return mn(), wn(), r;
}
var Kn = /* @__PURE__ */ lt("__proto__,__v_isRef,__isVue"), qn = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(bt));
function Jn(e) {
	bt(e) || (e = String(e));
	let t = /* @__PURE__ */ L(this);
	return F(t, "has", e), t.hasOwnProperty(e);
}
var Yn = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? pr : fr : i ? dr : ur).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = O(e);
		if (!r) {
			let e;
			if (a && (e = zn[t])) return e;
			if (t === "hasOwnProperty") return Jn;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ R(e) ? e : n);
		if ((bt(t) ? qn.has(t) : Kn(t)) || (r || F(e, "get", t), i)) return o;
		if (/* @__PURE__ */ R(o)) {
			let e = a && Et(t) ? o : o.value;
			return r && j(e) ? /* @__PURE__ */ _r(e) : e;
		}
		return j(o) ? r ? /* @__PURE__ */ _r(o) : /* @__PURE__ */ hr(o) : o;
	}
}, Xn = class extends Yn {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = O(e) && Et(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ br(i);
			if (!/* @__PURE__ */ I(n) && !/* @__PURE__ */ br(n) && (i = /* @__PURE__ */ L(i), n = /* @__PURE__ */ L(n)), !a && /* @__PURE__ */ R(i) && !/* @__PURE__ */ R(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : D(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ R(e) ? e : r);
		return e === /* @__PURE__ */ L(r) && (o ? Ft(n, i) && Pn(e, "set", t, n, i) : Pn(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = D(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && Pn(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!bt(t) || !qn.has(t)) && F(e, "has", t), n;
	}
	ownKeys(e) {
		return F(e, "iterate", O(e) ? "length" : jn), Reflect.ownKeys(e);
	}
}, Zn = class extends Yn {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, Qn = /* @__PURE__ */ new Xn(), $n = /* @__PURE__ */ new Zn(), er = /* @__PURE__ */ new Xn(!0), tr = (e) => e, nr = (e) => Reflect.getPrototypeOf(e);
function rr(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ L(i), o = _t(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), u = n ? tr : t ? wr : Cr;
		return !t && F(a, "iterate", c ? Mn : jn), E(Object.create(l), { next() {
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
function ir(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function ar(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ L(r), a = /* @__PURE__ */ L(n);
			e || (Ft(n, a) && F(i, "get", n), F(i, "get", a));
			let { has: o } = nr(i), s = t ? tr : e ? wr : Cr;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && F(/* @__PURE__ */ L(t), "iterate", jn), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ L(n), i = /* @__PURE__ */ L(t);
			return e || (Ft(t, i) && F(r, "has", t), F(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ L(a), s = t ? tr : e ? wr : Cr;
			return !e && F(o, "iterate", jn), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return E(n, e ? {
		add: ir("add"),
		set: ir("set"),
		delete: ir("delete"),
		clear: ir("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ L(this), r = nr(n), i = /* @__PURE__ */ L(e), a = !t && !/* @__PURE__ */ I(e) && !/* @__PURE__ */ br(e) ? i : e;
			return r.has.call(n, a) || Ft(e, a) && r.has.call(n, e) || Ft(i, a) && r.has.call(n, i) || (n.add(a), Pn(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ I(n) && !/* @__PURE__ */ br(n) && (n = /* @__PURE__ */ L(n));
			let r = /* @__PURE__ */ L(this), { has: i, get: a } = nr(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ L(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? Ft(n, s) && Pn(r, "set", e, n, s) : Pn(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ L(this), { has: n, get: r } = nr(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ L(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && Pn(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ L(this), t = e.size !== 0, n = e.clear();
			return t && Pn(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = rr(r, e, t);
	}), n;
}
function or(e, t) {
	let n = ar(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(D(n, r) && r in t ? n : t, r, i);
}
var sr = { get: /* @__PURE__ */ or(!1, !1) }, cr = { get: /* @__PURE__ */ or(!1, !0) }, lr = { get: /* @__PURE__ */ or(!0, !1) }, ur = /* @__PURE__ */ new WeakMap(), dr = /* @__PURE__ */ new WeakMap(), fr = /* @__PURE__ */ new WeakMap(), pr = /* @__PURE__ */ new WeakMap();
function mr(e) {
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
function hr(e) {
	return /* @__PURE__ */ br(e) ? e : vr(e, !1, Qn, sr, ur);
}
// @__NO_SIDE_EFFECTS__
function gr(e) {
	return vr(e, !1, er, cr, dr);
}
// @__NO_SIDE_EFFECTS__
function _r(e) {
	return vr(e, !0, $n, lr, fr);
}
function vr(e, t, n, r, i) {
	if (!j(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = mr(wt(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function yr(e) {
	return /* @__PURE__ */ br(e) ? /* @__PURE__ */ yr(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function br(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function I(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function xr(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function L(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ L(t) : e;
}
function Sr(e) {
	return !D(e, "__v_skip") && Object.isExtensible(e) && Lt(e, "__v_skip", !0), e;
}
var Cr = (e) => j(e) ? /* @__PURE__ */ hr(e) : e, wr = (e) => j(e) ? /* @__PURE__ */ _r(e) : e;
// @__NO_SIDE_EFFECTS__
function R(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function z(e) {
	return Tr(e, !1);
}
function Tr(e, t) {
	return /* @__PURE__ */ R(e) ? e : new Er(e, t);
}
var Er = class {
	constructor(e, t) {
		this.dep = new On(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ L(e), this._value = t ? e : Cr(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ I(e) || /* @__PURE__ */ br(e);
		e = n ? e : /* @__PURE__ */ L(e), Ft(e, t) && (this._rawValue = e, this._value = n ? e : Cr(e), this.dep.trigger());
	}
};
function B(e) {
	return /* @__PURE__ */ R(e) ? e.value : e;
}
var Dr = {
	get: (e, t, n) => t === "__v_raw" ? e : B(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ R(i) && !/* @__PURE__ */ R(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Or(e) {
	return /* @__PURE__ */ yr(e) ? e : new Proxy(e, Dr);
}
// @__NO_SIDE_EFFECTS__
function kr(e) {
	let t = O(e) ? Array(e.length) : {};
	for (let n in e) t[n] = jr(e, n);
	return t;
}
var Ar = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = bt(t) ? t : String(t), this._raw = /* @__PURE__ */ L(e);
		let r = !0, i = e;
		if (!O(e) || bt(this._key) || !Et(this._key)) do
			r = !/* @__PURE__ */ xr(i) || /* @__PURE__ */ I(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = B(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ R(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ R(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return Fn(this._raw, this._key);
	}
};
function jr(e, t, n) {
	return new Ar(e, t, n);
}
var Mr = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new On(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = En - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && P !== this) return fn(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return vn(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function Nr(e, t, n = !1) {
	let r, i;
	return k(e) ? r = e : (r = e.get, i = e.set), new Mr(r, i, n);
}
var Pr = {}, Fr = /* @__PURE__ */ new WeakMap(), Ir = void 0;
function Lr(e, t = !1, n = Ir) {
	if (n) {
		let t = Fr.get(n);
		t || Fr.set(n, t = []), t.push(e);
	}
}
function Rr(e, t, n = T) {
	let { immediate: r, deep: i, once: a, scheduler: o, augmentJob: s, call: c } = n, l = (e) => i ? e : /* @__PURE__ */ I(e) || i === !1 || i === 0 ? zr(e, 1) : zr(e), u, d, f, p, m = !1, h = !1;
	if (/* @__PURE__ */ R(e) ? (d = () => e.value, m = /* @__PURE__ */ I(e)) : /* @__PURE__ */ yr(e) ? (d = () => l(e), m = !0) : O(e) ? (h = !0, m = e.some((e) => /* @__PURE__ */ yr(e) || /* @__PURE__ */ I(e)), d = () => e.map((e) => {
		if (/* @__PURE__ */ R(e)) return e.value;
		if (/* @__PURE__ */ yr(e)) return l(e);
		if (k(e)) return c ? c(e, 2) : e();
	})) : d = k(e) ? t ? c ? () => c(e, 2) : e : () => {
		if (f) {
			Cn();
			try {
				f();
			} finally {
				wn();
			}
		}
		let t = Ir;
		Ir = u;
		try {
			return c ? c(e, 3, [p]) : e(p);
		} finally {
			Ir = t;
		}
	} : dt, t && i) {
		let e = d, t = i === !0 ? Infinity : i;
		d = () => zr(e(), t);
	}
	let g = an(), _ = () => {
		u.stop(), g && g.active && ht(g.effects, u);
	};
	if (a && t) {
		let e = t;
		t = (...t) => {
			let n = e(...t);
			return _(), n;
		};
	}
	let v = h ? Array(e.length).fill(Pr) : Pr, y = (e) => {
		if (!(!(u.flags & 1) || !u.dirty && !e)) if (t) {
			let n = u.run();
			if (e || i || m || (h ? n.some((e, t) => Ft(e, v[t])) : Ft(n, v))) {
				f && f();
				let e = Ir;
				Ir = u;
				try {
					let e = [
						n,
						v === Pr ? void 0 : h && v[0] === Pr ? [] : v,
						p
					];
					v = n, c ? c(t, 3, e) : t(...e);
				} finally {
					Ir = e;
				}
			}
		} else u.run();
	};
	return s && s(y), u = new cn(d), u.scheduler = o ? () => o(y, !1) : y, p = (e) => Lr(e, !1, u), f = u.onStop = () => {
		let e = Fr.get(u);
		if (e) {
			if (c) c(e, 4);
			else for (let t of e) t();
			Fr.delete(u);
		}
	}, t ? r ? y(!0) : v = u.run() : o ? o(y.bind(null, !0), !0) : u.run(), _.pause = u.pause.bind(u), _.resume = u.resume.bind(u), _.stop = _, _;
}
function zr(e, t = Infinity, n) {
	if (t <= 0 || !j(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ R(e)) zr(e.value, t, n);
	else if (O(e)) for (let r = 0; r < e.length; r++) zr(e[r], t, n);
	else if (vt(e) || _t(e)) e.forEach((e) => {
		zr(e, t, n);
	});
	else if (Tt(e)) {
		for (let r in e) zr(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && zr(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function Br(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		Hr(e, t, n);
	}
}
function Vr(e, t, n, r) {
	if (k(e)) {
		let i = Br(e, t, n, r);
		return i && xt(i) && i.catch((e) => {
			Hr(e, t, n);
		}), i;
	}
	if (O(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(Vr(e[a], t, n, r));
		return i;
	}
}
function Hr(e, t, n, r = !0) {
	let i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || T;
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
			Cn(), Br(a, null, 10, [
				e,
				i,
				o
			]), wn();
			return;
		}
	}
	Ur(e, n, i, r, o);
}
function Ur(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var V = [], Wr = -1, Gr = [], Kr = null, qr = 0, Jr = /* @__PURE__ */ Promise.resolve(), Yr = null;
function Xr(e) {
	let t = Yr || Jr;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function Zr(e) {
	let t = Wr + 1, n = V.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = V[r], a = ri(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function Qr(e) {
	if (!(e.flags & 1)) {
		let t = ri(e), n = V[V.length - 1];
		!n || !(e.flags & 2) && t >= ri(n) ? V.push(e) : V.splice(Zr(t), 0, e), e.flags |= 1, $r();
	}
}
function $r() {
	Yr ||= Jr.then(ii);
}
function ei(e) {
	O(e) ? Gr.push(...e) : Kr && e.id === -1 ? Kr.splice(qr + 1, 0, e) : e.flags & 1 || (Gr.push(e), e.flags |= 1), $r();
}
function ti(e, t, n = Wr + 1) {
	for (; n < V.length; n++) {
		let t = V[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			V.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function ni(e) {
	if (Gr.length) {
		let e = [...new Set(Gr)].sort((e, t) => ri(e) - ri(t));
		if (Gr.length = 0, Kr) {
			Kr.push(...e);
			return;
		}
		for (Kr = e, qr = 0; qr < Kr.length; qr++) {
			let e = Kr[qr];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		Kr = null, qr = 0;
	}
}
var ri = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function ii(e) {
	try {
		for (Wr = 0; Wr < V.length; Wr++) {
			let e = V[Wr];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), Br(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; Wr < V.length; Wr++) {
			let e = V[Wr];
			e && (e.flags &= -2);
		}
		Wr = -1, V.length = 0, ni(e), Yr = null, (V.length || Gr.length) && ii(e);
	}
}
var ai = null, oi = null;
function si(e) {
	let t = ai;
	return ai = e, oi = e && e.type.__scopeId || null, t;
}
function ci(e, t = ai, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && mo(-1);
		let i = si(t), a;
		try {
			a = e(...n);
		} finally {
			si(i), r._d && mo(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function li(e, t) {
	if (ai === null) return e;
	let n = Jo(ai), r = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [i, a, o, s = T] = t[e];
		i && (k(i) && (i = {
			mounted: i,
			updated: i
		}), i.deep && zr(a), r.push({
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
function di(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (Cn(), Vr(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), wn());
	}
}
function fi(e, t) {
	if (Q) {
		let n = Q.provides, r = Q.parent && Q.parent.provides;
		r === n && (n = Q.provides = Object.create(r)), n[e] = t;
	}
}
function pi(e, t, n = !1) {
	let r = No();
	if (r || va) {
		let i = va ? va._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && k(t) ? t.call(r && r.proxy) : t;
	}
}
function mi() {
	return !!(No() || va);
}
var hi = /* @__PURE__ */ Symbol.for("v-scx"), gi = () => pi(hi);
function _i(e, t, n) {
	return vi(e, t, n);
}
function vi(e, t, n = T) {
	let { immediate: r, deep: i, flush: a, once: o } = n, s = E({}, n), c = t && r || !t && a !== "post", l;
	if (zo) {
		if (a === "sync") {
			let e = gi();
			l = e.__watcherHandles ||= [];
		} else if (!c) {
			let e = () => {};
			return e.stop = dt, e.resume = dt, e.pause = dt, e;
		}
	}
	let u = Q;
	s.call = (e, t, n) => Vr(e, u, t, n);
	let d = !1;
	a === "post" ? s.scheduler = (e) => {
		W(e, u && u.suspense);
	} : a !== "sync" && (d = !0, s.scheduler = (e, t) => {
		t ? e() : Qr(e);
	}), s.augmentJob = (e) => {
		t && (e.flags |= 4), d && (e.flags |= 2, u && (e.id = u.uid, e.i = u));
	};
	let f = Rr(e, t, s);
	return zo && (l ? l.push(f) : c && f()), f;
}
function yi(e, t, n) {
	let r = this.proxy, i = A(e) ? e.includes(".") ? bi(r, e) : () => r[e] : e.bind(r, r), a;
	k(t) ? a = t : (a = t.handler, n = t);
	let o = Io(this), s = vi(i, a.bind(r), n);
	return o(), s;
}
function bi(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var xi = /* @__PURE__ */ Symbol("_vte"), Si = (e) => e.__isTeleport, Ci = /* @__PURE__ */ Symbol("_leaveCb");
function wi(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, wi(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Ti(e, t) {
	return k(e) ? /* @__PURE__ */ E({ name: e.name }, t, { setup: e }) : e;
}
function Ei(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function Di(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var Oi = /* @__PURE__ */ new WeakMap();
function ki(e, t, n, r, i = !1) {
	if (O(e)) {
		e.forEach((e, a) => ki(e, t && (O(t) ? t[a] : t), n, r, i));
		return;
	}
	if (ji(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && ki(e, t, n, r.component.subTree);
		return;
	}
	let a = r.shapeFlag & 4 ? Jo(r.component) : r.el, o = i ? null : a, { i: s, r: c } = e, l = t && t.r, u = s.refs === T ? s.refs = {} : s.refs, d = s.setupState, f = /* @__PURE__ */ L(d), p = d === T ? ft : (e) => Di(u, e) ? !1 : D(f, e), m = (e, t) => !(t && Di(u, t));
	if (l != null && l !== c) {
		if (Ai(t), A(l)) u[l] = null, p(l) && (d[l] = null);
		else if (/* @__PURE__ */ R(l)) {
			let e = t;
			m(l, e.k) && (l.value = null), e.k && (u[e.k] = null);
		}
	}
	if (k(c)) Br(c, s, 12, [o, u]);
	else {
		let t = A(c), r = /* @__PURE__ */ R(c);
		if (t || r) {
			let s = () => {
				if (e.f) {
					let n = t ? p(c) ? d[c] : u[c] : m(c) || !e.k ? c.value : u[e.k];
					if (i) O(n) && ht(n, a);
					else if (O(n)) n.includes(a) || n.push(a);
					else if (t) u[c] = [a], p(c) && (d[c] = u[c]);
					else {
						let t = [a];
						m(c, e.k) && (c.value = t), e.k && (u[e.k] = t);
					}
				} else t ? (u[c] = o, p(c) && (d[c] = o)) : r && (m(c, e.k) && (c.value = o), e.k && (u[e.k] = o));
			};
			if (o) {
				let t = () => {
					s(), Oi.delete(e);
				};
				t.id = -1, Oi.set(e, t), W(t, n);
			} else Ai(e), s();
		}
	}
}
function Ai(e) {
	let t = Oi.get(e);
	t && (t.flags |= 8, Oi.delete(e));
}
Bt().requestIdleCallback, Bt().cancelIdleCallback;
var ji = (e) => !!e.type.__asyncLoader, Mi = (e) => e.type.__isKeepAlive;
function Ni(e, t) {
	Fi(e, "a", t);
}
function Pi(e, t) {
	Fi(e, "da", t);
}
function Fi(e, t, n = Q) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (Li(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) Mi(e.parent.vnode) && Ii(r, t, n, e), e = e.parent;
	}
}
function Ii(e, t, n, r) {
	let i = Li(t, e, r, !0);
	Wi(() => {
		ht(r[t], i);
	}, n);
}
function Li(e, t, n = Q, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Cn();
			let i = Io(n), a = Vr(t, n, e, r);
			return i(), wn(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var Ri = (e) => (t, n = Q) => {
	(!zo || e === "sp") && Li(e, (...e) => t(...e), n);
}, zi = Ri("bm"), Bi = Ri("m"), Vi = Ri("bu"), Hi = Ri("u"), Ui = Ri("bum"), Wi = Ri("um"), Gi = Ri("sp"), Ki = Ri("rtg"), qi = Ri("rtc");
function Ji(e, t = Q) {
	Li("ec", e, t);
}
var Yi = /* @__PURE__ */ Symbol.for("v-ndc");
function H(e, t, n, r) {
	let i, a = n && n[r], o = O(e);
	if (o || A(e)) {
		let n = o && /* @__PURE__ */ yr(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ I(e), s = /* @__PURE__ */ br(e), e = Ln(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? wr(Cr(e[n])) : Cr(e[n]) : e[n], n, void 0, a && a[n]);
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
var Xi = (e) => e ? Ro(e) ? Jo(e) : Xi(e.parent) : null, Zi = /* @__PURE__ */ E(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => Xi(e.parent),
	$root: (e) => Xi(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => oa(e),
	$forceUpdate: (e) => e.f ||= () => {
		Qr(e.update);
	},
	$nextTick: (e) => e.n ||= Xr.bind(e.proxy),
	$watch: (e) => yi.bind(e)
}), Qi = (e, t) => e !== T && !e.__isScriptSetup && D(e, t), $i = {
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
			else if (Qi(r, t)) return o[t] = 1, r[t];
			else if (i !== T && D(i, t)) return o[t] = 2, i[t];
			else if (D(a, t)) return o[t] = 3, a[t];
			else if (n !== T && D(n, t)) return o[t] = 4, n[t];
			else ta && (o[t] = 0);
		}
		let l = Zi[t], u, d;
		if (l) return t === "$attrs" && F(e.attrs, "get", ""), l(e);
		if ((u = s.__cssModules) && (u = u[t])) return u;
		if (n !== T && D(n, t)) return o[t] = 4, n[t];
		if (d = c.config.globalProperties, D(d, t)) return d[t];
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: a } = e;
		return Qi(i, t) ? (i[t] = n, !0) : r !== T && D(r, t) ? (r[t] = n, !0) : D(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
		let c;
		return !!(n[s] || e !== T && s[0] !== "$" && D(e, s) || Qi(t, s) || D(a, s) || D(r, s) || D(Zi, s) || D(i.config.globalProperties, s) || (c = o.__cssModules) && c[s]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? D(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function ea(e) {
	return O(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var ta = !0;
function na(e) {
	let t = oa(e), n = e.proxy, r = e.ctx;
	ta = !1, t.beforeCreate && ia(t.beforeCreate, e, "bc");
	let { data: i, computed: a, methods: o, watch: s, provide: c, inject: l, created: u, beforeMount: d, mounted: f, beforeUpdate: p, updated: m, activated: h, deactivated: g, beforeDestroy: _, beforeUnmount: v, destroyed: y, unmounted: b, render: ee, renderTracked: x, renderTriggered: te, errorCaptured: S, serverPrefetch: ne, expose: re, inheritAttrs: ie, components: ae, directives: oe, filters: se } = t;
	if (l && ra(l, r, null), o) for (let e in o) {
		let t = o[e];
		k(t) && (r[e] = t.bind(n));
	}
	if (i) {
		let t = i.call(n, n);
		j(t) && (e.data = /* @__PURE__ */ hr(t));
	}
	if (ta = !0, a) for (let e in a) {
		let t = a[e], i = Xo({
			get: k(t) ? t.bind(n, n) : k(t.get) ? t.get.bind(n, n) : dt,
			set: !k(t) && k(t.set) ? t.set.bind(n) : dt
		});
		Object.defineProperty(r, e, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		});
	}
	if (s) for (let e in s) aa(s[e], r, n, e);
	if (c) {
		let e = k(c) ? c.call(n) : c;
		Reflect.ownKeys(e).forEach((t) => {
			fi(t, e[t]);
		});
	}
	u && ia(u, e, "c");
	function C(e, t) {
		O(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (C(zi, d), C(Bi, f), C(Vi, p), C(Hi, m), C(Ni, h), C(Pi, g), C(Ji, S), C(qi, x), C(Ki, te), C(Ui, v), C(Wi, b), C(Gi, ne), O(re)) if (re.length) {
		let t = e.exposed ||= {};
		re.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	ee && e.render === dt && (e.render = ee), ie != null && (e.inheritAttrs = ie), ae && (e.components = ae), oe && (e.directives = oe), ne && Ei(e);
}
function ra(e, t, n = dt) {
	O(e) && (e = da(e));
	for (let n in e) {
		let r = e[n], i;
		i = j(r) ? "default" in r ? pi(r.from || n, r.default, !0) : pi(r.from || n) : pi(r), /* @__PURE__ */ R(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function ia(e, t, n) {
	Vr(O(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function aa(e, t, n, r) {
	let i = r.includes(".") ? bi(n, r) : () => n[r];
	if (A(e)) {
		let n = t[e];
		k(n) && _i(i, n);
	} else if (k(e)) _i(i, e.bind(n));
	else if (j(e)) if (O(e)) e.forEach((e) => aa(e, t, n, r));
	else {
		let r = k(e.handler) ? e.handler.bind(n) : t[e.handler];
		k(r) && _i(i, r, e);
	}
}
function oa(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => sa(c, e, o, !0)), sa(c, t, o)), j(t) && a.set(t, c), c;
}
function sa(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && sa(e, a, n, !0), i && i.forEach((t) => sa(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = ca[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var ca = {
	data: la,
	props: pa,
	emits: pa,
	methods: fa,
	computed: fa,
	beforeCreate: U,
	created: U,
	beforeMount: U,
	mounted: U,
	beforeUpdate: U,
	updated: U,
	beforeDestroy: U,
	beforeUnmount: U,
	destroyed: U,
	unmounted: U,
	activated: U,
	deactivated: U,
	errorCaptured: U,
	serverPrefetch: U,
	components: fa,
	directives: fa,
	watch: ma,
	provide: la,
	inject: ua
};
function la(e, t) {
	return t ? e ? function() {
		return E(k(e) ? e.call(this, this) : e, k(t) ? t.call(this, this) : t);
	} : t : e;
}
function ua(e, t) {
	return fa(da(e), da(t));
}
function da(e) {
	if (O(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function U(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function fa(e, t) {
	return e ? E(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function pa(e, t) {
	return e ? O(e) && O(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : E(/* @__PURE__ */ Object.create(null), ea(e), ea(t ?? {})) : t;
}
function ma(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = E(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = U(e[r], t[r]);
	return n;
}
function ha() {
	return {
		app: null,
		config: {
			isNativeTag: ft,
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
var ga = 0;
function _a(e, t) {
	return function(n, r = null) {
		k(n) || (n = E({}, n)), r != null && !j(r) && (r = null);
		let i = ha(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: ga++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Zo,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && k(e.install) ? (a.add(e), e.install(c, ...t)) : k(e) && (a.add(e), e(c, ...t))), c;
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
					let u = c._ceVNode || X(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, Jo(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (Vr(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = va;
				va = c;
				try {
					return e();
				} finally {
					va = t;
				}
			}
		};
		return c;
	};
}
var va = null, ya = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${At(t)}Modifiers`] || e[`${Mt(t)}Modifiers`];
function ba(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || T, i = n, a = t.startsWith("update:"), o = a && ya(r, t.slice(7));
	o && (o.trim && (i = n.map((e) => A(e) ? e.trim() : e)), o.number && (i = n.map(Rt)));
	let s, c = r[s = Pt(t)] || r[s = Pt(At(t))];
	!c && a && (c = r[s = Pt(Mt(t))]), c && Vr(c, e, 6, i);
	let l = r[s + "Once"];
	if (l) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		e.emitted[s] = !0, Vr(l, e, 6, i);
	}
}
var xa = /* @__PURE__ */ new WeakMap();
function Sa(e, t, n = !1) {
	let r = n ? xa : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, s = !1;
	if (!k(e)) {
		let r = (e) => {
			let n = Sa(e, t, !0);
			n && (s = !0, E(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !s ? (j(e) && r.set(e, null), null) : (O(a) ? a.forEach((e) => o[e] = null) : E(o, a), j(e) && r.set(e, o), o);
}
function Ca(e, t) {
	return !e || !pt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), D(e, t[0].toLowerCase() + t.slice(1)) || D(e, Mt(t)) || D(e, t));
}
function wa(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: l, renderCache: u, props: d, data: f, setupState: p, ctx: m, inheritAttrs: h } = e, g = si(e), _, v;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			_ = To(l.call(t, e, u, d, p, f, m)), v = s;
		} else {
			let e = t;
			_ = To(e.length > 1 ? e(d, {
				attrs: s,
				slots: o,
				emit: c
			}) : e(d, null)), v = t.props ? s : Ta(s);
		}
	} catch (t) {
		uo.length = 0, Hr(t, e, 1), _ = X(co);
	}
	let y = _;
	if (v && h !== !1) {
		let e = Object.keys(v), { shapeFlag: t } = y;
		e.length && t & 7 && (a && e.some(mt) && (v = Ea(v, a)), y = Co(y, v, !1, !0));
	}
	return n.dirs && (y = Co(y, null, !1, !0), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && wi(y, n.transition), _ = y, si(g), _;
}
var Ta = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || pt(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, Ea = (e, t) => {
	let n = {};
	for (let r in e) (!mt(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function Da(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? Oa(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (ka(o, r, n) && !Ca(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? Oa(r, o, l) : !0 : !!o;
	return !1;
}
function Oa(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (ka(t, e, a) && !Ca(n, a)) return !0;
	}
	return !1;
}
function ka(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && j(r) && j(i) ? !Zt(r, i) : r !== i;
}
function Aa({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var ja = {}, Ma = () => Object.create(ja), Na = (e) => Object.getPrototypeOf(e) === ja;
function Pa(e, t, n, r = !1) {
	let i = {}, a = Ma();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), Ia(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	n ? e.props = r ? i : /* @__PURE__ */ gr(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function Fa(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ L(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (Ca(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) if (D(a, o)) u !== a[o] && (a[o] = u, l = !0);
				else {
					let t = At(o);
					i[t] = La(c, s, t, u, e, !1);
				}
				else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		Ia(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !D(t, a) && ((r = Mt(a)) === a || !D(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = La(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !D(t, e)) && (delete a[e], l = !0);
	}
	l && Pn(e.attrs, "set", "");
}
function Ia(e, t, n, r) {
	let [i, a] = e.propsOptions, o = !1, s;
	if (t) for (let c in t) {
		if (Dt(c)) continue;
		let l = t[c], u;
		i && D(i, u = At(c)) ? !a || !a.includes(u) ? n[u] = l : (s ||= {})[u] = l : Ca(e.emitsOptions, c) || (!(c in r) || l !== r[c]) && (r[c] = l, o = !0);
	}
	if (a) {
		let t = /* @__PURE__ */ L(n), r = s || T;
		for (let o = 0; o < a.length; o++) {
			let s = a[o];
			n[s] = La(i, t, s, r[s], e, !D(r, s));
		}
	}
	return o;
}
function La(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = D(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && k(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = Io(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === Mt(n)) && (r = !0));
	}
	return r;
}
var Ra = /* @__PURE__ */ new WeakMap();
function za(e, t, n = !1) {
	let r = n ? Ra : t.propsCache, i = r.get(e);
	if (i) return i;
	let a = e.props, o = {}, s = [], c = !1;
	if (!k(e)) {
		let r = (e) => {
			c = !0;
			let [n, r] = za(e, t, !0);
			E(o, n), r && s.push(...r);
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	if (!a && !c) return j(e) && r.set(e, ut), ut;
	if (O(a)) for (let e = 0; e < a.length; e++) {
		let t = At(a[e]);
		Ba(t) && (o[t] = T);
	}
	else if (a) for (let e in a) {
		let t = At(e);
		if (Ba(t)) {
			let n = a[e], r = o[t] = O(n) || k(n) ? { type: n } : E({}, n), i = r.type, c = !1, l = !0;
			if (O(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = k(t) && t.name;
				if (n === "Boolean") {
					c = !0;
					break;
				} else n === "String" && (l = !1);
			}
			else c = k(i) && i.name === "Boolean";
			r[0] = c, r[1] = l, (c || D(r, "default")) && s.push(t);
		}
	}
	let l = [o, s];
	return j(e) && r.set(e, l), l;
}
function Ba(e) {
	return e[0] !== "$" && !Dt(e);
}
var Va = (e) => e === "_" || e === "_ctx" || e === "$stable", Ha = (e) => O(e) ? e.map(To) : [To(e)], Ua = (e, t, n) => {
	if (t._n) return t;
	let r = ci((...e) => Ha(t(...e)), n);
	return r._c = !1, r;
}, Wa = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (Va(n)) continue;
		let i = e[n];
		if (k(i)) t[n] = Ua(n, i, r);
		else if (i != null) {
			let e = Ha(i);
			t[n] = () => e;
		}
	}
}, Ga = (e, t) => {
	let n = Ha(t);
	e.slots.default = () => n;
}, Ka = (e, t, n) => {
	for (let r in t) (n || !Va(r)) && (e[r] = t[r]);
}, qa = (e, t, n) => {
	let r = e.slots = Ma();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Ka(r, t, n), n && Lt(r, "_", e, !0)) : Wa(t, r);
	} else t && Ga(e, t);
}, Ja = (e, t, n) => {
	let { vnode: r, slots: i } = e, a = !0, o = T;
	if (r.shapeFlag & 32) {
		let e = t._;
		e ? n && e === 1 ? a = !1 : Ka(i, t, n) : (a = !t.$stable, Wa(t, i)), o = t;
	} else t && (Ga(e, t), o = { default: 1 });
	if (a) for (let e in i) !Va(e) && o[e] == null && delete i[e];
}, W = oo;
function Ya(e) {
	return Xa(e);
}
function Xa(e, t) {
	let n = Bt();
	n.__VUE__ = !0;
	let { insert: r, remove: i, patchProp: a, createElement: o, createText: s, createComment: c, setText: l, setElementText: u, parentNode: d, nextSibling: f, setScopeId: p = dt, insertStaticContent: m } = e, h = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !vo(e, t) && (r = ye(e), me(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case so:
				g(e, t, n, r);
				break;
			case co:
				_(e, t, n, r);
				break;
			case lo:
				e ?? v(t, n, r, o);
				break;
			case G:
				ae(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? ee(e, t, n, r, i, a, o, s, c) : d & 6 ? oe(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, Se);
		}
		u != null && i ? ki(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && ki(e.ref, null, a, e, !0);
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
	}, ee = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) x(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), ne(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, x = (e, t, n, i, s, c, l, d) => {
		let f, p, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (f = e.el = o(e.type, c, m && m.is, m), h & 8 ? u(f, e.children) : h & 16 && S(e.children, f, null, i, s, Za(e, c), l, d), _ && di(e, null, i, "created"), te(f, e, e.scopeId, l, i), m) {
			for (let e in m) e !== "value" && !Dt(e) && a(f, e, null, m[e], c, i);
			"value" in m && a(f, "value", null, m.value, c), (p = m.onVnodeBeforeMount) && ko(p, i, e);
		}
		_ && di(e, null, i, "beforeMount");
		let v = $a(s, g);
		v && g.beforeEnter(f), r(f, t, n), ((p = m && m.onVnodeMounted) || v || _) && W(() => {
			try {
				p && ko(p, i, e), v && g.enter(f), _ && di(e, null, i, "mounted");
			} finally {}
		}, s);
	}, te = (e, t, n, r, i) => {
		if (n && p(e, n), r) for (let t = 0; t < r.length; t++) p(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || ao(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				te(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, S = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) h(null, e[l] = s ? Eo(e[l]) : To(e[l]), t, n, r, i, a, o, s);
	}, ne = (e, t, n, r, i, o, s) => {
		let c = t.el = e.el, { patchFlag: l, dynamicChildren: d, dirs: f } = t;
		l |= e.patchFlag & 16;
		let p = e.props || T, m = t.props || T, h;
		if (n && Qa(n, !1), (h = m.onVnodeBeforeUpdate) && ko(h, n, t, e), f && di(t, e, n, "beforeUpdate"), n && Qa(n, !0), (p.innerHTML && m.innerHTML == null || p.textContent && m.textContent == null) && u(c, ""), d ? re(e.dynamicChildren, d, c, n, r, Za(t, i), o) : s || ue(e, t, c, null, n, r, Za(t, i), o, !1), l > 0) {
			if (l & 16) ie(c, p, m, n, i);
			else if (l & 2 && p.class !== m.class && a(c, "class", null, m.class, i), l & 4 && a(c, "style", p.style, m.style, i), l & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], o = p[r], s = m[r];
					(s !== o || r === "value") && a(c, r, o, s, i, n);
				}
			}
			l & 1 && e.children !== t.children && u(c, t.children);
		} else !s && d == null && ie(c, p, m, n, i);
		((h = m.onVnodeUpdated) || f) && W(() => {
			h && ko(h, n, t, e), f && di(t, e, n, "updated");
		}, r);
	}, re = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			h(c, l, c.el && (c.type === G || !vo(c, l) || c.shapeFlag & 198) ? d(c.el) : n, null, r, i, a, o, !0);
		}
	}, ie = (e, t, n, r, i) => {
		if (t !== n) {
			if (t !== T) for (let o in t) !Dt(o) && !(o in n) && a(e, o, t[o], null, i, r);
			for (let o in n) {
				if (Dt(o)) continue;
				let s = n[o], c = t[o];
				s !== c && o !== "value" && a(e, o, c, s, i, r);
			}
			"value" in n && a(e, "value", t.value, n.value, i);
		}
	}, ae = (e, t, n, i, a, o, c, l, u) => {
		let d = t.el = e ? e.el : s(""), f = t.anchor = e ? e.anchor : s(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (l = l ? l.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), S(t.children || [], n, f, a, o, c, l, u)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (re(e.dynamicChildren, m, n, a, o, c, l), (t.key != null || a && t === a.subTree) && eo(e, t, !0)) : ue(e, t, n, f, a, o, c, l, u);
	}, oe = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : se(t, n, r, i, a, o, c) : C(e, t, c);
	}, se = (e, t, n, r, i, a, o) => {
		let s = e.component = Mo(e, r, i);
		if (Mi(e) && (s.ctx.renderer = Se), Bo(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, ce, o), !e.el) {
				let r = s.subTree = X(co);
				_(null, r, t, n), e.placeholder = r.el;
			}
		} else ce(s, e, t, n, i, a, o);
	}, C = (e, t, n) => {
		let r = t.component = e.component;
		if (Da(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			le(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, ce = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = no(e);
					if (n) {
						t && (t.el = c.el, le(e, t, o)), n.asyncDep.then(() => {
							W(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, f;
				Qa(e, !1), t ? (t.el = c.el, le(e, t, o)) : t = c, n && It(n), (f = t.props && t.props.onVnodeBeforeUpdate) && ko(f, s, t, c), Qa(e, !0);
				let p = wa(e), m = e.subTree;
				e.subTree = p, h(m, p, d(m.el), ye(m), e, i, a), t.el = p.el, u === null && Aa(e, p.el), r && W(r, i), (f = t.props && t.props.onVnodeUpdated) && W(() => ko(f, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = ji(t);
				if (Qa(e, !1), l && It(l), !m && (o = c && c.onVnodeBeforeMount) && ko(o, d, t), Qa(e, !0), s && we) {
					let t = () => {
						e.subTree = wa(e), we(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = wa(e);
					h(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && W(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					W(() => ko(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && ji(d.vnode) && d.vnode.shapeFlag & 256) && e.a && W(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new cn(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Qr(u), Qa(e, !0), l();
	}, le = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, Fa(e, t.props, r, n), Ja(e, t.children, n), Cn(), ti(e), wn();
	}, ue = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, d = e ? e.shapeFlag : 0, f = t.children, { patchFlag: p, shapeFlag: m } = t;
		if (p > 0) {
			if (p & 128) {
				fe(l, f, n, r, i, a, o, s, c);
				return;
			} else if (p & 256) {
				de(l, f, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (d & 16 && ve(l, i, a), f !== l && u(n, f)) : d & 16 ? m & 16 ? fe(l, f, n, r, i, a, o, s, c) : ve(l, i, a, !0) : (d & 8 && u(n, ""), m & 16 && S(f, n, r, i, a, o, s, c));
	}, de = (e, t, n, r, i, a, o, s, c) => {
		e ||= ut, t ||= ut;
		let l = e.length, u = t.length, d = Math.min(l, u), f;
		for (f = 0; f < d; f++) {
			let r = t[f] = c ? Eo(t[f]) : To(t[f]);
			h(e[f], r, n, null, i, a, o, s, c);
		}
		l > u ? ve(e, i, a, !0, !1, d) : S(t, n, r, i, a, o, s, c, d);
	}, fe = (e, t, n, r, i, a, o, s, c) => {
		let l = 0, u = t.length, d = e.length - 1, f = u - 1;
		for (; l <= d && l <= f;) {
			let r = e[l], u = t[l] = c ? Eo(t[l]) : To(t[l]);
			if (vo(r, u)) h(r, u, n, null, i, a, o, s, c);
			else break;
			l++;
		}
		for (; l <= d && l <= f;) {
			let r = e[d], l = t[f] = c ? Eo(t[f]) : To(t[f]);
			if (vo(r, l)) h(r, l, n, null, i, a, o, s, c);
			else break;
			d--, f--;
		}
		if (l > d) {
			if (l <= f) {
				let e = f + 1, d = e < u ? t[e].el : r;
				for (; l <= f;) h(null, t[l] = c ? Eo(t[l]) : To(t[l]), n, d, i, a, o, s, c), l++;
			}
		} else if (l > f) for (; l <= d;) me(e[l], i, a, !0), l++;
		else {
			let p = l, m = l, g = /* @__PURE__ */ new Map();
			for (l = m; l <= f; l++) {
				let e = t[l] = c ? Eo(t[l]) : To(t[l]);
				e.key != null && g.set(e.key, l);
			}
			let _, v = 0, y = f - m + 1, b = !1, ee = 0, x = Array(y);
			for (l = 0; l < y; l++) x[l] = 0;
			for (l = p; l <= d; l++) {
				let r = e[l];
				if (v >= y) {
					me(r, i, a, !0);
					continue;
				}
				let u;
				if (r.key != null) u = g.get(r.key);
				else for (_ = m; _ <= f; _++) if (x[_ - m] === 0 && vo(r, t[_])) {
					u = _;
					break;
				}
				u === void 0 ? me(r, i, a, !0) : (x[u - m] = l + 1, u >= ee ? ee = u : b = !0, h(r, t[u], n, null, i, a, o, s, c), v++);
			}
			let te = b ? to(x) : ut;
			for (_ = te.length - 1, l = y - 1; l >= 0; l--) {
				let e = m + l, d = t[e], f = t[e + 1], p = e + 1 < u ? f.el || io(f) : r;
				x[l] === 0 ? h(null, d, n, p, i, a, o, s, c) : b && (_ < 0 || l !== te[_] ? pe(d, n, p, 2) : _--);
			}
		}
	}, pe = (e, t, n, a, o = null) => {
		let { el: s, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			pe(e.component.subTree, t, n, a);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, a);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, Se);
			return;
		}
		if (c === G) {
			r(s, t, n);
			for (let e = 0; e < u.length; e++) pe(u[e], t, n, a);
			r(e.anchor, t, n);
			return;
		}
		if (c === lo) {
			y(e, t, n);
			return;
		}
		if (a !== 2 && d & 1 && l) if (a === 0) l.persisted && !s[Ci] ? r(s, t, n) : (l.beforeEnter(s), r(s, t, n), W(() => l.enter(s), o));
		else {
			let { leave: a, delayLeave: o, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? i(s) : r(s, t, n);
			}, d = () => {
				let e = s._isLeaving || !!s[Ci];
				s._isLeaving && s[Ci](!0), l.persisted && !e ? u() : a(s, () => {
					u(), c && c();
				});
			};
			o ? o(s, u, d) : d();
		}
		else r(s, t, n);
	}, me = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (Cn(), ki(s, null, n, e, !0), wn()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !ji(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && ko(_, t, e), u & 6) _e(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && di(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, Se, r) : l && !l.hasOnce && (a !== G || d > 0 && d & 64) ? ve(l, t, n, !1, !0) : (a === G && d & 384 || !i && u & 16) && ve(c, t, n), r && he(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && W(() => {
			_ && ko(_, t, e), h && di(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, he = (e) => {
		let { type: t, el: n, anchor: r, transition: a } = e;
		if (t === G) {
			ge(n, r);
			return;
		}
		if (t === lo) {
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
	}, ge = (e, t) => {
		let n;
		for (; e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, _e = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		ro(c), ro(l), r && It(r), i.stop(), a && (a.flags |= 8, me(o, e, t, n)), s && W(s, t), W(() => {
			e.isUnmounted = !0;
		}, t);
	}, ve = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) me(e[o], t, n, r, i);
	}, ye = (e) => {
		if (e.shapeFlag & 6) return ye(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = f(e.anchor || e.el), n = t && t[xi];
		return n ? f(n) : t;
	}, be = !1, xe = (e, t, n) => {
		let r;
		e == null ? t._vnode && (me(t._vnode, null, null, !0), r = t._vnode.component) : h(t._vnode || null, e, t, null, null, null, n), t._vnode = e, be ||= (be = !0, ti(r), ni(), !1);
	}, Se = {
		p: h,
		um: me,
		m: pe,
		r: he,
		mt: se,
		mc: S,
		pc: ue,
		pbc: re,
		n: ye,
		o: e
	}, Ce, we;
	return t && ([Ce, we] = t(Se)), {
		render: xe,
		hydrate: Ce,
		createApp: _a(xe, Ce)
	};
}
function Za({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Qa({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function $a(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function eo(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (O(r) && O(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = Eo(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && eo(t, a)), a.type === so && (a.patchFlag === -1 && (a = i[e] = Eo(a)), a.el = t.el), a.type === co && !a.el && (a.el = t.el);
	}
}
function to(e) {
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
function no(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : no(t);
}
function ro(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function io(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? io(t.subTree) : null;
}
var ao = (e) => e.__isSuspense;
function oo(e, t) {
	t && t.pendingBranch ? O(e) ? t.effects.push(...e) : t.effects.push(e) : ei(e);
}
var G = /* @__PURE__ */ Symbol.for("v-fgt"), so = /* @__PURE__ */ Symbol.for("v-txt"), co = /* @__PURE__ */ Symbol.for("v-cmt"), lo = /* @__PURE__ */ Symbol.for("v-stc"), uo = [], K = null;
function q(e = !1) {
	uo.push(K = e ? null : []);
}
function fo() {
	uo.pop(), K = uo[uo.length - 1] || null;
}
var po = 1;
function mo(e, t = !1) {
	po += e, e < 0 && K && t && (K.hasOnce = !0);
}
function ho(e) {
	return e.dynamicChildren = po > 0 ? K || ut : null, fo(), po > 0 && K && K.push(e), e;
}
function J(e, t, n, r, i, a) {
	return ho(Y(e, t, n, r, i, a, !0));
}
function go(e, t, n, r, i) {
	return ho(X(e, t, n, r, i, !0));
}
function _o(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function vo(e, t) {
	return e.type === t.type && e.key === t.key;
}
var yo = ({ key: e }) => e ?? null, bo = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : A(e) || /* @__PURE__ */ R(e) || k(e) ? {
	i: ai,
	r: e,
	k: t,
	f: !!n
} : e);
function Y(e, t = null, n = null, r = 0, i = null, a = e === G ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && yo(t),
		ref: t && bo(t),
		scopeId: oi,
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
		ctx: ai
	};
	return s ? (Do(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= A(n) ? 8 : 16), po > 0 && !o && K && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && K.push(c), c;
}
var X = xo;
function xo(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === Yi) && (e = co), _o(e)) {
		let r = Co(e, t, !0);
		return n && Do(r, n), po > 0 && !a && K && (r.shapeFlag & 6 ? K[K.indexOf(e)] = r : K.push(r)), r.patchFlag = -2, r;
	}
	if (Yo(e) && (e = e.__vccOpts), t) {
		t = So(t);
		let { class: e, style: n } = t;
		e && !A(e) && (t.class = Kt(e)), j(n) && (/* @__PURE__ */ xr(n) && !O(n) && (n = E({}, n)), t.style = Vt(n));
	}
	let o = A(e) ? 1 : ao(e) ? 128 : Si(e) ? 64 : j(e) ? 4 : k(e) ? 2 : 0;
	return Y(e, t, n, r, i, o, a, !0);
}
function So(e) {
	return e ? /* @__PURE__ */ xr(e) || Na(e) ? E({}, e) : e : null;
}
function Co(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? Oo(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && yo(l),
		ref: t && t.ref ? n && a ? O(a) ? a.concat(bo(t)) : [a, bo(t)] : bo(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== G ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Co(e.ssContent),
		ssFallback: e.ssFallback && Co(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && wi(u, c.clone(u)), u;
}
function Z(e = " ", t = 0) {
	return X(so, null, e, t);
}
function wo(e = "", t = !1) {
	return t ? (q(), go(co, null, e)) : X(co, null, e);
}
function To(e) {
	return e == null || typeof e == "boolean" ? X(co) : O(e) ? X(G, null, e.slice()) : _o(e) ? Eo(e) : X(so, null, String(e));
}
function Eo(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : Co(e);
}
function Do(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (O(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), Do(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !Na(t) ? t._ctx = ai : r === 3 && ai && (ai.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else k(t) ? (t = {
		default: t,
		_ctx: ai
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Z(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function Oo(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = Kt([t.class, r.class]));
		else if (e === "style") t.style = Vt([t.style, r.style]);
		else if (pt(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(O(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !mt(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function ko(e, t, n, r = null) {
	Vr(e, t, 7, [n, r]);
}
var Ao = ha(), jo = 0;
function Mo(e, t, n) {
	let r = e.type, i = (t ? t.appContext : e.appContext) || Ao, a = {
		uid: jo++,
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
		scope: new nn(!0),
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
		propsOptions: za(r, i),
		emitsOptions: Sa(r, i),
		emit: null,
		emitted: null,
		propsDefaults: T,
		inheritAttrs: r.inheritAttrs,
		ctx: T,
		data: T,
		props: T,
		attrs: T,
		slots: T,
		refs: T,
		setupState: T,
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
	return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = ba.bind(null, a), e.ce && e.ce(a), a;
}
var Q = null, No = () => Q || ai, Po, Fo;
{
	let e = Bt(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	Po = t("__VUE_INSTANCE_SETTERS__", (e) => Q = e), Fo = t("__VUE_SSR_SETTERS__", (e) => zo = e);
}
var Io = (e) => {
	let t = Q;
	return Po(e), e.scope.on(), () => {
		e.scope.off(), Po(t);
	};
}, Lo = () => {
	Q && Q.scope.off(), Po(null);
};
function Ro(e) {
	return e.vnode.shapeFlag & 4;
}
var zo = !1;
function Bo(e, t = !1, n = !1) {
	t && Fo(t);
	let { props: r, children: i } = e.vnode, a = Ro(e);
	Pa(e, r, a, t), qa(e, i, n || t);
	let o = a ? Vo(e, t) : void 0;
	return t && Fo(!1), o;
}
function Vo(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, $i);
	let { setup: r } = n;
	if (r) {
		Cn();
		let n = e.setupContext = r.length > 1 ? qo(e) : null, i = Io(e), a = Br(r, e, 0, [e.props, n]), o = xt(a);
		if (wn(), i(), (o || e.sp) && !ji(e) && Ei(e), o) {
			if (a.then(Lo, Lo), t) return a.then((n) => {
				Ho(e, n, t);
			}).catch((t) => {
				Hr(t, e, 0);
			});
			e.asyncDep = a;
		} else Ho(e, a, t);
	} else Go(e, t);
}
function Ho(e, t, n) {
	k(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : j(t) && (e.setupState = Or(t)), Go(e, n);
}
var Uo, Wo;
function Go(e, t, n) {
	let r = e.type;
	if (!e.render) {
		if (!t && Uo && !r.render) {
			let t = r.template || oa(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: o } = r;
				r.render = Uo(t, E(E({
					isCustomElement: n,
					delimiters: a
				}, i), o));
			}
		}
		e.render = r.render || dt, Wo && Wo(e);
	}
	{
		let t = Io(e);
		Cn();
		try {
			na(e);
		} finally {
			wn(), t();
		}
	}
}
var Ko = { get(e, t) {
	return F(e, "get", ""), e[t];
} };
function qo(e) {
	return {
		attrs: new Proxy(e.attrs, Ko),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function Jo(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Or(Sr(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Zi) return Zi[n](e);
		},
		has(e, t) {
			return t in e || t in Zi;
		}
	}) : e.proxy;
}
function Yo(e) {
	return k(e) && "__vccOpts" in e;
}
var Xo = (e, t) => /* @__PURE__ */ Nr(e, t, zo), Zo = "3.5.38", Qo = void 0, $o = typeof window < "u" && window.trustedTypes;
if ($o) try {
	Qo = /* @__PURE__ */ $o.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var es = Qo ? (e) => Qo.createHTML(e) : (e) => e, ts = "http://www.w3.org/2000/svg", ns = "http://www.w3.org/1998/Math/MathML", rs = typeof document < "u" ? document : null, is = rs && /* @__PURE__ */ rs.createElement("template"), as = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? rs.createElementNS(ts, e) : t === "mathml" ? rs.createElementNS(ns, e) : n ? rs.createElement(e, { is: n }) : rs.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => rs.createTextNode(e),
	createComment: (e) => rs.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => rs.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			is.innerHTML = es(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = is.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, os = /* @__PURE__ */ Symbol("_vtc");
function ss(e, t, n) {
	let r = e[os];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var cs = /* @__PURE__ */ Symbol("_vod"), ls = /* @__PURE__ */ Symbol("_vsh"), us = /* @__PURE__ */ Symbol(""), ds = /(?:^|;)\s*display\s*:/;
function fs(e, t, n) {
	let r = e.style, i = A(n), a = !1;
	if (n && !i) {
		if (t) if (A(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? ms(r, t, "");
		}
		else for (let e in t) n[e] ?? ms(r, e, "");
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? ms(r, i, "") : vs(e, i, !A(t) && t ? t[i] : void 0, o) || ms(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[us];
			e && (n += ";" + e), r.cssText = n, a = ds.test(n);
		}
	} else t && e.removeAttribute("style");
	cs in e && (e[cs] = a ? r.display : "", e[ls] && (r.display = "none"));
}
var ps = /\s*!important$/;
function ms(e, t, n) {
	if (O(n)) n.forEach((n) => ms(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = _s(e, t);
		ps.test(n) ? e.setProperty(Mt(r), n.replace(ps, ""), "important") : e[r] = n;
	}
}
var hs = [
	"Webkit",
	"Moz",
	"ms"
], gs = {};
function _s(e, t) {
	let n = gs[t];
	if (n) return n;
	let r = At(t);
	if (r !== "filter" && r in e) return gs[t] = r;
	r = Nt(r);
	for (let n = 0; n < hs.length; n++) {
		let i = hs[n] + r;
		if (i in e) return gs[t] = i;
	}
	return t;
}
function vs(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && A(r) && n === r;
}
var ys = "http://www.w3.org/1999/xlink";
function bs(e, t, n, r, i, a = Jt(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ys, t.slice(6, t.length)) : e.setAttributeNS(ys, t, n) : n == null || a && !Yt(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : bt(n) ? String(n) : n);
}
function xs(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? es(n) : n);
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
		r === "boolean" ? n = Yt(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function Ss(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function Cs(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var ws = /* @__PURE__ */ Symbol("_vei");
function Ts(e, t, n, r, i = null) {
	let a = e[ws] || (e[ws] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = Ds(t);
		r ? Ss(e, n, a[t] = js(r, i), s) : o && (Cs(e, n, o, s), a[t] = void 0);
	}
}
var Es = /(?:Once|Passive|Capture)$/;
function Ds(e) {
	let t;
	if (Es.test(e)) {
		t = {};
		let n;
		for (; n = e.match(Es);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
	}
	return [e[2] === ":" ? e.slice(3) : Mt(e.slice(2)), t];
}
var Os = 0, ks = /* @__PURE__ */ Promise.resolve(), As = () => Os ||= (ks.then(() => Os = 0), Date.now());
function js(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (O(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && Vr(e, t, 5, a);
			}
		} else Vr(r, t, 5, [e]);
	};
	return n.value = e, n.attached = As(), n;
}
var Ms = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ns = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? ss(e, r, o) : t === "style" ? fs(e, n, r) : pt(t) ? mt(t) || Ts(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ps(e, t, r, o)) ? (xs(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && bs(e, t, r, o, a, t !== "value")) : e._isVueCE && (Fs(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !A(r))) ? xs(e, At(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), bs(e, t, r, o));
};
function Ps(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Ms(t) && k(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return Ms(t) && A(n) ? !1 : t in e;
}
function Fs(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = At(t);
	return Array.isArray(n) ? n.some((e) => At(e) === r) : Object.keys(n).some((e) => At(e) === r);
}
var Is = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return O(t) ? (e) => It(t, e) : t;
};
function Ls(e) {
	e.target.composing = !0;
}
function Rs(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var zs = /* @__PURE__ */ Symbol("_assign");
function Bs(e, t, n) {
	return t && (e = e.trim()), n && (e = Rt(e)), e;
}
var Vs = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[zs] = Is(i);
		let a = r || i.props && i.props.type === "number";
		Ss(e, t ? "change" : "input", (t) => {
			t.target.composing || e[zs](Bs(e.value, n, a));
		}), (n || a) && Ss(e, "change", () => {
			e.value = Bs(e.value, n, a);
		}), t || (Ss(e, "compositionstart", Ls), Ss(e, "compositionend", Rs), Ss(e, "change", Rs));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[zs] = Is(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? Rt(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, Hs = {
	deep: !0,
	created(e, t, n) {
		e[zs] = Is(n), Ss(e, "change", () => {
			let t = e._modelValue, n = Ks(e), r = e.checked, i = e[zs];
			if (O(t)) {
				let e = Qt(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (vt(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(qs(e, r));
		});
	},
	mounted: Us,
	beforeUpdate(e, t, n) {
		e[zs] = Is(n), Us(e, t, n);
	}
};
function Us(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (O(t)) i = Qt(t, r.props.value) > -1;
	else if (vt(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = Zt(t, qs(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Ws = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = vt(t);
		Ss(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? Rt(Ks(e)) : Ks(e));
			e[zs](e.multiple ? i ? new Set(t) : t : t[0]), e._assigning = !0, Xr(() => {
				e._assigning = !1;
			});
		}), e[zs] = Is(r);
	},
	mounted(e, { value: t }) {
		Gs(e, t);
	},
	beforeUpdate(e, t, n) {
		e[zs] = Is(n);
	},
	updated(e, { value: t }) {
		e._assigning || Gs(e, t);
	}
};
function Gs(e, t) {
	let n = e.multiple, r = O(t);
	if (!(n && !r && !vt(t))) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = Ks(a);
			if (n) if (r) {
				let e = typeof o;
				e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = Qt(t, o) > -1;
			} else a.selected = t.has(o);
			else if (Zt(Ks(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Ks(e) {
	return "_value" in e ? e._value : e.value;
}
function qs(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Js = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], Ys = {
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
	exact: (e, t) => Js.some((n) => e[`${n}Key`] && !t.includes(n))
}, Xs = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = Ys[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, Zs = /* @__PURE__ */ E({ patchProp: Ns }, as), Qs;
function $s() {
	return Qs ||= Ya(Zs);
}
var ec = ((...e) => {
	let t = $s().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = nc(e);
		if (!r) return;
		let i = t._component;
		!k(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, tc(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function tc(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function nc(e) {
	return A(e) ? document.querySelector(e) : e;
}
//#endregion
//#region node_modules/pinia/dist/pinia.mjs
var rc = typeof window < "u", ic, ac = (e) => ic = e, oc = Symbol();
function sc(e) {
	return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var cc;
(function(e) {
	e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(cc ||= {});
var lc = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function uc(e, { autoBom: t = !1 } = {}) {
	return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["﻿", e], { type: e.type }) : e;
}
function dc(e, t, n) {
	let r = new XMLHttpRequest();
	r.open("GET", e), r.responseType = "blob", r.onload = function() {
		gc(r.response, t, n);
	}, r.onerror = function() {
		console.error("could not download file");
	}, r.send();
}
function fc(e) {
	let t = new XMLHttpRequest();
	t.open("HEAD", e, !1);
	try {
		t.send();
	} catch {}
	return t.status >= 200 && t.status <= 299;
}
function pc(e) {
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
var mc = typeof navigator == "object" ? navigator : { userAgent: "" }, hc = /Macintosh/.test(mc.userAgent) && /AppleWebKit/.test(mc.userAgent) && !/Safari/.test(mc.userAgent), gc = rc ? typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !hc ? _c : "msSaveOrOpenBlob" in mc ? vc : yc : () => {};
function _c(e, t = "download", n) {
	let r = document.createElement("a");
	r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin === location.origin ? pc(r) : fc(r.href) ? dc(e, t, n) : (r.target = "_blank", pc(r))) : (r.href = URL.createObjectURL(e), setTimeout(function() {
		URL.revokeObjectURL(r.href);
	}, 4e4), setTimeout(function() {
		pc(r);
	}, 0));
}
function vc(e, t = "download", n) {
	if (typeof e == "string") if (fc(e)) dc(e, t, n);
	else {
		let t = document.createElement("a");
		t.href = e, t.target = "_blank", setTimeout(function() {
			pc(t);
		});
	}
	else navigator.msSaveOrOpenBlob(uc(e, n), t);
}
function yc(e, t, n, r) {
	if (r ||= open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string") return dc(e, t, n);
	let i = e.type === "application/octet-stream", a = /constructor/i.test(String(lc.HTMLElement)) || "safari" in lc, o = /CriOS\/[\d]+/.test(navigator.userAgent);
	if ((o || i && a || hc) && typeof FileReader < "u") {
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
var { assign: bc } = Object;
function xc() {
	let e = rn(!0), t = e.run(() => /* @__PURE__ */ z({})), n = [], r = [], i = Sr({
		install(e) {
			ac(i), i._a = e, e.provide(oc, i), e.config.globalProperties.$pinia = i, r.forEach((e) => n.push(e)), r = [];
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
var Sc = () => {};
function Cc(e, t, n, r = Sc) {
	e.add(t);
	let i = () => {
		e.delete(t) && r();
	};
	return !n && an() && on(i), i;
}
function wc(e, ...t) {
	e.forEach((e) => {
		e(...t);
	});
}
var Tc = (e) => e(), Ec = Symbol(), Dc = Symbol();
function Oc(e, t) {
	e instanceof Map && t instanceof Map ? t.forEach((t, n) => e.set(n, t)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
	for (let n in t) {
		if (!t.hasOwnProperty(n)) continue;
		let r = t[n], i = e[n];
		sc(i) && sc(r) && e.hasOwnProperty(n) && !/* @__PURE__ */ R(r) && !/* @__PURE__ */ yr(r) ? e[n] = Oc(i, r) : e[n] = r;
	}
	return e;
}
var kc = Symbol();
function Ac(e) {
	return !sc(e) || !Object.prototype.hasOwnProperty.call(e, kc);
}
var { assign: jc } = Object;
function Mc(e) {
	return !!(/* @__PURE__ */ R(e) && e.effect);
}
function Nc(e, t, n, r) {
	let { state: i, actions: a, getters: o } = t, s = n.state.value[e], c;
	function l() {
		return s || (n.state.value[e] = i ? i() : {}), jc(/* @__PURE__ */ kr(n.state.value[e]), a, Object.keys(o || {}).reduce((t, r) => (t[r] = Sr(Xo(() => {
			ac(n);
			let t = n._s.get(e);
			return o[r].call(t, t);
		})), t), {}));
	}
	return c = Pc(e, l, t, n, r, !0), c;
}
function Pc(e, t, n = {}, r, i, a) {
	let o, s = jc({ actions: {} }, n), c = { deep: !0 }, l, u, d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p = r.state.value[e];
	!a && !p && (r.state.value[e] = {});
	let m;
	function h(t) {
		let n;
		l = u = !1, typeof t == "function" ? (t(r.state.value[e]), n = {
			type: cc.patchFunction,
			storeId: e,
			events: void 0
		}) : (Oc(r.state.value[e], t), n = {
			type: cc.patchObject,
			payload: t,
			storeId: e,
			events: void 0
		});
		let i = m = Symbol();
		Xr().then(() => {
			m === i && (l = !0);
		}), u = !0, wc(d, n, r.state.value[e]);
	}
	let g = a ? function() {
		let { state: e } = n, t = e ? e() : {};
		this.$patch((e) => {
			jc(e, t);
		});
	} : Sc;
	function _() {
		o.stop(), d.clear(), f.clear(), r._s.delete(e);
	}
	let v = (t, n = "") => {
		if (Ec in t) return t[Dc] = n, t;
		let i = function() {
			ac(r);
			let n = Array.from(arguments), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
			function s(e) {
				a.add(e);
			}
			function c(e) {
				o.add(e);
			}
			wc(f, {
				args: n,
				name: i[Dc],
				store: y,
				after: s,
				onError: c
			});
			let l;
			try {
				l = t.apply(this && this.$id === e ? this : y, n);
			} catch (e) {
				throw wc(o, e), e;
			}
			return l instanceof Promise ? l.then((e) => (wc(a, e), e)).catch((e) => (wc(o, e), Promise.reject(e))) : (wc(a, l), l);
		};
		return i[Ec] = !0, i[Dc] = n, i;
	}, y = /* @__PURE__ */ hr({
		_p: r,
		$id: e,
		$onAction: Cc.bind(null, f),
		$patch: h,
		$reset: g,
		$subscribe(t, n = {}) {
			let i = Cc(d, t, n.detached, () => a()), a = o.run(() => _i(() => r.state.value[e], (r) => {
				(n.flush === "sync" ? u : l) && t({
					storeId: e,
					type: cc.direct,
					events: void 0
				}, r);
			}, jc({}, c, n)));
			return i;
		},
		$dispose: _
	});
	r._s.set(e, y);
	let b = (r._a && r._a.runWithContext || Tc)(() => r._e.run(() => (o = rn()).run(() => t({ action: v }))));
	for (let t in b) {
		let n = b[t];
		/* @__PURE__ */ R(n) && !Mc(n) || /* @__PURE__ */ yr(n) ? a || (p && Ac(n) && (/* @__PURE__ */ R(n) ? n.value = p[t] : Oc(n, p[t])), r.state.value[e][t] = n) : typeof n == "function" && (b[t] = v(n, t), s.actions[t] = n);
	}
	return jc(y, b), jc(/* @__PURE__ */ L(y), b), Object.defineProperty(y, "$state", {
		get: () => r.state.value[e],
		set: (e) => {
			h((t) => {
				jc(t, e);
			});
		}
	}), r._p.forEach((e) => {
		jc(y, o.run(() => e({
			store: y,
			app: r._a,
			pinia: r,
			options: s
		})));
	}), p && a && n.hydrate && n.hydrate(y.$state, p), l = !0, u = !0, y;
}
function Fc(e, t, n) {
	let r, i = typeof t == "function";
	r = i ? n : t;
	function a(n, a) {
		let o = mi();
		return n ||= o ? pi(oc, null) : null, n && ac(n), n = ic, n._s.has(e) || (i ? Pc(e, t, r, n) : Nc(e, r, n)), n._s.get(e);
	}
	return a.$id = e, a;
}
//#endregion
//#region src/state/damage-console/index.ts
var Ic = Fc("damageConsole", () => {
	let e = /* @__PURE__ */ z("1d10"), t = /* @__PURE__ */ z("roll"), n = /* @__PURE__ */ z(!1), r = /* @__PURE__ */ z(!1), i = /* @__PURE__ */ z(!1), a = /* @__PURE__ */ z(!0), o = /* @__PURE__ */ z(!0), s = /* @__PURE__ */ z(""), c = /* @__PURE__ */ z([]), l = /* @__PURE__ */ z([]), u = /* @__PURE__ */ z(null), d;
	function f(e, t) {
		c.value = e, d = t;
	}
	async function p() {
		if (!d || i.value) return;
		s.value = "";
		let f = C({
			damageFormula: e.value,
			hitLocation: t.value,
			ignoreArmour: n.value,
			ignoreToughness: r.value,
			minimumOne: a.value,
			rollSeparately: o.value,
			targetUuids: c.value.map((e) => e.uuid),
			woundingType: u.value
		});
		if (l.value = ce(f), !l.value.length) {
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
}), Lc = {
	key: 0,
	role: "alert",
	class: "tw:dui-alert tw:dui-alert-error tw:text-sm"
}, Rc = { key: 0 }, zc = { class: "tw:dui-card tw:dui-card-border tw:dui-card-sm" }, Bc = { class: "tw:dui-card-body" }, Vc = { class: "tw:dui-card-title tw:text-base" }, Hc = { class: "tw:grid tw:grid-cols-1 tw:gap-2 tw:sm:grid-cols-2" }, Uc = ["src"], Wc = { class: "tw:min-w-0 tw:truncate" }, Gc = { class: "tw:grid tw:grid-cols-1 tw:gap-4 tw:md:grid-cols-2" }, Kc = { class: "tw:dui-fieldset tw:min-w-0 tw:rounded-box tw:border tw:border-base-300 tw:p-4" }, qc = { class: "tw:dui-fieldset-legend" }, Jc = {
	class: "tw:dui-label",
	for: "ech-damage-formula"
}, Yc = { class: "tw:dui-label tw:whitespace-normal" }, Xc = {
	class: "tw:dui-label",
	for: "ech-hit-location"
}, Zc = ["value"], Qc = {
	class: "tw:dui-label",
	for: "ech-wounding-type"
}, $c = ["value"], el = { class: "tw:dui-label tw:whitespace-normal" }, tl = { class: "tw:dui-fieldset tw:min-w-0 tw:rounded-box tw:border tw:border-base-300 tw:p-4" }, nl = { class: "tw:dui-fieldset-legend" }, rl = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, il = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, al = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, ol = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, sl = {
	role: "alert",
	class: "tw:dui-alert tw:mt-2 tw:text-sm"
}, cl = { class: "tw:flex tw:justify-end tw:gap-2" }, ll = ["disabled"], ul = ["disabled"], dl = /* @__PURE__ */ Ti({
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
		let t = e, n = Ic();
		n.initialize(t.targets, t.onPost);
		function r(e) {
			return t.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.${e}`);
		}
		return (e, i) => (q(), J("form", {
			class: "tw:flex tw:flex-col tw:gap-4 tw:rounded-box tw:bg-base-100 tw:p-4 tw:text-base-content",
			onSubmit: i[8] ||= Xs((...e) => B(n).submit && B(n).submit(...e), ["prevent"])
		}, [
			B(n).validationErrors.length || B(n).runtimeError ? (q(), J("div", Lc, [i[9] ||= Y("i", {
				class: "fa-solid fa-triangle-exclamation",
				"aria-hidden": "true"
			}, null, -1), Y("div", null, [(q(!0), J(G, null, H(B(n).validationErrors, (e) => (q(), J("p", { key: e }, M(r(`validation.${e}`)), 1))), 128)), B(n).runtimeError ? (q(), J("p", Rc, M(B(n).runtimeError), 1)) : wo("", !0)])])) : wo("", !0),
			Y("section", zc, [Y("div", Bc, [Y("h2", Vc, [i[10] ||= Y("i", {
				class: "fa-solid fa-crosshairs",
				"aria-hidden": "true"
			}, null, -1), Z(" " + M(r("targets")), 1)]), Y("div", Hc, [(q(!0), J(G, null, H(B(n).targets, (e) => (q(), J("div", {
				key: e.uuid,
				class: "tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:rounded-sm tw:bg-base-200 tw:p-2"
			}, [Y("img", {
				src: e.img,
				alt: "",
				class: "tw:h-9 tw:w-9 tw:rounded-sm tw:object-cover"
			}, null, 8, Uc), Y("strong", Wc, M(e.name), 1)]))), 128))])])]),
			Y("div", Gc, [Y("fieldset", Kc, [
				Y("legend", qc, M(r("damageDetails")), 1),
				Y("label", Jc, M(r("damage")), 1),
				li(Y("input", {
					id: "ech-damage-formula",
					"onUpdate:modelValue": i[0] ||= (e) => B(n).damageFormula = e,
					class: "tw:dui-input tw:w-full",
					name: "damageFormula",
					placeholder: "1d10",
					required: "",
					type: "text"
				}, null, 512), [[Vs, B(n).damageFormula]]),
				Y("p", Yc, M(r("damageHint")), 1),
				Y("label", Xc, M(r("hitLocation")), 1),
				li(Y("select", {
					id: "ech-hit-location",
					"onUpdate:modelValue": i[1] ||= (e) => B(n).hitLocation = e,
					class: "tw:dui-select tw:w-full",
					name: "hitLocation"
				}, [(q(!0), J(G, null, H(t.hitLocationOptions, (e) => (q(), J("option", {
					key: e.value,
					value: e.value
				}, M(e.label), 9, Zc))), 128))], 512), [[Ws, B(n).hitLocation]]),
				Y("label", Qc, M(r("woundingType")), 1),
				li(Y("select", {
					id: "ech-wounding-type",
					"onUpdate:modelValue": i[2] ||= (e) => B(n).woundingType = e,
					class: "tw:dui-select tw:w-full",
					name: "woundingType"
				}, [(q(!0), J(G, null, H(t.woundingTypeOptions, (e) => (q(), J("option", {
					key: e.value ?? "unspecified",
					value: e.value
				}, M(e.label), 9, $c))), 128))], 512), [[Ws, B(n).woundingType]]),
				Y("p", el, M(r("woundingTypeHint")), 1)
			]), Y("fieldset", tl, [
				Y("legend", nl, M(r("damageOptions")), 1),
				Y("label", rl, [Y("span", null, M(r("rollSeparately")), 1), li(Y("input", {
					"onUpdate:modelValue": i[3] ||= (e) => B(n).rollSeparately = e,
					class: "tw:dui-checkbox",
					name: "rollSeparately",
					type: "checkbox"
				}, null, 512), [[Hs, B(n).rollSeparately]])]),
				Y("label", il, [Y("span", null, M(r("ignoreToughness")), 1), li(Y("input", {
					"onUpdate:modelValue": i[4] ||= (e) => B(n).ignoreToughness = e,
					class: "tw:dui-checkbox",
					name: "ignoreToughness",
					type: "checkbox"
				}, null, 512), [[Hs, B(n).ignoreToughness]])]),
				Y("label", al, [Y("span", null, M(r("ignoreArmour")), 1), li(Y("input", {
					"onUpdate:modelValue": i[5] ||= (e) => B(n).ignoreArmour = e,
					class: "tw:dui-checkbox",
					name: "ignoreArmour",
					type: "checkbox"
				}, null, 512), [[Hs, B(n).ignoreArmour]])]),
				Y("label", ol, [Y("span", null, M(r("minimumOne")), 1), li(Y("input", {
					"onUpdate:modelValue": i[6] ||= (e) => B(n).minimumOne = e,
					class: "tw:dui-checkbox",
					name: "minimumOne",
					type: "checkbox"
				}, null, 512), [[Hs, B(n).minimumOne]])]),
				Y("div", sl, [i[11] ||= Y("i", {
					class: "fa-solid fa-circle-info",
					"aria-hidden": "true"
				}, null, -1), Y("span", null, M(r("postHint")), 1)])
			])]),
			Y("div", cl, [Y("button", {
				class: "tw:dui-btn",
				type: "button",
				disabled: B(n).isPosting,
				onClick: i[7] ||= (...e) => t.onCancel && t.onCancel(...e)
			}, M(r("cancel")), 9, ll), Y("button", {
				class: "tw:dui-btn tw:dui-btn-primary",
				type: "submit",
				disabled: B(n).isPosting
			}, [Y("i", {
				class: Kt(B(n).isPosting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-message"),
				"aria-hidden": "true"
			}, null, 2), Z(" " + M(r("post")), 1)], 8, ul)])
		], 32));
	}
});
//#endregion
//#region src/module/wfrp4e/damage-console/posting.ts
async function fl(e) {
	pl();
	let t = C(e), n = ce(t);
	if (n.length) throw Error(game.i18n.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.validation.${n[0]}`));
	let r = le(t, await Promise.all(t.targetUuids.map(async (e) => (await Be(e)).snapshot))), i = Ae(r), a = game.wfrp4e?.utility?.chatDataSetup?.(i) ?? { content: i };
	return De(a, r), (await ChatMessage.create(a))?.id;
}
function pl() {
	if (!game.user.isGM) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.gmOnly"));
}
//#endregion
//#region src/module/apps/FoundryVueApplication.ts
var ml = class extends foundry.applications.api.ApplicationV2 {
	#e;
	getVueProps() {}
	async _renderHTML(e, t) {
		let n = document.createElement("div");
		return n.classList.add("wfrp4e-expanded-critical-hits-root"), n.dataset.theme = "wfrp4e-expanded-critical-hits", n;
	}
	_replaceHTML(e, t, n) {
		this.unmountVue(), t.classList.add("wfrp4e-expanded-critical-hits-app"), t.replaceChildren(e), this.#e = ec(this.getVueComponent(), this.getVueProps() ?? {}), this.#e.use(xc()), this.#e.mount(e);
	}
	async _preClose(e) {
		this.unmountVue(), await super._preClose(e);
	}
	unmountVue() {
		this.#e?.unmount(), this.#e = void 0;
	}
}, hl = {
	body: "Body",
	head: "Head",
	lArm: "Left Arm",
	lLeg: "Left Leg",
	rArm: "Right Arm",
	rLeg: "Right Leg",
	roll: "Roll"
}, gl = class extends ml {
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
		return dl;
	}
	getVueProps() {
		return {
			hitLocationOptions: _l(),
			localize: (e) => game.i18n.localize(e),
			onCancel: () => void this.close(),
			onPost: async (e) => {
				await fl(e), await this.close();
			},
			targets: this.#e,
			woundingTypeOptions: vl()
		};
	}
};
function _l() {
	return se.map((e) => ({
		label: game.i18n.localize(hl[e]),
		value: e
	}));
}
function vl() {
	return [{
		label: game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.unspecified"),
		value: null
	}, ...b.map((e) => ({
		label: S[e],
		value: e
	}))];
}
//#endregion
//#region src/module/wfrp4e/damage-console/launch.ts
async function yl() {
	if (!game.user.isGM) {
		ui.notifications?.warn(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.gmOnly"));
		return;
	}
	let e = ze();
	if (!e.length) {
		ui.notifications?.warn(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.targetsRequired"));
		return;
	}
	await new gl(e).render(!0);
}
//#endregion
//#region src/module/wfrp4e/damage-console/scene-controls.ts
function bl() {
	Hooks.on("getSceneControlButtons", (e) => {
		let t = e?.tokens?.tools;
		t && (t.expandedCriticalDamageConsole = {
			button: !0,
			icon: "fa-solid fa-bolt",
			name: "expandedCriticalDamageConsole",
			onClick: () => void yl(),
			title: "WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.sceneControl",
			visible: game.user.isGM
		});
	});
}
//#endregion
//#region src/module/wfrp4e/damage-console/index.ts
var xl = !1;
function Sl() {
	xl ||= (Qe(), bl(), !0);
}
//#endregion
//#region src/functions/critical-hits/damage-inference/index.ts
var Cl = {
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
}, wl = {
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
function Tl(e) {
	if (e.explicitCategories.length > 0) return {
		categories: jl(e.explicitCategories),
		matches: [],
		source: "explicit"
	};
	if (e.defaultCategories && e.defaultCategories.length > 0) return {
		categories: jl(e.defaultCategories),
		matches: [],
		source: "default"
	};
	if (e.inferFromWeaponProperties) {
		let t = kl(e.weaponPropertyKeys, e.weaponPropertyMapping);
		if (t.length > 0) return {
			categories: Al(t),
			matches: t,
			source: "weaponProperty"
		};
	}
	if (e.inferFromWeaponTypes) {
		let t = kl(e.weaponTypeKeys, e.weaponTypeMapping);
		if (t.length > 0) return {
			categories: Al(t),
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
function El(e) {
	return e.trim().toLowerCase().replaceAll(/[^a-z0-9]/g, "");
}
function Dl(e) {
	let t = Ol(e), n = {};
	for (let [e, r] of Object.entries(t ?? {})) Nl(r) && (n[El(e)] = r);
	return n;
}
function Ol(e) {
	if (typeof e == "string") try {
		return Ol(JSON.parse(e));
	} catch {
		return;
	}
	if (typeof e == "object" && e && !Array.isArray(e)) return e;
}
function kl(e, t) {
	let n = Dl(t), r = e.flatMap((e) => {
		let t = n[El(e)];
		return t && t !== "none" ? [{
			category: t,
			key: e
		}] : [];
	}), i = /* @__PURE__ */ new Set();
	return y.flatMap((e) => r.filter((t) => {
		let n = `${e}:${El(t.key)}`;
		return t.category !== e || i.has(n) ? !1 : (i.add(n), !0);
	}));
}
function Al(e) {
	return jl(e.map((e) => e.category));
}
function jl(e) {
	let t = new Set(e);
	return y.filter((e) => t.has(e));
}
function Ml(e) {
	return typeof e == "string" && y.includes(e);
}
function Nl(e) {
	return e === "none" || Ml(e);
}
//#endregion
//#region src/functions/critical-hits/natural-one-critical/index.ts
function Pl(e) {
	let t = Number(e.roll), n = Number(e.target);
	return t === 1 && t <= n;
}
//#endregion
//#region src/functions/critical-hits/table-keys.ts
function Fl(e, t, n) {
	return `ech-crit-${e}-${t}-${n}`.toLowerCase();
}
function Il(e) {
	let t = e.toLowerCase();
	if (t === "head" || t === "body") return t;
	if (t.endsWith("arm")) return "arm";
	if (t.endsWith("leg")) return "leg";
}
function Ll(e) {
	return e ? "upInArms" : "core";
}
//#endregion
//#region src/module/settings.ts
var Rl = "enableCriticalReplacement", zl = "enableNaturalOneCriticals", Bl = "inferDamageFromWeaponProperties", Vl = "inferDamageFromWeaponTypes", Hl = "weaponPropertyDamageMapping", Ul = "weaponTypeDamageMapping", Wl = JSON.stringify(Cl), Gl = JSON.stringify(wl), Kl = JSON.stringify({
	hack: "cutting",
	impale: "piercing",
	pummel: "crushing",
	slash: "cutting"
});
function ql() {
	game.settings.register(e, i, {
		scope: "world",
		config: !1,
		default: {},
		type: Object
	}), game.settings.register(e, r, {
		scope: "world",
		config: !1,
		default: "",
		type: String
	}), game.settings.register(e, n, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.debugConsoleLogging.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.debugConsoleLogging.hint",
		scope: "client",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, Rl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, zl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, Bl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.hint",
		scope: "world",
		config: !0,
		default: !0,
		type: Boolean
	}), game.settings.register(e, Hl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.hint",
		scope: "world",
		config: !1,
		default: Wl,
		type: String
	}), game.settings.register(e, Vl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, Ul, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.hint",
		scope: "world",
		config: !1,
		default: Gl,
		type: String
	}), a(`${e} | Settings registered`, ru());
}
function Jl() {
	return !!game.settings.get(e, Rl);
}
function Yl() {
	return !!game.settings.get(e, zl);
}
async function Xl() {
	if (!game.user.isGM) {
		a(`${e} | Skipping mapping setting normalization for non-GM user.`);
		return;
	}
	a(`${e} | Normalizing stored mapping settings.`), await tu(Hl, Wl), await tu(Ul, Gl), a(`${e} | Mapping settings normalized`, ru());
}
function Zl() {
	return !!game.settings.get(e, Bl);
}
function Ql() {
	return !!game.settings.get(e, Vl);
}
function $l() {
	return Dl(game.settings.get(e, Hl));
}
function eu() {
	return Dl(game.settings.get(e, Ul));
}
async function tu(t, n) {
	let r = game.settings.get(e, t);
	if (typeof r == "object" && r) {
		a(`${e} | Normalizing object mapping setting to JSON string`, {
			key: t,
			value: r
		}), await game.settings.set(e, t, JSON.stringify(r));
		return;
	}
	if (r === "[object Object]") {
		a(`${e} | Resetting invalid object-string mapping setting`, { key: t }), await game.settings.set(e, t, n);
		return;
	}
	t === "weaponPropertyDamageMapping" && nu(r, Kl) && (a(`${e} | Upgrading untouched weapon property mapping defaults`, { key: t }), await game.settings.set(e, t, n));
}
function nu(e, t) {
	return JSON.stringify(Dl(e)) === t;
}
function ru() {
	return {
		debugConsoleLogging: au(n),
		enableCriticalReplacement: au(Rl),
		enableNaturalOneCriticals: au(zl),
		inferDamageFromWeaponProperties: au(Bl),
		inferDamageFromWeaponTypes: au(Vl),
		weaponPropertyDamageMapping: iu(Hl),
		weaponTypeDamageMapping: iu(Ul)
	};
}
function iu(e) {
	let t = au(e);
	return {
		key: e,
		type: typeof t,
		value: t
	};
}
function au(t) {
	try {
		return game.settings.settings.has(`wfrp4e-expanded-critical-hits.${t}`) ? game.settings.get(e, t) : "<not registered>";
	} catch (e) {
		return `<error: ${e instanceof Error ? e.message : String(e)}>`;
	}
}
//#endregion
//#region src/module/wfrp4e/natural-one-critical.ts
var ou = Symbol.for(`${e}.naturalOneCriticalPatch`), su = {
	installed: !1,
	message: "Natural 1 critical patch has not run."
};
function cu() {
	return { ...su };
}
function lu() {
	let t = game.wfrp4e?.rolls;
	if (!t?.TestWFRP) {
		gu(!1, "WFRP4e roll classes were not available.");
		return;
	}
	let n = uu(t.TestWFRP), r = du([t.WeaponTest, t.TraitTest]);
	su = {
		installed: n,
		message: n ? `Natural 1 critical patch installed. Attack wrappers installed: ${r}.` : "TestWFRP.isCriticalFumble could not be patched."
	}, n || s(`${e} | ${su.message}`);
}
function uu(e) {
	let t = e.prototype;
	if (hu(t).isCriticalFumble) return !0;
	let n = Object.getOwnPropertyDescriptor(t, "isCriticalFumble");
	return n?.get ? (Object.defineProperty(t, "isCriticalFumble", {
		configurable: n.configurable,
		enumerable: n.enumerable,
		get() {
			return fu(this) ? "critical" : n.get?.call(this);
		}
	}), mu(t, "isCriticalFumble"), !0) : !1;
}
function du(e) {
	let t = 0;
	for (let n of e) {
		let e = n?.prototype;
		if (!e || hu(e).computeProperties) continue;
		let r = e.computeProperties;
		r && (e.computeProperties = function(...e) {
			fu(this) && pu(this);
			let t = r.apply(this, e);
			return fu(this) && pu(this), t;
		}, mu(e, "computeProperties"), t += 1);
	}
	return t;
}
function fu(e) {
	return Yl() && Pl({
		roll: e.result?.roll,
		target: e.result?.target
	});
}
function pu(e) {
	e.result && (e.result.color_green = !0, e.result.critical ||= game.i18n.localize("Critical"));
}
function mu(e, t) {
	let n = hu(e);
	n[t] = !0, Object.defineProperty(e, ou, {
		configurable: !0,
		value: n
	});
}
function hu(e) {
	return Object.prototype.hasOwnProperty.call(e, ou) ? Reflect.get(e, ou) : {};
}
function gu(t, n) {
	su = {
		installed: t,
		message: n
	}, s(`${e} | ${n}`);
}
//#endregion
//#region src/module/api/create-module-api.ts
function _u() {
	return {
		getExpandedCriticalsCompendiumStatus: m,
		getNaturalOneCriticalPatchStatus: cu,
		launchDamageConsole: yl,
		postDamageConsoleCard: fl
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function vu() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let t = game.modules.get(e);
	if (!t) throw Error(`Foundry module registry entry was not found for ${e}.`);
	t.api = _u();
}
//#endregion
//#region src/functions/critical-review/automation.ts
function yu(e) {
	return Array.isArray(e) ? e.map((e, t) => bu(e, t)) : [];
}
function bu(e, t) {
	let n = Eu(e) ?? {}, r = Eu(Eu(n.flags)?.["wfrp4e-expanded-critical-hits"]), i = [];
	return xu(n, "effect", {}, i), {
		changes: Su(n.changes),
		id: Tu(n._id, `effect-${t + 1}`),
		name: Tu(n.name, `Effect ${t + 1}`),
		phase: Tu(r?.automationPhase, "Unclassified"),
		scripts: i
	};
}
function xu(e, t, n, r) {
	if (Array.isArray(e)) {
		e.forEach((e, i) => xu(e, `${t}[${i}]`, n, r));
		return;
	}
	let i = Eu(e);
	if (!i) return;
	let a = {
		label: Tu(i.label, n.label ?? ""),
		trigger: Tu(i.trigger, n.trigger ?? "")
	};
	for (let [e, n] of Object.entries(i)) {
		let i = `${t}.${e}`;
		if (/script$/i.test(e) && typeof n == "string" && n.trim()) {
			r.push({
				code: n,
				label: Cu(e, a.label),
				path: i,
				trigger: a.trigger || "—"
			});
			continue;
		}
		xu(n, i, a, r);
	}
}
function Su(e) {
	return Array.isArray(e) ? e.map((e) => {
		let t = Eu(e) ?? {};
		return {
			key: Tu(t.key, ""),
			mode: wu(t.mode),
			priority: wu(t.priority),
			value: Tu(t.value, "")
		};
	}) : [];
}
function Cu(e, t = "") {
	let n = e === "script" ? "Main script" : e.replace(/Script$/i, "").replace(/([a-z])([A-Z])/g, "$1 $2");
	return t ? `${t} — ${n}` : n;
}
function wu(e) {
	return typeof e == "number" || typeof e == "string" ? e : "";
}
function Tu(e, t) {
	return typeof e == "string" && e ? e : t;
}
function Eu(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/functions/critical-review/clipboard.ts
function Du(e, t) {
	let n = e.automationEffects.flatMap((e) => e.scripts.map((t) => `### ${e.name}: ${t.label}\nPhase: ${e.phase}; trigger: ${t.trigger}\n\n\`\`\`js\n${t.code.trim()}\n\`\`\``));
	return [
		`# Critical review: ${e.name}`,
		`Category: ${e.categoryLabel}`,
		`Location: ${e.locationLabel}`,
		`Row: ${e.row + 1}`,
		`Wounds: ${e.wounds || "—"}`,
		`Automation: ${e.automationStatus}`,
		"## Item text",
		ku(e.itemHtml),
		`## Journal: ${e.journalName || "Not found"}`,
		ku(e.journalHtml) || "No matching journal page was found.",
		"## Scripts",
		n.join("\n\n") || "No scripts.",
		"## Review notes",
		t.trim() || "No notes."
	].join("\n\n");
}
function Ou(e) {
	let t = e.filter(({ note: e }) => e.trim());
	return [
		"# Critical review notes packet",
		`Criticals with notes: ${t.length}`,
		"Each review includes the Critical Item text, matching Journal Entry, automation scripts, and saved notes.",
		t.map(({ detail: e, note: t }) => Du(e, t)).join("\n\n---\n\n")
	].join("\n\n");
}
function ku(e) {
	return e.replace(/<\s*br\s*\/?>/gi, "\n").replace(/<\/(?:p|div|h[1-6]|li|blockquote)>/gi, "\n").replace(/<li[^>]*>/gi, "- ").replace(/<[^>]+>/g, "").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, "\"").replace(/&#0?39;|&apos;/gi, "'").replace(/\n{3,}/g, "\n\n").trim();
}
//#endregion
//#region src/functions/critical-review/directory.ts
function Au(e, t = "") {
	let n = t.trim().toLocaleLowerCase(), r = n ? e.filter((e) => Nu(e).includes(n)) : e;
	return y.flatMap((e) => {
		let t = r.filter((t) => t.category === e);
		return t.length ? [{
			key: e,
			label: t[0]?.categoryLabel ?? e,
			locations: v.flatMap((e) => {
				let n = t.filter((t) => t.location === e).sort(Mu);
				return n.length ? [{
					entries: n,
					key: e,
					label: n[0]?.locationLabel ?? e
				}] : [];
			})
		}] : [];
	});
}
function ju(e) {
	return [...e].sort((e, t) => {
		let n = y.indexOf(e.category) - y.indexOf(t.category);
		return n === 0 ? v.indexOf(e.location) - v.indexOf(t.location) || Mu(e, t) : n;
	});
}
function Mu(e, t) {
	return e.row - t.row || e.sort - t.sort || e.name.localeCompare(t.name);
}
function Nu(e) {
	return [
		e.name,
		e.categoryLabel,
		e.locationLabel,
		e.wounds,
		e.automationStatus,
		String(e.row + 1)
	].join(" ").toLocaleLowerCase();
}
//#endregion
//#region src/functions/critical-review/highlight.ts
var Pu = new Set(/* @__PURE__ */ "async.await.break.case.catch.class.const.continue.default.delete.do.else.export.extends.false.finally.for.from.function.if.import.in.instanceof.let.new.null.of.return.static.super.switch.this.throw.true.try.typeof.undefined.var.void.while.yield".split("."));
function Fu(e) {
	let t = [], n = 0;
	for (; n < e.length;) {
		let r = e.slice(n), i = Lu(r), a = Iu(r), o = r.match(/^(?:0[xob][\da-f]+|\d+(?:\.\d+)?)/i)?.[0], s = r.match(/^[A-Za-z_$][\w$]*/)?.[0];
		a ? (t.push({
			kind: "comment",
			value: a
		}), n += a.length) : i ? (t.push({
			kind: "string",
			value: i
		}), n += i.length) : o ? (t.push({
			kind: "number",
			value: o
		}), n += o.length) : s ? (t.push({
			kind: Pu.has(s) ? "keyword" : "plain",
			value: s
		}), n += s.length) : (Ru(t, e[n] ?? ""), n += 1);
	}
	return t;
}
function Iu(e) {
	if (e.startsWith("//")) {
		let t = e.indexOf("\n");
		return t === -1 ? e : e.slice(0, t);
	}
	if (e.startsWith("/*")) {
		let t = e.indexOf("*/", 2);
		return t === -1 ? e : e.slice(0, t + 2);
	}
}
function Lu(e) {
	let t = e[0];
	if (t !== "\"" && t !== "'" && t !== "`") return;
	let n = !1;
	for (let r = 1; r < e.length; r += 1) {
		let i = e[r];
		if (!n && i === t) return e.slice(0, r + 1);
		n = !n && i === "\\", i !== "\\" && (n = !1);
	}
	return e;
}
function Ru(e, t) {
	let n = e.at(-1);
	n?.kind === "plain" ? n.value += t : e.push({
		kind: "plain",
		value: t
	});
}
//#endregion
//#region src/functions/critical-review/locations.ts
var zu = {
	arm: [{
		label: "Left Arm",
		value: "lArm"
	}, {
		label: "Right Arm",
		value: "rArm"
	}],
	body: [{
		label: "Body",
		value: "body"
	}],
	head: [{
		label: "Head",
		value: "head"
	}],
	leg: [{
		label: "Left Leg",
		value: "lLeg"
	}, {
		label: "Right Leg",
		value: "rLeg"
	}]
};
function Bu(e) {
	return zu[e];
}
function Vu(e) {
	return zu[e][0]?.value ?? "body";
}
//#endregion
//#region src/state/critical-review/notes.ts
function Hu(e) {
	let t = /* @__PURE__ */ z(!1), n = /* @__PURE__ */ z(!1), r = /* @__PURE__ */ z("saved"), i = /* @__PURE__ */ z({}), a = !1, o = Promise.resolve(), s, c = Xo(() => i.value[e.selectedId.value] ?? ""), l = Xo(() => Object.values(i.value).filter((e) => e.trim()).length);
	function u(e) {
		i.value = e;
	}
	function d(t) {
		e.selectedId.value && (i.value[e.selectedId.value] = t, a = !0, r.value = "unsaved", f());
	}
	function f() {
		s && clearTimeout(s), s = setTimeout(() => void p(), 650);
	}
	async function p() {
		if (!(!e.getRuntime() || !a)) {
			s && clearTimeout(s), s = void 0, a = !1, r.value = "saving";
			try {
				await h({ ...i.value }), r.value = a ? "unsaved" : "saved", a && f();
			} catch (t) {
				a = !0, r.value = "error", e.errorMessage.value = Uu(t);
			}
		}
	}
	async function m() {
		let n = e.getRuntime();
		if (!(!n || t.value || l.value === 0)) {
			t.value = !0, e.errorMessage.value = "", e.statusMessage.value = "";
			try {
				if (!await n.confirmClearNotes(l.value)) return;
				s && clearTimeout(s), s = void 0, a = !1, r.value = "saving", await h({}), i.value = {}, r.value = "saved", e.statusMessage.value = "All review notes cleared.";
			} catch (t) {
				r.value = "error", e.errorMessage.value = Uu(t);
			} finally {
				t.value = !1;
			}
		}
	}
	async function h(t) {
		let n = e.getRuntime();
		if (!n) return;
		let r = o.then(() => n.saveNotes(t));
		o = r.catch(() => void 0), await r;
	}
	async function g() {
		await y(c.value, "Note copied.");
	}
	async function _() {
		let t = e.getRuntime();
		if (!t || n.value) return;
		let r = e.entries.value.filter((e) => i.value[e.id]?.trim());
		if (!r.length) {
			e.statusMessage.value = "There are no review notes to copy.";
			return;
		}
		n.value = !0, e.errorMessage.value = "", e.statusMessage.value = "Compiling all review notes…";
		try {
			await y(Ou(await Promise.all(r.map(async (e) => ({
				detail: await t.loadDetail(e.id),
				note: i.value[e.id] ?? ""
			})))), "All review notes copied.");
		} catch (t) {
			e.errorMessage.value = Uu(t);
		} finally {
			n.value = !1;
		}
	}
	async function v() {
		e.selectedDetail.value && await y(Du(e.selectedDetail.value, c.value), "Current Critical review copied.");
	}
	async function y(t, n) {
		let r = e.getRuntime();
		if (r) try {
			await r.copyText(t), e.statusMessage.value = n;
		} catch (t) {
			e.errorMessage.value = Uu(t);
		}
	}
	return {
		clearAllNotes: m,
		copyCurrentReview: v,
		copyNote: g,
		copyReviewPacket: _,
		currentNote: c,
		flushNotes: p,
		isClearingNotes: t,
		isCopyingPacket: n,
		loadNotes: u,
		noteCount: l,
		noteSaveState: r,
		setCurrentNote: d
	};
}
function Uu(e) {
	return e instanceof Error ? e.message : String(e);
}
//#endregion
//#region src/state/critical-review/index.ts
var Wu = Fc("criticalReview", () => {
	let e = /* @__PURE__ */ z([]), t = /* @__PURE__ */ z(""), n = /* @__PURE__ */ z(!1), r = /* @__PURE__ */ z(!1), i = /* @__PURE__ */ z(!1), a = /* @__PURE__ */ z(""), o = /* @__PURE__ */ z("body"), s = /* @__PURE__ */ z(), c = /* @__PURE__ */ z(""), l = /* @__PURE__ */ z(""), u = /* @__PURE__ */ z(), d = 0, f, { loadNotes: p, ...m } = Hu({
		entries: e,
		errorMessage: t,
		getRuntime: () => f,
		selectedDetail: s,
		selectedId: c,
		statusMessage: l
	}), h = Xo(() => Au(e.value, "")), g = Xo(() => e.value.findIndex((e) => e.id === c.value)), _ = Xo(() => s.value ? Bu(s.value.location) : []), v = Xo(() => g.value > 0), y = Xo(() => g.value >= 0 && g.value < e.value.length - 1);
	async function b(n) {
		f = n, r.value = !0, t.value = "";
		try {
			let [t, n, r] = await Promise.all([
				f.loadIndex(),
				Promise.resolve(f.loadNotes()),
				Promise.resolve(f.getTestActor())
			]);
			e.value = ju(t), p(n), u.value = r;
			let i = e.value[0];
			i && await ee(i.id);
		} catch (e) {
			t.value = Gu(e);
		} finally {
			r.value = !1;
		}
	}
	async function ee(e) {
		if (!f || e === c.value && s.value) return;
		let n = ++d;
		c.value = e, s.value = void 0, i.value = !0, t.value = "", l.value = "";
		try {
			let t = await f.loadDetail(e);
			if (n !== d) return;
			s.value = t, o.value = Vu(t.location);
		} catch (e) {
			n === d && (t.value = Gu(e));
		} finally {
			n === d && (i.value = !1);
		}
	}
	async function x() {
		let t = e.value[g.value - 1];
		t && await ee(t.id);
	}
	async function te() {
		let t = e.value[g.value + 1];
		t && await ee(t.id);
	}
	async function S() {
		await ae(async () => f?.createTestActor(), "Test Actor is ready.");
	}
	async function ne() {
		await ae(async () => f?.resetTestActor(), "Test Actor reset to base state.");
	}
	async function re() {
		let e = s.value;
		!f || !e || !u.value || await ae(() => f?.applyCritical(e.id, o.value), `${e.name} applied to the Test Actor.`);
	}
	function ie() {
		try {
			f?.openTestActor();
		} catch (e) {
			t.value = Gu(e);
		}
	}
	async function ae(e, r) {
		if (!n.value) {
			n.value = !0, t.value = "", l.value = "";
			try {
				let t = await e();
				t && (u.value = t), l.value = r;
			} catch (e) {
				t.value = Gu(e);
			} finally {
				n.value = !1;
			}
		}
	}
	return {
		...m,
		applyCritical: re,
		canGoNext: y,
		canGoPrevious: v,
		createTestActor: S,
		directory: h,
		entries: e,
		errorMessage: t,
		goNext: te,
		goPrevious: x,
		initialize: b,
		isActing: n,
		isLoadingCatalog: r,
		isLoadingDetail: i,
		locationOptions: _,
		openTestActor: ie,
		query: a,
		resetTestActor: ne,
		selectEntry: ee,
		selectedActorLocation: o,
		selectedDetail: s,
		selectedId: c,
		selectedIndex: g,
		statusMessage: l,
		testActor: u
	};
});
function Gu(e) {
	return e instanceof Error ? e.message : String(e);
}
//#endregion
//#region src/view/apps/critical-review/components/ActorReviewPanel.vue?vue&type=script&setup=true&lang.ts
var Ku = { class: "tw:dui-card tw:dui-card-border tw:min-h-0 tw:overflow-hidden tw:bg-base-100" }, qu = { class: "tw:dui-card-body tw:min-h-0 tw:gap-3 tw:overflow-y-auto tw:p-3" }, Ju = { class: "tw:flex tw:shrink-0 tw:items-center tw:justify-between tw:gap-2" }, Yu = { class: "tw:dui-card-title tw:m-0 tw:text-base" }, Xu = {
	key: 0,
	class: "tw:dui-badge tw:dui-badge-sm"
}, Zu = ["aria-label", "disabled"], Qu = ["src"], $u = { class: "tw:min-w-0" }, ed = { class: "tw:m-0 tw:truncate tw:text-sm tw:font-bold" }, td = { class: "tw:m-0 tw:mt-1 tw:text-xs tw:opacity-65" }, nd = { class: "tw:flex tw:flex-col tw:gap-1 tw:text-xs" }, rd = { class: "tw:opacity-70" }, id = ["disabled"], ad = ["value"], od = ["disabled"], sd = { class: "tw:flex tw:flex-wrap tw:gap-2" }, cd = ["disabled"], ld = ["disabled"], ud = { class: "tw:border-t tw:border-base-300 tw:pt-3" }, dd = { class: "tw:m-0 tw:text-xs tw:font-bold" }, fd = {
	key: 0,
	class: "tw:m-0 tw:mt-2 tw:text-xs tw:opacity-65"
}, pd = {
	key: 1,
	class: "tw:m-0 tw:mt-2 tw:space-y-1 tw:pl-5 tw:text-xs"
}, md = { class: "tw:m-0 tw:text-sm tw:opacity-70" }, hd = ["disabled"], gd = /* @__PURE__ */ Ti({
	__name: "ActorReviewPanel",
	props: { text: { type: Function } },
	setup(e) {
		let t = Wu();
		return (n, r) => (q(), J("section", Ku, [Y("div", qu, [Y("header", Ju, [Y("h2", Yu, [r[6] ||= Y("i", {
			class: "fa-solid fa-user-gear",
			"aria-hidden": "true"
		}, null, -1), Z(" " + M(e.text("actorPreview")), 1)]), B(t).testActor ? (q(), J("span", Xu, M(B(t).testActor.criticalCount) + " " + M(e.text("criticals")), 1)) : wo("", !0)]), B(t).testActor ? (q(), J(G, { key: 0 }, [
			Y("button", {
				type: "button",
				class: "tw:flex tw:aspect-4/3 tw:w-full tw:shrink-0 tw:items-center tw:justify-center tw:overflow-hidden tw:rounded-box tw:border tw:border-base-300 tw:bg-base-200 tw:p-2",
				"aria-label": e.text("openActor"),
				disabled: B(t).isActing,
				onClick: r[0] ||= (...e) => B(t).openTestActor && B(t).openTestActor(...e)
			}, [Y("img", {
				src: B(t).testActor.img,
				alt: "",
				class: "tw:h-full tw:w-full tw:object-contain"
			}, null, 8, Qu)], 8, Zu),
			Y("div", $u, [Y("h3", ed, M(B(t).testActor.name), 1), Y("p", td, M(B(t).testActor.criticalCount ? e.text("actorInjured") : e.text("actorReady")), 1)]),
			Y("label", nd, [Y("span", rd, M(e.text("testLocation")), 1), li(Y("select", {
				"onUpdate:modelValue": r[1] ||= (e) => B(t).selectedActorLocation = e,
				class: "tw:dui-select tw:dui-select-sm tw:w-full",
				disabled: B(t).locationOptions.length === 1
			}, [(q(!0), J(G, null, H(B(t).locationOptions, (e) => (q(), J("option", {
				key: e.value,
				value: e.value
			}, M(e.label), 9, ad))), 128))], 8, id), [[Ws, B(t).selectedActorLocation]])]),
			Y("button", {
				class: "tw:dui-btn tw:dui-btn-primary tw:dui-btn-sm tw:w-full",
				type: "button",
				disabled: B(t).isActing || !B(t).selectedDetail,
				onClick: r[2] ||= (...e) => B(t).applyCritical && B(t).applyCritical(...e)
			}, [r[7] ||= Y("i", {
				class: "fa-solid fa-burst",
				"aria-hidden": "true"
			}, null, -1), Z(" " + M(e.text("applyCurrentCritical")), 1)], 8, od),
			Y("div", sd, [Y("button", {
				class: "tw:dui-btn tw:dui-btn-sm",
				type: "button",
				disabled: B(t).isActing,
				onClick: r[3] ||= (...e) => B(t).openTestActor && B(t).openTestActor(...e)
			}, [r[8] ||= Y("i", {
				class: "fa-solid fa-arrow-up-right-from-square",
				"aria-hidden": "true"
			}, null, -1), Z(" " + M(e.text("openActor")), 1)], 8, cd), Y("button", {
				class: "tw:dui-btn tw:dui-btn-sm",
				type: "button",
				disabled: B(t).isActing,
				onClick: r[4] ||= (...e) => B(t).resetTestActor && B(t).resetTestActor(...e)
			}, [r[9] ||= Y("i", {
				class: "fa-solid fa-rotate-left",
				"aria-hidden": "true"
			}, null, -1), Z(" " + M(e.text("resetActor")), 1)], 8, ld)]),
			Y("div", ud, [Y("h3", dd, M(e.text("appliedCriticals")), 1), B(t).testActor.criticalNames.length ? (q(), J("ul", pd, [(q(!0), J(G, null, H(B(t).testActor.criticalNames, (e, t) => (q(), J("li", { key: `${e}:${t}` }, M(e), 1))), 128))])) : (q(), J("p", fd, M(e.text("noAppliedCriticals")), 1))])
		], 64)) : (q(), J(G, { key: 1 }, [
			r[11] ||= Y("div", { class: "tw:flex tw:aspect-4/3 tw:w-full tw:shrink-0 tw:items-center tw:justify-center tw:rounded-box tw:border tw:border-dashed tw:border-base-300 tw:bg-base-200" }, [Y("i", {
				class: "fa-solid fa-user-plus tw:text-4xl tw:opacity-35",
				"aria-hidden": "true"
			})], -1),
			Y("p", md, M(e.text("actorMissing")), 1),
			Y("button", {
				class: "tw:dui-btn tw:dui-btn-primary tw:dui-btn-sm tw:w-full",
				type: "button",
				disabled: B(t).isActing,
				onClick: r[5] ||= (...e) => B(t).createTestActor && B(t).createTestActor(...e)
			}, [r[10] ||= Y("i", {
				class: "fa-solid fa-user-plus",
				"aria-hidden": "true"
			}, null, -1), Z(" " + M(e.text("createActor")), 1)], 8, hd)
		], 64))])]));
	}
}), _d = { class: "ech-review-directory-pane tw:flex tw:min-h-0 tw:min-w-0 tw:flex-col tw:overflow-hidden tw:rounded-box tw:border tw:border-base-300 tw:bg-base-200" }, vd = { class: "tw:shrink-0 tw:border-b tw:border-base-300 tw:p-3" }, yd = { class: "tw:m-0 tw:flex tw:items-center tw:gap-2 tw:text-sm tw:font-bold" }, bd = { class: "tw:m-0 tw:mt-1 tw:text-xs tw:opacity-65" }, xd = ["aria-label"], Sd = { class: "tw:dui-menu tw:dui-menu-xs tw:w-full tw:p-0" }, Cd = ["open"], wd = { class: "tw:font-semibold" }, Td = { class: "tw:min-w-0 tw:flex-1 tw:truncate" }, Ed = ["onClick"], Dd = { class: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-left" }, Od = { class: "tw:dui-badge tw:dui-badge-sm" }, kd = { class: "ech-review-names-pane tw:flex tw:min-h-0 tw:min-w-0 tw:flex-col tw:overflow-hidden tw:rounded-box tw:border tw:border-base-300 tw:bg-base-200" }, Ad = { class: "tw:shrink-0 tw:border-b tw:border-base-300 tw:p-3" }, jd = { class: "tw:m-0 tw:truncate tw:text-sm tw:font-bold" }, Md = { class: "tw:m-0 tw:mt-1 tw:truncate tw:text-xs tw:opacity-65" }, Nd = { class: "tw:dui-input tw:dui-input-sm tw:mt-3 tw:flex tw:w-full tw:items-center tw:gap-2" }, Pd = ["value", "placeholder"], Fd = ["aria-label"], Id = {
	key: 0,
	class: "tw:p-3 tw:text-sm tw:opacity-70"
}, Ld = {
	key: 1,
	class: "tw:dui-menu tw:dui-menu-xs tw:w-full tw:p-0"
}, Rd = ["onClick"], zd = { class: "tw:w-5 tw:shrink-0 tw:text-right tw:font-mono tw:opacity-60" }, Bd = { class: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-left" }, Vd = /* @__PURE__ */ Ti({
	__name: "CriticalDirectory",
	props: {
		categories: {},
		query: {},
		selectedId: {},
		text: { type: Function },
		totalCount: {}
	},
	emits: ["query", "select"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = /* @__PURE__ */ z(""), a = Xo(() => n.categories.flatMap((e) => e.locations.map((t) => ({
			categoryLabel: e.label,
			entries: t.entries,
			id: `${e.key}:${t.key}`,
			label: t.label
		})))), o = Xo(() => a.value.find((e) => e.id === i.value) ?? a.value[0]), s = Xo(() => {
			let e = n.query.trim().toLocaleLowerCase(), t = o.value?.entries ?? [];
			return e ? t.filter((t) => t.name.toLocaleLowerCase().includes(e)) : t;
		});
		_i([() => n.selectedId, a], ([e, t]) => {
			let n = t.find((t) => t.entries.some((t) => t.id === e));
			n ? i.value = n.id : t.some((e) => e.id === i.value) || (i.value = t[0]?.id ?? "");
		}, { immediate: !0 });
		function c(e) {
			return e === "complete" ? "tw:bg-success" : e === "partial" ? "tw:bg-warning" : "tw:bg-base-content/25";
		}
		function l(e) {
			return e.locations.some((t) => `${e.key}:${t.key}` === i.value);
		}
		return (t, n) => (q(), J(G, null, [Y("aside", _d, [Y("header", vd, [Y("h2", yd, [n[1] ||= Y("i", {
			class: "fa-solid fa-folder-tree",
			"aria-hidden": "true"
		}, null, -1), Z(" " + M(e.text("directory")), 1)]), Y("p", bd, M(e.totalCount) + " " + M(e.text("compiledCriticals")), 1)]), Y("nav", {
			class: "tw:min-h-0 tw:flex-1 tw:overflow-y-auto tw:p-2",
			"aria-label": e.text("directory")
		}, [Y("ul", Sd, [(q(!0), J(G, null, H(e.categories, (e) => (q(), J("li", { key: e.key }, [Y("details", { open: l(e) }, [Y("summary", wd, [n[2] ||= Y("i", {
			class: "fa-solid fa-folder",
			"aria-hidden": "true"
		}, null, -1), Y("span", Td, M(e.label), 1)]), Y("ul", null, [(q(!0), J(G, null, H(e.locations, (t) => (q(), J("li", { key: t.key }, [Y("button", {
			type: "button",
			class: Kt(`${e.key}:${t.key}` === i.value ? "tw:dui-menu-active" : ""),
			onClick: (n) => i.value = `${e.key}:${t.key}`
		}, [
			n[3] ||= Y("i", {
				class: "fa-regular fa-file-lines",
				"aria-hidden": "true"
			}, null, -1),
			Y("span", Dd, M(t.label), 1),
			Y("span", Od, M(t.entries.length), 1)
		], 10, Ed)]))), 128))])], 8, Cd)]))), 128))])], 8, xd)]), Y("aside", kd, [Y("header", Ad, [
			Y("h2", jd, M(o.value?.categoryLabel ?? e.text("criticalNames")), 1),
			Y("p", Md, M(o.value?.label ?? e.text("criticalNames")) + " · " + M(o.value?.entries.length ?? 0), 1),
			Y("label", Nd, [n[4] ||= Y("i", {
				class: "fa-solid fa-magnifying-glass tw:opacity-60",
				"aria-hidden": "true"
			}, null, -1), Y("input", {
				value: e.query,
				type: "search",
				class: "tw:min-w-0 tw:grow",
				placeholder: e.text("findCritical"),
				onInput: n[0] ||= (e) => r("query", e.target.value)
			}, null, 40, Pd)])
		]), Y("nav", {
			class: "tw:min-h-0 tw:flex-1 tw:overflow-y-auto tw:p-2",
			"aria-label": e.text("criticalNames")
		}, [s.value.length ? (q(), J("ul", Ld, [(q(!0), J(G, null, H(s.value, (t) => (q(), J("li", { key: t.id }, [Y("button", {
			type: "button",
			class: Kt(t.id === e.selectedId ? "tw:dui-menu-active" : ""),
			onClick: (e) => r("select", t.id)
		}, [
			Y("span", zd, M(t.row + 1), 1),
			Y("span", {
				class: Kt(["tw:h-2 tw:w-2 tw:shrink-0 tw:rounded-full", c(t.automationStatus)]),
				"aria-hidden": "true"
			}, null, 2),
			Y("span", Bd, M(t.name), 1)
		], 10, Rd)]))), 128))])) : (q(), J("p", Id, M(e.text("noMatches")), 1))], 8, Fd)])], 64));
	}
}), Hd = { class: "tw:dui-card tw:dui-card-border tw:min-h-0 tw:overflow-hidden tw:bg-base-100" }, Ud = { class: "tw:dui-card-body tw:min-h-0 tw:gap-3 tw:p-3" }, Wd = { class: "tw:flex tw:shrink-0 tw:items-center tw:justify-between tw:gap-2" }, Gd = { class: "tw:dui-card-title tw:m-0 tw:text-base" }, Kd = { class: "tw:text-xs tw:opacity-60" }, qd = [
	"disabled",
	"placeholder",
	"value"
], Jd = { class: "tw:flex tw:shrink-0 tw:flex-wrap tw:gap-2" }, Yd = ["disabled"], Xd = ["disabled"], Zd = /* @__PURE__ */ Ti({
	__name: "NotesPanel",
	props: { text: { type: Function } },
	setup(e) {
		let t = Wu();
		return (n, r) => (q(), J("section", Hd, [Y("div", Ud, [
			Y("header", Wd, [Y("h2", Gd, [r[5] ||= Y("i", {
				class: "fa-solid fa-note-sticky",
				"aria-hidden": "true"
			}, null, -1), Z(" " + M(e.text("notes")), 1)]), Y("span", Kd, M(e.text(`noteState.${B(t).noteSaveState}`)), 1)]),
			Y("textarea", {
				class: "tw:dui-textarea tw:min-h-28 tw:min-w-0 tw:flex-1 tw:resize-none tw:font-sans",
				disabled: B(t).isClearingNotes,
				placeholder: e.text("notesPlaceholder"),
				value: B(t).currentNote,
				onInput: r[0] ||= (e) => B(t).setCurrentNote(e.target.value)
			}, null, 40, qd),
			Y("div", Jd, [
				Y("button", {
					class: "tw:dui-btn tw:dui-btn-sm",
					type: "button",
					onClick: r[1] ||= (...e) => B(t).copyNote && B(t).copyNote(...e)
				}, [r[6] ||= Y("i", {
					class: "fa-regular fa-copy",
					"aria-hidden": "true"
				}, null, -1), Z(" " + M(e.text("copyNote")), 1)]),
				Y("button", {
					class: "tw:dui-btn tw:dui-btn-sm",
					type: "button",
					onClick: r[2] ||= (...e) => B(t).copyCurrentReview && B(t).copyCurrentReview(...e)
				}, [r[7] ||= Y("i", {
					class: "fa-solid fa-file-arrow-down",
					"aria-hidden": "true"
				}, null, -1), Z(" " + M(e.text("copyCurrentReview")), 1)]),
				Y("button", {
					class: "tw:dui-btn tw:dui-btn-sm",
					type: "button",
					disabled: B(t).isCopyingPacket,
					onClick: r[3] ||= (...e) => B(t).copyReviewPacket && B(t).copyReviewPacket(...e)
				}, [r[8] ||= Y("i", {
					class: "fa-solid fa-clipboard-list",
					"aria-hidden": "true"
				}, null, -1), Z(" " + M(e.text(B(t).isCopyingPacket ? "copyingPacket" : "copyPacket")), 1)], 8, Yd),
				Y("button", {
					class: "tw:dui-btn tw:dui-btn-error tw:dui-btn-outline tw:dui-btn-sm",
					type: "button",
					disabled: B(t).noteCount === 0 || B(t).isClearingNotes,
					onClick: r[4] ||= (...e) => B(t).clearAllNotes && B(t).clearAllNotes(...e)
				}, [r[9] ||= Y("i", {
					class: "fa-solid fa-trash-can",
					"aria-hidden": "true"
				}, null, -1), Z(" " + M(e.text(B(t).isClearingNotes ? "clearingAllNotes" : "clearAllNotes")), 1)], 8, Xd)
			])
		])]));
	}
}), Qd = { class: "ech-review-code tw:overflow-auto tw:rounded-box tw:bg-base-300 tw:p-3 tw:text-xs" }, $d = /* @__PURE__ */ Ti({
	__name: "CodeBlock",
	props: { code: {} },
	setup(e) {
		let t = e, n = Xo(() => Fu(t.code));
		return (e, t) => (q(), J("pre", Qd, [Y("code", null, [(q(!0), J(G, null, H(n.value, (e, t) => (q(), J("span", {
			key: t,
			class: Kt(`ech-code-token--${e.kind}`)
		}, M(e.value), 3))), 128))])]));
	}
}), ef = {
	key: 0,
	class: "ech-review-center tw:min-h-0 tw:min-w-0 tw:gap-2"
}, tf = { class: "tw:dui-card tw:dui-card-border tw:min-h-0 tw:min-w-0 tw:overflow-hidden tw:bg-base-100" }, nf = { class: "tw:dui-card-body tw:min-h-0 tw:gap-0 tw:overflow-hidden tw:p-0" }, rf = { class: "tw:flex tw:shrink-0 tw:flex-wrap tw:items-center tw:justify-between tw:gap-2 tw:border-b tw:border-base-300 tw:px-4 tw:py-3" }, af = { class: "tw:dui-card-title tw:m-0 tw:text-base" }, of = { class: "tw:flex tw:flex-wrap tw:gap-1" }, sf = { class: "tw:dui-badge tw:dui-badge-sm" }, cf = { class: "tw:dui-badge tw:dui-badge-sm" }, lf = { class: "tw:dui-badge tw:dui-badge-sm" }, uf = { class: "tw:dui-badge tw:dui-badge-sm" }, df = { class: "tw:dui-badge tw:dui-badge-sm" }, ff = { class: "ech-review-narrative tw:min-h-0 tw:flex-1 tw:overflow-y-auto" }, pf = { class: "tw:min-w-0 tw:p-4" }, mf = { class: "tw:m-0 tw:mb-3 tw:text-sm tw:font-bold" }, hf = ["innerHTML"], gf = { class: "ech-review-journal tw:min-w-0 tw:border-base-300 tw:p-4" }, _f = { class: "tw:m-0 tw:mb-1 tw:text-sm tw:font-bold" }, vf = {
	key: 0,
	class: "tw:m-0 tw:mb-3 tw:text-xs tw:opacity-60"
}, yf = ["innerHTML"], bf = {
	key: 2,
	class: "tw:opacity-70"
}, xf = { class: "tw:dui-card tw:dui-card-border tw:min-h-0 tw:min-w-0 tw:overflow-hidden tw:bg-base-100" }, Sf = { class: "tw:dui-card-body tw:min-h-0 tw:gap-3 tw:overflow-y-auto tw:p-4" }, Cf = { class: "tw:flex tw:shrink-0 tw:flex-wrap tw:items-center tw:justify-between tw:gap-2" }, wf = { class: "tw:dui-card-title tw:m-0 tw:text-base" }, Tf = { class: "tw:dui-badge tw:dui-badge-sm" }, Ef = {
	key: 0,
	class: "tw:m-0 tw:shrink-0 tw:space-y-1 tw:pl-5 tw:text-sm"
}, Df = {
	key: 1,
	class: "tw:m-0 tw:opacity-70"
}, Of = { class: "tw:mb-2 tw:flex tw:flex-wrap tw:items-center tw:gap-2" }, kf = { class: "tw:m-0 tw:text-sm tw:font-bold" }, Af = { class: "tw:dui-badge tw:dui-badge-sm" }, jf = { class: "tw:text-xs tw:opacity-60" }, Mf = {
	key: 0,
	class: "tw:mb-3 tw:flex tw:flex-col tw:gap-1 tw:text-xs"
}, Nf = {
	key: 1,
	class: "tw:m-0 tw:text-sm tw:opacity-70"
}, Pf = { class: "tw:mb-1 tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs" }, Ff = { class: "tw:dui-badge tw:dui-badge-sm" }, If = { class: "tw:font-mono tw:opacity-50" }, Lf = /* @__PURE__ */ Ti({
	__name: "ReviewContent",
	props: { text: { type: Function } },
	setup(e) {
		let t = Wu();
		return (n, r) => B(t).selectedDetail ? (q(), J("div", ef, [Y("section", tf, [Y("div", nf, [Y("header", rf, [Y("h2", af, [r[0] ||= Y("i", {
			class: "fa-solid fa-scroll",
			"aria-hidden": "true"
		}, null, -1), Z(" " + M(e.text("criticalItem")), 1)]), Y("div", of, [
			Y("span", sf, M(B(t).selectedDetail.categoryLabel), 1),
			Y("span", cf, M(B(t).selectedDetail.locationLabel), 1),
			Y("span", lf, M(e.text("row")) + " " + M(B(t).selectedDetail.row + 1), 1),
			Y("span", uf, M(e.text("wounds")) + " " + M(B(t).selectedDetail.wounds), 1),
			Y("span", df, M(B(t).selectedDetail.automationStatus), 1)
		])]), Y("div", ff, [Y("article", pf, [Y("h3", mf, [r[1] ||= Y("i", {
			class: "fa-solid fa-file-lines",
			"aria-hidden": "true"
		}, null, -1), Z(" " + M(e.text("itemText")), 1)]), Y("div", {
			class: "ech-review-rich-text",
			innerHTML: B(t).selectedDetail.itemHtml
		}, null, 8, hf)]), Y("article", gf, [
			Y("h3", _f, [r[2] ||= Y("i", {
				class: "fa-solid fa-book-open",
				"aria-hidden": "true"
			}, null, -1), Z(" " + M(e.text("journalText")), 1)]),
			B(t).selectedDetail.journalName ? (q(), J("p", vf, M(B(t).selectedDetail.journalName), 1)) : wo("", !0),
			B(t).selectedDetail.journalHtml ? (q(), J("div", {
				key: 1,
				class: "ech-review-rich-text",
				innerHTML: B(t).selectedDetail.journalHtml
			}, null, 8, yf)) : (q(), J("p", bf, M(e.text("journalMissing")), 1))
		])])])]), Y("section", xf, [Y("div", Sf, [
			Y("header", Cf, [Y("h2", wf, [r[3] ||= Y("i", {
				class: "fa-solid fa-code",
				"aria-hidden": "true"
			}, null, -1), Z(" " + M(e.text("automation")), 1)]), Y("span", Tf, M(B(t).selectedDetail.automationEffects.length) + " " + M(e.text("effects")), 1)]),
			B(t).selectedDetail.automationSummary.length ? (q(), J("ul", Ef, [(q(!0), J(G, null, H(B(t).selectedDetail.automationSummary, (e) => (q(), J("li", { key: e }, M(e), 1))), 128))])) : wo("", !0),
			B(t).selectedDetail.automationEffects.length ? (q(!0), J(G, { key: 2 }, H(B(t).selectedDetail.automationEffects, (t) => (q(), J("article", {
				key: t.id,
				class: "tw:rounded-box tw:border tw:border-base-300 tw:bg-base-200 tw:p-3"
			}, [
				Y("header", Of, [
					Y("h3", kf, M(t.name), 1),
					Y("span", Af, M(t.phase), 1),
					Y("span", jf, M(t.scripts.length) + " " + M(e.text("scripts")) + " · " + M(t.changes.length) + " " + M(e.text("changes")), 1)
				]),
				t.changes.length ? (q(), J("div", Mf, [(q(!0), J(G, null, H(t.changes, (e, t) => (q(), J("code", {
					key: t,
					class: "tw:rounded-sm tw:bg-base-300 tw:p-2"
				}, M(e.key) + " = " + M(e.value) + " (mode " + M(e.mode) + ", priority " + M(e.priority) + ") ", 1))), 128))])) : wo("", !0),
				t.scripts.length ? wo("", !0) : (q(), J("p", Nf, M(e.text("effectWithoutScripts")), 1)),
				(q(!0), J(G, null, H(t.scripts, (e) => (q(), J("section", {
					key: e.path,
					class: "tw:mt-3 tw:min-w-0"
				}, [Y("div", Pf, [
					Y("strong", null, M(e.label), 1),
					Y("span", Ff, M(e.trigger), 1),
					Y("span", If, M(e.path), 1)
				]), X($d, { code: e.code }, null, 8, ["code"])]))), 128))
			]))), 128)) : (q(), J("p", Df, M(e.text("noAutomation")), 1))
		])])])) : wo("", !0);
	}
}), Rf = { class: "ech-review-console tw:relative tw:flex tw:h-full tw:min-h-0 tw:flex-col tw:overflow-hidden tw:bg-base-100 tw:text-base-content" }, zf = { class: "tw:flex tw:min-h-12 tw:shrink-0 tw:items-center tw:justify-between tw:gap-3 tw:border-b tw:border-base-300 tw:bg-base-200 tw:px-4 tw:py-2" }, Bf = { class: "tw:min-w-0" }, Vf = { class: "tw:m-0 tw:truncate tw:text-base tw:font-bold" }, Hf = {
	key: 0,
	class: "tw:m-0 tw:truncate tw:text-xs tw:opacity-65"
}, Uf = { class: "tw:min-w-0 tw:text-right tw:text-xs" }, Wf = {
	key: 0,
	role: "alert",
	class: "tw:text-error"
}, Gf = {
	key: 1,
	role: "status",
	class: "tw:opacity-75"
}, Kf = { class: "ech-review-workspace tw:relative tw:min-h-0 tw:flex-1 tw:gap-2 tw:p-2" }, qf = { class: "ech-review-side-column tw:min-h-0 tw:min-w-0 tw:gap-2" }, Jf = {
	key: 0,
	class: "tw:absolute tw:inset-2 tw:z-30 tw:flex tw:items-center tw:justify-center tw:gap-2 tw:rounded-box tw:bg-base-100/90 tw:opacity-90"
}, Yf = ["aria-label", "disabled"], Xf = ["aria-label", "disabled"], Zf = /* @__PURE__ */ Ti({
	__name: "CriticalReviewApp",
	props: {
		localize: { type: Function },
		applyCritical: { type: Function },
		confirmClearNotes: { type: Function },
		copyText: { type: Function },
		createTestActor: { type: Function },
		getTestActor: { type: Function },
		loadDetail: { type: Function },
		loadIndex: { type: Function },
		loadNotes: { type: Function },
		openTestActor: { type: Function },
		resetTestActor: { type: Function },
		saveNotes: { type: Function }
	},
	setup(e) {
		let t = e, n = Wu();
		n.initialize(t), Ui(() => void n.flushNotes());
		function r(e) {
			return t.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.criticalReview.${e}`);
		}
		return (e, t) => (q(), J("div", Rf, [
			Y("header", zf, [Y("div", Bf, [Y("h1", Vf, M(B(n).selectedDetail?.name ?? r("title")), 1), B(n).entries.length ? (q(), J("p", Hf, [Z(M(Math.max(0, B(n).selectedIndex + 1)) + " / " + M(B(n).entries.length) + " ", 1), B(n).selectedDetail ? (q(), J(G, { key: 0 }, [Z(" · " + M(B(n).selectedDetail.categoryLabel) + " / " + M(B(n).selectedDetail.locationLabel), 1)], 64)) : wo("", !0)])) : wo("", !0)]), Y("div", Uf, [B(n).errorMessage ? (q(), J("span", Wf, [t[3] ||= Y("i", {
				class: "fa-solid fa-triangle-exclamation",
				"aria-hidden": "true"
			}, null, -1), Z(" " + M(B(n).errorMessage), 1)])) : B(n).statusMessage ? (q(), J("span", Gf, [t[4] ||= Y("i", {
				class: "fa-solid fa-circle-check",
				"aria-hidden": "true"
			}, null, -1), Z(" " + M(B(n).statusMessage), 1)])) : wo("", !0)])]),
			Y("main", Kf, [
				X(Vd, {
					categories: B(n).directory,
					query: B(n).query,
					"selected-id": B(n).selectedId,
					text: r,
					"total-count": B(n).entries.length,
					onQuery: t[0] ||= (e) => B(n).query = e,
					onSelect: B(n).selectEntry
				}, null, 8, [
					"categories",
					"query",
					"selected-id",
					"total-count",
					"onSelect"
				]),
				X(Lf, { text: r }),
				Y("aside", qf, [X(gd, { text: r }), X(Zd, { text: r })]),
				B(n).isLoadingCatalog || B(n).isLoadingDetail ? (q(), J("div", Jf, [t[5] ||= Y("i", {
					class: "fa-solid fa-spinner fa-spin",
					"aria-hidden": "true"
				}, null, -1), Z(" " + M(r(B(n).isLoadingCatalog ? "loadingCatalog" : "loadingCritical")), 1)])) : wo("", !0)
			]),
			Y("button", {
				class: "ech-review-edge-nav ech-review-edge-nav--previous tw:dui-btn tw:dui-btn-circle tw:dui-btn-sm",
				type: "button",
				"aria-label": r("previous"),
				disabled: !B(n).canGoPrevious || B(n).isLoadingDetail,
				onClick: t[1] ||= (...e) => B(n).goPrevious && B(n).goPrevious(...e)
			}, [...t[6] ||= [Y("i", {
				class: "fa-solid fa-chevron-left",
				"aria-hidden": "true"
			}, null, -1)]], 8, Yf),
			Y("button", {
				class: "ech-review-edge-nav ech-review-edge-nav--next tw:dui-btn tw:dui-btn-circle tw:dui-btn-sm",
				type: "button",
				"aria-label": r("next"),
				disabled: !B(n).canGoNext || B(n).isLoadingDetail,
				onClick: t[2] ||= (...e) => B(n).goNext && B(n).goNext(...e)
			}, [...t[7] ||= [Y("i", {
				class: "fa-solid fa-chevron-right",
				"aria-hidden": "true"
			}, null, -1)]], 8, Xf)
		]));
	}
}), Qf = "expanded-critical-details", $f = {
	arm: "Arm",
	body: "Body",
	head: "Head",
	leg: "Leg"
}, ep = [
	`flags.${e}.automationStatus`,
	`flags.${e}.category`,
	`flags.${e}.location`,
	`flags.${e}.row`,
	"system.wounds.value",
	"sort"
];
async function tp() {
	let e = up(u), t = await e.getIndex?.({ fields: ep });
	return (t ? Array.from(t) : await e.getDocuments()).flatMap((e) => op(e));
}
async function np(e) {
	let t = (await rp(e)).toObject?.() ?? {}, n = pp(t, "flags", "wfrp4e-expanded-critical-hits") ?? {}, r = op(t)[0];
	if (!r) throw Error(`Critical ${e} does not have valid review metadata.`);
	let i = mp(t, "system", "description", "value"), a = await ip(i, e);
	return {
		...r,
		automationEffects: yu(t.effects),
		automationSummary: hp(n.automationSummary),
		itemHtml: await sp(i),
		journalHtml: await sp(a.html),
		journalName: a.name
	};
}
async function rp(e) {
	let t = await up(u).getDocument?.(e);
	if (!t?.toObject) throw Error(`Critical Item ${e} was not found.`);
	return t;
}
async function ip(e, t) {
	let n = e.match(/JournalEntry\.([A-Za-z0-9]+)\.JournalEntryPage\.([A-Za-z0-9]+)/);
	if (!n?.[1]) return ap(t);
	let r = cp(await up(Qf).getDocument?.(n[1]), n[2] ?? t);
	return r ? {
		html: mp(r, "text", "content"),
		name: mp(r, "name")
	} : {
		html: "",
		name: ""
	};
}
async function ap(t) {
	let n = await up(Qf).getDocuments();
	for (let r of n) {
		let n = lp(r).find((n) => pp(n, "flags", e)?.criticalItemId === t);
		if (n) return {
			html: mp(n, "text", "content"),
			name: mp(n, "name")
		};
	}
	return {
		html: "",
		name: ""
	};
}
function op(t) {
	let n = vp(t), r = pp(n, "flags", e), i = r?.category, a = r?.location, o = mp(n, "_id") || mp(n, "id"), s = mp(n, "name");
	return !o || !s || !dp(i) || !fp(a) ? [] : [{
		automationStatus: gp(r?.automationStatus, "none"),
		category: i,
		categoryLabel: te[i],
		id: o,
		location: a,
		locationLabel: $f[a],
		name: s,
		row: _p(r?.row),
		sort: _p(n?.sort),
		wounds: mp(n, "system", "wounds", "value")
	}];
}
async function sp(e) {
	return e ? foundry.applications.ux.TextEditor.implementation.enrichHTML(e, { secrets: !0 }) : "";
}
function cp(e, t) {
	return lp(e).find((e) => mp(e, "id") === t || mp(e, "_id") === t);
}
function lp(e) {
	let t = vp(e)?.pages;
	if (!t || !(Symbol.iterator in Object(t))) return [];
	let n = [];
	for (let e of t) {
		let t = vp(e);
		t && n.push(t);
	}
	return n;
}
function up(t) {
	let n = game.packs.get(`${e}.${t}`);
	if (!n) throw Error(`Required compendium ${t} is not available.`);
	return n;
}
function dp(e) {
	return y.includes(e);
}
function fp(e) {
	return v.includes(e);
}
function pp(e, ...t) {
	let n = vp(e);
	for (let e of t) n = vp(n?.[e]);
	return n;
}
function mp(e, ...t) {
	let n = e;
	for (let e of t) n = vp(n)?.[e];
	return typeof n == "string" ? n : "";
}
function hp(e) {
	return Array.isArray(e) ? e.filter((e) => typeof e == "string") : [];
}
function gp(e, t) {
	return typeof e == "string" ? e : t;
}
function _p(e) {
	return typeof e == "number" ? e : 0;
}
function vp(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/critical-review/actor.ts
var yp = "criticalReviewTestActor", bp = "Expanded Critical Review — Test Subject";
async function xp() {
	let t = Ep();
	if (t) return Op(t);
	let n = await Actor.implementation?.create({
		flags: { [e]: { [yp]: !0 } },
		img: "icons/svg/mystery-man.svg",
		name: bp,
		system: {
			characteristics: kp(),
			status: { wounds: {
				max: 14,
				value: 14
			} }
		},
		type: "character"
	});
	if (!n) throw Error("Foundry could not create the Critical review test Actor.");
	return await game.settings.set(e, r, n.id), Op(n);
}
async function Sp() {
	let t = Ep();
	return t && await t.delete(), await game.settings.set(e, r, ""), xp();
}
function Cp() {
	let e = Ep();
	return e ? Op(e) : void 0;
}
async function wp(e, t) {
	let n = Ep();
	if (!n) throw Error("Create the Critical review test Actor first.");
	let r = (await rp(e)).toObject?.();
	if (!r) throw Error(`Critical Item ${e} could not be copied.`);
	delete r._id, delete r._key, delete r.folder, delete r.sort;
	let i = Ap(Ap(r, "system"), "location");
	return i.key = t, i.value = game.wfrp4e?.config?.locations?.[t] ?? t, await n.createEmbeddedDocuments("Item", [r]), Op(n);
}
function Tp() {
	let e = Ep();
	if (!e) throw Error("The Critical review test Actor is unavailable.");
	e.sheet?.render(!0);
}
function Ep() {
	let t = game.settings.get(e, r), n = typeof t == "string" ? game.actors.get(t) : void 0;
	if (Dp(n)) return n;
	let i = game.actors.find((e) => Dp(e));
	return Dp(i) ? i : void 0;
}
function Dp(t) {
	return t?.getFlag(e, yp) === !0;
}
function Op(e) {
	let t = e.itemTypes?.critical, n = Array.isArray(t) ? t.flatMap((e) => e.name ? [e.name] : []) : [];
	return {
		criticalCount: n.length,
		criticalNames: n,
		id: e.id,
		img: e.img || "icons/svg/mystery-man.svg",
		name: e.name,
		uuid: e.uuid
	};
}
function kp() {
	return Object.fromEntries([
		"ws",
		"bs",
		"s",
		"t",
		"i",
		"ag",
		"dex",
		"int",
		"wp",
		"fel"
	].map((e) => [e, { initial: 35 }]));
}
function Ap(e, t) {
	let n = e[t];
	if (typeof n == "object" && n) return n;
	let r = {};
	return e[t] = r, r;
}
//#endregion
//#region src/module/wfrp4e/critical-review/notes.ts
function jp() {
	return Np(game.settings.get(e, i));
}
async function Mp(t) {
	await game.settings.set(e, i, Np(t));
}
function Np(e) {
	return typeof e != "object" || !e ? {} : Object.fromEntries(Object.entries(e).filter((e) => typeof e[1] == "string"));
}
//#endregion
//#region src/module/apps/critical-review/CriticalReviewApplication.ts
var Pp = class extends ml {
	static DEFAULT_OPTIONS = {
		id: `${e}-critical-review-console`,
		position: {
			height: 900,
			width: 1600
		},
		tag: "section",
		window: {
			icon: "fa-solid fa-microscope",
			resizable: !0,
			title: "WFRP4E_EXPANDED_CRITICAL_HITS.criticalReview.title"
		}
	};
	getVueComponent() {
		return Zf;
	}
	getVueProps() {
		return {
			applyCritical: (e, t) => wp(e, t),
			confirmClearNotes: Fp,
			copyText: Ip,
			createTestActor: xp,
			getTestActor: Cp,
			loadDetail: np,
			loadIndex: tp,
			loadNotes: jp,
			localize: (e) => game.i18n.localize(e),
			openTestActor: Tp,
			resetTestActor: Sp,
			saveNotes: Mp
		};
	}
};
async function Fp(e) {
	let t = document.createElement("div"), n = document.createElement("p"), r = e === 1 ? "clearAllNotesConfirmationOne" : "clearAllNotesConfirmationMany";
	return n.textContent = game.i18n.format(`WFRP4E_EXPANDED_CRITICAL_HITS.criticalReview.${r}`, { count: e }), t.append(n), await foundry.applications.api.DialogV2.wait({
		buttons: [{
			action: "clear",
			callback: () => !0,
			class: "btn btn-error",
			icon: "fa-solid fa-trash-can",
			label: game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.criticalReview.clearAllNotes")
		}, {
			action: "cancel",
			callback: () => !1,
			class: "btn",
			default: !0,
			label: game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.criticalReview.cancel"),
			type: "button"
		}],
		content: t,
		modal: !0,
		position: { width: 420 },
		window: { title: game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.criticalReview.clearAllNotesTitle") }
	}) === !0;
}
async function Ip(e) {
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(e);
		return;
	}
	let t = document.createElement("textarea");
	t.value = e, t.style.position = "fixed", t.style.opacity = "0", document.body.append(t), t.select();
	let n = document.execCommand("copy");
	if (t.remove(), !n) throw Error("The browser did not allow clipboard access.");
}
//#endregion
//#region src/module/apps/critical-review/register.ts
function Lp() {
	game.settings.registerMenu(e, "criticalReviewConsole", {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.criticalReview.settingsName",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.criticalReview.settingsHint",
		icon: "fa-solid fa-microscope",
		label: "WFRP4E_EXPANDED_CRITICAL_HITS.criticalReview.settingsLabel",
		restricted: !0,
		type: Pp
	});
}
//#endregion
//#region src/functions/critical-hits/presentation/index.ts
var Rp = /^ech-crit-(?:core|upinarms)-(?:arrowsbolts|bullets|cold|crushing|cutting|flameenergy|piercing|shrapnelshot|sling|teethclaws|unarmed)-(?:arm|body|head|leg)$/;
function zp(e) {
	return Rp.test(e);
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/debug.ts
function Bp(e) {
	return {
		criticalLocation: e.criticalLocation,
		messageId: e.messageId,
		returnResult: e.returnResult,
		sourceItemUuid: e.sourceItemUuid
	};
}
function Vp(e) {
	let t = Hp(e);
	if (t) return {
		id: t.id,
		name: t.name,
		type: t.type,
		uuid: t.uuid
	};
}
function Hp(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/failure.ts
function Up(t, n, r) {
	return c(`${e} | ${t}`, r), ui.notifications?.error(t), [
		"<div class=\"wfrp4e chat-card\">",
		"<h3>Expanded Critical Hit Failed</h3>",
		`<p>${Wp(t)}</p>`,
		`<p><strong>Table:</strong> ${Wp(n)}</p>`,
		"</div>"
	].join("");
}
function Wp(e) {
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
function Gp(e, t) {
	if (!Jp(e)) return;
	let n = t.criticalLocation;
	if (e.type !== "critical" || typeof n != "string") return e;
	let r = e.toObject, i = Item?.implementation;
	if (typeof r != "function" || typeof i != "function") return e;
	let a = r.call(e), o = Kp(Kp(a, "system"), "location"), s = game.wfrp4e?.config?.locations ?? {};
	return o.key = n, o.value = s[n] ?? n, new i(a);
}
function Kp(e, t) {
	let n = qp(e[t]);
	if (n) return n;
	let r = {};
	return e[t] = r, r;
}
function qp(e) {
	return typeof e == "object" && e ? e : void 0;
}
function Jp(e) {
	let t = e;
	return typeof t == "object" && !!t && typeof t.postItem == "function";
}
//#endregion
//#region src/module/wfrp4e/runtime-values.ts
function Yp(e) {
	return Array.isArray(e) ? e : [];
}
function $(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/item/damage-defaults.ts
var Xp = "teethClaws", Zp = {};
function Qp(e) {
	if ($p(e)) return {
		categories: [Xp],
		labels: ["Teeth & Claws"],
		lores: [],
		source: "creatureTrait"
	};
	if (em(e)) {
		let t = rm(e), n = im(t);
		return {
			categories: sm(n.map((e) => ne[e])),
			labels: sm(n.map((e) => S[e])),
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
function $p(e) {
	let t = $(e), n = $($(t?.system)?.rollable);
	return t?.type === "trait" && n?.damage === !0;
}
function em(e) {
	let t = $(e);
	return t?.type === "spell" && nm(t?.system);
}
function tm(e) {
	let t = $(e);
	return t?.type === "prayer" && nm(t?.system);
}
function nm(e) {
	let t = $(e), n = $(t?.damage), r = $(t?.magicMissile);
	return am(n?.value) || am(n?.dice) || n?.addSL === !0 || r?.value === !0;
}
function rm(e) {
	let t = $($($(e)?.system)?.lore), n = om(t?.chosen);
	return n ? [n] : sm((Array.isArray(t?.value) ? Yp(t?.value) : [t?.value]).map(om).filter((e) => !!e));
}
function im(e, t = Zp) {
	return sm((e.length > 0 ? e : [""]).map((e) => t[om(e) ?? ""] ?? "energy"));
}
function am(e) {
	return typeof e == "number" ? e !== 0 : typeof e == "string" && e.trim().length > 0;
}
function om(e) {
	if (typeof e == "string") return e.trim().toLowerCase() || void 0;
}
function sm(e) {
	return [...new Set(e)];
}
//#endregion
//#region src/module/wfrp4e/item/wounding-overrides.ts
var cm = "damageTypes", lm = new Map(b.map((e) => [x[e], e]));
function um(e) {
	let t = new Set([...dm(e), ...pm(e)]);
	return b.filter((e) => t.has(e));
}
function dm(t) {
	let n = $(t), r = n?.getFlag, i = $($(n?.flags)?.[e]);
	return fm(typeof r == "function" ? r.call(t, e, cm) : i?.[cm]);
}
function fm(e) {
	let t = new Set(Yp(e).filter(gm));
	return b.filter((e) => t.has(e));
}
function pm(e) {
	let t = Yp($($($(e)?.system)?.qualities)?.value), n = /* @__PURE__ */ new Set();
	for (let e of t) {
		let t = $(e);
		if (!mm(t)) continue;
		let r = t?.name, i = typeof r == "string" ? lm.get(r) : void 0;
		i && n.add(i);
	}
	return b.filter((e) => n.has(e));
}
function mm(e) {
	let t = e?.group;
	return hm(t) ? e?.active === !0 : !0;
}
function hm(e) {
	return typeof e == "number" ? Number.isFinite(e) : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e));
}
function gm(e) {
	return typeof e == "string" && b.includes(e);
}
//#endregion
//#region src/module/wfrp4e/quality-extraction.ts
function _m(e) {
	let t = vm(e);
	return {
		explicitCategories: ae(t),
		weaponPropertyKeys: t,
		weaponTypeKeys: ym(e)
	};
}
function vm(e) {
	let t = $(e), n = $(t?.system), r = $(t?.properties), i = $(n?.properties), a = [$(r?.qualities), $(i?.qualities)], o = /* @__PURE__ */ new Set();
	for (let t of dm(e)) o.add(x[t]);
	for (let e of a) for (let t of Object.keys(e ?? {})) o.add(t);
	let s = Yp($(n?.qualities)?.value);
	for (let e of s) {
		let t = $(e), n = t?.name;
		typeof n == "string" && mm(t) && o.add(n);
	}
	return [...o];
}
function ym(e) {
	let t = $($(e)?.system), n = /* @__PURE__ */ new Set();
	for (let e of [
		t?.weaponGroup,
		t?.group,
		t?.weaponType,
		t?.weaponClass,
		t?.ammunitionGroup,
		t?.ammoGroup,
		t?.category
	]) bm(e, n);
	return [...n];
}
function bm(e, t) {
	if (typeof e == "string") {
		t.add(e);
		return;
	}
	if (Array.isArray(e)) {
		for (let n of e) bm(n, t);
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
	]) bm(n[e], t);
}
//#endregion
//#region src/module/wfrp4e/damage-category-resolution.ts
function xm(e) {
	let t = _m(e), n = Qp(e);
	return {
		clues: t,
		defaults: n,
		resolution: Tl({
			...t,
			defaultCategories: n.categories,
			inferFromWeaponProperties: Zl(),
			inferFromWeaponTypes: Ql(),
			weaponPropertyMapping: $l(),
			weaponTypeMapping: eu()
		})
	};
}
//#endregion
//#region src/module/wfrp4e/critical-replacement.ts
var Sm = !1;
function Cm() {
	if (Sm) {
		a(`${e} | Critical replacement patch already installed.`);
		return;
	}
	let t = game.wfrp4e?.tables;
	if (!t || typeof t.findTable != "function" || typeof t.formatChatRoll != "function") {
		a(`${e} | Critical replacement patch skipped: WFRP table API unavailable`, {
			hasTables: !!t,
			hasFindTable: typeof t?.findTable == "function",
			hasFormatChatRoll: typeof t?.formatChatRoll == "function"
		});
		return;
	}
	let n = t.findTable.bind(t), r = t.formatChatRoll.bind(t);
	t.formatChatRoll = async (t, i = {}, o = null) => {
		if (zp(t)) {
			try {
				let e = await wm(t, i, o);
				if (e !== void 0) return e;
			} catch (e) {
				return Up(`Drowsy's WFRP4e Expanded Damage System could not roll ${t}. See the browser console for details.`, t, e);
			}
			return r(t, i, o);
		}
		let s = Om(t);
		if (!Jl() || !s) return s && a(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: "replacement disabled",
			options: Bp(i)
		}), r(t, i, o);
		let c = Em(t, i), l = Ee(i.messageId), u, d, f, p, m = l?.category;
		if (a(`${e} | Critical replacement inspecting WFRP critical roll`, {
			table: t,
			location: c,
			options: Bp(i)
		}), !m) {
			try {
				u = await Dm(i);
			} catch (e) {
				return Up("Drowsy's WFRP4e Expanded Damage System could not resolve the critical source item. See the browser console for details.", t, e);
			}
			let e = xm(u);
			d = e.clues, f = e.defaults, p = e.resolution, m = oe(e.resolution.categories);
		}
		if (a(`${e} | Critical replacement damage category resolution`, {
			table: t,
			location: c,
			sourceItem: Vp(u),
			categoryClues: d,
			categoryDefaults: f,
			categoryResolution: p,
			chosenCategory: m,
			damageConsoleSource: l,
			inferFromWeaponProperties: Zl(),
			inferFromWeaponTypes: Ql()
		}), !c || !m) return a(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: c ? "damage category unavailable" : "location unavailable"
		}), r(t, i, o);
		let h = Ll(!!game.settings.get("wfrp4e", "uiaCrits")), g = Fl(h, m, c);
		if (!n(g)) return Up(`Drowsy's WFRP4e Expanded Damage System table ${g} is missing from the module compendium.`, g);
		a(`${e} | Critical replacement rolling expanded table`, {
			table: t,
			expandedTableKey: g,
			ruleset: h,
			category: m,
			location: c
		});
		try {
			let e = await wm(g, i, o);
			if (e !== void 0) return e;
		} catch (e) {
			return Up(`Drowsy's WFRP4e Expanded Damage System could not roll ${g}. See the browser console for details.`, g, e);
		}
		return Up(`Drowsy's WFRP4e Expanded Damage System could not use WFRP's RollTable API for ${g}.`, g);
	}, Sm = !0, a(`${e} | Critical replacement patch installed.`);
}
async function wm(e, t, n) {
	let r = game.wfrp4e?.tables?.rollTable;
	if (typeof r != "function") return;
	let i = await r.call(game.wfrp4e.tables, e, t, n);
	if (await Tm(i, t)) return null;
	let a = km(i);
	return t.returnResult ? i : a?.result;
}
async function Tm(t, n) {
	let r = km(km(t)?.object)?.documentUuid;
	if (typeof r != "string") return a(`${e} | Expanded critical result had no document UUID`, { result: t }), !1;
	let i = Gp(await fromUuid(r), n);
	if (!i) throw Error(`Could not resolve expanded critical item ${r}.`);
	return a(`${e} | Posting expanded critical item`, {
		documentUuid: r,
		messageId: n.messageId,
		criticalLocation: n.criticalLocation
	}), await i.postItem(void 0, { "flags.wfrp4e.sourceMessageId": n.messageId }), !0;
}
function Em(e, t) {
	let n = t.criticalLocation;
	return Il(typeof n == "string" ? n : e.replace(/^crit/i, ""));
}
async function Dm(e) {
	let t = e.sourceItemUuid;
	if (typeof t == "string") return await fromUuid(t);
	let n = e.messageId;
	if (typeof n != "string") return;
	let r = km(km(game.messages.get(n)?.system)?.test), i = km(r?.preData);
	return r?.item ?? r?.weapon ?? i?.item;
}
function Om(e) {
	return /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function km(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/support.ts
var Am = "ech-wounding-properties", jm = new Set(Object.values(x));
function Mm(e) {
	let t = { ...e };
	for (let e of b) t[x[e]] = S[e];
	return t;
}
function Nm(e) {
	return Rm(e) || $p(e) || zm(e);
}
function Pm(e) {
	return Nm(e);
}
function Fm(e) {
	let t = um(e).map((e) => S[e]);
	if (t.length > 0) return t;
	let n = Qp(e);
	if (n.labels.length > 0) return n.labels.map((e) => `${e} (Default)`);
	let r = xm(e).resolution, i = r.source === "weaponProperty" || r.source === "weaponType" ? " (Inferred)" : "";
	return r.categories.map((e) => `${te[e]}${i}`);
}
function Im(e) {
	if (!(typeof e != "object" || !e)) return e;
}
function Lm(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (!(t.qualities !== void 0 && !Array.isArray(t.qualities))) return t;
}
function Rm(e) {
	return e?.type === "weapon" || e?.type === "ammunition" || e?.system?.isWeapon === !0;
}
function zm(e) {
	return em(e) || tm(e);
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actions.ts
var Bm = `.${Am}__sheet-row a[data-ech-action="configureProperties"]`, Vm = /* @__PURE__ */ new Map(), Hm = !1;
function Um() {
	Hm ||= (document.addEventListener("click", Xm, !0), !0);
}
function Wm(e) {
	return e?.uuid;
}
function Gm(e, t) {
	Vm.set(e, t);
}
function Km(e) {
	if (e?.type === "spell" || e?.type === "prayer") {
		qm(e);
		return;
	}
	let t = $m();
	!e || !t || new t(e).render(!0);
}
async function qm(t) {
	if (typeof t.update != "function") return;
	let n = Jm(new Set(um(t))), r = await foundry.applications.api.DialogV2.wait({
		buttons: [{
			action: "save",
			callback: (e, t) => Ym(t.form),
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
	if (!Array.isArray(r)) return;
	let i = fm(r);
	try {
		await t.update({ [`flags.${e}.${cm}`]: i });
	} catch (t) {
		a(`${e} | Could not update magic damage types`, { error: t }), ui.notifications?.error("Could not save Damage Types for this item.");
	}
}
function Jm(e) {
	let t = document.createElement("div"), n = document.createElement("fieldset"), r = document.createElement("legend"), i = document.createElement("p");
	n.classList.add("fieldset"), r.classList.add("fieldset-legend"), r.textContent = "Damage Types", i.classList.add("label"), i.textContent = "Choose the critical table types this damaging magic item can use.", n.append(r, i);
	for (let t of b) {
		let r = document.createElement("label"), i = document.createElement("input"), a = document.createElement("span");
		r.classList.add("label", "cursor-pointer", "justify-start", "gap-3"), i.classList.add("checkbox", "checkbox-sm"), i.type = "checkbox", i.name = "damageType", i.value = t, i.checked = e.has(t), a.textContent = S[t], r.append(i, a), n.append(r);
	}
	return t.append(n), t;
}
function Ym(e) {
	return e ? fm([...e.querySelectorAll("input[name=\"damageType\"]:checked")].map((e) => e.value)) : [];
}
function Xm(e) {
	let t = Zm(e.target);
	t && (e.preventDefault(), e.stopPropagation(), Qm(t));
}
function Zm(e) {
	if (e instanceof Element) return e.closest(Bm) ?? void 0;
}
async function Qm(e) {
	let t = e.closest(`.${Am}__sheet-row`)?.dataset.echItemUuid;
	if (!t) return;
	let n = await fromUuid(t);
	if (!th(n)) return;
	if (n.type === "spell" || n.type === "prayer") {
		Km(n);
		return;
	}
	let r = Vm.get(t);
	if (r) {
		r(n);
		return;
	}
	Km(n);
}
function $m() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	if (eh(e)) return e;
}
function eh(e) {
	return typeof e == "function";
}
function th(e) {
	return typeof e == "object" && !!e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actor-sheet.ts
var nh = /* @__PURE__ */ new WeakSet();
function rh(e, t) {
	if (!(t instanceof HTMLElement)) return;
	let n = ih(t, "combat"), r = ih(t, "trappings");
	n && (ah(n), oh(e, n)), r && (sh(e, r), !nh.has(r) && (new MutationObserver(() => {
		sh(e, r);
	}).observe(r, {
		childList: !0,
		subtree: !0
	}), nh.add(r)));
}
function ih(e, t) {
	return e.matches(`section[data-tab="${t}"]`) ? e : e.querySelector(`section[data-tab="${t}"]`) ?? void 0;
}
function ah(e) {
	let t = new Set(Object.values(S)), n = e.querySelectorAll(".item-property-row a[data-action=\"itemPropertyDropdown\"][data-type=\"qualities\"]");
	for (let e of n) t.has(e.textContent.trim()) && e.classList.add("ech-wounding-property-combat-text");
}
function oh(e, t) {
	let n = t.querySelectorAll(".list-row[data-uuid] .item-property-row:not([data-ech-inference-checked=\"true\"])");
	for (let t of n) {
		t.dataset.echInferenceChecked = "true";
		let n = uh(e, t);
		if (ph(n)) for (let e of n.categories) t.append(mh("combat", e, n));
	}
}
function sh(e, t) {
	ch(t), lh(e, t);
}
function ch(e) {
	let t = new Set(Object.values(S)), n = e.querySelectorAll(".tags .tag:not(.ech-inferred-damage-type)");
	for (let e of n) t.has(e.textContent.trim()) && e.classList.add("ech-wounding-property-trappings-badge");
}
function lh(e, t) {
	let n = t.querySelectorAll(".list-row[data-uuid] .tags:not([data-ech-inference-checked=\"true\"])");
	for (let t of n) {
		t.dataset.echInferenceChecked = "true";
		let n = uh(e, t);
		if (ph(n)) for (let e of n.categories) t.append(mh("trappings", e, n));
	}
}
function uh(t, n) {
	let r = n.closest(".list-row[data-uuid]")?.dataset.uuid;
	if (r) try {
		let n = dh(t, r);
		if (!fh(n)) {
			a(`${e} | Inferred damage display skipped for ${r}: item unavailable or unsupported.`);
			return;
		}
		let i = xm(n).resolution;
		return a(`${e} | Inferred damage display resolved ${r}: source=${i.source} categories=${i.categories.join(",") || "none"}`), i;
	} catch (t) {
		a(`${e} | Could not display inferred damage type`, {
			error: t,
			uuid: r
		});
		return;
	}
}
function dh(e, t) {
	let n = $(e), r = $(($(n?.actor) ?? $(n?.document))?.items), i = r?.get, a = t.split(".").at(-1);
	if (!(typeof i != "function" || !a)) return i.call(r, a);
}
function fh(e) {
	let t = $(e), n = $(t?.system);
	return t?.type === "weapon" || t?.type === "ammunition" || n?.isWeapon === !0;
}
function ph(e) {
	return e?.source === "weaponProperty" || e?.source === "weaponType";
}
function mh(e, t, n) {
	let r = document.createElement(e === "combat" ? "span" : "div"), i = hh(t, n.source, n.matches);
	return r.classList.add("ech-inferred-damage-type", `ech-inferred-damage-type--${e}`), e === "trappings" && r.classList.add("tag"), r.dataset.echDamageCategory = t, r.dataset.tooltip = i, r.setAttribute("aria-label", i), r.textContent = te[t], r;
}
function hh(e, t, n) {
	let r = n.filter((t) => t.category === e).map((e) => gh(e.key, t)), i = t === "weaponProperty" ? "item property" : "weapon type";
	return r.length > 0 ? `Inferred from ${r.join(", ")}` : `Inferred from ${i}`;
}
function gh(e, t) {
	if (t === "weaponProperty") {
		let t = game.wfrp4e?.utility?.qualityList?.() ?? {}, n = El(e);
		for (let [e, r] of Object.entries(t)) if (El(e) === n || El(r) === n) return r;
	}
	return e.replaceAll(/([a-z])([A-Z])/g, "$1 $2").replaceAll(/[_-]+/g, " ").trim().replaceAll(/\b\w/g, (e) => e.toUpperCase());
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/debug.ts
function _h(e) {
	if (!(typeof e != "object" || !e)) return e.constructor?.name;
}
function vh(e) {
	if (e) return {
		id: e.id,
		name: e.name,
		type: e.type,
		uuid: e.uuid
	};
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet-box.ts
function yh(e, t, n) {
	let r = document.createElement("div");
	r.classList.add("attribute-box", "top-label", `${Am}__sheet-row`);
	let i = Wm(n);
	i && (r.dataset.echItemUuid = i, Gm(i, xh(e, n)));
	let a = document.createElement("div");
	a.classList.add("label"), a.style.gridColumn = "1 / span 12", a.innerHTML = "<label><a data-ech-action=\"configureProperties\">Damage Type <i class=\"fas fa-cog\"></i></a></label>";
	let o = document.createElement("div");
	o.classList.add("field"), o.style.gridColumn = "1 / span 12";
	let s = document.createElement("input");
	return s.type = "text", s.value = t.join(","), s.readOnly = !0, o.append(s), r.append(a, o), bh(r, n), r;
}
function bh(e, t) {
	e.querySelector("a[data-ech-action=\"configureProperties\"]")?.addEventListener("click", (e) => {
		e.preventDefault(), Km(t);
	});
}
function xh(e, t) {
	return Sh(e) || ((e) => {
		Km(e ?? t);
	});
}
function Sh(e) {
	if (typeof e != "object" || !e) return;
	let t = e.constructor?.DEFAULT_OPTIONS?.actions?.configureProperties;
	if (typeof t == "function") return (e) => {
		t.call({ document: e });
	};
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet.ts
function Ch(t) {
	if (!(t instanceof HTMLElement)) {
		a(`${e} | ItemProperties render hook skipped: element is not HTMLElement`, { elementType: typeof t });
		return;
	}
	let n = t.querySelector(".property-column");
	if (!n) {
		a(`${e} | ItemProperties render hook skipped: quality column not found.`);
		return;
	}
	let r = Th(n);
	if (r.length === 0) {
		a(`${e} | ItemProperties render hook found no damage type rows`, { checkboxCount: n.querySelectorAll("input[type=\"checkbox\"]").length });
		return;
	}
	a(`${e} | Grouping ItemProperties damage type rows`, { woundingRowCount: r.length });
	let i = n.querySelector(`.${Am}`), o = i ?? document.createElement("div");
	i || (o.classList.add(Am), o.append(Eh()));
	for (let e of r) o.append(e);
	let s = n.querySelector("input[name=\"custom-quality\"]")?.parentElement;
	if (s) {
		s.before(o);
		return;
	}
	n.append(o);
}
function wh(t, n) {
	if (!(n instanceof HTMLElement)) {
		a(`${e} | Item sheet render hook skipped: element is not HTMLElement`, {
			applicationName: _h(t),
			elementType: typeof n
		});
		return;
	}
	let r = Im(t), i = r?.document ?? r?.item;
	if (!Nm(i)) {
		a(`${e} | Item sheet render hook skipped: unsupported document`, {
			applicationName: _h(t),
			document: vh(i)
		});
		return;
	}
	a(`${e} | Item sheet render hook inspecting supported document`, {
		applicationName: _h(t),
		document: vh(i)
	});
	let o = Oh(n);
	if (!o) {
		a(`${e} | Item sheet qualities box not found; trying standalone damage row`, { document: vh(i) }), Dh(t, n, i);
		return;
	}
	let s = o.querySelector(".field input");
	if (!s) {
		a(`${e} | Item sheet qualities input not found`, { document: vh(i) });
		return;
	}
	let c = kh(s.value), l = c.wounding.length > 0 ? c.wounding : Fm(i);
	if (l.length === 0) {
		a(`${e} | Item sheet qualities contain no damage type labels`, {
			document: vh(i),
			displayedQualities: s.value
		});
		return;
	}
	a(`${e} | Splitting item sheet damage type labels into their own row`, {
		document: vh(i),
		normalQualities: c.normal,
		woundingQualities: c.wounding
	}), s.value = c.normal.join(","), o.parentElement?.querySelector(`.${Am}__sheet-row`)?.remove(), o.after(yh(t, l, i));
}
function Th(e) {
	let t = e.querySelectorAll("input[type=\"checkbox\"]"), n = [];
	for (let e of t) {
		if (!jm.has(e.name)) continue;
		let t = e.closest(".form-group");
		t && n.push(t);
	}
	return n;
}
function Eh() {
	let e = document.createElement("h2");
	return e.classList.add("property-header", `${Am}__header`), e.textContent = "Damage Type", e;
}
function Dh(t, n, r) {
	if (!Pm(r)) {
		a(`${e} | Standalone damage type row skipped: unsupported document`, { document: vh(r) });
		return;
	}
	if (n.querySelector(".ech-wounding-properties__sheet-row")) {
		a(`${e} | Standalone damage type row skipped: row already exists`, { document: vh(r) });
		return;
	}
	let i = Ah(n);
	if (!i) {
		a(`${e} | Standalone damage type row skipped: damage fieldset not found`, { document: vh(r) });
		return;
	}
	let o = Fm(r);
	a(`${e} | Appending standalone damage type row`, {
		document: vh(r),
		labels: o
	}), i.after(yh(t, o, r));
}
function Oh(e) {
	let t = e.querySelectorAll("a[data-action=\"configureProperties\"]");
	for (let e of t) if (e.textContent.trim().startsWith("Qualities")) return e.closest(".attribute-box") ?? void 0;
}
function kh(e) {
	let t = [], n = [], r = new Set(Object.values(S));
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
function Ah(e) {
	let t = e.querySelectorAll("fieldset");
	for (let e of t) if (e.querySelector("legend")?.textContent.trim() === "Damage") return e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/display.ts
var jh = !1, Mh = Symbol.for(`${e}.woundingPropertiesContextPatched`);
function Nh() {
	if (Um(), Ih(), jh) {
		a(`${e} | Wounding property display hooks already installed.`);
		return;
	}
	Hooks.on("renderItemProperties", (e, t) => {
		Ch(t);
	}), Hooks.on("renderApplicationV2", (e, t) => {
		wh(e, t), rh(e, t), Fh(e) && Ph(e);
	}), Hooks.on("renderBaseWFRP4eActorSheet", (e, t) => {
		rh(e, t), Ph(e);
	}), jh = !0, a(`${e} | Wounding property display hooks installed.`);
}
function Ph(t, n = 5) {
	typeof t != "object" || !t || requestAnimationFrame(() => {
		let r = t.element;
		if (r instanceof HTMLElement && r.isConnected) {
			a(`${e} | Styling committed WFRP actor sheet with ${r.querySelectorAll(".item-property-row").length} property rows.`), rh(t, r);
			return;
		}
		if (n > 1) {
			Ph(t, n - 1);
			return;
		}
		a(`${e} | Committed WFRP actor sheet element was unavailable.`);
	});
}
function Fh(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e.actor;
	return typeof t == "object" && !!t;
}
function Ih() {
	let t = Lh()?.prototype, n = t?._prepareContext;
	if (!t || !n) {
		a(`${e} | ItemProperties context patch skipped: application unavailable.`);
		return;
	}
	if (Rh(n)) {
		a(`${e} | ItemProperties context patch already installed.`);
		return;
	}
	let r = async function(...e) {
		let t = this.document;
		Nm(t) && (this.qualities = Mm(this.qualities ?? {}));
		let r = await n.apply(this, e);
		return zh(this, r), r;
	};
	Object.defineProperty(r, Mh, { value: !0 }), t._prepareContext = r, a(`${e} | ItemProperties context patch installed.`);
}
function Lh() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	return typeof e == "function" ? e : void 0;
}
function Rh(e) {
	return !!e[Mh];
}
function zh(t, n) {
	let r = Im(t), i = Lm(n), o = r?.document;
	if (!r || !i || !Nm(o)) {
		a(`${e} | Skipping ItemProperties damage type context append`, {
			applicationName: Bh(t),
			hasItemProperties: !!r,
			hasRenderContext: !!i,
			document: Vh(o),
			supportsDamageTypeProperties: Nm(o)
		});
		return;
	}
	a(`${e} | Appending damage types to ItemProperties context`, {
		applicationName: Bh(t),
		document: Vh(o),
		originalQualityCount: Object.keys(r.qualities ?? {}).length,
		renderedQualityCount: i.qualities?.length ?? 0
	}), r.qualities = Mm(r.qualities ?? {}), i.qualities ??= [];
	for (let e of b) {
		let t = x[e];
		i.qualities.some((e) => e.key === t) || i.qualities.push({
			existing: r.document?.originalProperties?.qualities?.[t],
			hasValue: !1,
			key: t,
			name: S[e]
		});
	}
	a(`${e} | ItemProperties context after damage type append`, {
		document: Vh(o),
		renderedQualityCount: i.qualities.length
	});
}
function Bh(e) {
	if (!(typeof e != "object" || !e)) return e.constructor?.name;
}
function Vh(e) {
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
var Hh = !1;
function Uh() {
	let t = game.wfrp4e?.config;
	if (!t) {
		a(`${e} | Damage quality registration skipped: WFRP config unavailable.`);
		return;
	}
	let n = t.propertyHasValue, r = t.qualityDescriptions;
	if (!n || !r) {
		a(`${e} | Damage quality registration skipped: WFRP property config missing`, {
			hasPropertyHasValue: !!n,
			hasQualityDescriptions: !!r
		});
		return;
	}
	for (let e of b) {
		let t = x[e];
		r[t] = "Drowsy's WFRP4e Expanded Damage System damage type marker. A critical hit may roll on the matching expanded critical table.", n[t] = !1;
	}
	a(`${e} | Damage qualities registered`, {
		count: b.length,
		qualityKeys: b.map((e) => x[e])
	}), Wh(), Nh();
}
function Wh() {
	let t = game.wfrp4e?.utility, n = t?.qualityList;
	if (Hh || !t || !n) {
		a(`${e} | Quality list patch skipped`, {
			qualityListPatchInstalled: Hh,
			hasUtility: !!t,
			hasOriginalQualityList: !!n
		});
		return;
	}
	t.qualityList = function(e) {
		let t = n.call(this, e);
		return e === "armor" ? t : Mm(t);
	}, Hh = !0, a(`${e} | Quality list patch installed.`);
}
//#endregion
//#region src/module/wfrp4e/zero-wound-critical-links.ts
var Gh = "data-ech-source-item-uuid", Kh = "data-ech-critical-location", qh = !1;
function Jh() {
	qh ||= (Yh(), document.addEventListener("click", $h, !0), !0);
}
function Yh() {
	let e = CONFIG.Actor?.documentClass?.prototype, t = e?.applyDamage;
	typeof t != "function" || !e || (e.applyDamage = async function(e, n = {}) {
		let r = await t.call(this, e, n), i = Xh(n);
		return typeof r != "string" || !i || !r.includes("critical-roll") ? r : Qh(r, i, Zh(n));
	});
}
function Xh(e) {
	let t = ag(ag(e.sourceTest)?.item), n = ag(ag(ag(e.opposedTest)?.attackerTest)?.item), r = ag(e.sourceItem), i = t?.uuid ?? n?.uuid ?? r?.uuid;
	return typeof i == "string" ? i : void 0;
}
function Zh(e) {
	let t = ag(ag(e.opposedTest)?.result)?.hitloc, n = ag(t)?.value, r = e.loc, i;
	return typeof n == "string" ? i = n : typeof r == "string" && (i = r), i && Il(i) ? i : void 0;
}
function Qh(e, t, n) {
	let r = [`${Gh}="${ig(t)}"`, n ? `${Kh}="${ig(n)}"` : void 0].filter(Boolean).join(" ");
	return e.replaceAll(/<a\b(?![^>]*\bdata-ech-source-item-uuid=)(?=[^>]*\bcritical-roll\b)/g, `<a ${r}`);
}
function $h(e) {
	let t = e.target;
	if (!(t instanceof Element) || !Jl()) return;
	let n = t.closest(`[data-action="clickTable"][${Gh}]`);
	!(n instanceof HTMLElement) || !rg(n.dataset.table) || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), eg(n).catch((e) => {
		tg("Drowsy's WFRP4e Expanded Damage System could not roll an annotated zero-wound critical. See the browser console for details.", e);
	}));
}
async function eg(e) {
	let t = e.dataset.table, n = game.wfrp4e?.tables?.formatChatRoll;
	if (!t || typeof n != "function") return;
	let r = e.closest("[data-message-id]")?.dataset.messageId, i = Number.parseInt(e.dataset.modifier ?? "0", 10) || 0, a = await n(t, {
		criticalLocation: e.dataset.echCriticalLocation ?? ng(r),
		messageId: r,
		modifier: i,
		showRoll: !0,
		sourceItemUuid: e.dataset.echSourceItemUuid
	}, e.dataset.column);
	if (typeof a != "string" || a.length === 0) return;
	let o = game.wfrp4e?.utility?.chatDataSetup, s = typeof o == "function" ? o("", game.settings.get("core", "rollMode"), !0) : { content: "" };
	s.content = a, await ChatMessage.create(s);
}
function tg(t, n) {
	c(`${e} | ${t}`, n), ui.notifications?.error(t);
}
function ng(e) {
	if (!e) return;
	let t = ag(ag(ag(game.messages.get(e)?.system)?.test)?.result)?.hitloc, n = ag(t)?.result;
	return typeof n == "string" ? n : void 0;
}
function rg(e) {
	return typeof e == "string" && /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function ig(e) {
	return e.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function ag(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function og() {
	Hooks.once("init", () => {
		o(`${e} | Initializing`), Lp(), ql(), a(`${e} | init hook running`, {
			foundryVersion: game.version,
			systemId: game.system?.id,
			userIsGM: game.user?.isGM
		}), Nh(), Sl(), Uh();
	}), Hooks.once("ready", () => {
		sg();
	});
}
async function sg() {
	if (a(`${e} | ready hook running`, {
		foundryVersion: game.version,
		systemId: game.system?.id,
		userIsGM: game.user?.isGM,
		settings: ru(),
		wfrpConfigAvailable: !!game.wfrp4e?.config,
		wfrpTablesAvailable: !!game.wfrp4e?.tables
	}), game.system.id !== "wfrp4e") {
		s(`${e} | Loaded outside ${t}; skipping WFRP integration.`);
		return;
	}
	vu(), await Xl(), a(`${e} | ready hook after mapping normalization`, { settings: ru() }), Uh(), await p(), lu(), Cm(), Jh(), o(`${e} | Ready`);
}
//#endregion
//#region src/main.ts
og();
//#endregion

//# sourceMappingURL=wfrp4e-expanded-critical-hits.mjs.map