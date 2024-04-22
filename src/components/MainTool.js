import React, { useState, useEffect, useCallback } from "react";
import regexData from "../regex.json";
import "../styles/MainTool.css";
import dictionaryData from "../dictionary.json";

function recognizeForm(inputText) {
  for (const forms of dictionaryData) {
    if (forms.currentForm === inputText) {
      return "currentform";
    } else if (forms.oldestForm === inputText) {
      return "oldform";
    }
  }
  return "";
}

function applyRegex(inputText, periods, currentPeriod) {
  let appliedRuleNames = [];

  regexData.forEach((periodData) => {
    if (periods.includes(periodData.period)) {
      periodData.patterns.forEach((pattern) => {
        const regex = new RegExp(pattern.search, "g");
        if (regex.test(inputText)) {
          inputText = inputText.replace(regex, pattern.replace);
          appliedRuleNames.push({ name: periodData.name, period: periodData.period });
        }
      });
    }
  });

  const filteredRules = appliedRuleNames.filter((rule) => rule.period === currentPeriod).map((rule) => rule.name);
  return { transformedText: inputText, ruleNames: filteredRules };
}

function MainTool() {
  const [text, setText] = useState("");
  const [part, setPart] = useState("");
  const [inputWord, setInputWord] = useState("");
  const [appliedRules, setAppliedRules] = useState([]);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(false);

  const updatePart = useCallback(
    (index) => {
      if (inputWord.trim() !== "") {
        const dictionaryEntryCurrentForm = dictionaryData.find((entry) => entry.currentForm === inputWord);
        const dictionaryEntryOldForm = dictionaryData.find((entry) => entry.oldestForm === inputWord);
        const dictionaryEntry = dictionaryEntryCurrentForm || dictionaryEntryOldForm;

        let partNumber = "";
        let result = { transformedText: "", ruleNames: [] };

        if (dictionaryEntry) {
          switch (index) {
            case 1:
              partNumber = "Čeština 14. století";
              if (dictionaryEntry.exception[1] === false) {
                result = applyRegex(dictionaryEntry.oldestForm, [1], 1);
              } else {
                result = { transformedText: dictionaryEntry.exception[1], ruleNames: [] };
              }
              break;
            case 2:
              partNumber = "Čeština doby husitské";
              if (dictionaryEntry.exception[1] !== false) {
                result = applyRegex(dictionaryEntry.exception[1], [1, 2], 2);
              } else {
                if (dictionaryEntry.exception[2] === false) {
                  result = applyRegex(dictionaryEntry.oldestForm, [1, 2], 2);
                } else {
                  result = { transformedText: dictionaryEntry.exception[2], ruleNames: [] };
                }
              }
              break;
            case 3:
              partNumber = "Humanistická čeština a novější";
              if (dictionaryEntry.exception[1] !== false || dictionaryEntry.exception[2] !== false) {
                result = applyRegex(dictionaryEntry.exception[2], [1, 2], 2);
                result = applyRegex(result.transformedText, [1, 2, 3], 3);
              } else {
                if (dictionaryEntry.exception[3] === false) {
                  result = applyRegex(dictionaryEntry.oldestForm, [1, 2, 3], 3);
                } else {
                  result = { transformedText: dictionaryEntry.exception[3], ruleNames: [] };
                }
              }
              break;
            default:
              partNumber = "Starší než 14. století";
              result = { transformedText: dictionaryEntry.oldestForm, ruleNames: [] };
          }
        }

        setText(result.transformedText);
        setAppliedRules(result.ruleNames);
        setPart(partNumber);
      } else {
        console.error("Input word is empty");
      }
    },
    [inputWord]
  );

  useEffect(() => {
    if (inputWord.trim() === "") {
      setText("");
      setPart("");
      setAppliedRules([]);
      setCurrentPartIndex(0);
      setLeftButtonDisabled(true);
      setRightButtonDisabled(true);
    } else {
      const period = recognizeForm(inputWord);

      if (period === "currentform") {
        setText(inputWord);
        setCurrentPartIndex(3);
        updatePart(3);
        setLeftButtonDisabled(false);
        setRightButtonDisabled(true);
      } else if (period === "oldform") {
        setText(inputWord);
        setCurrentPartIndex(0);
        updatePart(0);
        setLeftButtonDisabled(true);
        setRightButtonDisabled(false);
      } else {
        setText("");
        setPart("");
        setAppliedRules([]);
        setCurrentPartIndex(0);
        setLeftButtonDisabled(true);
        setRightButtonDisabled(true);
      }
    }
  }, [inputWord, updatePart]);

  function handlePartChange(increment) {
    const newIndex = currentPartIndex + increment;

    if (inputWord.trim() !== "") {
      if (newIndex >= 0 && newIndex < 4) {
        setCurrentPartIndex(newIndex);
        updatePart(newIndex);
      }
    } else {
      setCurrentPartIndex(0);
      updatePart(0);
    }

    setLeftButtonDisabled(newIndex === 0);
    setRightButtonDisabled(newIndex === 3);
  }

  return (
    <div className="main-tool-container">
      <div className="input-buttons-container">
        <input
          type="text"
          value={inputWord}
          onChange={(event) => setInputWord(event.target.value.toLowerCase())}
          placeholder="Napište slovo"
          list="suggested-words"
        />

        <datalist id="suggested-words">
          {dictionaryData
            .flatMap((entry) => [entry.currentForm, entry.oldestForm])
            .map((value, index) => (
              <option key={index} value={value} />
            ))}
        </datalist>

        <div className="part-buttons">
          <button
            onClick={() => handlePartChange(-1)}
            disabled={leftButtonDisabled || !inputWord.trim() || recognizeForm(inputWord) === ""}
          >
            ←
          </button>
          <button
            onClick={() => handlePartChange(1)}
            disabled={rightButtonDisabled || !inputWord.trim() || recognizeForm(inputWord) === ""}
          >
            →
          </button>
        </div>
      </div>
      <div className="word-period">
        <h1>{text}</h1>
        <p>{part}</p>
      </div>

      <div className="applied-rules">
        {appliedRules.map((rule, index) => (
          <p key={index}>{rule}</p>
        ))}
      </div>
    </div>
  );
}

export default MainTool;
