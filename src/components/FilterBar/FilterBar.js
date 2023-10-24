import { StyledSearch } from './FilterBar.styled';

export const FilterBar = ({ filter, onChangeFilter }) => {
  return (
    <StyledSearch>
      <input
        placeholder="Filter"
        type="text"
        value={filter}
        onChange={e => onChangeFilter(e.target.value)}
      ></input>
    </StyledSearch>
  );
};
