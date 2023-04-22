import { singleCoreH07RF, twoCoreH07RF } from "../utils/neoprene-cable.js";

const cableSpec = document.querySelector(".cable-selection-dropdown");
const tableContainer = document.querySelector("#table-container");

tableH07RFSingleCore(singleCoreH07RF);

cableSpec.addEventListener("change", () => {
  const selectedCableSpec = selectedCable();
  if (selectedCableSpec === "0.6/1kV H07RF 1 Core") {
    tableContainer.innerHTML = "";
    tableH07RFSingleCore(singleCoreH07RF);
  }

  if (selectedCableSpec === "0.6/1kV H07RF 2 Core") {
    tableContainer.innerHTML = "";
    tableH07RFSingleCore(twoCoreH07RF);
  }

  if (selectedCableSpec === "xxx") {
    tableContainer.innerHTML = "";
    tableContainer.innerHTML = "xxx cable";
  }
});

function selectedCable() {
  return document.querySelector(".cable-selection-dropdown").value;
}

function tableH07RFSingleCore(data) {
  const table = document.createElement("table");

  const headers = [
    "Formation",
    "Approximate Conductor Diameter",
    "Average Insulation Thickness",
    "Average Sheath Thickness",
    "Max External Diameter",
    "Max Electrical Resistance at 20°C",
    "Approx Weight",
    "Mobile Installation Amp 30",
    "Fixed Installation Amp 30",
    "Voltage Drop",
  ];

  const createTableCell = (content) => {
    const cell = document.createElement("td");
    cell.textContent = content;
    return cell;
  };

  const createTableRow = (data) => {
    const row = document.createElement("tr");
    Object.values(data).forEach((value) => {
      row.appendChild(createTableCell(value));
    });
    return row;
  };

  const createTableHeader = () => {
    const headerRow = createTableRow(headers);
    const thead = document.createElement("thead");
    thead.appendChild(headerRow);
    return thead;
  };

  const createTableBody = () => {
    const tbody = document.createElement("tbody");
    data.forEach((cable) => {
      tbody.appendChild(createTableRow(cable));
    });
    return tbody;
  };

  table.appendChild(createTableHeader());
  table.appendChild(createTableBody());
  tableContainer.appendChild(table);
}
