class FormUtils {
    static async fillFormField(field, value, options = {}) {
        const {
            isSelect = false,
            isDate = false,
            timeout = 5000,
            pressEnter = false
        } = options;

        if (value === undefined || value === null) {
            return;
        }

        await field.waitFor({ state: 'visible', timeout });

        if (isSelect) {
            await field.selectOption(value);
            return;
        }

        await field.fill(value.toString());
        if (pressEnter) {
            await field.press('Enter');
        }
    }

    static async getFieldErrors(page, options = {}) {
        const {
            alertSelector = "div.alert-danger",
            requiredSelector = "span:text('required')",
            fieldErrorSelector = "span.field-error",
            formErrorSelector = "div.form-error"
        } = options;

        const errors = new Map();

        // Helper function to collect errors
        const collectErrors = async (selector, category) => {
            const elements = await page.locator(selector).all();
            if (elements.length > 0) {
                errors.set(category, await Promise.all(
                    elements.map(async el => await el.textContent())
                ));
            }
        };

        // Collect different types of errors
        await Promise.all([
            collectErrors(alertSelector, 'alerts'),
            collectErrors(requiredSelector, 'required'),
            collectErrors(fieldErrorSelector, 'fields'),
            collectErrors(formErrorSelector, 'form')
        ]);

        return errors;
    }

    static formatValidationErrors(errors) {
        const icons = {
            alerts: '🚫',
            required: '⚠️',
            fields: '❗',
            form: '❌'
        };

        const titles = {
            alerts: 'Form Errors',
            required: 'Required Fields',
            fields: 'Field Validation Errors',
            form: 'Form Validation Errors'
        };

        let output = [];
        errors.forEach((messages, category) => {
            if (messages.length > 0) {
                output.push(`\n${icons[category]} ${titles[category]}:`);
                messages.forEach(msg => output.push(`  • ${msg.trim()}`));
            }
        });

        return output.join('\n');
    }
}

module.exports = { FormUtils };