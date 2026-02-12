import {
    Combobox, ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx'
import {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import type {ReactElement} from "react";
import {ChevronDownIcon} from "@heroicons/react/16/solid";
import "./dropdown-select.css";
import {CheckboxField} from "../checkbox-field/CheckboxField.tsx";
import {List, type RowComponentProps} from 'react-window';
import type {
    GroupedMovies,
    IDropdownSelectAdvancedProps,
    IMovie,
    Item,
    RowProps
} from "./dropdown-select.types.ts";


const ITEM_HEIGHT = 36;
const GROUP_HEIGHT = 28;

function rowHeight(index: number, { items }: RowProps) {
    switch (items[index].type) {
        case "group": {
            return GROUP_HEIGHT;
        }
        case "item": {
            return ITEM_HEIGHT;
        }
    }
}


const RowComponent = (
    {
        index,
        items,
        style
    }: RowComponentProps<{ items: Item[] }>) => {

    const option = items[index];

    if (option.type === 'group') {
        return (
            <div
                style={style}
                className="group-movies__title"
            >
                {option.genre}
            </div>
        );
    }

    return (
        <div style={style}>
            <ComboboxOption
                value={option.movie}
                className="group flex items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
            >
                <CheckIcon
                    className={clsx(
                        'size-5',
                        !selectedItems.some(
                            i => i.id === option.movie.id
                        ) && 'invisible'
                    )}
                />
                {option.movie.title}
            </ComboboxOption>
        </div>
    );
}

const DropdownSelect = ({ items } : IDropdownSelectAdvancedProps) => {
    const [selectedItems, setSelectedItems] = useState<IMovie[]>([]);
    const [query, setQuery] = useState('');
    const [selectedAll, setSelectedAll] = useState(false);


    const groupedMovies: GroupedMovies[] = useMemo(() => {
        return Object.values(
            items.reduce<Record<string, GroupedMovies>>((acc, movie) => {
                if (!acc[movie.genre]) {
                    acc[movie.genre] = {
                        genre: movie.genre,
                        items: []
                    };
                }

                acc[movie.genre].items.push(movie);
                return acc;
            }, {})
        )
    }, [items])

    const filteredGroups: GroupedMovies[] = useMemo(() => {
        if (query === '') return groupedMovies;

        const lowerQuery = query.toLowerCase();

        return groupedMovies
            .map(group => {
                const matchedItems = group.items.filter(movie =>
                    movie.title.toLowerCase().includes(lowerQuery)
                );

                if (matchedItems.length === 0) return null;

                return {
                    genre: group.genre,
                    items: matchedItems
                };
            })
            .filter((group): group is GroupedMovies => group !== null);
    }, [query, groupedMovies]);


    const virtualItems: Item[] = useMemo(() => {
        const result: Item[] = [];

        filteredGroups.forEach(group => {
            result.push({ type: 'group', genre: group.genre });

            group.items.forEach(movie => {
                result.push({ type: 'item', movie });
            });
        });

        return result;
    }, [filteredGroups]);



    const selectAll = useCallback(() => {
        setSelectedAll(!selectedAll);

        if(selectedAll)
            setSelectedItems([]);
        else setSelectedItems(items);
    }, [selectedAll, items])


    useEffect(() => {
        if(selectedItems.length !== items.length)
            setSelectedAll(false);
    }, [selectedItems, items])

    return (
        <Combobox
            multiple
            value={selectedItems}
            onChange={setSelectedItems}
            onClose={() => setQuery('')}
        >
            <div className={"dropdown__select"}>
                <ComboboxInput
                    aria-label="Assignees"
                    onChange={(event) => setQuery(event.target.value)}
                    className={"w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"}
                />

                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                    <ChevronDownIcon className="size-4 fill-white/60 group-data-hover:fill-white" />
                </ComboboxButton>

                <ComboboxOptions className="rounded-xl bg-white/5 p-2">
                    <List<RowProps>
                        rowComponent={RowComponent}
                        rowCount={virtualItems.length}
                        rowHeight={rowHeight}
                        rowProps={{ items: virtualItems }}
                        height={200}
                        style={{maxHeight: "200px"}}
                    />

                    {/*<>*/}
                    {/*    <div className="footer">*/}
                    {/*        <CheckboxField*/}
                    {/*            label={"Select all"}*/}
                    {/*            checked={selectedAll}*/}
                    {/*            onChange={selectAll}*/}
                    {/*        />*/}

                    {/*        {*/}
                    {/*            selectedItems.length*/}
                    {/*                ? <div className={"text-sm"}>*/}
                    {/*                    {selectedItems.length}  Selected*/}
                    {/*                </div>*/}
                    {/*                : <></>*/}
                    {/*        }*/}
                    {/*    </div>*/}
                    {/*</>*/}
                </ComboboxOptions>
            </div>
        </Combobox>
    );
};

export default DropdownSelect;