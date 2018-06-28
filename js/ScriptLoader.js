const ScriptLoader = () => {
  let count = 0;
  let loaded = 0;
  let deploy = null;
  let scriptsAfterLoad = [];

  return {
    add: script => {
      ++count;
      script.onload = () => {
        if (++loaded === count) scriptsAfterLoad.forEach(o => deploy(o));
      };
    },

    after: script => scriptsAfterLoad.push(script),

    onload: cb => deploy = cb,
  };
};
