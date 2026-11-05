import { type DataTable, Given, Then, When } from '@wdio/cucumber-framework';
import iosFlowNavigator from '../helpers/iosFlowNavigator.ts';
import AddGearPage from '../page-objects/addGearPage.ts';
import GearMeasurementsPage from '../page-objects/gearMeasurementsPage.ts';
import SelectGearPage from '../page-objects/selectGearPage.ts';

Given('I have added the gear {string}', async (gear: string) => {
    await iosFlowNavigator.addGear(gear);
});

When('I add the gear {string}', async (gear: string) => {
    await iosFlowNavigator.addGear(gear);
});

Given(
    'I have added the gear {string} with a mesh size of {string}',
    async (gear: string, meshSize: string) => {
        await iosFlowNavigator.addGear(gear);
        await iosFlowNavigator.enterGearMeasurements(meshSize);
    },
);

Given(
    'I have recorded the following details for gear {string}:',
    async (gearCode: string, details: DataTable) => {
        await iosFlowNavigator.selectGearDetails(gearCode, details.rowsHash());
    },
);

Then('I should see the add gear empty state', async () => {
    await expect(AddGearPage.emptyStateText).toBeDisplayed();
});

Then('I should see the add gear example text and search field', async () => {
    await expect(AddGearPage.exampleText).toBeDisplayed();
    await expect(AddGearPage.searchField).toBeDisplayed();
});

When('I search for the gear {string}', async (term: string) => {
    await AddGearPage.enterGearSearch(term);
});

Then('the gear search field should contain {string}', async (value: string) => {
    await expect(AddGearPage.searchField).toHaveAttribute('value', value);
});

Then('the gear result {string} should not be displayed', async (gear: string) => {
    await expect(AddGearPage.gearResult(gear)).not.toBeDisplayed();
});

Then('the gear result {string} should be displayed', async (gear: string) => {
    const result = AddGearPage.gearResult(gear);
    await result.waitForExist({ timeout: 10000 });
    await AddGearPage.scrollToElementIfExisting(result);
    await expect(result).toBeDisplayed();
});

Then(
    'the gear result {string} should match the search {string}',
    async (gear: string, term: string) => {
        const resultName = await AddGearPage.gearResult(gear).getAttribute('name');
        expect(resultName?.toLowerCase()).toContain(term.toLowerCase());
    },
);

When('I select the gear result {string}', async (gear: string) => {
    await AddGearPage.gearResult(gear).click();
});

Then('I should see the gear measurement controls', async () => {
    await expect(GearMeasurementsPage.wholeNumbersText).toBeDisplayed();
    await expect(GearMeasurementsPage.meshSizeLabel).toBeDisplayed();
    await expect(GearMeasurementsPage.meshSizeField).toBeDisplayed();
    await expect(GearMeasurementsPage.saveContinueButton).toBeDisplayed();
});

When('I enter a mesh size of {string}', async (meshSize: string) => {
    await GearMeasurementsPage.enterMeshSize(meshSize);
});

Then('the mesh size field should contain {string}', async (value: string) => {
    await expect(GearMeasurementsPage.meshSizeField).toHaveAttribute('value', value);
});

Then('the mesh size field should be empty', async () => {
    expect(await GearMeasurementsPage.meshSizeField.getAttribute('value')).toBeNull();
});

Then('I should see the whole numbers hint', async () => {
    await expect(GearMeasurementsPage.wholeNumbersText).toBeDisplayed();
});

Then('the gear option {string} should be displayed', async (gearCode: string) => {
    await expect(SelectGearPage.gearOption(gearCode)).toBeDisplayed();
});

Then('the gear option {string} should not be selected', async (gearCode: string) => {
    await expect(SelectGearPage.gearOption(gearCode)).not.toBeSelected();
});

Then('the gear option {string} should be selected', async (gearCode: string) => {
    await expect(SelectGearPage.gearOption(gearCode)).toBeSelected();
});

When('I tap the gear option {string}', async (gearCode: string) => {
    await SelectGearPage.selectGear(gearCode);
});

When(
    'I enter {string} for the {string} of gear {string}',
    async (value: string, variableName: string, gearCode: string) => {
        await SelectGearPage.enterGearVariable(gearCode, variableName, value);
    },
);

Then(
    'the {string} field of gear {string} should be displayed',
    async (variableName: string, gearCode: string) => {
        await expect(SelectGearPage.gearVariableField(gearCode, variableName)).toBeDisplayed();
    },
);

Then(
    'the {string} field of gear {string} should contain {string}',
    async (variableName: string, gearCode: string, value: string) => {
        await expect(SelectGearPage.gearVariableField(gearCode, variableName)).toHaveAttribute(
            'value',
            value,
        );
    },
);

Then('I should see the add another gear button', async () => {
    await expect(SelectGearPage.addAnotherGearButton).toBeDisplayed();
});

When('I choose to add another gear', async () => {
    await SelectGearPage.addAnotherGear();
});
