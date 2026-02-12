import type {CSSProperties, ReactElement} from "react";

export interface IMovie {
    id: number;
    title: string;
    genre: string;
}

export type GroupedMovies = {
    genre: string;
    items: IMovie[];
}

export interface IDropdownSelectAdvancedProps {
    items: IMovie[]
}


export type Item = | { type: 'group'; genre: string }
    | { type: 'item'; movie: IMovie }

export type RowProps = {
    items: Item[];
}

export type RowComponentType = (
    props: {
        index: number;
        style: CSSProperties;
        items: Item[];
        ariaAttributes: {
            "aria-posinset": number;
            "aria-setsize": number;
            role: "listitem";
        };
    }
) => ReactElement | null;