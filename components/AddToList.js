import React from 'react'
import { View, Text, Image, Picker } from 'react-native'
import Style from '../style/Style.js'

export default class AddToList extends React.Component {

	constructor(props) {
		super(props);
	
		this.state = {
			selectedList: null
		};
	}

	render () {
		return (
			<View style={Style.globalContainer} >
				<View style={Style.shadow} >
					<Image
					style={Style.AddToList.image}
					source={{uri: 'http://image.tmdb.org/t/p/w154' + this.props.navigation.state.params.posterPath}}
					/>
				</View>
				<Picker
				selectedValue={this.state.selectedList}
				style={{height: 50, width: '100%'}}
				onValueChange={(itemValue) => this.setState({selectedList: itemValue})}
				>
					<Picker.Item label='Choisir une liste' value={null} />
				</Picker>
			</View>
			);
	}
}