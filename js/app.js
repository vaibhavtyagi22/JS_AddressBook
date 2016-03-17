//Main module : initializes app and attach events

app = typeof(app) === 'object' ? app : {};
(function(window, undefined) {
	
	app.init = function() {

		var searchInputElem = document.getElementById('search'),
            addButton = document.getElementById('btn-add'),
            editButton = document.getElementById('btn-edit'),
            saveButton = document.getElementById('btn-save');
            backButton = document.getElementById('btn-back');

		app.addressBook.initAddressBook();

		app.addEvent(searchInputElem,'keyup', function (event) {        
            event = event || window.event;
            var searchStr = event.target.value;
            app.addressBook.filter(searchStr);
        });

        app.addEvent(addButton,'click',app.contact.showAddContactView);

        app.addEvent(editButton,'click',app.contact.showEditContactView);

        app.addEvent(saveButton,'click',app.contact.onSave);

        app.addEvent(backButton,'click',app.addressBook.showAddressBookView);

	}
	
	app.addEvent = function (to, type, fn){
		if(document.addEventListener){
			to.addEventListener(type, fn);
		} else if(document.attachEvent){
			to.attachEvent('on'+type, fn);
		} else {
			to['on'+type] = fn;
		}   
	};
	
	app.addEvent(window, 'load', function(){
        app.init();
	});
	
}(this));
