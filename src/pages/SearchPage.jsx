import { useLoaderData } from "react-router";

import { getApiUrl } from "../utils/api/get-api-url";

import { Search } from "../components/Search";

import Layout from "./Layout";

export async function clientLoader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    if (!q || q.trim().length === 0) {
        return [];
    }

    const req = await fetch(`${getApiUrl("search")}?q=${q}`);

    if (!req.ok) {
        throw new Error(`Failed to get results for query "${q}"`);
    }

    return await req.json();
}

export const SearchPage = () => {
    const results = useLoaderData();

    return (
        <Layout>
            <Search results={results} />
        </Layout>
    );
};
