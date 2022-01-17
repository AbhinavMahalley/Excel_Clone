// Storage
let collectedSheetDB = []; //Contains all SheetDB
let sheetDB = [];

{
    let addSheetBtn = document.querySelector(".sheet-add-icon");
    addSheetBtn.click();
    // handleSheetProperties();
}

// for(let i = 0; i < rows; i++){
//     let sheetRow = [];
//     for(let j=0; j < cols; j++){
//         let cellProp = {
//             bold: false,
//             italic: false,
//             underline: false,
//             alignment: "left",
//             fontFamily: "monospace",
//             fontSize: "14",
//             fontColor: "#000000",
//             BGcolor: "transparent", // Just for indication purpose
//             value: "",
//             formula: "",
//             children: [],
//         }
//         sheetRow.push(cellProp);
//     }
//     sheetDB.push(sheetRow);
// }

// Selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let fontCLR = document.querySelector(".fontCLR");
let BGcolor = document.querySelector(".BGcolor-prop");
let backgroundCLR = document.querySelector(".backgroundCLR");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];
// let addressBar = document.querySelector(".address-bar");
let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";


// Application of two-way biding
// Attach property listeners

// bold
bold.addEventListener("click", (e) =>{   
    let address =addressBar.value;
    let [cell, cellProp] = getCELLAndCellProp(address);

    // Modification
    cellProp.bold = !cellProp.bold; //Data change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";//UI change (1)
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;//UI change (2)
    cell.focus();
})

// italic
italic.addEventListener("click", (e) =>{   
    let address =addressBar.value;
    let [cell, cellProp] = getCELLAndCellProp(address);

    // Modification
    cellProp.italic = !cellProp.italic; //Data change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";//UI change (1)
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;//UI change (2)
    cell.focus();
})

// underline
underline.addEventListener("click", (e) =>{   
    let address =addressBar.value;
    let [cell, cellProp] = getCELLAndCellProp(address);

    // Modification
    cellProp.underline = !cellProp.underline; //Data change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";//UI change (1)
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;//UI change (2)
    cell.focus();
})

// font size
fontSize.addEventListener("change",(e) => {
    let address =addressBar.value;
    let [cell, cellProp] = getCELLAndCellProp(address);

    cellProp.fontSize = fontSize.value;//Data change
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
    cell.focus();
})

// fontfamily
fontFamily.addEventListener("change",(e) => {
    let address =addressBar.value;
    let [cell, cellProp] = getCELLAndCellProp(address);

    cellProp.fontFamily = fontFamily.value;//Data change
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
    cell.focus();
})

// font-color
fontColor.addEventListener("change", (e) => {
    let address =addressBar.value;
    let [cell, cellProp] = getCELLAndCellProp(address);

    cellProp.fontColor = fontColor.value;//Data change
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
    fontCLR.style.color  = cellProp.fontColor;
    cell.focus();
    
})

// background-color
BGcolor.addEventListener("change", (e) => {
    let address =addressBar.value;
    let [cell, cellProp] = getCELLAndCellProp(address);

    cellProp.BGcolor = BGcolor.value;//Data change
    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor;
    backgroundCLR.style.color  = cellProp.BGcolor;
    cell.focus();
})


// Alignment
alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e) => {
        let address =addressBar.value;
        let [cell, cellProp] = getCELLAndCellProp(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue;// Data change
        cell.style.textAlign = cellProp.alignment;//UI change (1)
        cell.focus();
        switch(alignValue){//UI change (2)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
    })
})

//onclick cell UI Update
let allCells = document.querySelectorAll(".cell");
for(let i = 0; i < allCells.length; i++ ){
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell){
// work
    cell.addEventListener("click", (e) => {
        // cell.style.border  = "2px solid green"; //ONCLICK BORDER COLOR GET GREEN
        let address = addressBar.value;
        let [rid, cid] = decodeRIDCIDFromAddress(address);
        let cellProp = sheetDB[rid][cid];

        // Apply cell properties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment;

        // Apply Properties UI Container
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        fontColor.value = cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor;
        fontCLR.style.color = cellProp.fontColor;
        backgroundCLR.style.color = cellProp.BGcolor;
        switch(cellProp.alignment){//UI change (2)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        };
        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;
    })
}


  

function getCELLAndCellProp(address){
   let [rid, cid] = decodeRIDCIDFromAddress(address)
    // Access cell & storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];

    return [cell, cellProp];
}

function decodeRIDCIDFromAddress(address){
    // address -> "A1"
    let rid=Number(address.slice(1))-1;
    let cid=Number(address.charCodeAt(0))-65; //"A"-> 65
    return [rid, cid];
}


