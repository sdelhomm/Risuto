import React from 'react'
import { StyleSheet } from 'react-native'

let redCarpet = '#c60f22';
let red = '#d81326';
let dark = '#3B3B3B';
let light = '#f7f7f7';
let redDel = '#ef0911';

export default Style = {
	bottomBar: {
		backgroundColor: redCarpet,
	},
	globalContainer: {
		flex: 1,
		margin: 10,
		marginTop: 30,
		alignItems: 'center'
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'center', 
		alignItems: 'center'
	},
	title: {
		fontSize: 30,
		marginVertical: 15,
		color: red,
		fontFamily: 'AvenirNext-Regular'
	},
	mediumText: {
		fontSize: 30,
		marginVertical: 15,
		marginHorizontal: 10,
		color: dark
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
	buttonText: {
		color: light,
		fontSize: 23
	},
	switch: {
		margin: 10
	},
	inputText: {
		width: '90%',
		borderRadius: 50,
		shadowColor: '#000000',
		shadowOffset: {
			width: 2,
			height: 2
		},
		backgroundColor: '#FFF',
		shadowOpacity: 0.4,
		shadowRadius: 2,
		marginVertical: 15,
		fontSize: 17,
		padding: 9,
		backgroundColor: light
	},
	navigation: {
		backgroundColor: redCarpet
	},
	results: {
		flatList : {
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
			fontFamily: 'HelveticaNeue',
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
			fontFamily: 'Arial'
		},
		textContainer: {
			height: '100%',
			width: '54%',
			flexWrap: 'wrap'
		},
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
			height: 200,
		},
		title: {
			fontSize: 50,
			textAlign: 'center',
			color: light,
			marginVertical: 15,
			fontFamily: 'AvenirNext-Regular'
		},
		overview: {
			fontFamily: 'Helvetica',
			fontSize: 20,
			fontStyle: 'italic',
			color: light,
			margin: 20,
			textAlign: 'left'
		},
	},
	listsHome: {
		flatList : {
			width: '100%',
			height: '85%'
		},
		container: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			backgroundColor: light,
			borderRadius: 4,
			marginVertical: 10
		},
		name: {
			fontSize: 20,
			fontFamily: 'HelveticaNeue',
			textAlign: 'center',
			color: dark,
			margin: 25
		},
		delIcon: {
			width: 50,
			height: 50,
			backgroundColor: redDel,
			marginRight: 10,
			justifyContent: 'center',
			alignItems: 'center', 
			borderWidth: 2,
			borderRadius: 3,
			borderColor: '#d3171d'
		},
	},
	listManager : {
		scrollView: {
			flex: 1,
		},
		globalView: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center'
		},
		movies: {
			width: 120,
			height: 180
		},
	},
	AddToList : {
		image: {
			width: 120,
			height: 180
		}
	},
	shadow : {
		shadowColor: '#000000',
			shadowOffset: {
				width: 2,
				height: 2
			},
			shadowOpacity: 0.5,
			shadowRadius: 2
	}
};