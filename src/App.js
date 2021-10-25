import './styles/index.css';
import tw from 'tailwind-styled-components';
import Heading from './components/Heading';
import Users from './components/Users';

const Container = tw.div`absolute left-0 right-0 top-0 bottom-0 overflow-x-hidden overflow-y-auto bg-blue-400 z-[-1] flex flex-col items-center justify-start
`;

const App = () => {
	return (
		<Container>
			<Heading />
			<Users />
		</Container>
	);
};

export default App;
