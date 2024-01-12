import React, { useState, useEffect } from 'react';
import regexData from '../regex.json';
import '../styles/Home.css';

const Home = () => {
    const [text, setText] = useState('');
    const [part, setPart] = useState('14');
    const [inputWord, setInputWord] = useState('');
    const [appliedRules, setAppliedRules] = useState([]);

    useEffect(() => {
        setText(inputWord);
    }, [inputWord]);

    const applyRegex = (inputText, periods) => {
        let appliedRuleNames = [];

        regexData.forEach(rule => {
            if (periods.includes(rule.period)) {
                const regex = new RegExp(rule.search, 'g');
                if (regex.test(inputText)) {
                    inputText = inputText.replace(regex, rule.replace);
                    appliedRuleNames.push(rule.name);
                }
            }
        });

        return { transformedText: inputText, ruleNames: appliedRuleNames };
    };

    const handleScroll = (event) => {
        const position = event.target.scrollLeft;
        const maxScrollLeft = event.target.scrollWidth - event.target.clientWidth;
        const index = Math.ceil((position / maxScrollLeft) * 4);

        let partNumber;
        let result;
        switch (index) {
            case 1:
                partNumber = '14';
                result = applyRegex(inputWord, [1]);
                break;
            case 2:
                partNumber = '14/15';
                result = applyRegex(inputWord, [1, 2]);
                break;
            case 3:
              partNumber = '15';
              result = applyRegex(inputWord, [1, 2, 3]);
              break;
            case 4:
              partNumber = '16';
              result = applyRegex(inputWord, [1, 2, 3, 4]);
              break;
            default:
              partNumber = '';
              result = { transformedText: inputWord, ruleNames: [] };
              }

              setText(result.transformedText);
    setAppliedRules(result.ruleNames);
    setPart(partNumber);
};

return (
    <div className="home-container">
        <h1>{text}</h1>
        <div className="scroll-container" onScroll={handleScroll}>
            <div className="scroll-content"></div>
        </div>
        <input
            type="text"
            value={inputWord}
            onChange={(event) => setInputWord(event.target.value)}
            placeholder="Enter word"
        />
        <p>Current Part: {part}</p>
        <div className="applied-rules">
            {appliedRules.map((ruleName, index) => (
                <p key={index}>{ruleName}</p>
            ))}
        </div>
    </div>
);
};

export default Home;
