import { useState } from "react";
import LandingPage from "./components/LandingPage";
import PostGenerator from "./components/PostGenerator";

export default function App() {
  const [start, setStart] = useState(false);
  return (
    <div className="font-sans min-h-screen bg-background">
      {!start ? (
        <LandingPage onStart={() => setStart(true)} />
      ) : (
        <PostGenerator />
      )}
    </div>
  );
}
