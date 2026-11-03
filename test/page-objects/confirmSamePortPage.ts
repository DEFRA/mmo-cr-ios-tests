import { BaseCatchRecordPage } from './baseCatchRecordPage.ts';
import AddGearPage from './addGearPage.ts';
import SelectPortDeparturePage from './selectPortDeparturePage.ts';
import { logStep } from '../common/logger.ts';

export class ConfirmSamePortPage extends BaseCatchRecordPage {
    protected override pageId = 'confirmSamePort';

    headingForPort(portName: string) {
        return $(
            `//XCUIElementTypeStaticText[@name="CatchRecord.confirmSamePort.heading" and @value="Was ${portName} the port or the closest port you set off from and returned to?"]`,
        );
    }

    get radioGroup() {
        return $('~CatchRecord.confirmSamePort.radioGroup');
    }

    get yesOption() {
        return $('~CatchRecord.confirmSamePort.option.yes');
    }

    get noOption() {
        return $('~CatchRecord.confirmSamePort.option.no');
    }

    async selectSamePort(option: 'yes' | 'no') {
        logStep(`selectSamePort option=${option}`);
        const selectedOption = option === 'yes' ? this.yesOption : this.noOption;
        await selectedOption.click();

        const nextPageHeading =
            option === 'yes' ? AddGearPage.heading : SelectPortDeparturePage.heading;
        await nextPageHeading.waitForDisplayed();
    }
}

export default new ConfirmSamePortPage();
