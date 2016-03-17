//Module to manager storage of data

app = typeof(app) === 'object' ? app : {};
(function(window, undefined) {

    var store = {};

    store.ContactDetails = function(firstName, lastName, mobilePhone, homePhone, email, address) {
        return { firstName : firstName, lastName : lastName, mobilePhone : mobilePhone, homePhone : homePhone, email : email, address : address  }
    };

    store.addContact = function(contact,contactId) {
        var contacts  = JSON.parse(localStorage.contacts);
        if(contactId === undefined) {
            contact.id = contacts.length + 1;
            contacts.push(contact);
        } else {
            contact.id = contactId;
            contacts[contactId-1] = contact;
        }
        localStorage.contacts = JSON.stringify(contacts);
    };
    
    store.init = function() {
        if(typeof localStorage !== 'undefined') {
            if(localStorage.contacts === undefined) {
                localStorage.contacts = JSON.stringify([]);
                store.addContact(store.ContactDetails('Vaibhav', 'Tyagi', '4042248963', '9988775566', 'vaibhavtyagi22@gmail.com','3494 Apartments Bangalore KA 560100India'));
                store.addContact(store.ContactDetails('Sonu', 'Tyagi', undefined ,'20644556398', 'james@yahoo.com', 'bangalore'));
                store.addContact(store.ContactDetails('Monu', 'Tyagi','4423568985','2046689742', undefined, 'kanpur'));
            }           
        } else {
            alert('Sorry! No Web Storage support..');
        }
    };

    store.getAllContacts = function() {
        return JSON.parse(localStorage.contacts);
    };
    
    store.getContact = function(id) {
        var contacts = JSON.parse(localStorage.contacts);
        return contacts[id-1];
    };
    
    store.init();   
    app.store = store;
    
}(this));
