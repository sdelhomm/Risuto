import React from 'react'
import { ScrollView, View, Text, Image, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native'
import Style from '../style/Style.js'

export default class MovieInfos extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isReady: true,
	  	movieData: null
	  };
	}

	componentDidMount() {
		this.setState({
			isReady: false
		});
		return fetch('https://api.themoviedb.org/3/movie/'+ this.props.navigation.state.params.movieId +'?api_key=6391f6cd254ef907e6975891ef627f61&language=fr')
		.then( (response) => { return (response.json()); } )
		.then( (responseJson) => {
			if (responseJson !== undefined && responseJson !== null) {
				this.setState({
					isReady: true,
					movieData: responseJson
				});
			}
			else {
				this.setState({
					isReady: true,
					movieData: 'none'
				});
			}
		})
		.catch((error) =>{
			console.log(error);
		});
	}

	render () {
		if (!this.state.isReady)
			return (<View style={Style.movieInfos.globalView} >
						<ActivityIndicator size='large'/>
					</View>
				);
		if (this.state.movieData === undefined || this.state.movieData === null)
			return (null);
		if (this.state.movieData == 'none')
			return (<Text>Aucunes données trouvées</Text>);
		return (
			<ImageBackground
			style={{width: '100%', height: '100%'}}
			source={{uri: 'http://image.tmdb.org/t/p/w780' + this.state.movieData.poster_path}}
			blurRadius={10}
			>
				<ScrollView style={Style.movieInfos.scrollView} >
					<View style={Style.movieInfos.globalView} >
						<Image
						style={Style.movieInfos.headerImg}
						source={{uri: 'http://image.tmdb.org/t/p/w780' + this.state.movieData.backdrop_path}}
						/>
						<Text style={Style.movieInfos.title} >{this.state.movieData.title}</Text>
						<TouchableOpacity activeOpacity={0.7} style={Style.button} >
							<Text style={Style.buttonText} >Ajouter à une liste</Text>
						</TouchableOpacity>
						<Text style={Style.movieInfos.overview} >{this.state.movieData.overview}</Text>
					</View>
				</ScrollView>
			</ImageBackground>
			);
	}
}