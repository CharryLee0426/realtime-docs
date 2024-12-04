import { parseAsString, useQueryState } from "nuqs";

// Explain
// const [x, setX] = useState();
// const [urlX, setUrlX] = useQueryState();
// will do the following work:
// ?urlX=<example>

export function useSearchParam() { // (key: string)
    return useQueryState(
        "search",
        parseAsString.withDefault("").withOptions({
            clearOnDefault: true // for prevent ?urlX= if the search content is undefined | null
        }),
    );
}