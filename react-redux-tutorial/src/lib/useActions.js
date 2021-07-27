import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

// 여러 개의 액션을 사용해야 할 때 사용
// 액션 생성 함수를 디스패치하는 함수로 만들어 줌
export default function useActions(actions, deps) {
  const dispatch = useDispatch();

  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map((action) => bindActionCreators(action, dispatch));
      }

      return bindActionCreators(actions, dispatch);
    },
    deps ? [dispatch, ...deps] : deps,
  );
}
