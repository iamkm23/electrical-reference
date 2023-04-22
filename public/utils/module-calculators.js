function calculateThreePhaseCurrent(power, voltage, pf) {
  return (power * 1000) / (1.732 * voltage * pf);
}

function calculateSinglePhaseCurrent(power, voltage, pf) {
  return (power * 1000) / (voltage * pf);
}

function calculateVoltageDrop(distance, current, impedance, cableSet) {
  return (current * distance * impedance) / (1000 * cableSet);
}

export {
  calculateThreePhaseCurrent,
  calculateSinglePhaseCurrent,
  calculateVoltageDrop,
};
