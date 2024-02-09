import {by, device, element, expect} from 'detox';
import {TestIds} from './TestIds';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    const address1 = '0x1f07ccCb84F550100a786EAFf7e7179C52b0aC8d';
    // const address2 = '0x62BdD7864695d8B4c760CD1ea5635cD23A84d513';
    await expect(
      element(by.id(TestIds.ONBOARDING_CONNECT_WALLET_SCREEN)),
    ).toBeVisible();
    await expect(
      element(by.id(TestIds.ONBOARDING_CONNECT_WALLET_BUTTON)),
    ).toBeVisible();
    await element(by.id(TestIds.ONBOARDING_CONNECT_WALLET_BUTTON)).tap();
    await expect(
      element(by.id(TestIds.ONBOARDING_CONNECT_GUEST_OPTION_BUTTON)),
    ).toBeVisible();
    await element(by.id(TestIds.ONBOARDING_CONNECT_GUEST_OPTION_BUTTON)).tap();
    await expect(
      element(by.id(TestIds.CONVERSATION_LIST_SCREEN)),
    ).toBeVisible();
    await expect(
      element(by.id(TestIds.CONVERSATION_LIST_NEW_BUTTON)),
    ).toBeVisible();
    await element(by.id(TestIds.CONVERSATION_LIST_NEW_BUTTON)).tap();
    await expect(element(by.id(TestIds.SEARCH_SCREEN))).toBeVisible();
    await expect(element(by.id(TestIds.SEARCH_INPUT))).toBeVisible();
    await element(by.id(TestIds.SEARCH_INPUT)).typeText(address1);
    await expect(
      element(by.id(`${TestIds.SEARCH_RESULT}_${address1}`)),
    ).toBeVisible();
    await element(by.id(`${TestIds.SEARCH_RESULT}_${address1}`)).tap();
    await expect(element(by.id(TestIds.SEARCH_START_BUTTON))).toBeVisible();
    await element(by.id(TestIds.SEARCH_START_BUTTON)).tap();
    await expect(element(by.id(TestIds.CONVERSATION_SCREEN))).toBeVisible();
    await expect(element(by.id(TestIds.CONVERSATION_INPUT))).toBeVisible();
  });
});
