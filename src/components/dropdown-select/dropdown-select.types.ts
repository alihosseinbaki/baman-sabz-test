export interface IMovie {
    id: number;
    title: string;
    genre: string;
}

export type GroupedMovies = {
    genre: string;
    items: IMovie[];
};

export interface IDropdownSelectAdvancedProps {
    items: IMovie[]
}


export type Item = | { type: 'group'; genre: string }
    | { type: 'item'; movie: IMovie }

export type RowProps = {
    items: Item[];
};