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
import "./dropdown-select.advanced.css";
import {CheckboxField} from "../../checkbox-field/CheckboxField.tsx";


interface IMovie {
    id: number;
    title: string;
    genre: string;
}

type GroupedMovies = {
    genre: string;
    items: IMovie[];
};

interface IDropdownSelectAdvancedProps {
    items: IMovie[]
}

const DropdownSelectAdvanced = (
    {
        items
    } : IDropdownSelectAdvancedProps) => {

    const [selectedItems, setSelectedItems] = useState<IMovie[]>([]);
    const [query, setQuery] = useState('');
    const [selectedAll, setSelectedAll] = useState(false);


    const filteredMovies = useMemo(() => {
        return query === ''
            ? items
            : items.filter((movie) => {
                return movie.title.toLowerCase().includes(query.toLowerCase())
            })
    }, [query, items])

    const groupedMovies: GroupedMovies[] = useMemo(() => {
        return Object.values(
            filteredMovies.reduce<Record<string, GroupedMovies>>((acc, movie) => {
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
    }, [filteredMovies])

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

                <ComboboxOptions
                    anchor="bottom"
                    className="dropdown__options w-(--input-width) rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:--spacing(1)] empty:invisible transition duration-100 ease-in data-leave:data-closed:opacity-0 px-2"
                >
                    {
                        groupedMovies.map((movie: GroupedMovies, index) => {
                            const isLast = index === groupedMovies.length - 1;
                            return(
                                <Fragment key={movie.genre}>
                                    <div className={"flex flex-col gap-2 group-movies"} >
                                        <span className={"group-movies__title"}>{movie.genre}</span>

                                        {
                                            movie.items.map((item) => {
                                                return(
                                                    <ComboboxOption
                                                        key={item.id}
                                                        value={item}
                                                        className="group flex cursor-default items-center w-full gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
                                                    >
                                                        <CheckIcon className={clsx('size-5', !selectedItems.includes(item) && 'invisible')} />
                                                        {item.title}
                                                    </ComboboxOption>
                                                )
                                            })
                                        }
                                    </div>

                                    <>
                                        {
                                            isLast
                                                ? <div className="footer">
                                                    <CheckboxField
                                                        label={"Select all"}
                                                        checked={selectedAll}
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
                                                : <></>
                                        }
                                    </>
                                </Fragment> as ReactElement
                            )
                        })
                    }
                </ComboboxOptions>
            </div>


        </Combobox>
    );
};

export default DropdownSelectAdvanced;