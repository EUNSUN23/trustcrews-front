import { useMediaQuery } from 'react-responsive';

const useMobileMediaQuery = () => {
  return useMediaQuery({ query: '(max-width: 767px)' });
};

export default useMobileMediaQuery;
