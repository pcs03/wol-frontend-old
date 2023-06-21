import './App.css'
import { AddressBook, Person_PhoneType } from './generated/src/proto/data'

function App() {
  const myAddressBook: AddressBook = {
    people: [
      {
        name: "Joe Blogs",
        phones: [
          {
            phoneNumber: "0123456789",
            phoneType: Person_PhoneType.MOBILE,
          }
        ]
      },
      {
        name: "Jane Smith",
        phones: [
          {
            phoneNumber: "0987654321",
            phoneType: Person_PhoneType.HOME,
          }
        ]
      }
    ]
  }

  const serialMesasge = AddressBook.encode(myAddressBook).finish();

  return (
    <div>
      Hello, world!
    </div>
  )
}

export default App
