import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import ContactForm from './ContactForm';

test('firstname, lastname, email inputs are rendered', () => {
  const { getByLabelText } = render(<ContactForm />);
  getByLabelText(/first Name/i);
  getByLabelText(/last Name/i);
  getByLabelText(/email/i);
});

test('form submit adds new contact', async()=> {
  const { getByLabelText, getByTestId} = render(<ContactForm />);
  // querying for all the input nodes
  const firstInput = getByLabelText(/first Name/i);
  const lastInput = getByLabelText(/last Name/i);
  const emailInput = getByLabelText(/email/i);

  // use the change event to add text to each input
  fireEvent.change(firstInput, { target: { value: 'Test first' } });
  fireEvent.change(lastInput, { target: { value: 'Test last' } });
  fireEvent.change(emailInput, { target: { value: 'Test email' } });

  expect(firstInput.value).toBe('Test first');
  expect(lastInput.value).toBe('Test last');
  expect(emailInput.value).toBe('Test email');

  // click on the button!
  fireEvent.click(getByTestId(/submit/i));
//   rerender(<ContactForm />)
  await waitForElement(()=>getByTestId('submitted'))
  // assert that the species is added to the list
//   const contactText = getByTestId(/test first/i);
//   expect(contactText).toBeInTheDocument();
});
