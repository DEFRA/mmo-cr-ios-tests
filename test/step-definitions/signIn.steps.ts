import { Then, When } from '@wdio/cucumber-framework';
import SignInPage from '../page-objects/signInPage.ts';
import type { CatchRecordWorld } from '../support/world.ts';

async function enterCredentials(world: CatchRecordWorld, email: string, password: string) {
    world.enteredEmail = email;
    world.enteredPassword = password;
    await SignInPage.enterEmail(email);
    await SignInPage.enterPassword(password);
}

Then('I should see the sign-in controls', async () => {
    await expect(SignInPage.heading).toBeDisplayed();
    await expect(SignInPage.emailField).toBeDisplayed();
    await expect(SignInPage.passwordField).toBeDisplayed();
    await expect(SignInPage.passwordVisibilityToggle).toBeDisplayed();
    await expect(SignInPage.signInButton).toBeDisplayed();
    await expect(SignInPage.forgottenPasswordLink).toBeDisplayed();
    await expect(SignInPage.createAccountLink).toBeDisplayed();
});

When(
    'I enter the email {string} and password {string}',
    async function (this: CatchRecordWorld, email: string, password: string) {
        await enterCredentials(this, email, password);
    },
);

When(
    'I enter an email with a {int} character local part and a {int} character password',
    async function (this: CatchRecordWorld, localPartLength: number, passwordLength: number) {
        await enterCredentials(
            this,
            `${'a'.repeat(localPartLength)}@example.com`,
            'P'.repeat(passwordLength),
        );
    },
);

When('I enter the password {string}', async (password: string) => {
    await SignInPage.enterPassword(password);
});

When('I toggle the password visibility', async () => {
    await SignInPage.togglePasswordVisibility();
});

Then('the entered email and password should be retained', async function (this: CatchRecordWorld) {
    expect(await SignInPage.emailField.getAttribute('value')).toBe(this.enteredEmail);
    // The password field is secure, so only its length is observable.
    expect((await SignInPage.passwordField.getAttribute('value'))?.length).toBe(
        this.enteredPassword.length,
    );
});

Then('the email and password fields should be empty', async () => {
    expect(await SignInPage.emailField.getAttribute('value')).toBeNull();
    expect(await SignInPage.passwordField.getAttribute('value')).toBeNull();
});

Then('the sign-in button should be displayed', async () => {
    await expect(SignInPage.signInButton).toBeDisplayed();
});

Then('the password visibility toggle should be displayed', async () => {
    await expect(SignInPage.passwordVisibilityToggle).toBeDisplayed();
});

When('I tap the create an account link', async () => {
    await SignInPage.openCreateAccount();
});

Then('I should see the create an account guidance', async () => {
    await expect(SignInPage.vesselOwnerHeading).toBeDisplayed();
    await expect(SignInPage.vesselOwnerGuidance).toBeDisplayed();
    await expect(SignInPage.skipperOrAgentHeading).toBeDisplayed();
    await expect(SignInPage.skipperOrAgentGuidance).toBeDisplayed();
});
