const PostIntroduction = ({ content }: { content: string }) => {
  return (
    <section className='min-h-[250px] mobile:min-h-[150px] flex flex-col justify-center'>
      <h2 className='text-2xl font-bold text-black100 mobile:text-xl'>
        프로젝트 소개
      </h2>
      <p className='py-10 mobile:py-5 border-t-2 border-b-2 mt-5 mobile:mt-3'>
        {content}
      </p>
    </section>
  );
};

export default PostIntroduction;
