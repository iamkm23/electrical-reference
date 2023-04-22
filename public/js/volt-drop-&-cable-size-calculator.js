import { cableAmpacity, cableVD } from "../utils/cable.js";
import {
  calculateThreePhaseCurrent,
  calculateVoltageDrop,
} from "../utils/module-calculators.js";

const form = document.querySelector("#calculation-form");
const loadRatingOption = document.querySelector("#load-rating-option");
const powerFactorDOM = document.querySelector(".power-factor");

// Show/hide the power factor based on load rating selected.
function togglePowerFactor() {
  powerFactorDOM.style.display =
    loadRatingOption.value === "kW" || loadRatingOption.value === "hp"
      ? ""
      : "none";
}
loadRatingOption.addEventListener("change", togglePowerFactor);

// loadRatingOption.addEventListener("change", () => {
//   loadRatingOption.value === "kVA" && (powerFactorDOM.style.display = "none");
//   loadRatingOption.value === "A" && (powerFactorDOM.style.display = "none");
//   loadRatingOption.value === "kW" && (powerFactorDOM.style.display = "");
//   loadRatingOption.value === "hp" && (powerFactorDOM.style.display = "");
// });
``;
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!getFormData().loadRating) {
    alert("value cannot be empty");
    return;
  }

  if (loadRatingOption.value === "kW") {
    const {
      loadRating: activePower,
      powerFactor: pf,
      voltageRating: voltage,
      cableSize: sqmm,
      cableSet,
      distanceToLoad: distance,
    } = getFormData();

    const ampere = calculateThreePhaseCurrent(activePower, voltage, pf).toFixed(
      2
    );

    styleResult(activePower);

    renderLoadCurrent(ampere, voltage, activePower, pf);
    renderCableAmpacity(sqmm, cableSet, cableAmpacity[sqmm], cableVD[sqmm]);
  }

  if (loadRatingOption.value === "kVA") {
    let {
      loadRating: realPower,
      powerFactor: pf,
      voltageRating: voltage,
      cableSize: sqmm,
      cableSet: noOfCableSet,
      distanceToLoad: distance,
    } = getFormData();

    // assign power factor to 1 if load rating in kVA.
    pf = 1;

    const ampere = calculateThreePhaseCurrent(realPower, voltage, pf).toFixed(
      2
    );

    styleResult();
    renderLoadCurrent(ampere, voltage, realPower, pf);
  }

  if (loadRatingOption.value === "hp") {
    let {
      loadRating: horsePower,
      powerFactor: pf,
      voltageRating: voltage,
      cableSize: sqmm,
      cableSet,
      distanceToLoad: distance,
    } = getFormData();

    // horsePower = horsePower * 0.7457;
    const ampere = calculateThreePhaseCurrent(
      horsePower * 0.7457,
      voltage,
      pf
    ).toFixed(2);

    styleResult();
    renderLoadCurrent(ampere, voltage, horsePower, pf);
  }

  if (loadRatingOption.value === "A") {
    const {
      loadRating: amp,
      powerFactor: pf,
      voltageRating: voltage,
      cableSize: sqmm,
      cableSet: noOfCableSet,
      distanceToLoad: distance,
    } = getFormData();

    styleResult();
    renderLoadCurrent(amp, voltage);
  }
});

// function getSuggesstion(loadCurrent, cableAmpacity, cableSet, voltDropPercent) {
//   if (loadCurrent > cableAmpacity * cableSet && voltDropPercent > 4) {
//     return "Your cable is undersize and voltage at the receving end is higher than 4% of 400V";
//   }
//   if (loadCurrent > cableAmpacity * cableSet) {
//     return "Cable selection is under size, choose higher sqmm and/or increase number of set.";
//   }
//   if (voltDropPercent > 4) {
//     return "Your receiving end voltage is higher than 4% of 400V, increase cable size and/or increase number of set.";
//   }
//   return "Your cable selection looks okay.";
// }

// getFormData function is already optimized
function getFormData() {
  const loadRating = parseInt(document.getElementById("load-rating").value);
  const powerFactor = parseFloat(document.getElementById("power-factor").value);
  const voltageRating = parseInt(
    document.getElementById("voltage-rating").value
  );
  const cableSize = parseInt(document.getElementById("cable-rating").value);
  const cableSet = parseInt(document.getElementById("cable-set").value);
  const distanceToLoad = parseInt(
    document.getElementById("distance-to-load").value
  );

  return {
    loadRating,
    powerFactor,
    voltageRating,
    cableSize,
    cableSet,
    distanceToLoad,
  };
}

// this renderLoadCurrent function is already refactored.
function renderLoadCurrent(ampere, voltage, power) {
  let loadType = "";
  let loadValue = "";

  switch (loadRatingOption.value) {
    case "kW":
      loadType = "kW";
      loadValue = `${power}${loadType}`;
      break;
    case "kVA":
      loadType = "kVA";
      loadValue = `${power}${loadType}`;
      break;
    case "hp":
      loadType = "hp";
      loadValue = `${power}${loadType}`;
      break;
    case "A":
      loadValue = `${ampere}A`;
      break;
    default:
      break;
  }

  const loadDescription = loadType
    ? `Load current of ${loadValue} at ${voltage}V is`
    : `Load current is`;

  const showFlc = document.getElementById("show-flc");
  showFlc.innerHTML = `
    <h5>3 Phase Load Current</h5>
    <article># ${loadDescription} <span>${ampere}A.</span></article>
  `;
}

function renderCableAmpacity(sqmm, cableSet, cableAmpacity, cableVD) {
  document.getElementById("show-ampacity").innerHTML = `
      <h5>Selected Cable Ampacity & Volt Drop</h5>
      <article># Current carrying capacity of ${sqmm}sqmm cable is <span>${cableAmpacity}A.</span></article>     
      <article># Current carrying capacity of ${cableSet} set/sets of ${sqmm}sqmm cable is <span>${
    cableAmpacity * cableSet
  }A.</span></article>   
  <article># Cable Impedance is <span>${cableVD}mV/A/m.</span></article>   
    `;
}

function styleResult() {
  const resultElements = document.querySelectorAll(
    "#show-flc, #show-ampacity, #show-vd, #suggestion"
  );

  resultElements.forEach((element) => {
    element.style.padding = "20px";
    element.style.borderRadius = "20px";
    element.style.color = "#3E5E66";
    element.style.border = "1px solid #3E5E66";
  });
}
