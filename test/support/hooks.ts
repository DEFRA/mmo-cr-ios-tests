import { After } from '@wdio/cucumber-framework';
import { logStep } from '../common/logger.ts';
import SignInPage from '../page-objects/signInPage.ts';

After(async () => {
    logStep('After scenario');
    await SignInPage.close();
});
