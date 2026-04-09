import React from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import type { LoaderState } from '@mono/models';

const loaderRotate = keyframes`
  0% {
    transform: rotate(90deg);
    box-shadow:
      0 20px 30px 0 #FF4B00 inset,
      0 60px 60px 0 #FF4B00 inset;
  }
  50% {
    transform: rotate(270deg);
    box-shadow:
      0 20px 10px 0 #6828E8 inset,
      0 40px 60px 0 #6828E8 inset;
  }
  75% {
    transform: rotate(450deg);
    box-shadow:
      0 20px 30px 0 #064345 inset,
      0 60px 60px 0 #064345 inset;
  }
  100% {
    transform: rotate(450deg);
    box-shadow:
      0 20px 30px 0 #FF4B00 inset,
      0 60px 60px 0 #FF4B00 inset;
  }
`;

const LoaderBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 100px;
`;

const LoaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 78px;
  font-family: "DM Sans", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: white;
  border-radius: 50%;
  background-color: transparent;
  user-select: none;
  flex-direction: column;
  padding-top: 2px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const Loader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: transparent;
  animation: ${loaderRotate} 2s linear infinite;
  z-index: 0;
  opacity: 0.2;
`;

const LoaderLetter = styled.span`
  display: inline-block;
  z-index: 1;
  border-radius: 50ch;
  border: none;
  text-align: left;
  letter-spacing: -1px;
  color: #000;
  font-weight: 900;
`;

const TextBlockO = styled.div`
  width: 100%;
  text-align: center;
  line-height: 17px;
  padding-right: 4px;

  & ${LoaderLetter} {
    font-size: 24px;
  }
`;

const TextBlockM = styled.div`
  width: 100%;
  text-align: center;
  font-size: 11px;
  padding-left: 13px;
  line-height: 6px;
  letter-spacing: 1px;
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(17.5px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  z-index: 1000000;
`;

const CustomLoader = () => {
  const loaderState = useSelector(
    (state: { loader: LoaderState }) => state.loader
  );

  return (
    loaderState.visibility && (
      <BackgroundContainer>
        <LoaderBlock>
          <LoaderWrapper>
            <TextBlockO>
              <LoaderLetter>O</LoaderLetter>
              <LoaderLetter>b</LoaderLetter>
              <LoaderLetter>i</LoaderLetter>
              <LoaderLetter>e</LoaderLetter>
            </TextBlockO>
            <TextBlockM>
              <LoaderLetter>m</LoaderLetter>
              <LoaderLetter>o</LoaderLetter>
              <LoaderLetter>n</LoaderLetter>
              <LoaderLetter>e</LoaderLetter>
              <LoaderLetter>y</LoaderLetter>
            </TextBlockM>
            <Loader />
          </LoaderWrapper>
        </LoaderBlock>
      </BackgroundContainer>
    )
  );
};

export default CustomLoader;
