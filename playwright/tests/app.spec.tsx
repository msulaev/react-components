import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import App from "../../src/App";

test.describe("App", () => {
  test.only("should render and click", async ({ mount }) => {
    const component = await mount(<App />);
    await expect(component).toBeVisible();
    await component.locator("button").nth(0).click();
    await expect(component.getByText('Подтверждение удаления')).toBeVisible();
  });
});