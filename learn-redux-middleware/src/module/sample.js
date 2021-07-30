import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as api from '../lib/api';
import createRequestThunk from '../lib/createRequestThunk';
import { startLoading, finishLoading } from './loading';

// 액션 타입 선언
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

// 액션 생성 함수
export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

// thunk 함수 생성
// thunk 함수 내부에서 시작할 때, 성공, 실패할 때 다른액션을 디스패치 함.
// export const getPost = createRequestThunk(GET_POST, api.getPost);
// export const getUsers = createRequestThunk(GET_USERS, api.getUsers);
// 리팩토링 전
// export const getPost = (id) => async (dispatch) => {
//   // dispatch({ type: GET_POST }); // 요청 시작
//   // try {
//   //   const response = await api.getPost(id);
//   //   dispatch({
//   //     type: GET_POST_SUCCESS,
//   //     payload: response.data,
//   //   });
//   // } catch (error) {
//   //   dispatch({
//   //     type: GET_POST_FAILURE,
//   //     payload: error,
//   //     error: true,
//   //   });
//   //   throw error; // 나중에 컴포넌트단에서 에러를 조회 할 수 있게 해 줌
//   // }
// };
// export const getUsers = (id) => async (dispatch) => {
//   dispatch({ type: GET_USERS }); // 요청 시작

//   try {
//     const response = await api.getUsers(id);
//     dispatch({
//       type: GET_USERS_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_USERS_FAILURE,
//       payload: error,
//       error: true,
//     });
//     throw error; // 나중에 컴포넌트단에서 에러를 조회 할 수 있게 해 줌
//   }
// };

// redux-saga 함수 선언
function* getPostSaga(action) {
  yield put(startLoading(GET_POST)); // 로딩 시작
  // 파라미터로 aciton 을 받아 오면 action 의 정보를 조회할 수 있음.
  try {
    // call 을 사용하면 Pormise 를 반환하는 함수를 호출하고, 기다릴 수 있음.
    const post = yield call(api.getPost, action.payload); // == api.getPost(aciotn.paylod)
    yield put({
      type: GET_POST_SUCCESS,
      payload: post.data,
    });
  } catch (error) {
    yield put({
      type: GET_POST_FAILURE,
      payload: error,
      error: true,
    });
  }

  yield put(finishLoading(GET_POST)); // 로딩 완료
}
function* getUsersSaga() {
  yield put(startLoading(GET_USERS)); // 로딩 시작
  try {
    const users = yield call(api.getUsers);
    yield put({
      type: GET_USERS_SUCCESS,
      payload: users.data,
    });
  } catch (error) {
    yield put({
      type: GET_USERS_FAILURE,
      payload: error,
      error: true,
    });
  }

  yield put(finishLoading(GET_POST)); // 로딩 완료
}

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

// 초기 상태 선언
const initialState = {
  loading: {
    GET_POST: false,
    GET_USERS: false,
  },
  post: null,
  users: null,
};

const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
    }),

    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
  initialState,
);

export default sample;
