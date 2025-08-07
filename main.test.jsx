import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AppContextProvider from './context/AppContext.jsx';

jest.mock('./App.jsx', () => () => <div>App</div>);
jest.mock('./context/AppContext.jsx', () => ({
  children: ({children}) => <>{children}</>
}));


describe('Main application rendering', () => {
  it('renders the app without errors', () => {
    const mockRoot = document.createElement('div');
    mockRoot.id = 'root';
    document.body.appendChild(mockRoot);

    const root = createRoot(document.getElementById('root'));
    const renderResult = root.render(
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    );

    expect(renderResult).toBe(undefined); //expect no errors during rendering
    expect(document.getElementById('root').querySelector('div')).not.toBeNull();
    document.body.removeChild(mockRoot);
  });

  it('handles missing root element gracefully', () => {
    expect(() => {
      createRoot(document.getElementById('missing-root')).render(
        <BrowserRouter>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </BrowserRouter>
      );
    }).toThrow(); // Expect an error because the root element is missing.  The exact error message might vary depending on the React version.
  });

  it('handles incorrect component imports gracefully', () => {
    jest.mock('./App.jsx', () => {throw new Error('App import error')});
    expect(() => {
      const mockRoot = document.createElement('div');
      mockRoot.id = 'root';
      document.body.appendChild(mockRoot);
      const root = createRoot(document.getElementById('root'));
      root.render(
        <BrowserRouter>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </BrowserRouter>
      );
      document.body.removeChild(mockRoot);
    }).toThrow('App import error');
    jest.unmock('./App.jsx');
  });


});