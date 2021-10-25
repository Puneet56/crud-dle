import React from 'react';
import tw from 'tailwind-styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import Backdrop from './Backdrop';
import AddUser from './AddUser';
import { useState } from 'react/cjs/react.development';
import axios from 'axios';

const Container = tw(motion.div)`
flex flex-row items-start justify-start bg-gray-100 rounded-3xl p-6 w-96 h-52 
`;

const Details = tw.p`mt-2 ml-4 text-center
`;

const Button = tw.button`border-2 border-solid border-blue-600 rounded-md px-3 text-blue-600 active:bg-blue-600 active:text-white focus:outline-none 
`;
const Delete = tw.button`border-2 border-solid border-red-600 rounded-md px-3 text-red-600 active:bg-red-600 active:text-white focus:outline-none 
`;

function Card({ item, deleteUser, editUser }) {
	const { avatar, first_name, last_name, email, id } = item;
	const [deleted, setDeleted] = useState(false);
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(false);

	const deleteHandler = async () => {
		setLoading(true);
		try {
			const res = await axios.delete(`https://reqres.in/api/users/${id}`);
			if (res.status === 204) {
				setDeleted(true);
				deleteUser(id, true);
				setLoading(false);
			}
		} catch (error) {
			deleteUser(false);
			console.log(error);
			setLoading(false);
		}
	};

	const editHandler = async (userdetails) => {
		editUser(userdetails);
	};

	return (
		<>
			{!deleted ? (
				<Container onClick={(e) => e.stopPropagation()}>
					<img
						className='h-full w-1/3 object-cover object-center rounded-2xl shadow-md'
						src={avatar}
						alt=''
					></img>
					<div className='flex h-full flex-col items-start justify-start'>
						<Details>First Name:{first_name}</Details>
						<Details>Last Name: {last_name}</Details>
						<Details>E-Mail:</Details>
						<Details>{email}</Details>
						<div className='m-3 w-full flex flex-row items-center justify-evenly'>
							<Button onClick={() => setEditing(true)}>Edit</Button>
							<Delete onClick={deleteHandler}>
								{loading ? 'Deleting...' : 'Delete'}
							</Delete>
						</div>
					</div>
				</Container>
			) : (
				<Container className='flex flex-col items-center justify-center'>
					<p className='text-3xl'>User Deleted</p>
				</Container>
			)}
			{editing && (
				<AnimatePresence initial={false} exitBeforeEnter={true}>
					<Backdrop onClick={() => setEditing(false)}>
						<AddUser editing edit={editHandler} editUserId={id} />
					</Backdrop>
				</AnimatePresence>
			)}
		</>
	);
}

export default Card;
