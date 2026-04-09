import React, { useEffect, useMemo, useRef, useState } from "react";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { greyScaleColour } from "@mono/theme";
import { AnimationWrapper, ComponentWrapper, NumberDisplay, BudgetDisplay, BudgetAmount, BudgetPercentage, BudgetDescription, SliderBottomLine, SliderChildWrapper, SliderParentWrapper, StyledSlider, StyledSliderLabel, TextBelowNumber } from "./styles";


const SadEmoji = ({ position }: { position: { x: number, y: number } }) => {
    return(
      <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: `${position.x}px`, top: `${position.y}px`, transform: 'translate(-50%, -50%)', opacity: 2, zIndex: 9999, width: 45, height: 45 }}>
        <path d="M254.398 475.2C142.798 475.2 22.3984 405.2 22.3984 251.6C22.3984 98 142.798 28 254.398 28C316.398 28 373.598 48.4 415.998 85.6C461.998 126.4 486.398 184 486.398 251.6C486.398 319.2 461.998 376.4 415.998 417.2C373.598 454.4 315.998 475.2 254.398 475.2Z" fill="url(#paint0_radial_2774_14789)" />
        <path d="M445.96 118.68C467.28 153.08 478.4 194.04 478.4 239.6C478.4 307.2 454 364.4 408 405.2C365.6 442.4 308 463.2 246.4 463.2C174.16 463.2 98.3997 433.8 53.6797 371.44C96.7197 442.08 177.68 475.2 254.4 475.2C316 475.2 373.6 454.4 416 417.2C462 376.4 486.4 319.2 486.4 251.6C486.4 200.64 472.52 155.36 445.96 118.68Z" fill="#EB8F00" />
        <path d="M176 163.76C159.24 163.76 144 177.92 144 201.44C144 224.96 159.24 239.08 176 239.08C192.8 239.08 208 224.92 208 201.44C208 177.96 192.96 163.76 176 163.76Z" fill="#422B0D" />
        <path d="M174.602 179.48C168.922 176.76 162.082 179.16 159.322 184.84C157.202 189.28 158.162 194.6 161.722 198.04C167.402 200.76 174.242 198.36 177.002 192.68C179.122 188.24 178.162 182.92 174.602 179.48Z" fill="#896024" />
        <path d="M329.602 163.76C312.842 163.76 297.602 177.92 297.602 201.44C297.602 224.96 312.842 239.08 329.602 239.08C346.362 239.08 361.602 224.92 361.602 201.44C361.602 177.96 346.362 163.76 329.602 163.76Z" fill="#422B0D" />
        <path d="M328 179.48C322.32 176.76 315.48 179.16 312.72 184.84C310.6 189.28 311.56 194.6 315.12 198.04C320.8 200.76 327.64 198.36 330.4 192.68C332.52 188.24 331.56 182.92 328 179.48Z" fill="#896024" />
        <path d="M256.721 312.759C293.001 312.439 327.721 327.719 352.001 354.679C353.841 356.799 354.281 359.799 353.121 362.359C351.961 364.959 349.401 366.639 346.561 366.679C345.281 366.679 344.001 366.319 342.881 365.679C323.601 354.599 291.361 340.839 256.801 340.839H256.241C221.721 340.839 189.441 354.599 170.201 365.679C169.081 366.319 167.801 366.679 166.521 366.679C163.681 366.639 161.161 364.959 160.001 362.359C158.801 359.799 159.241 356.799 161.121 354.679C185.401 327.719 220.081 312.439 256.361 312.759" fill="#422B0D" />
        <defs>
          <radialGradient id="paint0_radial_2774_14789" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(254.398 251.6) scale(227.839 227.839)">
            <stop offset="0.5" stop-color="#FDE030" />
            <stop offset="0.92" stop-color="#F7C02B" />
            <stop offset="1" stop-color="#F4A223" />
          </radialGradient>
        </defs>
      </svg>
    )
}

const SmileEmoji = ({ position }: { position: { x: number, y: number } }) => {
    return(
        <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: `${position.x}px`, top: `${position.y}px`, transform: 'translate(-50%, -50%)', opacity: 2, zIndex: 9999, width: 45, height: 45 }}>
          <path d="M254.4 475.2C142.8 475.2 22.4004 405.2 22.4004 251.6C22.4004 98 142.8 28 254.4 28C316.4 28 373.6 48.4 416 85.6C462 126.4 486.4 184 486.4 251.6C486.4 319.2 462 376.4 416 417.2C373.6 454.4 316 475.2 254.4 475.2Z" fill="url(#paint0_radial_3348_6407)" />
          <path d="M176 163.76C159.24 163.76 144 177.92 144 201.44C144 224.96 159.24 239.08 176 239.08C192.8 239.08 208 224.92 208 201.44C208 177.96 192.96 163.76 176 163.76Z" fill="#422B0D" />
          <path d="M174.6 179.479C168.92 176.759 162.08 179.159 159.32 184.839C157.2 189.279 158.16 194.599 161.72 198.039C167.4 200.759 174.24 198.359 177 192.679C179.12 188.239 178.16 182.919 174.6 179.479Z" fill="#896024" />
          <path d="M329.6 163.76C312.84 163.76 297.6 177.92 297.6 201.44C297.6 224.96 312.84 239.08 329.6 239.08C346.36 239.08 361.6 224.92 361.6 201.44C361.6 177.96 346.36 163.76 329.6 163.76Z" fill="#422B0D" />
          <path d="M328 179.479C322.32 176.759 315.48 179.159 312.72 184.839C310.6 189.279 311.56 194.599 315.12 198.039C320.8 200.759 327.64 198.359 330.4 192.679C332.52 188.239 331.56 182.919 328 179.479Z" fill="#896024" />
          <path d="M252 366.44C215.72 366.72 181.08 351.48 156.8 324.52C154.96 322.4 154.52 319.4 155.68 316.84C156.84 314.24 159.4 312.56 162.24 312.52C163.52 312.52 164.8 312.88 165.92 313.52C185.2 324.6 217.44 338.36 252 338.36H252.56C287.08 338.36 319.36 324.6 338.6 313.52C339.72 312.88 341 312.52 342.28 312.52C345.12 312.56 347.68 314.24 348.84 316.84C350.04 319.4 349.6 322.4 347.72 324.52C323.44 351.48 288.72 366.76 252.44 366.44" fill="#422B0D" />
          <path d="M445.96 118.68C467.28 153.08 478.4 194.04 478.4 239.6C478.4 307.2 454 364.4 408 405.2C365.6 442.4 308 463.2 246.4 463.2C174.16 463.2 98.3997 433.8 53.6797 371.44C96.7197 442.08 177.68 475.2 254.4 475.2C316 475.2 373.6 454.4 416 417.2C462 376.4 486.4 319.2 486.4 251.6C486.4 200.64 472.52 155.36 445.96 118.68Z" fill="#EB8F00" />
          <defs>
            <radialGradient id="paint0_radial_3348_6407" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(254.4 251.6) scale(227.839 227.839)">
              <stop offset="0.5" stop-color="#FDE030" />
              <stop offset="0.92" stop-color="#F7C02B" />
              <stop offset="1" stop-color="#F4A223" />
            </radialGradient>
          </defs>
        </svg>
    )
}

const HappyEmoji = ({ position }: { position: { x: number, y: number } }) => {
  return(
    <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: `${position.x}px`, top: `${position.y}px`, transform: 'translate(-50%, -50%)', opacity: 2, zIndex: 9999, width: 45, height: 45 }}>
      <path d="M254.398 475.2C142.798 475.2 22.3984 405.2 22.3984 251.6C22.3984 98 142.798 28 254.398 28C316.398 28 373.598 48.4 415.998 85.6C461.998 126.4 486.398 184 486.398 251.6C486.398 319.2 461.998 376.4 415.998 417.2C373.598 454.4 315.998 475.2 254.398 475.2Z" fill="url(#paint0_radial_2774_14772)" />
      <path d="M445.96 118.68C467.28 153.08 478.4 194.04 478.4 239.6C478.4 307.2 454 364.4 408 405.2C365.6 442.4 308 463.2 246.4 463.2C174.16 463.2 98.3997 433.8 53.6797 371.44C96.7197 442.08 177.68 475.2 254.4 475.2C316 475.2 373.6 454.4 416 417.2C462 376.4 486.4 319.2 486.4 251.6C486.4 200.64 472.52 155.36 445.96 118.68Z" fill="#EB8F00" />
      <path d="M330.602 134.48C345.842 134.48 359.642 157.08 359.642 194.48C359.642 231.88 345.842 254.48 330.602 254.48C315.402 254.48 301.602 231.92 301.602 194.48C301.602 157.04 315.402 134.48 330.602 134.48Z" fill="#422B0D" />
      <path d="M181.081 134.48C164.881 134.48 150.121 157.08 150.121 194.48C150.121 231.88 164.881 254.48 181.081 254.48C197.321 254.48 212.081 231.92 212.081 194.48C212.081 157.04 197.321 134.48 181.081 134.48Z" fill="#422B0D" />
      <path d="M180.201 149.16C175.361 146.24 169.081 147.84 166.161 152.68C166.081 152.84 165.961 153 165.881 153.16C162.201 157.44 162.641 163.92 166.921 167.6C167.041 167.72 167.161 167.8 167.321 167.92C172.121 170.84 178.401 169.28 181.321 164.48C181.441 164.28 181.521 164.12 181.641 163.92C185.321 159.6 184.841 153.12 180.521 149.44C180.401 149.32 180.321 149.24 180.201 149.16Z" fill="#896024" />
      <path d="M332.84 149.16C327.96 146.28 321.64 147.88 318.76 152.76C318.68 152.88 318.6 153.04 318.52 153.16C314.88 157.52 315.48 163.96 319.84 167.6C319.88 167.64 319.96 167.68 320 167.72C324.8 170.64 331.08 169.08 334 164.28C334.12 164.08 334.2 163.92 334.32 163.72C337.96 159.36 337.36 152.92 333 149.28C332.96 149.24 332.88 149.2 332.84 149.16Z" fill="#896024" />
      <path d="M408.281 286.48C402.681 276.36 390.521 271.92 379.721 276C338.681 287.96 296.121 293.92 253.361 293.72C210.601 293.92 168.041 287.96 127.001 276C116.241 271.92 104.081 276.32 98.4806 286.4C93.0406 296.44 96.9606 308.08 101.561 318.12C127.241 374.52 183.841 408.28 253.041 408.48H253.681C322.881 408.48 379.481 374.52 405.201 318.12C409.761 308 413.721 296.52 408.281 286.48Z" fill="#422B0D" />
      <path d="M317.4 392.56C315.92 391.2 314.4 389.96 312.88 388.56C296.56 374.2 275.44 366.48 253.68 366.92C231.28 366.56 209.48 374 192 388C190.48 389.24 188.88 390.44 187.4 392C185.92 393.56 185.12 394.68 184.16 396C206.16 404.6 229.6 409 253.24 408.88H253.88C276.52 408.88 298.96 404.84 320.16 396.88C319.36 395.36 318.44 393.92 317.4 392.56Z" fill="#ED7770" />
      <path d="M379.721 276.001C338.681 287.961 296.121 293.921 253.361 293.721C210.601 293.921 168.041 287.961 127.001 276.001C116.241 271.921 104.081 276.321 98.4806 286.401C97.6806 287.921 97.0406 289.521 96.6406 291.161C97.9606 291.841 99.4806 292.521 101.281 293.241C149.441 317.361 202.681 329.601 256.521 328.961C308.161 329.561 359.201 318.321 405.841 296.161C407.721 295.361 409.281 294.601 410.681 293.881C410.361 291.281 409.521 288.721 408.281 286.401C402.681 276.321 390.521 271.881 379.721 276.001Z" fill="white" />
      <path d="M408.441 286.52C402.761 276.4 390.561 271.92 379.681 276C338.641 287.96 296.081 293.92 253.361 293.72C210.601 293.92 168.041 287.96 127.001 276C116.241 271.92 104.081 276.32 98.4806 286.4C93.0406 296.44 96.9606 308.08 101.561 318.12C103.601 322.64 105.881 327.08 108.401 331.36C108.401 331.36 100.001 300.24 107.281 291.2C109.761 287.36 113.921 284.96 118.481 284.72C120.361 284.72 122.201 285.04 124.001 285.6C165.761 297.88 209.081 304.08 252.641 304H254.041C297.601 304.08 340.921 297.88 382.681 285.6C384.481 285.04 386.321 284.72 388.201 284.72C392.761 284.96 396.961 287.36 399.441 291.2C406.841 300.24 398.321 331.48 398.321 331.48C400.801 327.2 403.281 322.8 405.361 318.24C409.921 308.2 413.881 296.6 408.441 286.52Z" fill="#EB8F00" />
      <defs>
        <radialGradient id="paint0_radial_2774_14772" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(254.398 251.6) scale(227.839 227.839)">
          <stop offset="0.5" stop-color="#FDE030" />
          <stop offset="0.92" stop-color="#F7C02B" />
          <stop offset="1" stop-color="#F4A223" />
        </radialGradient>
      </defs>
    </svg>
  )
}

const emojiCoordinateBasedOnSliderValue = (sliderValue: number) => {
  let position = { x: 65, y: 225 };
  switch (sliderValue) {
    case 0:
      position = { x: 65, y: 225 };
      break;
    case 1:
      position = { x: 57, y: 194 };
      break;
    case 2:
      position = { x: 61, y: 140 };
      break;
    case 3:
      position = { x: 84, y: 91 };
      break;
    case 4:
      position = { x: 120, y: 64 };
      break;
    case 5:
      position = { x: 207, y: 50 };
      break;
    case 6:
      position = { x: 260, y: 70 };
      break;
    case 7:
      position = { x: 285, y: 105 };
      break;
    case 8:
      position = { x: 305, y: 145 };
      break;
    case 9:
      position = { x: 307, y: 200 };
      break;
    case 10:
      position = { x: 287, y: 238 };
      break;
    default:
      position = { x: 65, y: 225 };
  }

  return position
}

export const Emoji = ({ sliderValue }: { sliderValue: number }) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  //const [position, setPosition] = useState({ x: 65, y: 224 });
  const position = emojiCoordinateBasedOnSliderValue(sliderValue);
  const uniqueId = useMemo(() => Math.random().toString(36).substring(2, 9), []);
  let emojiComponent = <SadEmoji position={position} />;
  if(!sliderValue || sliderValue < 5){
    emojiComponent = <SadEmoji position={position} />
  }else if(sliderValue >= 5 && sliderValue < 8){
    emojiComponent = <SmileEmoji position={position} />
  }else{
    emojiComponent = <HappyEmoji position={position} />
  }
  return (
    <div style={{ 
      position: "relative", 
      //width: "fit-content", 
      zIndex: 9999,
      width: 370,
      height: 370
    }}>
    {emojiComponent}
    <svg
      width="100%"
      height="260"
      viewBox="0 0 363 251"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ zIndex: 1, position: "relative" }}
    >
      {/* Background Path */}
      <path
         ref={sliderValue > 4  ? pathRef : null}
        d="M276.683 240.835C279.958 243.255 284.594 242.573 286.825 239.166C298.514 221.317 305.659 200.834 307.579 179.51C309.721 155.733 305.284 131.825 294.754 110.4C284.224 88.9743 268.006 70.8563 247.874 58.0263C227.741 45.1963 204.469 38.1483 180.601 37.6526C156.733 37.1569 133.188 43.2327 112.54 55.2158C91.8922 67.1988 74.9363 84.6279 63.5258 105.598C52.1154 126.567 46.6897 150.27 47.8419 174.116C48.8752 195.501 55.1638 216.263 66.1015 234.582C68.1891 238.078 72.7927 238.952 76.1653 236.67V236.67C79.5379 234.388 80.3995 229.815 78.3373 226.304C68.9007 210.236 63.4739 192.089 62.5711 173.404C61.5494 152.259 66.3606 131.241 76.4788 112.646C86.597 94.051 101.633 78.5958 119.942 67.9699C138.251 57.344 159.13 51.9563 180.295 52.3958C201.459 52.8354 222.096 59.0852 239.948 70.4622C257.801 81.8391 272.182 97.9052 281.519 116.904C290.857 135.903 294.791 157.103 292.893 178.187C291.215 196.818 285.039 214.725 274.944 230.387C272.737 233.809 273.408 238.414 276.683 240.835V240.835Z"
        fill="#F1F1F1"
      />
      {/* Green Fill with Emoji at the End */}
      <g clipPath={`url(#clip3-${uniqueId})`}>
        <path
         ref={sliderValue <=4 ? pathRef : null}
          d="M76.3624 236.17C72.8912 238.521 68.1505 237.624 66.0057 234.021C55.1326 215.76 48.8748 195.077 47.8323 173.773C46.666 149.936 52.0735 126.236 63.4639 105.265C74.8543 84.2926 91.7896 66.8547 112.419 54.8557C133.049 42.8568 156.58 36.7586 180.441 37.2273C204.302 37.6959 227.575 44.7135 247.718 57.5132C267.86 70.313 284.098 88.4026 294.656 109.806C305.214 131.209 309.687 155.102 307.585 178.875C305.707 200.122 298.642 220.543 287.06 238.363C284.775 241.878 280.003 242.589 276.627 240.104V240.104C273.251 237.618 272.552 232.879 274.809 229.346C284.756 213.78 290.829 196.013 292.462 177.538C294.318 156.537 290.367 135.43 281.04 116.522C271.713 97.6147 257.369 81.6344 239.575 70.3271C221.781 59.0198 201.221 52.8205 180.143 52.4065C159.064 51.9925 138.277 57.3796 120.053 67.9795C101.828 78.5793 86.8676 93.984 76.8053 112.511C66.743 131.037 61.966 151.973 62.9963 173.031C63.9027 191.555 69.2728 209.548 78.6008 225.492C80.7179 229.111 79.8336 233.819 76.3624 236.17V236.17Z"
          fill="#11A43D"
        />
      </g>
      {/* Yellow Fill with Emoji at the End */}
      <g clipPath={`url(#clip2-${uniqueId})`}>
        <path
          d="M76.3624 236.17C72.8912 238.521 68.1506 237.624 66.0058 234.021C58.5726 221.537 53.272 207.88 50.3408 193.613C46.8996 176.864 46.7911 159.601 50.0216 142.81C53.252 126.019 59.758 110.028 69.1682 95.7515C78.5784 81.4747 90.7085 69.1913 104.866 59.6024C119.023 50.0135 134.931 43.3071 151.68 39.8659C168.429 36.4248 185.692 36.3163 202.483 39.5467C219.274 42.7771 235.265 49.2832 249.541 58.6934C261.703 66.7092 272.418 76.6986 281.253 88.2334C283.802 91.5617 282.876 96.2969 279.405 98.648V98.648C275.934 100.999 271.234 100.073 268.659 96.7647C260.959 86.8706 251.682 78.288 241.186 71.3696C228.574 63.0567 214.448 57.3092 199.615 54.4555C184.782 51.6017 169.531 51.6975 154.735 54.7374C139.939 57.7774 125.886 63.7018 113.38 72.1726C100.873 80.6434 90.1574 91.4947 81.8445 104.107C73.5315 116.719 67.7841 130.845 64.9303 145.678C62.0766 160.511 62.1724 175.761 65.2123 190.558C67.7422 202.872 72.2701 214.671 78.6009 225.492C80.7179 229.111 79.8336 233.819 76.3624 236.17V236.17Z"
          fill="#F4C237"
        />
      </g>
      {/* Red Fill with Emoji at the End */}
      <g clipPath={`url(#clip-${uniqueId})`}>
        <path
          d="M76.3624 236.17C72.8912 238.521 68.1506 237.624 66.0058 234.021C58.5726 221.537 53.272 207.88 50.3408 193.613C46.8996 176.864 46.7911 159.601 50.0216 142.81C53.252 126.019 59.758 110.028 69.1682 95.7515C77.1841 83.5902 87.1734 72.8753 98.7083 64.0402C102.037 61.4908 106.772 62.4163 109.123 65.8875V65.8875C111.474 69.3587 110.548 74.059 107.24 76.6339C97.3454 84.3338 88.7629 93.6105 81.8445 104.107C73.5315 116.719 67.7841 130.845 64.9303 145.678C62.0766 160.511 62.1724 175.761 65.2123 190.558C67.7422 202.872 72.2701 214.671 78.6009 225.492C80.7179 229.111 79.8336 233.819 76.3624 236.17V236.17Z"
          fill="#F43755"
        />
      </g>
      {/* Emoji Pattern Definition */}
      <defs>
        <pattern
          id="emojiPattern"
          patternUnits="userSpaceOnUse"
          width="35"
          height="35"
        >
          <img
            src="https://www.reshot.com/preview-assets/icons/PQYAU9E7VK/haha-PQYAU9E7VK.svg"
            width="35"
            height="35"
          />
        </pattern>
      </defs>
      {/* Clip Paths */}
      <defs>
        <clipPath id={`clip-${uniqueId}`}>
          <rect
            width="200"
            height={`${sliderValue * (200 / 4)}`}
            y={`${250 - sliderValue * (200 / 4)}`}
          />
        </clipPath>
        <clipPath id={`clip2-${uniqueId}`}>
          <rect
            width={`${Math.max(1, (sliderValue - 3) * (sliderValue === 5 ? 280 / 3 :245/3))}`}
            height="300"
          />
        </clipPath>
        <clipPath id={`clip3-${uniqueId}`}>
          <rect
            x="0"
            y="0"
            width="350"
            height={`${Math.max(0, (sliderValue - 7) * (sliderValue === 8 ? 380 / 3:300 / 3 ))}`}
          />
        </clipPath>
      </defs>
    </svg>
  </div>
  );
};


interface props{
  label:string
  onChange?: any
  value?: any
  budgetAmount?: string // New prop for budget amount like "$2,411"
  budgetPercentage?: string // New prop for percentage like "16%"
  budgetDescription?: string // New prop for description like "Your spending more than your budget"
  showBudget?: boolean // Flag to show budget instead of value
  hideSlider?: boolean // Flag to hide the slider and only show budget display
}
const Slider = ({ label, onChange, value, budgetAmount, budgetPercentage, budgetDescription, showBudget = false, hideSlider = false }: props) => {
  const marks = [
    { value: 0, label: "0" },
    { value: 10, label: "10" },
  ];

  if (hideSlider && showBudget) {
    // Only show budget display without slider
    return (
      <ComponentWrapper>
        <AnimationWrapper style={{ marginTop: "-20px", zIndex: 99 }}>
          <BudgetDisplay>
            <BudgetAmount>{budgetAmount}</BudgetAmount>
            {budgetPercentage && <BudgetPercentage>{budgetPercentage}</BudgetPercentage>}
            {budgetDescription && <BudgetDescription>{budgetDescription}</BudgetDescription>}
          </BudgetDisplay>
          <Emoji sliderValue={value} />
          <SliderBottomLine />
        </AnimationWrapper>
      </ComponentWrapper>
    );
  }

  return (
    <ComponentWrapper>
      <AnimationWrapper style={{ marginTop: "-20px", zIndex: 99 }}>
        {showBudget && budgetAmount ? (
          <BudgetDisplay>
            <BudgetAmount>{budgetAmount}</BudgetAmount>
            {budgetPercentage && <BudgetPercentage>{budgetPercentage}</BudgetPercentage>}
            {budgetDescription && <BudgetDescription>{budgetDescription}</BudgetDescription>}
          </BudgetDisplay>
        ) : (
          <NumberDisplay>{value ?? 0}</NumberDisplay>
        )}
        {/* <TextBelowNumber>Team performance rating</TextBelowNumber> */}
        <Emoji sliderValue={value} />
      </AnimationWrapper>
      <SliderParentWrapper>
        <SliderChildWrapper>
          <StyledSliderLabel textCenter>{label}</StyledSliderLabel>
          <StyledSlider
            value={value}
            marks={marks}
            onChange={(e: any) => {
              if (onChange) {
                onChange(e?.target?.value);
              }
            }}
            min={0}
            max={10}
            sx={{
              color: "#54AFC7",
              height: 6,
              "& .MuiSlider-rail": {
                backgroundColor: `${greyScaleColour.grey25}`,
                borderRadius: "4px",
              },
              "& .MuiSlider-thumb": {
                width: 18,
                height: 18,
                backgroundColor: "#54AFC7",
              },
            }}
          />
        </SliderChildWrapper>
      </SliderParentWrapper>
    </ComponentWrapper>
  );
};

export default Slider;
