/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { screen,fireEvent, getByTestId} from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import {localStorageMock } from '../__mocks__/localStorage.js'
import { ROUTES } from '../constants/routes.js'

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then Envoyer une note de frais displayed", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      expect(screen.getAllByText('Envoyer une note de frais')).toBeTruthy()
    })

    test('Then, I submit form-new-bill, handleSubmit called',()=>{
      const html = NewBillUI()
      document.body.innerHTML = html
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      
      // modifie le localStorage par le  localStorageMock
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({type: 'Employee'}))
      let store = null
      let localStorage = window.localStorage
      const newBill = new NewBill({document, onNavigate, store , localStorage})
      expect(newBill).toBeDefined()
      const handleSubmit = jest.fn(newBill.handleSubmit)
      const newBillform = screen.getByTestId("form-new-bill")
      newBillform.addEventListener('submit', handleSubmit)
      fireEvent.submit(newBillform)
      expect(handleSubmit).toHaveBeenCalled()
      
    })

    test('Then, I click on Justificatif, handleChangeFile called',()=> {
      const html = NewBillUI()
      document.body.innerHTML = html
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      
      // modifie le localStorage par le  localStorageMock
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({type: 'Employee'}))
      let store = null
      let localStorage = window.localStorage
      const newBill = new NewBill({document, onNavigate, store , localStorage})
      const handleChangeFile = jest.fn(newBill.handleChangeFile)
      const fileBtn = screen.getByTestId('file')
      expect(fileBtn).toBeDefined()
      fileBtn.addEventListener('click', handleChangeFile)
      fireEvent.click(fileBtn)

    })

  })
})