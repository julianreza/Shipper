import React, { useState, useEffect } from "react";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const Driver = () => {
  const test = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <div>test</div>
      <div className="whitespace-no-wrap overflow-y-hidden overflow-x-scrool bg-red-100">
        {test.map((row, index) => (
          <div className="h-64 w-64 bg-white inline-block mr-6">test</div>
        ))}
      </div>
    </>
  );
};

export default Driver;
