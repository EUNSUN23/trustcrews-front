import Image from 'next/image';
import calcImageSizes from '@/lib/calcImageSizes';
import placeholderDataUrl from '@/constants/placeholderDataUrl';

interface TechStackImageProps {
  stackName: string;
  width?: number;
  height?: number;
}

const TechStackImage = ({ stackName }: TechStackImageProps) => {
  const fileName = stackName.toLowerCase().replace('.', '');

  return (
    <div className='relative inline-block pc:w-[32px] pc:h-[32px] tablet:w-[28px] tablet:h-[28px] mobile:w-[24px] mobile:h-[24px]'>
      <Image
        aria-hidden={true}
        src={`${process.env.NEXT_PUBLIC_URL}/images/tech/${fileName}.svg`}
        alt={stackName}
        fill
        sizes={calcImageSizes('24px', '28px', '32px')}
        placeholder={placeholderDataUrl}
      />
    </div>
  );
};

export default TechStackImage;
