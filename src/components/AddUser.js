import React, { useRef } from 'react';
import tw from 'tailwind-styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useState } from 'react/cjs/react.development';

const Container = tw(motion.form)`
flex flex-col items-center justify-center bg-yellow-300 rounded-3xl p-6 w-96 space-y-3
`;

const Input = tw.input`h-9 text-gray-800 rounded-full pl-3 w-10/12 outline-none transform transition-all duration-200 bg-fbhover input-cursor border-4 border-solid border-gray-400 border-opacity-50 box-content 
`;

const Heading = tw(motion.p)`
mx-auto text-3xl border-b-4 border-solid border-blue-500
`;

const Button = tw.button`border-2 border-solid border-blue-600 rounded-md py-2 px-5 text-lg text-blue-600 active:bg-blue-600 active:text-white focus:outline-none 
`;

function Adduser({ editing, addUser, edit, editUserId }) {
	const first = useRef();
	const last = useRef();
	const email = useRef();
	const [error, setError] = useState(false);

	const [loading, setLoading] = useState(false);

	const addUserHandler = async (e) => {
		e.preventDefault();
		setError(false);
		setLoading(true);
		try {
			const user = await axios.post(`https://reqres.in/api/users/`, {
				first_name: first.current.value,
				last_name: last.current.value,
				email: email.current.value,
				avatar: `https://avatars.dicebear.com/api/gridy/${
					first.current.value.split(' ')[0]
				}.svg`,
			});
			setError(false);
			addUser(user.data);
			setLoading(false);
		} catch (error) {
			setError('Some Error Happened');
			console.log(error);
			setError(false);
			setLoading(false);
		}
	};

	const editHandler = async (e) => {
		e.preventDefault();
		setError(false);
		setLoading(true);
		if (
			!/[a-z0-9]/i.test(first.current.value) &&
			!/[a-z0-9]/i.test(first.current.value) &&
			!/[a-z0-9]/i.test(first.current.value)
		) {
			setError('Nothing to update');
			setLoading(false);
			return;
		} else {
			const data = {};
			console.log('first', first.current.value);

			if (first.current.value !== '') {
				data.first_name = first.current.value;
			}
			if (last.current.value !== '') {
				data.last_name = last.current.value;
			}
			if (email.current.value !== '') {
				data.email = email.current.value;
			}

			try {
				const user = await axios.put(
					`https://reqres.in/api/users/${editUserId}`,
					{
						first_name: first.current.value,
						last_name: last.current.value,
						email: email.current.value,
						avatar: `https://avatars.dicebear.com/api/gridy/${
							first.current.value.split(' ')[0]
						}.svg`,
					}
				);
				setError(false);
				user.data.id = editUserId;
				edit(user.data);
				setError('User Edited Sucessfully');
				setLoading(false);
			} catch (error) {
				setError('Some Error Happened');
				console.log(error);
				setError(false);
				setLoading(false);
			}
		}
	};

	return (
		<Container
			onSubmit={!editing ? addUserHandler : editHandler}
			onClick={(e) => e.stopPropagation()}
		>
			<Heading>{!editing ? 'Add User' : 'Edit User'}</Heading>
			<label>Enter First Name</label>
			<Input
				ref={first}
				required={!editing}
				type='text'
				placeholder='First Name'
				maxLength='15'
			/>
			<label>Enter Last Name</label>
			<Input
				required={!editing}
				type='text'
				ref={last}
				placeholder='Last Name'
				maxLength='15'
			/>
			<label>Enter Email</label>
			<Input
				required={!editing}
				ref={email}
				type='email'
				placeholder='E-mail'
			/>
			{error && <p>{error}</p>}
			<Button>
				{!editing
					? loading
						? 'Adding...'
						: 'Add User'
					: loading
					? 'Editing...'
					: 'Edit User'}
			</Button>
		</Container>
	);
}

export default Adduser;
