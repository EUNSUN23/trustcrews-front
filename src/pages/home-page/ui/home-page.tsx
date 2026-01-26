import Guide from './guide';
import MainBoard from './MainBoard';

export const HomePage = () => {
  return (
    <>
      <aside>
        <Guide />
      </aside>
      <main className='mt-10 mobile:mt-2'>
        <MainBoard />
      </main>
    </>
  );
};
