import { useSearchParams } from "react-router";

import { Search } from "../components/Search";

import Layout from "./Layout";

export const SearchPage = () => {
    const [searchParams] = useSearchParams();

    return (
        <Layout>
            <Search query={searchParams.get("q") || ""} />
        </Layout>
    );
};
