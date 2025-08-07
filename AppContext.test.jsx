import React from 'react';
import { render, screen } from '@testing-library/react';
import AppContextProvider, { AppContext } from './AppContext';

jest.mock('../assets/assets', () => ({
  doctors: jest.fn(() => ['Dr. Mock1', 'Dr. Mock2']),
}));

describe('AppContextProvider', () => {
  it('provides the correct context values to its children, handling empty/null data gracefully', () => {
    const TestComponent = () => {
      const { doctors, currencySymbol } = React.useContext(AppContext);
      return (
        <div data-testid="test-component">
          <p data-testid="doctors">{doctors.join(',')}</p>
          <p data-testid="currencySymbol">{currencySymbol}</p>
        </div>
      );
    };

    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );

    expect(screen.getByTestId('doctors')).toHaveTextContent('Dr. Mock1,Dr. Mock2');
    expect(screen.getByTestId('currencySymbol')).toHaveTextContent('$');


    jest.mock('../assets/assets', () => ({ doctors: [] }));

    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );
    expect(screen.getByTestId('doctors')).toHaveTextContent('');
    expect(screen.getByTestId('currencySymbol')).toHaveTextContent('$');


    jest.mock('../assets/assets', () => ({ doctors: null }));

    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );

    expect(screen.getByTestId('doctors')).toHaveTextContent('');
    expect(screen.getByTestId('currencySymbol')).toHaveTextContent('$');
  });
});