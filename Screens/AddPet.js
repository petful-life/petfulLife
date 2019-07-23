import React, { Component }from 'react';
import { Button, StyleSheet, TextInput, Text, Picker, View  } from 'react-native';
import { fetchPost } from '../Utils/fetchCalls';
import { BackgroundForm } from '../Components/BackgroundForm'


export class AddPet extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      nickname: '',
      archetype: '',
      breed: '',
    } 
  }

  handleSubmit = (e) => {
    e.preventDefault()
    alert('here is the pet')
    let newPet = this.state
    this.preparePost(newPet)
  }

  preparePost = (pet) => {
    let url = 'http://localhost:3000/api/v1/users/1/pets';
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pet)
    }
    fetchPost(url, options)
    .then(response => this.navigate(response))
  }

  navigate = () => {
    this.props.navigation.navigate('ViewPets')
  }
    
  render(){
    return (
      <View style={styles.container}>
      <BackgroundForm style={styles.backgroundImage} />
        <View style={styles.form}>
          <Text>Name</Text>
          <TextInput 
            style={styles.input}
            onChangeText={(text)=> this.setState({name: text})}
            />
          <Text style={styles.labels}>Nickname</Text>
          <TextInput 
            style={styles.input}
            onChangeText={(text)=> this.setState({nickname: text})}
            />
          <Text style={styles.breed}>Breed</Text>
          <TextInput 
            style={styles.input}
            onChangeText={(text)=> this.setState({breed: text})}
            />
          <View style={styles.picker}>
          <Picker
            selectedValue={this.state.archetype}
            style={{height: 5, mode: 'dropdown'}}
            onValueChange={(itemValue)=> {this.setState({archetype:itemValue})}}
            >
            <Picker.Item label="Type" />
            <Picker.Item label="Dog" value="dog" />
            <Picker.Item label="Cat" value="cat" />
          </Picker>
        </View>
        <View style={styles.submit}>
          <Button
          onPress={this.handleSubmit}
          title="ADD PET"
          color='white'
          accessibilityLabel="Click to create a pet profile"
        />
        </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF0EF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: 300,
    height: 600,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEFEFE99',
  },
  input: {
    width: '70%',
    height: 40,
    borderColor: 'grey',
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 5,
  },
  picker: {
    width: '70%',
    height: 200,
  },
  submit: {
    margin: 10,
    backgroundColor: "#B0E0E6",
    height: 40,
    width: '70%',
    borderRadius: 5,
    opacity: .8
  },
  breed: {
    marginBottom: 0
  },
  backgroundImage: {
    resizeMode: 'cover',
    position:'absolute'
  }
});