const calcImageSizes = (mobile: string, tablet: string, pc: string) => {
  return `(max-width: 767px) ${mobile}, (max-width: 1279px) ${tablet}, ${pc}`;
};

export default calcImageSizes;
