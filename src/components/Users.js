import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import axios from 'axios';
import UserItem from './UserItem';
import Backdrop from './Backdrop';
import AddUser from './AddUser';
import Card from './Card';
import { IoAddCircleSharp } from 'react-icons/io5';

const Container = tw(motion.div)`
w-11/12 sm:w-10/12 md:w-9/12 mb-10 rounded-3xl text-center z-10 bg-gray-200 flex flex-col items-center justify-center flex-wrap
`;
const UsersList = tw(motion.div)`
flex flex-row items-center justify-center flex-wrap mb-5
`;

const Heading = tw(motion.p)`
mx-auto text-3xl mt-4 border-b-4 border-solid border-blue-500
`;

const Add = tw(motion.div)`
sm:w-40 sm:h-48 w-36 h-48 flex flex-col items-center justify-center bg-blue-300 sm:rounded-3xl rounded-2xl m-4 overflow-hidden text-gray-400
`;

function Users() {
	const [users, setUsers] = useState([]); //initial user state
	const [addingUser, setAddingUser] = useState(false); //to open backdrop with add user component
	const [selected, setSelected] = useState(0); //to show backdrop with Card component with clicked user details

	//get initial user list
	useEffect(() => {
		const getusers = async () => {
			try {
				const fetchedUsers = await axios.get(
					'https://reqres.in/api/users?page=2'
				);
				setUsers(() => fetchedUsers.data.data.sort((a, b) => a.id - b.id));
			} catch (error) {
				console.log(error);
			}
		};
		getusers();
	}, []);

	const getSelected = (selected) => {
		setSelected(selected);
	};

	const addUser = (userdetails) => {
		setAddingUser(!addingUser);
		setUsers((prevState) => [userdetails, ...prevState]);
	};

	const deleteUser = async (userId, status) => {
		if (status === true) {
			setUsers((prevState) => prevState.filter((item) => item.id !== userId));
		} else {
			return;
		}
	};

	const editUser = (userdetails) => {
		setUsers((prevState) => {
			const unmodifiedUsers = prevState.filter(
				(item) => item.id !== userdetails.id
			);
			const modifiedUser = prevState.filter(
				(item) => item.id === userdetails.id
			);
			//modified user changed details updated.
			if (/[a-z0-9]/i.test(userdetails.first_name)) {
				modifiedUser[0].first_name = userdetails.first_name;
			}
			if (/[a-z0-9]/i.test(userdetails.last_name)) {
				modifiedUser[0].last_name = userdetails.last_name;
			}
			if (/[a-z0-9]/i.test(userdetails.email)) {
				modifiedUser[0].email = userdetails.email;
			}
			unmodifiedUsers.push(modifiedUser[0]);
			return unmodifiedUsers.sort((a, b) => a.id - b.id);
		});
	};

	return (
		<Container
			initial={{ opacity: 0, scale: 1.5 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ delay: '0.6', type: 'spring', stiffness: 400, damping: 7 }}
		>
			<Heading>Users</Heading>
			<AnimateSharedLayout layout type='crossfade'>
				<UsersList>
					<Add
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 1, type: 'spring', stiffness: 300 }}
						whileTap={{
							scale: 0.9,
							transition: { delay: 0, duration: 0.1 },
						}}
						onClick={() => setAddingUser(true)}
					>
						<IoAddCircleSharp className='w-full h-full' />
					</Add>
					<AnimatePresence initial={false} exitBeforeEnter={true}>
						{addingUser && (
							<Backdrop onClick={() => setAddingUser(false)}>
								<AddUser addUser={addUser} />
							</Backdrop>
						)}
					</AnimatePresence>
					{users.map((item, i) => (
						<UserItem
							item={item}
							key={item.id}
							time={i}
							layoutId={item.id}
							getSelected={getSelected}
						/>
					))}
					<AnimatePresence initial={false} exitBeforeEnter={true}>
						{/* selected user card */}
						{selected !== 0 && selected && (
							<Backdrop onClick={getSelected}>
								<Card
									item={selected}
									key={selected.id}
									getSelected={getSelected}
									layoutId={selected.id}
									deleteUser={deleteUser}
									editUser={editUser}
									editUserId={selected.id}
								/>
							</Backdrop>
						)}
					</AnimatePresence>
				</UsersList>
			</AnimateSharedLayout>
		</Container>
	);
}

export default Users;
