
import pkg from 'cssjson';
const { toJSON } = pkg;
import {frameworks} from '$lib/frameworks'
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params, query }) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js
	const { framework } = params;
	const q = query.get('q') || ''
	const url = frameworks[framework]

	const res = await fetch(url);

	if (res.ok) {
		const css = await res.text()
		// let json = toJSON(css)
		let {children: json} = toJSON(css)
		
		json = Object.keys(json)
			.map( key=> ({
				name:key, 
				attributes: JSON.stringify(json[key]['attributes'],null,4).replace(/"/g,'').replace(/,/g,';')
			}) )
			.filter( el => el.name.indexOf(q.toLowerCase()) > -1 )	

		return {
			body: json
		};
	}

}