import { useLayoutEffect, useState } from "react";

function useWindowSize() {
    const [size, setSize] = useState(() => [
        typeof window !== "undefined" ? window.innerWidth : 0,
        typeof window !== "undefined" ? window.innerHeight : 0,
    ]);

    useLayoutEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", updateSize);

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return size;
}

export default useWindowSize;
