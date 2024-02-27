import { useState } from "react";
// import { invoke } from "@tauri-apps/api/tauri";
import CodeMirror from "@uiw/react-codemirror";
import { loadLanguage, langs } from "@uiw/codemirror-extensions-langs";
import { tags as t } from "@lezer/highlight";
import { atomoneInit } from "@uiw/codemirror-theme-atomone";
import "./App.css";


type Language = keyof typeof langs;

function App() {
  const [code, setCode] = useState("");
  const [lang, setLang] = useState<Language>("javascript")
  // TODO add support for changing language, and no language(plain text)
  loadLanguage(lang);
  langs[lang]()
  const langChoices = Object.keys(langs).map((lang)=><option key={lang} value={lang}>{lang}</option>)
  
  const toggleLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value as Language
    const setupLanguage = langs[selectedLanguage]

    setLang(selectedLanguage)
    setupLanguage()
  }
  return (
    <div className="container">        
      <select name="languages" value={lang} onChange={toggleLanguage} style={{position:"absolute", top:"20px", right:"20px", zIndex:"9999"}} id="languages">
        {langChoices}
      </select>
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
              color: "#6272a4",
            },
          ],
        })}
        onChange={(value) => setCode(value)}
        height="100%"
        extensions={[langs[lang]()]}
      />
      
    </div>
  );
}

export default App;
