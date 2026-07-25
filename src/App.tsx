import { Homepage } from "./components/Homepage";

export default function App() {
  return (
    // `overflow-x-hidden` removed: it made this a scroll container, which is
    // the ancestor a sticky header would try to stick to. `html` guards
    // horizontal overflow instead — see index.css.
    <div className="w-full min-h-screen bg-navy-950 text-white relative font-sans">
      <Homepage />
    </div>
  );
}
