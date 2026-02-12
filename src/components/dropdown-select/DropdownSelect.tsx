import "./dropdown-select.css";
import type { IDropdownSelectAdvancedProps } from "./dropdown-select.types.ts";
import {DropdownSelectProvider} from "./dropdown-select.provider.tsx";
import DropdownSelectContainer from "./DropdownSelect.Container.tsx";


const DropdownSelect = ({ items } : IDropdownSelectAdvancedProps) => {
    return (
        <DropdownSelectProvider items={items}>
            <DropdownSelectContainer />
        </DropdownSelectProvider>
    );
};

export default DropdownSelect;