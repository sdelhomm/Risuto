import React from 'react'
import { ScrollView, View, Text, Image, ImageBackground, ActivityIndicator, TouchableOpacity, AsyncStorage } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons.js'
import Style from '../style/Style.js'

export default class MovieInfos extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isReady: true,
	  	movieData: null,
	  	userData: null,
	  	liked: null
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
					movieData: responseJson
				});
			}
			else {
				this.setState({
					movieData: 'none'
				});
			}
		})
		.then(() => this.retrieveData('userData'))
		.then((dataString) => JSON.parse(dataString))
		.then((dataObject) =>
			this.setState({
				isReady: true,
				userData: dataObject
			})
		)
		.catch((error) =>{
			console.log(error);
		});
	}

	storeData = async (item, value) => {
		try {
			await AsyncStorage.setItem(item, value);
		}
		catch (error) {
			console.log(error);
		}
	}

	retrieveData = async (item) => {
		try {
			const value = await AsyncStorage.getItem(item);
			if (value !== null)
				return (value);
			else {
				return ('{"lists":[],"nextId":1,"favorites":[]}');
			}
		}
		catch (error) {
			console.log(error);
		}
	}

	delMovie (movieId, listId) {
		try {
			let listIndex = this.state.userData.lists.findIndex((element) => element.id == listId);
			let movieIndex = this.state.userData.lists[listIndex].movies.findIndex((element) => element.id == movieId);
			this.state.userData.lists[listIndex].movies.splice(movieIndex, 1);
			this.state.userData = JSON.stringify(this.state.userData);
			this.storeData('userData', this.state.userData)
			.then(() => this.props.navigation.navigate('Home'));
		}
		catch(error) {
			console.log(error);
			alert('Impossible de supprimer ce film');
		}
	}

	createButton () {
		if (this.props.navigation.state.params.from == 'list') {
			return (
				<TouchableOpacity
				onPress={() => this.delMovie(this.state.movieData.id, this.props.navigation.state.params.listId)}
				activeOpacity={0.7}
				style={Style.button} >
					<Text style={Style.buttonText} >Supprimer de cette liste</Text>
				</TouchableOpacity>
			);
		}
		return (
			<TouchableOpacity
			onPress={() => this.props.navigation.navigate('AddToList', {movieId: this.state.movieData.id, posterPath: this.state.movieData.poster_path})}
			activeOpacity={0.7}
			style={Style.button} >
				<Text style={Style.buttonText} >Ajouter à une liste</Text>
			</TouchableOpacity>
		);
	}

	doLike () {
		let index = this.state.userData.favorites.findIndex((element) => element == this.state.movieData.id);
		if (index == -1) {
			this.state.userData.favorites.push(this.state.movieData.id);
			this.state.userData = JSON.stringify(this.state.userData);
			this.storeData('userData', this.state.userData)
			.then(() => this.setState({
				userData: JSON.parse(this.state.userData)
			}));
		}
		else {
			this.state.userData.favorites.splice(index, 1);
			this.state.userData = JSON.stringify(this.state.userData);
			this.storeData('userData', this.state.userData)
			.then(() => this.setState({
				userData: JSON.parse(this.state.userData)
			}));
		}
	}

	voteCount() {
		var jsx = [];
		let vote = Math.ceil(this.state.movieData.vote_average);
		for (let i = 2; i <= 10; i+= 2) {
			if (vote - i >= 0) {
				jsx.push(
					<Ionicons key={i} name='ios-star' size={45} color='#129934' />
				);
			}
			else if ((vote + 1) - i >= 0) {
				jsx.push(
					<Ionicons key={i} name='ios-star-half' size={45} color='#129934' />
				);
			}
			else {
				jsx.push(
					<Ionicons key={i} name='ios-star-outline' size={45} color='#129934' />
				);
			}
		}
		return (jsx);
	}

	likeButton () {
		if (this.state.userData.favorites.findIndex((element) => element == this.state.movieData.id) != -1) {
			return(
				<TouchableOpacity
				onPress={() => this.doLike()}
				activeOpacity={0.7}
				>
					<Ionicons name='ios-heart' size={45} color='#d81326' />
				</TouchableOpacity>
			);
		}
		return(
			<TouchableOpacity
			onPress={() => this.doLike()}
			activeOpacity={0.7}
			>
			<Ionicons name='ios-heart-outline' size={45} color='#d81326' />
			</TouchableOpacity>
		);
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
						{this.createButton()}
						<View style={Style.movieInfos.voteSection} >
							{this.likeButton()}
							<View style={Style.movieInfos.stars} >
								{this.voteCount()}
							</View>
						</View>
						<Text style={Style.movieInfos.overview} >{this.state.movieData.overview}</Text>
					</View>
				</ScrollView>
			</ImageBackground>
			);
	}
}