import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

// 액션 타입 선언
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

// 액션 생성 함수 선언
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
// 마우스 클릭 이벤트가 payload 안에 들어가지 않도록 설정 "() => undefined"
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

// thunk 함수 생성
// export const increaseAsync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(increase());
//   }, 1000);
// };
// export const decreaseAsync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(decrease());
//   }, 1000);
// };

// saga 함수 생성
function* increaseSaga() {
  yield delay(1000); // 1초 기다림
  yield put(increase()); // 특정 이벤트 디스패치
}
function* decreaseSaga() {
  yield delay(1000); // 1초 기다림
  yield put(decrease()); // 특정 이벤트 디스패치
}
export function* counterSaga() {
  // takeEvery 는 들어오는 모든 액션에 대해 특정 작업 처리
  yield takeEvery(INCREASE_ASYNC, increaseSaga);

  // takeLatest 는 기존에 진행 중이던 작업이 있다면 취소하고
  // 가장 마지막으로 실행된 작업만 수행
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

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
