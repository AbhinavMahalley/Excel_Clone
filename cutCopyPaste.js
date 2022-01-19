let ctrlKey;
document.addEventListener("keydown",(e) =>{
    ctrlKey = e.ctrlKey;//true
})
document.addEventListener("keyup",(e) =>{
    ctrlKey = e.ctrlKey;//false
})

for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleSelectedCells(cell);
        cellSelectAndDeselect(cell);
    }
}


    

let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");


let rangeStorage = [];
function handleSelectedCells(cell){
    cell.addEventListener("click", (e) => {
        // Select cells range work
        if(!ctrlKey) return;
        if(rangeStorage.length >= 2) {
            defaultSelectedCellsUI();
            rangeStorage = [];
        }
        if(rangeStorage.length == 0){
            for(let i = 0; i < rows; i++){
                for(let j = 0; j < cols; j++){
                    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
                    cell.style.border = "1px solid #dfe4ea";
                }
            }
        }
        // UI
        cell.style.border = "3px solid #218c74"

        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        rangeStorage.push([rid,cid]);
    })
}

function defaultSelectedCellsUI(){
    for(let i = 0; i < rangeStorage.length;i++){
        let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
        cell.style.border = "1px solid #dfe4ea";
    }
}



let copyData = [];
copyBtn.addEventListener("click",(e) => {
    // if(rangeStorage.length < 2) return;
    copyData  = [];

    // let strow = rangeStorage[0][0]; //start row
    // let stcol = rangeStorage[0][1]; //start col
    // let endrow = rangeStorage[1][0]; //end row
    // let endcol = rangeStorage[1][1]; //end col
    let [strow, stcol, endrow, endcol] = [rangeStorage[0][0], rangeStorage[0][1], rangeStorage[rangeStorage.length-1][0],  rangeStorage[rangeStorage.length-1][1]];

    for(let i = strow; i <= endrow; i++){
        let copyRow = [];
        for(let j = stcol; j <= endcol; j++){
            let cellProp = sheetDB[i][j];
            copyRow.push(cellProp);
        }
        copyData.push(copyRow);
    }
    // console.log(copyData);
    defaultSelectedCellsUI();
})

cutBtn.addEventListener("click",(e) => {
    // if(rangeStorage.length < 2) return;

    let [strow, stcol, endrow, endcol] = [rangeStorage[0][0], rangeStorage[0][1], rangeStorage[rangeStorage.length-1][0],  rangeStorage[rangeStorage.length-1][1]];

    for(let i = strow; i <= endrow; i++){
        for(let j = stcol; j <= endcol; j++){
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);

            //DB
            let cellProp = sheetDB[i][j];
            cellProp.value = "";
            cellProp.bold = false;
            cellProp.italic = false;
            cellProp.underline = false;
            cellProp.fontSize = 14;
            cellProp.fontFamily = "monospace";
            cellProp.fontColor = "#000000";
            cellProp.BGcolor = "transparent";
            cellProp.alignment = "left";

            //UI
            cell.click();
        }
    }

    defaultSelectedCellsUI();
    rangeStorage = [];
})

pasteBtn.addEventListener("click",(e) => {
    // if(rangeStorage.length < 2) return;
    let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[rangeStorage.length-1][0]);
    let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[rangeStorage.length-1][1]);

    // Target
    let address = addressBar.value;
    let [stRow,stCol] = decodeRIDCIDFromAddress(address);

    // r -> refers copydata row
    // c -> refers copydata col
    for(let i = stRow, r = 0; i <= stRow + rowDiff; i++, r++){
        for(let j = stCol, c = 0; j <= stCol + colDiff; j++, c++){
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if(!cell) continue;
            // DB
            let data = copyData[r][c];
            let cellProp = sheetDB[i][j];
            cellProp.value = data.value;
            cellProp.bold = data.bold;
            cellProp.italic = data.italic;
            cellProp.underline = data.underline;
            cellProp.fontSize = data.fontSize;
            cellProp.fontFamily = data.fontFamily;
            cellProp.fontColor = data.fontColor;
            cellProp.BGcolor = data.BGcolor;
            cellProp.alignment = data.alignment;
            console.log(data.fontSize);
            // UI
            cell.click();
        
        }
    }
    rangeStorage = [];
})


function cellSelectAndDeselect(cell){

    cell.addEventListener("focus", (e) => {
        if(ctrlKey) return;
//         rangeStorage = [];
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
                cell.style.border = "1px solid #dfe4ea";
            }
        }
        cell.style.border = "2px solid green"; 
        cell.click();
    })
}

