import Guide from '@/app/(home)/_components/GuideContainer';
import StaticDataProvider from '@/app/_providers/StaticDataProvider';
import MainBoard from '@/app/(home)/_components/MainBoard';

export const revalidate = 0;

const HomePage = () => {
  return (
    <>
      <aside>
        <Guide />
      </aside>
      <main className='mt-10 mobile:mt-2'>
        <StaticDataProvider>
          <MainBoard />
        </StaticDataProvider>
      </main>
    </>
  );
};

export default HomePage;
