let rows = 100;
let cols = 26;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");

for(let i = 0; i < rows ; i++){
let addressCol = document.createElement("div");
addressCol.setAttribute("class","address-col");
addressCol.innerText = i+1;
addressColCont.appendChild(addressCol);
}


for(let i = 0; i < cols; i++){
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class","address-row");
    addressRow.innerText = String.fromCharCode(65+i);
    addressRowCont.appendChild(addressRow);
}


for(let i = 0; i < rows ; i++){
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class","row-cont");
    for(let j = 0 ; j < cols; j++){
        let cell = document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("contenteditable","true");
        cell.setAttribute("spellcheck","false");
        //Attributes for cell and storage identification
        cell.setAttribute("rid",i); // row id
        cell.setAttribute("cid",j);// cell id
        rowCont.appendChild(cell);
        addListenerForAddressBarDisplay(cell, i, j);
        // cellSelectAndDeselect(cell);
        
    }
    cellsCont.appendChild(rowCont);
}
    function addListenerForAddressBarDisplay(cell, i , j){
cell.addEventListener("click",(e)=>{
    let rowId = i+1;
    let colID = String.fromCharCode(65 + j);
    addressBar.value = `${colID}${rowId}`;
    // getCSS(cell);
 })
}

// function cellSelectAndDeselect(cell){
//     cell.addEventListener("blur", (e) => {
//         cell.style.border = "1px solid #dfe4ea";
        
//     })
//     cell.addEventListener("focus", (e) => {
//         cell.style.border = "2px solid green";
        
//     })
// }

// function getCSS(element) {
//     var css_data = '';
//     var css_obj = getComputedStyle(element);
//     for (var i = 0; i < css_obj.length; i++) {
//         css_data +=
//             css_obj[i] + ':' + css_obj
//                 .getPropertyValue(css_obj[i])+"\n";
//                 // console.log(typeof(css_obj[i]));
//                 if(css_obj[i] == "width" ){
//                     console.log(css_obj.getPropertyValue(css_obj[i]))
//                     if(css_obj.getPropertyValue(css_obj[i])> "80px"){
//                         console.log(true);
//                     }
//                 }
//     }
// //    console.log(css_data);
//     return;
// }



