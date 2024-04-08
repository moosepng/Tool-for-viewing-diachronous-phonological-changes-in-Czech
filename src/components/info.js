import React from "react";

function Info({ partNumber }) {
  let content;

  switch (partNumber) {
    case "Humanistická čeština a novější":
      content = (
        <a href="https://www.czechency.org/slovnik/HUMANISTICK%C3%81%20%C4%8CE%C5%A0TINA">
          Humanistická čeština na Czechency.org
        </a>
      );
      break;
    case "Čeština doby husitské":
      content = (
        <a href="https://www.czechency.org/slovnik/%C4%8CE%C5%A0TINA%20DOBY%20HUSITSK%C3%89">
          Čeština doby husitské na Czechency.org
        </a>
      );
      break;
    case "Čeština 14. století":
      content = (
        <a href="https://www.czechency.org/slovnik/%C4%8CE%C5%A0TINA%2014.%20STOLET%C3%8D">
          Čeština 14. století na Czechency.org
        </a>
      );
      break;
    default:
      content = <p>-------</p>;
      break;
  }

  return <div>{content}</div>;
}

export default Info;
