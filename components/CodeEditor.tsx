import React from "react";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

interface ICodeEditor {
  code: string;
  language: string;
  onChange: (code: string) => void;
}
const CodeEditor = ({ language, code, onChange }: ICodeEditor) => {
  console.log({ language, code });
  return (
    <AceEditor
      mode={language}
      theme="monokai"
      name="snippet"
      fontSize={16}
      width="100%"
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      value={code}
      onChange={onChange}
      className="w-full"
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
      }}
    />
  );
};

export default CodeEditor;
