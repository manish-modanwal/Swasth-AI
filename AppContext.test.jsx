import React from 'react';
import { render, screen } from '@testing-library/react';
import AppContextProvider, { AppContext } from './AppContext';

jest.mock('../assets/assets', () => ({
  doctors: [{ id: 1, name: 'Dr. Test' }],
}));

describe('AppContextProvider', () => {
  it('provides the correct context values', () => {
    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );

    expect(screen.getByText('Dr. Test')).toBeInTheDocument();
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('handles empty doctors array gracefully', () => {
    jest.mock('../assets/assets', () => ({ doctors: [] }));
    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );
    // Add assertions to check for graceful handling of empty array, if needed.  This depends on how the app handles this scenario.  For example:
    // expect(screen.queryByText('Dr. Test')).not.toBeInTheDocument();

  });

  it('handles undefined doctors array gracefully', () => {
    jest.mock('../assets/assets', () => ({ doctors: undefined }));
    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );
    // Add assertions to check for graceful handling of undefined array, if needed.  Similar to the empty array handling.
  });


  it('throws error if currencySymbol is missing', () => {
    jest.mock('./AppContext', () => {
        const RealAppContextProvider = jest.requireActual('./AppContext').default;
        return {
            __esModule: true,
            default: (props) => <RealAppContextProvider {...props} currencySymbol={undefined}/>,
            AppContext: jest.requireActual('./AppContext').AppContext
        }
    });

    expect(() => {
        render(
          <AppContextProvider>
            <TestComponent />
          </AppContextProvider>
        );
    }).toThrow(); //or a more specific error check if applicable
  });
});


const TestComponent = () => {
  const { doctors, currencySymbol } = React.useContext(AppContext);

  return (
    <>
      {doctors.map((doctor) => (
        <div key={doctor.id}>{doctor.name}</div>
      ))}
      <div>{currencySymbol}</div>
    </>
  );
};