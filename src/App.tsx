import './App.css'
import DropdownSelect from "./components/dropdown-select/DropdownSelect.tsx";
import {movies} from "./db.ts";

function App() {

  return (
    <>
      <DropdownSelect items={movies} />
    </>
  )
}

export default App
