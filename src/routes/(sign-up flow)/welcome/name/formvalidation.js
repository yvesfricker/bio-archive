var R = class {
    constructor() {
        this._numberOfCats = 1; this._catOneName = ""; this._catOneGender = ""; this._catTwoName = ""; this._catTwoGender = ""; this._stepOneError = ""; this._catOneAge = 0; this._catOneWeight = ""; this._catTwoAge = 0; this._catTwoWeight = ""; this._stepTwoError = ""; this._catOneBeef = !0; this._catOneChicken = !0; this._catOneTurkey = !0; this._catOnePork = !0; this._catTwoBeef = !0; this._catTwoChicken = !0; this._catTwoTurkey = !0; this._catTwoPork = !0; this._stepThreeError = ""; this._emailAddress = ""; this._stepFourError = ""; this._catOneChickenTrialQuantity = 0; this._catOneTurkeyTrialQuantity = 0; this._catOneBeefTrialQuantity = 0; this._catOnePorkTrialQuantity = 0; this._catTwoChickenTrialQuantity = 0; this._catTwoTurkeyTrialQuantity = 0; this._catTwoBeefTrialQuantity = 0; this._catTwoPorkTrialQuantity = 0; this._catOnePortionSize = 0; this._catTwoPortionSize = 0; this._catOneChickenMonthlyQuantity = 0; this._catOneTurkeyMonthlyQuantity = 0; this._catOneBeefMonthlyQuantity = 0; this._catOnePorkMonthlyQuantity = 0; this._catTwoChickenMonthlyQuantity = 0; this._catTwoTurkeyMonthlyQuantity = 0; this._catTwoBeefMonthlyQuantity = 0; this._catTwoPorkMonthlyQuantity = 0
    }

    set numberOfCats(e) { this._numberOfCats = e, t.setText(L, e.toString()), e === 2 ? (t.show(m), t.show(u), t.hide(C)) : e === 1 && (t.hide(m), t.hide(u), t.show(C)) }
    get numberOfCats() { return this._numberOfCats } set catOneName(e) { this._catOneName = e, t.setText(x, e) }

    get catOneName() { return t.getInputValue(I).trim() } set catTwoName(e) { this._catTwoName = e, t.setText(B, e) }

    get catTwoName() { return t.getInputValue(M).trim() } set catOneGender(e) { this._catOneGender = e }

    get catOneGender() { let e = t.getCheckedValue(P), r = t.getCheckedValue(U); return e ? "Male" : r ? "Female" : "" }

    set catTwoGender(e) { this._catTwoGender = e } get catTwoGender() { let e = t.getCheckedValue(d), r = t.getCheckedValue(Q); return e ? "Male" : r ? "Female" : "" }

    set stepOneError(e) { this._stepOneError = e, t.setText(f, e), t.show(f) }

    get stepOneError() { return this._stepOneError } set catOneAge(e) { e < 0 || (this._catOneAge = e, t.setText(H, e.toString())) }

    get catOneAge() { return this._catOneAge } set catTwoAge(e) { e < 0 || (this._catTwoAge = e, t.setText(Y, e.toString())) }

    get catTwoAge() { return this._catTwoAge } set catOneWeight(e) { this._catOneWeight = e }
    get catOneWeight() { return t.getInputValue(D) }

    set catTwoWeight(e) { this._catTwoWeight = e } get catTwoWeight() { return t.getInputValue(z) }
    set stepTwoError(e) { this._stepTwoError = e, t.setText(N, e), t.show(N) }

    set catOneBeef(e) { this._catOneBeef = e } get catOneBeef() { return !t.getCheckedValue(X) }

    set catOneChicken(e) { this._catOneChicken = e } get catOneChicken() { return !t.getCheckedValue(V) }

    set catOneTurkey(e) { this._catOneTurkey = e } get catOneTurkey() { return !t.getCheckedValue(q) }
    set catOnePork(e) { this._catOnePork = e }

    get catOnePork() { return !t.getCheckedValue(Z) } set catTwoBeef(e) { this._catTwoBeef = e }
    get catTwoBeef() { return !t.getCheckedValue($) }
    set catTwoChicken(e) { this._catTwoChicken = e }

    get catTwoChicken() { return !t.getCheckedValue(j) } set catTwoTurkey(e) { this._catTwoTurkey = e }
    get catTwoTurkey() { return !t.getCheckedValue(J) }
    set catTwoPork(e) { this._catTwoPork = e }


    get catTwoPork() { return !t.getCheckedValue(ee) } set stepThreeError(e) { this._stepThreeError = e, t.setText(p, e), t.show(p) }

    get stepThreeError() { return this._stepThreeError } set emailAddress(e) { this._emailAddress = e }
    get emailAddress() { return t.getInputValue(te) }

    set stepFourError(e) { this._stepFourError = e, t.setText(w, e), t.show(w) } get stepFourError() { return this._stepFourError }
    set catOneChickenTrialQuantity(e) { e <= 0 || (this._catOneChickenTrialQuantity = e, t.setText(le, e.toString()), t.showFlex(re)) }

    set catOneBeefTrialQuantity(e) { e <= 0 || (this._catOneBeefTrialQuantity = e, t.setText(Oe, e.toString()), t.showFlex(oe)) }

    set catOneTurkeyTrialQuantity(e) { e <= 0 || (this._catOneTurkeyTrialQuantity = e, t.setText(Ee, e.toString()), t.showFlex(Te)) }

    set catOnePorkTrialQuantity(e) { e <= 0 || (this._catOnePorkTrialQuantity = e, t.setText(ue, e.toString()), t.showFlex(ae)) }

    set catTwoChickenTrialQuantity(e) { e <= 0 || (this._catTwoChickenTrialQuantity = e, t.setText(Ce, e.toString()), t.showFlex(ce)) }

    set catTwoBeefTrialQuantity(e) { e <= 0 || (this._catTwoBeefTrialQuantity = e, t.setText(Ae, e.toString()), t.showFlex(se)) }

    set catTwoTurkeyTrialQuantity(e) { e <= 0 || (this._catTwoTurkeyTrialQuantity = e, t.setText(he, e.toString()), t.showFlex(ie)) }

    set catTwoPorkTrialQuantity(e) { e <= 0 || (this._catTwoPorkTrialQuantity = e, t.setText(ye, e.toString()), t.showFlex(_e)) }

    set catOneChickenMonthlyQuantity(e) { e <= 0 || (this._catOneChickenMonthlyQuantity = e, t.setText(Ne, e.toString()), t.showFlex(Be)) }
    set catOneBeefMonthlyQuantity(e) { e <= 0 || (this._catOneBeefMonthlyQuantity = e, t.setText(pe, e.toString()), t.showFlex(Se)) }
    set catOneTurkeyMonthlyQuantity(e) { e <= 0 || (this._catOneTurkeyMonthlyQuantity = e, t.setText(we, e.toString()), t.showFlex(Ie)) }
    set catOnePorkMonthlyQuantity(e) { e <= 0 || (this._catOnePorkMonthlyQuantity = e, t.setText(Re, e.toString()), t.showFlex(Me)) }
    set catTwoChickenMonthlyQuantity(e) { e <= 0 || (this._catTwoChickenMonthlyQuantity = e, t.setText(ke, e.toString()), t.showFlex(Pe)) }
    set catTwoBeefMonthlyQuantity(e) { e <= 0 || (this._catTwoBeefMonthlyQuantity = e, t.setText(ge, e.toString()), t.showFlex(Ue)) }
    set catTwoTurkeyMonthlyQuantity(e) { e <= 0 || (this._catTwoTurkeyMonthlyQuantity = e, t.setText(Le, e.toString()), t.showFlex(de)) }
    set catTwoPorkMonthlyQuantity(e) { e <= 0 || (this._catTwoPorkMonthlyQuantity = e, t.setText(xe, e.toString()), t.showFlex(Qe)) }
    set catOnePortionSize(e) { this._catOnePortionSize = e, t.setText(me, e.toString()) }
    set catTwoPortionSize(e) { this._catTwoPortionSize = e, t.setText(fe, e.toString()) }
},


class { constructor() { this.numberOfCats = 1; this.catOneName = ""; this.catOneGender = ""; this.catTwoName = ""; this.catTwoGender = ""; this.catOneAge = 0; this.catOneWeight = 0; this.catTwoAge = 0; this.catTwoWeight = 0; this.catOneBeef = !0; this.catOneChicken = !0; this.catOneTurkey = !0; this.catOnePork = !0; this.catTwoBeef = !0; this.catTwoChicken = !0; this.catTwoTurkey = !0; this.catTwoPork = !0; this.emailAddress = ""; this.catOneChickenTrialQuantity = 0; this.catOneTurkeyTrialQuantity = 0; this.catOneBeefTrialQuantity = 0; this.catOnePorkTrialQuantity = 0; this.catTwoChickenTrialQuantity = 0; this.catTwoTurkeyTrialQuantity = 0; this.catTwoBeefTrialQuantity = 0; this.catTwoPorkTrialQuantity = 0 } 

 function We() {
    let a = /^([A-Za-z])+$/, e = "", { catOneName: r } = n, { catOneGender: c } = n; if (a.test(r) || (e += `Name von Katze 1. darf nur Buchstaben enthalten`), c ||
     (e += `Geschlecht von Katze 1. muss gew\xE4hlt werden`), n.numberOfCats === 2) {let { catTwoName: i } = n, { catTwoGender: _ } = n; a.test(i) || (e += `Name von Katze 2. darf nur Buchstaben enthalten`), _ || (e += `Geschlecht von Katze 2. muss gew\xE4hlt werden `)
    } return e
}


function He() {
    let a = "", e = /^\d*\.?\d*$/; return !n.catOneWeight || !e.test(n.catOneWeight) ? a += `Das Gewicht der Katze 1. hat das falsche Format, ein Beispiel einer gute Eingabe w\xE4re z.B. 3.2 `: (parseFloat(n.catOneWeight) <= 0 || parseFloat(n.catOneWeight) > 10) && (a += `Katze 1. Gewicht muss gr\xF6\xDFer als 0 und kleiner als 10 sein `), n.numberOfCats === 2 && (!n.catTwoWeight || !e.test(n.catTwoWeight) ? a += `Das Gewicht der Katze 2. hat das falsche Format, ein Beispiel einer gute Eingabe w\xE4re z.B. 3.2 `: (parseFloat(n.catTwoWeight) <= 0 || parseFloat(n.catTwoWeight) > 10) && (a += `Katze 2. Gewicht muss gr\xF6\xDFer als 0 und kleiner als 10 sein `)), a
}


function Ke() {
    let a = ""; return !n.catOneBeef && !n.catOneChicken && !n.catOneTurkey && !n.catOnePork && (a += `Katze 1 muss mindestens ein Futter ausgew\xE4hlt haben, das sie mag `), n.numberOfCats === 2 && !n.catTwoBeef && !n.catTwoChicken && !n.catTwoTurkey && !n.catTwoPork && (a += `Katze 2 muss mindestens ein Futter ausgew\xE4hlt haben, das sie mag `), a
}



function Fe() {
    let a = "", e = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; return (!n.emailAddress || !e.test(n.emailAddress)) && (a += `E-Mail-Adresse ist nicht g\xFCltig `), a
} 