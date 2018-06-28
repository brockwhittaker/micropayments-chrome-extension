class CustomStyleSheet {
  constructor () {
    this.elem = document.createElement("style");
    document.head.appendChild(this.elem);

    this.styleSheet = this.elem.sheet;
  }

  addRule (sel, object) {
    // this means they're providing an object of selectors and rules instead.
    if (typeof sel === "object") {
      for (let x in sel) {
        this.addRule(x, sel[x]);
      }
      return;
    }

    let str = "";
    for (let x in object) {
      str += `\t${x}: ${object[x]};\n`;
    }

    this.styleSheet.insertRule(`${sel} {\n${str}}`);

    return this;
  }
}
