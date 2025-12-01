import Guide from '@/app/(home)/_components/GuideContainer';
import MainBoard from '@/features/homePage/ui/mainBoard';
import StaticDataProvider from '@/providers/data/StaticDataProvider';
import { checkIsAuthorized } from '@/lib/checkIsAuthorized';

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
