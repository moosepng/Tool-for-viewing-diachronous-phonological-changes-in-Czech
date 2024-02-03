import React, { useState, useEffect, useCallback } from 'react';
import regexData from '../regex.json';
import '../styles/MainTool.css';
import dictionaryData from '../dictionary.json';

function MainTool() {
  const [text, setText] = useState('');
  const [part, setPart] = useState('');
  const [inputWord, setInputWord] = useState('');
  const [appliedRules, setAppliedRules] = useState([]);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);

  const updatePart = useCallback(
    (index) => {
      if (inputWord.trim() !== '') {
        const dictionaryEntryCurrentForm = dictionaryData.find(
          (entry) => entry.currentForm === inputWord
        );

        const dictionaryEntryOldForm = dictionaryData.find(
          (entry) => entry.oldestForm === inputWord
        );

        const dictionaryEntry = dictionaryEntryCurrentForm || dictionaryEntryOldForm;

        if (dictionaryEntry) {
          let partNumber;
          let result;

          if (dictionaryEntry.currentForm === inputWord) {
            // 'currentform' case
            switch (index) {
              case 0:
                partNumber = '16';
                result = applyRegex(dictionaryEntry.oldestForm, [1, 2, 3, 4]);
                break;
              case 1:
                partNumber = '15';
                result = applyRegex(dictionaryEntry.oldestForm, [1, 2, 3]);
                break;
              case 2:
                partNumber = '14/15';
                result = applyRegex(dictionaryEntry.oldestForm, [1, 2]);
                break;
              case 3:
                partNumber = '14';
                result = applyRegex(dictionaryEntry.oldestForm, [1]);
                break;
              case 4:
                partNumber = '13';
                result = { transformedText: dictionaryEntry.oldestForm, ruleNames: [] };
                break;
              default:
                partNumber = '';
                result = { transformedText: dictionaryEntry.oldestForm, ruleNames: [] };
            }
          } else if (dictionaryEntry.oldestForm === inputWord) {
            // 'oldform' case
            switch (index) {
              case 0:
                partNumber = '13';
                result = { transformedText: dictionaryEntry.oldestForm, ruleNames: [] };
                break;
              case 1:
                partNumber = '14';
                result = applyRegex(dictionaryEntry.oldestForm, [1]);
                break;
              case 2:
                partNumber = '14/15';
                result = applyRegex(dictionaryEntry.oldestForm, [1, 2]);
                break;
              case 3:
                partNumber = '15';
                result = applyRegex(dictionaryEntry.oldestForm, [1, 2, 3]);
                break;
              case 4:
                partNumber = '16';
                result = applyRegex(dictionaryEntry.oldestForm, [1, 2, 3, 4]);
                break;
              default:
                partNumber = '';
                result = { transformedText: dictionaryEntry.oldestForm, ruleNames: [] };
            }
          }

          setText(result.transformedText);
          setAppliedRules(result.ruleNames);
          setPart(partNumber);
        } else {
          console.error("dictionaryEntry is undefined");
        }
      }
    },
    [inputWord]
  );

  useEffect(() => {
    function recognizePeriod(inputText) {
      for (const forms of dictionaryData) {
        if (forms.currentForm === inputText) {
          return 'currentform';
        } else if (forms.oldestForm === inputText) {
          return 'oldform';
        }
      }
      return ''; // Return an empty string if the word is not found in the dictionary
    }

    if (inputWord.trim() === '') {
      // Reset states when inputWord is empty
      setText('');
      setPart('');
      setAppliedRules([]);
      setCurrentPartIndex(0);
    } else {
      const period = recognizePeriod(inputWord);

      if (period !== '') {
        setText(inputWord);
        updatePart(currentPartIndex);
      } else {
        // If the word is not recognized, reset displayed values
        setText('');
        setPart('');
        setAppliedRules([]);
        setCurrentPartIndex(0);
      }
    }
  }, [inputWord, currentPartIndex, updatePart]);

  function applyRegex(inputText, periods) {
    let appliedRuleNames = [];

    regexData.forEach((periodData) => {
      if (periods.includes(periodData.period)) {
        periodData.patterns.forEach((pattern) => {
          const regex = new RegExp(pattern.search, 'g');
          if (regex.test(inputText)) {
            inputText = inputText.replace(regex, pattern.replace);
            appliedRuleNames.push(periodData.name);
          }
        });
      }
    });

    return { transformedText: inputText, ruleNames: appliedRuleNames };
  }

  function handlePartChange(increment) {
    const newIndex = currentPartIndex + increment;

    if (inputWord.trim() !== '') {
      if (newIndex >= 0 && newIndex < 5) {
        setCurrentPartIndex(newIndex);
        console.log('Current Part Index:', newIndex);
      }
    } else {
      setCurrentPartIndex(0);
      console.log('Current Part Index: 0');
    }
  }

  return (
    <div className="main-tool-container">
      <input
        type="text"
        value={inputWord}
        onChange={(event) => setInputWord(event.target.value)}
        placeholder="Enter word"
      />
      <div className="part-buttons">
        <button
          onClick={() => handlePartChange(-1)}
          disabled={currentPartIndex === 0}
        >
          Previous Part
        </button>
        <button
          onClick={() => handlePartChange(1)}
          disabled={currentPartIndex === 4}
        >
          Next Part
        </button>
      </div>
      <h1>{text}</h1>
      <p>Current Part: {part}</p>
      <div className="applied-rules">
        {appliedRules.map((ruleName, index) => (
          <p key={index}>{ruleName}</p>
        ))}
      </div>
    </div>
  );
}

export default MainTool;
