import Nav from '@/shared/ui/Nav';
import { ReactNode } from 'react';

type ProjectLayoutProps = {
  children: ReactNode;
};

const ProjectLayout = ({ children }: ProjectLayoutProps) => {
  return (
    <section className='flex flex-col justify-center mx-auto tablet:mt-[2rem] tablet:pt-[1.5rem] tablet:px-[1.5rem] pb-[5rem]'>
      <section className='w-fit tablet:translate-x-[-50%] mobile:translate-x-[-20%]'>
        <Nav to='/' />
      </section>
      {children}
    </section>
  );
};

export default ProjectLayout;
