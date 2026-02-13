import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Combobox, ComboboxInput, ComboboxOption} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/16/solid";
import type {GroupedMovies, IMovie, Item} from "./dropdown-select.types.ts";
import {useDropdownSelect} from "./dropdown-select.provider.tsx";
import {CheckIcon} from "@heroicons/react/20/solid";
import clsx from "clsx";
import {CheckboxField} from "../checkbox-field/CheckboxField.tsx";
import {useVirtualizer} from "@tanstack/react-virtual";
import type {VirtualItem} from "@tanstack/virtual-core";


const GROUP_HEIGHT = 28;
const ITEM_HEIGHT = 36;

const VirtualRow = ({ virtualRow, item }: { virtualRow: VirtualItem, item: Item }) => {
    const {selectedItems} = useDropdownSelect();

    if (item.type === 'group') {
        return (
            <div
                key={`group-${item.genre}`}
                className="group-movies__title"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`
                }}
            >
                {item.genre}
            </div>
        );
    }

    return (
        <div
            key={`movie-${item.movie.id}`}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`
            }}
        >
            <ComboboxOption
                value={item.movie}
                className="group flex items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
            >
                <CheckIcon
                    className={clsx(
                        'size-5',
                        !selectedItems.some(
                            i => i.id === item.movie.id
                        ) && 'invisible'
                    )}
                />
                {item.movie.title}
            </ComboboxOption>
        </div>
    );
}

const DropdownSelectContainer = () => {
    const parentRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);

    const {
        items,
        selectedItems,
        query,
        isSelectedAll,
        dispatch
    } = useDropdownSelect();

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
                const isGenreMatched = group.genre.toLowerCase().includes(lowerQuery);

                if (isGenreMatched) {
                    return group;
                }

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


    const notFound = useMemo(() => virtualItems.length === 0, [virtualItems])

    const rowVirtualizer = useVirtualizer({
        count: open ? virtualItems.length : 0,
        getScrollElement: () => parentRef.current,
        estimateSize: (index) =>
            virtualItems[index].type === "group"
                ? GROUP_HEIGHT
                : ITEM_HEIGHT,
        overscan: 6,
    });

    useEffect(() => {
        if(virtualItems && open)
            rowVirtualizer.measure();
    }, [virtualItems, open]);


    const selectAll = useCallback(() => {
        dispatch("setIsSelectedAll", !isSelectedAll);
    }, [isSelectedAll])

    return (
        <Combobox<IMovie, true>
            multiple
            value={selectedItems}
            onChange={(value: IMovie[]) => dispatch("setSelectedItems", value)}
            onClose={() => dispatch("setQuery", "")}
        >
            <div className={"dropdown__select"} data-open={open}>
                <ComboboxInput
                    aria-label="dropdown-select"
                    placeholder={"Type your word"}
                    onChange={(e) => dispatch("setQuery", e.target.value)}
                    className={"w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"}
                />

                <span className={"group absolute inset-y-0 right-0 px-2.5 flex items-center justify-center"} style={{ height: "36px" }} onClick={() => setOpen(!open)}>
                    <ChevronDownIcon className="size-4 fill-white/60 group-data-hover:fill-white" />
                </span>

                <div className={"rounded-xl bg-white/5 p-2 dropdown__options"}>
                    {
                        !notFound
                            ? <>
                                <div
                                    ref={parentRef}
                                    className="max-h-[200px] overflow-auto"
                                >
                                    <div
                                        style={{
                                            height: `${rowVirtualizer.getTotalSize()}px`,
                                            position: 'relative',
                                        }}
                                    >
                                        {
                                            rowVirtualizer.getVirtualItems().map((virtualRow) => {
                                                const item = virtualItems[virtualRow.index];

                                                return(
                                                    <VirtualRow virtualRow={virtualRow} item={item} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="footer">
                                    <CheckboxField
                                        label={"Select all"}
                                        checked={isSelectedAll}
                                        onChange={selectAll}
                                    />

                                    {
                                        selectedItems.length
                                            ? <div className={"text-sm"}>
                                                {selectedItems.length}  Selected
                                            </div>
                                            : <></>
                                    }
                                </div>
                            </>
                            : <div className="flex justify-center items-center py-5">
                                Not Found!
                        </div>
                    }
                </div>
            </div>
        </Combobox>
    );
};

export default DropdownSelectContainer;