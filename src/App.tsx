import './App.css'
import DropdownSelectAdvanced from "./components/dropdown-select/advanced/DropdownSelect.Advanced.tsx";
import {movies} from "./db.ts";

function App() {

  return (
    <>
      <DropdownSelectAdvanced items={movies} />
    </>
  )
}

export default App
