import React from 'react';
import tw from 'tailwind-styled-components/dist/tailwind';
import { motion } from 'framer-motion';

const Container = tw(motion.div)`
fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex flex-row items-center justify-center
`;

function Backdrop({ children, onClick }) {
	return (
		<Container
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			exit={{ scale: 0.1, opacity: 0 }}
			onClick={() => onClick(false)}
		>
			{children}
		</Container>
	);
}

export default Backdrop;
