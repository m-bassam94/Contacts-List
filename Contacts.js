counter = 0

class Contact {
    constructor(name, email, phone) {
        this.name = name
        this.email = email
        this.phone = phone
        this.id = counter
        counter++
    }
}

class ContactList {

    constructor() {
        this.list = new Array
    }

    addContact(Contact) {
        this.list.push(Contact)
    }
    removeContact(id) {
        this.list.every((Contact, index) => {
            if (Contact.id == id) {
                this.list.splice(index, 1)
                return false
            }
            return true
        })
    }

    getContact(id) {
        var e
        this.list.every((Contact) => {
            if (Contact.id == id) {
                e = Contact
                return false
            }
            return true
        })
        return e
    }
}

var input = document.getElementsByClassName("text bar")
const name = input[0]
const email = input[1]
const phone = input[2]

const tableBody = document.getElementById("contact_table_body")
const submit = document.getElementById("submit")

const List = new ContactList()

function ContactEntry(Contact) {
    return `<tr><td>${Contact.name}</td><td>${Contact.email}</td><td>${Contact.phone}</td>` +
        `<td><button data-id="${Contact.id}" onclick="onEdit(this)" >Edit</button>` +
        `<button data-id="${Contact.id}" onclick="onDelete(this)">Delete</button></td><tr>`
}

isEditting = false
edittingId = 0

function onEdit(button) {
    const id = button.dataset.id
    var Contact = List.getContact(id)
    tableBody.removeChild(button.parentNode.parentNode)
    name.value = Contact.name
    email.value = Contact.email
    phone.value = Contact.phone

    isEditting = true
    edittingId = id
}

function onDelete(button) {
    var id = button.dataset.id
    tableBody.removeChild(button.parentNode.parentNode)
    List.removeContact(id)
}


submit.onclick = (e) => {
    e.preventDefault();
    var nametext = name.value
    var emailtext = email.value
    var phonetext = phone.value

    if (isEditting) {
        const Contact = List.getContact(edittingId)
        Contact.name = name.value
        Contact.email = email.value
        Contact.phone = phone.value

        let row = ContactEntry(Contact)
        tableBody.innerHTML += row

        isEditting = false
        edittingId = 0

    } else {
        var Contactx = new Contact(nametext, emailtext, phonetext)
        List.addContact(Contactx)
        var row = ContactEntry(Contactx)
        tableBody.innerHTML += row
    }
}
