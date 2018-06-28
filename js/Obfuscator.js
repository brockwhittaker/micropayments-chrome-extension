const Obfuscator = (() => {
  const funcs = {
    getAllTextNodes: (elem) => {
      const children = elem.childNodes;

      const all_children = [];
      children.forEach(child => {
        if (child.nodeType !== 3 && child.childNodes.length > 0) {
          all_children.push.apply(all_children, funcs.getAllTextNodes(child));
        } else if (child.nodeType === 3) {
          all_children.push(child);
        }
      });

      return all_children;
    },

    obfuscateString: (() => {
      const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lower = upper.toLowerCase();
      return (str) => {
        let new_str = ``;

        for (let x = 0; x < str.length; x++) {
          if (str.charAt(x) !== " ") {
            const code = str.charCodeAt(x);
            let char = Math.floor(Math.random() * 26);

            if (code > 64 && code < 91) {
              new_str += upper.charAt(char);
            } else if (code > 91) {
              new_str += lower.charAt(char);
            }
          } else {
            new_str += str.charAt(x);
          }
        }

        return new_str;
      };
    })(),

    obfuscateNode: (node) => {
      if (node.innerText || node.parentNode.tagName === "SCRIPT") return;
      node.innerText = node.textContent;
      node.textContent = funcs.obfuscateString(node.textContent);
    },

    deobfuscateNode: (node) => {
      if (node.innerText) {
        node.textContent = node.innerText;
        delete node.innerText;
      }
    },
  };


  class Obfuscator {
    constructor (elem) {
      this.elem = elem;
    }

    static deobfuscate () {
      document.querySelectorAll(".portico--obfuscate-on").forEach(o => new Obfuscator(o).deobfuscate());
    }

    obfuscate () {
      this.elem.classList.add("portico--obfuscate-on");
      const children = funcs.getAllTextNodes(this.elem);
      children.forEach(funcs.obfuscateNode);
    }

    deobfuscate () {
      this.elem.classList.remove("portico--obfuscate-on");
      const children = funcs.getAllTextNodes(this.elem);
      children.forEach(funcs.deobfuscateNode);
    }
  }

  return Obfuscator;
})();
