// @ts-check
import * as monaco from "monaco-editor";
import "./style.css";
import * as subject_1 from "./subject1";
import * as subject_2 from "./subject2";
import * as subject_3 from "./subject3";
import * as subject_4 from "./subject4";
import * as subject_5 from "./subject5";
let currentSubject, editor;

//@ts-ignore
self.MonacoEnvironment = {
  getWorkerUrl: (moduleId, label) => {
    if (label === "json") {
      return "./json.worker.bundle.js";
    }
    if (label === "css") {
      return "./css.worker.bundle.js";
    }
    if (label === "html") {
      return "./html.worker.bundle.js";
    }
    if (label === "typescript" || label === "javascript") {
      return "./ts.worker.bundle.js";
    }
    return "./editor.worker.bundle.js";
  }
};
// @ts-ignore
document.getElementById("mutant").addEventListener("change", e => setSubject(e.target.value));
editor = monaco.editor.create(document.getElementById("container"), {
  value: "",
  language: "java",
  glyphMargin: true,
  contextmenu: false,
  minimap: { enabled: false }
});
const setSubject = subject => {
  switch (subject) {
    case "subject_1":
      currentSubject = subject_1;
      break;
    case "subject_2":
      currentSubject = subject_2;
      break;
    case "subject_3":
      currentSubject = subject_3;
      break;
      case "subject_4":
      currentSubject = subject_4;
      break;
      case "subject_5":
      currentSubject = subject_5;
      break;
    default:
      currentSubject = { javaCode: "", mutants: [] };
      break;
  }
  editor.setValue(currentSubject.javaCode);
  initMutationLayout();
};
let state = initState();
let disHover;
const initMutationLayout = () => {
  editor.deltaDecorations(
    [],
    //@ts-ignore
    currentSubject.mutants.map(({ mutant }) => ({
      range: new monaco.Range(mutant.lineNumber, 1, mutant.lineNumber, 1),
      options: {
        glyphMarginClassName: `MutantIndicator${mutant.type}`
      }
    }))
  );
};

const register = () => {
  if (disHover) {
    console.log(disHover.dispose());
  }
  [subject_1, subject_2, subject_3, subject_4, subject_5].forEach(({ mutants }) =>
    // @ts-ignore
    mutants.forEach(
      ({ mutant }) =>
        (disHover = monaco.languages.registerHoverProvider(
          "java",
          // @ts-ignore
          {
            provideHover: (model, position, cancel) => {
              if (
                state.underInspectionMutant.subject == mutant.subject &&
                state.underInspectionMutant.id == mutant.id &&
                mutant.lineNumber === position.lineNumber &&
                mutant.column.a <= position.column &&
                mutant.column.b >= position.column
              )
                return {
                  range: new monaco.Range(
                    mutant.lineNumber,
                    mutant.column.a,
                    mutant.lineNumber,
                    mutant.column.b
                  ),
                  contents: ["", { language: "java", value: mutant.mutationOperation }]
                };
            }
          }
        ))
    )
  );
  [subject_1, subject_2, subject_3, subject_4, subject_5].forEach(({ mutants }) =>
    // @ts-ignore
    mutants.forEach(({ diffs, mutant: { id } }) =>
      diffs.forEach(diff =>
        monaco.languages.registerHoverProvider(
          "java",
          // @ts-ignore
          {
            provideHover: (model, position, cancel) => {
              if (
                state.underInspectionMutant.id == id &&
                diff.lineNumber.a <= position.lineNumber &&
                diff.lineNumber.b >= position.lineNumber
              ) {
                editor.setSelection(new monaco.Range(diff.lineNumber.a, 1, diff.lineNumber.b, 100));
                return {
                  range: new monaco.Range(diff.lineNumber.a, 1, diff.lineNumber.b, 50),
                  contents: [{ language: "java", value: diff.message }]
                };
              }
            }
          }
        )
      )
    )
  );
};
editor.onMouseDown(e => {
  if (e.target.position.column != 1) return;
  if (state.underInspectionMutant.lineNumber === e.target.position.lineNumber) {
    editor.setValue(currentSubject.javaCode);
    state = initState();
    return initMutationLayout();
  }
  const { mutant } = currentSubject.mutants.find(
    m => m.mutant.lineNumber === e.target.position.lineNumber
  );
  if (mutant) {
    let decoration = [
      {
        range: new monaco.Range(
          mutant.lineNumber,
          mutant.column.a,
          mutant.lineNumber,
          mutant.column.b
        ),
        options: { inlineClassName: `originalMutantLocation${mutant.type}` }
      },
      {
        range: new monaco.Range(mutant.lineNumber, 1, mutant.lineNumber, 1),
        options: {
          glyphMarginClassName: `close${mutant.type}`
        }
      }
    ];
    const localDiff = currentSubject.mutants[mutant.id].diffs;
    const localInfection = currentSubject.mutants[mutant.id].infected;
    let diffDecoration = [];
    let InfectedDecoration = [];
    if (localDiff) {
      diffDecoration = localDiff.map(diff => ({
        range: new monaco.Range(diff.lineNumber.a, 1, diff.lineNumber.b, 1),
        options: { linesDecorationsClassName: `diff${diff.type}` }
      }));
    }
    InfectedDecoration = localInfection.map(inf => ({
      range: new monaco.Range(inf.lineNumber, inf.column.a, inf.lineNumber, inf.column.b),
      options: { inlineClassName: `infection` }
    }));

    state.underInspectionMutant = mutant;
    editor.setValue(currentSubject.mutants[mutant.id].code);
    editor.deltaDecorations([], [...decoration, ...diffDecoration, ...InfectedDecoration]);
  }
});

function initState() {
  return {
    underInspectionMutant: {
      lineNumber: 0,
      column: { a: 0, b: 0 },
      type: "",
      id: -1,
      mutationOperation: "",
      subject: ""
    }
  };
}
register();

// Ideas
// 1. having colors for the circle for the mutants that diverge in the behavior
// 2. for those in which their behaviors do not diverge, make a map between the input that interact with the mutants, help the developer to create the diversion.
// 3. Test that cover that mutants.
// 4. tainting?
//5. the code is not editable.
//6. infection? each statement that contains the mutants as well as any statement where the input to the method interact with the mutants
