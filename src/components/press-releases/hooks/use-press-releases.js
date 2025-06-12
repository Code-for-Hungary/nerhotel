import { useState, useEffect } from "react";

import { loadFirstPage, loadNextPage } from "../api";

export function usePressReleases(errorMessage, pageSize) {
    const [initialItemsLoading, setInitialItemsLoading] = useState(true);
    const [nextPageLoading, setNextPageLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        loadFirstPage()
            .then((data) => {
                setResults(data.results);
                setTotal(data.total);
                if (data.results.length < data.total) {
                    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
                }
            })
            .catch((e) => {
                console.error(e);
                alert(errorMessage);
            })
            .finally(() => {
                setInitialItemsLoading(false);
            });
    }, [errorMessage]);

    const loadMoreHandler = () => {
        setNextPageLoading(true);
        loadNextPage(pageSize * currentPage)
            .then((data) => {
                setResults((prevResults) => [...prevResults, ...data]);
                if (results.length < total) {
                    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
                }
            })
            .catch((e) => {
                console.error(e);
                alert(errorMessage);
            })
            .finally(() => {
                setNextPageLoading(false);
            });
    };

    return {
        total,
        results,
        loadMoreHandler,
        nextPageLoading,
        initialItemsLoading,
    };
}
