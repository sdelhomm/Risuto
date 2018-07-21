import React from 'react';
import {StatusBar, Platform} from 'react-native';

const redCarpet = '#c60f22';
const red = '#d81326';
const dark = '#3B3B3B';
const darker = '#282828';
const light = '#f7f7f7';
const lighter = '#eaeaea';
const redDel = '#ef0911';
const disabled = '#bfbfbf';

export const StyleLight = {
	bottomBar: {
		backgroundColor: redCarpet
	},
	globalContainer: {
		flex: 1,
		paddingHorizontal: 10,
		paddingTop: 30,
		alignItems: 'center',
		backgroundColor: lighter
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: 30,
		marginVertical: 10,
		color: dark,
		fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light'
	},
	bigText: {
		fontSize: 40,
		marginVertical: 20,
		color: dark,
		fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light'
	},
	button: {
		width: '90%',
		padding: 6,
		marginVertical: 20,
		borderWidth: 2,
		backgroundColor: redCarpet,
		borderColor: red,
		borderRadius: 3,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonDisabled: {
		width: '90%',
		padding: 6,
		marginVertical: 20,
		borderWidth: 2,
		backgroundColor: disabled,
		borderColor: '#afafaf',
		borderRadius: 3,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		color: light,
		fontSize: 20,
		margin: 3
	},
	switch: {
		margin: 20,
		transform: [{scaleX: 1.7}, {scaleY: 1.7}]
	},
	inputText: {
		width: '90%',
		borderRadius: 50,
		shadowColor: '#000000',
		shadowOffset: {
			width: 2,
			height: 2
		},
		shadowOpacity: 0.4,
		shadowRadius: 2,
		marginVertical: 15,
		fontSize: 17,
		padding: 9,
		color: darker,
		backgroundColor: light
	},
	picker: {
		width: '100%',
		marginVertical: 10,
		...Platform.select({android: {backgroundColor: '#c6c6c6'}})
	},
	results: {
		flatList: {
			width: '100%',
			height: '75%'
		},
		container: {
			flex: 1,
			backgroundColor: light,
			borderRadius: 4,
			marginVertical: 8,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			flexWrap: 'wrap'
		},
		title: {
			fontSize: 20,
			textAlign: 'center',
			marginVertical: 10,
			fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
			color: dark
		},
		image: {
			width: 73,
			height: 110
		},
		addIcon: {
			width: 50,
			height: 50,
			backgroundColor: '#28E42D',
			marginRight: 10,
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: 2,
			borderRadius: 50,
			borderColor: '#14bc19'
		},
		overview: {
			fontSize: 10,
			textAlign: 'justify',
			fontStyle: 'italic',
			color: dark,
			fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto'
		},
		textContainer: {
			height: '100%',
			width: '54%',
			flexWrap: 'wrap'
		},
		noResults: {
			color: dark,
			fontSize: 18,
			marginVertical: 15,
			fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto'
		}
	},
	movieInfos: {
		scrollView: {
			flex: 1,
			backgroundColor: 'rgba(0,0,0,0.7)'
		},
		globalView: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center'
		},
		headerImg: {
			width: '100%',
			height: 200
		},
		title: {
			fontSize: 40,
			textAlign: 'center',
			color: light,
			marginVertical: 13,
			fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light'
		},
		voteSection: {
			flex: 1,
			width: '100%',
			justifyContent: 'space-around',
			alignItems: 'center',
			flexDirection: 'row',
			flexWrap: 'wrap',
			marginVertical: 10
		},
		stars: {
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'row',
			flexWrap: 'wrap'
		},
		overview: {
			fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
			fontSize: 18,
			fontStyle: 'italic',
			color: light,
			margin: 20,
			textAlign: 'left'
		},
		infosSection: {
			flex: 1,
			width: '100%',
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'center',
			flexWrap: 'wrap',
			marginBottom: 30
		},
		infosSectionLeft: {
			width: '40%',
			flexWrap: 'wrap'
		},
		infosSectionRight: {
			width: '40%',
			flexWrap: 'wrap'
		},
		infos: {
			color: light,
			fontSize: 16,
			fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
			marginVertical: 5
		}
	},
	listsHome: {
		flatList: {
			width: '100%',
			height: '85%'
		},
		container: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			flexWrap: 'wrap',
			justifyContent: 'space-between',
			backgroundColor: light,
			borderRadius: 4,
			margin: 10
		},
		name: {
			fontSize: 20,
			fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
			textAlign: 'center',
			color: dark,
			margin: 25
		},
		delIcon: {
			width: 48,
			height: 48,
			backgroundColor: redDel,
			marginRight: 15,
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: 2,
			borderRadius: 3,
			borderColor: '#d3171d'
		}
	},
	listManager: {
		scrollView: {
			flex: 1
		},
		globalView: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center'
		},
		moviesView: {
			flex: 1,
			width: '100%',
			justifyContent: 'center',
			flexDirection: 'row',
			flexWrap: 'wrap'
		},
		movies: {
			width: 120,
			height: 180,
			margin: 10
		}
	},
	AddToList: {
		image: {
			width: 120,
			height: 180
		}
	},
	shadow: {
		shadowColor: '#000000',
		shadowOffset: {
			width: 2,
			height: 2
		},
		shadowOpacity: 0.5,
		shadowRadius: 2
	},
	margin: {
		marginVertical: 30
	},
	imageBackground: {
		width: '100%',
		height: '100%'
	},
	statusBar: <StatusBar barStyle='dark-content' />,
	theme: 'light',
	unTheme: 'dark',
	main: {
		color: dark
	}
};

export const StyleDark = {
	bottomBar: {
		backgroundColor: redCarpet
	},
	globalContainer: {
		flex: 1,
		paddingHorizontal: 10,
		paddingTop: 30,
		alignItems: 'center',
		backgroundColor: darker
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: 30,
		marginVertical: 10,
		color: light,
		fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light'
	},
	bigText: {
		fontSize: 40,
		marginVertical: 20,
		color: light,
		fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light'
	},
	button: {
		width: '90%',
		padding: 6,
		marginVertical: 20,
		borderWidth: 2,
		backgroundColor: redCarpet,
		borderColor: red,
		borderRadius: 3,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonDisabled: {
		width: '90%',
		padding: 6,
		marginVertical: 20,
		borderWidth: 2,
		backgroundColor: disabled,
		borderColor: '#afafaf',
		borderRadius: 3,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		color: light,
		fontSize: 20,
		margin: 3
	},
	switch: {
		margin: 20,
		transform: [{scaleX: 1.7}, {scaleY: 1.7}]
	},
	inputText: {
		width: '90%',
		borderRadius: 50,
		shadowColor: '#000000',
		shadowOffset: {
			width: 2,
			height: 2
		},
		shadowOpacity: 0.4,
		shadowRadius: 2,
		marginVertical: 15,
		fontSize: 17,
		padding: 9,
		color: lighter,
		backgroundColor: dark
	},
	picker: {
		width: '100%',
		marginVertical: 10,
		...Platform.select({android: {backgroundColor: '#606060'}})
	},
	results: {
		flatList: {
			width: '100%',
			height: '75%'
		},
		container: {
			flex: 1,
			backgroundColor: dark,
			borderRadius: 4,
			marginVertical: 8,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			flexWrap: 'wrap'
		},
		title: {
			fontSize: 20,
			textAlign: 'center',
			marginVertical: 10,
			fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
			color: light
		},
		image: {
			width: 73,
			height: 110
		},
		addIcon: {
			width: 50,
			height: 50,
			backgroundColor: '#28E42D',
			marginRight: 10,
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: 2,
			borderRadius: 50,
			borderColor: '#14bc19'
		},
		overview: {
			fontSize: 10,
			textAlign: 'justify',
			fontStyle: 'italic',
			color: light,
			fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto'
		},
		textContainer: {
			height: '100%',
			width: '54%',
			flexWrap: 'wrap'
		},
		noResults: {
			color: light,
			fontSize: 18,
			marginVertical: 15,
			fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto'
		}
	},
	movieInfos: {
		scrollView: {
			flex: 1,
			backgroundColor: 'rgba(0,0,0,0.7)'
		},
		globalView: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center'
		},
		headerImg: {
			width: '100%',
			height: 200
		},
		title: {
			fontSize: 40,
			textAlign: 'center',
			color: light,
			marginVertical: 13,
			fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light'
		},
		voteSection: {
			flex: 1,
			width: '100%',
			justifyContent: 'space-around',
			alignItems: 'center',
			flexDirection: 'row',
			flexWrap: 'wrap',
			marginVertical: 10
		},
		stars: {
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'row',
			flexWrap: 'wrap'
		},
		overview: {
			fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
			fontSize: 18,
			fontStyle: 'italic',
			color: light,
			margin: 20,
			textAlign: 'left'
		},
		infosSection: {
			flex: 1,
			width: '100%',
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'center',
			flexWrap: 'wrap',
			marginBottom: 30
		},
		infosSectionLeft: {
			width: '40%',
			flexWrap: 'wrap'
		},
		infosSectionRight: {
			width: '40%',
			flexWrap: 'wrap'
		},
		infos: {
			color: light,
			fontSize: 16,
			fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
			marginVertical: 5
		}
	},
	listsHome: {
		flatList: {
			width: '100%',
			height: '85%'
		},
		container: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			flexWrap: 'wrap',
			justifyContent: 'space-between',
			backgroundColor: dark,
			borderRadius: 4,
			margin: 10
		},
		name: {
			fontSize: 20,
			fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
			textAlign: 'center',
			color: light,
			margin: 25
		},
		delIcon: {
			width: 48,
			height: 48,
			backgroundColor: redDel,
			marginRight: 15,
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: 2,
			borderRadius: 3,
			borderColor: '#d3171d'
		}
	},
	listManager: {
		scrollView: {
			flex: 1
		},
		globalView: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center'
		},
		moviesView: {
			flex: 1,
			width: '100%',
			justifyContent: 'center',
			flexDirection: 'row',
			flexWrap: 'wrap'
		},
		movies: {
			width: 120,
			height: 180,
			margin: 10
		}
	},
	AddToList: {
		image: {
			width: 120,
			height: 180
		}
	},
	shadow: {
		shadowColor: '#000000',
		shadowOffset: {
			width: 2,
			height: 2
		},
		shadowOpacity: 0.5,
		shadowRadius: 2
	},
	margin: {
		marginVertical: 25
	},
	imageBackground: {
		width: '100%',
		height: '100%'
	},
	statusBar: <StatusBar barStyle='light-content' />,
	theme: 'dark',
	unTheme: 'light',
	main: {
		color: light
	}
};
