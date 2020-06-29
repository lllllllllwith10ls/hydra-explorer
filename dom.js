let hydras = ["","Limit"];
let indents = [1,1];
let expandMode = "Small Expansion";

function smallExpand(ord) {
  let pos = hydras.indexOf(ord);
  if(ord === succ(hydras[pos-1]) || ord === "") {
    return "";
  }
  let n = 0;
  while(compare(fs(ord,n),hydras[pos-1]) < 1) {
    n++;
  }
  hydras.splice(pos,0,fs(ord,n));
  indents.splice(pos,0,indents[pos]+1);
  update();
  return fs(ord,n);
}

function expand(ord) {
  while(ord !== "") {
    ord = smallExpand(ord);
  }
}
function toggle() {
  if(expandMode === "Small Expansion") {
    document.getElementById("expandType").innerHTML = "Regular Expansion";
    expandMode = "Regular Expansion";
  } else {
    document.getElementById("expandType").innerHTML = "Small Expansion";
    expandMode = "Small Expansion";
  }
  update();
}

function update() {
  let thing = document.getElementById("hydras");
  thing.innerHTML = "";
  for(let i = 0; i < hydras.length; i++) {
    let hydra = document.createElement("div");
    hydra.innerHTML = "'" + hydras[i] + "'";
    hydra.style.marginLeft = indents[i]*10 + "px";
    if(expandMode === "Small Expansion") {
      hydra.onclick = function(){smallExpand(hydras[i]);};
    } else {
      hydra.onclick = function(){expand(hydras[i]);};
    }
    thing.appendChild(hydra);
  }
}