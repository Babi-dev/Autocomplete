import React, { useState } from "react";

import "./style.scss";

function Autocomplete({ suggestions }) {
  const [state, setState] = useState({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: ""
  });

  const onChange = e => {
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setState({
      activeSuggestion: 0,
      filteredSuggestions: filteredSuggestions || [],
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  const onClick = e => {
    setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  const onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = state;

    if (e.keyCode === 13) {
      setState({
        ...state,
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      setState({ ...state, activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (
        filteredSuggestions &&
        activeSuggestion - 1 === filteredSuggestions.length
      ) {
        return;
      }

      setState({
        ...state,
        activeSuggestion:
          activeSuggestion < filteredSuggestions.length - 1
            ? activeSuggestion + 1
            : activeSuggestion
      });
    }
  };

  let suggestionsListComponent;

  if (state.showSuggestions && state.userInput) {
    if (state.filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {state.filteredSuggestions.map((suggestion, index) => {
            let className;

            if (index === state.activeSuggestion) {
              className = "suggestion-active";
            }

            return (
              <li className={className} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className="no-suggestions">
          <span>Sem sugestões!</span>
        </div>
      );
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Marcas"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={state.userInput}
      />
      {suggestionsListComponent}
    </>
  );
}

export default Autocomplete;
