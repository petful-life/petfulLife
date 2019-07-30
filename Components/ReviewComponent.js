import React, { Component } from 'react';
import { View, TextInput, TouchableWithoutFeedback, StyleSheet, Text, Switch, Button } from 'react-native';
import { fetchPatch, fetchData } from '../Utils/fetchCalls';
export class ReviewComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			review: '',
			error: '',
			status: '',
			good_or_bad: this.props.good,
			SwitchOnValueHolder: false
		}
	}

	componentDidMount = (props) => {
		this.setSwitch(props)
	}

	setSwitch = () => {
		this.setState({ SwitchOnValueHolder: this.props.good})
	}

	setValue = (value) => {
	  this.setState({ SwitchOnValueHolder: value})
	  if (this.state.SwitchOnValueHolder === false) {
	  	this.setState({ good_or_bad: 'bad'})
	  } else {
	  	this.setState({ good_or_bad: 'good'})
	  }
	 	this.saveChanges();
	}

	saveChanges = () => {
		this.props.editNotes(this.state.review)
		this.props.setGoodOrBad(this.state.SwitchOnValueHolder, this.state.review)
	}

	render(props) {	
		return (
			<View>
			<View style={{
       backgroundColor: this.state.text,
       borderColor: '#000000',
       borderWidth: 1 }}>
			<TextInput
				placeholder='Add a comment here...'
				multiline = {true}
       	numberOfLines = {4}
       	onChangeText={(review) => this.setState({review})}
       	onEndEditing={() => {this.saveChanges()}}
       	value={this.state.review}
				editable={true}
				maxlength={40}
			/>

			</View>
			<View>
			<Text>{this.state.SwitchOnValueHolder ?'Product is Liked':'Product is Disliked'}</Text>
				 <Switch
          onValueChange={(value) => this.setValue(value)}
          value={this.state.SwitchOnValueHolder} />
			</View>
			<Button
				onPress={ () => this.saveChanges()}
				title= 'Save Changes' 
				accessibilityLabel="View Details On A Product"
			/>

			</View>
		);
	}
}
