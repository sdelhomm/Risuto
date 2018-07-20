import React from 'react';
import {View, Text, Switch, ActivityIndicator, StatusBar} from 'react-native';
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

	componentDidMount()
	{
		this.props.navigation.addListener('willFocus', () => getStyleSheet().then(Style => this.setState({Style})));
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

	updateStatusBar()
	{
		if (this.state.Style.theme == 'light')

			return (<StatusBar barStyle='dark-content' />);

		return (<StatusBar barStyle='light-content' />);
	}

	render()
	{
		if (this.state.Style === null)
			return (null);
		if (!this.state.isReady)
		{
			return (
				<View style={this.state.Style.globalContainer} >
					{this.updateStatusBar()}
					<View style={this.state.Style.movieInfos.globalView} >
						<ActivityIndicator size='large' />
					</View>
				</View>
			);
		}
		return (
			<View style={this.state.Style.globalContainer} >
				{this.updateStatusBar()}
				<View style={this.state.Style.movieInfos.globalView} >
					<Text style={this.state.Style.bigText} >Mode cinéma</Text>
					<Switch style={this.state.Style.switch} value={this.state.switchBtn} onValueChange={this.switchTheme} />
				</View>
			</View>
		);
	}
}
