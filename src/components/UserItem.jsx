import React from 'react';
import tw from 'tailwind-styled-components/dist/tailwind';

import { AnimatePresence, motion } from 'framer-motion';

const Item = tw(motion.div)`
sm:w-40 sm:h-48 w-36 h-48 flex flex-col items-center justify-start bg-blue-300 sm:rounded-3xl rounded-2xl m-4 shadow-lg overflow-hidden 
`;

const variants = {
	initial: {
		opacity: 0,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
	},
	tap: {
		scale: 0.9,
		transition: { delay: 0, duration: 0.1 },
	},
};

function UserItem({ item, time, getSelected }) {
	const { avatar, first_name, last_name } = item;

	return (
		<AnimatePresence>
			<Item
				onClick={() => getSelected(item)}
				variants={variants}
				initial='initial'
				animate='visible'
				exit='initial'
				transition={{ delay: 1 + time * 0.1, type: 'spring', stiffness: 300 }} //childeren shown with delay
				whileTap='tap'
			>
				<img
					className='w-full h-40 object-cover object-center'
					src={avatar}
					alt=''
				/>
				<p className='flex items-center justify-center'>
					{first_name} {last_name}
				</p>
			</Item>
		</AnimatePresence>
	);
}

export default UserItem;
