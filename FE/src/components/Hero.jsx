import React, { useState } from "react";

const Hero = () => {
  const [codeWritten, setCodeWritten] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [modelUsed, setModelUsed] = useState("gemini-2.5-flash");
  const [isLoading, setisLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState("");
  const [modelVersion, setmodelVersion] = useState("");
  const [promptTokenCount, setpromptTokenCount] = useState("");
  const [candidatesTokenCount, setcandidatesTokenCount] = useState("");
  const [totalTokenCount, settotalTokenCount] = useState("");
  const [thoughtsTokenCount, setthoughtsTokenCount] = useState("");
  const [generateFinish, setGenerateFinish] = useState(false);

  const handleOnChange = (e) => {
    setCodeWritten(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codeWritten.trim()) return;

    setisLoading(true);
    setAiSummary("");

    try {
      const res = await fetch("http://localhost:3000/ai-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: language,
          codeSent: codeWritten,
          model: modelUsed,
        }),
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(`Failed to perform the action, ${data.error}`);
      }
      setAiSummary(data.response);
      setmodelVersion(data.modelVersion);
      setpromptTokenCount(data.promptTokenCount);
      setcandidatesTokenCount(data.candidatesTokenCount);
      settotalTokenCount(data.totalTokenCount);
      setthoughtsTokenCount(data.thoughtsTokenCount);
    } catch (error) {
      setAiSummary(`// ${error}`);
    } finally {
      setisLoading(false);
      setGenerateFinish(true);
    }
  };

  return (
    <div className="min-h-screen mt-10 px-6">
      <div className="flex flex-row justify-center gap-10">
        <section className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 shadow-inner flex flex-col w-[600px]">
          <form className="flex flex-col gap-4 flex-1" onSubmit={handleSubmit}>
            <label className="text-sm text-slate-300 flex items-center justify-between">
              <span>Paste your code</span>
            </label>

            <textarea
              value={codeWritten}
              onChange={handleOnChange}
              placeholder={"Your code goes here"}
              className="w-full flex-1 p-4 rounded-md bg-[#071019] border border-slate-800 text-sm font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none cursor-text min-h-[470px]"
            />

            <div className="flex flex-row w-full gap-3">
              <div className="flex flex-row w-full gap-3">
                <div className="w-[50%]">
                  <label className="text-xs text-slate-400 block mb-1">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-md bg-[#071019] border border-slate-800 px-3 py-2 text-sm text-slate-200 cursor-pointer"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="rust">Rust</option>
                    <option value="go">Go</option>
                    <option value="c/c++">C/C++</option>
                    <option value="python">Python</option>
                  </select>
                </div>
                <div className="w-[50%]">
                  <label className="text-xs text-slate-400 block mb-1">
                    Model
                  </label>
                  <select
                    value={modelUsed}
                    onChange={(e) => setModelUsed(e.target.value)}
                    className="w-full rounded-md bg-[#071019] border border-slate-800 px-3 py-2 text-sm text-slate-200 cursor-pointer"
                  >
                    <option value="gemini-2.5-pro">Gemini-2.5-pro</option>
                    <option value="gemini-2.5-flash">Gemini-2.5-flash</option>
                    <option value="gemini-2.5-flash-lite">
                      Gemini-2.5-flash-lite
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || !codeWritten.trim()}
              className="w-full px-4 py-2 rounded-lg bg-[#0d59f2] hover:bg-[#0d59f2dc] disabled:bg-slate-600  text-white font-medium cursor-pointer transition-colors duration-200"
            >
              {isLoading ? "Generating..." : "Generate Summary"}
            </button>
          </form>
        </section>

        <section className="bg-slate-900/30 p-5 rounded-2xl border border-slate-800/60 flex flex-col w-[600px]">
          <div className="mb-3 flex">
            <h2 className="text-lg font-medium text-white">Code Summary</h2>
          </div>

          <div className="flex-1 overflow-auto border border-slate-800 rounded-lg p-4 bg-[#0a0d15] min-h-[400px]">
            {aiSummary && aiSummary.trim() !== "" ? (
              <pre className="text-sm font-mono text-slate-200 whitespace-pre-wrap">
                {aiSummary}
              </pre>
            ) : isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-16">
                <div className="p-4 rounded-full bg-slate-800/30 mb-3">
                  <div className="w-6 h-6 text-slate-300 animate-spin">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-rotate-cw-icon lucide-rotate-cw"
                    >
                      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                      <path d="M21 3v5h-5" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm">Generating Summary...</p>
                <p className="text-xs mt-2 text-slate-500">
                  Please wait while we process your code.
                </p>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-16">
                <p className="text-sm">
                  AI Summary for your code will appear here.
                </p>
              </div>
            )}
          </div>

          {generateFinish && (
            <div className="flex flex-col mt-4 gap-2">
              <div className="px-4 py-3 border-1 rounded-lg bg-[#071019] border-[#222f49] flex gap-8 text-slate-400">
                Model Version:{" "}
                <span className="text-white">{modelVersion}</span>
              </div>
              <div className="px-4 py-3 border-2 rounded-lg bg-[#071019] border-[#222f49] flex gap-8 text-slate-400">
                Prompt Token Count:{" "}
                <span className="text-white">{promptTokenCount}</span>
              </div>
              <div className="px-4 py-3 border-2 rounded-lg bg-[#071019] border-[#222f49] flex gap-8 text-slate-400">
                Candidates Token Count:{" "}
                <span className="text-white">{candidatesTokenCount}</span>
              </div>
              <div className="px-4 py-3 border-2 rounded-lg bg-[#071019] border-[#222f49] flex gap-8 text-slate-400">
                Total Token Count:{" "}
                <span className="text-white">{totalTokenCount}</span>
              </div>
              <div className="px-4 py-3 border-2 rounded-lg bg-[#071019] border-[#222f49] flex gap-8 text-slate-400">
                Thoughts Token Count:
                <span className="text-white">{thoughtsTokenCount}</span>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Hero;
