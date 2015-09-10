var elements = {
    singleInput: '.js-intlSinglePhone-phoneNumber',
    multiInput: '.js-intlMultiPhone-phoneNumber',
    multiDialCode: '.js-intlMultiPhone-dialCode'
};

var $container, view, $input, phoneInput;

describe('Phone Format', function () {
    beforeAll(function () {
        $container = $('#test-container');
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000.
    });

    afterEach(function () {
        view.destroy();
    });

    describe('Single Input', function () {
        var data = {
            id: 'singleInput',
            class: 'testClass',
            hideDialCode: true
        };

        beforeEach(function () {
            view = Template.InternationalPhoneSingleInput.constructView().setData(data).attach($container[0]);

            $input = $(elements.singleInput);
            phoneInput = PhoneInput(data.id);
        });

        it('is initialized', function () {
            expect($input.length).not.toEqual(0);
            expect($input.hasClass('testClass')).toBe(true);
        });

        it('has correctly formatted data on input', function (done) {
            var value = '5555555555';
            var formattedValue = '(555) 555-5555';

            TestHelpers.inputValues([$input], [value], function () {
                setTimeout(function (){
                    expect($input.val()).toEqual(formattedValue);
                    done();
                }, 5000);
            });
        });

        it('does not accept non phone number characters', function (done) {
            var value = 'a!@#$%^&*()_+';

            TestHelpers.inputValues([$input], [' '], function () {
                TestHelpers.inputValues([$input], [value], function () {
                    setTimeout(function () {
                        expect($input.val()).toEqual('');
                        done();
                    }, 5000);
                });
            });

        });

        it('correctly sets phone number, dialcode and country code', function () {
            TestHelpers.typeInText(elements.singleInput, '5555555555');

            expect(PhoneInput(data.id).getPhoneNumber()).toEqual('(555) 555-5555');
            expect(PhoneInput(data.id).getCountryCode()).toEqual('US');
            expect(PhoneInput(data.id).getDialCode()).toEqual('');
        });
    });

    describe('Multi Input', function () {
        var data = {
            id: 'multiInput',
            class: 'testClass',
            hideDialCode: true
        };

        beforeEach(function () {
            view = Template.InternationalPhoneMultiInput.constructView().setData(data).attach($container[0]);

            $input = $(elements.multiInput);
            phoneInput = PhoneInput(data.id);
        });

        it('is initialized', function () {
            expect($input.length).not.toEqual(0);
            expect($input.hasClass('testClass')).toBe(true);
        });

        it('has correctly formatted data on input', function (done) {
            var value = '5555555555';
            var formattedValue = '(555) 555-5555';

            TestHelpers.inputValues([$input], [value], function () {
                setTimeout(function (){
                    expect($input.val()).toEqual(formattedValue);
                    done();
                }, 5000);
            });
        });

        it('does not accept non phone number characters', function (done) {
            var value = 'a!@#$%^&*()_+';
            TestHelpers.inputValues([$input], [' '], function () {
                TestHelpers.inputValues([$input], [value], function () {
                    setTimeout(function () {
                        expect($input.val()).toEqual('');
                        done();
                    }, 5000);
                });
            });
        });

        it('correctly sets phone number', function () {
            TestHelpers.typeInText(elements.multiInput, '5555555555');

            expect(PhoneInput(data.id).getPhoneNumber()).toEqual('(555) 555-5555');
        });

        it('correctly sets dialcode and country code', function () {
            TestHelpers.typeInText(elements.multiDialCode, '+1');

            expect(PhoneInput(data.id).getCountryCode()).toEqual('US');
            expect(PhoneInput(data.id).getDialCode()).toEqual('+1');
        });
    });
});