function succ(ord) {
  return ord+"[]";
}

function activePart(ord) {
  let parentheses = 1;
  let parenType = ord[ord.length-1];
  let parenType2 = " ";
  if(parenType === ">") {
    parenType2 = "<";
  } else if(parenType === "]") {
    parenType2 = "[";
  }
  let i = ord.length-2;
  for(i; i >= 0; i--) {
    if(ord[i] === parenType) {
      parentheses++;
    }
    
    if(ord[i] === parenType2) {
      parentheses--;
    }
    
    if(parentheses === 0) {
      break;
    }
  }
  return ord.slice(i);
}
function inactivePart(ord) {
  let parentheses = 1;
  let parenType = ord[ord.length-1];
  let parenType2 = " ";
  if(parenType === ">") {
    parenType2 = "<";
  } else if(parenType === "]") {
    parenType2 = "[";
  }
  let i = ord.length-2;
  for(i; i >= 0; i--) {
    if(ord[i] === parenType) {
      parentheses++;
    }
    
    if(ord[i] === parenType2) {
      parentheses--;
    }
    
    if(parentheses === 0) {
      break;
    }
  }
  return ord.slice(0,i);
}

function level(ord) {
  ord = activePart(ord);
  let parentheses = 1;
  let parenType = ord[1];
  let parenType2 = " ";
  if(parenType !== "<") {
    return "";
  } else {
    parenType2 = ">";
  }
  let i = 2;
  for(i; i < ord.length; i++) {
    if(ord[i] === parenType) {
      parentheses++;
    }
    
    if(ord[i] === parenType2) {
      parentheses--;
    }
    
    if((ord[i] !== parenType && ord[i] !== parenType2 && parentheses <= 0) || parentheses < 0) {
      break;
    }
  }
  return ord.slice(1,i);
}
function clean(ord) {
  if(ord === "" || ord === "Limit") {
    return ord;
  }
  let arrayOrd = [];
  while(ord.length > 0) {
    arrayOrd.unshift(activePart(ord));
    ord = inactivePart(ord);
  }
  for(let i = 0; i < arrayOrd.length; i++) {
    let bracketType = arrayOrd[i][0];
    let bracketType2 = arrayOrd[i][arrayOrd[i].length-1];
    if(arrayOrd[i] === undefined) {
      console.log("aaa");
    }
    arrayOrd[i] = arrayOrd[i].substring(1,arrayOrd[i].length-1);
    arrayOrd[i] = bracketType + clean(arrayOrd[i]) + bracketType2;
  }
  
  
  let changed = true;
  while(changed) {
    changed = false;
    for(let i = arrayOrd.length-1; i > 0; i--) {
      if(compare(arrayOrd[i-1],arrayOrd[i]) === -1) {
        
        arrayOrd.splice(i-1,1);
        changed = true;
      }
    }
  }
  ord = "";
  for(let i = 0; i < arrayOrd.length; i++) {
    ord += arrayOrd[i];
  }
  return ord;
}

function compare(ord1,ord2) {
  if(ord1 === undefined) {
    console.log("aaa");
    return 0;
  } 
  ord1 = clean(ord1);
  ord2 = clean(ord2);
  
  if(ord1 === ord2) {
    return 0;
  }
  if(ord1[0] === "<" && ord2[0] !== "<") {
    return 1;
  } else if(ord1[0] !== "<" && ord2[0] === "<") {
    return -1;
  } else if(ord1 === "" && ord2 !== "") {
    return -1;
  } else if(ord1 !== "" && ord2 === "") {
    return 1;
  } else if(ord1 === "Limit" && ord2 !== "Limit") {
    return 1;
  } else if(ord1 !== "Limit" && ord2 === "Limit") {
    return -1;
  } else {
    let arrayOrd1 = [];
    while(ord1.length > 0) {
      arrayOrd1.unshift(activePart(ord1));
      ord1 = inactivePart(ord1);
    }
    
    let arrayOrd2 = [];
    while(ord2.length > 0) {
      arrayOrd2.unshift(activePart(ord2));
      ord2 = inactivePart(ord2);
    }
    let length = 0;
    if(arrayOrd1.length < arrayOrd2.length) {
      length = arrayOrd1.length;
    } else {
      length = arrayOrd2.length;
    }
    for(let i = 0; i < length; i++) {   
      if(compare2(arrayOrd1[i],arrayOrd2[i]) === -1) {
        return -1;
      } else if(compare2(arrayOrd1[i],arrayOrd2[i]) === 1) {
        return 1;
      }
    }
    if(arrayOrd1.length > length) {
      return 1;
    } else if(arrayOrd2.length > length) {
      return -1;
    } else {
      return 0;
    }
  }
}
function compare2(ord1,ord2) {
  if(ord1 === undefined) {
    console.log("aaa");
    return 0;
  } 
  ord1 = clean(ord1);
  ord2 = clean(ord2);
  
  if(ord1 === ord2) {
    return 0;
  }
  if(ord1[0] === "<" && ord2[0] !== "<") {
    return 1;
  } else if(ord1[0] !== "<" && ord2[0] === "<") {
    return -1;
  } else if(ord1 === "" && ord2 !== "") {
    return -1;
  } else if(ord1 !== "" && ord2 === "") {
    return 1;
  } else if(ord1 === "Limit" && ord2 !== "Limit") {
    return 1;
  } else if(ord1 !== "Limit" && ord2 === "Limit") {
    return -1;
  } else {
    ord1 = ord1.substring(1,ord1.length-1);
    let arrayOrd1 = [];
    while(ord1.length > 0) {
      arrayOrd1.unshift(activePart(ord1));
      ord1 = inactivePart(ord1);
    }
    
    ord2 = ord2.substring(1,ord2.length-1);
    let arrayOrd2 = [];
    while(ord2.length > 0) {
      arrayOrd2.unshift(activePart(ord2));
      ord2 = inactivePart(ord2);
    }
    let length = 0;
    if(arrayOrd1.length < arrayOrd2.length) {
      length = arrayOrd1.length;
    } else {
      length = arrayOrd2.length;
    }
    for(let i = 0; i < length; i++) {   
      if(compare(arrayOrd1[i],arrayOrd2[i]) === -1) {
        return -1;
      } else if(compare(arrayOrd1[i],arrayOrd2[i]) === 1) {
        return 1;
      }
    }
    if(arrayOrd1.length > length) {
      return 1;
    } else if(arrayOrd2.length > length) {
      return -1;
    } else {
      return 0;
    }
  }
}

function fs(ord,n) {
  ord = clean(ord);
  if(ord === "Limit") {
  return "[[" + "<".repeat(n) + ">".repeat(n) + "]]";
  } else if(cof(ord) === "" || (cof(ord) === "[]" && n > 0)) {
    return ">:C";
  } else if(cof(ord) === "[]" && n == 0) {
    return ord.substring(0,ord.length-2);
  } else if(cof(ord) === "[[]]") {
    let x = activePart(ord);
    let bracketType = x[0];
    let bracketType2 = x[x.length-1];
    let y = x.substring(1,x.length-1);
    let c = cof(y);
    if(cof(c) === "[]") {
      ord = inactivePart(ord);
      y = y.substring(0,y.length-2);
      x = bracketType + y + bracketType2;
      return ord+x.repeat(n);
    } else if(cof(c) === "[[]]") {
      ord = inactivePart(ord);
      y = fs(y,n);
      x = bracketType + y + bracketType2;
      return ord+x;
    } else if(cof(level(x)) === "[[]]") {
      let lev = level(x);
      x = nonlevel(x);
      lev = fs(lev,n);
      x = bracketType + lev + x + bracketType2;
      return ord+x;
    } else {
      ord = inactivePart(ord);
      y = expandType(x)[0].repeat(n)+expandType(x)[1].repeat(n);
      x = bracketType + y + bracketType2;
      return ord + x;
    }
  }
}

function expandType(ord) {
  if(cof(ord.substring(1,ord.length-1)) === "<>") {
    return reduceLevel(ord);
  }
  let active = activePart(ord);
  active = active.substring(1,active.length-1);
  let active2 = "";
  if(cof(level(active)) !== "<>" && cof(level(active)) !== "" && active[0] !== "<") {
    active2 = level(active);
    active2 = activePart(active2); 
  } else {
    active2 = activePart(active); 
  }
  let pos = ord.lastIndexOf(active2);
  while(active2 !== cof(active)) {
    if(cof(level(active2)) !== "<>" && cof(level(active2)) !== "" && active[0] !== "<") {
      let active3 = level(active2);
      active3 = activePart(active3); 
      pos += active2.lastIndexOf(active3);
      active2 = active3;
    } else {
      let active3 = active2.substring(1,active2.length-1);
      active3 = activePart(active3); 
      pos += active2.lastIndexOf(active3);
      active2 = active3;
    }
  }
  let thingy = "";
  let i = 2;
  for(i; i < ord.length; i++) {
    if(ord[i] !== "<" && ord[i] !== ">") {
      break;
    }
  }
  thingy = ord.substring(1,i);
  if(thingy !== expandType(active2)[0]) {
    if(level(ord) === "") {
      return [ord.substring(1,pos)+expandType(active2)[0],expandType(active2)[1]+ord.substring(pos+active2.length,ord.length-1)];
    } else {
      return [expandType(active2)[0],expandType(active2)[1]];
    }
  } else {
    return [expandType(active2)[0],expandType(active2)[1]];
  }
}

function reduceLevel(ord) {
  if(level(ord) === "") {
    return "";
  }
  let active = activePart(ord);
  active = level(active);
  let active2 = activePart(active);
  let parentActive = active;
  let pos = ord.lastIndexOf(active2);
  let posParent = ord.lastIndexOf(parentActive);
  while(active2 !== "<>") {
    if(level(active2) === "") {
      let active3 = active2.substring(1,active2.length-1);
      active3 = activePart(active3); 
      posParent = pos;
      pos += active2.lastIndexOf(active3);
      parentActive = active2;
      active2 = active3;
    } else {
      let active3 = level(active2);
      active3 = activePart(active3); 
      posParent = pos;
      pos += active2.lastIndexOf(active3);
      parentActive = active2;
      active2 = active3;
    }
  }
  return [ord.substring(0,pos),ord.substring(pos+active2.length)];
}

function cof(ord) {
  if(ord === "" || ord === "<>") {
    return ord;
  } else {
    let x = activePart(ord);
    if(x === "[]") {
      return "[]";
    } else if(x === "<>") {
      return "<>";
    } else {
      let c = cof2(x);
      if(c === "[]")   {
        return "[[]]";
      } else if(level(ord) === "" && ord[0] !== "<") {
         return "[[]]";
      } else if(c === "[[]]" || compare(ord,c) > 0) {
         return c;
      } else if(cof(level(ord)) !== "<>" && cof(level(ord)) !== "") {
         return cof(level(ord));
      } else {
        return ord;
      }
    }
  }
}

function cof2(ord) {
  if(ord === "" || ord === "<>") {
    return ord;
  } else {
    let x = activePart(ord);
    if(x === "[]") {
      return "[]";
    } else if(x === "<>") {
      return "<>";
    } else {
      x = x.substring(1,x.length-1);
      let c = cof(x);
      if(c === "[]")   {
        return "[[]]";
      } else if(level(ord) === "" && ord[0] !== "<") {
         return "[[]]";
      } else if(c === "[[]]" || compare(ord,c) >= 0) {
         return c;
      } else if(cof(level(ord)) !== "<>" && cof(level(ord)) !== "") {
         return cof(level(ord));
      } else {
        return ord;
      }
    }
  }
}

