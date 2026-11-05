import { BaseCatchRecordPage } from './baseCatchRecordPage.ts';
import { logStep } from '../common/logger.ts';
import TripTodayPage from './tripTodayPage.ts';

export class SelectVesselPage extends BaseCatchRecordPage {
    protected override pageId = 'selectVessel';

    get selectVesselHeading() {
        return $('~Which vessel did you use?');
    }

    get radioGroup() {
        return $('~CatchRecord.selectVessel.radioGroup');
    }

    vesselOption(vesselName: string) {
        return this.selector(`CatchRecord.selectVessel.option.${vesselName.toLowerCase()}`);
    }
    async selectVessel(vesselName: 'ACHILLES' | 'HERCULES') {
        logStep('selectVessel with vessel name: ' + vesselName);
        await this.vesselOption(vesselName).click();
        await TripTodayPage.questionHeading.waitForDisplayed();
    }
}

export default new SelectVesselPage();
