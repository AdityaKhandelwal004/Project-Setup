import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { FeatureLevel } from "../config";
import { AuthenticationStatus, Right, Role } from "../redux/reducers/auth";
import OnlyWith from "./onlyWith";
const mockStore = configureStore([]);
const initialState = {
  auth: {
    rights: ["DASHBOARD","USER_PROFILE"],
    status: "AUTHENTICATED",
    role: ["ADMINISTRATOR", "INVALID"],
    token: "any_token",
    hasStatusAndRight(status: any, right: any) {
      if (!right || this.rights.indexOf(right) >= 0) {
        if (!status || status === this.status) {
          return true;
        }
      }
      return false;
    },
    hasRole(role: any) {
      if (role === this.role) {
        return true;
      }
      return false;
    },
  },
};
describe("OnlyWith component", () => {
  it("renders children when authentication status and right are valid", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <OnlyWith status={AuthenticationStatus.AUTHENTICATED} right={Right.DASHBOARD}>
          <div data-testid="content">Content</div>
        </OnlyWith>
      </Provider>
    );
    const contentElement = screen.getByTestId("content");
    expect(contentElement).toBeInTheDocument();
  });
  it("does not render children when authentication status is invalid", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <OnlyWith status={AuthenticationStatus.NOT_AUTHENTICATED}>
          <div data-testid="content">Content</div>
        </OnlyWith>
      </Provider>
    );
    const contentElement = screen.queryByTestId("content");
    expect(contentElement).toBeNull();
  });


});