import React from 'react';
import {AsyncStorage} from 'react-native';
import {StyleLight, StyleDark} from '../style/Style.js';

export const storeData = async (item, value) =>
{
	try
	{
		await AsyncStorage.setItem(item, value);
	}
	catch (error)
	{
		console.log(error);
	}
};

export const retrieveData = async (item) =>
{
	try
	{
		const value = await AsyncStorage.getItem(item);
		if (value !== null)
			return (value);

		return ('{"lists":[],"nextId":1,"favorites":[],"themeDark":false}');
	}
	catch (error)
	{
		console.log(error);
	}
};

export const getStyleSheet = async () =>
{
	try
	{
		let data = await retrieveData('userData');
		data = JSON.parse(data);
		if (data.themeDark === false)

			return (StyleLight);

		return (StyleDark);
	}
	catch (error)
	{
		console.log(error);
	}
};
