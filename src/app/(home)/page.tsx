import Guide from '@/app/(home)/_components/GuideContainer';
import StaticDataProvider from '@/providers/data/StaticDataProvider';
import { checkIsAuthorized } from '@/lib/checkIsAuthorized';
import MainBoard from '@/app/(home)/_components/MainBoard';

export const revalidate = 0;

const HomePage = () => {
  const isAuthorized = checkIsAuthorized();
  return (
    <>
      <aside>
        <Guide />
      </aside>
      <main className='mt-10 mobile:mt-2'>
        <StaticDataProvider>
          <MainBoard isAuthorized={isAuthorized} />
        </StaticDataProvider>
      </main>
    </>
  );
};

export default HomePage;
