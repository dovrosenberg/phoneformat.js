Template.InternationalPhoneSingleInput.helpers({
  phoneNumber: function () {
    var input = PhoneInput(this.id);

    return (!input.hideDialCode ? input.getDialCode() + ' ' : '') + (input.getPhoneNumber() || '');
  },
  exampleCountryNumber: function () {
    var input = PhoneInput(this.id);
    var countryCode = input.getCountryCode();

    var exampleNumber = Phoneformat.exampleMobileNumber(countryCode);
    var intlNumber = Phoneformat.formatInternational(countryCode, exampleNumber);

    return (!input.hideDialCode ? input.getDialCode() + ' ' : '') + intlNumber.replace(/[0-9]/g, 'x');
  },
  maxPhoneNumberLength: function () {
    return PhoneInput(this.id).maxLength();
  }
});

Template.InternationalPhoneSingleInput.events({
  'input .js-intlSinglePhone-phoneNumber': function (event, template) {
    var input = PhoneInput(template.data.id);

    var phoneNumber = event.currentTarget.value;

    var countryCode = input.getCountryCode();
    var formattedNumber = Phoneformat.formatInternational(countryCode, phoneNumber);
    var unmaskedValue = phoneNumber.replace(/\(|\)|\-/g, '');
    if (isNaN(unmaskedValue)) {
      template.$('.js-intlSinglePhone-phoneNumber').val(formattedNumber);
    }

    // Set the phone number on the phone input object.
    if (template.data.hideDialCode) {
      input.setPhoneNumber(formattedNumber);
    } else {
      input.setValue(formattedNumber);
    }
  }
});
