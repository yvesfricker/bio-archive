// import type { PageServerLoad, Actions } from '../../$types';

import { fail, redirect, type Actions } from '@sveltejs/kit';
// import { getPool } from '$lib/server/pgClient';
// import format from 'pg-format'


import type { PageServerLoad } from './$types';
// import type { Indicator, Rule, Signal } from '$lib/types/dbschema';
// import type { RuleI } from '$lib/types/data';

import { supabase } from "$lib/clients/supabaseClient";


export const load: PageServerLoad = async ({ cookies, url }) => {
    // const user = await db.getUserFromSession(cookies.get('sessionid'));
    // return { user };

    try {
        // console.log("superbase client", supabase)
        const { data } = await supabase.from("products").select();
        // console.log("data", data)
        return {
            products: data ?? [],
        };

    } catch (err) {
        console.log(err)
        return { success: false }
    }


};

export const actions = {
    submitPlans: async ({ cookies, request }) => {

        let error = false
        console.log("in submit plans")
        const data = await request.formData()

        const dataJson = data.get("rulesJson")

        if (dataJson) {
            let parsedDataJson = await JSON.parse(dataJson)
            console.log(" test ok ?", parsedDataJson.wgwge, parsedDataJson)

            try {
                // const res = await pool.query(query.text, query.values).catch(console.error);
            } catch (err) {

                console.log("error in insert signal", err)
                error = true
            }

        } else {
            console.log("error: no data json to page.server.ts")
        }

        if (!error) {
            return { success: true }
        } else {
            return { success: false }
        }
    }
} satisfies Actions;






// { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
