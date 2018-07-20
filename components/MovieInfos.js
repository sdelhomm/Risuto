import React from 'react';
import {ScrollView, View, Text, Image, ImageBackground, ActivityIndicator, TouchableOpacity, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import {storeData, retrieveData} from './DataManager.js';
import {StyleLight} from '../style/Style.js';

export default class MovieInfos extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {
	  	isReady: true,
	  	movieData: null,
	  	userData: null,
	  	liked: null,
	  	date: null
	  };
	}

	componentDidMount()
	{
		this.setState({
			isReady: false
		});
		return fetch(`https://api.themoviedb.org/3/movie/${this.props.navigation.state.params.movieId}?api_key=6391f6cd254ef907e6975891ef627f61&language=fr`)
		.then((response) => {return (response.json());})
		.then((responseJson) =>
		{
			if (responseJson !== undefined && responseJson !== null)
			{
				this.setState({
					movieData: responseJson,
					date: new Date(responseJson.release_date)
				});
			}
			else
			{
				this.setState({
					movieData: 'none'
				});
			}
		})
		.then(() => retrieveData('userData'))
		.then(dataString => JSON.parse(dataString))
		.then(dataObject =>
			this.setState({
				isReady: true,
				userData: dataObject
			})
		)
		.catch((error) =>
		{
			console.log(error);
		});
	}

	delMovie(movieId, listId)
	{
		try
		{
			const listIndex = this.state.userData.lists.findIndex(element => element.id == listId);
			const movieIndex = this.state.userData.lists[listIndex].movies.findIndex(element => element.id == movieId);
			this.state.userData.lists[listIndex].movies.splice(movieIndex, 1);
			this.state.userData = JSON.stringify(this.state.userData);
			storeData('userData', this.state.userData)
			.then(() => this.props.navigation.navigate('Home'));
		}
		catch (error)
		{
			console.log(error);
			alert('Impossible de supprimer ce film');
		}
	}

	createButton()
	{
		if (this.props.navigation.state.params.from == 'list')
		{
			return (
				<TouchableOpacity
					onPress={() => this.delMovie(this.state.movieData.id, this.props.navigation.state.params.listId)}
					activeOpacity={0.7}
					style={StyleLight.button} >
					<Text style={StyleLight.buttonText} >Supprimer de cette liste</Text>
				</TouchableOpacity>
			);
		}
		return (
			<TouchableOpacity
				onPress={() => this.props.navigation.navigate('AddToList', {movieId: this.state.movieData.id, posterPath: this.state.movieData.poster_path})}
				activeOpacity={0.7}
				style={StyleLight.button} >
				<Text style={StyleLight.buttonText} >Ajouter à une liste</Text>
			</TouchableOpacity>
		);
	}

	doLike()
	{
		const index = this.state.userData.favorites.findIndex(element => element == this.state.movieData.id);
		if (index == -1)
		{
			this.state.userData.favorites.push(this.state.movieData.id);
			this.state.userData = JSON.stringify(this.state.userData);
			storeData('userData', this.state.userData)
			.then(() => this.setState({
				userData: JSON.parse(this.state.userData)
			}));
		}
		else
		{
			this.state.userData.favorites.splice(index, 1);
			this.state.userData = JSON.stringify(this.state.userData);
			storeData('userData', this.state.userData)
			.then(() => this.setState({
				userData: JSON.parse(this.state.userData)
			}));
		}
	}

	voteCount()
	{
		const jsx = [];
		const vote = Math.ceil(this.state.movieData.vote_average);
		for (let i = 2; i <= 10; i += 2)
		{
			if (vote - i >= 0)
			{
				jsx.push(
					<Ionicons key={i} name='ios-star' size={45} color='#129934' />
				);
			}
			else if ((vote + 1) - i >= 0)
			{
				jsx.push(
					<Ionicons key={i} name='ios-star-half' size={45} color='#129934' />
				);
			}
			else
			{
				jsx.push(
					<Ionicons key={i} name='ios-star-outline' size={45} color='#129934' />
				);
			}
		}
		return (jsx);
	}

	likeButton()
	{
		if (this.state.userData.favorites.findIndex(element => element == this.state.movieData.id) != -1)
		{
			return (
				<TouchableOpacity
					onPress={() => this.doLike()}
					activeOpacity={0.7}>
					<Ionicons name='ios-heart' size={45} color='#d81326' />
				</TouchableOpacity>
			);
		}
		return (
			<TouchableOpacity
				onPress={() => this.doLike()}
				activeOpacity={0.7}>
				<Ionicons name='ios-heart-outline' size={45} color='#d81326' />
			</TouchableOpacity>
		);
	}

	getGenres()
	{
		let genres = ' ';
		this.state.movieData.genres.forEach((element, index, array) =>
		{
			if (index < array.length - 1)

				genres = `${genres + element.name}, `;

			else

				genres += element.name;
		});
		return (genres);
	}

	getInfos()
	{
		let dateString = 'Inconnu';
		let productionString = 'Inconnu';
		let genresString = 'Inconnu';
		let runtimeString = 'Inconnu';
		if (this.state.date !== undefined && this.state.date !== null)
			dateString = this.state.date.toLocaleDateString('fr-FR');
		if (this.state.movieData.production_companies !== undefined
			&& this.state.movieData.production_companies !== null
			&& this.state.movieData.production_companies.length > 0)
			productionString = this.state.movieData.production_companies[0].name;
		if (this.state.movieData.genres !== undefined
			&& this.state.movieData.genres !== null
			&& this.state.movieData.genres.length > 0)
			genresString = this.getGenres();
		if (this.state.movieData.runtime !== undefined && this.state.movieData.runtime !== null)
			runtimeString = this.state.movieData.runtime;
		return (
			<View style={StyleLight.movieInfos.infosSection} >
				<View style={StyleLight.movieInfos.infosSectionLeft} >
					<Text style={StyleLight.movieInfos.infos} >Sortie: {dateString}</Text>
					<Text style={StyleLight.movieInfos.infos} >Production: {productionString}</Text>
				</View>
				<View style={StyleLight.movieInfos.infosSectionRight} >
					<Text style={StyleLight.movieInfos.infos} >Genres: {genresString}</Text>
					<Text style={StyleLight.movieInfos.infos} >Durée: {runtimeString} minutes</Text>
				</View>
			</View>
		);
	}

	render()
	{
		if (!this.state.isReady)
		{
			return (
				<View style={StyleLight.movieInfos.globalView} >
					<StatusBar barStyle='light-content' />
					<ActivityIndicator size='large' />
				</View>
			);
		}
		if (this.state.movieData === undefined || this.state.movieData === null)
			return (null);
		if (this.state.movieData == 'none')
			return (<Text style={{marginVertical: 50}} >Aucunes données trouvées</Text>);
		return (
			<ImageBackground
				style={{width: '100%', height: '100%'}}
				source={{uri: `http://image.tmdb.org/t/p/w780${this.state.movieData.poster_path}`}}
				blurRadius={10}>
				<StatusBar barStyle='light-content' />
				<ScrollView style={StyleLight.movieInfos.scrollView} >
					<View style={StyleLight.movieInfos.globalView} >
						<Image
							style={StyleLight.movieInfos.headerImg}
							source={{uri: `http://image.tmdb.org/t/p/w780${this.state.movieData.backdrop_path}`}} />
						<Text style={StyleLight.movieInfos.title} >{this.state.movieData.title}</Text>
						{this.createButton()}
						<View style={StyleLight.movieInfos.voteSection} >
							{this.likeButton()}
							<View style={StyleLight.movieInfos.stars} >
								{this.voteCount()}
							</View>
						</View>
						<Text style={StyleLight.movieInfos.overview} >{this.state.movieData.overview}</Text>
						{this.getInfos()}
					</View>
				</ScrollView>
			</ImageBackground>
		);
	}
}
