import React from 'react';
import {View,
	Text, Switch,
	ActivityIndicator,
	StatusBar} from 'react-native';
import {storeData, retrieveData, getStyleSheet} from './DataManager.js';

export default class Settings extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			isReady: false,
			userData: null,
			switchBtn: false,
			Style: null
		};
	}

	getActualTheme()
	{
		retrieveData('userData')
		.then(dataString => JSON.parse(dataString))
		.then(dataObject =>
			this.setState({
				isReady: true,
				userData: dataObject,
				switchBtn: dataObject.themeDark
			})
		)
		.catch((error) =>
		{
			console.log(error);
		});
	}

	componentDidMount()
	{
		this.props.navigation.addListener('willFocus', () => getStyleSheet().then(Styles => this.setState({Style: Styles})));
		this.props.navigation.addListener('willFocus', () => this.getActualTheme());
	}

	switchTheme = () =>
	{
		if (this.state.userData.themeDark === false)
			this.state.userData.themeDark = true;
		else
			this.state.userData.themeDark = false;

		storeData('userData', JSON.stringify(this.state.userData))
		.then(() => this.setState({
			userData: this.state.userData,
			switchBtn: this.state.userData.themeDark
		}))
		.catch((error) =>
		{
			console.log(error);
		});
		getStyleSheet().then(Style => this.setState({Style}));
	}

	render()
	{
		if (this.state.Style === null)
		{
			getStyleSheet().then(Styles => this.setState({Style: Styles}));
			return (null);
		}
		StatusBar.setBarStyle(`${this.state.Style.unTheme}-content`);
		if (!this.state.isReady)
		{
			return (
				<View style={this.state.Style.globalContainer} >
					<View style={this.state.Style.movieInfos.globalView} >
						<ActivityIndicator size='large' />
					</View>
				</View>
			);
		}
		return (
			<View style={this.state.Style.globalContainer} >
				<View style={this.state.Style.movieInfos.globalView} >
					<Text style={this.state.Style.bigText} >Mode cinéma</Text>
					<Switch style={this.state.Style.switch} value={this.state.switchBtn} onValueChange={this.switchTheme} />
				</View>
			</View>
		);
	}
}
