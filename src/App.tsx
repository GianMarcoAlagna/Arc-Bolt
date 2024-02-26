import { useState } from "react";
// import { invoke } from "@tauri-apps/api/tauri";
import CodeMirror from "@uiw/react-codemirror";
import {
  loadLanguage,
  langs,
} from "@uiw/codemirror-extensions-langs";
import { tags as t } from "@lezer/highlight";
import { atomoneInit } from "@uiw/codemirror-theme-atomone";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  loadLanguage("javascript");
  langs.javascript();

  return (
    <div className="container">
      <CodeMirror
        value={code}
        theme={atomoneInit({
          settings: {
            caret: "#c6c6c6",
            fontFamily: "arial",
          },
          styles: [
            { 
              tag: t.comment, 
              color: "#6272a4"
            },
          ],
        })}
        onChange={(value) => setCode(value)}
        height="100%"
        extensions={[langs.javascript()]}
      />
    </div>
  );
}

export default App;
