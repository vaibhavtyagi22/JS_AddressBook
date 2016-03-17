//Module to manager address book's contact list

app = typeof(app) === 'object' ? app : {};
(function(window, undefined) {
    var addressBook = { };
    
    addressBook.initAddressBook = function() {
        var li, 
            contactName,        
            contacts = app.store.getAllContacts(),
            contactListElem = document.getElementById('contactList');
        
        contactListElem.innerHTML = "";
        for (var i=0; i < contacts.length; i++ ) {
            addressBook.addAddressBookItem(contacts[i]);
        }
        
        addressBook.createAlphabetLinks();
    };
    
    addressBook.createAlphabetLinks = function() {
        var li,text,
            alphabetLinksElem = document.getElementById("alphabetLinks");
            alphabets = "ACFHJLOQSUXZ".split('');
            
        for (var i=0; i < alphabets.length; i++ ) {
            li = document.createElement('li');
            text = document.createTextNode(alphabets[i]);
            li.appendChild(text);
            app.addEvent(li,'click', function (event) {     
                event = event || window.event;
                var alpha = event.target.textContent;
                addressBook.filter(alpha);
            });
            alphabetLinksElem.appendChild(li);
            li = document.createElement('li');          
            li.innerHTML = '&#8226;';
            alphabetLinksElem.appendChild(li);
        }
        
        alphabetLinksElem.lastChild.innerHTML = '&#35;';
        app.addEvent(alphabetLinksElem.lastChild,'click', function (event) {        
                event = event || window.event;
                var alpha = event.target.textContent;
                addressBook.filter('');
        });
        
    };

    addressBook.addAddressBookItem = function(contact) {
        var li,
            contactListElem = document.getElementById('contactList');
        
        li = addressBook.createAddressBookItem(contact);            
        contactListElem.appendChild(li);
    };

    addressBook.updateAddressBookItem = function(contact) {
        var li,contactElem,
            listItems = document.getElementById('contactList').childNodes;
        
        listItems[contact.id-1].textContent = contact.firstName + ' ' + contact.lastName;
    };
    
    addressBook.createAddressBookItem = function(contact) {
        var li,text, contactId;     
        li = document.createElement('li');
        text = document.createTextNode(contact.firstName + ' ' + contact.lastName);
        li.appendChild(text);
        li.setAttribute('data-cid', contact.id);
        app.addEvent(li,'click', function (event) {     
            event = event || window.event;
            var contactId = event.target.getAttribute('data-cid');
            addressBook.viewContactDetails(contactId);
            addressBook.selectedContactId = contactId;
        });
        return li;
    };
    
    addressBook.filter = function(searchStr) {
        var liList,
            contactListElem = document.getElementById('contactList');
        
        liList = contactListElem.childNodes;

        if(searchStr.length > 0) {
            for (var i=0; i < liList.length; i++ ) {
                li = liList[i];             
                if((li.textContent.toLowerCase().indexOf(searchStr.toLowerCase()) === -1) && li.style.display !== 'none') {
                    li.style.display = 'none';
                }
            }           
        } else {
            for (var i=0; i < liList.length; i++ ) {
                li = liList[i];         
                li.style.display = 'block';
            }
        }
        
    }
    
    addressBook.viewContactDetails = function(contactId) {
        var htmlStr, currentStyle,
            elem = document.getElementById('contact-details-box'),
            contact = app.store.getContact(contactId),
            contactPanelElem = document.getElementById('contact-panel'),
            descPanelElem = document.getElementById('desc-panel');
        
        elem.innerHTML = '';

        document.getElementById('contact-details-form').style.display = "none";
        
        htmlStr = '<p class="contact-name">' + contact.firstName + ' ' + contact.lastName + '</p>';
        if((contact.mobilePhone !== undefined && contact.mobilePhone.length !== 0) || 
            (contact.homePhone !== undefined && contact.homePhone.length !== 0) ) {
            htmlStr += '<div class="bb">';
            if(contact.mobilePhone !== undefined && contact.mobilePhone.length !== 0) {
                htmlStr += '<div class="contact-number"><label>mobile</label><p>' + addressBook.formatTeleNumber(contact.mobilePhone) + '</p><span class="icon-chat"></span><span class="icon-tele"></span></div>';
            }       
            if(contact.homePhone !== undefined && contact.homePhone.length !== 0) {
                htmlStr += '<div class="contact-number"><label>home</label><p>' + addressBook.formatTeleNumber(contact.homePhone) + '</p><span class="icon-tele"></span></div>';
            }
            htmlStr += '</div>';
        }       
        if(contact.email !== undefined && contact.email.length !==0 ) {
            htmlStr += '<div class="contact-email bb"><label>work</label><p>' + contact.email + '</p></div>';
        }       
        if(contact.address !== undefined && contact.address.length !==0 ) {
            htmlStr += '<div class="contact-address"><label>work</label><p>' + contact.address.replace(/\n\r?/g, '<br />') + '</p></div>';
        }

        elem.innerHTML = htmlStr;
        document.getElementById('contact-details-box').style.display = "block";
        document.getElementById('btn-edit').style.display = "block"; 

        currentStyle = getComputedStyle(descPanelElem, null);

        if(currentStyle.display === 'none') {
            descPanelElem.style.display = 'block';
            contactPanelElem.style.display = 'none';
        }        
    };

    addressBook.formatTeleNumber = function(contactNumber) {
        return contactNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }

    addressBook.showAddressBookView = function() {
        var descPanelStyle,contactPanelStyle,
            contactPanelElem = document.getElementById('contact-panel'),
            descPanelElem = document.getElementById('desc-panel');

        descPanelStyle = getComputedStyle(descPanelElem, null);
        contactPanelStyle = getComputedStyle(contactPanelElem, null);

        if(contactPanelStyle.display === 'block' && descPanelStyle.display === 'block') {
            if(app.mode==='edit') {
                document.getElementById('contact-details-box').style.display = 'block';
                document.getElementById('contact-details-form').style.display = 'none';
            } else {
                document.getElementById('contact-details-box').style.display = 'none';
                document.getElementById('contact-details-form').style.display = 'none';
            }
            //document.getElementById('contact-details-box').style.display = 'none';
            document.getElementById('contact-details-form').style.display = 'none';
        } else if(descPanelStyle.display === 'block') {
            descPanelElem.style.display = 'none';
            contactPanelElem.style.display = 'block';
        } 
    }
    
    app.addressBook = addressBook;

}(this));
