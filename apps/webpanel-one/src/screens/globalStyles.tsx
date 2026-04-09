import React from "react";
import { Modal } from "@mono/components";
import { respondTo } from "@mono/theme";
import styled from "styled-components";

export const ResponsiveModal:any = styled(Modal)`
  & > div:first-child {
    ${respondTo.screenRange(300, 767)} {
      max-width: 90% !important;
    }
  }
`;