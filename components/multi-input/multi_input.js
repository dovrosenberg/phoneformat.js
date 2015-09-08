Template.InternationalPhoneMultiInput.helpers({
  dialCode: function () {
    return PhoneInput(this.id).getDialCode();
  },
  phoneNumber: function () {
    return PhoneInput(this.id).getPhoneNumber();
  },
  exampleCountryNumber: function () {
    var countryCode = PhoneInput(this.id).getCountryCode();

    var exampleNumber = Phoneformat.exampleMobileNumber(countryCode);
    var intlNumber = Phoneformat.formatInternational(countryCode, exampleNumber);

    return intlNumber.replace(/[0-9]/g, 'x');
  },
  maxPhoneNumberLength: function () {
    return PhoneInput(this.id).maxLength();
  }
});

Template.InternationalPhoneMultiInput.events({
  'input .js-intlMultiPhone-dialCode': function (event, template) {
    var currentValue = event.currentTarget.value;

    // Ensure that the dial code starts with a '+'.
    if (currentValue.charAt(0) !== '+') currentValue = '+' + currentValue;

    var dialCode = Phoneformat.dialCodeToName(currentValue);
    var country = COUNTRY_CODE_MAP[dialCode];
    if (!country) return;

    // Update country code var if a country exists for the current dial code.
    PhoneInput(template.data.id).setCountryCode(country.code);
  },
  'input .js-intlMultiPhone-phoneNumber': function (event, template) {
    var input = PhoneInput(template.data.id);

    var phoneNumber = event.currentTarget.value;

    var countryCode = input.getCountryCode();
    var formattedNumber = Phoneformat.formatInternational(countryCode, phoneNumber);

    var unmaskedValue = phoneNumber.replace(/\(|\)|\-/g, '');
    if (isNaN(unmaskedValue) || unmaskedValue.indexOf('+') > -1) {
      template.$('.js-intlMultiPhone-phoneNumber').val(formattedNumber);
    }

    // Set the phone number on the phone input object.
    input.setPhoneNumber(formattedNumber);
  }
});
