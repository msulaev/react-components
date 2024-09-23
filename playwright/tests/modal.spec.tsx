import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Modal from "../../src/modals/_components/Modals/Modal";

test.describe("Modal", () => {
  test("should render", async ({ mount }) => {
    const component = await mount(
      <Modal isOpen={true} onClose={() => {}} isRedBg={false}>
        <div>Hello World</div>
      </Modal>
    );
    await expect(component).toBeVisible();
  });

  test("should render with red background", async ({ mount }) => {
    const component = await mount(
      <Modal isOpen={true} onClose={() => {}} isRedBg={true}>
        <div>Hello World</div>
      </Modal>
    );
    await expect(component).toBeVisible();
  });
});