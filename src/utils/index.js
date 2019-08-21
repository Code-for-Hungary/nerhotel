const OWNER = 'cégtulajdonos';
const MANAGER = 'cégvezető';

export const getOligarchData = (data) => {
	if (!data.oligarch || !data.ceo) {
		return
	}
	const oligarchs = data.oligarch.filter(ol => ol !== '').map(i => ({type: OWNER, name: i}))
	const ceos = data.ceo.filter(ol => ol !== '').map(i => ({type: MANAGER, name: i}))

	const allOligarchs = [...oligarchs, ...ceos]
	const oligarchMap = allOligarchs.reduce((a, c) => {
	  if (!a.has(c.name)) {
	      a.set(c.name, c.type)
	  } else {
	      const type = `${a.get(c.name)}, ${c.type}`
	      a.set(c.name, type)
	  }

	  return a
	}, new Map())

	return Array.from(oligarchMap.entries()).map(([name, type]) => ({name, type}))
}
