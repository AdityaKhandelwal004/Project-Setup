import { useSelector } from 'react-redux';
import { StyledContainer, StyledLoader } from './styles.tsx';
import loaderData from './loader.json' with { type: 'json' };
import * as LottieModule from 'react-lottie';
import type { LoaderState } from '@mono/models';

const Lottie : any = LottieModule.default;

export const defaultLoaderOptions = {
  loop: true,
  animationData: loaderData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Loader = () => {
  const loaderState = useSelector(
    (state: { loader: LoaderState }) => state.loader
  );
  return (
    loaderState.visibility && (
      <StyledContainer>
        <Lottie options={defaultLoaderOptions} height={'auto'} width={'52px'} />
      </StyledContainer>
    )
  );
};

export default Loader;
