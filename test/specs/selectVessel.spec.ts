import HomePage from '../page-objects/homePage.ts';
import SelectVesselPage from '../page-objects/selectVesselPage.ts';
import TripTodayPage from '../page-objects/tripTodayPage.ts';
import iosFlowNavigator from '../helpers/iosFlowNavigator.ts';
import { logStep } from '../common/logger.ts';

describe('iOS select vessel page', () => {
    beforeEach(async () => {
        logStep('beforeEach');
        await iosFlowNavigator.signIn();
        await iosFlowNavigator.openCreateRecord();
        await expect(SelectVesselPage.selectVesselHeading).toBeDisplayed();
    });

    afterEach(async () => {
        logStep('afterEach');
        await SelectVesselPage.close();
    });

    it('shows both vessel options unselected initially', async () => {
        logStep('shows both vessel options unselected initially');
        await expect(SelectVesselPage.vesselOption('achilles')).not.toBeSelected();
        await expect(SelectVesselPage.vesselOption('hercules')).not.toBeSelected();
    });

    it('continues to the trip-today page after selecting ACHILLES', async () => {
        logStep('continues to the trip-today page after selecting ACHILLES');
        await SelectVesselPage.selectVessel('ACHILLES');

        await expect(TripTodayPage.questionHeading).toBeDisplayed();
    });

    it('continues to the trip-today page after selecting HERCULES', async () => {
        logStep('continues to the trip-today page after selecting HERCULES');
        await SelectVesselPage.selectVessel('HERCULES');

        await expect(TripTodayPage.questionHeading).toBeDisplayed();
    });

    it('returns to the dashboard when the back link is clicked', async () => {
        logStep('returns to the dashboard when the back link is clicked');
        await SelectVesselPage.backButton.click();

        await HomePage.scrollToElement(HomePage.catchRecordsHeading);
        await expect(HomePage.catchRecordsHeading).toBeDisplayed();
    });
});
