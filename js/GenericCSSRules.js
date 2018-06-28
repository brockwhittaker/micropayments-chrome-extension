const GenericCSSRules = () => {
  return {
    ".obfuscate--blur": {
      "-webkit-filter": "blur(5px)",
    },

    ".show-more": {
      "text-align": "center",
    },

    ".show-more": {
      "margin-bottom": "40px",
    },

    ".show-more::before": {
      content: "' '",
      width: "100%",
      "border-bottom": "1px solid #00000018",
      display: "block",
      position: "relative",
      top: "20px",
      "z-index": "0",
    },

    ".show-more .show-paywall, .show-more .show-content": {
      "text-align": "center",
    },

    ".show-more.show .show-paywall": {
      display: "none",
    },

    ".show-more .show-content": {
      display: "none",
    },

    ".show-more.show .show-content": {
      display: "block",
    },

    ".show-content a": {
      color: "inherit",
    },

    ".show-content button": {
      margin: "0px 5px",
    },

    ".show-content button.material": {
      padding: "10px",
    },

    "button.material > span": {
      display: "inline-block",
      "vertical-align": "top",
      padding: "5px",
    },

    "button.material > span:first-of-type": {
      "border-right": "1px solid #00000018",
      "padding-right": "10px",
    },

    "button.material > span:last-of-type": {
      "padding-left": "10px",
    },

    "button.material": {
      position: "relative",
      display: "inline-block",
      "vertical-align": "top",
      "font-weight": "normal",
      padding: "5px",
      border: "1px solid #00000030",
      "border-radius": "5px",
      background: "#fff",
      "font-size": "0.8em",

      color: "inherit",

      outline: "10px solid #fff",
    },

    "button.material:hover, button.material:focus": {
      "border-color": "#00000080",
    },

    ".more-content.show": {
      opacity: "1",
    },

    ".portico--transition": {
      transition: "all 0.3s ease",
    },

    ".portico--transition.portico--hide": {
      opacity: 0,
      "pointer-events": "none",
    },

    "[data-opportunity-subtype]": {
      opacity: 0,
      "pointer-events": "none",
      transition: "all 0.3s ease",
    },

    "paywall": {
      display: "block",
    },

    // wsj
    ".show-content a": {
      color: "inherit !important",
    },

    // nytimes
    "div[class^='DockGateway-gateway'], div[class^='Gateway'], .shown": {
      display: "none",
    },

    // this may interfere with other sites, but we'll see.
    "[data-reactroot], [data-reactroot] > div": {
      overflow: "auto !important",
    },

    // washington post
    ".wp_signin, #wp_Signin": {
      display: "none !important",
    },

    "body.pb-theme-normal": {
      "overflow-y": "auto !important",
    },
  };
};
