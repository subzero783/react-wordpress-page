
import App from './App';

const { render } = wp.element; //we are using wp.element here

if (document.getElementById('cashback-react-app')) { //check if element exists before rendering
  render(<App />, document.getElementById('cashback-react-app'));
}

