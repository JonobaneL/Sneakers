export const objectSort = (arr) => {
  const results = [];
  const res = arr.reduce((prev, current) => {
    return {
      ...prev,
      [current.id]: {
        ...current,
      },
    };
  }, {});

  Object.values(res).forEach((child) => {
    if (child.parent) {
      if (res[child.parent]) {
        const parent = res[child.parent];
        if (!parent.children) {
          parent.children = [];
        }

        parent.children.push(child);
      }
    } else {
      results.push(child);
    }
  });
  return results;
};

export const groupByObject = (arr, key) => {
  const res = arr.reduce((cache, item) => {
    const prop = item[key];
    if (prop in cache) return { ...cache, [prop]: cache[prop].concat(item) };
    else return { ...cache, [prop]: [item] };
  }, {});
  return res;
};
export const updateObject = (param, paramName, onChange) => {
  if (param.length == 0) {
    onChange((p) => {
      const currentFilter = { ...p };
      delete currentFilter[paramName];
      return { ...currentFilter };
    });
  } else {
    onChange((p) => {
      return { ...p, [paramName]: param };
    });
  }
};
