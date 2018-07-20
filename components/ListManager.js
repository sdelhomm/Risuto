import React from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity, StatusBar} from 'react-native';
import {getStyleSheet} from './DataManager.js';

export default class ListManager extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {
	  	Style: null
	  };
	}

	listMovie(movies)
	{
		const galery = movies.map((item, key) =>
			(<View key={key} style={this.state.Style.shadow} >
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('MovieInfos', {movieId: item.id, from: 'list', listId: this.props.navigation.state.params.list.id})}
					activeOpacity={0.7}>
					<Image
						style={this.state.Style.listManager.movies}
						source={{uri: `http://image.tmdb.org/t/p/w154${item.posterPath}`}} />
				</TouchableOpacity>
			</View>)
		);
		return (galery);
	}

	componentDidMount()
	{
		this.props.navigation.addListener('willFocus', () => getStyleSheet().then(Style => this.setState({Style})));
	}

	render()
	{
		if (this.state.Style === null)
			return (null);
		return (
			<View style={this.state.Style.globalContainer} >
				{this.state.Style.statusBar}
				<ScrollView style={this.state.Style.listManager.scrollView} >
					<View style={this.state.Style.listManager.globalView} >
						<Text style={this.state.Style.title} >{this.props.navigation.state.params.list.name}</Text>
						<View style={this.state.Style.listManager.moviesView} >
							{this.listMovie(this.props.navigation.state.params.list.movies)}
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}
