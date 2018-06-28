const siteFuncs = {
  nytimes: async (html) => {
    styleSheet.addRule(".show-more", {
      "width": "630px",
      "margin-left": "auto",
      "margin-right": "auto",
    });

    const elem = document.createElement("div");
    elem.innerHTML = html;
    const app = elem.querySelector("article#story");

    document.body.querySelector("article#story").outerHTML = app.outerHTML;
    // document.querySelectorAll(".obfuscate--blur").forEach(o => new Obfuscator(o).obfuscate())

    const $paywall = document.querySelector("paywall");

    (() => {
      const start = new Date();

      // check every two seconds if the React script on the NYT site has replaced
      // my <paywall> element with some random garbage, and if it has, re-replace
      // it manually. This is kind of janky, but I don't really know a better way.
      let interval = setInterval(function () {
        if (!document.contains($paywall)) {
          const after = document.querySelectorAll(".StoryBodyCompanionColumn")[1];
          after.parentNode.insertBefore($paywall, after);
          document.querySelector("paywall").parentNode.replaceChild($paywall, document.querySelector("paywall"));
          // document.querySelectorAll(".obfuscate--blur").forEach(o => new Obfuscator(o).obfuscate());
          console.log("React sucks.");

          clearInterval(interval);
        } else {
          // time out after 5 seconds, because the page is probably fine then.
          if (new Date() - start > 5000) clearInterval(interval);
        }
      }, 200);
    })();
  },

  wsj: async (html) => {
    styleSheet.addRule("button.material", { "font-size": "1.2em !important" });
    const elem = document.createElement("html");
    elem.innerHTML = html;
    const $paywall = elem.querySelector("article[maincontentofpage]");

    document.body.querySelector("article[maincontentofpage]").outerHTML = $paywall.outerHTML;
  },

  ft: async (html) => {
    styleSheet.addRule({
      "button.material": {
        "font-size": "1.2em !important",
        "outline": "#fff1e5 solid 10px !important",
        "background": "#fff1e5 !important"
      },
      ".show-more": {
        "width": "700px !important",
        "margin": "20px 0px 0px 120px !important",
      },
    });

    const elem = document.createElement("html");
    elem.innerHTML = html;
    const $content = elem.querySelector(".n-layout__row--content");

    elem.querySelectorAll("style").forEach(style => {
      document.head.appendChild(style);
    });

    document.body.querySelector(".n-layout__row--content").outerHTML = $content.outerHTML;
  },

  washingtonpost: async (html, payload) => {
    const { url } = payload;

    window.history.pushState({}, null, url);

    const elem = document.createElement("html");
    elem.innerHTML = html;
    const $content = elem.querySelector(".paywall");

    document.body.querySelector(".paywall").outerHTML = $content.outerHTML;
  },
};
