function format(value) {
  let phone = value

  phone = phone.replace(/[^\d]/g, '')

  if (phone.length > 0) {
    phone = '(' + phone

    if (phone.length > 3) {
      phone = [phone.slice(0, 3), ') ', phone.slice(3)].join('')
    }

    if (phone.length > 12) {

      if (phone.length > 13) {
        phone = [phone.slice(0, 10), '-', phone.slice(10)].join('')
      } else {
        phone = [phone.slice(0, 9), '-', phone.slice(9)].join('')
      }

    }

    if (phone.length > 15) {
      phone = phone.substr(0, 14)
    }
    return phone
  }

  return phone
}

export default {
  format
}
