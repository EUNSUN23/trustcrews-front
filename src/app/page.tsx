import Guide from '@/features/guide/components/Guide';
import MainBoard from '@/layouts/MainBoard';
import StaticDataProvider from '@/providers/data/StaticDataProvider';
import { checkIsAuthorized } from '@/lib/checkIsAuthorized';

const RootPage = () => {
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

export default RootPage;
