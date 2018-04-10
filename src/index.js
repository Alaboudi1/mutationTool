// @ts-check
import * as monaco from "monaco-editor";
import "./style.css";
import * as mutantsProgram from "./mutants";
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

let state = initState();
const mutants = [
  {
    lineNumber: 40,
    column: { a: 19, b: 20 },
    type: "Red",
    id: 2,
    mutationOperation: "Original: iSub = 0"
  },
  {
    lineNumber: 12,
    column: { a: 23, b: 25 },
    type: "Orange",
    id: 1,
    mutationOperation: "Original: !="
  }
];
const diffBetweenMutantAndOriginal = [
  {
    id: 1,
    diffs: [{ lineNumber: { a: 13, b: 17 }, type: "Missed", message: "Missed by mutant" }]
  },
  {
    id: 2,
    diffs: [
      { lineNumber: { a: 41, b: 43 }, type: "Missed", message: "Missed by mutant" },
      { lineNumber: { a: 45, b: 50 }, type: "Extra", message: "Extra by mutant" }
    ]
  }
];
const infections = [
  {
    id: 1,
    mutant: [
      {
        lineNumber: 15,
        column: { a: 13, b: 17 },
        type: "Orange"
      }
    ],
    infected: [
      // by assigning variable's value to mutants or involving mutant in constituting its value
      {
        lineNumber: 21,
        column: { a: 23, b: 25 },
      }
    ]
  }
];
let editor = monaco.editor.create(document.getElementById("container"), {
  value: mutantsProgram.javaCode,
  language: "java",
  glyphMargin: true,
  contextmenu: false,
  minimap: { enabled: false }
});

const initMutationLayout = () =>
  editor.deltaDecorations(
    [],
    //@ts-ignore
    mutants.map(mu => ({
      range: new monaco.Range(mu.lineNumber, 1, mu.lineNumber, 1),
      options: {
        glyphMarginClassName: `MutantIndicator${mu.type}`
      }
    }))
  );
const register = () => {
  mutants.forEach(localMutant =>
    monaco.languages.registerHoverProvider(
      "java",
      // @ts-ignore
      {
        provideHover: (model, position, cancel) => {
          if (
            state.underInspectionMutant.id == localMutant.id &&
            localMutant.lineNumber === position.lineNumber &&
            localMutant.column.a <= position.column &&
            localMutant.column.b >= position.column
          )
            return {
              range: new monaco.Range(
                localMutant.lineNumber,
                localMutant.column.a,
                localMutant.lineNumber,
                localMutant.column.b
              ),
              contents: ["", { language: "java", value: localMutant.mutationOperation }]
            };
        }
      }
    )
  );
  diffBetweenMutantAndOriginal.forEach(({ diffs, id }) =>
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
                range: new monaco.Range(diff.lineNumber.a, 1, diff.lineNumber.b, 100),
                contents: [{ language: "java", value: diff.message }]
              };
            }
          }
        }
      )
    )
  );
};
editor.onMouseDown(e => {
  if (e.target.position.column != 1) return;
  if (state.underInspectionMutant.lineNumber === e.target.position.lineNumber) {
    editor.setValue(mutantsProgram.javaCode);
    state = initState();
    return initMutationLayout();
  }
  const localMutant = mutants.find(mutant => mutant.lineNumber === e.target.position.lineNumber);
  if (localMutant) {
    let decoration = [
      {
        range: new monaco.Range(
          localMutant.lineNumber,
          localMutant.column.a,
          localMutant.lineNumber,
          localMutant.column.b
        ),
        options: { inlineClassName: `originalMutantLocation${localMutant.type}` }
      },
      {
        range: new monaco.Range(localMutant.lineNumber, 1, localMutant.lineNumber, 1),
        options: {
          glyphMarginClassName: `close${localMutant.type}`
        }
      }
    ];
    const localDiff = diffBetweenMutantAndOriginal.find(diff => diff.id === localMutant.id);
    const localInfection = infections.find(infected => infected.id === localMutant.id);
    let diffDecoration = [];
    let InfectedDecoration = [];
    let InfectionMutationDecoration = [];
    if (localDiff) {
      diffDecoration = localDiff.diffs.map(diff => ({
        range: new monaco.Range(diff.lineNumber.a, 1, diff.lineNumber.b, 1),
        options: { linesDecorationsClassName: `diff${diff.type}` }
      }));
    }

    if (localInfection) {
      InfectionMutationDecoration = localInfection.mutant.map(mu => ({
        range: new monaco.Range(mu.lineNumber, mu.column.a, mu.lineNumber, mu.column.b),
        options: { inlineClassName: `MutantLocation${mu.type}` }
      }));

      InfectedDecoration = localInfection.infected.map(variable => ({
        range: new monaco.Range(
          variable.lineNumber,
          variable.column.a,
          variable.lineNumber,
          variable.column.b
        ),
        options: { inlineClassName: `infection` }
      }));
    }

    state.underInspectionMutant = localMutant;
    editor.setValue(mutantsProgram[`mu${localMutant.id}`]);
    editor.deltaDecorations(
      [],
      [...decoration, ...diffDecoration, ...InfectedDecoration, ...InfectionMutationDecoration]
    );
  }
});

initMutationLayout();
register();

function initState() {
  return {
    underInspectionMutant: {
      lineNumber: 0,
      column: { a: 0, b: 0 },
      type: "",
      id: 0,
      mutationOperation: ""
    }
  };
}
// Ideas
// 1. having colors for the circle for the mutants that diverge in the behavior
// 2. for those in which their behaviors do not diverge, make a map between the input that interact with the mutants, help the developer to create the diversion.
// 3. Test that cover that mutants.
// 4. tainting?
//5. the code is not editable.
//6. infection? each statement that contains the mutants as well as any statement where the input to the method interact with the mutants
