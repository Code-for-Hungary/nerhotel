const OWNER = 'cégtulajdonos';
const MANAGER = 'cégvezető';

const reduceByName = (a, c) => {
  if (!a.has(c.name)) {
    a.set(c.name, c);
  } else {
    c.type = `${a.get(c.name).type}, ${c.type}`;
    a.set(c.name, c);
  }

  return a;
};

export const getOligarchData = (oligarchs, ceos) => {
  if (!oligarchs || !ceos) {
    return;
  }

  const oligarchsArr = oligarchs.map(i => (Object.assign(i, {type: OWNER})));
  const ceosArr = ceos.map(i => (Object.assign(i, {type: MANAGER})));

  const allOligarchs = [...oligarchsArr, ...ceosArr];
  const oligarchMap = allOligarchs.reduce(reduceByName, new Map());

  return Array.from(oligarchMap.entries()).map(([name, data]) => ({name, data}));
};
