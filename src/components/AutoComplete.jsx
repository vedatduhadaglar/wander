import React from "react";
import { Autocomplete } from "@react-google-maps/api";

const LocationAutocomplete = ({
  searchValue,
  handleSearchChange,
  handlePlaceSelect,
  autocompleteRef,
}) => {
  return (
    <div className="w-full">
      <Autocomplete
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete;
          autocomplete.setFields(["formatted_address"]);
        }}
        onPlaceChanged={handlePlaceSelect}
        options={{
          types: ["(cities)"],
        }}
      >
        <input
          type="text"
          onChange={handleSearchChange}
          placeholder="Where are you planning to go? ✈️"
          required
          value={searchValue}
          className="input_styles"
        />
      </Autocomplete>
    </div>
  );
};

export default LocationAutocomplete;
