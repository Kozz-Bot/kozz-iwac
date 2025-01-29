import { DeepPartial, recursiveAssign } from '@renderer/util/objects';
import { createContext as _createContext, useContext, useState } from 'react';

export const createContext = <T extends Record<string, any>>(data: T) => {
	const MyContext = _createContext(
		{} as {
			value: T;
			setValue: (newData: DeepPartial<T>) => void;
		}
	);

	const Provider = (props: { children: JSX.Element }) => {
		const [myData, setMyData] = useState<T>(data);

		const setValue = (descriptor: DeepPartial<T>) => {
			setMyData(recursiveAssign(myData, descriptor));
		};

		return (
			<MyContext.Provider
				value={{
					value: myData,
					setValue: setValue,
				}}
			>
				{props.children}
			</MyContext.Provider>
		);
	};

	return {
		Provider,
		useContext: () => {
			const { value, setValue } = useContext(MyContext);

			return [value, setValue] as const;
		},
	};
};
