import { useMediaQuery } from 'react-responsive';

const useDesktopMediaQuery = () => {
  return useMediaQuery({ query: '(min-width: 1280px)' });
};

export default useDesktopMediaQuery;
