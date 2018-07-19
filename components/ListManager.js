import React from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import Style from '../style/Style.js'

export default class ListManager extends React.Component {

	listMovie (movies) {
		let galery = movies.map((item, key) =>
			<View key={key} style={Style.shadow} >
				<TouchableOpacity
				onPress={ () => this.props.navigation.navigate('MovieInfos', { movieId: item.id, from: 'list', listId: this.props.navigation.state.params.list.id})}
				activeOpacity={0.7}
				>
					<Image
					style={Style.listManager.movies}
					source={{uri: 'http://image.tmdb.org/t/p/w154' + item.posterPath}}
					/>
				</TouchableOpacity>
			</View>
		);
		return (galery);
	}

	render () {
		return (
			<ScrollView style={Style.listManager.scrollView} >
				<View style={Style.listManager.globalView} >
					<Text style={Style.title} >{this.props.navigation.state.params.list.name}</Text>
					<View style={Style.listManager.moviesView} >
						{this.listMovie(this.props.navigation.state.params.list.movies)}
					</View>
				</View>
			</ScrollView>
			);
	}
}