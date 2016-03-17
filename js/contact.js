//Module to manager contact add and edit fucnctionality

app = typeof(app) === 'object' ? app : {};
(function(window,undefined) {
    var contact = {};

    contact.onSave = function() {
        var contact,contactId,
            contactForm = document.getElementById('contact-details-form');
            firstName  = document.getElementById('first-name').value,
            lastName = document.getElementById('last-name').value,
            mobilePhone = document.getElementById('mobile-phone').value,
            homePhone = document.getElementById('home-phone').value,
            email = document.getElementById('email').value,
            address = document.getElementById('address').value;

        if(firstName.length ===0 || lastName.length== 0) {
            alert('Please enter name');
            return;
        }
        contact = app.store.ContactDetails(firstName, lastName, mobilePhone, homePhone, email, address);

        if(app.mode === 'add') {
            app.store.addContact(contact);
            app.addressBook.addAddressBookItem(contact);
            contactId = contact.id;
        } else if(app.mode === 'edit') {
            contactId = app.addressBook.selectedContactId;
            app.store.addContact(contact,contactId);
            app.addressBook.updateAddressBookItem(contact);
        }

        contactForm.reset();
        app.addressBook.selectedContactId = contactId;
        app.addressBook.viewContactDetails(contactId);
    };

    contact.showAddContactView = function() {
        var currentStyle,
            contactPanelElem = document.getElementById('contact-panel'),
            descPanelElem = document.getElementById('desc-panel');
        app.mode = 'add';
        document.getElementById('contact-details-box').style.display = "none";
        document.getElementById('contact-details-form').reset();
        document.getElementById('btn-edit').style.display = "none";
        document.getElementById('contact-details-form').style.display = "block";

        currentStyle = getComputedStyle(descPanelElem, null);

        if(currentStyle.display === 'none') {
            descPanelElem.style.display = 'block';
            contactPanelElem.style.display = 'none';
        } 

        app.addressBook.selectedContactId = undefined;
    };

    contact.showEditContactView = function() {
        var contact,
            firstNameElem  = document.getElementById('first-name'),
            lastNameElem = document.getElementById('last-name'),
            mobilePhoneElem = document.getElementById('mobile-phone'),
            homePhoneElem = document.getElementById('home-phone'),
            emailElem = document.getElementById('email'),
            addressElem = document.getElementById('address');
        
        app.mode = 'edit';

        contact = app.store.getContact(app.addressBook.selectedContactId);
        firstNameElem.value = contact.firstName;
        lastNameElem.value = contact.lastName;
        if(contact.mobilePhone !== undefined) {
            mobilePhoneElem.value = contact.mobilePhone;
        }
        if(contact.homePhone !== undefined) {
            homePhoneElem.value = contact.homePhone;
        }
        if(contact.email !== undefined) {
            emailElem.value = contact.email;
        }
        if(contact.address !== undefined) {
            addressElem.value = contact.address;
        }

        document.getElementById('contact-details-box').style.display = "none";
        document.getElementById('contact-details-form').style.display = "block";
    };

    app.contact = contact;

}(this));

