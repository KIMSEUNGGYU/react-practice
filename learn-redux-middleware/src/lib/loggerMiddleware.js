// store 는 리덕스 스토어
// next 함수 형태, store.dispatch 와 유사한 역할
// - store.disptach 는 첫 번째 미들웨어 부터 다시 처리
// - next 는 다음 미들웨어로 요청, (다음 미들웨어 없으면 reducer 처리)
// action 은 디스패치된 액션

const loggerMiddleware = (store) => (next) => (action) => {
  console.group(action && action.type);
  console.log('이전 상태', store.getState());
  console.log('액션', action);
  next(action);
  console.log('다음 상태', store.getState());
  console.groupEnd();
};

export default loggerMiddleware;
