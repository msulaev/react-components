import { test, expect } from '@playwright/experimental-ct-react';
import Modal from '../../src/modals/_components/Modals/Modal';
import React from 'react';
import '../../src/index.css'; // Import the CSS file

test.describe('Modal Component', () => {
  test('should render correctly when open', async ({ mount }) => {
    const component = await mount(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    await expect(component).toContainText('Modal Content');
    await expect(component).toBeVisible();
  });

  test('should not render when closed', async ({ mount }) => {
    const component = await mount(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    await expect(component).not.toBeVisible();
  });

  test('should call onClose when close button is clicked', async ({ mount }) => {
    let closeCalled = false;
    const onClose = () => {
      closeCalled = true;
    };

    const component = await mount(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    await component.locator('button').click();
    expect(closeCalled).toBe(true);
  });

  test('should have overlay when hasOverlay is true', async ({ mount }) => {
    const component = await mount(
      <Modal isOpen={true} onClose={() => {}} hasOverlay={true}>
        <div>Modal Content</div>
      </Modal>
    );

    await expect(component.locator('.bg-black.bg-opacity-50')).toBeVisible();
  });

  test('should not have overlay when hasOverlay is false', async ({ mount }) => {
    const component = await mount(
      <Modal isOpen={true} onClose={() => {}} hasOverlay={false}>
        <div>Modal Content</div>
      </Modal>
    );

    await expect(component.locator('.bg-black.bg-opacity-50')).not.toBeVisible();
  });
});