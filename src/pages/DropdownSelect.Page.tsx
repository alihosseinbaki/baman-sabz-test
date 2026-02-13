import {movies} from "../db.ts";
import DropdownSelect from "../components/dropdown-select/DropdownSelect.tsx";

const DropdownSelectPage = () => {
    return (
        <DropdownSelect items={movies} />
    );
};

export default DropdownSelectPage;