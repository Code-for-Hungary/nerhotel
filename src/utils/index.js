const OWNER = "person:owner";
const MANAGER = "person:manager";

const reduceByName = (map, person) => {
    if (!map.has(person.name)) {
        map.set(person.name, person);
    } else {
        person.type = `${map.get(person.name).type}, ${person.type}`;
        map.set(person.name, person);
    }

    return map;
};

/**
 * @param {{name: string, link: string}[]} oligarchs
 * @param {{name: string, link: string}[]} ceos
 * @returns {{name: string, data: {name: string, link: string, type: string}}[]}
 */
export function getOligarchData(oligarchs, ceos) {
    const oligarchsWithType = oligarchs.map((person) => ({
        ...person,
        type: OWNER,
    }));
    const ceosWithType = ceos.map((person) => ({ ...person, type: MANAGER }));
    const allOligarchsWithType = [...oligarchsWithType, ...ceosWithType];
    const oligarchMap = allOligarchsWithType.reduce(reduceByName, new Map());

    return Array.from(oligarchMap.entries()).map(([name, data]) => ({
        name,
        data,
    }));
}
