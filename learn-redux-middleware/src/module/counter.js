import { createAction, handleActions } from 'redux-actions';

// 액션 타입 선언
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 액션 생성 함수 선언
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 초기화
const initialState = 0;

// 리듀서 선언
const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState,
);

export default counter;
