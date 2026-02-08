import {
    Combobox, ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx'
import {useMemo, useState} from "react";
import {ChevronDownIcon} from "@heroicons/react/16/solid";
import "./dropdown-select.advanced.css";
import {CheckboxField} from "../../checkbox-field/CheckboxField.tsx";


interface IPeople {
    id: number;
    name: string;
}

const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
]

const DropdownSelectAdvanced = () => {
    const [selectedPeople, setSelectedPeople] = useState<IPeople[]>([]);
    const [query, setQuery] = useState('');
    const [selectedAll, setSelectedAll] = useState(false);

    const filteredPeople = useMemo(() => {
        return query === ''
            ? people
            : people.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })
    }, [query])

    return (
        <Combobox
            multiple
            value={selectedPeople}
            virtual={{ options: filteredPeople }}
            onChange={setSelectedPeople}
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


            </div>

            <ComboboxOptions anchor="bottom" className="w-(--input-width) rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:--spacing(1)] empty:invisible transition duration-100 ease-in data-leave:data-closed:opacity-0 pb-8">
                {({ option: person }) => (
                    <ComboboxOption key={person.id} value={person} className="group flex cursor-default items-center w-full gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10">
                        <CheckIcon className={clsx('size-5', !selectedPeople.includes(person) && 'invisible')} />
                        {person.name}
                    </ComboboxOption>
                )}
            </ComboboxOptions>

            <div className="flex items-center absolute bottom-0">
                {
                    selectedPeople.length
                        ? <span className={"text-sm"}>
                    {selectedPeople.length}  Selected
                </span>
                        : <></>
                }

                <CheckboxField
                   label={"Select all"}
                   checked={selectedAll}
                   onChange={setSelectedAll}
                />
            </div>
        </Combobox>
    );
};

export default DropdownSelectAdvanced;