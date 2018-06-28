let styleSheet;

let TEMP_PATH = null; `https://flu.io`;
let API_PATH = TEMP_PATH || `http://localhost:1337`;

const utils = {
  // this theoretically gets the correct domain name, but will probably break
  // with `.co.uk` or other tlds that have two dots.
  getDomainFromHost: () => {
    let { host } = window.location;
    host = host.split(/\./g);
    host.pop();

    return host.pop();
  },

  functionForDomain: async domain => {
    const cssRules = GenericCSSRules();

    styleSheet.addRule(cssRules);

    document.querySelectorAll(".StoryBodyCompanionColumn, article[maincontentofpage]").forEach(o => {
      o.classList.add("portico--transition");
      o.classList.add("portico--hide");
    });

    if (siteFuncs[domain]) {
      const url = window.location.href;

      console.log("url: ", url);

      console.log(`Sending request to: ${`${API_PATH}/fetch/`}, ${url}`)
      const html = await (await fetch(`${API_PATH}/fetch/`, {
        body: JSON.stringify({ url }),
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        headers: {
          'Content-Type': 'application/json'
        },
      })).text();

      // this is not a valid page to run on.
      if (html === "") return;

      return siteFuncs[domain](html, { url });
    }
    else return () => console.log(`This site has no function.`);
  },

  loadScripts: () => {
    // the embedded scripts using `innerHTML` need to be deployed after all other
    // scripts have loaded because they run async.
    const scriptLoader = ScriptLoader();

    scriptLoader.onload(script => document.body.appendChild(script));

    document.querySelectorAll(".portico-script").forEach(script => {
      script.parentNode.removeChild(script);

      const new_script = document.createElement("script");

      new_script.classList.add("portico-script");
      if (script.src.length > 0) {
        new_script.src = script.src;
        scriptLoader.add(new_script);
        document.body.appendChild(new_script);
      } else {
        new_script.innerHTML = script.innerHTML;
        scriptLoader.after(new_script);
      }
    });
  },
};

let hasRun = false;
document.onreadystatechange = async function (e) {
  if (!hasRun) {
    hasRun = true;

    styleSheet = new CustomStyleSheet();

    let domain = utils.getDomainFromHost();
    await utils.functionForDomain(domain);
    utils.loadScripts();
  }
};
