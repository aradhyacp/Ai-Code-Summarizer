import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="min-h-screen flex flex-col text-white">
      <Header />
      <main className="flex-grow">
        <Hero/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
