import React, { useState, useCallback } from 'react';

import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback(({ target }) => {
    setValue(target.value);
  }, []);

  const onSubmit = useCallback(
    (event) => {
      onInsert(value);
      setValue('');
      event.preventDefault();
    },
    [value, onInsert],
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
