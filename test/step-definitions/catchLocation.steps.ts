import { Given, Then, When } from '@wdio/cucumber-framework';
import iosFlowNavigator from '../helpers/iosFlowNavigator.ts';
import CatchLocationManualEntryPage from '../page-objects/catchLocationManualEntryPage.ts';
import CatchLocationPage from '../page-objects/catchLocationPage.ts';

Given('I have selected the catch area {string}', async (area: string) => {
    await iosFlowNavigator.completeCatchLocation(area);
});

When('I select the catch area {string} on the map', async (area: string) => {
    await CatchLocationPage.selectArea(area);
});

Then('I should see the catch location controls', async () => {
    await expect(CatchLocationPage.nearestAreasDescription).toBeDisplayed();
    await expect(CatchLocationPage.selectAreaDescription).toBeDisplayed();
    await expect(CatchLocationPage.map).toBeDisplayed();
    await CatchLocationPage.scrollToElement(CatchLocationPage.saveContinueButton);
});

Then('I should see the catch location map', async () => {
    await expect(CatchLocationPage.map).toBeDisplayed();
});

When('I scroll to the Other button', async () => {
    await CatchLocationPage.scrollToElement(CatchLocationPage.otherButton);
});

Then('the Other button should be displayed', async () => {
    await expect(CatchLocationPage.otherButton).toBeDisplayed();
});

When('I choose to enter the catch area manually', async () => {
    await CatchLocationPage.openManualEntry();
});

When('I zoom out of the map', async () => {
    await CatchLocationPage.zoomOut();
});

When('I zoom out of the map {int} times', async (times: number) => {
    for (let attempt = 0; attempt < times; attempt++) {
        await CatchLocationPage.zoomOut();
    }
});

When('I zoom in on the map', async () => {
    await CatchLocationPage.zoomIn();
});

Then('I should see {int} areas on the map', async (count: number) => {
    expect(await CatchLocationPage.visibleAreaCount()).toBe(count);
});

Then('I should see more than {int} areas on the map', async (count: number) => {
    expect(await CatchLocationPage.visibleAreaCount()).toBeGreaterThan(count);
});

Then('I should see at most {int} areas on the map', async (count: number) => {
    expect(await CatchLocationPage.visibleAreaCount()).toBeLessThanOrEqual(count);
});

Then('zooming out further should not change the number of areas', async () => {
    const countAtMaxZoom = await CatchLocationPage.visibleAreaCount();
    await CatchLocationPage.zoomOut();
    expect(await CatchLocationPage.visibleAreaCount()).toBe(countAtMaxZoom);
});

Then('the first area label should be displayed', async () => {
    await expect(CatchLocationPage.firstAreaLabel).toBeDisplayed();
});

Then('I should see the area search field', async () => {
    await expect(CatchLocationManualEntryPage.searchField).toBeDisplayed();
});

When('I search for the area {string}', async (term: string) => {
    await CatchLocationManualEntryPage.searchForArea(term);
});

Then('the area result {string} should be displayed', async (area: string) => {
    const result = CatchLocationManualEntryPage.areaResult(area);
    await result.waitForExist({ timeout: 10000 });
    await CatchLocationManualEntryPage.scrollToElementIfExisting(result);
    await expect(result).toBeDisplayed();
});

When('I select the area result {string}', async (area: string) => {
    await CatchLocationManualEntryPage.areaResult(area).click();
});

When('I select the area {string} from the suggestions', async (area: string) => {
    await CatchLocationManualEntryPage.selectArea(area);
});

When('I select the area {string} by searching for {string}', async (area: string, term: string) => {
    await CatchLocationManualEntryPage.selectArea(area, term);
});

Then('the area search field should contain {string}', async (value: string) => {
    await expect(CatchLocationManualEntryPage.searchField).toHaveAttribute('value', value);
});
