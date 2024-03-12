import React from 'react';
import './SearchForm.scss';
// import searchIcon from '../assets/search-icon.png';

const SearchForm = ({placeholder,SearchIcon}) => {
  return (
    <div className="search-form1">
      <div className="input">
        <input type="search" placeholder={placeholder} />
        <div className="search-icon">
          {SearchIcon}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
