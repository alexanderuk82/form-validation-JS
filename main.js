const names = document.getElementById('name')
const surname = document.getElementById('surname')
const email = document.getElementById('email')
const phone = document.getElementById('phone')

const textarea = document.getElementById('textarea')
const form = document.getElementById('form')
const submit = document.getElementById('submit')

const messageError = document.querySelector('.message__error')
const messageSent = document.querySelector('.message__sent')

const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

//!Startting the site

readAllEvents()

function readAllEvents() {
  //to start the app

  document.addEventListener('DOMContentLoaded', startApp)

  // to check the fields validation

  names.addEventListener('blur', fieldValidation)
  surname.addEventListener('blur', fieldValidation)
  email.addEventListener('blur', fieldValidation)
  phone.addEventListener('blur', fieldValidation)
  number.addEventListener('blur', fieldValidation)
  textarea.addEventListener('blur', fieldValidation)

  // Submit button

  submit.addEventListener('click', passValidation)
}

/* =================================================
 *
 *    ALL THE FUNCTIONS HERE BELOW
 *===================================================*/

//*Function start the first

function startApp() {
  submit.disabled = true
  submit.classList.add('cursor-not-allowed', 'opacity-40')
}

//*Function fields validation

function fieldValidation(e) {
  if (e.target.value.length > 0) {
    console.log('validando')

    const erroIcon = document.querySelector('.errorField')

    if (erroIcon) {
      erroIcon.remove()
    }
    e.target.classList.remove('border-red-500', 'border')
    e.target.classList.add('border-green-500', 'border')

    messageError.style.display = 'none'

    fieldPass(e)
  } else {
    messageError.innerText = ''
    fieldError(e)
    const okIcon = document.querySelector('.passField')

    if (okIcon) {
      okIcon.remove()
    }

    e.target.classList.remove('border-green-500', 'border')
    e.target.classList.add('border-red-500', 'border')
    popUpError('Please check the fields, and try again.')
  }

  // !validation for Mobile

  if (e.target.type === 'tel') {
    const padre = e.target.parentElement
    if (e.target.value.length > 0) {
      e.target.classList.remove('border-green-500', 'border')
      padre.classList.add('border-green-500', 'border')
    } else {
      e.target.classList.remove('border-red-500', 'border')
      padre.classList.add('border-red-500', 'border')
    }
  }

  // !validation for Email
  if (e.target.type === 'email') {
    if (expression.test(e.target.value)) {
      fieldPass()
    } else {
      messageError.innerText = ''

      fieldError(e)
      const okIcon = document.querySelector('.passField')

      if (okIcon) {
        okIcon.remove()
      }

      e.target.classList.remove('border-green-500', 'border')
      e.target.classList.add('border-red-500', 'border')
      fieldError(e)
      popUpError('Please enter a correct email address')
    }
  }

  //!We gonna check if pass all validation

  if (
    names.value !== '' &&
    surname.value !== '' &&
    expression.test(email.value) &&
    phone.value !== '' &&
    textarea.value !== ''
  ) {
    submit.disabled = false
    submit.classList.remove('cursor-not-allowed', 'opacity-40')
  } else {
    startApp()
  }
}

//* Field error validation (Icon error)

function fieldError(e) {
  // ! Insert the icon in the field target

  const errorSpan = e.target.parentElement.children[0].children[0]

  const errorIcon = document.createElement('i')

  errorIcon.classList.add(
    'fa-solid',
    'fa-triangle-exclamation',
    'text-red-500',
    'errorField',
  )

  //   !We validate just for one time display icon error
  if (errorIcon.classList.contains('errorField')) {
    if (errorSpan.children.length === 0) {
      errorSpan.appendChild(errorIcon)
    }
  }
}

//* Field OK validation (Icon check)

function fieldPass(e) {
  // ! Insert the icon in the field target

  const okSpan = e.target.parentElement.children[0].children[0]

  const okIcon = document.createElement('i')

  okIcon.classList.add('fa-solid', 'fa-check', 'text-green-500', 'passField')

  //   !We validate just for one time display icon error
  if (okIcon.classList.contains('passField')) {
    if (okSpan.children.length === 0) {
      okSpan.appendChild(okIcon)
    }
  }
}

//* Field error validation (toast notification)

function popUpError(message) {
  const textError = document.createElement('p')
  textError.innerText = message
  textError.classList.add('errorMessageBox')

  const messageErrorBox = document.querySelectorAll('.errorMessageBox')

  if (messageErrorBox.length === 0) {
    messageError.appendChild(textError)
  }

  messageError.classList.remove('hidden')
  messageError.style.display = 'block'
}

// *After pass all validation execute this function

function passValidation(e) {
  e.preventDefault()

  const spinner = document.querySelector('.spinner')
  spinner.classList.remove('hidden')

  setTimeout(() => {
    spinner.classList.add('hidden')
    popUpSent()

    setTimeout(() => {
      messageSent.remove()
      resetForm()
    }, 2000)
  }, 2500)
}

//* Message was sent (toast notification)

function popUpSent() {
  const textSent = document.createElement('p')
  textSent.innerText = 'The email was sent successfully'
  textSent.classList.add('sentMessageBox')

  const messageSentBox = document.querySelectorAll('.sentMessageBox')

  if (messageSentBox.length === 0) {
    messageSent.appendChild(textSent)
  }

  messageSent.style.display = 'block'
}

//* Function Reset form

function resetForm() {
  form.reset()

  window.location.reload()
  startApp()
}
