import { startLoading, finishLoading } from '../module/loading';

export default function createRequestThunk(type, request) {
  // 성공 및 실패 액션 타입을 정의
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return (params) => async (dispatch) => {
    dispatch({ type }); // 요청 시작
    dispatch(startLoading(type));

    try {
      const response = await request(params);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      }); // 성공
      dispatch(finishLoading(type));
    } catch (error) {
      //   console.error(error);
      dispatch({
        type: FAILURE,
        payload: error,
        error: true,
      });
      dispatch(finishLoading(type));

      throw error;
    }
  };
}

// 사용 법 createRequestThunk('GET_USERS', api.getUsers)
