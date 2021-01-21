import React from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RepositoriesActions from '../../store/ducks/repositories'

const styles = {
  container: {
    flex: 1,
    background: '#7159c1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  repo: {
    padding: 10,
    borderRadius: 4,
    margin: 10,
    borderWidth: 1
  },
  input: {
    backgroundColor: 'red'
  }
};

const Repository = ({ repositories, addRepositoryRequest, inputValue, handleInputChange }) => (
  <View style={styles.container}>
    {repositories.data.map((repository) => (
      <View style={styles.repo} key={repository.id}>
        <Text>{repository.name}</Text>
        <Text>{repository.description}</Text>
      </View>
    ))}
    
    <TextInput style={styles.input} value={inputValue} onChangeText={handleInputChange}></TextInput>
    <Button
      title="Adicionar"
      onPress={() => addRepositoryRequest(inputValue)}
    />
  </View>
  );

  const mapStateToProps = ({ repositories }) => ({ repositories })

  const mapDispatchToProps = dispatch => bindActionCreators(RepositoriesActions, dispatch)

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Repository)